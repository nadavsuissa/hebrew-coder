'use client';

import { useState } from 'react';
import { FractionPizzaGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface FractionPizzaGameProps {
  config: FractionPizzaGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

/**
 * Fraction Pizza Game - Visual fraction learning
 * Students learn fractions by seeing pizza slices
 */
export function FractionPizzaGame({ config, onComplete, backUrl }: FractionPizzaGameProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === config.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      if (correct) {
        onComplete({ score: 100, perfectScore: true });
      }
    }, 2000);
  };

  const resetGame = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  if (showFeedback && isCorrect) {
    return <GameComplete score={100} totalQuestions={1} onRetry={resetGame} />;
  }

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍕</div>
            <h1 className="text-4xl font-black text-white mb-2">{config.title}</h1>
            <p className="text-xl text-slate-300" dir="rtl">{config.description}</p>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-3xl border-2 border-orange-500/30 p-8 shadow-2xl mb-6">
            <p className="text-2xl text-white text-center mb-8 font-bold" dir="rtl">
              {config.question}
            </p>

            {/* Pizza visualizations for each fraction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {config.fractions.map((fraction, index) => {
                const slices = fraction.denominator;
                const filled = fraction.numerator;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    {/* Pizza SVG */}
                    <div className="relative w-48 h-48 mb-4">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="#FFA500" opacity="0.2" stroke="#FFA500" strokeWidth="2" />
                        {Array.from({ length: slices }).map((_, i) => {
                          const angle = (360 / slices) * i;
                          const nextAngle = (360 / slices) * (i + 1);
                          const isFilled = i < filled;
                          
                          // Convert to radians
                          const rad1 = (angle - 90) * (Math.PI / 180);
                          const rad2 = (nextAngle - 90) * (Math.PI / 180);
                          
                          const x1 = 50 + 45 * Math.cos(rad1);
                          const y1 = 50 + 45 * Math.sin(rad1);
                          const x2 = 50 + 45 * Math.cos(rad2);
                          const y2 = 50 + 45 * Math.sin(rad2);
                          
                          return (
                            <g key={i}>
                              <path
                                d={`M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`}
                                fill={isFilled ? "#FF6B35" : "transparent"}
                                stroke="#FFA500"
                                strokeWidth="1.5"
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                    
                    {/* Fraction label */}
                    <div className="text-center">
                      <div className="text-4xl font-black text-orange-300 mb-2" dir="ltr">
                        {fraction.numerator}/{fraction.denominator}
                      </div>
                      <button
                        onClick={() => handleAnswer(index)}
                        disabled={showFeedback}
                        className={clsx(
                          "px-8 py-4 rounded-xl font-bold text-lg transition-all transform",
                          selectedAnswer === index
                            ? "bg-blue-600 text-white scale-105"
                            : "bg-slate-700 text-white hover:bg-blue-500 hover:scale-105"
                        )}
                      >
                        בחר שבר זה
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={clsx(
                "mt-6 p-6 rounded-xl border-2 flex items-start gap-3 animate-fade-in",
                isCorrect ? "bg-green-500/20 border-green-500/50" : "bg-red-500/20 border-red-500/50"
              )}>
                {isCorrect ? (
                  <CheckCircle size={32} className="text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle size={32} className="text-red-400 flex-shrink-0" />
                )}
                <div>
                  <p className={clsx("font-bold text-xl mb-2", isCorrect ? "text-green-300" : "text-red-300")}>
                    {isCorrect ? '🎉 מעולה! תשובה נכונה!' : '😔 לא נכון, נסה שוב'}
                  </p>
                  {!isCorrect && (
                    <button
                      onClick={resetGame}
                      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                    >
                      נסה שוב
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GameContainer>
  );
}
