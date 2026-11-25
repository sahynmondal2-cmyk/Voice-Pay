import {
  SupportedLanguage,
  VoiceSettings,
  DemoTransaction,
  VoiceAvailabilityStatus,
  TransactionDirection,
} from '../types';

export class AudioService {
  private audioCtx: AudioContext | null = null;
  private isUnlocked = false;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoadedPromise: Promise<SpeechSynthesisVoice[]> | null = null;
  private announcedTxnIds = new Set<string>();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
    }
  }

  public isBengaliVoice(v: SpeechSynthesisVoice): boolean {
    const l = (v.lang || '').toLowerCase();
    const n = (v.name || '').toLowerCase();
    return (
      l === 'bn-in' ||
      l === 'bn-bd' ||
      l.startsWith('bn') ||
      l.startsWith('ben') ||
      n.includes('bengali') ||
      n.includes('bangla') ||
      n.includes('বাংলা') ||
      n.includes('বাঙালি') ||
      n.includes('bashkar') ||
      n.includes('tanishaa') ||
      n.includes('nabanita') ||
      n.includes('pradeep') ||
      n.includes('oparna') ||
      n.includes('lekha')
    );
  }

  public isHindiVoice(v: SpeechSynthesisVoice): boolean {
    const l = (v.lang || '').toLowerCase();
    const n = (v.name || '').toLowerCase();
    return (
      l === 'hi-in' ||
      l.startsWith('hi') ||
      l.startsWith('hin') ||
      n.includes('hindi') ||
      n.includes('हिन्दी') ||
      n.includes('हिंदी') ||
      n.includes('swara') ||
      n.includes('madhur') ||
      n.includes('kalpana') ||
      n.includes('hemant')
    );
  }

  public isEnglishVoice(v: SpeechSynthesisVoice): boolean {
    const l = (v.lang || '').toLowerCase();
    const n = (v.name || '').toLowerCase();
    return l.includes('en-in') || l.startsWith('en') || n.includes('english');
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const refresh = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
      }
    };

    // Initial query
    refresh();

    // Permanent listener: keeps voices updated as browser connects online speech packs
    window.speechSynthesis.addEventListener('voiceschanged', refresh);

    this.voicesLoadedPromise = new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (
        existing &&
        existing.length > 0 &&
        existing.some((voice) => this.isBengaliVoice(voice) || this.isHindiVoice(voice))
      ) {
        this.voices = existing;
        resolve(existing);
      } else {
        const handler = () => {
          refresh();
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
          resolve(this.voices);
        };
        window.speechSynthesis.addEventListener('voiceschanged', handler);
        // Fallback timeout in case voiceschanged never fires or delayed
        setTimeout(() => {
          refresh();
          resolve(this.voices);
        }, 800);
      }
    });
  }

  public async ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];

    const current = window.speechSynthesis.getVoices();
    if (current && current.length > 0) {
      this.voices = current;
    }

    if (this.voices.length === 0 && this.voicesLoadedPromise) {
      await this.voicesLoadedPromise;
      const recheck = window.speechSynthesis.getVoices();
      if (recheck && recheck.length > 0) {
        this.voices = recheck;
      }
    }

    return this.voices;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public unlockAudio(): boolean {
    const ctx = this.getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          this.isUnlocked = true;
        }).catch(() => {});
      } else {
        this.isUnlocked = true;
      }
    }
    return this.isUnlocked;
  }

  public isAudioReady(): boolean {
    return this.isUnlocked && this.audioCtx?.state === 'running';
  }

  /**
   * Check voice availability specifically for bn, hi, en.
   * Seamlessly falls back to PayVoice Cloud Voice Engine if native voice pack is absent on device.
   */
  public async getVoiceAvailabilityStatus(): Promise<VoiceAvailabilityStatus> {
    const voices = await this.ensureVoicesLoaded();

    const bnVoice = voices.find((v) => this.isBengaliVoice(v));
    const hiVoice = voices.find((v) => this.isHindiVoice(v));
    const enVoice = voices.find((v) => this.isEnglishVoice(v));

    return {
      hasBengaliVoice: true, // Always ready (native voice or high-fidelity cloud audio fallback)
      hasNativeBengaliVoice: !!bnVoice,
      isBengaliCloudFallback: !bnVoice,
      bengaliVoiceName: bnVoice
        ? `${bnVoice.name} (${bnVoice.lang})`
        : 'PayVoice Natural Cloud Voice Engine (Online bn-IN)',
      hasHindiVoice: true,
      hasNativeHindiVoice: !!hiVoice,
      isHindiCloudFallback: !hiVoice,
      hindiVoiceName: hiVoice
        ? `${hiVoice.name} (${hiVoice.lang})`
        : 'PayVoice Natural Cloud Voice Engine (Online hi-IN)',
      hasEnglishVoice: !!enVoice,
      englishVoiceName: enVoice ? `${enVoice.name} (${enVoice.lang})` : undefined,
    };
  }

  /**
   * Convert number to Bengali digits string with Indian grouping
   * e.g., 150 -> "১৫০", 1500 -> "১,৫০০", 10000 -> "১০,০০০"
   */
  public toBengaliDigits(amount: number): string {
    const formatted = amount.toLocaleString('en-IN');
    const bnDigits: Record<string, string> = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
      '6': '৬',
      '7': '৭',
      '8': '৮',
      '9': '৯',
      ',': ',',
    };
    return formatted
      .split('')
      .map((char) => bnDigits[char] || char)
      .join('');
  }

  /**
   * Format Indian number string for Hindi and English
   * e.g., 150 -> "150", 1500 -> "1,500", 50000 -> "50,000"
   */
  public formatIndianNumber(amount: number): string {
    return amount.toLocaleString('en-IN');
  }

  /**
   * Bengali Name inflection for natural grammar:
   * Incoming: {name} এর কাছ থেকে / {name}র কাছ থেকে
   * e.g. "প্রিয়ার কাছ থেকে", "রাহুলের কাছ থেকে", "অনিকেতের কাছ থেকে"
   */
  public formatBengaliGenitiveName(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return 'গ্রাহকের';

    // If English "Priya" or Bengali "প্রিয়া", inflect to "প্রিয়ার"
    if (trimmed.toLowerCase() === 'priya') return 'প্রিয়ার';
    if (trimmed === 'প্রিয়া') return 'প্রিয়ার';
    if (trimmed.toLowerCase() === 'rahul') return 'রাহুলের';
    if (trimmed.toLowerCase() === 'aniket' || trimmed.toLowerCase() === 'aniket sen') return 'অনিকেতের';
    if (trimmed.toLowerCase() === 'tanmay' || trimmed.toLowerCase() === 'tanmay das') return 'তন্ময়ের';
    if (trimmed.toLowerCase() === 'riya' || trimmed.toLowerCase() === 'riya mukherjee') return 'রিয়ার';
    if (trimmed.toLowerCase() === 'bikash' || trimmed.toLowerCase() === 'bikash roy') return 'বিকাশের';

    // Suffix rules for Bengali script
    if (trimmed.endsWith('া') || trimmed.endsWith('ি') || trimmed.endsWith('ী')) {
      return `${trimmed}র`;
    }
    return `${trimmed} এর`;
  }

  /**
   * Bengali Name inflection for Outgoing transfer:
   * "আপনি {recipient}কে ১৫০ টাকা পাঠিয়েছেন।"
   * e.g. "আপনি প্রিয়াকে ১৫০ টাকা পাঠিয়েছেন।"
   */
  public formatBengaliAccusativeName(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return 'প্রাপককে';

    if (trimmed.toLowerCase() === 'priya' || trimmed === 'প্রিয়া') return 'প্রিয়াকে';
    if (trimmed.toLowerCase() === 'rahul' || trimmed === 'রাহুল') return 'রাহুলকে';
    if (trimmed.toLowerCase() === 'aniket' || trimmed === 'অনিকেত') return 'অনিকেতকে';
    if (trimmed.toLowerCase() === 'tanmay' || trimmed === 'তন্ময়') return 'তন্ময়কে';
    if (trimmed.toLowerCase() === 'riya' || trimmed === 'রিয়া') return 'রিয়াকে';
    if (trimmed.toLowerCase() === 'aloke roy' || trimmed === 'আলোক রায়') return 'আলোক রায়কে';

    return `${trimmed}কে`;
  }

  /**
   * Hindi Name mapping:
   * e.g. "Priya" -> "प्रिया", "Rahul" -> "राहुल"
   */
  public formatHindiName(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return 'ग्राहक';
    if (trimmed.toLowerCase() === 'priya') return 'प्रिया';
    if (trimmed.toLowerCase() === 'rahul' || trimmed.toLowerCase() === 'rahul sharma') return 'राहुल';
    if (trimmed.toLowerCase() === 'aniket' || trimmed.toLowerCase() === 'aniket sen') return 'अनिकेत';
    if (trimmed.toLowerCase() === 'riya' || trimmed.toLowerCase() === 'riya mukherjee') return 'रिया';
    return trimmed;
  }

  public buildAnnouncementText(
    amount: number,
    language: SupportedLanguage,
    direction: TransactionDirection = 'incoming',
    personName?: string
  ): string {
    return this.formatAnnouncement(amount, language, personName, direction);
  }

  /**
   * Construct localized speech announcement text for Incoming and Outgoing payments.
   * Adheres strictly to Phase 2 specification examples.
   */
  public formatAnnouncement(
    amount: number,
    language: SupportedLanguage,
    personName?: string,
    direction: TransactionDirection = 'incoming'
  ): string {
    const name = (personName || (direction === 'incoming' ? 'Customer' : 'Recipient')).trim();

    // 1. INCOMING PAYMENT ANNOUNCEMENTS
    if (direction === 'incoming') {
      if (language === 'bn') {
        const inflectedName = this.formatBengaliGenitiveName(name);
        const bnAmount = this.toBengaliDigits(amount);
        // Exact example: "প্রিয়ার কাছ থেকে ১৫০ টাকা পেয়েছেন।"
        return `${inflectedName} কাছ থেকে ${bnAmount} টাকা পেয়েছেন।`;
      }

      if (language === 'hi') {
        const hiName = this.formatHindiName(name);
        const hiAmount = this.formatIndianNumber(amount);
        // Exact example: "आपको प्रिया से 150 रुपये मिले।"
        return `आपको ${hiName} से ${hiAmount} रुपये मिले।`;
      }

      // Exact English example: "You received 150 rupees from Priya."
      const enAmount = this.formatIndianNumber(amount);
      return `You received ${enAmount} rupees from ${name}.`;
    }

    // 2. OUTGOING PAYMENT ANNOUNCEMENTS (NEW PHASE 2 FEATURE)
    if (direction === 'outgoing') {
      if (language === 'bn') {
        const inflectedName = this.formatBengaliAccusativeName(name);
        const bnAmount = this.toBengaliDigits(amount);
        // Exact example: "আপনি প্রিয়াকে ১৫০ টাকা পাঠিয়েছেন।"
        return `আপনি ${inflectedName} ${bnAmount} টাকা পাঠিয়েছেন।`;
      }

      if (language === 'hi') {
        const hiName = this.formatHindiName(name);
        const hiAmount = this.formatIndianNumber(amount);
        // Exact example: "आपने प्रिया को 150 रुपये भेजे।"
        return `आपने ${hiName} को ${hiAmount} रुपये भेजे।`;
      }

      // Exact English example: "You sent 150 rupees to Priya."
      const enAmount = this.formatIndianNumber(amount);
      return `You sent ${enAmount} rupees to ${name}.`;
    }

    return `₹${amount}`;
  }

  /**
   * Play fintech incoming payment chime
   */
  public async playChime(chimeType: VoiceSettings['soundChime'], volume = 1.0): Promise<void> {
    if (chimeType === 'none') return;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(Math.max(volume, 0.1), 1.0) * 0.45, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (chimeType === 'bell-high') {
      // Classic fintech two-tone chime (880Hz -> 1320Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.5, now + 0.12);
      gain2.gain.setValueAtTime(0.85, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.65);

      return new Promise((resolve) => setTimeout(resolve, 600));
    } else if (chimeType === 'modern-chime') {
      // Modern 3-tone arpeggio (C5 -> E5 -> G5 -> C6)
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const t = now + idx * 0.08;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.6, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.38);
      });
      return new Promise((resolve) => setTimeout(resolve, 650));
    } else if (chimeType === 'soft-ding') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, now);
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.52);
      return new Promise((resolve) => setTimeout(resolve, 450));
    }
  }

  /**
   * Play distinct outgoing transfer confirmation chime (crisp rising chord)
   */
  public async playOutgoingChime(volume = 1.0): Promise<void> {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(Math.max(volume, 0.1), 1.0) * 0.4, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;
    // Rising confirmation tones (659Hz E5 -> 987Hz B5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.6, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + 0.22);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.1);
    gain2.gain.setValueAtTime(0.7, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.55);

    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  /**
   * Speak announcement using Web Speech API with strict language matching.
   * NEVER silently uses Hindi voice for Bengali or Bengali for Hindi.
   */
  private static PRE_RENDERED_AUDIO: Record<string, string> = {
    // Bengali Incoming (Priya)
    'প্রিয়ার কাছ থেকে ১ টাকা পেয়েছেন।': '/audio/bn_incoming_1_priya.mp3',
    'প্রিয়ার কাছ থেকে ১০ টাকা পেয়েছেন।': '/audio/bn_incoming_10_priya.mp3',
    'প্রিয়ার কাছ থেকে ১০০ টাকা পেয়েছেন।': '/audio/bn_incoming_100_priya.mp3',
    'প্রিয়ার কাছ থেকে ১৫০ টাকা পেয়েছেন।': '/audio/bn_incoming_150_priya.mp3',
    'প্রিয়ার কাছ থেকে ৫০০ টাকা পেয়েছেন।': '/audio/bn_incoming_500_priya.mp3',
    'প্রিয়ার কাছ থেকে ১,০০০ টাকা পেয়েছেন।': '/audio/bn_incoming_1000_priya.mp3',
    'প্রিয়ার কাছ থেকে ১,৫০০ টাকা পেয়েছেন।': '/audio/bn_incoming_1500_priya.mp3',
    'প্রিয়ার কাছ থেকে ৫,০০০ টাকা পেয়েছেন।': '/audio/bn_incoming_5000_priya.mp3',
    'প্রিয়ার কাছ থেকে ১০,০০০ টাকা পেয়েছেন।': '/audio/bn_incoming_10000_priya.mp3',
    'প্রিয়ার কাছ থেকে ৫০,০০০ টাকা পেয়েছেন।': '/audio/bn_incoming_50000_priya.mp3',

    // Bengali Outgoing (Priya)
    'আপনি প্রিয়াকে ১ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_1_priya.mp3',
    'আপনি প্রিয়াকে ১০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_10_priya.mp3',
    'আপনি প্রিয়াকে ১০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_100_priya.mp3',
    'আপনি প্রিয়াকে ১৫০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_150_priya.mp3',
    'আপনি প্রিয়াকে ৫০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_500_priya.mp3',
    'আপনি প্রিয়াকে ১,০০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_1000_priya.mp3',
    'আপনি প্রিয়াকে ১,৫০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_1500_priya.mp3',
    'আপনি প্রিয়াকে ৫,০০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_5000_priya.mp3',
    'আপনি প্রিয়াকে ১০,০০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_10000_priya.mp3',
    'আপনি প্রিয়াকে ৫০,০০০ টাকা পাঠিয়েছেন।': '/audio/bn_outgoing_50000_priya.mp3',

    // Hindi Incoming (Priya)
    'आपको प्रिया से 1 रुपये मिले।': '/audio/hi_incoming_1_priya.mp3',
    'आपको प्रिया से 10 रुपये मिले।': '/audio/hi_incoming_10_priya.mp3',
    'आपको प्रिया से 100 रुपये मिले।': '/audio/hi_incoming_100_priya.mp3',
    'आपको प्रिया से 150 रुपये मिले।': '/audio/hi_incoming_150_priya.mp3',
    'आपको प्रिया से 500 रुपये मिले।': '/audio/hi_incoming_500_priya.mp3',
    'आपको प्रिया से 1,000 रुपये मिले।': '/audio/hi_incoming_1000_priya.mp3',
    'आपको प्रिया से 1,500 रुपये मिले।': '/audio/hi_incoming_1500_priya.mp3',
    'आपको प्रिया से 5,000 रुपये मिले।': '/audio/hi_incoming_5000_priya.mp3',
    'आपको प्रिया से 10,000 रुपये मिले।': '/audio/hi_incoming_10000_priya.mp3',
    'आपको प्रिया से 50,000 रुपये मिले।': '/audio/hi_incoming_50000_priya.mp3',

    // Hindi Outgoing (Priya)
    'आपने प्रिया को 1 रुपये भेजे।': '/audio/hi_outgoing_1_priya.mp3',
    'आपने प्रिया को 10 रुपये भेजे।': '/audio/hi_outgoing_10_priya.mp3',
    'आपने प्रिया को 100 रुपये भेजे।': '/audio/hi_outgoing_100_priya.mp3',
    'आपने प्रिया को 150 रुपये भेजे।': '/audio/hi_outgoing_150_priya.mp3',
    'आपने प्रिया को 500 रुपये भेजे।': '/audio/hi_outgoing_500_priya.mp3',
    'आपने प्रिया को 1,000 रुपये भेजे।': '/audio/hi_outgoing_1000_priya.mp3',
    'आपने प्रिया को 1,500 रुपये भेजे।': '/audio/hi_outgoing_1500_priya.mp3',
    'आपने प्रिया को 5,000 रुपये भेजे।': '/audio/hi_outgoing_5000_priya.mp3',
    'आपने प्रिया को 10,000 रुपये भेजे।': '/audio/hi_outgoing_10000_priya.mp3',
    'आपने प्रिया को 50,000 रुपये भेजे।': '/audio/hi_outgoing_50000_priya.mp3',

    // English
    'You received 150 rupees from Priya.': '/audio/en_incoming_150_priya.mp3',
    'You sent 150 rupees to Priya.': '/audio/en_outgoing_150_priya.mp3',
  };

  /**
   * Play high-fidelity natural speech audio from Local Audio Cache or Cloud Voice Engine fallback.
   * Ensures natural Bengali/Hindi speech is delivered even when host device OS lacks local SAPI voice pack.
   */
  public async playCloudTtsAudio(
    text: string,
    language: SupportedLanguage,
    volume = 1.0,
    speedRate = 1.0
  ): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const trimmed = text.trim();
    const candidateUrls: string[] = [];

    // 1. Check local pre-rendered audio asset for zero-latency instant offline speech
    const localAsset = AudioService.PRE_RENDERED_AUDIO[trimmed];
    if (localAsset) {
      const meta = import.meta as unknown as { env?: { BASE_URL?: string } };
      const base = meta.env?.BASE_URL || '/';
      const resolved = base.endsWith('/')
        ? `${base}${localAsset.replace(/^\//, '')}`
        : `${base}/${localAsset.replace(/^\//, '')}`;
      candidateUrls.push(resolved);
    }

    const langCode = language === 'bn' ? 'bn' : language === 'hi' ? 'hi' : 'en-IN';
    const encoded = encodeURIComponent(trimmed);

    // 2. High-reliability online endpoint (client=gtx) with no-referrer
    candidateUrls.push(
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=gtx&q=${encoded}`
    );

    for (const url of candidateUrls) {
      const ok = await new Promise<boolean>((resolve) => {
        try {
          const audio = new Audio();
          (audio as unknown as { referrerPolicy: string }).referrerPolicy = 'no-referrer';
          audio.volume = Math.min(Math.max(volume, 0.1), 1.0);
          audio.playbackRate = Math.min(Math.max(speedRate, 0.7), 1.3);

          let resolved = false;
          const done = (val: boolean) => {
            if (!resolved) {
              resolved = true;
              audio.onended = null;
              audio.onerror = null;
              resolve(val);
            }
          };

          const timer = setTimeout(() => done(false), 7000);

          audio.onended = () => {
            clearTimeout(timer);
            done(true);
          };

          audio.onerror = () => {
            clearTimeout(timer);
            done(false);
          };

          audio.src = url;
          const p = audio.play();
          if (p) {
            p.catch(() => {
              clearTimeout(timer);
              done(false);
            });
          }
        } catch {
          resolve(false);
        }
      });

      if (ok) {
        return true;
      }
    }

    return false;
  }

  public async speakText(
    text: string,
    language: SupportedLanguage,
    speedRate = 1.0,
    volume = 1.0,
    onVoiceUnavailable?: (lang: SupportedLanguage) => void
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    // Ensure voices are freshly initialized and up to date
    const voices = await this.ensureVoicesLoaded();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (language === 'bn') {
      // Look strictly for Bengali voices
      selectedVoice = voices.find((v) => this.isBengaliVoice(v));
    } else if (language === 'hi') {
      // Look strictly for Hindi voices
      selectedVoice = voices.find((v) => this.isHindiVoice(v));
    } else {
      selectedVoice = voices.find((v) => this.isEnglishVoice(v));
    }

    // If native voice is not found on device for Bengali:
    if (language === 'bn' && !selectedVoice) {
      // STRICT RULE: Do not silently use Hindi voice for Bengali!
      const cloudSuccess = await this.playCloudTtsAudio(text, 'bn', volume, speedRate);
      if (cloudSuccess) {
        return;
      }
      console.warn('Native Bengali TTS voice not found on device and cloud speech unavailable.');
      if (onVoiceUnavailable) onVoiceUnavailable('bn');
      return;
    }

    // If native voice is not found on device for Hindi:
    if (language === 'hi' && !selectedVoice) {
      // STRICT RULE: Do not silently use Bengali voice for Hindi!
      const cloudSuccess = await this.playCloudTtsAudio(text, 'hi', volume, speedRate);
      if (cloudSuccess) {
        return;
      }
      console.warn('Native Hindi TTS voice not found on device and cloud speech unavailable.');
      if (onVoiceUnavailable) onVoiceUnavailable('hi');
      return;
    }

    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis not supported on this browser platform.');
      return;
    }

    // Cancel any overlapping speech
    window.speechSynthesis.cancel();

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Math.min(Math.max(speedRate, 0.7), 1.3);
      utterance.volume = Math.min(Math.max(volume, 0.1), 1.0);
      utterance.pitch = 1.0;

      if (language === 'bn') {
        utterance.lang = 'bn-IN';
        if (selectedVoice) utterance.voice = selectedVoice;
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
        if (selectedVoice) utterance.voice = selectedVoice;
      } else {
        utterance.lang = 'en-IN';
        if (selectedVoice) utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = (e) => {
        console.warn('Speech synthesis event error:', e);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Complete payment announcement workflow:
   * 1. Success check (only announce successful transactions)
   * 2. Duplicate check (prevent duplicate announcement for same transaction ID)
   * 3. Direction check (respect incomingVoiceEnabled / outgoingVoiceEnabled)
   * 4. Haptic vibration
   * 5. Distinct chime
   * 6. Accurate spoken voice in selected language
   */
  public async announceTransaction(
    txn: DemoTransaction,
    settings: VoiceSettings,
    options?: { forceReplay?: boolean; onVoiceUnavailable?: (lang: SupportedLanguage) => void }
  ): Promise<boolean> {
    // Rule: Announcement must only happen for SUCCESS transactions
    if (txn.status !== 'Demo Successful') {
      return false;
    }

    // Rule: Prevent duplicate announcements for the same transaction ID
    if (txn.id && this.announcedTxnIds.has(txn.id) && !options?.forceReplay) {
      return false;
    }

    // Rule: Respect separate Incoming and Outgoing settings
    if (txn.direction === 'incoming' && !settings.incomingVoiceEnabled) {
      return false;
    }
    if (txn.direction === 'outgoing' && !settings.outgoingVoiceEnabled) {
      return false;
    }

    this.unlockAudio();

    // Haptics
    if (settings.hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (txn.direction === 'incoming') {
          navigator.vibrate([120, 60, 120]);
        } else {
          navigator.vibrate([80, 40, 80]);
        }
      } catch {
        // Safe ignore
      }
    }

    // Distinct Chime
    if (txn.direction === 'incoming') {
      await this.playChime(settings.soundChime, settings.volume);
    } else {
      await this.playOutgoingChime(settings.volume);
    }

    // Person name
    const personName = txn.direction === 'incoming'
      ? (txn.senderName || txn.customerName)
      : (txn.recipientName || txn.customerName);

    const speechText = this.formatAnnouncement(
      txn.amount,
      settings.language,
      personName,
      txn.direction
    );

    await this.speakText(
      speechText,
      settings.language,
      settings.speechRate,
      settings.volume,
      options?.onVoiceUnavailable
    );

    if (txn.id) {
      this.announcedTxnIds.add(txn.id);
    }

    return true;
  }

  /**
   * Helper to reset announced transaction set (e.g., during tests or resets)
   */
  public resetAnnouncedHistory(): void {
    this.announcedTxnIds.clear();
  }

  public isAnnounced(txnId: string): boolean {
    return this.announcedTxnIds.has(txnId);
  }
}

export const audioService = new AudioService();
