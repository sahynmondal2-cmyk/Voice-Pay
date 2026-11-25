import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, Sparkles, Volume2, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SimulatePaymentModal: React.FC = () => {
  const {
    isSimulateModalOpen,
    setIsSimulateModalOpen,
    addTransaction,
    t,
    activeShop,
  } = useApp();

  const [amount, setAmount] = useState<number>(150);
  const [customerName, setCustomerName] = useState<string>('Priya Banerjee');
  const [customerVpa, setCustomerVpa] = useState<string>('priya.b***@demo-upi');
  const [notes, setNotes] = useState<string>('2 Sweet Boxes & Tea');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSimulateModalOpen) return null;

  const quickAmounts = [20, 50, 100, 150, 350, 500, 1200];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    addTransaction({
      amount,
      customerName: customerName.trim() || 'Demo Customer',
      customerVpa: customerVpa.trim(),
      notes: notes.trim(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsSimulateModalOpen(false);
    }, 1400);
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
                Simulate UPI QR Payment
              </h3>
              <p className="text-[11px] text-slate-300">
                Trigger real-time voice announcement test
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

        {/* Demo safety pill */}
        <div className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/20 px-4 py-1.5 flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>Demo Simulation Only — No live bank or UPI transfer.</span>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-brand-accent/20 text-brand-accent mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-brand-navy dark:text-white">
              ₹{amount.toLocaleString('en-IN')} Received!
            </h4>
            <p className="text-xs text-brand-muted dark:text-slate-400">
              Voice announcement triggered via speech engine.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
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
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-base text-brand-navy dark:text-white focus:border-brand-accent focus:bg-white dark:focus:bg-slate-800 transition-colors"
                  required
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors ${
                      amount === q
                        ? 'bg-brand-primary text-white dark:bg-brand-accent dark:text-brand-navy'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    ₹{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Payer Name */}
            <div>
              <label htmlFor="sim-payer" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Customer / Payer Name
              </label>
              <input
                id="sim-payer"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya Banerjee"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-brand-navy dark:text-white text-xs"
                required
              />
            </div>

            {/* Notes / Order Description */}
            <div>
              <label htmlFor="sim-notes" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Counter Note / Item (Optional)
              </label>
              <input
                id="sim-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Sweets, Groceries"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-brand-navy dark:text-white text-xs"
              />
            </div>

            <div className="text-[11px] text-brand-muted dark:text-slate-400">
              Active Shop Counter: <strong>{activeShop.name}</strong>
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
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-bold shadow-subtle active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-brand-accent" />
                <span>Simulate & Announce</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
