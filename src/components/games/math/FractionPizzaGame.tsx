'use client';

import { useState, useEffect } from 'react';
import { FractionPizzaGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { GameProgress } from '../shared/GameProgress';
import { CheckCircle, XCircle, Pizza, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface FractionPizzaGameProps {
  config: FractionPizzaGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

// Generate multiple fraction comparison questions
const generateQuestions = () => {
  return [
    {
      fractions: [{ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 4 }],
      question: 'איזה שבר גדול יותר?',
      correctAnswer: 0,
      explanation: '1/2 (חצי) גדול מ-1/4 (רבע). כשהמכנה קטן יותר, החתיכות גדולות יותר!'
    },
    {
      fractions: [{ numerator: 2, denominator: 3 }, { numerator: 3, denominator: 4 }],
      question: 'איזה שבר קרוב יותר לשלם (1)?',
      correctAnswer: 1,
      explanation: '3/4 קרוב יותר לשלם! חסרה רק רבע אחד, בעוד ש-2/3 חסר שליש שלם.'
    },
    {
      fractions: [{ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 6 }],
      question: 'איזה שבר גדול יותר?',
      correctAnswer: 0,
      explanation: '1/3 גדול מ-1/6. חילקנו ל-3 חלקים במקום 6, אז כל חלק גדול יותר!'
    },
    {
      fractions: [{ numerator: 3, denominator: 8 }, { numerator: 5, denominator: 8 }],
      question: 'איזה שבר גדול יותר? (שימו לב למכנים!)',
      correctAnswer: 1,
      explanation: '5/8 גדול מ-3/8. כשהמכנה זהה, פשוט משווים את המונים: 5 > 3'
    },
    {
      fractions: [{ numerator: 2, denominator: 5 }, { numerator: 3, denominator: 10 }],
      question: 'איזה שבר גדול יותר?',
      correctAnswer: 0,
      explanation: '2/5 = 4/10, ו-4/10 גדול מ-3/10. לכן 2/5 גדול!'
    },
    {
      fractions: [{ numerator: 5, denominator: 6 }, { numerator: 7, denominator: 8 }],
      question: 'איזה שבר הכי קרוב ל-1?',
      correctAnswer: 1,
      explanation: '7/8 חסר רק 1/8 כדי להגיע לשלם, בעוד ש-5/6 חסר 1/6 (יותר גדול)!'
    },
    {
      fractions: [{ numerator: 1, denominator: 4 }, { numerator: 2, denominator: 8 }],
      question: 'האם השברים שווים?',
      correctAnswer: 0,
      explanation: 'כן! 1/4 = 2/8. אלה שברים שקולים - אותו הערך בדיוק!'
    },
    {
      fractions: [{ numerator: 3, denominator: 5 }, { numerator: 1, denominator: 2 }],
      question: 'איזה שבר גדול יותר?',
      correctAnswer: 0,
      explanation: '3/5 = 0.6 ו-1/2 = 0.5, לכן 3/5 גדול יותר!'
    }
  ];
};

/**
 * Fraction Pizza Game - Advanced Visual Fraction Learning
 * Multi-level, animated, highly engaging!
 */
export function FractionPizzaGame({ config, onComplete, backUrl }: FractionPizzaGameProps) {
  const [questions] = useState(generateQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [stars, setStars] = useState(0);

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === currentQ.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const earnedStars = hintUsed ? 2 : 3; // Fewer stars if used hint
      setScore(score + 1);
      setStars(stars + earnedStars);
    }

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setHintUsed(false);
        setShowHint(false);
      } else {
        // Game complete!
        setTimeout(() => {
          onComplete({ 
            score, 
            attempts: totalQuestions,
            perfectScore: score === totalQuestions,
            starsEarned: stars
          });
        }, 2000);
      }
    }, 3000);
  };

  const PizzaSlice = ({ fraction, index, isAnswer }: { fraction: { numerator: number, denominator: number }, index: number, isAnswer: boolean }) => {
    const slices = fraction.denominator;
    const filled = fraction.numerator;
    const isSelected = selectedAnswer === index;
    const isCorrectAnswer = index === currentQ.correctAnswer;
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8, delay: index * 0.2 }}
        className="flex flex-col items-center"
      >
        {/* Pizza SVG - Larger and more detailed */}
        <div className={clsx(
          "relative w-64 h-64 mb-6 transition-all duration-300",
          isSelected && "scale-110"
        )}>
          {/* Plate shadow */}
          <div className="absolute inset-0 bg-slate-900/50 rounded-full blur-xl transform translate-y-4" />
          
          {/* Pizza */}
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            {/* Outer crust */}
            <circle cx="50" cy="50" r="48" fill="#D2691E" />
            
            {/* Pizza base */}
            <circle cx="50" cy="50" r="45" fill="#FFD700" />
            
            {/* Sauce layer */}
            <circle cx="50" cy="50" r="43" fill="#FF4500" opacity="0.6" />
            
            {/* Slices */}
            {Array.from({ length: slices }).map((_, i) => {
              const angle = (360 / slices) * i;
              const nextAngle = (360 / slices) * (i + 1);
              const isFilled = i < filled;
              
              const rad1 = (angle - 90) * (Math.PI / 180);
              const rad2 = (nextAngle - 90) * (Math.PI / 180);
              
              const x1 = 50 + 43 * Math.cos(rad1);
              const y1 = 50 + 43 * Math.sin(rad1);
              const x2 = 50 + 43 * Math.cos(rad2);
              const y2 = 50 + 43 * Math.sin(rad2);
              
              return (
                <g key={i}>
                  {/* Slice path */}
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 43 43 0 0 1 ${x2} ${y2} Z`}
                    fill={isFilled ? "#FF6B35" : "rgba(255,215,0,0.3)"}
                    stroke="#8B4513"
                    strokeWidth="1"
                  />
                  
                  {/* Cheese effect on filled slices */}
                  {isFilled && (
                    <>
                      <path
                        d={`M 50 50 L ${x1} ${y1} A 43 43 0 0 1 ${x2} ${y2} Z`}
                        fill="url(#cheeseGradient)"
                        opacity="0.4"
                      />
                      {/* Pepperoni */}
                      <circle
                        cx={50 + 25 * Math.cos((angle + 360/(slices*2) - 90) * Math.PI / 180)}
                        cy={50 + 25 * Math.sin((angle + 360/(slices*2) - 90) * Math.PI / 180)}
                        r="3"
                        fill="#8B0000"
                      />
                    </>
                  )}
                </g>
              );
            })}
            
            {/* Cheese gradient definition */}
            <defs>
              <radialGradient id="cheeseGradient">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </radialGradient>
            </defs>
            
            {/* Center cheese circle */}
            <circle cx="50" cy="50" r="8" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
          </svg>
          
          {/* Glow effect for selected */}
          {isSelected && (
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
        
        {/* Fraction Display */}
        <motion.div
          className={clsx(
            "text-6xl font-black mb-4 transition-colors",
            isSelected ? "text-blue-400" : "text-orange-300"
          )}
          dir="ltr"
          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isSelected ? Infinity : 0, duration: 1 }}
        >
          {fraction.numerator}/{fraction.denominator}
        </motion.div>

        {/* Decimal equivalent */}
        <div className="text-sm text-slate-400 mb-4" dir="ltr">
          = {(fraction.numerator / fraction.denominator).toFixed(3)}
        </div>
        
        {/* Select Button */}
        <motion.button
          onClick={() => handleAnswer(index)}
          disabled={showFeedback}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={clsx(
            "px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg",
            showFeedback && isCorrectAnswer
              ? "bg-green-600 text-white ring-4 ring-green-400/50"
              : showFeedback && isSelected && !isCorrectAnswer
              ? "bg-red-600 text-white ring-4 ring-red-400/50"
              : isSelected
              ? "bg-blue-600 text-white"
              : "bg-orange-600 hover:bg-orange-500 text-white"
          )}
        >
          {showFeedback && isCorrectAnswer && isSelected && (
            <span className="flex items-center gap-2">
              <CheckCircle size={20} /> נכון!
            </span>
          )}
          {showFeedback && isSelected && !isCorrectAnswer && (
            <span className="flex items-center gap-2">
              <XCircle size={20} /> לא נכון
            </span>
          )}
          {!showFeedback && (selectedAnswer === index ? 'נבחר!' : 'בחר שבר זה')}
        </motion.button>
      </motion.div>
    );
  };

  if (score === totalQuestions || (showFeedback && isCorrect && currentQuestion === totalQuestions - 1)) {
    return (
      <GameComplete 
        score={score}
        totalQuestions={totalQuestions}
        message={score === totalQuestions ? 'אלוף השברים! 🍕👑' : 'כל הכבוד!'}
        onRetry={() => {
          setCurrentQuestion(0);
          setScore(0);
          setSelectedAnswer(null);
          setShowFeedback(false);
          setStars(0);
        }}
      />
    );
  }

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated background pizzas */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{ x: Math.random() * window.innerWidth, y: -100 }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: 360,
                x: Math.random() * window.innerWidth
              }}
              transition={{ 
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2
              }}
            >
              🍕
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl w-full relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Pizza size={48} className="text-orange-400" />
              <h1 className="text-5xl font-black text-white">פיצה של שברים!</h1>
              <Pizza size={48} className="text-orange-400" />
            </div>
            <p className="text-xl text-slate-300">למד להשוות שברים בצורה הכי טעימה שיש! 🍕</p>
          </motion.div>

          {/* Progress & Stars */}
          <div className="flex items-center justify-between mb-8">
            <GameProgress 
              current={currentQuestion + 1}
              total={totalQuestions}
              score={score}
            />
            <div className="flex items-center gap-2 bg-yellow-900/40 px-6 py-3 rounded-xl border border-yellow-500/30">
              <Star size={24} className="text-yellow-400" fill="currentColor" />
              <span className="text-2xl font-black text-yellow-300">{stars}</span>
            </div>
          </div>

          {/* Question Card */}
          <motion.div 
            key={currentQuestion}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl border-2 border-orange-500/30 p-8 shadow-2xl"
          >
            {/* Question */}
            <div className="text-center mb-8">
              <p className="text-3xl font-bold text-white mb-4" dir="rtl">
                {currentQ.question}
              </p>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-4 mb-4"
                >
                  <div className="flex items-center gap-2 justify-center text-yellow-300">
                    <Sparkles size={20} />
                    <span className="font-bold">רמז:</span>
                  </div>
                  <p className="text-yellow-200 text-sm mt-2">
                    השווה את המכנים - מכנה קטן יותר = חתיכות גדולות יותר!
                  </p>
                </motion.div>
              )}
              {!showFeedback && !showHint && (
                <button
                  onClick={() => { setShowHint(true); setHintUsed(true); }}
                  className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                >
                  💡 צריך רמז?
                </button>
              )}
            </div>

            {/* Pizza Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <AnimatePresence>
                {currentQ.fractions.map((fraction, index) => (
                  <PizzaSlice 
                    key={index} 
                    fraction={fraction} 
                    index={index}
                    isAnswer={selectedAnswer === index}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={clsx(
                    "p-6 rounded-2xl border-2 flex items-start gap-4",
                    isCorrect ? "bg-green-500/20 border-green-500/50" : "bg-red-500/20 border-red-500/50"
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle size={32} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle size={32} className="text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={clsx("font-black text-2xl mb-2", isCorrect ? "text-green-300" : "text-red-300")}>
                      {isCorrect ? '🎉 מעולה! תשובה נכונה!' : '😔 אופס, לא הפעם...'}
                    </p>
                    <p className="text-lg text-slate-200" dir="rtl">
                      {currentQ.explanation}
                    </p>
                    {isCorrect && !hintUsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 flex items-center gap-2 text-yellow-400"
                      >
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                        <span className="font-bold">+3 כוכבים!</span>
                      </motion.div>
                    )}
                    {isCorrect && hintUsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 flex items-center gap-2 text-yellow-400"
                      >
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                        <span className="font-bold">+2 כוכבים (השתמשת ברמז)</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next question indicator */}
            {showFeedback && currentQuestion < totalQuestions - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-6 text-blue-400 font-bold"
              >
                שאלה הבאה בעוד {3} שניות...
              </motion.div>
            )}
          </motion.div>

          {/* Fun Facts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-blue-900/30 rounded-xl p-4 border border-blue-500/30"
          >
            <p className="text-blue-200 text-sm text-center">
              <strong>ידעתם?</strong> הפיצה הראשונה נוצרה באיטליה במאה ה-18! 🇮🇹
            </p>
          </motion.div>
        </div>
      </div>
    </GameContainer>
  );
}
