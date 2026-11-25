import React from 'react';

interface PayVoiceLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const PayVoiceLogo: React.FC<PayVoiceLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Original PayVoice Mark: Sound box device + wave radiation */}
      <div className={`relative ${sizeMap[size]} rounded-xl bg-gradient-to-br from-brand-primary to-brand-navy flex items-center justify-center p-1.5 shadow-sm border border-brand-accent/30`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Speaker Unit Box */}
          <rect x="6" y="8" width="14" height="24" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
          <circle cx="13" cy="16" r="4" fill="#0F172A" stroke="#22C55E" strokeWidth="1" />
          <circle cx="13" cy="16" r="1.5" fill="#22C55E" />
          <circle cx="13" cy="25" r="1.5" fill="#22C55E" />

          {/* Sound waves bursting to the right */}
          <path d="M23 14C25 16 25 24 23 26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
          <path d="M27 10C31 13.5 31 26.5 27 30" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <path d="M31 7C37 11.5 37 28.5 31 33" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-extrabold tracking-tight ${textSizeMap[size]} text-brand-navy dark:text-white leading-none flex items-center gap-1`}>
            <span>Pay</span>
            <span className="text-brand-accent">Voice</span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted dark:text-slate-400 mt-0.5">
            Voice Assistant
          </span>
        </div>
      )}
    </div>
  );
};
