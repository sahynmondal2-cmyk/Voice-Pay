import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  PlusCircle,
  QrCode,
  Volume2,
  BarChart3,
  Lightbulb,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SoundReadinessCard } from '../components/home/SoundReadinessCard';
import { AdSlot } from '../components/common/AdSlot';
import { TransactionStatusBadge } from '../components/transactions/TransactionStatusBadge';
import { TransactionDetailDrawer } from '../components/transactions/TransactionDetailDrawer';
import { DemoTransaction } from '../types';

export const DashboardPage: React.FC = () => {
  const {
    merchant,
    activeShop,
    transactions,
    t,
    replayTransactionVoice,
    isSpeaking,
    setIsSimulateModalOpen,
    activePlan,
  } = useApp();

  const [selectedTxn, setSelectedTxn] = useState<DemoTransaction | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // Compute today's sample totals
  const todayTransactions = transactions.filter((txn) => txn.status === 'Demo Successful');
  const todayVolume = todayTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCount = transactions.length;
  const successRate = totalCount > 0 ? Math.round((todayTransactions.length / totalCount) * 100) : 100;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Merchant Welcome & Soundbox Readiness */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
              {t.home.welcome} {merchant.fullName}
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 dark:bg-brand-accent/20 text-brand-primary dark:text-brand-accent">
              {merchant.tier}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400 mt-0.5">
            {activeShop.name} • {activeShop.city}, {activeShop.state}
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-brand-dark-card text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-subtle"
          >
            <QrCode className="w-3.5 h-3.5 text-brand-accent" />
            <span>{t.home.viewQr}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSimulateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold shadow-subtle transition-all active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-brand-accent" />
            <span>{t.home.simulatePayment}</span>
          </button>
        </div>
      </div>

      {/* 2. Sound Readiness Hero Card */}
      <SoundReadinessCard />

      {/* 3. Today's Sample Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Total Volume */}
        <div className="rounded-2xl p-4 bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-medium text-brand-muted dark:text-slate-400 mb-1">
            <span>{t.home.todayCollection}</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
            ₹{todayVolume.toLocaleString('en-IN')}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>+14.2% vs yesterday</span>
            <span className="text-slate-400 font-normal">(Demo)</span>
          </div>
        </div>

        {/* Metric 2: Transaction Count */}
        <div className="rounded-2xl p-4 bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-xs font-medium text-brand-muted dark:text-slate-400 mb-1">
            <span>{t.home.todayCount}</span>
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
            {totalCount}
          </div>
          <div className="mt-1 text-[11px] text-brand-muted dark:text-slate-400">
            {todayTransactions.length} successful • Demo
          </div>
        </div>

        {/* Metric 3: Success Rate */}
        <div className="rounded-2xl p-4 bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-xs font-medium text-brand-muted dark:text-slate-400 mb-1">
            <span>Success Rate</span>
            <div className="p-1.5 rounded-lg bg-brand-primary/10 dark:bg-brand-accent/20 text-brand-primary dark:text-brand-accent">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
            {successRate}%
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Healthy soundbox response
          </div>
        </div>

        {/* Metric 4: Soundbox Paired */}
        <div className="rounded-2xl p-4 bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-xs font-medium text-brand-muted dark:text-slate-400 mb-1">
            <span>Hardware Box</span>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Volume2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold text-brand-navy dark:text-white truncate">
            {activeShop.soundBoxId}
          </div>
          <div className="mt-1 text-[11px] text-brand-accent font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Battery 94% • 4G Online
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-slate-400 mb-3">
          {t.home.quickActions}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setIsSimulateModalOpen(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 hover:border-brand-accent/50 hover:shadow-subtle transition-all text-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 dark:bg-brand-accent/15 text-brand-primary dark:text-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-brand-navy dark:text-white">Simulate Payment</p>
              <p className="text-[10px] text-slate-400">Hear instant voice</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 hover:border-brand-accent/50 hover:shadow-subtle transition-all text-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-brand-navy dark:text-white">Show Demo QR</p>
              <p className="text-[10px] text-slate-400">Counter stand display</p>
            </div>
          </button>

          <Link
            to="/play"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-br from-brand-primary/5 to-brand-accent/10 dark:from-brand-accent/10 dark:to-transparent border border-brand-accent/30 hover:shadow-subtle transition-all text-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-accent/20 text-brand-primary dark:text-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-brand-navy dark:text-white">PayVoice Play</p>
              <p className="text-[10px] text-brand-accent font-semibold">Merchant break zone</p>
            </div>
          </Link>

          <Link
            to="/reports"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 hover:border-brand-accent/50 hover:shadow-subtle transition-all text-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-brand-navy dark:text-white">Daily Reports</p>
              <p className="text-[10px] text-slate-400">Sales charts & trends</p>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. Recent Demo Transactions */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-brand-navy dark:text-white">
              {t.home.recentTransactions}
            </h3>
            <p className="text-xs text-brand-muted dark:text-slate-400">
              Simulated real-time payment feed
            </p>
          </div>
          <Link
            to="/transactions"
            className="text-xs font-bold text-brand-primary dark:text-brand-accent hover:underline flex items-center gap-1"
          >
            <span>{t.home.viewAllTxn}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-brand-muted dark:text-slate-400 text-xs">
            {t.home.noTransactionsYet}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.slice(0, 5).map((txn) => (
              <div
                key={txn.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl px-2 transition-colors cursor-pointer"
                onClick={() => setSelectedTxn(txn)}
              >
                {/* Left: Icon & Payer */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                      txn.direction === 'outgoing'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {txn.direction === 'outgoing' ? '↑' : '↓'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-xs sm:text-sm text-brand-navy dark:text-white truncate">
                        {txn.direction === 'outgoing'
                          ? `To: ${txn.recipientName || txn.customerName}`
                          : `From: ${txn.senderName || txn.customerName}`}
                      </p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          txn.direction === 'outgoing'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {txn.direction === 'outgoing' ? 'Sent' : 'Received'}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted dark:text-slate-400 font-mono truncate">
                      {txn.id} • {txn.method}
                    </p>
                  </div>
                </div>

                {/* Right: Amount & Replay Audio */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <div
                      className={`font-extrabold text-sm sm:text-base ${
                        txn.direction === 'outgoing'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-brand-navy dark:text-white'
                      }`}
                    >
                      {txn.direction === 'outgoing' ? '-' : '+'}₹{txn.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px]">
                      <TransactionStatusBadge status={txn.status} />
                    </div>
                  </div>

                  {/* Replay Voice button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      replayTransactionVoice(txn.id);
                    }}
                    disabled={isSpeaking}
                    title="Replay Voice Alert"
                    className="p-2 rounded-lg text-slate-400 hover:text-brand-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Centralized Policy-Safe Ad Placement: Home Feed */}
      <AdSlot
        placementId="home_feed"
        contextTag="allowed_content_feed"
      />

      {/* 7. Concise Business Tips & Banner */}
      <div className="bg-slate-50 dark:bg-brand-dark-surface/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-brand-navy dark:text-white">
            {t.home.businessTips}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-white dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
            <p className="font-bold text-brand-navy dark:text-white mb-1">
              Verify Sound for High-Value Orders
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Never rely on screenshot proof shown by strangers. Always confirm by listening to the instant PayVoice spoken announcement.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
            <p className="font-bold text-brand-navy dark:text-white mb-1">
              Daily QR Cleaning
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Keep your counter acrylic QR stand clear of dust, oil, and moisture to ensure instant optical scan by customer camera apps.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800">
            <p className="font-bold text-brand-navy dark:text-white mb-1">
              Multiple Counter Extension
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Manage packing, billing, and takeaway desks simultaneously with PayVoice Business Premium staff voice receivers.
            </p>
          </div>
        </div>

        {/* Business Tips Sponsored Banner */}
        <div className="mt-4">
          <AdSlot
            placementId="business_tips"
            contextTag="allowed_content_feed"
          />
        </div>
      </div>

      {/* Transaction Details Drawer */}
      <TransactionDetailDrawer
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />

      {/* Counter Stand QR Display Modal */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white dark:bg-brand-dark-surface max-w-sm w-full rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-accent mb-1">
              Counter Stand Display (Demo)
            </div>
            <h4 className="font-extrabold text-base text-brand-navy dark:text-white mb-3">
              {activeShop.name}
            </h4>

            {/* Simulated QR Code Graphic */}
            <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl border-2 border-brand-primary/20 shadow-subtle flex flex-col items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-navy">
                <rect x="5" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="12" y="12" width="11" height="11" fill="currentColor" />
                <rect x="70" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="77" y="12" width="11" height="11" fill="currentColor" />
                <rect x="5" y="70" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="12" y="77" width="11" height="11" fill="currentColor" />
                {/* Inner simulated pattern */}
                <rect x="36" y="10" width="8" height="8" fill="currentColor" />
                <rect x="48" y="18" width="12" height="6" fill="currentColor" />
                <rect x="38" y="38" width="24" height="24" rx="4" fill="#14532D" />
                {/* PayVoice center dot */}
                <circle cx="50" cy="50" r="5" fill="#22C55E" />
                <rect x="10" y="45" width="18" height="8" fill="currentColor" />
                <rect x="72" y="45" width="16" height="10" fill="currentColor" />
                <rect x="45" y="75" width="15" height="15" fill="currentColor" />
                <rect x="70" y="72" width="18" height="18" fill="currentColor" />
              </svg>
            </div>

            <p className="mt-3 font-mono font-bold text-xs text-brand-navy dark:text-white">
              {activeShop.upiIdDemo}
            </p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
              Demo QR representation. Scan triggers simulated payment flow.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowQrModal(false);
                setIsSimulateModalOpen(true);
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-brand-primary text-white font-bold text-xs shadow-subtle hover:bg-brand-primary-light"
            >
              Test Scan / Simulate Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
