import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Globe,
  ShieldCheck,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    userPreferences,
    updatePreferences,
    activePlan,
    t,
  } = useApp();

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          Application Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          Theme, language, accessibility, and transparent advertisement choices.
        </p>
      </div>

      {savedNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{t.common.saved}</span>
        </div>
      )}

      {/* 1. Theme Preferences */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>Visual Theme & Appearance</span>
        </h3>

        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              theme === 'light'
                ? 'border-brand-primary bg-brand-primary/5 dark:border-brand-accent dark:bg-brand-accent/15 text-brand-primary dark:text-brand-accent font-bold'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs">Light Theme</span>
            </div>
            {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-brand-accent" />}
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              theme === 'dark'
                ? 'border-brand-accent bg-brand-accent/15 text-brand-accent font-bold'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs">Dark Theme</span>
            </div>
            {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-brand-accent" />}
          </button>
        </div>
      </div>

      {/* 2. Language Preferences */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-accent" />
          <span>Interface Language</span>
        </h3>

        <div className="grid grid-cols-3 gap-3 max-w-lg">
          {[
            { code: 'en', label: 'English', sub: 'Default' },
            { code: 'bn', label: 'বাংলা (Bengali)', sub: 'West Bengal' },
            { code: 'hi', label: 'हिन्दी (Hindi)', sub: 'National' },
          ].map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code as SupportedLanguage)}
              className={`p-3 rounded-xl border text-left transition-all ${
                language === l.code
                  ? 'border-brand-primary bg-brand-primary/5 dark:border-brand-accent dark:bg-brand-accent/15 text-brand-primary dark:text-brand-accent font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <p className="text-xs font-bold">{l.label}</p>
              <p className="text-[10px] text-slate-400">{l.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Centralized Ad Preferences & Privacy Choices (Master Prompt Rule) */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>{t.ads.adPreferences} & Sponsorship Disclosure</span>
          </h3>

          {activePlan.id !== 'free' && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-accent/20 text-brand-primary dark:text-brand-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Ad-Free Active
            </span>
          )}
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs space-y-2">
          <p className="font-bold text-brand-navy dark:text-white">
            {t.ads.adDisclosureTitle}
          </p>
          <p className="text-brand-muted dark:text-slate-400 leading-relaxed text-[11px]">
            {t.ads.adDisclosureDesc}
          </p>
        </div>

        {/* Personalized Ads Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <p className="font-bold text-brand-navy dark:text-white">
              {t.ads.personalizationToggle}
            </p>
            <p className="text-[11px] text-brand-muted dark:text-slate-400 mt-0.5">
              {t.ads.personalizationDesc}
            </p>
          </div>
          <input
            type="checkbox"
            checked={userPreferences.personalizedAds}
            onChange={(e) => updatePreferences({ personalizedAds: e.target.checked })}
            className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Accessibility Preferences */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-brand-accent" />
          <span>Accessibility & Motion</span>
        </h3>

        <div className="space-y-3 text-xs">
          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-bold text-brand-navy dark:text-white">Reduced Motion Preference</p>
              <p className="text-[11px] text-brand-muted dark:text-slate-400">
                Disable wave bounces, pulse effects, and intense transitions.
              </p>
            </div>
            <input
              type="checkbox"
              checked={userPreferences.reducedMotion}
              onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
              className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-bold text-brand-navy dark:text-white">High Contrast UI Borders</p>
              <p className="text-[11px] text-brand-muted dark:text-slate-400">
                Sharpen boundaries for bright daylight shop counters.
              </p>
            </div>
            <input
              type="checkbox"
              checked={userPreferences.highContrast}
              onChange={(e) => updatePreferences({ highContrast: e.target.checked })}
              className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
