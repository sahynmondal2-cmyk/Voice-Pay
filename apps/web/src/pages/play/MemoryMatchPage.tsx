import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Clock,
  Layers,
  Sparkles,
  Trophy,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MEMORY_CARDS_DATA } from '../../data/demoData';
import confetti from 'canvas-confetti';

interface CardItem {
  uid: string;
  matchKey: string;
  label: string;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryMatchPage: React.FC = () => {
  const { language, updateGameProgress, userPreferences, t } = useApp();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize deck (8 pairs = 16 cards)
  const initializeDeck = useCallback(() => {
    const deck: CardItem[] = [];
    MEMORY_CARDS_DATA.slice(0, 8).forEach((item) => {
      // Create pair
      deck.push({
        uid: `${item.matchKey}-1`,
        matchKey: item.matchKey,
        label: item.label[language] || item.label.en,
        symbol: item.symbol,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        uid: `${item.matchKey}-2`,
        matchKey: item.matchKey,
        label: item.label[language] || item.label.en,
        symbol: item.symbol,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    deck.sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsGameOver(false);
    setIsPaused(false);
  }, [language]);

  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  // Timer interval
  useEffect(() => {
    if (!timerEnabled || isGameOver || isPaused) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnabled, isGameOver, isPaused]);

  // Handle Card Click
  const handleCardClick = (card: CardItem) => {
    if (isGameOver || isPaused || card.isFlipped || card.isMatched) return;
    if (flippedCards.length === 2) return;

    // Flip this card
    const updatedCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (first.matchKey === second.matchKey) {
        // Matched!
        setTimeout(() => {
          setCards((prev) => {
            const matchedDeck = prev.map((c) =>
              c.matchKey === first.matchKey ? { ...c, isMatched: true } : c
            );
            // Check if game won
            const allMatched = matchedDeck.every((c) => c.isMatched);
            if (allMatched) {
              setIsGameOver(true);
              try {
                confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
              } catch {}
              updateGameProgress((gp) => ({
                ...gp,
                memoryMatchBestMoves: gp.memoryMatchBestMoves ? Math.min(gp.memoryMatchBestMoves, moves + 1) : moves + 1,
                memoryMatchBestTimeSeconds: gp.memoryMatchBestTimeSeconds ? Math.min(gp.memoryMatchBestTimeSeconds, seconds) : seconds,
              }));
            }
            return matchedDeck;
          });
          setFlippedCards([]);
        }, 500);
      } else {
        // Not matched, flip back after brief pause
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === first.uid || c.uid === second.uid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 850);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top Header & Route Back to Merchant Tools */}
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

      {/* Main Game Surface */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-5">
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Merchant Focus Break • 4x4 Grid
            </span>
            <h2 className="text-lg font-extrabold text-brand-navy dark:text-white">
              {t.play.games.memoryTitle}
            </h2>
          </div>

          {/* Moves & Timer Controls */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-navy dark:text-white">
              Moves: <strong>{moves}</strong>
            </div>

            {timerEnabled ? (
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-navy dark:text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-accent" />
                <span>{seconds}s</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-[11px]">
                Timer Disabled
              </div>
            )}

            <button
              type="button"
              onClick={() => setTimerEnabled(!timerEnabled)}
              className="text-[11px] text-slate-400 hover:text-brand-navy dark:hover:text-white underline"
            >
              {timerEnabled ? 'Disable Timer' : 'Enable Timer'}
            </button>
          </div>
        </div>

        {/* 4x4 Grid of Cards */}
        <div
          role="grid"
          aria-label="Memory match cards"
          className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mx-auto"
        >
          {cards.map((card, idx) => {
            const isVisible = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || isGameOver}
                aria-label={isVisible ? card.label : `Hidden Card ${idx + 1}`}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 select-none border-2 shadow-xs ${
                  card.isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 scale-95 opacity-85'
                    : isVisible
                    ? 'bg-white dark:bg-slate-800 border-brand-accent shadow-glow-accent scale-100'
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-brand-dark-card border-slate-300 dark:border-slate-700 hover:border-brand-accent/60'
                }`}
              >
                {isVisible ? (
                  <div className="flex flex-col items-center animate-in zoom-in-75 duration-150">
                    <span className="text-2xl sm:text-3xl mb-1">{card.symbol}</span>
                    <span className="text-[10px] font-bold text-brand-navy dark:text-white truncate max-w-full">
                      {card.label}
                    </span>
                  </div>
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 font-extrabold text-sm sm:text-base">
                    ?
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Game Completed Banner */}
        {isGameOver && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-in zoom-in-95">
            <h3 className="text-base font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1.5">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Great Memory, Merchant!</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Completed in <strong>{moves} moves</strong> ({seconds} seconds).
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={initializeDeck}
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-brand-navy font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Game</span>
          </button>

          <Link
            to="/play"
            className="px-4 py-2 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-light"
          >
            Exit to Hub
          </Link>
        </div>
      </div>
    </div>
  );
};
