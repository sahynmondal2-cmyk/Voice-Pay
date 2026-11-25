import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, AlertCircle, HelpCircle, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const SoundReadinessCard: React.FC = () => {
  const {
    t,
    voiceSettings,
    isAudioUnlocked,
    unlockAudio,
    testVoiceAnnouncement,
    isSpeaking,
  } = useApp();

  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary via-[#0F3A22] to-brand-navy p-5 sm:p-6 text-white shadow-elevated border border-brand-accent/20">
      {/* Background Decorative Rings */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-brand-accent/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Status info and animated waves */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isAudioUnlocked ? 'bg-brand-accent' : 'bg-amber-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAudioUnlocked ? 'bg-brand-accent' : 'bg-amber-400'}`} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              {isAudioUnlocked ? t.home.soundReady : 'Audio Needs Interaction'}
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-medium text-slate-300">
              Web Audio & Speech API
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
              ? t.home.soundReadyDesc
              : t.home.soundUnmuteNotice}
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              Lang: <strong className="text-white uppercase">{voiceSettings.language}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              Chime: <strong className="text-white capitalize">{voiceSettings.soundChime}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              Vol: <strong className="text-white">{Math.round(voiceSettings.volume * 100)}%</strong>
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              testVoiceAnnouncement();
            }}
            disabled={isSpeaking}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-subtle active:scale-95 ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-brand-accent hover:bg-brand-accent-hover text-brand-navy shadow-glow-accent'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>{isSpeaking ? t.home.testingVoice : t.home.testVoiceBtn}</span>
          </button>

          <Link
            to="/voice-settings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/15"
          >
            <span>{t.home.voiceSetup}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setShowTroubleshoot(!showTroubleshoot)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            title="Audio limitations & troubleshooting"
            aria-label="Audio Troubleshooting"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accordion: Audio Limitations & Troubleshooting (Master Prompt Requirement) */}
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
            <strong>Web PWA Background Notice:</strong> Browsers do not guarantee background audio execution once the screen is locked or the browser process is closed by Android battery saver. For continuous 24/7 background alerts, use the companion Android native app.
          </p>
        </div>
      )}
    </div>
  );
};
