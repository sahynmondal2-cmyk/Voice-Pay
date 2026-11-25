import React, { useState } from 'react';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoModeBanner: React.FC = () => {
  const { t } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Demo environment notice"
      className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 px-3 py-2 text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shadow-xs transition-colors"
    >
      <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
        <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider shrink-0">
          <ShieldAlert className="w-3 h-3" />
          {t.demoTag}
        </span>
        <p className="line-clamp-1 sm:line-clamp-none text-xs sm:text-sm">
          {t.demoModeBanner}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss demo banner"
        className="p-1 rounded hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
