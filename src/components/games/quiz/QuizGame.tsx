'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import { QuizGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { GameProgress } from '../shared/GameProgress';

interface QuizGameProps {
  config: QuizGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

/**
 * Quiz Game Component
 * General knowledge quiz with multiple choice questions
 */
export function QuizGame({ config, onComplete, backUrl }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(config.questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = config.questions[currentQuestionIndex];
  const totalQuestions = config.questions.length;
  const passingScore = config.passingScore ?? 70;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      answers.forEach((ans, idx) => {
        if (ans === config.questions[idx].correctAnswer) correctCount++;
      });
      const finalScore = Math.round((correctCount / totalQuestions) * 100);
      setScore(finalScore);
      setShowResult(true);
      
      // Call completion callback
      setTimeout(() => {
        onComplete({ 
          score: finalScore,
          attempts: totalQuestions 
        });
      }, 2000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(config.questions.length).fill(-1));
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const correctAnswers = answers.filter((ans, idx) => ans === config.questions[idx].correctAnswer).length;
    
    return (
      <GameComplete 
        score={correctAnswers}
        totalQuestions={totalQuestions}
        percentage={score}
        message={score >= passingScore ? 'כל הכבוד! עברת את הבוחן!' : 'לא נורא, נסה שוב!'}
        onRetry={resetQuiz}
        showRetry={true}
      />
    );
  }

  const currentAnswer = answers[currentQuestionIndex];
  const hasAnswered = currentAnswer !== -1;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Progress Bar */}
          <GameProgress 
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            label="שאלה"
          />

          {/* Question Card */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl border-2 border-purple-500/30 p-8 shadow-2xl mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <HelpCircle size={24} className="text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">{config.title}</h2>
            </div>
            
            <p className="text-xl text-slate-300 mb-8 text-center font-medium" dir="rtl">
              {question.question}
            </p>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {question.options.map((option, index) => {
                const isSelected = currentAnswer === index;
                const isCorrect = index === question.correctAnswer;
                
                let buttonClass = "p-6 rounded-2xl border-2 font-bold text-lg transition-all transform hover:scale-105 text-right ";

                if (isSelected) {
                  buttonClass += "bg-blue-500/30 border-blue-500 text-blue-100 ";
                } else {
                  buttonClass += "bg-slate-700/50 border-slate-600 text-white hover:border-purple-500 hover:bg-purple-500/20 ";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected && (
                        <CheckCircle size={24} className="text-blue-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation (if answered and available) */}
            {hasAnswered && question.explanation && (
              <div className="p-4 rounded-xl bg-blue-500/20 border-2 border-blue-500/50 mb-6">
                <p className="text-blue-200 text-sm" dir="rtl">
                  💡 {question.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={clsx(
                "w-full px-6 py-4 rounded-xl font-bold text-lg transition-all",
                hasAnswered
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              )}
            >
              {isLastQuestion ? 'סיים' : 'שאלה הבאה'}
            </button>
          </div>
        </div>
      </div>
    </GameContainer>
  );
}

