import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_PUZZLES } from '../../data/demoData';
import confetti from 'canvas-confetti';

export const DailyBrainSparkPage: React.FC = () => {
  const { language, t, updateGameProgress, gameProgress } = useApp();

  const puzzle = DAILY_PUZZLES[0]; // Current daily puzzle
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lang = language;

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === puzzle.correctOptionId) {
      setIsCompleted(true);
      setShowExplanation(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}

      // Update progress locally
      updateGameProgress((prev) => {
        const alreadyDone = prev.brainSparkCompletedDates.includes(puzzle.dateKey);
        return {
          ...prev,
          brainSparkCompletedDates: alreadyDone
            ? prev.brainSparkCompletedDates
            : [...prev.brainSparkCompletedDates, puzzle.dateKey],
          currentStreak: alreadyDone ? prev.currentStreak : prev.currentStreak + 1,
        };
      });
    } else {
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowHint(false);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Navigation & Exit Controls (Master Prompt Rule) */}
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

      {/* Main Puzzle Card */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-subtle space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Daily Brain Spark • {puzzle.dateKey}
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-brand-navy dark:text-white">
                {puzzle.title[lang] || puzzle.title.en}
              </h2>
            </div>
          </div>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
        </div>

        {/* Puzzle Question */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-brand-dark-card border border-slate-200/80 dark:border-slate-800/80">
          <p className="text-sm sm:text-base font-medium text-brand-navy dark:text-slate-100 leading-relaxed">
            {puzzle.question[lang] || puzzle.question.en}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {puzzle.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === puzzle.correctOptionId;

            let btnStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60';
            if (selectedOption) {
              if (isSelected && isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold';
              } else if (isCorrect && showExplanation) {
                btnStyle = 'border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/30';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.text[lang] || opt.text.en}</span>
                {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
              </button>
            );
          })}
        </div>

        {/* Hint Accordion */}
        <div className="space-y-2 pt-2">
          {!showHint ? (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{t.common.hint}</span>
            </button>
          ) : (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Hint:</strong> {puzzle.hint[lang] || puzzle.hint.en}
              </div>
            </div>
          )}
        </div>

        {/* Explanation & Answer Reveal */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
            <h4 className="font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-brand-accent" />
              <span>Answer Explanation</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {puzzle.explanation[lang] || puzzle.explanation.en}
            </p>
          </div>
        )}

        {/* Reset / Play Again Control */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-navy dark:hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.common.restart}</span>
          </button>

          <Link
            to="/play"
            className="px-4 py-2 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-light"
          >
            Back to Play Hub
          </Link>
        </div>
      </div>
    </div>
  );
};
