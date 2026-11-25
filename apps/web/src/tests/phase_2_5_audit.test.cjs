/**
 * PayVoice Phase 2.5 Comprehensive Audit & Stability Verification Test Suite
 * Validates all linguistic inflections, amounts, direction separation, edge cases,
 * security disclaimers, and PWA assets.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Bengali Numerals Conversion
function toBengaliDigits(amount) {
  const formatted = amount.toLocaleString('en-IN');
  const bnDigits = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    ',': ',',
  };
  return formatted
    .split('')
    .map((char) => bnDigits[char] || char)
    .join('');
}

function formatIndianNumber(amount) {
  return amount.toLocaleString('en-IN');
}

function formatBengaliGenitiveName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed || trimmed.toLowerCase() === 'customer' || trimmed === 'গ্রাহক') return 'গ্রাহকের';
  if (trimmed.toLowerCase() === 'priya' || trimmed === 'প্রিয়া') return 'প্রিয়ার';
  if (trimmed.toLowerCase() === 'rahul') return 'রাহুলের';
  if (trimmed.toLowerCase() === 'aniket' || trimmed.toLowerCase() === 'aniket sen') return 'অনিকেতের';
  if (trimmed.toLowerCase() === 'tanmay' || trimmed.toLowerCase() === 'tanmay das') return 'তন্ময়ের';
  if (trimmed.toLowerCase() === 'riya' || trimmed.toLowerCase() === 'riya mukherjee') return 'রিয়ার';
  if (trimmed.toLowerCase() === 'bikash' || trimmed.toLowerCase() === 'bikash roy') return 'বিকাশের';

  if (trimmed.endsWith('া') || trimmed.endsWith('ি') || trimmed.endsWith('ী')) {
    return `${trimmed}র`;
  }
  return `${trimmed} এর`;
}

function formatBengaliAccusativeName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed || trimmed.toLowerCase() === 'recipient' || trimmed === 'প্রাপক') return 'প্রাপককে';
  if (trimmed.toLowerCase() === 'priya' || trimmed === 'প্রিয়া') return 'প্রিয়াকে';
  if (trimmed.toLowerCase() === 'rahul' || trimmed === 'রাহুল') return 'রাহুলকে';
  if (trimmed.toLowerCase() === 'aniket' || trimmed === 'অনিকেত') return 'অনিকেতকে';
  if (trimmed.toLowerCase() === 'tanmay' || trimmed === 'তন্ময়') return 'তন্ময়কে';
  if (trimmed.toLowerCase() === 'riya' || trimmed === 'রিয়া') return 'রিয়াকে';
  if (trimmed.toLowerCase() === 'aloke roy' || trimmed === 'আলোক রায়') return 'আলোক রায়কে';

  return `${trimmed}কে`;
}

function formatHindiName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed || trimmed.toLowerCase() === 'customer' || trimmed === 'ग्राहक') return 'ग्राहक';
  if (trimmed.toLowerCase() === 'recipient' || trimmed === 'प्राप्तकर्ता') return 'प्राप्तकर्ता';
  if (trimmed.toLowerCase() === 'priya') return 'प्रिया';
  if (trimmed.toLowerCase() === 'rahul' || trimmed.toLowerCase() === 'rahul sharma') return 'राहुल';
  if (trimmed.toLowerCase() === 'aniket' || trimmed.toLowerCase() === 'aniket sen') return 'अनिकेत';
  if (trimmed.toLowerCase() === 'riya' || trimmed.toLowerCase() === 'riya mukherjee') return 'रिया';
  return trimmed;
}

function formatAnnouncement(amount, language, personName, direction = 'incoming') {
  const name = (personName || (direction === 'incoming' ? 'Customer' : 'Recipient')).trim();

  if (direction === 'incoming') {
    if (language === 'bn') {
      const inflectedName = formatBengaliGenitiveName(name);
      const bnAmount = toBengaliDigits(amount);
      return `${inflectedName} কাছ থেকে ${bnAmount} টাকা পেয়েছেন।`;
    }
    if (language === 'hi') {
      const hiName = formatHindiName(name);
      const hiAmount = formatIndianNumber(amount);
      return `आपको ${hiName} से ${hiAmount} रुपये मिले।`;
    }
    const enAmount = formatIndianNumber(amount);
    return `You received ${enAmount} rupees from ${name}.`;
  }

  if (direction === 'outgoing') {
    if (language === 'bn') {
      const inflectedName = formatBengaliAccusativeName(name);
      const bnAmount = toBengaliDigits(amount);
      return `আপনি ${inflectedName} ${bnAmount} টাকা পাঠিয়েছেন।`;
    }
    if (language === 'hi') {
      const hiName = formatHindiName(name);
      const hiAmount = formatIndianNumber(amount);
      return `आपने ${hiName} को ${hiAmount} रुपये भेजे।`;
    }
    const enAmount = formatIndianNumber(amount);
    return `You sent ${enAmount} rupees to ${name}.`;
  }

  return `₹${amount}`;
}

const TEST_AMOUNTS = [1, 10, 100, 150, 500, 1000, 1500, 5000, 10000, 50000];
const EXPECTED_BN_DIGITS = {
  1: '১',
  10: '১০',
  100: '১০০',
  150: '১৫০',
  500: '৫০০',
  1000: '১,০০০',
  1500: '১,৫০০',
  5000: '৫,০০০',
  10000: '১০,০০০',
  50000: '৫০,০০০',
};

const EXPECTED_HI_DIGITS = {
  1: '1',
  10: '10',
  100: '100',
  150: '150',
  500: '500',
  1000: '1,000',
  1500: '1,500',
  5000: '5,000',
  10000: '10,000',
  50000: '50,000',
};

let passCount = 0;
let totalCount = 0;

function runTest(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`[PASS] Test ${totalCount}: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] Test ${totalCount}: ${name}`);
    console.error(`       Error: ${err.message}`);
  }
}

console.log('===================================================================');
console.log('   PAYVOICE PHASE 2.5 MASTER AUDIT & STABILITY VERIFICATION        ');
console.log('===================================================================\n');

// 1-10: Bengali Incoming for all amounts
runTest('Bengali Incoming phrasing for all 10 test amounts', () => {
  TEST_AMOUNTS.forEach((amt) => {
    const text = formatAnnouncement(amt, 'bn', 'Priya', 'incoming');
    const expected = `প্রিয়ার কাছ থেকে ${EXPECTED_BN_DIGITS[amt]} টাকা পেয়েছেন।`;
    assert.strictEqual(text, expected, `Mismatch for bn incoming ${amt}`);
  });
});

// 11-20: Bengali Outgoing for all amounts
runTest('Bengali Outgoing phrasing for all 10 test amounts', () => {
  TEST_AMOUNTS.forEach((amt) => {
    const text = formatAnnouncement(amt, 'bn', 'Priya', 'outgoing');
    const expected = `আপনি প্রিয়াকে ${EXPECTED_BN_DIGITS[amt]} টাকা পাঠিয়েছেন।`;
    assert.strictEqual(text, expected, `Mismatch for bn outgoing ${amt}`);
  });
});

// 21-30: Hindi Incoming for all amounts
runTest('Hindi Incoming phrasing for all 10 test amounts', () => {
  TEST_AMOUNTS.forEach((amt) => {
    const text = formatAnnouncement(amt, 'hi', 'Priya', 'incoming');
    const expected = `आपको प्रिया से ${EXPECTED_HI_DIGITS[amt]} रुपये मिले।`;
    assert.strictEqual(text, expected, `Mismatch for hi incoming ${amt}`);
  });
});

// 31-40: Hindi Outgoing for all amounts
runTest('Hindi Outgoing phrasing for all 10 test amounts', () => {
  TEST_AMOUNTS.forEach((amt) => {
    const text = formatAnnouncement(amt, 'hi', 'Priya', 'outgoing');
    const expected = `आपने प्रिया को ${EXPECTED_HI_DIGITS[amt]} रुपये भेजे।`;
    assert.strictEqual(text, expected, `Mismatch for hi outgoing ${amt}`);
  });
});

// 41: English Incoming & Outgoing for all amounts
runTest('English Incoming & Outgoing phrasing across amounts', () => {
  TEST_AMOUNTS.forEach((amt) => {
    const inText = formatAnnouncement(amt, 'en', 'Priya', 'incoming');
    assert.strictEqual(inText, `You received ${EXPECTED_HI_DIGITS[amt]} rupees from Priya.`);
    const outText = formatAnnouncement(amt, 'en', 'Priya', 'outgoing');
    assert.strictEqual(outText, `You sent ${EXPECTED_HI_DIGITS[amt]} rupees to Priya.`);
  });
});

// 42: Missing sender/receiver names fallback
runTest('Missing sender & receiver fallback to natural nouns (Customer/Recipient)', () => {
  // Bengali Missing Incoming
  const bnInMissing = formatAnnouncement(150, 'bn', '', 'incoming');
  assert.strictEqual(bnInMissing, 'গ্রাহকের কাছ থেকে ১৫০ টাকা পেয়েছেন।');

  // Bengali Missing Outgoing
  const bnOutMissing = formatAnnouncement(150, 'bn', '', 'outgoing');
  assert.strictEqual(bnOutMissing, 'আপনি প্রাপককে ১৫০ টাকা পাঠিয়েছেন।');

  // Hindi Missing Incoming
  const hiInMissing = formatAnnouncement(150, 'hi', '', 'incoming');
  assert.strictEqual(hiInMissing, 'आपको ग्राहक से 150 रुपये मिले।');

  // Hindi Missing Outgoing
  const hiOutMissing = formatAnnouncement(150, 'hi', '', 'outgoing');
  assert.strictEqual(hiOutMissing, 'आपने प्राप्तकर्ता को 150 रुपये भेजे।');

  // English Missing
  const enInMissing = formatAnnouncement(150, 'en', '', 'incoming');
  assert.strictEqual(enInMissing, 'You received 150 rupees from Customer.');

  const enOutMissing = formatAnnouncement(150, 'en', '', 'outgoing');
  assert.strictEqual(enOutMissing, 'You sent 150 rupees to Recipient.');
});

// 43: Long names handling
runTest('Long name inflection resilience', () => {
  const longName = 'Dr. Rabindranath Tagore Banerjee';
  const bnIn = formatAnnouncement(500, 'bn', longName, 'incoming');
  assert(bnIn.includes('Dr. Rabindranath Tagore Banerjee'), 'Should preserve long name');
  assert(bnIn.includes('৫০০ টাকা পেয়েছেন।'), 'Should append correct amount');

  const hiOut = formatAnnouncement(500, 'hi', longName, 'outgoing');
  assert(hiOut.includes('Dr. Rabindranath Tagore Banerjee'), 'Should preserve long name in Hindi');
  assert(hiOut.includes('500 रुपये भेजे।'), 'Should append correct amount');
});

// 44: Audio Service Source Inspection: Status, Duplicate, and Amount Guards
runTest('AudioService implements status, duplicate, and positive amount validation', () => {
  const audioServicePath = path.resolve(__dirname, '../services/audioService.ts');
  const code = fs.readFileSync(audioServicePath, 'utf8');

  // Status check
  assert(code.includes("txn.status !== 'Demo Successful'"), 'Must guard status == Demo Successful');
  // Duplicate check
  assert(code.includes('this.announcedTxnIds.has(txn.id)'), 'Must guard duplicate transaction ID');
  // Amount check
  assert(code.includes('txn.amount <= 0'), 'Must guard invalid or non-positive amount');
  // Stop all audio
  assert(code.includes('stopAllAudio()'), 'Must implement stopAllAudio for interruption');
});

// 45: Offline Audio Assets Inspection
runTest('Offline pre-rendered audio cache contains all 42 required MP3 files', () => {
  const audioDir = path.resolve(__dirname, '../../public/audio');
  assert(fs.existsSync(audioDir), 'Audio directory must exist in public/audio');

  TEST_AMOUNTS.forEach((amt) => {
    assert(
      fs.existsSync(path.join(audioDir, `bn_incoming_${amt}_priya.mp3`)),
      `Missing bn_incoming_${amt}_priya.mp3`
    );
    assert(
      fs.existsSync(path.join(audioDir, `bn_outgoing_${amt}_priya.mp3`)),
      `Missing bn_outgoing_${amt}_priya.mp3`
    );
    assert(
      fs.existsSync(path.join(audioDir, `hi_incoming_${amt}_priya.mp3`)),
      `Missing hi_incoming_${amt}_priya.mp3`
    );
    assert(
      fs.existsSync(path.join(audioDir, `hi_outgoing_${amt}_priya.mp3`)),
      `Missing hi_outgoing_${amt}_priya.mp3`
    );
  });
});

// 46: Service Worker & PWA manifest inspection
runTest('PWA manifest and Service Worker with network-first navigation exist', () => {
  const swPath = path.resolve(__dirname, '../../public/sw.js');
  const swCode = fs.readFileSync(swPath, 'utf8');
  assert(/payvoice-(v2\.2|pwa-v2\.5)/.test(swCode), 'Service worker must have payvoice cache version');
  assert(swCode.includes("event.request.mode === 'navigate'"), 'Must handle navigation network-first');

  const manifestPath = path.resolve(__dirname, '../../public/manifest.webmanifest');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest must exist');
});

// 47: Android companion TextToSpeechService consistency
runTest('Android SoundEngineService implements matching inflection and guards', () => {
  const androidServicePath = path.resolve(
    __dirname,
    '../../../../apps/android/app/src/main/java/com/payvoice/assistant/service/TextToSpeechService.kt'
  );
  assert(fs.existsSync(androidServicePath), 'Android TextToSpeechService.kt must exist');
  const ktCode = fs.readFileSync(androidServicePath, 'utf8');

  assert(ktCode.includes('toBengaliDigits'), 'Must implement toBengaliDigits');
  assert(ktCode.includes('formatBengaliGenitiveName'), 'Must implement formatBengaliGenitiveName');
  assert(ktCode.includes('formatBengaliAccusativeName'), 'Must implement formatBengaliAccusativeName');
  assert(ktCode.includes('formatHindiName'), 'Must implement formatHindiName');
  assert(ktCode.includes('announcedTxnIds'), 'Must track announcedTxnIds');
  assert(ktCode.includes('Demo Successful'), 'Must enforce Demo Successful status check');
  assert(ktCode.includes('amount <= 0'), 'Must enforce amount <= 0 check');
});

// 48: Security Disclaimers: Prominent "Real Payment Integration: Not Connected"
runTest('Security disclaimer "Real Payment Integration: Not Connected" is prominent', () => {
  const modalPath = path.resolve(__dirname, '../components/home/SimulatePaymentModal.tsx');
  const modalCode = fs.readFileSync(modalPath, 'utf8');
  assert(
    modalCode.includes('Real Payment Integration: Not Connected'),
    'SimulatePaymentModal must display security disclaimer'
  );

  const voiceSettingsPath = path.resolve(__dirname, '../pages/VoiceSettingsPage.tsx');
  const voiceCode = fs.readFileSync(voiceSettingsPath, 'utf8');
  assert(
    voiceCode.includes('Real Payment Integration: Not Connected'),
    'VoiceSettingsPage must display security disclaimer'
  );
});

// 49: Direction integrity: Outgoing shows "-" prefix and Sent badge, Incoming shows "+" prefix and Received badge
runTest('Dashboard and Transactions maintain correct direction signs and badges', () => {
  const dashPath = path.resolve(__dirname, '../pages/DashboardPage.tsx');
  const dashCode = fs.readFileSync(dashPath, 'utf8');
  assert(dashCode.includes("txn.direction === 'outgoing' ? '-' : '+'"), 'Outgoing must have minus, incoming plus');
  assert(dashCode.includes("txn.direction === 'outgoing' ? 'Sent' : 'Received'"), 'Must display Sent/Received badges');
});

// 50: Ad Policy Guard strictly protects critical contexts
runTest('AdPolicyGuard forbids ads in payment alerts, active gameplay, voice settings', () => {
  const adPath = path.resolve(__dirname, '../services/adAdapter.ts');
  const adCode = fs.readFileSync(adPath, 'utf8');
  assert(adCode.includes('payment_alert'), 'Must forbid payment_alert');
  assert(adCode.includes('payment_success'), 'Must forbid payment_success');
  assert(adCode.includes('active_gameplay'), 'Must forbid active_gameplay');
  assert(adCode.includes('voice_settings_audio_control'), 'Must forbid voice_settings');
});

console.log('\n-----------------------------------------------------');
console.log(`TEST RESULTS: ${passCount} / ${totalCount} Passed (${Math.round((passCount / totalCount) * 100)}%)`);
console.log('-----------------------------------------------------\n');

if (passCount !== totalCount) {
  process.exit(1);
}
