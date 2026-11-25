package com.payvoice.assistant.data.model

data class DemoTransaction(
    val id: String,
    val timestamp: String,
    val amount: Int,
    val status: String,
    val customerName: String,
    val customerVpa: String,
    val method: String,
    val notes: String = "",
    val isDemo: Boolean = true
)

data class Shop(
    val id: String,
    val name: String,
    val category: String,
    val address: String,
    val city: String,
    val state: String,
    val upiIdDemo: String,
    val soundBoxId: String,
    val isPrimary: Boolean
)

data class Merchant(
    val id: String,
    val fullName: String,
    val phoneDemo: String,
    val kycStatus: String,
    val shops: List<Shop>,
    val tier: String
)

data class BrainSparkPuzzle(
    val id: String,
    val title: String,
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val hint: String,
    val explanation: String
)

data class MemoryCard(
    val id: String,
    val matchKey: String,
    val label: String,
    val symbol: String,
    var isFlipped: Boolean = false,
    var isMatched: Boolean = false
)
