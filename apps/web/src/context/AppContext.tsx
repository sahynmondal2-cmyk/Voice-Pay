import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  DemoTransaction,
  Merchant,
  Shop,
  SupportedLanguage,
  VoiceSettings,
  UserPreferences,
  GameProgress,
  SubscriptionPlan,
  SupportTicket,
} from '../types';
import {
  INITIAL_MERCHANT,
  INITIAL_TRANSACTIONS,
  INITIAL_VOICE_SETTINGS,
  INITIAL_PREFERENCES,
  INITIAL_GAME_PROGRESS,
  SUBSCRIPTION_PLANS,
  INITIAL_SUPPORT_TICKETS,
} from '../data/demoData';
import { en } from '../locales/en';
import { bn } from '../locales/bn';
import { hi } from '../locales/hi';
import { audioService } from '../services/audioService';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: typeof en;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  merchant: Merchant;
  activeShop: Shop;
  setActiveShopId: (id: string) => void;
  transactions: DemoTransaction[];
  addTransaction: (data: {
    amount: number;
    customerName: string;
    customerVpa?: string;
    notes?: string;
  }) => DemoTransaction;
  replayTransactionVoice: (id: string) => Promise<void>;
  voiceSettings: VoiceSettings;
  updateVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  isAudioUnlocked: boolean;
  unlockAudio: () => boolean;
  isSpeaking: boolean;
  testVoiceAnnouncement: (customText?: string) => Promise<void>;
  userPreferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  gameProgress: GameProgress;
  updateGameProgress: (updater: (prev: GameProgress) => GameProgress) => void;
  activePlan: SubscriptionPlan;
  upgradePlan: (planId: SubscriptionPlan['id']) => void;
  supportTickets: SupportTicket[];
  addSupportTicket: (subject: string, category: SupportTicket['category'], message: string) => void;
  isSimulateModalOpen: boolean;
  setIsSimulateModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PREFS: 'payvoice_preferences_v1',
  VOICE: 'payvoice_voice_v1',
  TXNS: 'payvoice_transactions_v1',
  MERCHANT: 'payvoice_merchant_v1',
  GAME: 'payvoice_game_progress_v1',
  PLAN: 'payvoice_plan_v1',
  TICKETS: 'payvoice_tickets_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language & Dictionary
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PREFS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.language) return parsed.language;
      }
    } catch {}
    return 'en';
  });

  const t = language === 'bn' ? bn : language === 'hi' ? hi : en;

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    setVoiceSettings((prev) => ({ ...prev, language: lang }));
    setUserPreferences((prev) => {
      const updated = { ...prev, language: lang };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.PREFS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 2. Theme State
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PREFS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme === 'dark' || parsed.theme === 'light') return parsed.theme;
      }
    } catch {}
    return 'light';
  });

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    setUserPreferences((prev) => {
      const updated = { ...prev, theme: newTheme };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.PREFS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // 3. User Preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PREFS);
      if (saved) return { ...INITIAL_PREFERENCES, ...JSON.parse(saved) };
    } catch {}
    return INITIAL_PREFERENCES;
  });

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences((prev) => {
      const updated = { ...prev, ...prefs };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.PREFS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 4. Voice Settings
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.VOICE);
      if (saved) return { ...INITIAL_VOICE_SETTINGS, ...JSON.parse(saved) };
    } catch {}
    return INITIAL_VOICE_SETTINGS;
  });

  const updateVoiceSettings = (settings: Partial<VoiceSettings>) => {
    setVoiceSettings((prev) => {
      const updated = { ...prev, ...settings };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.VOICE, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 5. Merchant & Active Shop
  const [merchant, setMerchant] = useState<Merchant>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.MERCHANT);
      if (saved) return { ...INITIAL_MERCHANT, ...JSON.parse(saved) };
    } catch {}
    return INITIAL_MERCHANT;
  });

  const [activeShopId, setActiveShopId] = useState<string>(() => {
    return merchant.shops.find((s) => s.isPrimary)?.id || merchant.shops[0]?.id || 'shop_01';
  });

  const activeShop = merchant.shops.find((s) => s.id === activeShopId) || merchant.shops[0];

  // 6. Transactions
  const [transactions, setTransactions] = useState<DemoTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TXNS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TRANSACTIONS;
  });

  // 7. Audio State
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const unlockAudio = useCallback(() => {
    const unlocked = audioService.unlockAudio();
    setIsAudioUnlocked(unlocked);
    return unlocked;
  }, []);

  const testVoiceAnnouncement = async (customText?: string) => {
    setIsSpeaking(true);
    unlockAudio();
    try {
      if (customText) {
        await audioService.playChime(voiceSettings.soundChime, voiceSettings.volume);
        await audioService.speakText(
          customText,
          voiceSettings.language,
          voiceSettings.speechRate,
          voiceSettings.volume
        );
      } else {
        await audioService.announcePayment(
          150,
          voiceSettings,
          voiceSettings.announcePayerName ? 'Priya' : undefined
        );
      }
    } finally {
      setIsSpeaking(false);
    }
  };

  const replayTransactionVoice = async (id: string) => {
    const txn = transactions.find((t) => t.id === id);
    if (!txn) return;
    setIsSpeaking(true);
    unlockAudio();
    try {
      await audioService.announcePayment(
        txn.amount,
        voiceSettings,
        txn.customerName
      );
    } finally {
      setIsSpeaking(false);
    }
  };

  // 8. Add Simulated Transaction
  const addTransaction = (data: {
    amount: number;
    customerName: string;
    customerVpa?: string;
    notes?: string;
  }): DemoTransaction => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newTxn: DemoTransaction = {
      id: `DEMO-TXN-${randomSuffix}`,
      timestamp: new Date().toISOString(),
      amount: data.amount,
      status: 'Demo Successful',
      customerName: data.customerName || 'Demo Customer',
      customerVpa: data.customerVpa || `${data.customerName.toLowerCase().replace(/\s+/g, '')}***@demo-upi`,
      method: 'UPI QR Demo',
      notes: data.notes || 'Instant Demo Counter Payment',
      shopId: activeShop.id,
      voiceAnnounced: true,
      isDemo: true,
    };

    setTransactions((prev) => {
      const updated = [newTxn, ...prev];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TXNS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Speak aloud immediately
    audioService.announcePayment(
      newTxn.amount,
      voiceSettings,
      newTxn.customerName
    ).catch(() => {});

    return newTxn;
  };

  // 9. Game Progress
  const [gameProgress, setGameProgressState] = useState<GameProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.GAME);
      if (saved) return { ...INITIAL_GAME_PROGRESS, ...JSON.parse(saved) };
    } catch {}
    return INITIAL_GAME_PROGRESS;
  });

  const updateGameProgress = (updater: (prev: GameProgress) => GameProgress) => {
    setGameProgressState((prev) => {
      const updated = updater(prev);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.GAME, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 10. Subscription / Plan
  const [activePlanId, setActivePlanId] = useState<SubscriptionPlan['id']>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PLAN);
      if (saved) return saved as SubscriptionPlan['id'];
    } catch {}
    return 'free';
  });

  const activePlan = SUBSCRIPTION_PLANS.find((p) => p.id === activePlanId) || SUBSCRIPTION_PLANS[0];

  const upgradePlan = (planId: SubscriptionPlan['id']) => {
    setActivePlanId(planId);
    setMerchant((prev) => {
      const updated: Merchant = {
        ...prev,
        tier: planId === 'free' ? 'Free' : 'Business Premium Demo',
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.PLAN, planId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.MERCHANT, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 11. Support Tickets
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SUPPORT_TICKETS;
  });

  const addSupportTicket = (
    subject: string,
    category: SupportTicket['category'],
    message: string
  ) => {
    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(4000 + Math.random() * 999)}`,
      subject,
      category,
      status: 'Open',
      createdAt: new Date().toISOString(),
      message,
      replies: [
        {
          author: 'PayVoice Automated Bot (Demo)',
          timestamp: new Date().toISOString(),
          text: 'Thank you for reaching out! A simulated support engineer will review your inquiry shortly.',
          isStaff: true,
        },
      ],
    };
    setSupportTickets((prev) => {
      const updated = [newTicket, ...prev];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TICKETS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 12. Simulate Payment Modal State
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        toggleTheme,
        merchant,
        activeShop,
        setActiveShopId,
        transactions,
        addTransaction,
        replayTransactionVoice,
        voiceSettings,
        updateVoiceSettings,
        isAudioUnlocked,
        unlockAudio,
        isSpeaking,
        testVoiceAnnouncement,
        userPreferences,
        updatePreferences,
        gameProgress,
        updateGameProgress,
        activePlan,
        upgradePlan,
        supportTickets,
        addSupportTicket,
        isSimulateModalOpen,
        setIsSimulateModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
