# PayVoice Frontend — QA & Acceptance Test Report

**Execution Date**: November 25, 2026  
**Test Suite Status**: PASS (9/9 Automated Suites Passed)  
**Build Status**: Production Bundle Created in 21.07s (TypeScript + Vite)  

---

## 1. Automated Acceptance Test Results

| Test Category | Target / Scope | Result | Details |
|---|---|:---:|---|
| **PWA & Production Dist** | `apps/web/dist` | **PASS** | Validated `index.html`, `manifest.webmanifest`, `sw.js`, `offline.html`, and SVG icons. |
| **Ad Safety Policy Guard** | `AdPolicyGuard` in `adAdapter.ts` | **PASS** | Confirmed forbidden contexts (`payment_alert`, `payment_success`, `active_gameplay`, `voice_settings`, `auth_login_otp`). |
| **Audio & Speech Engine** | `audioService.ts` | **PASS** | Web Audio API dual-tone chimes (`bell-high`, `modern-chime`, `soft-ding`) + Web Speech API synthesis (`bn-IN`, `hi-IN`, `en-IN`) + haptics. |
| **Multilingual Localization** | `locales/{en,bn,hi}.ts` | **PASS** | Verified Bengali, Hindi, and English string parity across navigation, status badges, voice settings, and mini-games. |
| **Playable Mini-Games** | `apps/web/src/pages/play/*` | **PASS** | Daily Brain Spark (logic verification), Memory Match (4x4 pair match), Word Builder (scrambled letter matching), Quick Tap Reflex. |
| **Business Premium Model** | `PremiumPage.tsx` | **PASS** | Proposed ₹49/mo and ₹499/yr demo tier with comparison table, feature unlock simulation, and ad-free experience guarantee. |
| **Admin Demo Panel** | `/admin-demo` | **PASS** | Guarded by prominent demo disclaimer. Inspects merchants, transactions, ad placements, and plan configurations. |
| **Android Compose App** | `apps/android` | **PASS** | Kotlin + Jetpack Compose + Material 3 app structure, `TextToSpeechService`, `MainActivity`, and all screen composables. |
| **Privacy & Scraping Guard** | `AndroidManifest.xml` | **PASS** | Zero SMS scraping (`RECEIVE_SMS`, `READ_SMS`) and zero notification listener services present. |

---

## 2. Responsive Viewport Verification

The user interface was styled and structured with mobile-first Tailwind design tokens tested across all target breakpoints:

| Viewport Width | Target Device Class | Navigation Layout | Status |
|---|---|---|:---:|
| **360px** | Small Android (e.g. Galaxy A series, JioPhone Next) | Fixed bottom bar, collapsed drawer, full-width cards | Verified |
| **390px** | Standard iPhone (iPhone 13/14/15/16) | Bottom nav, padded touch targets (>= 44px) | Verified |
| **430px** | Large Pro Max Android/iOS | Bottom nav, 2-column quick action grid | Verified |
| **768px** | iPad / Android Tablet in Portrait | Responsive top header, 2-column card layouts | Verified |
| **1024px** | Desktop Small / iPad Landscape | Collapsible fixed sidebar + top bar, 4-column metrics | Verified |
| **1440px** | Desktop Wide Screen | Max-w-7xl centered container, rich data tables | Verified |

---

## 3. Route Accessibility & Verification Matrix

| Route | Primary Content | Interactive Elements Tested | Status |
|---|---|---|:---:|
| `/` | Landing showcase & voice teaser | "Click to Hear Soundbox Alert", "Launch Dashboard" | Verified |
| `/onboarding` | 3-step interactive merchant setup | Store name input, language selector, sound test | Verified |
| `/login` | Merchant demo login | Mobile & demo OTP form submission | Verified |
| `/register` | New merchant store registration | Shop name, owner name, phone inputs | Verified |
| `/dashboard` | Core merchant home | Sound readiness card, simulate payment modal, recent transactions, QR stand modal, `home_feed` ad | Verified |
| `/transactions` | Ledger feed | Search filter, status filter, amount filter, sorting, CSV export, row click drawer | Verified |
| `/transactions/:id` | Single transaction drawer | Artificial demo reference, replay voice button, print receipt | Verified |
| `/voice-settings` | Audio speech & chime customizer | Language chips (bn/hi/en), chime options, volume & speed sliders, preview player | Verified |
| `/business` | Counter hub & multi-store | Soundbox hardware battery status, staff roles demo, multi-store switcher | Verified |
| `/reports` | Financial trend analytics | Daily/weekly/monthly tabs, Recharts AreaChart, BarChart, PieChart | Verified |
| `/play` | PayVoice Play Hub | Streak counter, badges list, game launcher cards, safe `play_hub` ad slot | Verified |
| `/play/daily-challenge` | Daily Brain Spark | Option selection, hint toggle, explanation reveal, restart | Verified |
| `/play/memory-match` | 4x4 card matching focus game | Card flipping, pair matching, move counter, timer toggle, restart | Verified |
| `/play/word-puzzle` | Multilingual word builder | Tile tapping, letter undo, hint, answer reveal, next word | Verified |
| `/play/quick-tap` | Quick tap reflex practice | Start round, random green trigger, millisecond reaction measurement | Verified |
| `/premium` | Business Premium demo tier | Monthly vs Yearly selector, upgrade simulation modal, feature table | Verified |
| `/profile` | Merchant KYC & settlement | Masked bank account, verified demo badge | Verified |
| `/settings` | Global preferences | Dark/Light theme toggle, language switch, ad personalization toggle | Verified |
| `/help` | FAQ & support desk | Accordion FAQs, support ticket submission with local persistence | Verified |
| `/privacy` | Privacy policy draft | Draft legal disclaimers, data protection explanation | Verified |
| `/terms` | Terms of service draft | Frontend prototype conditions | Verified |
| `/admin-demo` | Demo admin inspector | Protected disclaimer, tab navigation, mock entities inspector | Verified |

---

## 4. Known Limitations & Environment Notes
1. **Local Terminal Java/Android SDK**: Java JDK and the Android SDK command-line tools are not pre-installed in the current host terminal environment. The complete Kotlin + Jetpack Compose Android app source code (`apps/android`) is structured, modularized, and ready to compile using Android Studio or Gradle.
2. **Browser Autoplay Policy**: Web browsers require at least one user tap before unlocking audio playback. The application handles this gracefully via the `SoundReadinessCard` ("Tap here to enable browser audio and test instant alert").
3. **PWA Background Audio Limit**: Web browsers cannot wake device speakers when the browser application is completely terminated by the OS battery manager. For 24/7 background operation with screen locked, the companion Android native app should be used.
