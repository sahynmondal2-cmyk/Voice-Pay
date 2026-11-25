package com.payvoice.assistant.service

import android.content.Context
import android.speech.tts.TextToSpeech
import android.util.Log
import java.util.Locale

class SoundEngineService(context: Context) : TextToSpeech.OnInitListener {
    private var tts: TextToSpeech? = TextToSpeech(context.applicationContext, this)
    private var isReady = false
    private val announcedTxnIds = mutableSetOf<String>()

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isReady = true
            tts?.language = Locale("en", "IN")
        } else {
            Log.w("PayVoice", "TextToSpeech init failed or not supported on this device.")
        }
    }

    /**
     * Converts numeric integers to localized Bengali numerals with Indian comma separators.
     * e.g. 150 -> "১৫০", 1500 -> "১,৫০০", 10000 -> "১০,০০০", 50000 -> "৫০,০০০"
     */
    fun toBengaliDigits(amount: Int): String {
        val bnDigits = charArrayOf('০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯')
        val str = amount.toString()
        val len = str.length
        if (len <= 3) {
            return str.map { bnDigits[it - '0'] }.joinToString("")
        }

        val lastThree = str.substring(len - 3)
        val remaining = str.substring(0, len - 3)
        val chunks = mutableListOf<String>()
        var i = remaining.length
        while (i > 0) {
            val start = maxOf(0, i - 2)
            chunks.add(0, remaining.substring(start, i))
            i = start
        }
        chunks.add(lastThree)
        val formatted = chunks.joinToString(",")
        return formatted.map { if (it in '0'..'9') bnDigits[it - '0'] else it }.joinToString("")
    }

    /**
     * Bengali genitive inflection for incoming payments:
     * "প্রিয়া" -> "প্রিয়ার", "Priya" -> "প্রিয়ার", "Rahul" -> "রাহুলের"
     */
    fun formatBengaliGenitiveName(name: String): String {
        val trimmed = name.trim()
        if (trimmed.isEmpty() || trimmed.lowercase() == "customer" || trimmed == "গ্রাহক") return "গ্রাহকের"
        val lower = trimmed.lowercase()
        if (lower == "priya" || lower.startsWith("priya banerjee")) return "প্রিয়ার"
        if (lower == "rahul" || lower.startsWith("rahul sharma")) return "রাহুলের"
        if (lower == "aniket" || lower.startsWith("aniket sen")) return "অনিকেতের"
        if (lower == "riya" || lower.startsWith("riya mukherjee")) return "রিয়ার"
        if (lower == "bikash" || lower.startsWith("bikash roy")) return "বিকাশের"
        if (trimmed == "প্রিয়া") return "প্রিয়ার"
        if (trimmed.endsWith("া") || trimmed.endsWith("ি") || trimmed.endsWith("ী")) return "${trimmed}র"
        return "${trimmed}ের"
    }

    /**
     * Bengali accusative inflection for outgoing payments:
     * "প্রিয়া" -> "প্রিয়াকে", "Priya" -> "প্রিয়াকে", "Rahul" -> "রাহুলকে"
     */
    fun formatBengaliAccusativeName(name: String): String {
        val trimmed = name.trim()
        if (trimmed.isEmpty() || trimmed.lowercase() == "recipient" || trimmed == "প্রাপক") return "প্রাপককে"
        val lower = trimmed.lowercase()
        if (lower == "priya" || lower.startsWith("priya banerjee")) return "প্রিয়াকে"
        if (lower == "rahul" || lower.startsWith("rahul sharma")) return "রাহুলকে"
        if (lower == "aniket" || lower.startsWith("aniket sen")) return "অনিকেতকে"
        if (lower == "riya" || lower.startsWith("riya mukherjee")) return "রিয়াকে"
        if (lower == "aloke" || lower.startsWith("aloke roy")) return "আলোককে"
        if (trimmed == "প্রিয়া") return "প্রিয়াকে"
        return "${trimmed}কে"
    }

    /**
     * Hindi name transliteration:
     * "Priya" -> "प्रिया", "Rahul" -> "राहुल"
     */
    fun formatHindiName(name: String): String {
        val trimmed = name.trim()
        if (trimmed.isEmpty() || trimmed.lowercase() == "customer" || trimmed == "ग्राहक") return "ग्राहक"
        if (trimmed.lowercase() == "recipient" || trimmed == "प्राप्तकर्ता") return "प्राप्तकर्ता"
        val lower = trimmed.lowercase()
        if (lower == "priya" || lower.startsWith("priya banerjee")) return "प्रिया"
        if (lower == "rahul" || lower.startsWith("rahul sharma")) return "राहुल"
        if (lower == "aniket" || lower.startsWith("aniket sen")) return "अनिकेत"
        if (lower == "riya" || lower.startsWith("riya mukherjee")) return "रिया"
        if (lower == "aloke" || lower.startsWith("aloke roy")) return "आलोक"
        return trimmed
    }

    /**
     * Format number with Indian numbering grouping (e.g. 1,500, 10,000, 50,000)
     */
    fun formatIndianNumber(amount: Int): String {
        val str = amount.toString()
        val len = str.length
        if (len <= 3) return str
        val lastThree = str.substring(len - 3)
        val remaining = str.substring(0, len - 3)
        val chunks = mutableListOf<String>()
        var i = remaining.length
        while (i > 0) {
            val start = maxOf(0, i - 2)
            chunks.add(0, remaining.substring(start, i))
            i = start
        }
        chunks.add(lastThree)
        return chunks.joinToString(",")
    }

    /**
     * Announce transaction respecting:
     * 1. Status rule: Only Demo Successful transactions announced. Pending/Failed never announced.
     * 2. Duplicate rule: Never announce same transaction ID twice.
     * 3. Direction phrasing:
     *    - Bengali Incoming: "প্রিয়ার কাছ থেকে ১৫০ টাকা পেয়েছেন।"
     *    - Bengali Outgoing: "আপনি প্রিয়াকে ১৫০ টাকা পাঠিয়েছেন।"
     *    - Hindi Incoming: "आपको प्रिया से 150 रुपये मिले।"
     *    - Hindi Outgoing: "आपने प्रिया को 150 रुपये भेजे।"
     *    - English Incoming: "You received 150 rupees from Priya."
     *    - English Outgoing: "You sent 150 rupees to Priya."
     * 4. Strict language locale (bn-IN, hi-IN, en-IN) without silent cross-language mixing.
     */
    fun speakTransaction(
        amount: Int,
        language: String,
        direction: String = "incoming",
        personName: String = "Priya",
        status: String = "Demo Successful",
        txnId: String? = null,
        forceReplay: Boolean = false
    ): Boolean {
        // Rule 0: Invalid or non-positive amounts are rejected
        if (amount <= 0) {
            Log.w("PayVoice", "Skipping announcement for invalid/zero amount: $amount")
            return false
        }

        // Rule 1: Never announce pending or failed transactions
        if (status != "Demo Successful") {
            Log.d("PayVoice", "Skipping announcement for non-successful status: $status")
            return false
        }

        // Rule 2: Prevent duplicate announcements
        if (txnId != null && announcedTxnIds.contains(txnId) && !forceReplay) {
            Log.d("PayVoice", "Duplicate transaction alert prevented for ID: $txnId")
            return false
        }

        if (!isReady || tts == null) return false

        val isOutgoing = direction.equals("outgoing", ignoreCase = true)

        // Strict locale configuration
        val targetLocale = when (language.lowercase()) {
            "bn" -> Locale("bn", "IN")
            "hi" -> Locale("hi", "IN")
            else -> Locale("en", "IN")
        }

        tts?.language = targetLocale

        val announcementText = if (isOutgoing) {
            when (language.lowercase()) {
                "bn" -> {
                    val inflected = formatBengaliAccusativeName(personName)
                    val bnAmount = toBengaliDigits(amount)
                    "আপনি $inflected $bnAmount টাকা পাঠিয়েছেন।"
                }
                "hi" -> {
                    val hiName = formatHindiName(personName)
                    val formattedAmt = formatIndianNumber(amount)
                    "आपने $hiName को $formattedAmt रुपये भेजे।"
                }
                else -> {
                    val formattedAmt = formatIndianNumber(amount)
                    "You sent $formattedAmt rupees to $personName."
                }
            }
        } else {
            when (language.lowercase()) {
                "bn" -> {
                    val inflected = formatBengaliGenitiveName(personName)
                    val bnAmount = toBengaliDigits(amount)
                    "$inflected কাছ থেকে $bnAmount টাকা পেয়েছেন।"
                }
                "hi" -> {
                    val hiName = formatHindiName(personName)
                    val formattedAmt = formatIndianNumber(amount)
                    "आपको $hiName से $formattedAmt रुपये मिले।"
                }
                else -> {
                    val formattedAmt = formatIndianNumber(amount)
                    "You received $formattedAmt rupees from $personName."
                }
            }
        }

        tts?.speak(announcementText, TextToSpeech.QUEUE_FLUSH, null, "PayVoiceAlert")
        if (txnId != null) {
            announcedTxnIds.add(txnId)
        }
        return true
    }

    fun speakIncoming(amount: Int, language: String, senderName: String = "Priya", txnId: String? = null): Boolean {
        return speakTransaction(amount, language, "incoming", senderName, "Demo Successful", txnId)
    }

    fun speakOutgoing(amount: Int, language: String, recipientName: String = "Priya", txnId: String? = null): Boolean {
        return speakTransaction(amount, language, "outgoing", recipientName, "Demo Successful", txnId)
    }

    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        tts = null
    }
}
