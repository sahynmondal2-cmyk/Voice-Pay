import { SupportedLanguage, VoiceSettings } from '../types';

class AudioService {
  private audioCtx: AudioContext | null = null;
  private isUnlocked = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
   * Play rich merchant soundbox chime using Web Audio API oscillators
   */
  public async playChime(chimeType: VoiceSettings['soundChime'], volume = 1.0): Promise<void> {
    if (chimeType === 'none') return;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(Math.max(volume, 0.1), 1.0) * 0.4, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (chimeType === 'bell-high') {
      // Classic fintech two-tone chime (880Hz -> 1320Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.5, now + 0.12); // E6
      gain2.gain.setValueAtTime(0.85, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.65);

      return new Promise((resolve) => setTimeout(resolve, 600));
    } else if (chimeType === 'modern-chime') {
      // Modern 3-tone arpeggio (C5 -> E5 -> G5)
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
      // Warm gentle bell
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
   * Construct localized speech announcement text
   */
  public formatAnnouncement(
    amount: number,
    language: SupportedLanguage,
    payerName?: string,
    announcePayer = true
  ): string {
    const formattedAmount = amount.toLocaleString('en-IN');

    if (language === 'bn') {
      if (announcePayer && payerName) {
        return `${payerName} এর থেকে পেভয়েস ডেমোতে ${formattedAmount} টাকা সফলভাবে জমা হয়েছে।`;
      }
      return `পেভয়েস ডেমোতে ${formattedAmount} টাকা সফলভাবে জমা হয়েছে।`;
    }

    if (language === 'hi') {
      if (announcePayer && payerName) {
        return `${payerName} से पेवॉइस डेमो पर ${formattedAmount} रुपये प्राप्त हुए।`;
      }
      return `पेवॉइस डेमो पर ${formattedAmount} रुपये सफलतापूर्वक प्राप्त हुए।`;
    }

    // Default English
    if (announcePayer && payerName) {
      return `Rupees ${formattedAmount} received from ${payerName} on PayVoice Demo.`;
    }
    return `Rupees ${formattedAmount} received successfully on PayVoice Demo.`;
  }

  /**
   * Speak announcement using Web Speech API with fallback
   */
  public async speakText(
    text: string,
    language: SupportedLanguage,
    speedRate = 1.0,
    volume = 1.0
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    // Check Web Speech API support
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis not supported on this browser platform.');
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Math.min(Math.max(speedRate, 0.7), 1.4);
      utterance.volume = Math.min(Math.max(volume, 0.1), 1.0);
      utterance.pitch = 1.0;

      // Select matching regional voice if available
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice: SpeechSynthesisVoice | undefined;

      if (language === 'bn') {
        utterance.lang = 'bn-IN';
        selectedVoice = voices.find((v) => v.lang.startsWith('bn'));
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
        selectedVoice = voices.find((v) => v.lang.startsWith('hi'));
      } else {
        utterance.lang = 'en-IN';
        selectedVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.startsWith('en'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = (e) => {
        console.warn('Speech synthesis event error (simulated fallback handled)', e);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Complete payment alert workflow:
   * 1. Haptics (vibration)
   * 2. Payment chime sound
   * 3. Spoken voice announcement
   */
  public async announcePayment(
    amount: number,
    settings: VoiceSettings,
    payerName?: string
  ): Promise<void> {
    this.unlockAudio();

    // Trigger haptic pulse if enabled
    if (settings.hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([120, 60, 120]);
      } catch {
        // Safe ignore
      }
    }

    // 1. Play fintech audio chime
    await this.playChime(settings.soundChime, settings.volume);

    // 2. Prepare text and speak
    const speechText = this.formatAnnouncement(
      amount,
      settings.language,
      payerName,
      settings.announcePayerName
    );

    await this.speakText(
      speechText,
      settings.language,
      settings.speechRate,
      settings.volume
    );
  }
}

export const audioService = new AudioService();
