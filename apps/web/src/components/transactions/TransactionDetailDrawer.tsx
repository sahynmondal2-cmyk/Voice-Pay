import React from 'react';
import {
  X,
  Volume2,
  Printer,
  Copy,
  Check,
  ShieldAlert,
  ArrowUpRight,
  Store,
  Clock,
  User,
  CreditCard,
  FileText,
} from 'lucide-react';
import { DemoTransaction } from '../../types';
import { TransactionStatusBadge } from './TransactionStatusBadge';
import { useApp } from '../../context/AppContext';

interface TransactionDetailDrawerProps {
  transaction: DemoTransaction | null;
  onClose: () => void;
}

export const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({
  transaction,
  onClose,
}) => {
  const { replayTransactionVoice, isSpeaking, merchant, activeShop } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!transaction) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="txn-detail-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
    >
      <div className="w-full max-w-md bg-white dark:bg-brand-dark-surface h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-brand-dark-card/50">
          <div>
            <h3 id="txn-detail-title" className="text-base font-extrabold text-brand-navy dark:text-white">
              Transaction Details
            </h3>
            <p className="text-xs text-brand-muted dark:text-slate-400">
              Artificial Demo Record
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Demo Safety Disclosure */}
        <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Artificial Reference. Real payment alerts require authorized NPCI/Bank provider integration.
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs sm:text-sm">
          {/* Hero Amount & Status Card */}
          <div className="text-center p-5 rounded-2xl bg-gradient-to-b from-brand-primary/5 to-transparent dark:from-brand-accent/5 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-brand-muted dark:text-slate-400 uppercase tracking-wider">
              Payment Amount
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white">
              ₹{transaction.amount.toLocaleString('en-IN')}
            </div>
            <div className="pt-1">
              <TransactionStatusBadge status={transaction.status} />
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-3 bg-slate-50 dark:bg-brand-dark-card p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
            {/* Demo Reference ID */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-brand-muted dark:text-slate-400 font-medium">Demo Reference ID</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-brand-navy dark:text-white">
                <span>{transaction.id}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(transaction.id)}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                  title="Copy reference"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Payer Info */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-brand-muted dark:text-slate-400 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Customer Name
              </span>
              <span className="font-semibold text-brand-navy dark:text-white">
                {transaction.customerName}
              </span>
            </div>

            {/* Masked VPA */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-brand-muted dark:text-slate-400 font-medium">Customer UPI VPA</span>
              <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
                {transaction.customerVpa}
              </span>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-brand-muted dark:text-slate-400 font-medium flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> Payment Mode
              </span>
              <span className="font-medium text-brand-navy dark:text-white">
                {transaction.method}
              </span>
            </div>

            {/* Timestamp */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-brand-muted dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Date & Time
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300 text-right">
                {new Date(transaction.timestamp).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>

            {/* Shop Counter */}
            <div className="flex items-center justify-between">
              <span className="text-brand-muted dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" /> Shop Terminal
              </span>
              <span className="font-medium text-brand-navy dark:text-white">
                {activeShop.name}
              </span>
            </div>
          </div>

          {/* Note */}
          {transaction.notes && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <span className="font-semibold text-slate-500 text-[11px] uppercase block mb-0.5">
                Counter Notes:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                "{transaction.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-dark-card space-y-2">
          {/* Replay Voice Announcement */}
          <button
            type="button"
            onClick={() => replayTransactionVoice(transaction.id)}
            disabled={isSpeaking}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-xs shadow-subtle active:scale-95 transition-all"
          >
            <Volume2 className="w-4 h-4 text-brand-accent" />
            <span>Replay Voice Alert</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
