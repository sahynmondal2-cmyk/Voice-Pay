import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  Brain,
  Layers,
  FileText,
  Zap,
  Award,
  Flame,
  Clock,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdSlot } from '../components/common/AdSlot';

export const PlayHubPage: React.FC = () => {
  const { t, gameProgress, userPreferences, updatePreferences } = useApp();

  const games = [
    {
      id: 'brain-spark',
      title: t.play.games.sparkTitle,
      desc: t.play.games.sparkDesc,
      duration: t.play.games.sparkDuration,
      to: '/play/daily-challenge',
      icon: Brain,
      color: 'from-amber-500/15 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      badge: 'Daily Challenge',
    },
    {
      id: 'memory-match',
      title: t.play.games.memoryTitle,
      desc: t.play.games.memoryDesc,
      duration: t.play.games.memoryDuration,
      to: '/play/memory-match',
      icon: Layers,
      color: 'from-emerald-500/15 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      badge: 'Focus Game',
    },
    {
      id: 'word-builder',
      title: t.play.games.wordTitle,
      desc: t.play.games.wordDesc,
      duration: t.play.games.wordDuration,
      to: '/play/word-puzzle',
      icon: FileText,
      color: 'from-blue-500/15 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      badge: '3 Languages',
    },
    {
      id: 'quick-tap',
      title: t.play.games.reflexTitle,
      desc: t.play.games.reflexDesc,
      duration: t.play.games.reflexDuration,
      to: '/play/quick-tap',
      icon: Zap,
      color: 'from-purple-500/15 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      badge: 'Quick Reflex',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Header with Clear Route Back to Merchant Tools (Master Prompt Requirement) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary dark:text-brand-accent hover:underline mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.play.backToDashboard}</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight flex items-center gap-2">
            <span>{t.play.hubTitle}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-primary dark:text-brand-accent uppercase">
              Optional
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400 max-w-2xl mt-0.5">
            {t.play.hubSubtitle}
          </p>
        </div>

        {/* Game Sound Toggle */}
        <button
          type="button"
          onClick={() => updatePreferences({ soundEnabled: !userPreferences.soundEnabled })}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-dark-card text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-subtle hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {userPreferences.soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-brand-accent" />
              <span>{t.play.soundToggle}: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>{t.play.soundToggle}: Off</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Friendly Progress Banner: Non-punitive streak */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-navy text-white shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t.play.dailyStreak}
              </span>
              <span className="text-lg font-black text-white">
                {gameProgress.currentStreak} {t.play.streakDays}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {t.play.streakFriendly}
            </p>
          </div>
        </div>

        {/* Badges preview */}
        <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl shrink-0">
          <Award className="w-4 h-4 text-brand-accent" />
          <span className="text-xs font-bold text-white">
            {gameProgress.badges.length} Badges Earned
          </span>
        </div>
      </div>

      {/* 3. Non-Monetary & Responsible Entertainment Disclaimer (Master Prompt Rule) */}
      <div className="bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p>{t.play.nonMonetaryNotice}</p>
      </div>

      {/* 4. Mini-Game Cards Grid (Part 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.slice(0, 2).map((game) => {
          const Icon = game.icon;
          return (
            <Link
              key={game.id}
              to={game.to}
              className={`p-5 rounded-2xl border bg-gradient-to-br ${game.color} hover:scale-[1.01] transition-all shadow-subtle flex flex-col justify-between group bg-white dark:bg-brand-dark-surface`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {game.badge}
                    </span>
                    <span className="text-xs font-semibold text-brand-muted dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {game.duration}
                    </span>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-brand-navy dark:text-white mb-1">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {game.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-primary dark:text-brand-accent group-hover:underline">
                  {t.play.playBtn} →
                </span>
                <span className="text-[10px] text-slate-400">Local demo game</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 5. Policy-Safe Ad Placement: Between Game Cards (Master Prompt Requirement) */}
      <AdSlot
        placementId="play_hub"
        contextTag="allowed_content_feed"
      />

      {/* 6. Mini-Game Cards Grid (Part 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.slice(2).map((game) => {
          const Icon = game.icon;
          return (
            <Link
              key={game.id}
              to={game.to}
              className={`p-5 rounded-2xl border bg-gradient-to-br ${game.color} hover:scale-[1.01] transition-all shadow-subtle flex flex-col justify-between group bg-white dark:bg-brand-dark-surface`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {game.badge}
                    </span>
                    <span className="text-xs font-semibold text-brand-muted dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {game.duration}
                    </span>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-brand-navy dark:text-white mb-1">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {game.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-primary dark:text-brand-accent group-hover:underline">
                  {t.play.playBtn} →
                </span>
                <span className="text-[10px] text-slate-400">Local demo game</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 7. Earned Badges Showcase */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{t.play.badgesTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {gameProgress.badges.map((b: any) => (
            <div
              key={b.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-brand-dark-card flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-brand-navy dark:text-white">{b.title}</p>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{b.description}</p>
              </div>
            </div>
          ))}

          {/* Locked Badge Teaser */}
          <div className="p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 flex items-start gap-3 opacity-60">
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-600 dark:text-slate-300">Memory Master</p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Solve memory match in under 12 moves</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
