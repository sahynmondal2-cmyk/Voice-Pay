import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle2, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

export const PwaInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, hasUpdate, installSuccess, installApp, updateApp } = usePwaInstall();
  const [dismissed, setDismissed] = useState(false);

  // 1. Update Ready Banner (Highest priority)
  if (hasUpdate) {
    return (
      <div className="bg-gradient-to-r from-brand-primary to-emerald-700 text-white px-4 py-2.5 shadow-elevated border-b border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-brand-accent animate-spin" />
          <span className="font-semibold">
            A new version of PayVoice is ready with updated offline soundbox packs.
          </span>
        </div>
        <button
          type="button"
          onClick={updateApp}
          className="px-3 py-1 bg-brand-accent hover:bg-emerald-400 text-brand-navy font-bold rounded-lg transition-all shrink-0 active:scale-95"
        >
          Update Now
        </button>
      </div>
    );
  }

  // 2. Successful Install Toast
  if (installSuccess) {
    return (
      <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>PayVoice App successfully installed to your device! Enjoy full-screen soundbox alerts.</span>
      </div>
    );
  }

  // 3. Already in Standalone Mode (Show subtle indicator or hide)
  if (isInstalled) {
    return null; // App is already installed and running native-like
  }

  // 4. Installable Banner
  if (isInstallable && !dismissed) {
    return (
      <div className="bg-white dark:bg-brand-dark-surface border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-emerald-800 p-1.5 flex items-center justify-center shadow-xs shrink-0">
            <Smartphone className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-brand-navy dark:text-white">
                Install PayVoice App
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                PWA Standalone
              </span>
            </div>
            <p className="text-[11px] text-brand-muted dark:text-slate-400">
              Add to Home Screen for instant offline soundbox alerts without browser address bar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={installApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold shadow-subtle transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-brand-accent" />
            <span>Install App</span>
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
