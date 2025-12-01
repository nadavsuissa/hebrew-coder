'use client';

import { useState, useEffect, useCallback } from 'react';
import { MathRaceGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { Clock, Zap, Flame, Trophy, Heart, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface MathRaceGameProps {
  config: MathRaceGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

/**
 * Math Race Game - Professional Speed Math Challenge
 * Multi-level, combo system, power-ups, achievements!
 */
export function MathRaceGame({ config, onComplete, backUrl }: MathRaceGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit || 60);
  const [isComplete, setIsComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [questions, setQuestions] = useState<Array<{ question: string, answer: number }>>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [bonusTime, setBonusTime] = useState(0);

  // Generate random questions with progressive difficulty
  useEffect(() => {
    const generated = [];
    for (let i = 0; i < config.questionsCount; i++) {
      const { min, max } = config.numberRange;
      // Progressive difficulty: later questions use larger numbers
      const difficultyMultiplier = 1 + (i / config.questionsCount);
      const adjustedMax = Math.min(max, Math.floor(max * difficultyMultiplier));
      
      const num1 = Math.floor(Math.random() * (adjustedMax - min + 1)) + min;
      const num2 = Math.floor(Math.random() * (adjustedMax - min + 1)) + min;
      
      let question = '';
      let answer = 0;
      
      switch (config.operation) {
        case 'addition':
          question = `${num1} + ${num2}`;
          answer = num1 + num2;
          break;
        case 'subtraction':
          const larger = Math.max(num1, num2);
          const smaller = Math.min(num1, num2);
          question = `${larger} - ${smaller}`;
          answer = larger - smaller;
          break;
        case 'multiplication':
          question = `${num1} × ${num2}`;
          answer = num1 * num2;
          break;
        case 'division':
          const product = num1 * Math.max(2, Math.floor(num2 / 2));
          question = `${product} ÷ ${num1}`;
          answer = Math.floor(product / num1);
          break;
      }
      
      generated.push({ question, answer });
    }
    setQuestions(generated);
  }, [config]);

  // Timer countdown with bonus time
  useEffect(() => {
    if (timeLeft > 0 && !isComplete && questions.length > 0) {
      const timer = setTimeout(() => {
        if (bonusTime > 0) {
          setBonusTime(bonusTime - 1);
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && lives === 0) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete({ 
          score, 
          attempts: config.questionsCount, 
          timeSpent: (config.timeLimit || 60) - timeLeft 
        });
      }, 2000);
    }
  }, [timeLeft, bonusTime, isComplete, questions, lives, score, config, onComplete]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer || !questions[currentQuestion] || showFeedback) return;

    const correct = parseInt(userAnswer) === questions[currentQuestion].answer;
    setLastCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      // Correct answer!
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
      setScore(score + 1);
      setPerfectStreak(perfectStreak + 1);
      
      // Bonus rewards
      if (newCombo >= 3) {
        setBonusTime(bonusTime + 2); // +2 seconds for 3+ combo
      }
      if (newCombo >= 5) {
        setLives(Math.min(3, lives + 1)); // Extra life at 5 combo
      }
    } else {
      // Wrong answer
      setCombo(0);
      setPerfectStreak(0);
      setLives(lives - 1);
      
      if (lives - 1 === 0) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete({ 
            score, 
            attempts: currentQuestion + 1, 
            timeSpent: (config.timeLimit || 60) - timeLeft 
          });
        }, 2000);
        return;
      }
    }

    // Move to next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowFeedback(false);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onComplete({ 
            score: score + (correct ? 1 : 0),
            attempts: config.questionsCount,
            timeSpent: (config.timeLimit || 60) - timeLeft,
            perfectScore: score + (correct ? 1 : 0) === config.questionsCount
          });
        }, 2000);
      }
    }, 1500);
  }, [userAnswer, questions, currentQuestion, score, combo, maxCombo, lives, bonusTime, perfectStreak, timeLeft, config, onComplete, showFeedback]);

  if (isComplete) {
    const percentage = Math.round((score / config.questionsCount) * 100);
    return (
      <GameComplete 
        score={score} 
        totalQuestions={config.questionsCount} 
        percentage={percentage}
        message={percentage >= 90 ? 'מהירות על! 🏃⚡' : percentage >= 70 ? 'כל הכבוד!' : 'תרגל עוד!'}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-blue-400 font-mono font-bold text-xl animate-pulse">מכין שאלות...</div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / config.questionsCount) * 100;

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        
        {/* Speed lines effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{ 
                top: `${(i * 5)}%`,
                width: '200%',
                left: '-100%'
              }}
              animate={{ x: ['0%', '100%'] }}
              transition={{ 
                duration: 2 - (i * 0.05),
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl w-full relative z-10">
          {/* Top HUD */}
          <div className="flex items-center justify-between mb-6">
            {/* Timer */}
            <motion.div 
              className={clsx(
                "flex items-center gap-3 px-6 py-4 rounded-2xl border-2 backdrop-blur",
                timeLeft < 10 ? "bg-red-900/40 border-red-500/50" : "bg-blue-900/40 border-blue-500/30"
              )}
              animate={timeLeft < 10 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: timeLeft < 10 ? Infinity : 0, duration: 0.5 }}
            >
              <Clock size={28} className={timeLeft < 10 ? "text-red-400" : "text-blue-400"} />
              <div>
                <div className="text-xs text-slate-400">זמן</div>
                <div className={clsx("text-3xl font-black", timeLeft < 10 ? "text-red-300" : "text-blue-300")} dir="ltr">
                  {timeLeft + bonusTime}s
                </div>
                {bonusTime > 0 && (
                  <div className="text-xs text-green-400">+{bonusTime}s בונוס!</div>
                )}
              </div>
            </motion.div>

            {/* Combo Meter */}
            <motion.div 
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-orange-900/40 border-2 border-orange-500/30 backdrop-blur"
              animate={combo >= 3 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Flame size={28} className={combo >= 5 ? "text-red-500" : combo >= 3 ? "text-orange-400" : "text-yellow-400"} />
              <div>
                <div className="text-xs text-slate-400">קומבו</div>
                <div className={clsx(
                  "text-3xl font-black",
                  combo >= 5 ? "text-red-400" : combo >= 3 ? "text-orange-400" : "text-yellow-300"
                )} dir="ltr">
                  {combo}x
                  {combo >= 5 && "🔥"}
                </div>
              </div>
            </motion.div>

            {/* Lives */}
            <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-red-900/40 border-2 border-red-500/30 backdrop-blur">
              {[...Array(3)].map((_, i) => (
                <Heart 
                  key={i}
                  size={24} 
                  className={i < lives ? "text-red-500" : "text-slate-700"}
                  fill={i < lives ? "currentColor" : "none"}
                />
              ))}
            </div>

            {/* Score */}
            <motion.div 
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-900/40 border-2 border-green-500/30 backdrop-blur"
              animate={lastCorrect === true ? { scale: [1, 1.2, 1] } : {}}
            >
              <Trophy size={28} className="text-green-400" />
              <div>
                <div className="text-xs text-slate-400">ניקוד</div>
                <div className="text-3xl font-black text-green-300" dir="ltr">
                  {score}/{currentQuestion + 1}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-3xl border-2 border-purple-500/40 p-12 shadow-2xl backdrop-blur"
            >
              {/* Question number */}
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-2 bg-purple-500/20 rounded-full border border-purple-500/50">
                  <span className="text-purple-300 font-bold">
                    שאלה {currentQuestion + 1} מתוך {config.questionsCount}
                  </span>
                </div>
              </div>

              {/* The Question */}
              <motion.div 
                className="text-center mb-12"
                animate={combo >= 3 ? { 
                  textShadow: ["0 0 20px #ff6b35", "0 0 40px #ff6b35", "0 0 20px #ff6b35"]
                } : {}}
                transition={{ repeat: combo >= 3 ? Infinity : 0, duration: 1 }}
              >
                <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4" dir="ltr">
                  {currentQ.question}
                </p>
                <p className="text-6xl font-black text-white" dir="ltr">=  ?</p>
              </motion.div>

              {/* Answer Input */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    autoFocus
                    disabled={showFeedback}
                    placeholder="התשובה שלך..."
                    dir="ltr"
                    className={clsx(
                      "w-full text-center text-6xl font-black rounded-3xl px-8 py-6 transition-all",
                      "bg-slate-900/80 border-4 text-white",
                      "focus:outline-none focus:ring-4",
                      showFeedback && lastCorrect 
                        ? "border-green-500 ring-green-500/50 bg-green-900/30"
                        : showFeedback && !lastCorrect
                        ? "border-red-500 ring-red-500/50 bg-red-900/30 shake"
                        : "border-blue-500/50 focus:border-purple-500 focus:ring-purple-500/30"
                    )}
                  />
                  {combo >= 3 && !showFeedback && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      🔥 COMBO x{combo}!
                    </motion.div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={!userAnswer || showFeedback}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    "w-full py-6 rounded-2xl font-black text-2xl transition-all shadow-xl",
                    !userAnswer || showFeedback
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : combo >= 5
                      ? "bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white animate-pulse"
                      : combo >= 3
                      ? "bg-gradient-to-r from-orange-600 to-yellow-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  )}
                >
                  {combo >= 5 ? "🔥 MEGA COMBO! שלח! 🔥" : "שלח תשובה ⚡"}
                </motion.button>
              </form>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={clsx(
                      "mt-6 p-6 rounded-2xl border-2 flex items-center gap-4",
                      lastCorrect ? "bg-green-500/20 border-green-500/50" : "bg-red-500/20 border-red-500/50"
                    )}
                  >
                    {lastCorrect ? (
                      <>
                        <CheckCircle size={40} className="text-green-400" />
                        <div>
                          <p className="text-green-300 font-black text-2xl">
                            {combo >= 5 ? "🔥 FIRE! מדהים!" : combo >= 3 ? "⚡ COMBO! נהדר!" : "✅ נכון!"}
                          </p>
                          {combo >= 3 && <p className="text-green-200 text-sm">+2 שניות בונוס!</p>}
                          {combo >= 5 && <p className="text-yellow-200 text-sm">+חיים נוסף!</p>}
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle size={40} className="text-red-400" />
                        <div>
                          <p className="text-red-300 font-black text-2xl">לא נכון 😔</p>
                          <p className="text-red-200">התשובה הנכונה: <span className="font-black" dir="ltr">{currentQ.answer}</span></p>
                          <p className="text-red-200 text-sm">-1 חיים | הקומבו איפס</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div 
            className="mt-6 h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          >
            <motion.div
              className={clsx(
                "h-full transition-all duration-500",
                combo >= 5 ? "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" :
                combo >= 3 ? "bg-gradient-to-r from-orange-500 to-yellow-500" :
                "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
              )}
              style={{ width: `${progress}%` }}
              animate={combo >= 3 ? { opacity: [0.8, 1, 0.8] } : {}}
              transition={{ repeat: combo >= 3 ? Infinity : 0, duration: 1 }}
            />
          </motion.div>

          {/* Tips */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center text-sm"
          >
            <div className="bg-blue-900/30 rounded-xl p-3 border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-1">💡 טיפ</div>
              <div className="text-blue-200 text-xs">3+ קומבו = בונוס זמן!</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-3 border border-purple-500/30">
              <div className="text-purple-300 font-bold mb-1">🏆 שיא</div>
              <div className="text-purple-200 text-xs">קומבו מקסימלי: {maxCombo}</div>
            </div>
            <div className="bg-green-900/30 rounded-xl p-3 border border-green-500/30">
              <div className="text-green-300 font-bold mb-1">⚡ רצף</div>
              <div className="text-green-200 text-xs">רצף מושלם: {perfectStreak}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </GameContainer>
  );
}
