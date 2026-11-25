# PayVoice — Every Payment, Heard Instantly

![PayVoice Banner](apps/web/public/icon-192.svg)

> **Product Direction**: A merchant-first payment voice assistant with an optional casual-play zone, transparent advertising placements, and a proposed business tier.  
> **Audience**: Indian merchants, initially tailored for West Bengal (Bengali, Hindi, and English).  
> **Important Scope Note**: This project is a frontend specification and interactive design implementation. All payment amounts, UPI references (`DEMO-TXN-...`), and bank balances are artificial demo data. No real payment processing, no live ad network SDK, and no real subscription collection are executed.

---

## Visual Identity & Design Tokens

| Token | Hex Value | Usage |
|---|---|---|
| **Primary Green** | `#14532D` | Top bar, primary brand actions, header gradient |
| **Accent Green** | `#22C55E` | Highlights, status indicators, audio waves, badges |
| **Navy Slate** | `#0F172A` | Typography, dark containers, contrast accents |
| **Background** | `#F8FAFC` | Light mode clean canvas |
| **Surface** | `#FFFFFF` | Card backgrounds, dialog containers |
| **Muted Slate** | `#64748B` | Secondary captions, timestamps |
| **Dark Theme** | `#0B1220` / `#111827` | High-contrast accessible dark mode |

---

## Key Product Pillars

### 1. Trusted Payment Voice Experience
- **Instant Spoken Announcements**: Uses the browser's native Web Speech API to pronounce incoming transaction amounts clearly in **Bengali (`bn`)**, **Hindi (`hi`)**, or **Indian English (`en`)**.
- **High-Fidelity Audio Chimes**: Web Audio API oscillator synthesis generating authentic fintech dual-tone bell chimes (`bell-high`, `modern-chime`, `soft-ding`) that cut through market noise.
- **Sound Readiness Card**: Direct audio status check, 1-tap browser audio unlock, and interactive test voice button.
- **Simulate Payment Modal**: Interactive tool on every screen to simulate customer UPI QR payments and hear instant voice playback.
- **Audio Troubleshooting Guide**: Explains browser autoplay limits and PWA background audio sleep characteristics.

### 2. Smart Merchant Tools & Reports
- **Real-Time Simulated Ledger**: Filter by status (*Demo Successful, Demo Pending, Demo Failed, Demo Reversed*), amount range, date, and sorting.
- **Transaction Details Drawer**: Slide-over panel with artificial demo reference IDs, masked VPA, audio replay button, and print receipt preview.
- **CSV Data Export**: One-click export for accountant/GST review.
- **Visual Analytics**: Interactive Recharts graphs showing hourly revenue trends, transaction count bars, and payment mode distributions.
- **Business Counter Hub**: Hardware pairing details, 4G cellular IoT status, battery monitoring, and staff roles demo.

### 3. PayVoice Play — Optional Merchant Break Zone
- **Completely Optional**: Merchant tools and payment alerts are always accessible in 1 tap (`← Back to Merchant Tools`).
- **Zero Gambling / No Prize Claims**: Strictly casual entertainment for quiet counter downtime. No cash rewards, loot boxes, or pay-to-win mechanics.
- **Friendly Streak Counter**: Positive progress indicator that does not punish missed days.
- **Playable Local Games**:
  1. **Daily Brain Spark**: 1 daily logic and math puzzle with hints and explanations.
  2. **Shopkeeper Memory Match**: Configurable 4x4 card matching focus game with moves counter and optional timer.
  3. **Word Builder**: Multilingual scrambled letter puzzle supporting Bengali, Hindi, and English.
  4. **Quick Tap Reflex**: Friendly reaction speed practice with millisecond measurement.

### 4. Policy-Safe Ad-First Monetization
- **Centralized `AdSlot` Component**: Clear placement IDs (`home_feed`, `business_tips`, `play_hub`, `discover_offers`) with loading and fallback states.
- **`AdPolicyGuard` Safety Rules**: Ads are **strictly prohibited** from interrupting payment alerts, voice controls, active mini-games, or login screens.
- **Ad Preferences Screen**: Transparent partner disclosure and toggle for personalized recommendations.
- **Future SDK Adapter Interfaces**: Prepared clean interfaces for future Google Mobile Ads (AdMob) and Web ad networks.

### 5. Proposed Business Premium Tier
- **Demo Pricing**: Basic Free at **₹0**, and proposed Business Premium at **₹49/month** or **₹499/year**.
- **Interactive Upgrade Simulation**: Instant demo feature unlock, feature comparison table, multi-shop support, and 100% ad-free experience.

### 6. Demo Admin Console (`/admin-demo`)
- Inspector for mock merchants, live soundbox hardware units, simulated ledger stream, ad placements, and customer support tickets. Protected with prominent demo banners.

---

## Project Structure

```
PayVoice/
├── apps/
│   ├── web/                     # React + TypeScript + Vite + Tailwind CSS + PWA
│   │   ├── src/
│   │   │   ├── components/      # Common (AdSlot, Logo, Banner), Layout, Home, Transactions
│   │   │   ├── context/         # AppContext (Auth, Audio, Voice, Transactions, Theme, Lang)
│   │   │   ├── data/            # Isolated mock repositories (Merchants, Transactions, Puzzles)
│   │   │   ├── locales/         # i18n dictionaries (en.ts, bn.ts, hi.ts)
│   │   │   ├── pages/           # All 20+ routes (Dashboard, PlayHub, Games, Reports, Premium, Admin)
│   │   │   ├── services/        # AudioService (Web Audio + Web Speech), AdAdapter
│   │   │   ├── styles/          # Tailwind design tokens and accessible keyframes
│   │   │   ├── tests/           # Automated acceptance test suite
│   │   │   └── types/           # Domain models
│   │   ├── public/              # Web manifest, Service Worker (sw.js), offline fallback, SVG icons
│   │   └── package.json
│   └── android/                 # Kotlin + Jetpack Compose + Material 3 Android App
│       ├── app/
│       │   ├── src/main/
│       │   │   ├── AndroidManifest.xml
│       │   │   ├── java/com/payvoice/assistant/
│       │   │   │   ├── MainActivity.kt
│       │   │   │   ├── navigation/NavRoutes.kt
│       │   │   │   ├── service/TextToSpeechService.kt
│       │   │   │   ├── theme/Color.kt, Theme.kt
│       │   │   │   └── ui/screens/  # Compose screens for Dashboard, Transactions, PlayHub, etc.
│       │   │   └── res/values/
│       │   └── build.gradle.kts
│       └── build.gradle.kts
├── packages/
│   └── shared-types/            # Shared TypeScript domain contracts
├── docs/
│   ├── BACKEND_INTEGRATION_CHECKLIST.md  # Step-by-step production backend migration
│   ├── TEST_REPORT.md                    # QA verification, test matrix, and viewport audits
│   └── AD_SAFETY_POLICY.md               # Strict monetization safety guidelines
└── README.md
```

---

## Quick Start & Build Commands

### Web Application (React + Vite + PWA)

```bash
# 1. Install dependencies
cd apps/web
npm install

# 2. Run typecheck & production build
npm run build

# 3. Preview production build locally
npm run preview
```

### Run Automated Acceptance Tests

```bash
node apps/web/src/tests/automated_acceptance.test.cjs
```
*Executes all 9 automated verification suites covering PWA assets, policy guards, audio chimes, locales, mini-game logic, premium pricing, and Android structure.*

### Android Native Application (Jetpack Compose)

```bash
# Open apps/android in Android Studio (Iguana / Jellyfish or newer)
# Requires JDK 17+ and Android SDK 34
./gradlew assembleDebug
```

---

## Documentation Links

- [Backend & Provider Integration Checklist](file:///c:/Users/sayan/OneDrive/Desktop/PayVoice/docs/BACKEND_INTEGRATION_CHECKLIST.md)
- [QA & Acceptance Test Report](file:///c:/Users/sayan/OneDrive/Desktop/PayVoice/docs/TEST_REPORT.md)
- [Ad-Safety & Policy Guide](file:///c:/Users/sayan/OneDrive/Desktop/PayVoice/docs/AD_SAFETY_POLICY.md)
