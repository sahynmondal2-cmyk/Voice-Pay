package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.VolumeUp
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TransactionsScreen(
    onBack: () -> Unit,
    onSpeakTxn: (DemoTransaction) -> Unit
) {
    val transactions = listOf(
        DemoTransaction("DEMO-TXN-884910", "11:32 AM", 150, "Demo Successful", "Aniket Sen", "aniketsen***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884909", "11:15 AM", 45, "Demo Successful", "Priya Banerjee", "priya.b***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884908", "10:50 AM", 520, "Demo Successful", "Rahul Sharma", "rahul.sharma***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884907", "10:22 AM", 25, "Demo Successful", "Tanmay Das", "tanmay99***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884906", "09:40 AM", 200, "Demo Pending", "Riya Mukherjee", "riyamuk***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884905", "09:05 AM", 350, "Demo Successful", "Bikash Roy", "bikash.roy***@demo-upi", "UPI QR Demo"),
        DemoTransaction("DEMO-TXN-884904", "08:15 AM", 80, "Demo Failed", "Amitava Ghosh", "amitava***@demo-upi", "UPI QR Demo")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Demo Transactions Ledger", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
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
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            item {
                Surface(
                    color = Color(0xFFFEF3C7),
                    shape = RoundedCornerShape(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = "Artificial demo references only. Bank settlement requires authorized provider integration.",
                        color = Color(0xFF78350F),
                        fontSize = 11.sp,
                        modifier = Modifier.padding(10.dp)
                    )
                }
            }

            items(transactions) { txn ->
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = BrandSurface),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier
                            .padding(14.dp)
                            .fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(text = txn.customerName, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = BrandNavy)
                            Text(text = "${txn.id} • ${txn.timestamp}", fontSize = 11.sp, color = BrandMuted)
                            Text(text = txn.status, fontSize = 10.sp, fontWeight = FontWeight.SemiBold, color = if (txn.status.contains("Successful")) BrandAccent else Color(0xFFF59E0B))
                        }

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(text = "₹${txn.amount}", fontWeight = FontWeight.Black, fontSize = 16.sp, color = BrandNavy)
                            Spacer(modifier = Modifier.width(8.dp))
                            IconButton(onClick = { onSpeakTxn(txn) }) {
                                Icon(Icons.Default.VolumeUp, contentDescription = "Speak", tint = BrandPrimary)
                            }
                        }
                    }
                }
            }
        }
    }
}
