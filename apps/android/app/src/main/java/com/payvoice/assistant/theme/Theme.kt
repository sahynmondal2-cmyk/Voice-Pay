package com.payvoice.assistant.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = BrandAccent,
    secondary = BrandPrimaryLight,
    background = BrandDarkBg,
    surface = BrandDarkSurface,
    onPrimary = BrandNavy,
    onBackground = BrandBackground,
    onSurface = BrandBackground
)

private val LightColorScheme = lightColorScheme(
    primary = BrandPrimary,
    secondary = BrandAccent,
    background = BrandBackground,
    surface = BrandSurface,
    onPrimary = BrandSurface,
    onBackground = BrandNavy,
    onSurface = BrandNavy
)

@Composable
fun PayVoiceTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
