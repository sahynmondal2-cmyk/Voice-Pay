/**
 * PayVoice Shared Domain Models & Types
 * Strictly for demo and UI architecture purposes.
 * All financial references are artificial and marked Demo.
 */

export type SupportedLanguage = 'en' | 'bn' | 'hi';

export type TransactionStatus =
  | 'Demo Successful'
  | 'Demo Pending'
  | 'Demo Failed'
  | 'Demo Reversed';

export type PaymentMethod =
  | 'UPI QR Demo'
  | 'Card Demo'
  | 'NetBanking Demo'
  | 'Wallet Demo';

export interface DemoTransaction {
  id: string; // Artificial demo reference e.g. "DEMO-TXN-883921"
  timestamp: string; // ISO string
  amount: number; // In INR (₹)
  status: TransactionStatus;
  customerName: string;
  customerVpa: string; // Artificial masked VPA e.g. "rohit***@demo-upi"
  method: PaymentMethod;
  notes?: string;
  shopId: string;
  voiceAnnounced: boolean;
  isDemo: true;
}

export interface Shop {
  id: string;
  name: string;
  category: string; // e.g., "Grocery & Daily Needs", "Tea Stall", "Stationery"
  address: string;
  city: string;
  state: string; // Default: West Bengal
  pincode: string;
  upiIdDemo: string; // "payvoice.demo@bank"
  soundBoxId: string; // "PV-BOX-7729"
  isPrimary: boolean;
}

export interface Merchant {
  id: string;
  fullName: string;
  phoneDemo: string; // Masked demo "+91 98300 •••••"
  emailDemo: string; // "merchant@example.com"
  registeredAt: string;
  kycStatus: 'Verified (Demo)' | 'Pending (Demo)';
  bankAccountDemo: {
    bankName: string;
    accountNumberMasked: string; // "•••• •••• 4519"
    ifscDemo: string; // "DEMOB000123"
  };
  shops: Shop[];
  tier: 'Free' | 'Business Premium Demo';
}

export interface VoiceSettings {
  language: SupportedLanguage;
  speechRate: number; // 0.8 to 1.3, default 1.0
  volume: number; // 0.0 to 1.0, default 1.0
  soundChime: 'bell-high' | 'modern-chime' | 'soft-ding' | 'none';
  audioFormatAnnouncement: string; // e.g. "₹{amount} received on PayVoice Demo"
  speechVoiceName?: string;
  hapticFeedback: boolean;
  announcePayerName: boolean;
}

export interface AdPlacement {
  placementId: 'home_feed' | 'business_tips' | 'play_hub' | 'discover_offers';
  sponsorName: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string; // Always internal or demo safe target
  badgeLabel: 'Sponsored Demo' | 'Promoted Placeholder';
  category: 'business-software' | 'logistics' | 'inventory' | 'supplies';
}

export interface SubscriptionPlan {
  id: 'free' | 'premium_monthly' | 'premium_yearly';
  name: string;
  price: number; // 0, 49, 499
  billingCycle: 'free' | 'monthly' | 'yearly';
  priceDisplay: string; // "₹0", "₹49/month", "₹499/year"
  isDemo: true;
  features: {
    title: string;
    description: string;
    included: boolean;
  }[];
  tag?: string;
}

export interface DailyBrainSparkPuzzle {
  id: string;
  dateKey: string; // YYYY-MM-DD
  title: Record<SupportedLanguage, string>;
  question: Record<SupportedLanguage, string>;
  options: {
    id: string;
    text: Record<SupportedLanguage, string>;
  }[];
  correctOptionId: string;
  hint: Record<SupportedLanguage, string>;
  explanation: Record<SupportedLanguage, string>;
}

export interface MemoryCard {
  id: string;
  matchKey: string;
  label: Record<SupportedLanguage, string>;
  iconName: string;
  symbol: string; // Accessible non-color identifier
}

export interface WordPuzzleItem {
  id: string;
  language: SupportedLanguage;
  targetWord: string;
  scrambledLetters: string[];
  hint: string;
  meaning: string;
  category: string;
}

export interface GameProgress {
  badges: {
    id: string;
    title: string;
    description: string;
    unlockedAt: string;
    icon: string;
  }[];
  brainSparkCompletedDates: string[]; // YYYY-MM-DD
  currentStreak: number;
  bestStreak: number;
  memoryMatchBestMoves: number | null;
  memoryMatchBestTimeSeconds: number | null;
  wordsSolvedCount: number;
  reflexBestTimeMs: number | null;
  lastPlayedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: SupportedLanguage;
  personalizedAds: boolean; // toggle in Ad Preferences
  soundEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  offlineBannerDismissed?: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'sound' | 'transaction' | 'hardware' | 'billing' | 'other';
  status: 'Open' | 'In Progress' | 'Resolved (Demo)';
  createdAt: string;
  message: string;
  replies: {
    author: string;
    timestamp: string;
    text: string;
    isStaff: boolean;
  }[];
}

export interface DailyReportSummary {
  date: string;
  totalAmount: number;
  transactionCount: number;
  successCount: number;
  failedCount: number;
  pendingCount: number;
  hourlyBreakdown: {
    hour: string;
    amount: number;
    count: number;
  }[];
}
