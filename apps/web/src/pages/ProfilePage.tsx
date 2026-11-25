import React from 'react';
import {
  User,
  ShieldCheck,
  Building,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Lock,
  Store,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { merchant, activePlan, t } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          Merchant Profile & KYC
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          Account credentials, linked settlement account, and business identity.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 dark:bg-brand-accent/20 text-brand-primary dark:text-brand-accent font-black text-xl flex items-center justify-center shrink-0">
              {merchant.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-brand-navy dark:text-white">
                {merchant.fullName}
              </h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-brand-muted dark:text-slate-400">
                <span className="font-mono">{merchant.id}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {merchant.kycStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {activePlan.name}
            </span>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-brand-accent" /> Phone Number (Demo)
            </span>
            <p className="font-bold text-brand-navy dark:text-white font-mono">
              {merchant.phoneDemo}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-brand-accent" /> Registered Email
            </span>
            <p className="font-bold text-brand-navy dark:text-white font-mono">
              {merchant.emailDemo}
            </p>
          </div>
        </div>

        {/* Linked Bank Settlement Account (Demo Masked) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              Settlement Bank Account (Masked Demo)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">NEFT / IMPS Ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Bank Name</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{merchant.bankAccountDemo.bankName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Account Number</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{merchant.bankAccountDemo.accountNumberMasked}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">IFSC Code</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{merchant.bankAccountDemo.ifscDemo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
