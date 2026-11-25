package com.payvoice.assistant.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.payvoice.assistant.theme.*

@Composable
fun DemoModeBanner(modifier: Modifier = Modifier) {
    Surface(
        color = Color(0xFFFEF3C7),
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "DEMO",
                color = Color(0xFF78350F),
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .background(Color(0xFFF59E0B), RoundedCornerShape(4.dp))
                    .padding(horizontal = 6.dp, vertical = 2.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Demo Mode — Simulated payments only. No live UPI credentials.",
                color = Color(0xFF78350F),
                fontSize = 11.sp,
                fontWeight = FontWeight.Medium
            )
        }
    }
}

@Composable
fun AdSlotPlaceholder(
    placementId: String,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = BrandSurface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "SPONSORED DEMO",
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    color = BrandMuted
                )
                Text(
                    text = "Partner Placement",
                    fontSize = 9.sp,
                    color = BrandMuted
                )
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Bengal Merchant Wholesale Supplies",
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                color = BrandNavy
            )
            Text(
                text = "Special wholesale pricing for FMCG and retail sweet shops. Next-day delivery.",
                fontSize = 11.sp,
                color = BrandMuted
            )
        }
    }
}
