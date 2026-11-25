import React from 'react';
import { AlertTriangle, FileCheck } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          Draft For Legal Review Only
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          Terms of Service & Usage
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          Frontend Demo Prototype Terms • PayVoice Assistant
        </p>
      </div>

      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-subtle space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            1. Scope of Frontend Demo
          </h3>
          <p>
            PayVoice is provided as an interactive UI design preview. It does not conduct real monetary clearing, live settlement, or authorized NPCI UPI routing. All transactions, shop accounts, and QR previews are strictly simulated.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            2. Proposed Subscription Pricing
          </h3>
          <p>
            The proposed Business Premium pricing of ₹49/month or ₹499/year is an illustrative demo tier. Upgrading within this frontend is a simulation that unlocks demo features without real debit or credit card charges.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            3. Entertainment Disclaimer
          </h3>
          <p>
            PayVoice Play mini-games (Daily Brain Spark, Memory Match, Word Builder, Quick Tap) are for personal relaxation during shop counter downtime. They offer zero monetary prizes, lottery rewards, or gambling elements. Badges have no cash surrender value.
          </p>
        </section>
      </div>
    </div>
  );
};
