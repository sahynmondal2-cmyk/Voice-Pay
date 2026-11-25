import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Gamepad2, Building2, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { t } = useApp();

  const navItems = [
    { to: '/dashboard', label: t.nav.home, icon: LayoutDashboard },
    { to: '/transactions', label: t.nav.transactions, icon: ReceiptText },
    { to: '/play', label: t.nav.play, icon: Gamepad2, highlight: true },
    { to: '/business', label: t.nav.business, icon: Building2 },
    { to: '/profile', label: t.nav.profile, icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe transition-colors"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }: { isActive: boolean }) =>
                `flex flex-col items-center justify-center h-full py-1 gap-1 text-[10px] font-semibold transition-all relative ${
                  isActive
                    ? 'text-brand-primary dark:text-brand-accent scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className={`p-1 rounded-xl transition-all ${
                    item.highlight
                      ? 'bg-brand-accent/15 text-brand-primary dark:text-brand-accent'
                      : isActive
                      ? 'bg-slate-100 dark:bg-slate-800'
                      : ''
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="truncate max-w-[64px] leading-tight">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
