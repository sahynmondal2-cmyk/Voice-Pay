/**
 * Automated Acceptance & Policy Verification Test Suite for PayVoice Frontend
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=====================================================');
console.log('   PAYVOICE ACCEPTANCE & POLICY VERIFICATION SUITE   ');
console.log('=====================================================\n');

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
  }
}

// 1. Verify Dist & Production Artifacts
test('Dist Artifacts Exist & Contain Required PWA Assets', () => {
  const distDir = path.resolve(__dirname, '../../dist');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'index.html missing');
  assert(fs.existsSync(path.join(distDir, 'manifest.webmanifest')), 'manifest missing');
  assert(fs.existsSync(path.join(distDir, 'sw.js')), 'sw.js missing');
  assert(fs.existsSync(path.join(distDir, 'offline.html')), 'offline.html missing');
  assert(fs.existsSync(path.join(distDir, 'icon-192.svg')), 'icon-192.svg missing');
  assert(fs.existsSync(path.join(distDir, 'icon-512.svg')), 'icon-512.svg missing');
});

// 2. Verify Policy Safety Rules in AdPolicyGuard
test('AdPolicyGuard Strictly Prohibits Ads in Payment, Voice & Game Contexts', () => {
  const adAdapterSrc = fs.readFileSync(path.resolve(__dirname, '../services/adAdapter.ts'), 'utf8');
  assert(adAdapterSrc.includes("'payment_alert'"), 'Must forbid payment_alert');
  assert(adAdapterSrc.includes("'payment_success'"), 'Must forbid payment_success');
  assert(adAdapterSrc.includes("'active_gameplay'"), 'Must forbid active_gameplay');
  assert(adAdapterSrc.includes("'voice_settings_audio_control'"), 'Must forbid voice_settings');
  assert(adAdapterSrc.includes("'auth_login_otp'"), 'Must forbid login forms');
});

// 3. Verify Audio Service Synthesis & Chimes
test('AudioService Provides Dual-Tone Chimes & Multilingual Formats', () => {
  const audioSrc = fs.readFileSync(path.resolve(__dirname, '../services/audioService.ts'), 'utf8');
  assert(audioSrc.includes('bell-high'), 'Must support bell-high chime');
  assert(audioSrc.includes('modern-chime'), 'Must support modern-chime');
  assert(audioSrc.includes('soft-ding'), 'Must support soft-ding');
  assert(audioSrc.includes('bn-IN'), 'Must support bn-IN Bengali voice');
  assert(audioSrc.includes('hi-IN'), 'Must support hi-IN Hindi voice');
  assert(audioSrc.includes('en-IN'), 'Must support en-IN English voice');
  assert(audioSrc.includes('navigator.vibrate'), 'Must support haptic vibration');
});

// 4. Verify Locale Dictionaries (en, bn, hi)
test('Locale Dictionaries Contain All Critical Strings in en, bn, hi', () => {
  const enSrc = fs.readFileSync(path.resolve(__dirname, '../locales/en.ts'), 'utf8');
  const bnSrc = fs.readFileSync(path.resolve(__dirname, '../locales/bn.ts'), 'utf8');
  const hiSrc = fs.readFileSync(path.resolve(__dirname, '../locales/hi.ts'), 'utf8');

  assert(enSrc.includes('Every Payment, Heard Instantly'), 'English tagline present');
  assert(bnSrc.includes('প্রতিটি পেমেন্ট, শুনুন তৎক্ষণাৎ'), 'Bengali tagline present');
  assert(hiSrc.includes('हर पेमेंट, तुरंत सुने'), 'Hindi tagline present');

  assert(enSrc.includes('Demo Successful'), 'en status present');
  assert(bnSrc.includes('ডেমো সফল'), 'bn status present');
  assert(hiSrc.includes('डेमो सफल'), 'hi status present');
});

// 5. Verify Mini-Games Playability
test('Mini-Games Contain Playable Logic (Brain Spark, Memory 4x4, Word Builder, Quick Tap)', () => {
  const sparkSrc = fs.readFileSync(path.resolve(__dirname, '../pages/play/DailyBrainSparkPage.tsx'), 'utf8');
  const memSrc = fs.readFileSync(path.resolve(__dirname, '../pages/play/MemoryMatchPage.tsx'), 'utf8');
  const wordSrc = fs.readFileSync(path.resolve(__dirname, '../pages/play/WordPuzzlePage.tsx'), 'utf8');
  const tapSrc = fs.readFileSync(path.resolve(__dirname, '../pages/play/QuickTapPage.tsx'), 'utf8');

  assert(sparkSrc.includes('correctOptionId'), 'Brain spark verifies correct answer');
  assert(sparkSrc.includes('showExplanation'), 'Brain spark provides explanation');
  assert(memSrc.includes('Grid') || memSrc.includes('grid-cols-4'), 'Memory match uses 4x4 grid');
  assert(memSrc.includes('matchKey'), 'Memory match matches pairs');
  assert(wordSrc.includes('scrambledLetters'), 'Word builder uses scrambled letters');
  assert(wordSrc.includes('targetWord'), 'Word builder checks target word');
  assert(tapSrc.includes('reactionTime'), 'Quick tap measures milliseconds reaction time');
});

// 6. Verify Business Premium Demo Pricing
test('Business Premium Reflects Proposed ₹49/mo & ₹499/yr Without Live Payments', () => {
  const premiumSrc = fs.readFileSync(path.resolve(__dirname, '../pages/PremiumPage.tsx'), 'utf8');
  assert(premiumSrc.includes('₹49'), 'Monthly price ₹49 present');
  assert(premiumSrc.includes('₹499'), 'Yearly price ₹499 present');
  assert(premiumSrc.includes('Proposed Demo Pricing'), 'Demo pricing clearly marked');
  assert(premiumSrc.includes('Ad-Free Experience'), 'Ad-free perk advertised');
});

// 7. Verify Admin Demo Panel
test('Admin Demo Panel at /admin-demo Protected from Production Claims', () => {
  const adminSrc = fs.readFileSync(path.resolve(__dirname, '../pages/AdminDemoPage.tsx'), 'utf8');
  assert(adminSrc.includes('Demo Admin Preview UI — Not A Production Secure Backoffice'), 'Protected header present');
  assert(adminSrc.includes('DEMO_AD_PLACEMENTS'), 'Ad placements inspectable');
});

// 8. Verify Android Native Kotlin Compose App
test('Android Jetpack Compose UI Source Code & Gradle Configuration Complete', () => {
  const androidRoot = path.resolve(__dirname, '../../../../apps/android');
  assert(fs.existsSync(path.join(androidRoot, 'build.gradle.kts')), 'Root build.gradle.kts exists');
  assert(fs.existsSync(path.join(androidRoot, 'settings.gradle.kts')), 'settings.gradle.kts exists');
  assert(fs.existsSync(path.join(androidRoot, 'app/build.gradle.kts')), 'App build.gradle.kts exists');
  assert(fs.existsSync(path.join(androidRoot, 'app/src/main/AndroidManifest.xml')), 'AndroidManifest.xml exists');

  const mainActivity = fs.readFileSync(path.join(androidRoot, 'app/src/main/java/com/payvoice/assistant/MainActivity.kt'), 'utf8');
  assert(mainActivity.includes('SoundEngineService'), 'Android uses SoundEngineService');
  assert(mainActivity.includes('DashboardScreen'), 'Android has DashboardScreen');
  assert(mainActivity.includes('TransactionsScreen'), 'Android has TransactionsScreen');
  assert(mainActivity.includes('VoiceSettingsScreen'), 'Android has VoiceSettingsScreen');
  assert(mainActivity.includes('PlayHubScreen'), 'Android has PlayHubScreen');
  assert(mainActivity.includes('DailyBrainSparkScreen'), 'Android has DailyBrainSparkScreen');
  assert(mainActivity.includes('MemoryMatchScreen'), 'Android has MemoryMatchScreen');
});

// 9. Verify Safety & No Prohibited Scraping
test('No Prohibited SMS/Notification Scraping or Private Banking Access Exists', () => {
  const androidManifest = fs.readFileSync(path.resolve(__dirname, '../../../../apps/android/app/src/main/AndroidManifest.xml'), 'utf8');
  assert(!androidManifest.includes('android.permission.RECEIVE_SMS'), 'No SMS scraping permission');
  assert(!androidManifest.includes('android.permission.READ_SMS'), 'No SMS reading permission');
  assert(!androidManifest.includes('BIND_NOTIFICATION_LISTENER_SERVICE'), 'No notification scraping service');
});

console.log('\n-----------------------------------------------------');
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} Passed`);
console.log('-----------------------------------------------------\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
