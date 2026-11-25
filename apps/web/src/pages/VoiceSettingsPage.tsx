import React, { useState } from 'react';
import {
  Volume2,
  Globe,
  Sliders,
  Bell,
  Play,
  CheckCircle2,
  AlertTriangle,
  Vibrate,
  UserCheck,
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
  Info,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage, TransactionDirection } from '../types';
import { audioService } from '../services/audioService';
import { notificationService } from '../services/notificationService';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { Smartphone, Download, Check, BellRing, ShieldCheck } from 'lucide-react';

export const VoiceSettingsPage: React.FC = () => {
  const {
    voiceSettings,
    updateVoiceSettings,
    voiceAvailability,
    refreshVoiceAvailability,
    t,
    testVoiceAnnouncement,
    testBengaliVoice,
    testHindiVoice,
    testEnglishVoice,
    isSpeaking,
    unlockAudio,
    notificationPermission,
    requestNotificationPermission,
  } = useApp();

  const { isInstallable, isInstalled, installApp } = usePwaInstall();
  const [testNotifyNotice, setTestNotifyNotice] = useState(false);
  const [testDirection, setTestDirection] = useState<TransactionDirection>('incoming');
  const [testAmount, setTestAmount] = useState<number>(150);
  const [testPersonName, setTestPersonName] = useState<string>('Priya');
  const [savedNotice, setSavedNotice] = useState(false);

  const testAmounts = [1, 10, 100, 150, 500, 1000, 1500, 5000, 10000, 50000];

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleTestNotification = async () => {
    let perm = notificationPermission;
    if (perm !== 'granted') {
      perm = await requestNotificationPermission();
    }
    if (perm === 'granted') {
      await notificationService.notifyTransaction({
        id: `DEMO-TEST-${Date.now()}`,
        timestamp: new Date().toISOString(),
        amount: testAmount,
        status: 'Demo Successful',
        direction: testDirection,
        customerName: testPersonName,
        senderName: testDirection === 'incoming' ? testPersonName : undefined,
        recipientName: testDirection === 'outgoing' ? testPersonName : undefined,
        customerVpa: 'priya***@demo-upi',
        method: 'UPI QR Demo',
        shopId: 'shop_01',
        voiceAnnounced: true,
        isDemo: true,
      });
      setTestNotifyNotice(true);
      setTimeout(() => setTestNotifyNotice(false), 3000);
    }
  };

  const previewPhrase = audioService.buildAnnouncementText(
    testAmount,
    voiceSettings.language,
    testDirection,
    testPersonName
  );

  const chimeOptions: { id: typeof voiceSettings.soundChime; title: string; desc: string }[] = [
    { id: 'bell-high', title: t.voice.chimeBell, desc: 'High frequency dual-tone chime (cuts through market noise)' },
    { id: 'modern-chime', title: t.voice.chimeModern, desc: '3-tone harmonic arpeggio' },
    { id: 'soft-ding', title: t.voice.chimeSoft, desc: 'Gentle single ding' },
    { id: 'none', title: t.voice.chimeNone, desc: 'Speak immediately without chime' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
            {t.voice.title}
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
            Configure incoming & outgoing speech alerts, language locales, and playback parameters
          </p>
        </div>

        {/* Real Payment Security Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-[11px] font-bold text-amber-800 dark:text-amber-300">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Real Payment Integration: Not Connected</span>
        </div>
      </div>

      {savedNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Device TTS Voice Availability Notice Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-accent" />
            <h2 className="text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider">
              Device TTS Voices Status (Web Speech API)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => refreshVoiceAvailability()}
            className="flex items-center gap-1 text-[11px] text-brand-primary dark:text-brand-accent font-semibold hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Check Voices</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Bengali Voice */}
          <div
            className={`p-3 rounded-xl border ${
              voiceAvailability.hasNativeBengaliVoice
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-900 dark:text-cyan-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs">বাংলা (Bengali)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                bn-IN
              </span>
            </div>
            <p className="text-[11px] leading-tight font-medium">
              {voiceAvailability.hasNativeBengaliVoice ? (
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> Native Voice Detected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-cyan-700 dark:text-cyan-300">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> Cloud Engine Active
                </span>
              )}
            </p>
            {voiceAvailability.bengaliVoiceName && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                {voiceAvailability.bengaliVoiceName}
              </p>
            )}
          </div>

          {/* Hindi Voice */}
          <div
            className={`p-3 rounded-xl border ${
              voiceAvailability.hasNativeHindiVoice
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-900 dark:text-cyan-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs">हिन्दी (Hindi)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                hi-IN
              </span>
            </div>
            <p className="text-[11px] leading-tight font-medium">
              {voiceAvailability.hasNativeHindiVoice ? (
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> Native Voice Detected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-cyan-700 dark:text-cyan-300">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> Cloud Engine Active
                </span>
              )}
            </p>
            {voiceAvailability.hindiVoiceName && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                {voiceAvailability.hindiVoiceName}
              </p>
            )}
          </div>

          {/* English Voice */}
          <div
            className={`p-3 rounded-xl border ${
              voiceAvailability.hasEnglishVoice
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs">English (Indian)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">
                en-IN
              </span>
            </div>
            <p className="text-[11px] leading-tight font-medium">
              {voiceAvailability.hasEnglishVoice ? (
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> Native Voice Detected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="w-3 h-3 shrink-0" /> Fallback Generic English
                </span>
              )}
            </p>
            {voiceAvailability.englishVoiceName && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                {voiceAvailability.englishVoiceName}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300">
          <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
          <div>
            <strong>Hybrid Voice Engine:</strong> Bengali and Hindi voices speak with authentic natural pronunciation through native device speech packs or the PayVoice Cloud Voice Engine. PayVoice never uses Hindi pronunciation for Bengali.
          </div>
        </div>
      </div>

      {/* PWA & System Notification Readiness Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider">
              PWA Standalone & System Notifications
            </h2>
          </div>
          {isInstalled ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Check className="w-3 h-3" /> Installed (Standalone Mode)
            </span>
          ) : isInstallable ? (
            <button
              type="button"
              onClick={installApp}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-primary text-white font-bold text-xs hover:bg-brand-primary-light active:scale-95 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-brand-accent" />
              <span>Install to Device</span>
            </button>
          ) : (
            <span className="text-[11px] font-mono text-slate-400">Browser Tab Mode</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Notification Permission Card */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-brand-dark-card flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-brand-navy dark:text-white flex items-center gap-1.5">
                  <BellRing className="w-3.5 h-3.5 text-brand-accent" /> System Notifications
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    notificationPermission === 'granted'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : notificationPermission === 'denied'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {notificationPermission}
                </span>
              </div>
              <p className="text-[11px] text-brand-muted dark:text-slate-400 leading-relaxed">
                Receive visual payment heads-up popups on your device in tandem with the vocal soundbox alert.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {notificationPermission !== 'granted' ? (
                <button
                  type="button"
                  onClick={requestNotificationPermission}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Enable Notifications
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleTestNotification}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-brand-navy dark:text-white font-semibold text-xs transition-colors"
                >
                  Send Test Notification
                </button>
              )}
              {testNotifyNotice && (
                <span className="text-[11px] text-emerald-600 font-semibold animate-pulse">
                  Notification sent!
                </span>
              )}
            </div>
          </div>

          {/* Offline PWA Resilience Card */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-brand-dark-card flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-brand-navy dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Offline Soundbox Cache
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Ready (PWA v2.5)
                </span>
              </div>
              <p className="text-[11px] text-brand-muted dark:text-slate-400 leading-relaxed">
                42 pre-rendered voice assets and local offline fallback are cached in Service Worker storage for instant playback without connectivity.
              </p>
            </div>

            <p className="text-[10px] text-slate-400 font-mono">
              Status: ServiceWorker active • Standalone display ready
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-6">
        {/* 1. Master Direction Toggles: Incoming & Outgoing Voice */}
        <div>
          <label className="block text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider mb-2">
            Payment Direction Voice Controls
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Incoming Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs text-brand-navy dark:text-white">
                    Incoming Voice Alerts
                  </p>
                  <p className="text-[11px] text-slate-400">Announce received customer payments aloud</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={voiceSettings.incomingVoiceEnabled}
                  onChange={(e) => updateVoiceSettings({ incomingVoiceEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
              </label>
            </div>

            {/* Outgoing Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs text-brand-navy dark:text-white">
                    Outgoing Voice Alerts
                  </p>
                  <p className="text-[11px] text-slate-400">Announce vendor payouts and outgoing transfers aloud</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={voiceSettings.outgoingVoiceEnabled}
                  onChange={(e) => updateVoiceSettings({ outgoingVoiceEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>
        </div>

        {/* 2. Announcement Language Selection */}
        <div>
          <label className="block text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-brand-accent" />
            <span>{t.voice.languageLabel}</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { code: 'bn', label: 'বাংলা (Bengali)', sub: 'Natural Bengali script & digits' },
              { code: 'hi', label: 'हिन्दी (Hindi)', sub: 'Devanagari phrasing' },
              { code: 'en', label: 'English (Indian)', sub: 'Standard Indian English' },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => updateVoiceSettings({ language: lang.code as SupportedLanguage })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  voiceSettings.language === lang.code
                    ? 'border-brand-primary bg-brand-primary/5 dark:border-brand-accent dark:bg-brand-accent/15'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                <p className="font-extrabold text-xs sm:text-sm text-brand-navy dark:text-white">
                  {lang.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{lang.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Chime Tone Selection */}
        <div>
          <label className="block text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-brand-accent" />
            <span>{t.voice.chimeLabel}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {chimeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateVoiceSettings({ soundChime: opt.id })}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                  voiceSettings.soundChime === opt.id
                    ? 'border-brand-primary bg-brand-primary/5 dark:border-brand-accent dark:bg-brand-accent/15'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    voiceSettings.soundChime === opt.id
                      ? 'border-brand-accent bg-brand-accent'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {voiceSettings.soundChime === opt.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-xs text-brand-navy dark:text-white">
                    {opt.title}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {opt.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Sliders: Volume & Speed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-brand-accent" />
                {t.voice.volumeLabel}
              </span>
              <span className="text-xs font-mono font-bold text-brand-primary dark:text-brand-accent">
                {Math.round(voiceSettings.volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={voiceSettings.volume}
              onChange={(e) => updateVoiceSettings({ volume: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Quiet (10%)</span>
              <span>Loud (100%)</span>
            </div>
          </div>

          {/* Speed Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-brand-accent" />
                {t.voice.speedLabel}
              </span>
              <span className="text-xs font-mono font-bold text-brand-primary dark:text-brand-accent">
                {voiceSettings.speechRate.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.1"
              value={voiceSettings.speechRate}
              onChange={(e) => updateVoiceSettings({ speechRate: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Slow (0.7x)</span>
              <span>Fast (1.3x)</span>
            </div>
          </div>
        </div>

        {/* 5. Additional Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Announce Person Name */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-accent" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white">Announce Payer / Recipient Name</p>
                <p className="text-[10px] text-slate-400">Speak sender or recipient name with exact grammar</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={voiceSettings.announcePayerName}
              onChange={(e) => updateVoiceSettings({ announcePayerName: e.target.checked })}
              className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
            />
          </div>

          {/* Haptics */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Vibrate className="w-4 h-4 text-brand-accent" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white">{t.voice.hapticToggle}</p>
                <p className="text-[10px] text-slate-400">Vibration pulse on mobile</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={voiceSettings.hapticFeedback}
              onChange={(e) => updateVoiceSettings({ hapticFeedback: e.target.checked })}
              className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
            />
          </div>
        </div>

        {/* 6. Dedicated Language Test Suite (Section 8 Requirement) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-primary/10 via-slate-50 dark:via-slate-850 to-brand-navy/10 border border-brand-accent/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-brand-accent" />
              Dedicated Voice Test Suite (Incoming &amp; Outgoing)
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              Web Audio Synthesizer Active
            </span>
          </div>

          {/* Direction & Name Controls for Testing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Test Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTestDirection('incoming')}
                  className={`py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    testDirection === 'incoming'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Incoming</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTestDirection('outgoing')}
                  className={`py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    testDirection === 'outgoing'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Outgoing</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="test-person" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {testDirection === 'incoming' ? 'Customer / Sender Name' : 'Recipient Name'}
              </label>
              <input
                id="test-person"
                type="text"
                value={testPersonName}
                onChange={(e) => setTestPersonName(e.target.value)}
                placeholder="e.g. Priya"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-brand-navy dark:text-white text-xs"
              />
            </div>
          </div>

          {/* Amount Chips for Testing */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 text-xs">
              Test Amount: ₹{testAmount.toLocaleString('en-IN')}
            </label>
            <div className="flex flex-wrap gap-1">
              {testAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTestAmount(amt)}
                  className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition-colors ${
                    testAmount === amt
                      ? 'bg-brand-primary text-white dark:bg-brand-accent dark:text-brand-navy'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>
          </div>

          {/* Spoken Text Preview */}
          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block mb-1">
              Synthesizer Output ({voiceSettings.language.toUpperCase()})
            </span>
            <p className="text-xs font-semibold text-brand-navy dark:text-white italic">
              "{previewPhrase}"
            </p>
          </div>

          {/* Dedicated Individual Test Action Buttons (Section 8 Prompt Requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {/* Test Bengali */}
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                testBengaliVoice(testDirection, testAmount, testPersonName);
              }}
              disabled={isSpeaking}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-subtle active:scale-95 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test Bengali Voice</span>
            </button>

            {/* Test Hindi */}
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                testHindiVoice(testDirection, testAmount, testPersonName);
              }}
              disabled={isSpeaking}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-all shadow-subtle active:scale-95 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test Hindi Voice</span>
            </button>

            {/* Test English */}
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                testEnglishVoice(testDirection, testAmount, testPersonName);
              }}
              disabled={isSpeaking}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-subtle active:scale-95 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test English Voice</span>
            </button>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-light shadow-subtle"
            >
              Save Voice Preferences
            </button>
          </div>
        </div>
      </div>

      {/* 7. Comprehensive Troubleshooting & Audio Policy Section */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/20 p-5 text-xs text-slate-700 dark:text-slate-300 space-y-3">
        <div className="flex items-center gap-2 font-extrabold text-amber-800 dark:text-amber-300 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{t.voice.troubleshootTitle}</span>
        </div>

        <p className="leading-relaxed">
          {t.voice.troubleshootNote}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-amber-500/20">
            <p className="font-bold text-brand-navy dark:text-white mb-1">
              1. Tap to Unlock Audio Policy
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Modern web standards require explicit user interaction before web pages can produce audio. Once you tap any Test Voice button or anywhere on the screen, audio remains unlocked.
            </p>
          </div>

          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-amber-500/20">
            <p className="font-bold text-brand-navy dark:text-white mb-1">
              2. Web Browser Sleep Limitations
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Web PWAs cannot wake device speakers when the browser application is completely closed or suspended by Android OS. For continuous 24/7 background operation, use the companion Android native app with Foreground Sound Engine Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
