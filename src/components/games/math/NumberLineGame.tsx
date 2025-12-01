'use client';

import { useState } from 'react';
import { NumberLineGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';
import { GameComplete } from '../shared/GameComplete';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle, XCircle, Lightbulb, Rocket } from 'lucide-react';
import clsx from 'clsx';

interface NumberLineGameProps {
  config: NumberLineGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

// Generate challenging number line levels
const generateLevels = (config: NumberLineGameConfig) => {
  return [
    {
      start: 0,
      end: 10,
      target: 5,
      operations: [{ operator: '+' as const, value: 5 }],
      question: 'קפוץ ל-5 על הקו',
      hint: 'התחל מ-0, קפוץ +5'
    },
    {
      start: 0,
      end: 20,
      target: 15,
      operations: [{ operator: '+' as const, value: 10 }, { operator: '+' as const, value: 5 }],
      question: 'הגע ל-15 עם שתי קפיצות',
      hint: 'קפוץ +10 ואז +5'
    },
    {
      start: 0,
      end: 10,
      target: 3,
      operations: [{ operator: '+' as const, value: 5 }, { operator: '-' as const, value: 2 }],
      question: 'הגע ל-3 (קפיצה קדימה ואז אחורה)',
      hint: 'קפוץ +5 ואז -2'
    },
    {
      start: 5,
      end: 15,
      target: 12,
      operations: [{ operator: '+' as const, value: 4 }, { operator: '+' as const, value: 3 }],
      question: 'התחל מ-5 והגע ל-12',
      hint: 'קפוץ +4 ואז +3'
    },
    {
      start: 0,
      end: 20,
      target: 14,
      operations: [{ operator: '+' as const, value: 10 }, { operator: '+' as const, value: 7 }, { operator: '-' as const, value: 3 }],
      question: 'הגע ל-14 עם שלוש פעולות',
      hint: '+10, +7, -3'
    },
    {
      start: 0,
      end: 10,
      target: 2.5,
      operations: [{ operator: '+' as const, value: 1 }, { operator: '+' as const, value: 1.5 }],
      question: 'הגע ל-2.5 (מספר עשרוני!)',
      hint: 'קפוץ +1 ואז +1.5'
    },
    {
      start: 0,
      end: 10,
      target: 7.5,
      operations: [{ operator: '+' as const, value: 5 }, { operator: '+' as const, value: 3.5 }, { operator: '-' as const, value: 1 }],
      question: 'הגע ל-7.5 עם עשרוניים',
      hint: '+5, +3.5, -1'
    }
  ];
};

export function NumberLineGame({ config, onComplete, backUrl }: NumberLineGameProps) {
  const [levels] = useState(generateLevels(config));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(levels[0].start);
  const [operationIndex, setOperationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [jumps, setJumps] = useState<Array<{ from: number, to: number, operation: string }>>([]);
  const [isComplete, setIsComplete] = useState(false);

  const level = levels[currentLevel];
  const totalLevels = levels.length;
  const lineWidth = 800;
  const numberCount = level.end - level.start + 1;
  const stepSize = lineWidth / (level.end - level.start);

  const handleJump = () => {
    if (operationIndex >= level.operations.length) return;
    
    const operation = level.operations[operationIndex];
    const newPos = operation.operator === '+' 
      ? currentPosition + operation.value
      : currentPosition - operation.value;
    
    setJumps([...jumps, { 
      from: currentPosition, 
      to: newPos, 
      operation: `${operation.operator}${operation.value}` 
    }]);
    setCurrentPosition(newPos);
    setOperationIndex(operationIndex + 1);

    // Check if reached target
    if (operationIndex + 1 === level.operations.length) {
      setTimeout(() => {
        if (Math.abs(newPos - level.target) < 0.01) {
          // Correct!
          setScore(score + 1);
          if (currentLevel < totalLevels - 1) {
            setTimeout(() => {
              setCurrentLevel(currentLevel + 1);
              setCurrentPosition(levels[currentLevel + 1].start);
              setOperationIndex(0);
              setJumps([]);
              setShowHint(false);
            }, 2000);
          } else {
            // All levels complete!
            setIsComplete(true);
            setTimeout(() => {
              onComplete({ score: score + 1, attempts: totalLevels, perfectScore: score + 1 === totalLevels });
            }, 2000);
          }
        }
      }, 500);
    }
  };

  const resetLevel = () => {
    setCurrentPosition(level.start);
    setOperationIndex(0);
    setJumps([]);
  };

  if (isComplete) {
    return <GameComplete score={score} totalQuestions={totalLevels} message="אלוף קו המספרים! 📏🎉" />;
  }

  const positionToX = (num: number) => ((num - level.start) / (level.end - level.start)) * lineWidth;
  const isAtTarget = Math.abs(currentPosition - level.target) < 0.01;
  const allOperationsDone = operationIndex >= level.operations.length;

  return (
    <GameContainer backUrl={backUrl}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <TrendingUp size={48} className="text-blue-400" />
              <h1 className="text-5xl font-black text-white">קפיצות על קו המספרים</h1>
            </div>
            <p className="text-xl text-slate-300">למד חיבור וחיסור בצורה ויזואלית!</p>
          </div>

          {/* Level Progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-900/40 px-6 py-3 rounded-xl border border-purple-500/30">
              <span className="text-purple-300 font-bold">שלב {currentLevel + 1} מתוך {totalLevels}</span>
            </div>
            <div className="bg-green-900/40 px-6 py-3 rounded-xl border border-green-500/30">
              <span className="text-green-300 font-bold">ניקוד: {score}/{currentLevel}</span>
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentLevel}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl border-2 border-blue-500/30 p-8 shadow-2xl mb-6"
          >
            <p className="text-3xl font-bold text-white text-center mb-2" dir="rtl">
              {level.question}
            </p>
            <p className="text-center text-slate-400 mb-6">
              מיקום נוכחי: <span className="text-blue-400 font-bold" dir="ltr">{currentPosition}</span> | 
              יעד: <span className="text-green-400 font-bold" dir="ltr">{level.target}</span>
            </p>

            {/* Number Line Visualization */}
            <div className="relative py-12 px-8">
              {/* The Line */}
              <div className="relative h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-12" style={{ width: lineWidth }}>
                {/* Target marker */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: positionToX(level.target) }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      🎯 {level.target}
                    </div>
                  </div>
                </motion.div>

                {/* Current position marker (Rocket) */}
                <AnimatePresence>
                  <motion.div
                    key={`pos-${currentPosition}`}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    initial={{ left: positionToX(jumps[jumps.length - 1]?.from || level.start) }}
                    animate={{ left: positionToX(currentPosition) }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  >
                    <motion.div
                      animate={isAtTarget && allOperationsDone ? { 
                        rotate: [0, 360],
                        scale: [1, 1.5, 1]
                      } : {}}
                      transition={{ duration: 1 }}
                    >
                      <Rocket 
                        size={40} 
                        className={isAtTarget && allOperationsDone ? "text-green-400" : "text-blue-400"}
                        fill="currentColor"
                      />
                    </motion.div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                      {currentPosition}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Number markers */}
                {Array.from({ length: Math.min(numberCount, 21) }).map((_, i) => {
                  const num = level.start + i;
                  if (num > level.end) return null;
                  
                  return (
                    <div
                      key={i}
                      className="absolute top-full mt-8 -translate-x-1/2 text-center"
                      style={{ left: positionToX(num) }}
                    >
                      <div className="w-1 h-4 bg-slate-600 mx-auto mb-1" />
                      <span className="text-slate-400 text-sm font-mono">{num}</span>
                    </div>
                  );
                })}
              </div>

              {/* Jump trail visualization */}
              {jumps.map((jump, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="absolute top-0 h-2 bg-yellow-400 rounded"
                  style={{
                    left: Math.min(positionToX(jump.from), positionToX(jump.to)),
                    width: Math.abs(positionToX(jump.to) - positionToX(jump.from))
                  }}
                />
              ))}
            </div>

            {/* Operation buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {operationIndex < level.operations.length ? (
                <motion.button
                  onClick={handleJump}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-2xl rounded-2xl shadow-xl"
                >
                  קפוץ {level.operations[operationIndex].operator}{level.operations[operationIndex].value} 🚀
                </motion.button>
              ) : isAtTarget ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-3xl font-black text-green-400 mb-2">הצלחת!</p>
                  <p className="text-xl text-green-300">הגעת ל-{level.target}!</p>
                </motion.div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl text-red-400 font-bold mb-4">לא הגעת ליעד... 😔</p>
                  <p className="text-slate-300 mb-4">
                    הגעת ל-<span className="font-bold text-red-300">{currentPosition}</span> במקום <span className="font-bold text-green-300">{level.target}</span>
                  </p>
                  <button
                    onClick={resetLevel}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                  >
                    נסה שוב
                  </button>
                </div>
              )}
            </div>

            {/* Hint button */}
            {!showHint && !allOperationsDone && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowHint(true)}
                  className="text-yellow-400 hover:text-yellow-300 underline flex items-center gap-2 mx-auto"
                >
                  <Lightbulb size={16} />
                  צריך רמז?
                </button>
              </div>
            )}

            {/* Hint display */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 bg-yellow-900/30 border-2 border-yellow-500/50 rounded-xl p-4 text-center"
                >
                  <div className="flex items-center gap-2 justify-center text-yellow-300 mb-2">
                    <Lightbulb size={20} />
                    <span className="font-bold">רמז:</span>
                  </div>
                  <p className="text-yellow-200">{level.hint}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Operations history */}
            {jumps.length > 0 && (
              <div className="mt-8 bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2 font-bold">קפיצות שביצעת:</p>
                <div className="flex flex-wrap gap-2">
                  {jumps.map((jump, i) => (
                    <div key={i} className="bg-blue-900/40 px-4 py-2 rounded-lg border border-blue-500/30">
                      <span className="text-blue-300 font-mono text-sm" dir="ltr">
                        {jump.from} → {jump.operation} → {jump.to}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Educational note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30"
          >
            <p className="text-blue-200 text-sm text-center">
              <strong>ידעת?</strong> קו המספרים עוזר לנו לראות חיבור וחיסור כקפיצות!
              קפיצה ימינה היא חיבור (+) וקפיצה שמאלה היא חיסור (-).
            </p>
          </motion.div>
        </div>
      </div>
    </GameContainer>
  );
}
