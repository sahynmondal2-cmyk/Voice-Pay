package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.payvoice.assistant.theme.*
import com.payvoice.assistant.ui.components.AdSlotPlaceholder

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlayHubScreen(
    onBack: () -> Unit,
    onNavigateToSpark: () -> Unit,
    onNavigateToMemory: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("PayVoice Play (Optional)", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = BrandSurface)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = BrandPrimary)
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
                .background(BrandBackground)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = BrandPrimary)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Merchant Practice Streak", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = BrandAccent)
                        Text("3 Days in a Row!", fontSize = 18.sp, fontWeight = FontWeight.Black, color = Color.White)
                        Text(
                            text = "Casual break area for quiet counter moments. Zero real cash prizes or gambling.",
                            fontSize = 11.sp,
                            color = Color(0xFFCBD5E1)
                        )
                    }
                }
            }

            item {
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = BrandSurface),
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onNavigateToSpark() }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("DAILY BRAIN SPARK", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = BrandAccent)
                            Text("1–2 mins", fontSize = 10.sp, color = BrandMuted)
                        }
                        Text("The Shopkeeper's Change Riddle", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = BrandNavy)
                        Text("Solve today's cash drawer balance puzzle. Keep your mental calculation sharp.", fontSize = 12.sp, color = BrandMuted)
                    }
                }
            }

            item {
                AdSlotPlaceholder(placementId = "play_hub")
            }

            item {
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = BrandSurface),
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onNavigateToMemory() }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("MEMORY MATCH", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = BrandAccent)
                            Text("2–3 mins", fontSize = 10.sp, color = BrandMuted)
                        }
                        Text("Shopkeeper Pair Match (4x4)", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = BrandNavy)
                        Text("Recall card locations and match retail merchandise pairs.", fontSize = 12.sp, color = BrandMuted)
                    }
                }
            }
        }
    }
}
