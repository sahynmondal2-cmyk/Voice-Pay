import { AdPlacement } from '../types';
import { DEMO_AD_PLACEMENTS } from '../data/demoData';

export interface AdRequestConfig {
  placementId: 'home_feed' | 'business_tips' | 'play_hub' | 'discover_offers';
  personalizedConsent: boolean;
  isTestMode?: boolean;
}

export interface AdLoadResult {
  status: 'loaded' | 'empty' | 'error';
  adData?: AdPlacement;
  errorMessage?: string;
}

/**
 * Standard Ad Adapter Interface for future network plug-ins.
 * Enforces policy validation before rendering any ad unit.
 */
export interface IAdAdapter {
  name: string;
  isInitialized(): boolean;
  initialize(): Promise<boolean>;
  loadAd(config: AdRequestConfig): Promise<AdLoadResult>;
}

/**
 * Policy Safety Checker:
 * Ensures ads are NEVER displayed in forbidden contexts.
 */
export class AdPolicyGuard {
  private static FORBIDDEN_CONTEXTS = [
    'payment_alert',
    'payment_success',
    'active_gameplay',
    'voice_settings_audio_control',
    'auth_login_otp',
    'qr_payment_display',
  ];

  public static isPlacementAllowed(context: string): boolean {
    if (this.FORBIDDEN_CONTEXTS.includes(context)) {
      console.error(`Ad Policy Violation Prevented: Placement in '${context}' is strictly forbidden by PayVoice Ad-Safety rules.`);
      return false;
    }
    return true;
  }
}

/**
 * Demo / Placeholder Ad Adapter
 * Returns strictly labelled demo partner mockups.
 */
export class DemoAdAdapter implements IAdAdapter {
  public name = 'PayVoice Demo Safe Placement Adapter';
  private initialized = true;

  public isInitialized(): boolean {
    return this.initialized;
  }

  public async initialize(): Promise<boolean> {
    this.initialized = true;
    return true;
  }

  public async loadAd(config: AdRequestConfig): Promise<AdLoadResult> {
    // Artificial small latency for realistic loading states
    await new Promise((resolve) => setTimeout(resolve, 150));

    const placement = DEMO_AD_PLACEMENTS[config.placementId];
    if (!placement) {
      return {
        status: 'empty',
        errorMessage: `No demo placement available for ${config.placementId}`,
      };
    }

    return {
      status: 'loaded',
      adData: placement,
    };
  }
}

/**
 * Placeholder interface for Future Android Google Mobile Ads (AdMob) SDK
 */
export class AndroidAdMobAdapter implements IAdAdapter {
  public name = 'Android AdMob Bridge Adapter (Specification Placeholder)';

  public isInitialized(): boolean {
    return false;
  }

  public async initialize(): Promise<boolean> {
    console.info('AdMob integration placeholder: Must be configured in Android native code with approved app ID.');
    return false;
  }

  public async loadAd(_config: AdRequestConfig): Promise<AdLoadResult> {
    return {
      status: 'empty',
      errorMessage: 'Live AdMob SDK not attached in web demo mode.',
    };
  }
}

/**
 * Placeholder interface for Future Web Ad Network (Google AdSense / GAM)
 */
export class WebAdNetworkAdapter implements IAdAdapter {
  public name = 'Web Ad Network Adapter (Specification Placeholder)';

  public isInitialized(): boolean {
    return false;
  }

  public async initialize(): Promise<boolean> {
    console.info('Web Ad Network placeholder: Subject to Google publisher policies and site verification.');
    return false;
  }

  public async loadAd(_config: AdRequestConfig): Promise<AdLoadResult> {
    return {
      status: 'empty',
      errorMessage: 'Web Ad network disabled in frontend demo.',
    };
  }
}

export const activeAdAdapter: IAdAdapter = new DemoAdAdapter();
