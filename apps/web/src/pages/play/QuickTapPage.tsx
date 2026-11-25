import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  RotateCcw,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickTapPage: React.FC = () => {
  const { updateGameProgress, t } = useApp();

  type State = 'idle' | 'waiting' | 'ready' | 'result' | 'early';
  const [gameState, setGameState] = useState<State>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const startPractice = () => {
    setGameState('waiting');
    setReactionTime(null);

    // Random delay between 1.8s and 4.0s
    const delay = Math.floor(1800 + Math.random() * 2200);

    timeoutRef.current = window.setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState('ready');
    }, delay);
  };

  const handleTap = () => {
    if (gameState === 'waiting') {
      // Tapped too early!
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('early');
    } else if (gameState === 'ready') {
      const elapsed = Date.now() - startTimeRef.current;
      setReactionTime(elapsed);
      setGameState('result');

      updateGameProgress((gp) => ({
        ...gp,
        reflexBestTimeMs: gp.reflexBestTimeMs
          ? Math.min(gp.reflexBestTimeMs, elapsed)
          : elapsed,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/play"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary dark:text-brand-accent hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Play Hub</span>
        </Link>
        <Link
          to="/dashboard"
          className="text-xs font-semibold text-brand-muted dark:text-slate-400 hover:text-brand-navy"
        >
          ← Merchant Dashboard
        </Link>
      </div>

      {/* Main Reflex Container */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-subtle space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Reflex Practice • Short Round
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-brand-navy dark:text-white">
              {t.play.games.reflexTitle}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            No prizes • Casual fun
          </span>
        </div>

        {/* Big Tap Arena */}
        <div
          role="button"
          tabIndex={0}
          onClick={gameState === 'waiting' || gameState === 'ready' ? handleTap : undefined}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              if (gameState === 'waiting' || gameState === 'ready') handleTap();
            }
          }}
          className={`h-64 rounded-3xl flex flex-col items-center justify-center p-6 text-center select-none transition-colors cursor-pointer border-2 shadow-inner ${
            gameState === 'idle'
              ? 'bg-slate-100 dark:bg-brand-dark-card border-slate-300 dark:border-slate-700'
              : gameState === 'waiting'
              ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-amber-200'
              : gameState === 'ready'
              ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black animate-pulse'
              : gameState === 'early'
              ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
              : 'bg-brand-primary/10 border-brand-accent text-brand-navy dark:text-white'
          }`}
        >
          {gameState === 'idle' && (
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <p className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white">
                  Tap "Start Practice" Below
                </p>
                <p className="text-xs text-brand-muted dark:text-slate-400 mt-1">
                  When the box turns green, tap anywhere inside as fast as you can!
                </p>
              </div>
            </div>
          )}

          {gameState === 'waiting' && (
            <div className="space-y-2">
              <Clock className="w-10 h-10 mx-auto animate-spin text-amber-600" />
              <p className="font-extrabold text-base sm:text-lg">Wait for green...</p>
              <p className="text-xs text-amber-700/80">Don't tap yet!</p>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="space-y-1">
              <Zap className="w-16 h-16 mx-auto animate-bounce fill-current" />
              <p className="text-2xl sm:text-3xl font-black uppercase tracking-wider">TAP NOW!</p>
            </div>
          )}

          {gameState === 'early' && (
            <div className="space-y-2">
              <p className="text-lg font-bold text-rose-600 dark:text-rose-400">Too early!</p>
              <p className="text-xs">Wait until the box turns bright green.</p>
            </div>
          )}

          {gameState === 'result' && (
            <div className="space-y-2">
              <Sparkles className="w-10 h-10 mx-auto text-brand-accent" />
              <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-accent">
                {reactionTime} ms
              </div>
              <p className="text-xs font-semibold text-brand-navy dark:text-slate-300">
                {reactionTime && reactionTime < 250
                  ? '⚡ Lightning fast merchant reflexes!'
                  : reactionTime && reactionTime < 350
                  ? 'Great sharp reaction speed!'
                  : 'Good practice, keep refreshing your mind!'}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          {gameState === 'idle' || gameState === 'result' || gameState === 'early' ? (
            <button
              type="button"
              onClick={startPractice}
              className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-sm shadow-subtle active:scale-95 transition-all"
            >
              {gameState === 'idle' ? 'Start Practice' : 'Try Again'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setGameState('idle');
              }}
              className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-600 dark:text-slate-300"
            >
              Cancel Round
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
