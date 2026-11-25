import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Phone, User, ArrowRight, ShieldAlert } from 'lucide-react';
import { PayVoiceLogo } from '../components/common/PayVoiceLogo';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('New Kolkata Sweets');
  const [owner, setOwner] = useState('Anirban Das');
  const [phone, setPhone] = useState('9831122334');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <PayVoiceLogo size="lg" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
          Register New Store (Demo)
        </h1>
        <p className="text-xs text-brand-muted dark:text-slate-400">
          Set up a simulated soundbox account for your counter.
        </p>
      </div>

      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-subtle space-y-5">
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Demo Registration — No real KYC documents or banking verification required.</span>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Shop / Business Name
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-semibold text-brand-navy dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Proprietor / Merchant Name
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-semibold text-brand-navy dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-brand-navy dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-xs shadow-subtle flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Proceed to Sound Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-brand-accent font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
