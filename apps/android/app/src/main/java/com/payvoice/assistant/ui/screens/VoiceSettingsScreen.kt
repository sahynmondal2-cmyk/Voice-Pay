package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.payvoice.assistant.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VoiceSettingsScreen(
    onBack: () -> Unit,
    onTestAnnouncement: (String, Float, Float) -> Unit
) {
    var selectedLang by remember { mutableStateOf("en") }
    var volume by remember { mutableFloatStateOf(1.0f) }
    var speed by remember { mutableFloatStateOf(1.0f) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Voice & Sound Settings", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = BrandSurface)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = BrandPrimary)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
                .background(BrandBackground)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = BrandSurface)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Announcement Language", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        listOf(
                            Triple("bn", "বাংলা", "Bengali"),
                            Triple("hi", "हिन्दी", "Hindi"),
                            Triple("en", "English", "Universal")
                        ).forEach { (code, title, _) ->
                            OutlinedButton(
                                onClick = { selectedLang = code },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.outlinedButtonColors(
                                    containerColor = if (selectedLang == code) BrandPrimary.copy(alpha = 0.1f) else Color.Transparent
                                )
                            ) {
                                Text(
                                    text = title,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (selectedLang == code) BrandPrimary else BrandNavy
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(4.dp))
                    Text("Speaker Volume (${(volume * 100).toInt()}%)", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)
                    Slider(
                        value = volume,
                        onValueChange = { volume = it },
                        valueRange = 0.1f..1.0f,
                        colors = SliderDefaults.colors(thumbColor = BrandAccent, activeTrackColor = BrandPrimary)
                    )

                    Text("Speech Rate (${String.format("%.1f", speed)}x)", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)
                    Slider(
                        value = speed,
                        onValueChange = { speed = it },
                        valueRange = 0.7f..1.3f,
                        colors = SliderDefaults.colors(thumbColor = BrandAccent, activeTrackColor = BrandPrimary)
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Button(
                        onClick = { onTestAnnouncement(selectedLang, volume, speed) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = BrandAccent)
                    ) {
                        Icon(Icons.Default.VolumeUp, contentDescription = null, tint = BrandNavy)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Play Sample Announcement", color = BrandNavy, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Audio limitation note
            Surface(
                color = Color(0xFFFEF3C7),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                        text = "Android Audio Optimization Notice",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = Color(0xFF78350F)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "For uninterrupted alerts while phone screen is asleep, ensure battery optimization for PayVoice is set to Unrestricted in Android device settings.",
                        fontSize = 11.sp,
                        color = Color(0xFF78350F)
                    )
                }
            }
        }
    }
}
