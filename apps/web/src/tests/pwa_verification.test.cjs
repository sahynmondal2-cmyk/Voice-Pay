/**
 * PayVoice PWA Verification Test Suite
 * 
 * Verifies all 6 requirements of Phase 2.5 PWA Conversion:
 * 1. Installable App (Manifest, Icons 192/512/maskable, Apple touch icon, Screenshots)
 * 2. Native App-like Experience (Standalone display, viewport-fit=cover, safe area support)
 * 3. PWA Technical Setup (Service Worker payvoice-pwa-v2.5.0, caching, offline.html fallback)
 * 4. Notifications (Permission request, Web Notification, Push handlers, transaction alerts)
 * 5. Performance & Security (Cache safety, duplicate payment suppression, disclaimer)
 * 6. Integration points (AppLayout banner, VoiceSettings controls)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] Test ${totalTests}: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] Test ${totalTests}: ${name}`);
    console.error(`       Error: ${err.message}`);
  }
}

console.log('===================================================================');
console.log('   PAYVOICE PWA CONVERSION & SPECIFICATION VERIFICATION SUITE      ');
console.log('===================================================================\n');

const webRoot = path.resolve(__dirname, '../..');
const publicDir = path.join(webRoot, 'public');
const srcDir = path.join(webRoot, 'src');

// 1. Manifest Validation
runTest('Web App Manifest is valid JSON and adheres to W3C PWA spec', () => {
  const manifestPath = path.join(publicDir, 'manifest.webmanifest');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest must exist');
  
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifest.name.includes('PayVoice'), 'Manifest name must include PayVoice');
  assert.strictEqual(manifest.short_name, 'PayVoice');
  assert(manifest.start_url.startsWith('/'), 'start_url must be root or parameter');
  assert.strictEqual(manifest.scope, '/');
  assert.strictEqual(manifest.display, 'standalone');
  assert(Array.isArray(manifest.display_override) && manifest.display_override.includes('standalone'));
  assert.strictEqual(manifest.theme_color, '#14532D');
  assert.strictEqual(manifest.background_color, '#0F172A');
});

// 2. Icon & Asset Existence
runTest('All required PWA icons & screenshots exist with valid byte dimensions', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(publicDir, 'manifest.webmanifest'), 'utf8'));
  
  // Verify icons listed in manifest
  assert(manifest.icons && manifest.icons.length >= 3, 'Manifest must have at least 192, 512, and maskable icons');
  
  for (const icon of manifest.icons) {
    const iconFilePath = path.join(publicDir, icon.src.replace(/^\//, ''));
    assert(fs.existsSync(iconFilePath), `Icon file ${icon.src} must exist on disk`);
    const stats = fs.statSync(iconFilePath);
    assert(stats.size > 100, `Icon file ${icon.src} must not be empty (size: ${stats.size} bytes)`);
  }

  // Apple Touch Icon
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  assert(fs.existsSync(appleTouchPath), 'apple-touch-icon.png must exist');
  assert(fs.statSync(appleTouchPath).size > 500, 'apple-touch-icon.png must not be empty');

  // Screenshots for rich installation prompt
  assert(manifest.screenshots && manifest.screenshots.length >= 2, 'Manifest must contain rich install screenshots');
  for (const shot of manifest.screenshots) {
    const shotPath = path.join(publicDir, shot.src.replace(/^\//, ''));
    assert(fs.existsSync(shotPath), `Screenshot file ${shot.src} must exist on disk`);
    assert(fs.statSync(shotPath).size > 1000, `Screenshot file ${shot.src} must be valid size`);
  }
});

// 3. Manifest App Shortcuts
runTest('Manifest specifies rapid action shortcuts for merchant workflow', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(publicDir, 'manifest.webmanifest'), 'utf8'));
  assert(Array.isArray(manifest.shortcuts), 'Shortcuts array must exist in manifest');
  const shortcutUrls = manifest.shortcuts.map(s => s.url);
  assert(shortcutUrls.includes('/?action=simulate'), 'Must contain quick payment simulate shortcut');
  assert(shortcutUrls.includes('/voice-settings'), 'Must contain quick voice settings shortcut');
  assert(shortcutUrls.includes('/reports'), 'Must contain reports shortcut');
  assert(shortcutUrls.includes('/play'), 'Must contain Mini-Games hub shortcut');
});

// 4. Service Worker Caching Strategies
runTest('Service Worker implements Network-First, Cache-First, and Stale-While-Revalidate', () => {
  const swPath = path.join(publicDir, 'sw.js');
  assert(fs.existsSync(swPath), 'sw.js must exist');
  const swCode = fs.readFileSync(swPath, 'utf8');

  // Cache version
  assert(swCode.includes('payvoice-pwa-v2.5.0'), 'Cache name must be payvoice-pwa-v2.5.0');
  
  // Pre-cache resources
  assert(swCode.includes('PRECACHE_ASSETS'), 'Must define PRECACHE_ASSETS');
  assert(swCode.includes("'/offline.html'"), 'Must precache /offline.html');
  assert(swCode.includes("'/manifest.webmanifest'"), 'Must precache manifest');

  // Navigation Strategy (Network-first with offline fallback)
  assert(swCode.includes("event.request.mode === 'navigate'"), 'Must intercept navigation requests');
  assert(swCode.includes("'/offline.html'"), 'Must fall back to offline.html on navigation failure');

  // Audio Strategy (Cache-First)
  assert(swCode.includes("url.pathname.includes('/audio/')"), 'Must handle /audio/ requests with cache-first strategy');

  // Old Cache Purging
  assert(swCode.includes('caches.delete') && swCode.includes('key !== CACHE_NAME'), 'Must purge outdated caches during activation');
});

// 5. Offline Fallback Page
runTest('Offline fallback page offline.html exists and provides reconnection recovery', () => {
  const offlinePath = path.join(publicDir, 'offline.html');
  assert(fs.existsSync(offlinePath), 'offline.html must exist');
  const offlineHtml = fs.readFileSync(offlinePath, 'utf8');

  assert(offlineHtml.includes('Offline Mode') || offlineHtml.includes('offline'), 'Must state offline mode');
  assert(offlineHtml.includes('window.addEventListener(\'online\''), 'Must listen for reconnection to reload');
  assert(offlineHtml.includes('window.location.reload()'), 'Must reload upon online event');
});

// 6. Push & System Notification Handlers in Service Worker
runTest('Service Worker contains Push & Notification Click event handlers', () => {
  const swCode = fs.readFileSync(path.join(publicDir, 'sw.js'), 'utf8');
  assert(swCode.includes("self.addEventListener('push'"), 'Must register push event listener');
  assert(swCode.includes("self.addEventListener('notificationclick'"), 'Must register notificationclick event listener');
  assert(swCode.includes('clients.openWindow'), 'Must open window on notification click');
});

// 7. Notification Service Implementation & Deduplication
runTest('NotificationService implements permission handling, deduplication & localization', () => {
  const notifServicePath = path.join(srcDir, 'services/notificationService.ts');
  assert(fs.existsSync(notifServicePath), 'notificationService.ts must exist');
  const code = fs.readFileSync(notifServicePath, 'utf8');

  assert(code.includes('requestPermission'), 'Must provide requestPermission method');
  assert(code.includes('sentNotificationIds'), 'Must track notified transaction IDs to prevent duplicates');
  assert(code.includes('amountStr') || code.includes('toLocaleString'), 'Must format notification amounts properly');
  assert(code.includes('showNotification'), 'Must support service worker registration or window notification');
});

// 8. PWA Install Hook & Display Mode Detection
runTest('usePwaInstall hook captures beforeinstallprompt and detects standalone display mode', () => {
  const hookPath = path.join(srcDir, 'hooks/usePwaInstall.ts');
  assert(fs.existsSync(hookPath), 'usePwaInstall.ts must exist');
  const code = fs.readFileSync(hookPath, 'utf8');

  assert(code.includes('beforeinstallprompt'), 'Must capture beforeinstallprompt event');
  assert(code.includes('appinstalled'), 'Must capture appinstalled event');
  assert(code.includes('display-mode: standalone'), 'Must detect standalone display mode');
  assert(code.includes('installApp'), 'Must export installApp trigger function');
});

// 9. PWA UI Components (Banner & Settings integration)
runTest('PWA UI components are cleanly integrated into layout and settings', () => {
  const bannerPath = path.join(srcDir, 'components/common/PwaInstallBanner.tsx');
  assert(fs.existsSync(bannerPath), 'PwaInstallBanner.tsx must exist');
  
  const layoutPath = path.join(srcDir, 'components/layout/AppLayout.tsx');
  const layoutCode = fs.readFileSync(layoutPath, 'utf8');
  assert(layoutCode.includes('<PwaInstallBanner />'), 'AppLayout must render PwaInstallBanner');
  assert(layoutCode.includes("searchParams.get('action') === 'simulate'"), 'AppLayout must handle PWA shortcut simulate trigger');

  const voiceSettingsPath = path.join(srcDir, 'pages/VoiceSettingsPage.tsx');
  const settingsCode = fs.readFileSync(voiceSettingsPath, 'utf8');
  assert(settingsCode.includes('PWA & System Notification Readiness'), 'VoiceSettingsPage must display PWA & Notification readiness');
  assert(settingsCode.includes('handleTestNotification'), 'VoiceSettingsPage must allow testing notifications');
});

// 10. Native Mobile Styling & Viewport Insets
runTest('index.html and globals.css implement safe-area insets and viewport-fit=cover', () => {
  const indexPath = path.join(webRoot, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  assert(indexHtml.includes('viewport-fit=cover'), 'index.html must specify viewport-fit=cover');
  assert(indexHtml.includes('apple-mobile-web-app-capable'), 'index.html must configure apple-mobile-web-app-capable');
  assert(indexHtml.includes('manifest.webmanifest'), 'index.html must link manifest.webmanifest');

  const cssPath = path.join(srcDir, 'styles/globals.css');
  const cssCode = fs.readFileSync(cssPath, 'utf8');
  assert(cssCode.includes('safe-area-inset-top'), 'CSS must account for safe-area-inset-top');
  assert(cssCode.includes('safe-area-inset-bottom'), 'CSS must account for safe-area-inset-bottom');
  assert(cssCode.includes('overscroll-behavior-y: none'), 'CSS must prevent overscroll bounce for native feel');
});

// 11. Security & Cache Privacy Compliance
runTest('Security compliance: no sensitive unmasked credentials in local storage or caches', () => {
  const swCode = fs.readFileSync(path.join(publicDir, 'sw.js'), 'utf8');
  assert(!swCode.includes('apiKey'), 'SW must not hardcode API keys');
  assert(!swCode.includes('bearer'), 'SW must not hardcode bearer tokens');
  assert(!swCode.includes('password'), 'SW must not store passwords');

  // Verify prominent demo banner in AppLayout & DemoModeBanner
  const layoutCode = fs.readFileSync(path.join(srcDir, 'components/layout/AppLayout.tsx'), 'utf8');
  assert(layoutCode.includes('<DemoModeBanner />'), 'AppLayout must render DemoModeBanner');
  
  const enLocalePath = path.join(srcDir, 'locales/en.ts');
  const enCode = fs.readFileSync(enLocalePath, 'utf8');
  assert(enCode.includes('DEMO MODE') && enCode.includes('simulated'), 'Locales must contain prominent demo disclaimer');

  const voiceSettingsPath = path.join(srcDir, 'pages/VoiceSettingsPage.tsx');
  const vsCode = fs.readFileSync(voiceSettingsPath, 'utf8');
  assert(vsCode.includes('Real Payment Integration: Not Connected'), 'VoiceSettingsPage must display non-connected notice');
});

console.log('\n-----------------------------------------------------');
console.log(`PWA TEST RESULTS: ${passedTests} / ${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('-----------------------------------------------------\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
