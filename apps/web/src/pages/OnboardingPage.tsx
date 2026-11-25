import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    merchant,
    activeShop,
    voiceSettings,
    updateVoiceSettings,
    unlockAudio,
    testVoiceAnnouncement,
    isSpeaking,
  } = useApp();

  const [step, setStep] = useState(1);
  const [shopName, setShopName] = useState(activeShop.name);
  const [ownerName, setOwnerName] = useState(merchant.fullName);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(voiceSettings.language);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
        <span>Step {step} of 3</span>
        <span>{step === 1 ? 'Store Setup' : step === 2 ? 'Voice Preferences' : 'Sound Test'}</span>
      </div>
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Step Container Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-subtle space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-accent">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-brand-navy dark:text-white">
                  Welcome to PayVoice Demo!
                </h2>
                <p className="text-xs text-brand-muted dark:text-slate-400">
                  Confirm your store identity for voice announcements.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Merchant / Owner Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white font-semibold"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-brand-dark-card rounded-xl text-[11px] text-slate-500">
                Paired Soundbox Serial: <strong className="font-mono text-brand-accent">{activeShop.soundBoxId}</strong> (West Bengal Network Node)
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-accent/20 text-brand-accent">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-brand-navy dark:text-white">
                  Announcement Language
                </h2>
                <p className="text-xs text-brand-muted dark:text-slate-400">
                  Which language should your counter speaker speak?
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { code: 'bn', title: 'বাংলা (Bengali)', desc: 'পেভয়েসে ১৫০ টাকা সফলভাবে প্রাপ্ত হয়েছে' },
                { code: 'hi', title: 'हिन्दी (Hindi)', desc: 'पेवॉइस पर ₹150 सफलतापूर्वक प्राप्त हुए' },
                { code: 'en', title: 'English (Indian)', desc: '₹150 received successfully on PayVoice' },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(item.code as SupportedLanguage);
                    updateVoiceSettings({ language: item.code as SupportedLanguage });
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    selectedLang === item.code
                      ? 'border-brand-primary bg-brand-primary/5 dark:border-brand-accent dark:bg-brand-accent/15'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs sm:text-sm text-brand-navy dark:text-white">
                      {item.title}
                    </span>
                    {selectedLang === item.code && <CheckCircle2 className="w-4 h-4 text-brand-accent" />}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">"{item.desc}"</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-accent/20 text-brand-accent mx-auto flex items-center justify-center animate-bounce">
              <Radio className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-lg font-black text-brand-navy dark:text-white">
                Test Your Speaker Sound
              </h2>
              <p className="text-xs text-brand-muted dark:text-slate-400 max-w-sm mx-auto mt-1">
                Tap below to unlock your browser's audio engine and verify the payment sound.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  unlockAudio();
                  testVoiceAnnouncement();
                }}
                disabled={isSpeaking}
                className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-subtle ${
                  isSpeaking
                    ? 'bg-amber-400 text-slate-950 animate-pulse'
                    : 'bg-brand-accent hover:bg-brand-accent-hover text-brand-navy shadow-glow-accent'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Speaking Alert...' : 'Tap to Test Voice Now'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-brand-navy"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-bold shadow-subtle"
          >
            <span>{step === 3 ? 'Go to Dashboard' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
