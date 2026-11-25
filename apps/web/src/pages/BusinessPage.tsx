import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  Radio,
  Users,
  Building,
  ShieldCheck,
  Sparkles,
  Lock,
  Plus,
  BatteryCharging,
  Wifi,
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BusinessPage: React.FC = () => {
  const { merchant, activeShop, setActiveShopId, activePlan, t } = useApp();
  const isPremium = activePlan.id !== 'free';

  const [staffList, setStaffList] = useState([
    { id: 'st_1', name: 'Aloke Roy', role: 'Counter Cashier', phone: '+91 98301 •••••', status: 'Active (Demo)' },
    { id: 'st_2', name: 'Balaram Sen', role: 'Sweet Packer', phone: '+91 98302 •••••', status: 'Sound Receiver Only' },
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          {t.business.title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          {t.business.subtitle}
        </p>
      </div>

      {/* 1. Store Profile & Paired Sound Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Shop Profile */}
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-brand-navy dark:text-white">
                  {activeShop.name}
                </h3>
                <span className="text-[11px] text-brand-muted dark:text-slate-400">
                  {activeShop.category}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              Verified Merchant
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-brand-muted dark:text-slate-400">Location Address</span>
              <span className="font-medium text-brand-navy dark:text-white text-right">
                {activeShop.address}, {activeShop.city} - {activeShop.pincode}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-brand-muted dark:text-slate-400">Merchant VPA</span>
              <span className="font-mono font-bold text-brand-accent">{activeShop.upiIdDemo}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-brand-muted dark:text-slate-400">Registration Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Active & Live (Demo)
              </span>
            </div>
          </div>
        </div>

        {/* Paired Sound Box Hardware */}
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-accent/20 text-brand-accent">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-brand-navy dark:text-white">
                  PayVoice 4G Soundbox
                </h3>
                <span className="font-mono text-[11px] text-brand-muted dark:text-slate-400">
                  {activeShop.soundBoxId}
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              Online
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-brand-muted dark:text-slate-400 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" /> Battery Level
              </span>
              <span className="font-bold text-brand-navy dark:text-white">94% (Good)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-brand-muted dark:text-slate-400 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-blue-500" /> Cellular SIM Carrier
              </span>
              <span className="font-medium text-brand-navy dark:text-white">Airtel 4G IoT (WB Circle)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-brand-muted dark:text-slate-400">Firmware Build</span>
              <span className="font-mono text-[11px] text-slate-500">v2.14-stable (Demo)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Multi-Store Switcher (Business Premium feature) */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-accent" />
              <span>{t.business.multipleShops}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
                {t.business.multipleShopsBadge}
              </span>
            </h3>
            <p className="text-xs text-brand-muted dark:text-slate-400 mt-0.5">
              Manage multiple branch counters from a single merchant dashboard.
            </p>
          </div>

          {!isPremium && (
            <Link
              to="/premium"
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shrink-0"
            >
              <Sparkles className="w-3 h-3" />
              Upgrade to Unlock
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {merchant.shops.map((shop: any) => (
            <div
              key={shop.id}
              onClick={() => {
                if (isPremium || shop.isPrimary) {
                  setActiveShopId(shop.id);
                }
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                activeShop.id === shop.id
                  ? 'border-brand-primary bg-brand-primary/5 dark:border-brand-accent dark:bg-brand-accent/15'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              } ${!isPremium && !shop.isPrimary ? 'opacity-70' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-brand-navy dark:text-white">
                  {shop.name}
                </span>
                {shop.isPrimary ? (
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-semibold text-slate-600 dark:text-slate-300">
                    Primary Store
                  </span>
                ) : !isPremium ? (
                  <span className="text-[10px] flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                    <Lock className="w-3 h-3" /> Premium Locked
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-1.5 py-0.5 rounded font-semibold">
                    Branch Store
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                {shop.address}, {shop.city}
              </p>
              <p className="text-[10px] font-mono text-brand-accent mt-1">
                Box ID: {shop.soundBoxId}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Counter Staff Access Roles */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-accent" />
              <span>{t.business.staffAccess}</span>
            </h3>
            <p className="text-xs text-brand-muted dark:text-slate-400 mt-0.5">
              {t.business.staffAccessDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isPremium) {
                alert('Staff sound permissions require Business Premium demo plan. Please upgrade on the Premium page.');
              } else {
                alert('Demo Action: Invite staff member modal.');
              }
            }}
            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Staff (Demo)</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {staffList.map((st) => (
            <div key={st.id} className="py-3 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-brand-navy dark:text-white">{st.name}</p>
                <p className="text-[11px] text-brand-muted dark:text-slate-400">{st.role} • {st.phone}</p>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {st.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. GST & Business Verification (Demo) */}
      <div className="bg-slate-50 dark:bg-brand-dark-surface/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-xs text-slate-600 dark:text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-brand-navy dark:text-white text-sm">
          <FileCheck2 className="w-4 h-4 text-brand-accent" />
          <span>{t.business.taxGstDemo}</span>
        </div>
        <p className="text-[11px] text-brand-muted dark:text-slate-400">
          Artificial business tax identifier: <strong>19AAAAA0000A1Z5 (Demo WB)</strong>. Merchant account KYC is certified for simulated voice alert operations.
        </p>
      </div>
    </div>
  );
};
