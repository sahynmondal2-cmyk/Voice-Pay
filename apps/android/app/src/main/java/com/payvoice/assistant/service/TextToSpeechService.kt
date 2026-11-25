package com.payvoice.assistant.service

import android.content.Context
import android.speech.tts.TextToSpeech
import android.util.Log
import java.util.Locale

class SoundEngineService(context: Context) : TextToSpeech.OnInitListener {
    private var tts: TextToSpeech? = TextToSpeech(context.applicationContext, this)
    private var isReady = false

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isReady = true
            tts?.language = Locale("en", "IN")
        } else {
            Log.w("PayVoice", "TextToSpeech init failed or not supported on this device.")
        }
    }

    fun speakAnnouncement(amount: Int, language: String, payerName: String? = null) {
        if (!isReady || tts == null) return

        // Set locale according to preference
        val targetLocale = when (language.lowercase()) {
            "bn" -> Locale("bn", "IN")
            "hi" -> Locale("hi", "IN")
            else -> Locale("en", "IN")
        }

        tts?.language = targetLocale

        val announcementText = when (language.lowercase()) {
            "bn" -> if (payerName != null) {
                "$payerName এর থেকে পেভয়েস ডেমোতে $amount টাকা প্রাপ্ত হয়েছে।"
            } else {
                "পেভয়েস ডেমোতে $amount টাকা সফলভাবে জমা হয়েছে।"
            }
            "hi" -> if (payerName != null) {
                "$payerName से पेवॉइस डेमो पर $amount रुपये प्राप्त हुए।"
            } else {
                "पेवॉइस डेमो पर $amount रुपये सफलतापूर्वक प्राप्त हुए।"
            }
            else -> if (payerName != null) {
                "Rupees $amount received from $payerName on PayVoice Demo."
            } else {
                "Rupees $amount received successfully on PayVoice Demo."
            }
        }

        tts?.speak(announcementText, TextToSpeech.QUEUE_FLUSH, null, "PayVoiceDemoAlert")
    }

    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        tts = null
    }
}
