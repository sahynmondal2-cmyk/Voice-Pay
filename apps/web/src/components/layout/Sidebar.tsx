import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ReceiptText,
  Gamepad2,
  Volume2,
  BarChart3,
  Building2,
  Sparkles,
  User,
  Settings,
  HelpCircle,
  ShieldAlert,
  Radio,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { t, activePlan, isAudioUnlocked } = useApp();

  const primaryNavItems = [
    { to: '/dashboard', label: t.nav.home, icon: LayoutDashboard },
    { to: '/transactions', label: t.nav.transactions, icon: ReceiptText },
    { to: '/play', label: t.nav.play, icon: Gamepad2, highlight: true },
    { to: '/voice-settings', label: t.nav.voiceSettings, icon: Volume2 },
    { to: '/reports', label: t.nav.reports, icon: BarChart3 },
    { to: '/business', label: t.nav.business, icon: Building2 },
    { to: '/premium', label: t.nav.premium, icon: Sparkles, badge: activePlan.id === 'free' ? 'Try Pro' : 'Active' },
  ];

  const secondaryNavItems = [
    { to: '/profile', label: t.nav.profile, icon: User },
    { to: '/settings', label: t.nav.settings, icon: Settings },
    { to: '/help', label: t.nav.help, icon: HelpCircle },
    { to: '/admin-demo', label: t.nav.adminDemo, icon: ShieldAlert },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white dark:bg-brand-dark-surface border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-4rem)] sticky top-16 transition-colors overflow-y-auto p-4 select-none justify-between">
      <div>
        {/* Hardware Status Widget */}
        <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              PayVoice Soundbox
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isAudioUnlocked
                ? 'bg-brand-accent/20 text-brand-primary dark:text-brand-accent'
                : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
            }`}>
              {isAudioUnlocked ? 'Active' : 'Tap to Unlock'}
            </span>
          </div>
          <p className="text-[11px] text-brand-muted dark:text-slate-400">
            PV-KOL-9921 • Ready
          </p>
        </div>

        {/* Primary Navigation Links */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Merchant Workspace
          </div>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-subtle dark:bg-brand-accent dark:text-brand-navy'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-brand-navy'
                  } ${item.highlight ? 'border border-brand-accent/20 dark:border-brand-accent/30' : ''}`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-700 dark:text-amber-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Settings & Admin Demo */}
        <div className="space-y-1 mt-6">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Preferences & Support
          </div>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-brand-primary dark:text-brand-accent font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Legal / Policy Notice */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 space-y-1">
        <p className="font-semibold text-slate-500 dark:text-slate-400">PayVoice Demo Platform</p>
        <div className="flex gap-2">
          <NavLink to="/privacy" className="hover:underline">Privacy</NavLink>
          <span>•</span>
          <NavLink to="/terms" className="hover:underline">Terms</NavLink>
          <span>•</span>
          <NavLink to="/help" className="hover:underline">FAQ</NavLink>
        </div>
      </div>
    </aside>
  );
};
