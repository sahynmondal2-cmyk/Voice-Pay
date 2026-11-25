package com.payvoice.assistant.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
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
fun DailyBrainSparkScreen(onBack: () -> Unit) {
    var selectedOption by remember { mutableStateOf<Int?>(null) }
    var showExplanation by remember { mutableStateOf(false) }

    val options = listOf("₹65", "₹100", "₹135", "₹165")
    val correctIndex = 0

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Daily Brain Spark", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
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
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(
                        text = "A customer buys ₹35 of sweets and pays with a ₹100 note. You get change from the neighboring tea stall and give the customer ₹65 change. Later, the note turns out to be counterfeit! What is your net cash loss (excluding the sweets)?",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium,
                        color = BrandNavy,
                        lineHeight = 20.sp
                    )

                    options.forEachIndexed { index, opt ->
                        OutlinedButton(
                            onClick = {
                                selectedOption = index
                                showExplanation = true
                            },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.outlinedButtonColors(
                                containerColor = when {
                                    selectedOption == index && index == correctIndex -> Color(0xFFDCFCE7)
                                    selectedOption == index && index != correctIndex -> Color(0xFFFFE4E6)
                                    else -> Color.Transparent
                                }
                            )
                        ) {
                            Text(
                                text = opt,
                                fontWeight = FontWeight.Bold,
                                color = BrandNavy
                            )
                        }
                    }

                    if (showExplanation) {
                        Surface(
                            color = Color(0xFFF1F5F9),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text(
                                text = "Correct! The neighbor transaction was neutral (they gave ₹100 change and received ₹100 back). The fraudster took ₹65 cash plus sweets. Hence your cash loss is ₹65.",
                                fontSize = 12.sp,
                                color = BrandNavy,
                                modifier = Modifier.padding(12.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MemoryMatchScreen(onBack: () -> Unit) {
    var moves by remember { mutableIntStateOf(0) }
    val symbols = listOf("☕", "🍬", "📢", "🪙", "🏪", "🧾", "🔔", "🛡️")
    val cards = remember {
        (symbols + symbols).shuffled()
    }
    var flippedIndices by remember { mutableStateOf(setOf<Int>()) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Memory Match 4x4", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = BrandSurface) },
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
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Moves: $moves", fontWeight = FontWeight.Bold, color = BrandNavy)
                Text("Pairs: ${flippedIndices.size / 2} / 8", fontWeight = FontWeight.Bold, color = BrandAccent)
            }

            LazyVerticalGrid(
                columns = GridCells.Fixed(4),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(cards.indices.toList()) { index ->
                    val isFlipped = flippedIndices.contains(index)
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isFlipped) Color(0xFFDCFCE7) else BrandPrimary
                        ),
                        modifier = Modifier
                            .aspectRatio(1f)
                            .clickable {
                                if (!isFlipped) {
                                    moves++
                                    flippedIndices = flippedIndices + index
                                }
                            }
                    ) {
                        Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                            Text(
                                text = if (isFlipped) cards[index] else "?",
                                fontSize = 24.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (isFlipped) BrandNavy else Color.White
                            )
                        }
                    }
                }
            }
        }
    }
}
