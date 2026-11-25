import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building,
  Users,
  FileSpreadsheet,
  Volume2,
  Headphones,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../data/demoData';
import confetti from 'canvas-confetti';

export const PremiumPage: React.FC = () => {
  const { t, activePlan, upgradePlan, merchant } = useApp();
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [targetPlanId, setTargetPlanId] = useState<'free' | 'premium_monthly' | 'premium_yearly'>('premium_monthly');
  const [successToast, setSuccessToast] = useState(false);

  const freePlan = SUBSCRIPTION_PLANS.find((p: any) => p.id === 'free')!;
  const monthlyPlan = SUBSCRIPTION_PLANS.find((p: any) => p.id === 'premium_monthly')!;
  const yearlyPlan = SUBSCRIPTION_PLANS.find((p: any) => p.id === 'premium_yearly')!;

  const handleSimulateUpgrade = (planId: 'free' | 'premium_monthly' | 'premium_yearly') => {
    upgradePlan(planId);
    setShowUpgradeModal(false);
    setSuccessToast(true);
    if (planId !== 'free') {
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 1. Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-primary dark:text-brand-accent text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Proposed Business Tier
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          {t.premium.title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          {t.premium.subtitle}
        </p>
      </div>

      {/* Mandatory Demo Safety Disclosure */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="font-medium">
            <strong>Proposed Demo Pricing:</strong> {t.premium.proposedNotice} All upgrades here immediately unlock features in this demo environment.
          </p>
        </div>
        {activePlan.id !== 'free' && (
          <button
            type="button"
            onClick={() => handleSimulateUpgrade('free')}
            className="text-[11px] font-bold text-amber-800 dark:text-amber-300 underline hover:no-underline shrink-0"
          >
            Switch Back to Free Demo
          </button>
        )}
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center animate-in zoom-in-95">
          🎉 Simulated Subscription Updated! Your merchant account is now running on {activePlan.name}.
        </div>
      )}

      {/* 2. Pricing Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Free */}
        <div className={`rounded-2xl p-6 border transition-all flex flex-col justify-between bg-white dark:bg-brand-dark-surface shadow-subtle ${
          activePlan.id === 'free'
            ? 'border-brand-primary ring-2 ring-brand-primary/20 dark:border-brand-accent'
            : 'border-slate-200 dark:border-slate-800'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
                {freePlan.name}
              </h3>
              {activePlan.id === 'free' && (
                <span className="text-[10px] font-bold bg-brand-primary/10 dark:bg-brand-accent/20 text-brand-primary dark:text-brand-accent px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-xs text-brand-muted dark:text-slate-400 mb-4">
              {t.premium.freeSub}
            </p>

            <div className="mb-6">
              <span className="text-3xl font-black text-brand-navy dark:text-white">₹0</span>
              <span className="text-xs text-slate-400"> / forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant Voice Payment Alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Single Counter Hardware Unit</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Standard Daily Summary</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                <span className="line-through">Multi-Shop Switching</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                <span className="line-through">Ad-Free Experience</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="button"
              disabled={activePlan.id === 'free'}
              onClick={() => handleSimulateUpgrade('free')}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activePlan.id === 'free'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                  : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {activePlan.id === 'free' ? 'Active Plan' : 'Downgrade to Free'}
            </button>
          </div>
        </div>

        {/* Card 2: Business Premium Monthly (₹49/mo) */}
        <div className={`rounded-2xl p-6 border transition-all flex flex-col justify-between bg-white dark:bg-brand-dark-surface shadow-subtle relative ${
          activePlan.id === 'premium_monthly'
            ? 'border-brand-accent ring-2 ring-brand-accent/30'
            : 'border-slate-200 dark:border-slate-800 hover:border-brand-accent/50'
        }`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-navy font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {monthlyPlan.tag}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
                Monthly Pro
              </h3>
              {activePlan.id === 'premium_monthly' && (
                <span className="text-[10px] font-bold bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-xs text-brand-muted dark:text-slate-400 mb-4">
              Proposed monthly subscription
            </p>

            <div className="mb-6">
              <span className="text-3xl font-black text-brand-navy dark:text-white">₹49</span>
              <span className="text-xs text-slate-400"> / month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <strong className="text-brand-navy dark:text-white">100% Ad-Free Experience</strong>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Multi-Shop Management (Up to 10)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited Staff Audio Receivers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>CSV & Tax Spreadsheet Export</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Custom Voice Speed & Dialect Tuning</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => {
                setTargetPlanId('premium_monthly');
                setShowUpgradeModal(true);
              }}
              className="w-full py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-xs shadow-subtle"
            >
              {activePlan.id === 'premium_monthly' ? 'Renew Demo Plan' : 'Choose Monthly Demo (₹49)'}
            </button>
          </div>
        </div>

        {/* Card 3: Business Premium Yearly (₹499/yr) */}
        <div className={`rounded-2xl p-6 border transition-all flex flex-col justify-between bg-gradient-to-b from-brand-primary/5 to-white dark:from-brand-accent/5 dark:to-brand-dark-surface shadow-subtle relative ${
          activePlan.id === 'premium_yearly'
            ? 'border-brand-accent ring-2 ring-brand-accent/30'
            : 'border-slate-200 dark:border-slate-800 hover:border-brand-accent/50'
        }`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {yearlyPlan.tag}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
                Yearly Pro (Best Value)
              </h3>
              {activePlan.id === 'premium_yearly' && (
                <span className="text-[10px] font-bold bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-xs text-brand-muted dark:text-slate-400 mb-4">
              Proposed annual billing (save 2 months)
            </p>

            <div className="mb-6">
              <span className="text-3xl font-black text-brand-navy dark:text-white">₹499</span>
              <span className="text-xs text-slate-400"> / year</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <strong className="text-brand-navy dark:text-white">All Monthly Features Included</strong>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>₹89 Annual Cost Savings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hardware Warranty Shield (Demo)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Priority WhatsApp Merchant Support</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => {
                setTargetPlanId('premium_yearly');
                setShowUpgradeModal(true);
              }}
              className="w-full py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-navy font-bold text-xs shadow-glow-accent"
            >
              {activePlan.id === 'premium_yearly' ? 'Renew Demo Plan' : 'Choose Annual Demo (₹499)'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Detailed Feature Comparison Table */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle overflow-hidden">
        <h3 className="font-extrabold text-base text-brand-navy dark:text-white mb-4">
          {t.premium.comparisonTitle}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-3">Feature Capability</th>
                <th className="py-3 px-3 text-center">Basic (₹0)</th>
                <th className="py-3 px-3 text-center text-brand-primary dark:text-brand-accent">
                  Business Premium (₹49/mo)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-navy dark:text-white">
                  Payment Voice Announcements (BN, HI, EN)
                </td>
                <td className="py-3 px-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                </td>
                <td className="py-3 px-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-navy dark:text-white">
                  Ad-Free Interface (Zero Partner Banners)
                </td>
                <td className="py-3 px-3 text-center text-slate-400">
                  Partner Sponsored
                </td>
                <td className="py-3 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                  100% Ad-Free
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-navy dark:text-white">
                  Multiple Shop Branches
                </td>
                <td className="py-3 px-3 text-center text-slate-400">
                  1 Counter
                </td>
                <td className="py-3 px-3 text-center font-bold text-brand-navy dark:text-white">
                  Up to 10 Branches
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-navy dark:text-white">
                  Staff Sound Alert Accounts
                </td>
                <td className="py-3 px-3 text-center text-slate-400">
                  Owner only
                </td>
                <td className="py-3 px-3 text-center font-bold text-brand-navy dark:text-white">
                  Unlimited Staff
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-navy dark:text-white">
                  CSV Financial Export
                </td>
                <td className="py-3 px-3 text-center text-slate-400">
                  Standard Web View
                </td>
                <td className="py-3 px-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Billing History & Policy Safety Disclaimers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Billing History Placeholder */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-brand-navy dark:text-white">Demo Billing History</span>
            <span className="text-[10px] text-slate-400">Simulated Ledger</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
            <div>
              <p className="font-semibold text-brand-navy dark:text-white">
                {activePlan.name}
              </p>
              <p className="text-[10px] text-slate-400">Activated via Demo UI</p>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {activePlan.priceDisplay}
            </span>
          </div>
        </div>

        {/* Cancellation & Restore Purchases Placeholders (Master Prompt Requirement) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="font-bold text-brand-navy dark:text-white">Cancellation & Restore Purchase</span>
          <p className="text-[11px] text-brand-muted dark:text-slate-400">
            {t.premium.cancelNotice} Subscriptions can be simulated as cancelled at any time without fees.
          </p>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => alert('Demo Action: Restore Purchases checked. No external store receipt found.')}
              className="text-[11px] font-semibold text-brand-primary dark:text-brand-accent underline"
            >
              Restore Purchases (Demo)
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Simulation Modal */}
      {showUpgradeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white dark:bg-brand-dark-surface max-w-sm w-full rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-accent/20 text-brand-accent mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
                Activate {targetPlanId === 'premium_monthly' ? 'Monthly' : 'Yearly'} Demo
              </h3>
              <p className="text-xs text-brand-muted dark:text-slate-400 mt-1">
                Proposed Pricing: <strong>{targetPlanId === 'premium_monthly' ? '₹49/month' : '₹499/year'}</strong>.
              </p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 font-medium text-left">
              Notice: This is a frontend simulation. No actual credit card, UPI mandate, or payment is initiated.
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-1/2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSimulateUpgrade(targetPlanId)}
                className="w-1/2 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-light"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
