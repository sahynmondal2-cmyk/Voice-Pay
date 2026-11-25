package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.payvoice.assistant.data.model.DemoTransaction
import com.payvoice.assistant.theme.*
import com.payvoice.assistant.ui.components.AdSlotPlaceholder
import com.payvoice.assistant.ui.components.DemoModeBanner

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    onTestVoice: () -> Unit,
    onSimulatePayment: () -> Unit,
    onNavigateToTransactions: () -> Unit,
    onNavigateToPlay: () -> Unit,
    onNavigateToSettings: () -> Unit
) {
    val sampleTransactions = listOf(
        DemoTransaction("DEMO-TXN-884910", "3m ago", 150, "Demo Successful", "Aniket Sen", "aniketsen***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884909", "18m ago", 45, "Demo Successful", "Priya Banerjee", "priya.b***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884908", "42m ago", 520, "Demo Successful", "Rahul Sharma", "rahul.sharma***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884907", "1h ago", 25, "Demo Successful", "Tanmay Das", "tanmay99***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884906", "2h ago", 200, "Demo Pending", "Riya Mukherjee", "riyamuk***@demo-upi", "UPI QR Demo")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "PayVoice",
                            fontWeight = FontWeight.Black,
                            fontSize = 20.sp,
                            color = BrandSurface
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "DEMO",
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            color = BrandNavy,
                            modifier = Modifier
                                .background(BrandAccent, RoundedCornerShape(4.dp))
                                .padding(horizontal = 4.dp, vertical = 2.dp)
                        )
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
        ) {
            DemoModeBanner()

            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                item {
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Namaste, Subhasis Chakraborty",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = BrandNavy
                    )
                    Text(
                        text = "Maa Tara Sweets & Daily Needs • Kolkata",
                        fontSize = 12.sp,
                        color = BrandMuted
                    )
                }

                // Sound Readiness Card
                item {
                    Card(
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = BrandPrimary),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(18.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "SOUND ALERT ENGINE",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = BrandAccent
                                )
                                Text(
                                    text = "PV-KOL-9921",
                                    fontSize = 10.sp,
                                    color = Color.White
                                )
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = "Instant Voice Announcements Ready",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                text = "Local Android TextToSpeech engine configured in Bengali, Hindi, and English.",
                                fontSize = 12.sp,
                                color = Color(0xFFCBD5E1)
                            )
                            Spacer(modifier = Modifier.height(14.dp))
                            Button(
                                onClick = onTestVoice,
                                colors = ButtonDefaults.buttonColors(containerColor = BrandAccent),
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Icon(Icons.Default.VolumeUp, contentDescription = null, tint = BrandNavy)
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(text = "Test Voice Alert", fontWeight = FontWeight.Bold, color = BrandNavy)
                            }
                        }
                    }
                }

                // Today Collection Summary
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Card(
                            shape = RoundedCornerShape(14.dp),
                            colors = CardDefaults.cardColors(containerColor = BrandSurface),
                            modifier = Modifier.weight(1f)
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Text(text = "Today's Collection", fontSize = 11.sp, color = BrandMuted)
                                Text(text = "₹2,690", fontSize = 20.sp, fontWeight = FontWeight.Black, color = BrandNavy)
                                Text(text = "+14% vs yesterday", fontSize = 10.sp, color = BrandAccent)
                            }
                        }
                        Card(
                            shape = RoundedCornerShape(14.dp),
                            colors = CardDefaults.cardColors(containerColor = BrandSurface),
                            modifier = Modifier.weight(1f)
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Text(text = "Total Payments", fontSize = 11.sp, color = BrandMuted)
                                Text(text = "10 Txns", fontSize = 20.sp, fontWeight = FontWeight.Black, color = BrandNavy)
                                Text(text = "100% Success Rate", fontSize = 10.sp, color = BrandAccent)
                            }
                        }
                    }
                }

                // Quick Action Buttons
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = onSimulatePayment,
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = BrandPrimary),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text(text = "Simulate Pay", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                        OutlinedButton(
                            onClick = onNavigateToPlay,
                            shape = RoundedCornerShape(10.dp),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text(text = "Play Hub", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = BrandPrimary)
                        }
                    }
                }

                // Recent Transactions
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Recent Transactions (Demo)",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = BrandNavy
                        )
                        Text(
                            text = "View All →",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = BrandPrimary,
                            modifier = Modifier.clickable { onNavigateToTransactions() }
                        )
                    }
                }

                items(sampleTransactions) { txn ->
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = BrandSurface),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            modifier = Modifier
                                .padding(12.dp)
                                .fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(text = txn.customerName, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)
                                Text(text = "${txn.id} • ${txn.timestamp}", fontSize = 11.sp, color = BrandMuted)
                            }
                            Column(horizontalAlignment = Alignment.End) {
                                Text(text = "₹${txn.amount}", fontWeight = FontWeight.Black, fontSize = 15.sp, color = BrandNavy)
                                Text(text = txn.status, fontSize = 10.sp, color = if (txn.status.contains("Successful")) BrandAccent else Color(0xFFF59E0B))
                            }
                        }
                    }
                }

                // Policy-Safe AdSlot below merchant info
                item {
                    AdSlotPlaceholder(placementId = "home_feed")
                    Spacer(modifier = Modifier.height(16.dp))
                }
            }
        }
    }
}
