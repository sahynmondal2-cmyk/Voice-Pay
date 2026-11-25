import React, { useState } from 'react';
import {
  Volume2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
  Globe,
  Download,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import { Link } from 'react-router-dom';

export const SoundReadinessCard: React.FC = () => {
  const {
    t,
    voiceSettings,
    voiceAvailability,
    isAudioUnlocked,
    unlockAudio,
    testVoiceAnnouncement,
    isSpeaking,
  } = useApp();

  const { isInstallable, isInstalled, installApp } = usePwaInstall();
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary via-[#0F3A22] to-brand-navy p-5 sm:p-6 text-white shadow-elevated border border-brand-accent/20">
      {/* Background Decorative Rings */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-brand-accent/10 blur-2xl pointer-events-none" />

      {/* Real Payment Security Pill */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>Real Payment Integration: Not Connected</span>
        <span className="text-[10px] text-amber-200/80 font-normal">| Voice Soundbox Engine Demo</span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Status info and animated waves */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isAudioUnlocked ? 'bg-brand-accent' : 'bg-amber-400'
                } opacity-75`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isAudioUnlocked ? 'bg-brand-accent' : 'bg-amber-400'
                }`}
              />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              {isAudioUnlocked ? t.home.soundReady : 'Audio Needs Interaction'}
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-medium text-slate-300">
              Web Audio & Speech API (Phase 2)
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>PayVoice Instant Voice Engine</span>
            {isSpeaking && (
              <div className="flex items-end gap-1 h-5 px-1.5 py-0.5 bg-black/30 rounded-md">
                <span className="w-1 bg-brand-accent rounded-full animate-wave-1" />
                <span className="w-1 bg-brand-accent rounded-full animate-wave-2" />
                <span className="w-1 bg-brand-accent rounded-full animate-wave-3" />
                <span className="w-1 bg-brand-accent rounded-full animate-wave-4" />
              </div>
            )}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {isAudioUnlocked
              ? 'Instant incoming & outgoing vocal alerts ready. Distinct chimes and native TTS voice configured.'
              : t.home.soundUnmuteNotice}
          </p>

          {/* Voice Availability Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              Engine Locales:
            </span>
            <span
              className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            >
              Bengali (bn-IN): {voiceAvailability.hasNativeBengaliVoice ? 'Native TTS' : 'Cloud Engine Ready'}
            </span>
            <span
              className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            >
              Hindi (hi-IN): {voiceAvailability.hasNativeHindiVoice ? 'Native TTS' : 'Cloud Engine Ready'}
            </span>
            <span
              className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            >
              English (en-IN): Ready
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              Incoming:{' '}
              <strong className={voiceSettings.incomingVoiceEnabled ? 'text-emerald-400' : 'text-slate-400'}>
                {voiceSettings.incomingVoiceEnabled ? 'ON' : 'OFF'}
              </strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              Outgoing:{' '}
              <strong className={voiceSettings.outgoingVoiceEnabled ? 'text-blue-400' : 'text-slate-400'}>
                {voiceSettings.outgoingVoiceEnabled ? 'ON' : 'OFF'}
              </strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              Vol: <strong className="text-white">{Math.round(voiceSettings.volume * 100)}%</strong>
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2 shrink-0">
          {/* Test Incoming */}
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              testVoiceAnnouncement(undefined, 'incoming');
            }}
            disabled={isSpeaking}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-subtle active:scale-95 ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Test Incoming</span>
          </button>

          {/* Test Outgoing */}
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              testVoiceAnnouncement(undefined, 'outgoing');
            }}
            disabled={isSpeaking}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-subtle active:scale-95 ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            <span>Test Outgoing</span>
          </button>

          {/* PWA Install Button when available */}
          {isInstallable && (
            <button
              type="button"
              onClick={installApp}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-accent hover:bg-emerald-400 text-brand-navy font-bold text-xs transition-all shadow-subtle active:scale-95"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Install App</span>
            </button>
          )}

          <Link
            to="/voice-settings"
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/15"
          >
            <span>{t.home.voiceSetup}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setShowTroubleshoot(!showTroubleshoot)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors self-center"
            title="Audio limitations & troubleshooting"
            aria-label="Audio Troubleshooting"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accordion: Audio Limitations & Troubleshooting */}
      {showTroubleshoot && (
        <div className="mt-4 pt-4 border-t border-white/15 text-xs text-slate-200 space-y-2 bg-black/20 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Important Browser Audio Policies & Limits</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            Modern mobile browsers (Chrome, Safari, Firefox) restrict autoplay audio until the merchant performs at least one tap on the page. PayVoice unlocks the Web Audio engine on your first tap.
          </p>
          <p className="leading-relaxed text-amber-200/90 font-medium">
            <strong>Web PWA Background Notice:</strong> Browsers do not guarantee background audio execution once the screen is locked or the browser process is suspended. For continuous 24/7 background alerts, use the companion Android native app with Foreground Sound Engine Service.
          </p>
        </div>
      )}
    </div>
  );
};
