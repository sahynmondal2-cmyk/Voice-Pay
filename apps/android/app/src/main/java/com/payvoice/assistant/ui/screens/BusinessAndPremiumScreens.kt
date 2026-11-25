package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.payvoice.assistant.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BusinessScreen(onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Business Counter Hub", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
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
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = BrandSurface)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Maa Tara Sweets & Daily Needs", fontWeight = FontWeight.Bold, fontSize = 15.sp, color = BrandNavy)
                    Text("Terminal ID: PV-KOL-9921 • Garia, Kolkata", fontSize = 12.sp, color = BrandMuted)
                    Text("VPA: maatarasweets@demo-upi", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = BrandAccent)
                }
            }

            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = BrandSurface)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Hardware Health Status", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = BrandNavy)
                    Text("Battery: 94% (Good)", fontSize = 12.sp, color = BrandMuted)
                    Text("SIM: Airtel 4G IoT (Online)", fontSize = 12.sp, color = BrandAccent)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PremiumScreen(onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Business Premium (Demo)", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
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
                Surface(
                    color = Color(0xFFFEF3C7),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text(
                        text = "Proposed Pricing Demo: ₹49/month or ₹499/year. Zero real transactions are initiated.",
                        color = Color(0xFF78350F),
                        fontSize = 11.sp,
                        modifier = Modifier.padding(10.dp)
                    )
                }
            }

            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = BrandSurface)
                ) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Text("Business Premium Tier", fontWeight = FontWeight.Black, fontSize = 18.sp, color = BrandNavy)
                        Text("₹49 / month (Proposed)", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = BrandAccent)

                        val perks = listOf(
                            "100% Ad-Free Experience",
                            "Multi-Store Outlets Management",
                            "Staff Sound-Receiver Accounts",
                            "CSV Spreadsheets Export"
                        )
                        perks.forEach { perk ->
                            Text("✓ $perk", fontSize = 12.sp, color = BrandNavy)
                        }

                        Spacer(modifier = Modifier.height(6.dp))
                        Button(
                            onClick = { /* Demo trigger */ },
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.buttonColors(containerColor = BrandPrimary),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Simulate Upgrade (Demo)", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}
