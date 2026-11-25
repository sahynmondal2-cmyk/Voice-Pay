import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Globe,
  Sliders,
  Bell,
  HelpCircle,
  Play,
  CheckCircle2,
  AlertTriangle,
  Vibrate,
  UserCheck,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

export const VoiceSettingsPage: React.FC = () => {
  const {
    voiceSettings,
    updateVoiceSettings,
    t,
    testVoiceAnnouncement,
    isSpeaking,
    unlockAudio,
    isAudioUnlocked,
  } = useApp();

  const [previewText, setPreviewText] = useState<string>(
    voiceSettings.language === 'bn'
      ? 'পেভয়েস ডেমোতে ১৫০ টাকা সফলভাবে জমা হয়েছে!'
      : voiceSettings.language === 'hi'
      ? 'पेवॉइस डेमो पर ₹150 सफलतापूर्वक प्राप्त हुए!'
      : '₹150 received successfully on PayVoice Demo!'
  );

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const chimeOptions: { id: typeof voiceSettings.soundChime; title: string; desc: string }[] = [
    { id: 'bell-high', title: t.voice.chimeBell, desc: 'High frequency dual-tone chime (cuts through market noise)' },
    { id: 'modern-chime', title: t.voice.chimeModern, desc: '3-tone harmonic arpeggio' },
    { id: 'soft-ding', title: t.voice.chimeSoft, desc: 'Gentle single ding' },
    { id: 'none', title: t.voice.chimeNone, desc: 'Speak immediately without chime' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          {t.voice.title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          {t.voice.subtitle}
        </p>
      </div>

      {savedNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{t.common.saved}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-6">
        {/* 1. Announcement Language */}
        <div>
          <label className="block text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-brand-accent" />
            <span>{t.voice.languageLabel}</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { code: 'bn', label: 'বাংলা (Bengali)', sub: 'West Bengal' },
              { code: 'hi', label: 'हिन्दी (Hindi)', sub: 'Devanagari' },
              { code: 'en', label: 'English (Indian)', sub: 'Universal' },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  updateVoiceSettings({ language: lang.code as SupportedLanguage });
                  if (lang.code === 'bn') {
                    setPreviewText('পেভয়েস ডেমোতে ১৫০ টাকা সফলভাবে জমা হয়েছে!');
                  } else if (lang.code === 'hi') {
                    setPreviewText('पेवॉइस डेमो पर ₹150 सफलतापूर्वक प्राप्त हुए!');
                  } else {
                    setPreviewText('₹150 received successfully on PayVoice Demo!');
                  }
                }}
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

        {/* 2. Chime Tone Selection */}
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
                <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                  voiceSettings.soundChime === opt.id
                    ? 'border-brand-accent bg-brand-accent'
                    : 'border-slate-300 dark:border-slate-700'
                }`}>
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

        {/* 3. Sliders: Volume & Speed */}
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

        {/* 4. Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Announce Payer */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-accent" />
              <div>
                <p className="font-bold text-brand-navy dark:text-white">{t.voice.announcePayerToggle}</p>
                <p className="text-[10px] text-slate-400">Speak customer name before amount</p>
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

        {/* 5. Interactive Audio Preview & Test Player */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-primary/10 to-brand-navy/10 border border-brand-accent/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-brand-accent" />
              {t.voice.previewTitle}
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              {t.voice.audioStatusHealthy}
            </span>
          </div>

          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 italic bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
            "{previewText}"
          </p>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                testVoiceAnnouncement(previewText);
              }}
              disabled={isSpeaking}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-subtle ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-brand-accent hover:bg-brand-accent-hover text-brand-navy'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSpeaking ? t.home.testingVoice : t.voice.previewButton}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-light"
            >
              {t.common.save}
            </button>
          </div>
        </div>
      </div>

      {/* 6. Comprehensive Audio Troubleshooting & Browser Limitations Section (Master Prompt Requirement) */}
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
              Modern web standards require explicit user interaction before web pages can produce audio. Once you tap "Test Voice Alert" or anywhere on the screen, audio remains unlocked.
            </p>
          </div>

          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-amber-500/20">
            <p className="font-bold text-brand-navy dark:text-white mb-1">
              2. Web Browser Sleep Limitations
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Web PWAs cannot wake device speakers when the browser application is completely closed or terminated by the operating system. For 24/7 background operation, keep the tab open or use the native Android APK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
