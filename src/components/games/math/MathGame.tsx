'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Target } from 'lucide-react';
import clsx from 'clsx';
import { MathGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { GameProgress } from '../shared/GameProgress';

interface MathGameProps {
  config: MathGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

/**
 * Math Game Component
 * Interactive math questions with multiple choice answers
 */
export function MathGame({ config, onComplete, backUrl }: MathGameProps) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = config.questions;
  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQ.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsComplete(true);
        const finalScore = correct ? score + 1 : score;
        setTimeout(() => {
          onComplete({ 
            score: finalScore,
            attempts: totalQuestions 
          });
        }, 2000);
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setIsComplete(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (isComplete) {
    return (
      <GameComplete 
        score={score}
        totalQuestions={totalQuestions}
        onRetry={resetGame}
        showRetry={true}
      />
    );
  }

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Progress Bar */}
          <GameProgress 
            current={currentQuestion + 1}
            total={totalQuestions}
            score={score}
          />

          {/* Question Card */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl border-2 border-blue-500/30 p-8 shadow-2xl mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <Target size={24} className="text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">{config.title}</h2>
            </div>
            
            <p className="text-xl text-slate-300 mb-8 text-center font-medium" dir="rtl">
              {currentQ.question.split(/(\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*)/g).map((part, idx) => {
                // Check if this part is a math expression
                const isMath = /^\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*$/.test(part);
                if (isMath) {
                  return <span key={idx} dir="ltr" style={{ unicodeBidi: 'embed', display: 'inline-block' }}>{part}</span>;
                }
                return <span key={idx}>{part}</span>;
              })}
            </p>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQ.correct;
                let buttonClass = "p-6 rounded-2xl border-2 font-bold text-lg transition-all transform hover:scale-105 ";

                if (showFeedback) {
                  if (isCorrectAnswer) {
                    buttonClass += "bg-green-500/30 border-green-500 text-green-100 ";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass += "bg-red-500/30 border-red-500 text-red-100 ";
                  } else {
                    buttonClass += "bg-slate-700/50 border-slate-600 text-slate-400 ";
                  }
                } else {
                  buttonClass += isSelected
                    ? "bg-blue-500/30 border-blue-500 text-blue-100 "
                    : "bg-slate-700/50 border-slate-600 text-white hover:border-blue-500 hover:bg-blue-500/20 ";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {showFeedback && isCorrectAnswer && isSelected && (
                        <CheckCircle size={24} className="text-green-400" />
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <XCircle size={24} className="text-red-400" />
                      )}
                      <span dir={/^\d+$/.test(option) || /^\d+\.\d+$/.test(option) ? "ltr" : "auto"} style={/^\d+$/.test(option) || /^\d+\.\d+$/.test(option) ? { unicodeBidi: 'embed' } : {}}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={clsx(
                "mt-6 p-4 rounded-xl border-2 flex items-start gap-3 animate-fade-in",
                isCorrect ? "bg-green-500/20 border-green-500/50" : "bg-red-500/20 border-red-500/50"
              )}>
                {isCorrect ? (
                  <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle size={24} className="text-red-400 flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className={clsx("font-bold mb-1", isCorrect ? "text-green-300" : "text-red-300")}>
                    {isCorrect ? 'נכון! 🎉' : 'לא נכון 😔'}
                  </p>
                  <p className={clsx("text-sm", isCorrect ? "text-green-200" : "text-red-200")} dir="rtl">
                    {currentQ.explanation.split(/(\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*)/g).map((part, idx) => {
                      // Check if this part is a math expression
                      const isMath = /^\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*$/.test(part);
                      if (isMath) {
                        return <span key={idx} dir="ltr" style={{ unicodeBidi: 'embed', display: 'inline-block' }}>{part}</span>;
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GameContainer>
  );
}

