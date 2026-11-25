import {
  Merchant,
  Shop,
  DemoTransaction,
  SubscriptionPlan,
  DailyBrainSparkPuzzle,
  MemoryCard,
  WordPuzzleItem,
  AdPlacement,
  SupportTicket,
  VoiceSettings,
  UserPreferences,
  GameProgress
} from '../types';

export const INITIAL_MERCHANT: Merchant = {
  id: 'merch_wb_7821',
  fullName: 'Subhasis Chakraborty',
  phoneDemo: '+91 98300 ••••• (Demo)',
  emailDemo: 'subhasis.merchant@demo.payvoice.in',
  registeredAt: '2025-10-12T09:30:00Z',
  kycStatus: 'Verified (Demo)',
  bankAccountDemo: {
    bankName: 'State Bank of India (Demo)',
    accountNumberMasked: '•••• •••• 4519',
    ifscDemo: 'SBIN0001892',
  },
  tier: 'Free',
  shops: [
    {
      id: 'shop_01',
      name: 'Maa Tara Sweets & Daily Needs',
      category: 'Sweets & Confectionery',
      address: 'Shop 4, Garia Main Road',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700084',
      upiIdDemo: 'maatarasweets@demo-upi',
      soundBoxId: 'PV-KOL-9921',
      isPrimary: true,
    },
    {
      id: 'shop_02',
      name: 'PayVoice Station Tea & Snacks',
      category: 'Cafe & Quick Service',
      address: 'Platform 2 Exit, Howrah Station Road',
      city: 'Howrah',
      state: 'West Bengal',
      pincode: '711101',
      upiIdDemo: 'stationtea@demo-upi',
      soundBoxId: 'PV-HWH-4402',
      isPrimary: false,
    }
  ]
};

export const INITIAL_TRANSACTIONS: DemoTransaction[] = [
  {
    id: 'DEMO-TXN-884910',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
    amount: 150,
    status: 'Demo Successful',
    customerName: 'Aniket Sen',
    customerVpa: 'aniketsen***@demo-upi',
    method: 'UPI QR Demo',
    notes: '2 plate Sandesh & Tea',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884909',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    amount: 45,
    status: 'Demo Successful',
    customerName: 'Priya Banerjee',
    customerVpa: 'priya.b***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Special Mishti Doi',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884908',
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    amount: 520,
    status: 'Demo Successful',
    customerName: 'Rahul Sharma',
    customerVpa: 'rahul.sharma***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Gift Sweet Box 1kg',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884907',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    amount: 25,
    status: 'Demo Successful',
    customerName: 'Tanmay Das',
    customerVpa: 'tanmay99***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Singara & Mineral Water',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884906',
    timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    amount: 200,
    status: 'Demo Pending',
    customerName: 'Riya Mukherjee',
    customerVpa: 'riyamuk***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Awaiting bank confirmation demo',
    shopId: 'shop_01',
    voiceAnnounced: false,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884905',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    amount: 350,
    status: 'Demo Successful',
    customerName: 'Bikash Roy',
    customerVpa: 'bikash.roy***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Rasgulla 1 can',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884904',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    amount: 80,
    status: 'Demo Failed',
    customerName: 'Amitava Ghosh',
    customerVpa: 'amitava***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Customer bank timeout simulated',
    shopId: 'shop_01',
    voiceAnnounced: false,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884903',
    timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
    amount: 1100,
    status: 'Demo Successful',
    customerName: 'Sanchari Dutta',
    customerVpa: 'sanchari.d***@demo-upi',
    method: 'Card Demo',
    notes: 'Family festival pack',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884902',
    timestamp: new Date(Date.now() - 1000 * 60 * 410).toISOString(),
    amount: 90,
    status: 'Demo Reversed',
    customerName: 'Debabrata Pal',
    customerVpa: 'debupal***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Simulated reversal duplicate tap',
    shopId: 'shop_01',
    voiceAnnounced: false,
    isDemo: true,
  },
  {
    id: 'DEMO-TXN-884901',
    timestamp: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    amount: 30,
    status: 'Demo Successful',
    customerName: 'Suman Mondal',
    customerVpa: 'suman.m***@demo-upi',
    method: 'UPI QR Demo',
    notes: 'Masala Chai & Biscuit',
    shopId: 'shop_01',
    voiceAnnounced: true,
    isDemo: true,
  }
];

export const INITIAL_VOICE_SETTINGS: VoiceSettings = {
  language: 'en',
  speechRate: 1.0,
  volume: 1.0,
  soundChime: 'bell-high',
  audioFormatAnnouncement: '₹{amount} received on PayVoice Demo',
  hapticFeedback: true,
  announcePayerName: true,
};

export const INITIAL_PREFERENCES: UserPreferences = {
  theme: 'light',
  language: 'en',
  personalizedAds: true,
  soundEnabled: true,
  reducedMotion: false,
  highContrast: false,
  offlineBannerDismissed: false,
};

export const INITIAL_GAME_PROGRESS: GameProgress = {
  badges: [
    {
      id: 'puzzle_starter',
      title: 'Puzzle Starter',
      description: 'Completed your first PayVoice brain spark puzzle.',
      unlockedAt: new Date(Date.now() - 1000 * 3600 * 24 * 2).toISOString(),
      icon: 'sparkles',
    },
    {
      id: 'streak_3day',
      title: '3-Day Practice',
      description: 'Maintained a positive mental exercise habit for 3 days.',
      unlockedAt: new Date(Date.now() - 1000 * 3600 * 24).toISOString(),
      icon: 'flame',
    }
  ],
  brainSparkCompletedDates: ['2026-11-23', '2026-11-24'],
  currentStreak: 3,
  bestStreak: 5,
  memoryMatchBestMoves: 14,
  memoryMatchBestTimeSeconds: 42,
  wordsSolvedCount: 8,
  reflexBestTimeMs: 285,
  lastPlayedAt: new Date().toISOString(),
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'PayVoice Free',
    price: 0,
    billingCycle: 'free',
    priceDisplay: '₹0',
    isDemo: true,
    features: [
      { title: 'Instant Voice Payment Alerts', description: 'Web audio speech in Bengali, Hindi, and English', included: true },
      { title: 'Single Counter Sound Box', description: '1 primary store location', included: true },
      { title: 'Standard Daily Reports', description: '24-hour collection summaries', included: true },
      { title: 'PayVoice Play Access', description: 'Brain teasers and shopkeeper games', included: true },
      { title: 'Multi-Shop Management', description: 'Switch across multiple shop branches', included: false },
      { title: 'Staff Sound Receivers', description: 'Counter staff audio devices', included: false },
      { title: 'CSV Data Export', description: 'Export tax and accountant spreadsheets', included: false },
      { title: 'Ad-Free Interface', description: 'Completely remove merchant partner banners', included: false },
    ]
  },
  {
    id: 'premium_monthly',
    name: 'Business Premium (Monthly)',
    price: 49,
    billingCycle: 'monthly',
    priceDisplay: '₹49/month',
    tag: 'Popular',
    isDemo: true,
    features: [
      { title: 'Instant Voice Payment Alerts', description: 'Web audio speech in Bengali, Hindi, and English', included: true },
      { title: 'Multiple Shops & Branches', description: 'Manage up to 10 retail outlets seamlessly', included: true },
      { title: 'Staff Voice Access', description: 'Invite counter staff with sound-only permissions', included: true },
      { title: 'Unlimited CSV & Excel Export', description: 'One-click export for CA, GST, and bookkeeping', included: true },
      { title: '100% Ad-Free Experience', description: 'Clean interface with zero sponsored partner cards', included: true },
      { title: 'Custom Voice & Dialect Tuning', description: 'Speed tuning, custom prefix announcements', included: true },
      { title: 'Priority WhatsApp Support', description: 'Direct assistance for shop audio hardware', included: true },
    ]
  },
  {
    id: 'premium_yearly',
    name: 'Business Premium (Yearly)',
    price: 499,
    billingCycle: 'yearly',
    priceDisplay: '₹499/year',
    tag: 'Save 15%',
    isDemo: true,
    features: [
      { title: 'All Business Premium Features', description: 'Every feature from the monthly plan included', included: true },
      { title: '2 Months Free Savings', description: 'Pay ₹499 instead of ₹588 per year', included: true },
      { title: 'Multi-Branch Analytics', description: 'Consolidated view of revenue across stores', included: true },
      { title: 'Hardware Warranty Protection Demo', description: 'Priority replacement cover for soundbox', included: true },
    ]
  }
];

export const DEMO_AD_PLACEMENTS: Record<string, AdPlacement> = {
  home_feed: {
    placementId: 'home_feed',
    sponsorName: 'Bengal Wholesale Mart',
    headline: 'Bulk Grocery & FMCG Delivery in 24 Hours',
    description: 'Special wholesale rates for West Bengal kirana & sweet shops. Free delivery on orders over ₹2,000.',
    ctaText: 'View Wholesale Catalog (Demo)',
    ctaUrl: '#ad-catalog-demo',
    badgeLabel: 'Sponsored Demo',
    category: 'supplies',
  },
  business_tips: {
    placementId: 'business_tips',
    sponsorName: 'Kolkata Merchant Supplies',
    headline: 'Eco-Friendly Paper Bags & Bio-Packaging',
    description: 'Certified biodegradable sweet boxes & delivery carriers customized with your shop branding.',
    ctaText: 'Explore Packaging Options (Demo)',
    ctaUrl: '#ad-packaging-demo',
    badgeLabel: 'Promoted Placeholder',
    category: 'inventory',
  },
  play_hub: {
    placementId: 'play_hub',
    sponsorName: 'QuickLogistics Express',
    headline: 'Local Delivery Fleet for Retail Counters',
    description: 'Dispatch customer sweet boxes across Kolkata within 60 minutes with live GPS tracking.',
    ctaText: 'Learn More (Demo)',
    ctaUrl: '#ad-logistics-demo',
    badgeLabel: 'Sponsored Demo',
    category: 'logistics',
  },
  discover_offers: {
    placementId: 'discover_offers',
    sponsorName: 'SmartPOS Billing Software',
    headline: 'Simple GST Billing for Small Retailers',
    description: 'Generate thermal receipts & automatic stock tracking without expensive computers.',
    ctaText: 'Try Free Trial (Demo)',
    ctaUrl: '#ad-pos-demo',
    badgeLabel: 'Promoted Placeholder',
    category: 'business-software',
  }
};

export const DAILY_PUZZLES: DailyBrainSparkPuzzle[] = [
  {
    id: 'spark_01',
    dateKey: '2026-11-25',
    title: {
      en: 'The Shopkeeper’s Change Riddle',
      bn: 'দোকানদারের খুচরো টাকার ধাঁধা',
      hi: 'दुकानदार की छुट्टे पैसों की पहेली'
    },
    question: {
      en: 'A customer buys ₹35 of sweets and pays with a ₹100 note. You don’t have exact change, so you get change for ₹100 from the neighboring tea stall. You give the customer ₹65 change. Later, the tea stall says the note was fake! If you return ₹100 to the neighbor, what is your net cash loss (excluding the sweets)?',
      bn: 'একজন ক্রেতা ৩৫ টাকার মিষ্টি কিনে ১০০ টাকার নোট দিল। আপনার কাছে খুচরো না থাকায় পাশের চায়ের দোকান থেকে ১০০ টাকা ভাঙিয়ে ক্রেতাকে ৬৫ টাকা দিলেন। পরে চায়ের দোকানদার জানাল নোটটি জাল ছিল! আপনি তাকে আসল ১০০ টাকা ফেরত দিলেন। মিষ্টির দাম বাদ দিয়ে নগদ টাকার নিট ক্ষতি কত?',
      hi: 'एक ग्राहक ₹35 की मिठाई लेता है और ₹100 का नोट देता है। आपके पास छुट्टे नहीं हैं, तो आप पड़ोसी चाय वाले से ₹100 का छुट्टा लेते हैं और ग्राहक को ₹65 लौटाते हैं। बाद में पता चलता है कि नोट नकली था! यदि आप पड़ोसी को ₹100 लौटाते हैं, तो मिठाई को छोड़कर आपका शुद्ध नकदी नुकसान कितना है?'
    },
    options: [
      { id: 'opt_1', text: { en: '₹65', bn: '৬৫ টাকা', hi: '₹65' } },
      { id: 'opt_2', text: { en: '₹100', bn: '১০০ টাকা', hi: '₹100' } },
      { id: 'opt_3', text: { en: '₹135', bn: '১৩৫ টাকা', hi: '₹135' } },
      { id: 'opt_4', text: { en: '₹165', bn: '১৬৫ টাকা', hi: '₹165' } }
    ],
    correctOptionId: 'opt_1',
    hint: {
      en: 'The neighboring tea stall transaction is neutral: they gave ₹100 change and received ₹100 back.',
      bn: 'পাশের চায়ের দোকানের সাথে লেনদেন শূন্য সমান: সে ১০০ টাকার খুচরো দিয়েছিল এবং ১০০ টাকা ফেরত পেয়েছে।',
      hi: 'पड़ोसी चाय वाले के साथ हिसाब बराबर है: उसने ₹100 दिए और वापस ₹100 लिए।'
    },
    explanation: {
      en: 'Correct! The neighbor broke even (gave ₹100, got ₹100 back). The fraudster walked away with ₹65 cash plus the sweets. Hence, your net cash loss is exactly ₹65.',
      bn: 'সঠিক! চায়ের দোকানি ১০০ টাকা দিয়ে ১০০ টাকা ফেরত পেয়ে সমান। প্রতারক ৬৫ টাকা নগদ ও মিষ্টি নিয়ে গেছে। ফলে নগদ ক্ষতি ৬৫ টাকা।',
      hi: 'बिल्कुल सही! पड़ोसी का हिसाब बराबर रहा। धोखेबाज ग्राहक ₹65 नकद और मिठाई लेकर चला गया। इसलिए शुद्ध नकद नुकसान ₹65 है।'
    }
  },
  {
    id: 'spark_02',
    dateKey: '2026-11-26',
    title: {
      en: 'Pattern Sequence Challenge',
      bn: 'সংখ্যা ক্রমের ধাঁধা',
      hi: 'संख्या अनुक्रम चुनौती'
    },
    question: {
      en: 'Find the next number in the daily sales sequence: 12, 24, 48, 96, ?',
      bn: 'বিক্রির ক্রমের পরবর্তী সংখ্যাটি কত: ১২, ২৪, ৪৮, ৯৬, ?',
      hi: 'बिक्री अनुक्रम की अगली संख्या ज्ञात करें: 12, 24, 48, 96, ?'
    },
    options: [
      { id: 'opt_1', text: { en: '144', bn: '১৪৪', hi: '144' } },
      { id: 'opt_2', text: { en: '192', bn: '১৯২', hi: '192' } },
      { id: 'opt_3', text: { en: '168', bn: '১৬৮', hi: '168' } },
      { id: 'opt_4', text: { en: '210', bn: '২১০', hi: '210' } }
    ],
    correctOptionId: 'opt_2',
    hint: {
      en: 'Notice that each number doubles the previous one (x2).',
      bn: 'লক্ষ্য করুন প্রতিটি সংখ্যা পূর্ববর্তী সংখ্যার দ্বিগুণ (×২)।',
      hi: 'ध्यान दें कि प्रत्येक संख्या पिछली संख्या की दोगुनी है (×2)।'
    },
    explanation: {
      en: '96 x 2 = 192. Perfect doubling pattern calculation!',
      bn: '৯৬ × ২ = ১৯২। চমৎকার দ্বিগুণ করার হিসাব!',
      hi: '96 x 2 = 192. सटीक गणना!'
    }
  }
];

export const MEMORY_CARDS_DATA: MemoryCard[] = [
  { id: 'm1', matchKey: 'chai', label: { en: 'Chai Cup', bn: 'চায়ের কাপ', hi: 'चाय कप' }, iconName: 'coffee', symbol: '☕' },
  { id: 'm2', matchKey: 'sweet', label: { en: 'Sweet Box', bn: 'মিষ্টির বাক্স', hi: 'मिठाई बॉक्स' }, iconName: 'package', symbol: '🍬' },
  { id: 'm3', matchKey: 'qr', label: { en: 'Sound Box', bn: 'সাউন্ড বক্স', hi: 'साउंड बॉक्स' }, iconName: 'volume-2', symbol: '📢' },
  { id: 'm4', matchKey: 'rupee', label: { en: 'Rupee Coin', bn: 'টাকার মুদ্রা', hi: 'रुपया सिक्का' }, iconName: 'circle-dollar-sign', symbol: '🪙' },
  { id: 'm5', matchKey: 'store', label: { en: 'Shop Front', bn: 'দোকান ঘর', hi: 'दुकान' }, iconName: 'store', symbol: '🏪' },
  { id: 'm6', matchKey: 'receipt', label: { en: 'Bill Receipt', bn: 'ক্যাশ মেমো', hi: 'बिल पर्ची' }, iconName: 'receipt', symbol: '🧾' },
  { id: 'm7', matchKey: 'bell', label: { en: 'Alert Bell', bn: 'ঘণ্টির শব্দ', hi: 'घंटी' }, iconName: 'bell', symbol: '🔔' },
  { id: 'm8', matchKey: 'shield', label: { en: 'Safe Shield', bn: 'সুরক্ষা শিল্ড', hi: 'सुरक्षा' }, iconName: 'shield-check', symbol: '🛡️' }
];

export const WORD_PUZZLE_ITEMS: WordPuzzleItem[] = [
  // English words
  {
    id: 'w_en_1',
    language: 'en',
    targetWord: 'PAYMENT',
    scrambledLetters: ['Y', 'A', 'P', 'M', 'E', 'N', 'T'],
    hint: 'Money transferred for goods or services.',
    meaning: 'The act of paying or being paid.',
    category: 'Commerce'
  },
  {
    id: 'w_en_2',
    language: 'en',
    targetWord: 'VOICE',
    scrambledLetters: ['C', 'I', 'E', 'O', 'V'],
    hint: 'What the soundbox uses to announce transactions aloud.',
    meaning: 'Sound produced by speech or synthesis.',
    category: 'Technology'
  },
  {
    id: 'w_en_3',
    language: 'en',
    targetWord: 'MARKET',
    scrambledLetters: ['R', 'A', 'M', 'T', 'E', 'K'],
    hint: 'A bustling area where shopkeepers sell daily goods.',
    meaning: 'A gathering of people for the purchase and sale of provisions.',
    category: 'Business'
  },
  // Bengali words (represented in syllables / characters for clean UI)
  {
    id: 'w_bn_1',
    language: 'bn',
    targetWord: 'পেমেন্ট',
    scrambledLetters: ['মে', 'পে', 'ন্ট'],
    hint: 'লেনদেনের মাধ্যমে টাকা পরিশোধের কাজ।',
    meaning: 'অর্থ প্রদানের আধুনিক প্রক্রিয়া।',
    category: 'লেনদেন'
  },
  {
    id: 'w_bn_2',
    language: 'bn',
    targetWord: 'দোকান',
    scrambledLetters: ['কা', 'দো', 'ন'],
    hint: 'যেখানে পণ্য ও সামগ্রী কেনাবেচা হয়।',
    meaning: 'ব্যবসায়িক প্রতিষ্ঠান বা বিপণি।',
    category: 'ব্যবসা'
  },
  {
    id: 'w_bn_3',
    language: 'bn',
    targetWord: 'ধ্বনি',
    scrambledLetters: ['নি', 'ধ্ব'],
    hint: 'যা আমরা কানে শুনি, শব্দের তরঙ্গ।',
    meaning: 'কণ্ঠস্বর বা আওয়াজ।',
    category: 'প্রযুক্তি'
  },
  // Hindi words
  {
    id: 'w_hi_1',
    language: 'hi',
    targetWord: 'पेमेंट',
    scrambledLetters: ['में', 'पे', 'ट'],
    hint: 'सामान के बदले डिजिटल पैसे देना।',
    meaning: 'भुगतान की प्रक्रिया।',
    category: 'लेनदेन'
  },
  {
    id: 'w_hi_2',
    language: 'hi',
    targetWord: 'व्यापार',
    scrambledLetters: ['पा', 'व्या', 'र'],
    hint: 'वस्तुओं का क्रय-विक्रय व दुकानदारी।',
    meaning: 'कारोबार या व्यवसाय।',
    category: 'बिजनेस'
  },
  {
    id: 'w_hi_3',
    language: 'hi',
    targetWord: 'आवाज़',
    scrambledLetters: ['वा', 'आ', 'ज़'],
    hint: 'साउंड बॉक्स से निकलने वाली मधुर ध्वनि।',
    meaning: 'कंठ या स्पीकर से उत्पन्न ध्वनि।',
    category: 'तकनीक'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-4029',
    subject: 'Sound chime volume on noisy market days',
    category: 'sound',
    status: 'Resolved (Demo)',
    createdAt: '2026-11-20T14:10:00Z',
    message: 'Can I increase the volume beyond default when traffic noise is high outside the shop?',
    replies: [
      {
        author: 'PayVoice Support (Demo)',
        timestamp: '2026-11-20T14:25:00Z',
        text: 'Hello Subhasis ji! In PayVoice Voice Settings, you can set the volume slider to 100% and choose the Fintech Dual-Tone Chime which cuts through street noise clearly.',
        isStaff: true
      }
    ]
  },
  {
    id: 'TICK-4030',
    subject: 'Multi-shop staff pairing question',
    category: 'hardware',
    status: 'In Progress',
    createdAt: '2026-11-24T10:00:00Z',
    message: 'How can my brother at the Howrah station stall hear payments while I am at the Garia shop?',
    replies: [
      {
        author: 'PayVoice Support (Demo)',
        timestamp: '2026-11-24T11:15:00Z',
        text: 'PayVoice Business Premium includes staff voice accounts where each phone acts as a dedicated audio receiver for your linked branches.',
        isStaff: true
      }
    ]
  }
];
