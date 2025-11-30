'use client';

import { useState, useMemo } from 'react';
import { Trophy, CheckCircle, XCircle, Target, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

export interface MathGameConfig {
  id: number;
  type: 'place-value' | 'addition' | 'multiplication' | 'fractions' | 'measurement' | 'data';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface MathGameProps {
  config: MathGameConfig;
  onComplete: () => void;
}

const getQuestions = (type: string) => {
  switch (type) {
    case 'place-value':
      return [
        {
          question: 'מה הערך של הספרה 5 במספר 523?',
          options: ['5', '50', '500', '5000'],
          correct: 2,
          explanation: 'הספרה 5 נמצאת במקום המאות, אז הערך שלה הוא 5 × 100 = 500'
        },
        {
          question: 'מה הערך של הספרה 3 במספר 834?',
          options: ['3', '30', '300', '3000'],
          correct: 1,
          explanation: 'הספרה 3 נמצאת במקום העשרות, אז הערך שלה הוא 3 × 10 = 30'
        },
        {
          question: 'מה הערך של הספרה 7 במספר 472?',
          options: ['7', '70', '700', '7000'],
          correct: 1,
          explanation: 'הספרה 7 נמצאת במקום העשרות, אז הערך שלה הוא 7 × 10 = 70'
        },
        {
          question: 'מה הערך של הספרה 2 במספר 256?',
          options: ['2', '20', '200', '2000'],
          correct: 2,
          explanation: 'הספרה 2 נמצאת במקום המאות, אז הערך שלה הוא 2 × 100 = 200'
        },
        {
          question: 'מה הערך של הספרה 9 במספר 891?',
          options: ['9', '90', '900', '9000'],
          correct: 1,
          explanation: 'הספרה 9 נמצאת במקום העשרות, אז הערך שלה הוא 9 × 10 = 90'
        }
      ];
    case 'addition':
      return [
        {
          question: 'כמה זה 47 + 28?',
          options: ['65', '75', '85', '95'],
          correct: 1, // 47 + 28 = 75 ✓
          explanation: '47 + 28 = 75'
        },
        {
          question: 'כמה זה 63 + 19?',
          options: ['72', '82', '92', '102'],
          correct: 1, // 63 + 19 = 82 ✓
          explanation: '63 + 19 = 82'
        },
        {
          question: 'כמה זה 35 + 47?',
          options: ['72', '82', '92', '102'],
          correct: 1, // 35 + 47 = 82 ✓
          explanation: '35 + 47 = 82'
        },
        {
          question: 'כמה זה 56 + 34?',
          options: ['80', '90', '100', '110'],
          correct: 1, // 56 + 34 = 90 ✓
          explanation: '56 + 34 = 90'
        },
        {
          question: 'כמה זה 29 + 18?',
          options: ['37', '47', '57', '67'],
          correct: 1, // 29 + 18 = 47 ✓
          explanation: '29 + 18 = 47'
        }
      ];
    case 'multiplication':
      return [
        {
          question: 'כמה זה 7 × 5?',
          options: ['30', '35', '40', '45'],
          correct: 1,
          explanation: '7 × 5 = 35'
        },
        {
          question: 'כמה זה 8 × 6?',
          options: ['42', '48', '54', '60'],
          correct: 1,
          explanation: '8 × 6 = 48'
        },
        {
          question: 'כמה זה 9 × 4?',
          options: ['32', '36', '40', '44'],
          correct: 1,
          explanation: '9 × 4 = 36'
        },
        {
          question: 'כמה זה 6 × 7?',
          options: ['40', '42', '44', '46'],
          correct: 1,
          explanation: '6 × 7 = 42'
        },
        {
          question: 'כמה זה 5 × 9?',
          options: ['40', '45', '50', '55'],
          correct: 1,
          explanation: '5 × 9 = 45'
        }
      ];
    case 'fractions':
      return [
        {
          question: 'איזה שבר גדול יותר: 1/2 או 1/3?',
          options: ['1/2', '1/3', 'שווים', 'לא יודע'],
          correct: 0,
          explanation: '1/2 = 0.5 ו-1/3 ≈ 0.33, אז 1/2 גדול יותר'
        },
        {
          question: 'כמה זה חצי (1/2) של 10?',
          options: ['3', '4', '5', '6'],
          correct: 2,
          explanation: 'חצי של 10 = 10 ÷ 2 = 5'
        },
        {
          question: 'כמה זה שליש (1/3) של 12?',
          options: ['3', '4', '5', '6'],
          correct: 1,
          explanation: 'שליש של 12 = 12 ÷ 3 = 4'
        },
        {
          question: 'כמה זה רבע (1/4) של 20?',
          options: ['4', '5', '6', '7'],
          correct: 1,
          explanation: 'רבע של 20 = 20 ÷ 4 = 5'
        },
        {
          question: 'כמה זה חצי (1/2) של 16?',
          options: ['6', '7', '8', '9'],
          correct: 2,
          explanation: 'חצי של 16 = 16 ÷ 2 = 8'
        }
      ];
    case 'measurement':
      return [
        {
          question: 'מה הסכום של האורכים: 5, 8, 3, 12, 6?',
          options: ['30', '32', '34', '36'],
          correct: 2,
          explanation: '5 + 8 + 3 + 12 + 6 = 34'
        },
        {
          question: 'מה הממוצע של: 10, 15, 20, 25?',
          options: ['15', '17.5', '20', '22.5'],
          correct: 1,
          explanation: '(10 + 15 + 20 + 25) ÷ 4 = 70 ÷ 4 = 17.5'
        },
        {
          question: 'מה ההפרש בין האורך הגדול לקטן: 5, 12, 3, 8?',
          options: ['7', '8', '9', '10'],
          correct: 2,
          explanation: 'הגדול: 12, הקטן: 3, הפרש: 12 - 3 = 9'
        },
        {
          question: 'מה הסכום של: 7, 9, 11, 13?',
          options: ['38', '40', '42', '44'],
          correct: 1,
          explanation: '7 + 9 + 11 + 13 = 40'
        },
        {
          question: 'מה הממוצע של: 6, 8, 10, 12, 14?',
          options: ['8', '9', '10', '11'],
          correct: 2,
          explanation: '(6 + 8 + 10 + 12 + 14) ÷ 5 = 50 ÷ 5 = 10'
        }
      ];
    case 'data':
      return [
        {
          question: 'מה הציון הגבוה ביותר: 85, 90, 78, 92, 88?',
          options: ['88', '90', '92', '95'],
          correct: 2,
          explanation: 'הציון הגבוה ביותר הוא 92'
        },
        {
          question: 'מה הציון הנמוך ביותר: 75, 82, 68, 90, 79?',
          options: ['68', '75', '79', '82'],
          correct: 0,
          explanation: 'הציון הנמוך ביותר הוא 68'
        },
        {
          question: 'מה ההפרש בין הגבוה לנמוך: 88, 92, 85, 90?',
          options: ['4', '5', '6', '7'],
          correct: 3,
          explanation: 'גבוה: 92, נמוך: 85, הפרש: 92 - 85 = 7'
        },
        {
          question: 'מה הציון הגבוה ביותר: 95, 87, 91, 89, 93?',
          options: ['91', '93', '95', '97'],
          correct: 2,
          explanation: 'הציון הגבוה ביותר הוא 95'
        },
        {
          question: 'מה ההפרש בין הגבוה לנמוך: 70, 85, 60, 90, 75?',
          options: ['25', '30', '35', '40'],
          correct: 1,
          explanation: 'גבוה: 90, נמוך: 60, הפרש: 90 - 60 = 30'
        }
      ];
    default:
      return [];
  }
};

export function MathGame({ config, onComplete }: MathGameProps) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = useMemo(() => getQuestions(config.type), [config.type]);
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
        setTimeout(() => {
          onComplete();
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
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-3xl border-2 border-green-500/50 p-8 shadow-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-yellow-300/50">
                <Trophy className="text-white" size={48} fill="currentColor" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
            כל הכבוד! 🎉
          </h2>
          <div className="text-6xl font-black text-yellow-400 mb-4 drop-shadow-lg">
            {percentage}%
          </div>
          <p className="text-xl text-green-100 mb-6">
            ענית נכון על {score} מתוך {totalQuestions} שאלות!
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <RotateCcw size={20} />
              נסה שוב
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-lg">שאלה {currentQuestion + 1} מתוך {totalQuestions}</span>
            <span className="text-blue-300 font-bold text-lg">ניקוד: {score}/{totalQuestions}</span>
          </div>
          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

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
  );
}
