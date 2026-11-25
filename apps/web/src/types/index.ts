/**
 * PayVoice Domain Models & Types - Phase 2
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

export type TransactionDirection = 'incoming' | 'outgoing';

export interface DemoTransaction {
  id: string; // Artificial demo reference e.g. "DEMO-TXN-883921"
  timestamp: string; // ISO string
  amount: number; // In INR (₹)
  status: TransactionStatus;
  direction: TransactionDirection; // 'incoming' = received, 'outgoing' = sent
  customerName: string; // Sender if incoming, Recipient if outgoing
  senderName?: string;
  recipientName?: string;
  customerVpa: string; // Masked VPA e.g. "priya***@demo-upi"
  method: PaymentMethod;
  notes?: string;
  shopId: string;
  voiceAnnounced: boolean;
  isDemo: true;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  upiIdDemo: string;
  soundBoxId: string;
  isPrimary: boolean;
}

export interface Merchant {
  id: string;
  fullName: string;
  phoneDemo: string;
  emailDemo: string;
  registeredAt: string;
  kycStatus: 'Verified (Demo)' | 'Pending (Demo)';
  bankAccountDemo: {
    bankName: string;
    accountNumberMasked: string;
    ifscDemo: string;
  };
  shops: Shop[];
  tier: 'Free' | 'Business Premium Demo';
}

export interface VoiceSettings {
  language: SupportedLanguage;
  speechRate: number; // 0.7 to 1.3, default 1.0
  volume: number; // 0.1 to 1.0, default 1.0
  soundChime: 'bell-high' | 'modern-chime' | 'soft-ding' | 'none';
  audioFormatAnnouncement: string;
  speechVoiceName?: string;
  hapticFeedback: boolean;
  announcePayerName: boolean;
  incomingVoiceEnabled: boolean; // Phase 2: incoming voice ON/OFF
  outgoingVoiceEnabled: boolean; // Phase 2: outgoing voice ON/OFF
}

export interface AdPlacement {
  placementId: 'home_feed' | 'business_tips' | 'play_hub' | 'discover_offers';
  sponsorName: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  badgeLabel: 'Sponsored Demo' | 'Promoted Placeholder';
  category: 'business-software' | 'logistics' | 'inventory' | 'supplies';
}

export interface SubscriptionPlan {
  id: 'free' | 'premium_monthly' | 'premium_yearly';
  name: string;
  price: number;
  billingCycle: 'free' | 'monthly' | 'yearly';
  priceDisplay: string;
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
  dateKey: string;
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
  symbol: string;
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
  brainSparkCompletedDates: string[];
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
  personalizedAds: boolean;
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

export interface VoiceAvailabilityStatus {
  hasBengaliVoice: boolean;
  bengaliVoiceName?: string;
  hasHindiVoice: boolean;
  hindiVoiceName?: string;
  hasEnglishVoice: boolean;
  englishVoiceName?: string;
}
