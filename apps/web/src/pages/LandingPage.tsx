import React from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  Sparkles,
  ShieldCheck,
  Store,
  Receipt,
  Gamepad2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Radio,
  Zap,
} from 'lucide-react';
import { PayVoiceLogo } from '../components/common/PayVoiceLogo';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { testVoiceAnnouncement, unlockAudio, isSpeaking, voiceSettings } = useApp();

  return (
    <div className="space-y-16 py-4 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-accent/15 border border-brand-accent/30 text-brand-primary dark:text-brand-accent text-xs font-extrabold uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse text-brand-accent" />
          <span>India’s First Merchant Soundbox Assistant with Play Hub</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Every Payment, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-600 to-brand-accent dark:from-brand-accent dark:to-emerald-400">
            Heard Instantly.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-brand-muted dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          High-fidelity spoken alerts in <strong>Bengali, Hindi, and English</strong>. Built for West Bengal kiranas, sweet counters, and retail shops. Instant confidence without touching your screen.
        </p>

        {/* Live Audio Hero Preview Widget */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-navy max-w-md mx-auto text-white shadow-elevated border border-brand-accent/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              Live Speech Demo
            </span>
            <span className="uppercase text-brand-accent font-bold">{voiceSettings.language}</span>
          </div>

          <div className="text-sm sm:text-base font-extrabold text-white">
            "₹150 received on PayVoice Demo"
          </div>

          <button
            type="button"
            onClick={() => {
              unlockAudio();
              testVoiceAnnouncement();
            }}
            disabled={isSpeaking}
            className={`w-full py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-subtle ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-brand-accent hover:bg-brand-accent-hover text-brand-navy shadow-glow-accent'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? 'Speaking Now...' : 'Click to Hear Soundbox Alert'}</span>
          </button>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-extrabold text-sm shadow-subtle flex items-center justify-center gap-2"
          >
            <span>Launch Merchant Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/onboarding"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-brand-dark-surface hover:bg-slate-50 dark:hover:bg-slate-800 text-brand-navy dark:text-white font-bold text-sm shadow-subtle flex items-center justify-center gap-1.5"
          >
            <span>Interactive Onboarding Demo</span>
          </Link>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            1. Trusted Voice Alerts
          </h3>
          <p className="text-xs text-brand-muted dark:text-slate-400 leading-relaxed">
            Authentic bilingual voice alerts immediately announce customer amounts. Dual-tone bell chimes cut through crowded street and market hubbub.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Receipt className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            2. Smart Merchant Tools
          </h3>
          <p className="text-xs text-brand-muted dark:text-slate-400 leading-relaxed">
            Real-time simulated ledger, multi-store support, CSV reports, and staff sound access designed specifically for retail shopkeepers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            3. PayVoice Play
          </h3>
          <p className="text-xs text-brand-muted dark:text-slate-400 leading-relaxed">
            Completely optional casual break area. Daily brain spark puzzles, memory match, and Bengali word builders for quiet counter downtime.
          </p>
        </div>
      </div>
    </div>
  );
};
