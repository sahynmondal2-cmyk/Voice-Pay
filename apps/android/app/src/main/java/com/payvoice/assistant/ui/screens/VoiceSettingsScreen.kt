package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material.icons.filled.Warning
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
    onTestAnnouncement: (String, Float, Float) -> Unit = { _, _, _ -> },
    onTestSpecificVoice: (String, String, Int, String) -> Unit = { _, _, _, _ -> }
) {
    var selectedLang by remember { mutableStateOf("en") }
    var selectedDirection by remember { mutableStateOf("incoming") }
    var incomingVoiceEnabled by remember { mutableStateOf(true) }
    var outgoingVoiceEnabled by remember { mutableStateOf(true) }
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
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Real Payment Security Disclosure Card
            Surface(
                color = Color(0xFFFEF3C7),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Default.Warning, contentDescription = null, tint = Color(0xFFB45309), modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Real Payment Integration: Not Connected (Demo Mode)",
                        fontWeight = FontWeight.Bold,
                        fontSize = 11.sp,
                        color = Color(0xFF78350F)
                    )
                }
            }

            // Direction Voice Toggles Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = BrandSurface)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Payment Direction Voice Controls", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text("Incoming Voice Alerts", fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = BrandNavy)
                            Text("Announce received payments aloud", fontSize = 10.sp, color = Color.Gray)
                        }
                        Switch(
                            checked = incomingVoiceEnabled,
                            onCheckedChange = { incomingVoiceEnabled = it },
                            colors = SwitchDefaults.colors(checkedThumbColor = BrandSurface, checkedTrackColor = Color(0xFF059669))
                        )
                    }

                    HorizontalDivider()

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text("Outgoing Voice Alerts", fontWeight = FontWeight.SemiBold, fontSize = 12.sp, color = BrandNavy)
                            Text("Announce sent payments & vendor payouts", fontSize = 10.sp, color = Color.Gray)
                        }
                        Switch(
                            checked = outgoingVoiceEnabled,
                            onCheckedChange = { outgoingVoiceEnabled = it },
                            colors = SwitchDefaults.colors(checkedThumbColor = BrandSurface, checkedTrackColor = Color(0xFF2563EB))
                        )
                    }
                }
            }

            // Language & Audio Engine Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = BrandSurface)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Default Announcement Language", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        listOf(
                            Triple("bn", "বাংলা (bn-IN)", "Bengali"),
                            Triple("hi", "हिन्दी (hi-IN)", "Hindi"),
                            Triple("en", "English (en-IN)", "Universal")
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
                                    fontSize = 10.sp,
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
                }
            }

            // Dedicated Test Suite Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = BrandSurface)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text("Dedicated Language Test Suite", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)

                    // Direction toggle for test
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = { selectedDirection = "incoming" },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (selectedDirection == "incoming") Color(0xFF059669) else Color(0xFFE2E8F0)
                            )
                        ) {
                            Text("Incoming (↓)", fontSize = 11.sp, color = if (selectedDirection == "incoming") Color.White else Color.Black)
                        }
                        Button(
                            onClick = { selectedDirection = "outgoing" },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (selectedDirection == "outgoing") Color(0xFF2563EB) else Color(0xFFE2E8F0)
                            )
                        ) {
                            Text("Outgoing (↑)", fontSize = 11.sp, color = if (selectedDirection == "outgoing") Color.White else Color.Black)
                        }
                    }

                    // Test Bengali
                    Button(
                        onClick = { onTestSpecificVoice("bn", selectedDirection, 150, "Priya") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669))
                    ) {
                        Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Test Bengali Voice (বাংলা)", color = Color.White, fontWeight = FontWeight.Bold)
                    }

                    // Test Hindi
                    Button(
                        onClick = { onTestSpecificVoice("hi", selectedDirection, 150, "Priya") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEA580C))
                    ) {
                        Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Test Hindi Voice (हिन्दी)", color = Color.White, fontWeight = FontWeight.Bold)
                    }

                    // Test English
                    Button(
                        onClick = { onTestSpecificVoice("en", selectedDirection, 150, "Priya") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4F46E5))
                    ) {
                        Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Test English Voice", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Android Foreground Audio optimization note
            Surface(
                color = Color(0xFFEFF6FF),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                        text = "Android Background Soundbox Optimization",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = Color(0xFF1E40AF)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "For uninterrupted alerts while phone screen is asleep, ensure battery optimization for PayVoice is set to Unrestricted in Android device settings. PayVoice runs a native Foreground Service for instant delivery.",
                        fontSize = 11.sp,
                        color = Color(0xFF1E40AF)
                    )
                }
            }
        }
    }
}
