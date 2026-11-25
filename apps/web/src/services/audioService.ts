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

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    this.voicesLoadedPromise = new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (existing && existing.length > 0) {
        this.voices = existing;
        resolve(existing);
      } else {
        const handler = () => {
          this.voices = window.speechSynthesis.getVoices();
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
          resolve(this.voices);
        };
        window.speechSynthesis.addEventListener('voiceschanged', handler);
        // Fallback timeout in case voiceschanged never fires
        setTimeout(() => {
          this.voices = window.speechSynthesis.getVoices();
          resolve(this.voices);
        }, 800);
      }
    });
  }

  public async ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
    if (this.voices && this.voices.length > 0) {
      return this.voices;
    }
    if (this.voicesLoadedPromise) {
      return await this.voicesLoadedPromise;
    }
    this.initVoices();
    return this.voicesLoadedPromise ? await this.voicesLoadedPromise : [];
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
   * Ensures no silent cross-mixing.
   */
  public async getVoiceAvailabilityStatus(): Promise<VoiceAvailabilityStatus> {
    const voices = await this.ensureVoicesLoaded();

    const bnVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('bn') ||
        v.name.toLowerCase().includes('bengali') ||
        v.name.toLowerCase().includes('bangla')
    );

    const hiVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi')
    );

    const enVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('en-in') ||
        v.lang.toLowerCase().startsWith('en')
    );

    return {
      hasBengaliVoice: !!bnVoice,
      bengaliVoiceName: bnVoice ? `${bnVoice.name} (${bnVoice.lang})` : undefined,
      hasHindiVoice: !!hiVoice,
      hindiVoiceName: hiVoice ? `${hiVoice.name} (${hiVoice.lang})` : undefined,
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
  public async speakText(
    text: string,
    language: SupportedLanguage,
    speedRate = 1.0,
    volume = 1.0,
    onVoiceUnavailable?: (lang: SupportedLanguage) => void
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis not supported on this browser platform.');
      return;
    }

    // Cancel any overlapping speech
    window.speechSynthesis.cancel();

    // Ensure voices are initialized
    const voices = await this.ensureVoicesLoaded();

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Math.min(Math.max(speedRate, 0.7), 1.3);
      utterance.volume = Math.min(Math.max(volume, 0.1), 1.0);
      utterance.pitch = 1.0;

      let selectedVoice: SpeechSynthesisVoice | undefined;

      if (language === 'bn') {
        utterance.lang = 'bn-IN';
        // Look strictly for Bengali voices
        selectedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase() === 'bn-in' ||
            v.lang.toLowerCase().startsWith('bn') ||
            v.name.toLowerCase().includes('bengali') ||
            v.name.toLowerCase().includes('bangla')
        );

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        } else {
          // STRICT RULE: Do not silently use Hindi voice for Bengali!
          console.warn('Native Bengali TTS voice not found on device.');
          if (onVoiceUnavailable) onVoiceUnavailable('bn');
        }
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
        // Look strictly for Hindi voices
        selectedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase() === 'hi-in' ||
            v.lang.toLowerCase().startsWith('hi') ||
            v.name.toLowerCase().includes('hindi')
        );

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        } else {
          // STRICT RULE: Do not silently use Bengali voice for Hindi!
          console.warn('Native Hindi TTS voice not found on device.');
          if (onVoiceUnavailable) onVoiceUnavailable('hi');
        }
      } else {
        utterance.lang = 'en-IN';
        selectedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().includes('en-in') ||
            v.lang.toLowerCase().startsWith('en')
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
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
