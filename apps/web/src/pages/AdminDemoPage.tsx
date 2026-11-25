import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Layers,
  Settings,
  MessageSquare,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_AD_PLACEMENTS, SUBSCRIPTION_PLANS } from '../data/demoData';
import { TransactionStatusBadge } from '../components/transactions/TransactionStatusBadge';

export const AdminDemoPage: React.FC = () => {
  const { merchant, transactions, supportTickets, activePlan } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'merchants' | 'transactions' | 'ads' | 'plans' | 'tickets'>('overview');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Prominent Demo Protection Warning (Master Prompt Rule: Protect from being presented as a real production admin) */}
      <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-amber-950 dark:text-amber-200 space-y-1">
        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <ShieldAlert className="w-5 h-5" />
          <span>Demo Admin Preview UI — Not A Production Secure Backoffice</span>
        </div>
        <p className="text-xs text-amber-900/90 dark:text-amber-300 leading-relaxed">
          This panel is an architectural demonstration of merchant administration capabilities, simulated ledger monitoring, and ad slot testing. No real backend admin authentication or secret credentials are used.
        </p>
      </div>

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
            PayVoice System Demo Console
          </h1>
          <p className="text-xs text-brand-muted dark:text-slate-400">
            Inspector for mock entities, active placements, and customer tickets.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'merchants', label: 'Merchants' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'ads', label: 'Ad Placements' },
            { id: 'plans', label: 'Plans Config' },
            { id: 'tickets', label: 'Support Desk' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-brand-dark-surface text-brand-primary dark:text-brand-accent shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-brand-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
              <span className="text-xs font-medium text-slate-500">Registered Merchants (Demo)</span>
              <div className="text-2xl font-black text-brand-navy dark:text-white mt-1">1,240</div>
              <span className="text-[11px] text-emerald-600 font-semibold">+48 this week</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
              <span className="text-xs font-medium text-slate-500">Live Soundbox Units</span>
              <div className="text-2xl font-black text-brand-navy dark:text-white mt-1">982</div>
              <span className="text-[11px] text-brand-accent font-semibold">97.8% Online</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
              <span className="text-xs font-medium text-slate-500">Simulated 24h Volume</span>
              <div className="text-2xl font-black text-brand-navy dark:text-white mt-1">₹14.2 Lakh</div>
              <span className="text-[11px] text-slate-400">Demo Transactions</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
              <span className="text-xs font-medium text-slate-500">Business Premium Ratio</span>
              <div className="text-2xl font-black text-amber-500 mt-1">14.6%</div>
              <span className="text-[11px] text-slate-400">Proposed tier conversion</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle space-y-3">
            <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white">
              System Health & Policy Safety Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-200 block">Ad-Placement Policy Guard Active</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">Strictly blocks ad rendering in payment success screens and active games.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-200 block">Web Speech & Web Audio Synthesizer</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">Multi-lingual synthesis ready for bn, hi, and en text.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Merchants */}
      {activeTab === 'merchants' && (
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            Demo Merchant Registry
          </h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Merchant ID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Primary Store</th>
                  <th className="py-2.5 px-3">State</th>
                  <th className="py-2.5 px-3">KYC</th>
                  <th className="py-2.5 px-3">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3 px-3 font-mono font-bold">{merchant.id}</td>
                  <td className="py-3 px-3 font-semibold">{merchant.fullName}</td>
                  <td className="py-3 px-3">{merchant.shops[0].name}</td>
                  <td className="py-3 px-3">West Bengal</td>
                  <td className="py-3 px-3 text-emerald-600 font-semibold">{merchant.kycStatus}</td>
                  <td className="py-3 px-3 font-bold text-brand-accent">{activePlan.name}</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono">merch_wb_4102</td>
                  <td className="py-3 px-3 font-semibold">Debashis Roy</td>
                  <td className="py-3 px-3">Roy Tea Stall & Fast Food</td>
                  <td className="py-3 px-3">West Bengal</td>
                  <td className="py-3 px-3 text-emerald-600">Verified (Demo)</td>
                  <td className="py-3 px-3">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Transactions List */}
      {activeTab === 'transactions' && (
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            Simulated Global Transaction Stream
          </h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Reference</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.slice(0, 8).map((t) => (
                  <tr key={t.id}>
                    <td className="py-2.5 px-3 font-mono">{t.id}</td>
                    <td className="py-2.5 px-3 font-semibold">{t.customerName}</td>
                    <td className="py-2.5 px-3 font-extrabold">₹{t.amount}</td>
                    <td className="py-2.5 px-3">
                      <TransactionStatusBadge status={t.status} />
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                      {new Date(t.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Ad Placement Preview */}
      {activeTab === 'ads' && (
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            Active Policy-Safe Ad Placement Slots
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.values(DEMO_AD_PLACEMENTS).map((ad: any) => (
              <div
                key={ad.placementId}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-dark-card space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-brand-primary dark:text-brand-accent">
                    #{ad.placementId}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-700 font-bold uppercase">
                    {ad.badgeLabel}
                  </span>
                </div>
                <h4 className="font-bold text-brand-navy dark:text-white">{ad.headline}</h4>
                <p className="text-[11px] text-slate-500">{ad.description}</p>
                <div className="text-[10px] text-slate-400">
                  Sponsor: <strong>{ad.sponsorName}</strong> • Target: {ad.ctaUrl}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Plans Configuration */}
      {activeTab === 'plans' && (
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            Proposed Business Tier Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-dark-card space-y-2"
              >
                <h4 className="font-extrabold text-sm text-brand-navy dark:text-white">{plan.name}</h4>
                <div className="text-xl font-black text-brand-primary dark:text-brand-accent">
                  {plan.priceDisplay}
                </div>
                <p className="text-[11px] text-slate-400">Cycle: {plan.billingCycle}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span className={f.included ? 'text-emerald-500 font-bold' : 'text-slate-400'}>
                        {f.included ? '✓' : '✗'}
                      </span>
                      <span className={f.included ? 'font-medium' : 'text-slate-400 line-through'}>
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Support Tickets */}
      {activeTab === 'tickets' && (
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
            Merchant Ticket Queue
          </h3>
          <div className="space-y-3 text-xs">
            {supportTickets.map((t) => (
              <div key={t.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-dark-card flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                  <h4 className="font-bold text-brand-navy dark:text-white">{t.subject}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.message}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
