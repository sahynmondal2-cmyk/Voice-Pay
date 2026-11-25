import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, Volume2, ShieldAlert, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransactionDirection } from '../../types';

export const SimulatePaymentModal: React.FC = () => {
  const {
    isSimulateModalOpen,
    setIsSimulateModalOpen,
    addTransaction,
    t,
    activeShop,
  } = useApp();

  const [direction, setDirection] = useState<TransactionDirection>('incoming');
  const [amount, setAmount] = useState<number>(150);
  const [personName, setPersonName] = useState<string>('Priya');
  const [customerVpa, setCustomerVpa] = useState<string>('priya***@demo-upi');
  const [notes, setNotes] = useState<string>('Counter payment demo');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSimulateModalOpen) return null;

  const quickAmounts = [10, 50, 100, 150, 500, 1000, 1500, 5000, 10000, 50000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    addTransaction({
      amount,
      direction,
      customerName: personName.trim() || 'Priya',
      senderName: direction === 'incoming' ? (personName.trim() || 'Priya') : undefined,
      recipientName: direction === 'outgoing' ? (personName.trim() || 'Priya') : undefined,
      customerVpa: customerVpa.trim(),
      notes: notes.trim() || (direction === 'outgoing' ? 'Vendor Payout Demo' : 'Counter payment demo'),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsSimulateModalOpen(false);
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="simulate-payment-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-all"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-brand-dark-surface rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-navy p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-accent/20 text-brand-accent">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 id="simulate-payment-title" className="font-extrabold text-sm sm:text-base">
                Simulate Payment Voice Alert
              </h3>
              <p className="text-[11px] text-slate-300">
                Trigger real-time speech announcement (Incoming & Outgoing)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSimulateModalOpen(false)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Payment Integration: Not Connected Banner */}
        <div className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Real Payment Integration: Not Connected</span>
          </div>
          <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded font-mono">Demo Mode</span>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-brand-navy dark:text-white">
              {direction === 'incoming'
                ? `₹${amount.toLocaleString('en-IN')} Received from ${personName}!`
                : `₹${amount.toLocaleString('en-IN')} Sent to ${personName}!`}
            </h4>
            <p className="text-xs text-brand-muted dark:text-slate-400">
              {direction === 'incoming'
                ? 'Incoming voice alert triggered via speech engine.'
                : 'Outgoing voice alert triggered via speech engine.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            {/* Direction Toggle: Incoming vs Outgoing */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Payment Direction
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDirection('incoming')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-bold text-xs transition-all ${
                    direction === 'incoming'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Incoming (Received)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('outgoing')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-bold text-xs transition-all ${
                    direction === 'outgoing'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Outgoing (Sent)</span>
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="sim-amount" className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Payment Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-extrabold text-base text-slate-400">
                  ₹
                </span>
                <input
                  id="sim-amount"
                  type="number"
                  min="1"
                  max="100000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-base text-brand-navy dark:text-white focus:border-brand-accent focus:bg-white dark:focus:bg-slate-800 transition-colors"
                  required
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-1 mt-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`px-2 py-0.5 rounded-lg font-semibold text-[11px] transition-colors ${
                      amount === q
                        ? 'bg-brand-primary text-white dark:bg-brand-accent dark:text-brand-navy'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    ₹{q >= 1000 ? `${q / 1000}k` : q}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input (Sender or Recipient based on direction) */}
            <div>
              <label htmlFor="sim-person" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {direction === 'incoming' ? 'Customer / Payer Name' : 'Recipient Name'}
              </label>
              <input
                id="sim-person"
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder={direction === 'incoming' ? 'e.g. Priya' : 'e.g. Priya'}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-brand-navy dark:text-white text-xs"
                required
              />
            </div>

            {/* Notes / Order Description */}
            <div>
              <label htmlFor="sim-notes" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {direction === 'incoming' ? 'Counter Note (Optional)' : 'Payout Purpose (Optional)'}
              </label>
              <input
                id="sim-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={direction === 'incoming' ? 'e.g. Sweets & tea' : 'e.g. Vendor raw materials'}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-brand-navy dark:text-white text-xs"
              />
            </div>

            <div className="text-[11px] text-brand-muted dark:text-slate-400">
              Active Counter: <strong>{activeShop.name}</strong>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSimulateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-white font-bold shadow-subtle active:scale-95 transition-all ${
                  direction === 'incoming'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Volume2 className="w-4 h-4 text-white" />
                <span>Simulate {direction === 'incoming' ? 'Incoming' : 'Outgoing'} & Announce</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
