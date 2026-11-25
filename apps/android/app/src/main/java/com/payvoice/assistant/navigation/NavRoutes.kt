package com.payvoice.assistant.navigation

sealed class Screen(val route: String, val title: String) {
    object Splash : Screen("splash", "Splash")
    object Onboarding : Screen("onboarding", "Onboarding")
    object Dashboard : Screen("dashboard", "Home")
    object Transactions : Screen("transactions", "Transactions")
    object VoiceSettings : Screen("voice_settings", "Voice Settings")
    object PlayHub : Screen("play_hub", "PayVoice Play")
    object DailyBrainSpark : Screen("daily_spark", "Brain Spark")
    object MemoryMatch : Screen("memory_match", "Memory Match")
    object Business : Screen("business", "Business")
    object Premium : Screen("premium", "Premium")
    object Profile : Screen("profile", "Profile")
    object Settings : Screen("settings", "Settings")
}
