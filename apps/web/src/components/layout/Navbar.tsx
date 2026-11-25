import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Globe,
  Sun,
  Moon,
  PlusCircle,
  Store,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Headphones,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PayVoiceLogo } from '../common/PayVoiceLogo';
import { SupportedLanguage } from '../../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    merchant,
    activeShop,
    setActiveShopId,
    testVoiceAnnouncement,
    isSpeaking,
    isAudioUnlocked,
    unlockAudio,
    activePlan,
    setIsSimulateModalOpen,
  } = useApp();

  const location = useLocation();
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Shop Switcher */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2 focus:ring-0">
            <PayVoiceLogo size="md" />
          </Link>

          {/* Shop Switcher dropdown */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-navy dark:text-slate-200 transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-brand-accent" />
              <span className="max-w-[140px] truncate">{activeShop.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isShopMenuOpen && (
              <div
                className="absolute left-0 mt-1.5 w-64 bg-white dark:bg-brand-dark-card border border-slate-200 dark:border-slate-700 rounded-xl shadow-elevated p-2 z-50 text-xs"
                onClick={() => setIsShopMenuOpen(false)}
              >
                <div className="px-2 py-1 text-[11px] font-semibold text-brand-muted dark:text-slate-400 uppercase tracking-wider">
                  Select Active Counter
                </div>
                {merchant.shops.map((shop) => (
                  <button
                    key={shop.id}
                    type="button"
                    onClick={() => setActiveShopId(shop.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      activeShop.id === shop.id
                        ? 'bg-brand-primary/10 dark:bg-brand-accent/15 text-brand-primary dark:text-brand-accent font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-medium truncate">{shop.name}</p>
                      <p className="text-[10px] text-slate-400">{shop.city}, {shop.state}</p>
                    </div>
                    {shop.isPrimary && (
                      <span className="text-[9px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                        Primary
                      </span>
                    )}
                  </button>
                ))}

                {activePlan.id === 'free' && (
                  <Link
                    to="/premium"
                    className="mt-2 block border-t border-slate-100 dark:border-slate-800 pt-2 px-2 text-[11px] text-brand-accent font-semibold hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Add Multiple Outlets with Premium →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center / Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulate Payment Button */}
          <button
            type="button"
            onClick={() => setIsSimulateModalOpen(true)}
            className="flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg shadow-subtle transition-all active:scale-95"
            title="Simulate incoming UPI customer payment"
          >
            <PlusCircle className="w-3.5 h-3.5 text-brand-accent" />
            <span className="hidden sm:inline">{t.home.simulatePayment}</span>
            <span className="sm:hidden">Demo Pay</span>
          </button>

          {/* Test Voice Quick Button */}
          <button
            type="button"
            onClick={() => {
              unlockAudio();
              testVoiceAnnouncement();
            }}
            disabled={isSpeaking}
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all ${
              isSpeaking
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 animate-pulse'
                : isAudioUnlocked
                ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-primary dark:text-brand-accent hover:bg-brand-accent/20'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title="Preview instant payment announcement voice"
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce text-brand-accent" />
                <span className="hidden md:inline">{t.home.testingVoice}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-brand-accent" />
                <span className="hidden md:inline">{t.home.testVoiceBtn}</span>
              </>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-1.5 sm:px-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span className="font-semibold uppercase text-[11px]">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
            </button>

            {isLangMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-brand-dark-card border border-slate-200 dark:border-slate-700 rounded-xl shadow-elevated p-1 z-50 text-xs"
                onClick={() => setIsLangMenuOpen(false)}
              >
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      language === item.code
                        ? 'bg-brand-accent/15 text-brand-primary dark:text-brand-accent font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{item.native}</span>
                    <span className="text-[10px] text-slate-400 uppercase">{item.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Light / Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Desktop Premium Pill */}
          <Link
            to="/premium"
            className="hidden lg:flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-brand-accent/15 border border-brand-accent/30 text-amber-700 dark:text-amber-300 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span>{activePlan.id === 'free' ? 'Upgrade' : 'Business Pro'}</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open mobile navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-dark-surface p-4 shadow-elevated">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-brand-primary/10 text-slate-800 dark:text-slate-200"
            >
              🏠 {t.nav.home}
            </Link>
            <Link
              to="/transactions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-brand-primary/10 text-slate-800 dark:text-slate-200"
            >
              💳 {t.nav.transactions}
            </Link>
            <Link
              to="/play"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-brand-primary/10 text-slate-800 dark:text-slate-200"
            >
              🎮 {t.nav.play}
            </Link>
            <Link
              to="/voice-settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-brand-primary/10 text-slate-800 dark:text-slate-200"
            >
              📢 {t.nav.voiceSettings}
            </Link>
            <Link
              to="/reports"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-brand-primary/10 text-slate-800 dark:text-slate-200"
            >
              📊 {t.nav.reports}
            </Link>
            <Link
              to="/business"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-brand-primary/10 text-slate-800 dark:text-slate-200"
            >
              🏪 {t.nav.business}
            </Link>
            <Link
              to="/premium"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold"
            >
              ⭐ {t.nav.premium}
            </Link>
            <Link
              to="/admin-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              🛠️ {t.nav.adminDemo}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
