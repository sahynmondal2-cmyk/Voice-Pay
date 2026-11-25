import React, { useState, useEffect } from 'react';
import { ExternalLink, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { activeAdAdapter, AdPolicyGuard } from '../../services/adAdapter';
import { AdPlacement } from '../../types';
import { Link } from 'react-router-dom';

interface AdSlotProps {
  placementId: 'home_feed' | 'business_tips' | 'play_hub' | 'discover_offers';
  contextTag?: string; // used for policy guard check
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  placementId,
  contextTag = 'allowed_content_feed',
  className = '',
}) => {
  const { userPreferences, activePlan } = useApp();
  const [ad, setAd] = useState<AdPlacement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPolicyBlocked, setIsPolicyBlocked] = useState(false);

  // If merchant has subscribed to proposed Business Premium, ad is completely removed!
  const isPremiumAdFree = activePlan.id !== 'free';

  useEffect(() => {
    // 1. Run strict policy guard
    if (!AdPolicyGuard.isPlacementAllowed(contextTag)) {
      setIsPolicyBlocked(true);
      setIsLoading(false);
      return;
    }

    if (isPremiumAdFree) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    activeAdAdapter
      .loadAd({
        placementId,
        personalizedConsent: userPreferences.personalizedAds,
        isTestMode: true,
      })
      .then((res) => {
        if (!isMounted) return;
        if (res.status === 'loaded' && res.adData) {
          setAd(res.adData);
          setHasError(false);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [placementId, contextTag, userPreferences.personalizedAds, isPremiumAdFree]);

  if (isPolicyBlocked) {
    return null; // Silently safeguard against forbidden placements
  }

  if (isPremiumAdFree) {
    return (
      <div className="bg-brand-primary/5 dark:bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-3 text-xs text-brand-primary dark:text-brand-accent flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          Business Premium Active: Partner Ads Disabled
        </span>
        <span className="text-[10px] font-semibold bg-brand-accent/20 px-2 py-0.5 rounded">Ad-Free Demo</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 p-4 animate-pulse ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    );
  }

  if (hasError || !ad) {
    // Safe Fallback State
    return (
      <div className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-4 text-xs text-brand-muted dark:text-slate-400 ${className}`}>
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
          <span className="text-slate-400 uppercase tracking-wide">Sponsored Partner Placement</span>
          <Link to="/settings" className="hover:underline flex items-center gap-0.5">
            <Info className="w-3 h-3" /> Ad Info
          </Link>
        </div>
        <p>Merchant partnership opportunities for West Bengal business suppliers.</p>
      </div>
    );
  }

  return (
    <aside
      aria-label="Merchant partner sponsorship"
      className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-brand-dark-surface p-4 shadow-subtle hover:border-brand-accent/40 transition-all ${className}`}
    >
      {/* Required Disclosure & Sponsored Label */}
      <div className="flex items-center justify-between text-[11px] mb-2">
        <div className="flex items-center gap-1.5">
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase border border-slate-300 dark:border-slate-700">
            {ad.badgeLabel}
          </span>
          <span className="text-brand-muted dark:text-slate-400 font-medium">
            • {ad.sponsorName}
          </span>
        </div>
        <Link
          to="/settings"
          title="Manage ad preferences & privacy"
          className="text-brand-muted hover:text-brand-primary dark:hover:text-brand-accent transition-colors flex items-center gap-0.5 text-[10px]"
        >
          <ShieldCheck className="w-3 h-3" />
          Ad Choices
        </Link>
      </div>

      {/* Ad Content */}
      <div className="mb-3">
        <h4 className="text-sm font-bold text-brand-navy dark:text-white mb-1 leading-snug">
          {ad.headline}
        </h4>
        <p className="text-xs text-brand-muted dark:text-slate-400 line-clamp-2 leading-relaxed">
          {ad.description}
        </p>
      </div>

      {/* Action button - clearly marked Demo */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <span className="text-[10px] text-slate-400 italic">
          Transparent merchant sponsor
        </span>
        <button
          type="button"
          onClick={() => {
            alert(`Demo Ad Interaction:\n\nSponsor: ${ad.sponsorName}\nHeadline: ${ad.headline}\nTarget: ${ad.ctaUrl}\n\nNote: In accordance with ad policies, ad interactions do not reward points, and no real ad network is billed.`);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary dark:text-brand-accent hover:underline bg-brand-primary/5 dark:bg-brand-accent/10 px-2.5 py-1 rounded-md"
        >
          <span>{ad.ctaText}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
