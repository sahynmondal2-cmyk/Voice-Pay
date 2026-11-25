package com.payvoice.assistant

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.payvoice.assistant.navigation.Screen
import com.payvoice.assistant.service.SoundEngineService
import com.payvoice.assistant.theme.PayVoiceTheme
import com.payvoice.assistant.ui.screens.*

class MainActivity : ComponentActivity() {
    private lateinit var soundEngine: SoundEngineService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        soundEngine = SoundEngineService(this)

        setContent {
            PayVoiceTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    PayVoiceApp(soundEngine)
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        soundEngine.shutdown()
    }
}

@Composable
fun PayVoiceApp(soundEngine: SoundEngineService) {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Dashboard.route
    ) {
        composable(Screen.Dashboard.route) {
            DashboardScreen(
                onTestVoice = {
                    soundEngine.speakAnnouncement(150, "en", "Priya")
                },
                onSimulatePayment = {
                    soundEngine.speakAnnouncement(250, "bn", "Aniket Sen")
                },
                onNavigateToTransactions = {
                    navController.navigate(Screen.Transactions.route)
                },
                onNavigateToPlay = {
                    navController.navigate(Screen.PlayHub.route)
                },
                onNavigateToSettings = {
                    navController.navigate(Screen.VoiceSettings.route)
                }
            )
        }

        composable(Screen.Transactions.route) {
            TransactionsScreen(
                onBack = { navController.popBackStack() },
                onSpeakTxn = { txn ->
                    soundEngine.speakAnnouncement(txn.amount, "en", txn.customerName)
                }
            )
        }

        composable(Screen.VoiceSettings.route) {
            VoiceSettingsScreen(
                onBack = { navController.popBackStack() },
                onTestAnnouncement = { lang, _, _ ->
                    soundEngine.speakAnnouncement(150, lang, "Merchant")
                }
            )
        }

        composable(Screen.PlayHub.route) {
            PlayHubScreen(
                onBack = { navController.popBackStack() },
                onNavigateToSpark = { navController.navigate(Screen.DailyBrainSpark.route) },
                onNavigateToMemory = { navController.navigate(Screen.MemoryMatch.route) }
            )
        }

        composable(Screen.DailyBrainSpark.route) {
            DailyBrainSparkScreen(onBack = { navController.popBackStack() })
        }

        composable(Screen.MemoryMatch.route) {
            MemoryMatchScreen(onBack = { navController.popBackStack() })
        }

        composable(Screen.Business.route) {
            BusinessScreen(onBack = { navController.popBackStack() })
        }

        composable(Screen.Premium.route) {
            PremiumScreen(onBack = { navController.popBackStack() })
        }
    }
}
