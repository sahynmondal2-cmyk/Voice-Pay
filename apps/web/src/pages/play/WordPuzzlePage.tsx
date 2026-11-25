import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Lightbulb,
  Eye,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WORD_PUZZLE_ITEMS } from '../../data/demoData';
import { SupportedLanguage } from '../../types';
import confetti from 'canvas-confetti';

export const WordPuzzlePage: React.FC = () => {
  const { language: initialLang, updateGameProgress, t } = useApp();

  const [activeLang, setActiveLang] = useState<SupportedLanguage>(initialLang);
  const wordsForLang = WORD_PUZZLE_ITEMS.filter((w) => w.language === activeLang);
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  const currentItem = wordsForLang[puzzleIndex] || wordsForLang[0];

  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string }[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<{ id: string; letter: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize current puzzle
  useEffect(() => {
    if (!currentItem) return;
    setAvailableTiles(
      currentItem.scrambledLetters.map((letter, idx) => ({
        id: `${letter}-${idx}-${Math.random()}`,
        letter,
      }))
    );
    setSelectedTiles([]);
    setShowHint(false);
    setRevealed(false);
    setIsSolved(false);
  }, [currentItem]);

  // Click on available tile to add to word
  const handleSelectTile = (tile: { id: string; letter: string }) => {
    if (isSolved || revealed) return;
    const newSelected = [...selectedTiles, tile];
    const newAvailable = availableTiles.filter((t) => t.id !== tile.id);

    setSelectedTiles(newSelected);
    setAvailableTiles(newAvailable);

    // Check if word complete
    const constructedWord = newSelected.map((t) => t.letter).join('');
    if (constructedWord === currentItem.targetWord) {
      setIsSolved(true);
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      } catch {}
      updateGameProgress((gp) => ({
        ...gp,
        wordsSolvedCount: gp.wordsSolvedCount + 1,
      }));
    }
  };

  // Click on selected tile to remove back to available
  const handleRemoveTile = (tile: { id: string; letter: string }) => {
    if (isSolved || revealed) return;
    setSelectedTiles(selectedTiles.filter((t) => t.id !== tile.id));
    setAvailableTiles([...availableTiles, tile]);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    const nextIdx = (puzzleIndex + 1) % wordsForLang.length;
    setPuzzleIndex(nextIdx);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top Header & Back Routes */}
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

      {/* Main Game Container */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-subtle space-y-6">
        {/* Title & Language Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Word Builder • Category: {currentItem.category}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-brand-navy dark:text-white">
              {t.play.games.wordTitle}
            </h2>
          </div>

          {/* Mode Switch: BN / HI / EN */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['en', 'bn', 'hi'] as SupportedLanguage[]).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => {
                  setActiveLang(lng);
                  setPuzzleIndex(0);
                }}
                className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] font-bold transition-colors ${
                  activeLang === lng
                    ? 'bg-white dark:bg-brand-dark-surface text-brand-primary dark:text-brand-accent shadow-xs'
                    : 'text-slate-500 hover:text-brand-navy'
                }`}
              >
                {lng === 'bn' ? 'বাংলা' : lng === 'hi' ? 'हिन्दी' : 'ENG'}
              </button>
            ))}
          </div>
        </div>

        {/* Word Construction Slot Box */}
        <div className="space-y-2 text-center">
          <p className="text-xs text-brand-muted dark:text-slate-400 font-medium">
            Tap scrambled letters to form the target word:
          </p>

          <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-brand-dark-card flex items-center justify-center gap-2 flex-wrap">
            {selectedTiles.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Empty slots</span>
            ) : (
              selectedTiles.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => handleRemoveTile(tile)}
                  disabled={isSolved || revealed}
                  className="px-4 py-2 rounded-xl bg-brand-primary dark:bg-brand-accent text-white dark:text-brand-navy font-bold text-base shadow-subtle hover:scale-105 transition-transform"
                >
                  {tile.letter}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Scrambled Available Letters */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap min-h-[48px]">
            {availableTiles.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleSelectTile(tile)}
                className="px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-navy dark:text-white font-extrabold text-base hover:border-brand-accent hover:scale-105 transition-all shadow-xs"
              >
                {tile.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Success or Revealed Banner */}
        {isSolved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <h4 className="font-extrabold text-sm text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct! Word: {currentItem.targetWord}</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {currentItem.meaning}
            </p>
          </div>
        )}

        {revealed && !isSolved && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
            <h4 className="font-bold text-xs text-amber-800 dark:text-amber-300">
              Target Answer: <strong>{currentItem.targetWord}</strong>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {currentItem.meaning}
            </p>
          </div>
        )}

        {/* Hint Box */}
        {showHint && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Hint:</strong> {currentItem.hint}
            </div>
          </div>
        )}

        {/* Action Controls: Hint, Reveal, Next */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex gap-2">
            {!showHint && (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-medium"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.common.hint}</span>
              </button>
            )}

            {!revealed && !isSolved && (
              <button
                type="button"
                onClick={handleReveal}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-medium text-slate-500"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.common.showAnswer}</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-light"
          >
            <span>{t.common.next}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
