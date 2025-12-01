'use client';

import { useState, useEffect, useCallback } from 'react';
import { MathRaceGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { Clock, Zap } from 'lucide-react';
import clsx from 'clsx';

interface MathRaceGameProps {
  config: MathRaceGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

/**
 * Math Race Game - Speed math challenge
 * Students solve math problems against the clock
 */
export function MathRaceGame({ config, onComplete, backUrl }: MathRaceGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit || 60);
  const [isComplete, setIsComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [questions, setQuestions] = useState<Array<{ question: string, answer: number }>>([]);

  // Generate random questions
  useEffect(() => {
    const generated = [];
    for (let i = 0; i < config.questionsCount; i++) {
      const { min, max } = config.numberRange;
      const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
      const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
      
      let question = '';
      let answer = 0;
      
      switch (config.operation) {
        case 'addition':
          question = `${num1} + ${num2}`;
          answer = num1 + num2;
          break;
        case 'subtraction':
          question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
          answer = Math.max(num1, num2) - Math.min(num1, num2);
          break;
        case 'multiplication':
          question = `${num1} × ${num2}`;
          answer = num1 * num2;
          break;
        case 'division':
          const product = num1 * num2;
          question = `${product} ÷ ${num1}`;
          answer = num2;
          break;
      }
      
      generated.push({ question, answer });
    }
    setQuestions(generated);
  }, [config]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete({ score, attempts: config.questionsCount, timeSpent: config.timeLimit });
      }, 2000);
    }
  }, [timeLeft, isComplete, score, config, onComplete]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer || !questions[currentQuestion]) return;

    const correct = parseInt(userAnswer) === questions[currentQuestion].answer;
    if (correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
    } else {
      setIsComplete(true);
      setTimeout(() => {
        onComplete({ 
          score: correct ? score + 1 : score, 
          attempts: config.questionsCount,
          timeSpent: (config.timeLimit || 60) - timeLeft
        });
      }, 1000);
    }
  }, [userAnswer, questions, currentQuestion, score, config, timeLeft, onComplete]);

  if (isComplete) {
    const percentage = Math.round((score / config.questionsCount) * 100);
    return <GameComplete score={score} totalQuestions={config.questionsCount} percentage={percentage} />;
  }

  if (questions.length === 0) {
    return <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">טוען משחק...</div>;
  }

  const currentQ = questions[currentQuestion];

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Timer & Score */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 bg-blue-900/40 px-6 py-3 rounded-xl border border-blue-500/30">
              <Clock size={24} className="text-blue-400" />
              <span className={clsx("text-2xl font-black", timeLeft < 10 ? "text-red-400 animate-pulse" : "text-blue-300")} dir="ltr">
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-3 bg-green-900/40 px-6 py-3 rounded-xl border border-green-500/30">
              <Zap size={24} className="text-green-400" />
              <span className="text-2xl font-black text-green-300" dir="ltr">
                {score}/{currentQuestion + 1}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl border-2 border-purple-500/30 p-12 shadow-2xl">
            <div className="text-center mb-8">
              <p className="text-slate-400 mb-2">שאלה {currentQuestion + 1} מתוך {config.questionsCount}</p>
              <p className="text-6xl font-black text-white mb-6" dir="ltr">
                {currentQ.question}
              </p>
            </div>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                autoFocus
                placeholder="?"
                dir="ltr"
                className="w-full max-w-xs text-center text-4xl font-black bg-slate-900 border-2 border-blue-500/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xl rounded-xl transition-all transform hover:scale-105"
              >
                שלח תשובה ⚡
              </button>
            </form>

            {/* Progress Bar */}
            <div className="mt-8 w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / config.questionsCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </GameContainer>
  );
}
