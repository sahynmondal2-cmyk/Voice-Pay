import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          Draft For Legal Review Only
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          Last updated: November 2026 • PayVoice Merchant Privacy Commitment
        </p>
      </div>

      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-subtle space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            1. Zero Sensitive Financial Secrets Stored
          </h3>
          <p>
            PayVoice strictly does NOT collect, inspect, process, or store UPI PINs, bank passwords, OTPs, full credit card numbers, or biometric credentials. This frontend prototype runs using purely artificial simulated records.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            2. Local Browser Storage Only
          </h3>
          <p>
            Preferences such as speech volume, selected language (Bengali, Hindi, English), theme choices, and mini-game progress are stored solely within the merchant's local device storage (<code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code>). No customer banking records leave the browser sandbox.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            3. Advertisement Policy & Transparent Sponsorship
          </h3>
          <p>
            To keep free instant payment voice alerts available for small kirana and sweet store retailers, PayVoice displays clearly designated merchant partner placements. We adhere to rigorous policy constraints:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ads are never displayed on payment success screens or voice controls.</li>
            <li>Ads are never placed inside active mini-game puzzles.</li>
            <li>No fake click loops, deceptive countdown timers, or forced interstitials.</li>
            <li>Users may opt out of personalized recommendations in Ad Preferences.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            4. Web Audio & Speech API Utilization
          </h3>
          <p>
            Speech synthesis uses the client-side Web Speech API and Web Audio oscillators. No customer names or payment amounts are recorded or transmitted to third-party listening servers.
          </p>
        </section>

        <div className="p-3.5 bg-slate-50 dark:bg-brand-dark-card border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500 italic">
          Disclaimer: This privacy document is a frontend specification draft and must be reviewed by accredited legal counsel before deploying live banking adapters.
        </div>
      </div>
    </div>
  );
};
