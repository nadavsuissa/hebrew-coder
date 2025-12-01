'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { useUserStore } from '@/store/userStore';
import { getLevel } from '@/lib/levels';
import { getLessonByGameLevelId, getNextLessonInModule, getCourse } from '@/lib/curriculum';
import { CodeEditor } from '@/components/CodeEditor';
import { GameView } from '@/components/GameView';
import { MathGame, MathGameConfig } from '@/components/MathGame';
import { ChevronLeft, Trophy, Target, Map, ListOrdered, Lightbulb, Sparkles, BookOpen, Rocket } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { levelId } = params;
  const { setLevel, currentLevel, trace, currentStep } = useGameStore();
  const { completeLesson } = useUserStore();
  const [isClient, setIsClient] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isMathGame, setIsMathGame] = useState(false);
  const [mathGameConfig, setMathGameConfig] = useState<MathGameConfig | null>(null);

  // Check if this is a math game (levels 16-21)
  useEffect(() => {
    setIsClient(true);
    if (levelId) {
        const id = Number(levelId);
        
        // Math games are levels 16-21 and 501-505
        if ((id >= 16 && id <= 21) || (id >= 501 && id <= 505)) {
          setIsMathGame(true);
          const lessonData = getLessonByGameLevelId(id);
          if (lessonData) {
            const { lesson } = lessonData;
            // Map level ID to math game type
            const typeMap: Record<number, MathGameConfig['type']> = {
              16: 'place-value',
              17: 'addition',
              18: 'multiplication',
              19: 'fractions',
              20: 'measurement',
              21: 'data',
              // Grade 5
              501: 'fractions',
              502: 'multiplication',
              503: 'data',
              504: 'measurement',
              505: 'place-value'
            };
            
            setMathGameConfig({
              id,
              type: typeMap[id] || 'addition',
              title: lesson.title,
              description: lesson.description,
              difficulty: 'easy'
            });
          }
        } else {
          setIsMathGame(false);
          const level = getLevel(id);
          if (level) {
              setLevel(level);
          } else {
              router.push('/levels');
          }
        }
    }
  }, [levelId, setLevel, router, searchParams]);

  // Calculate win state (before early return to ensure hooks order)
  const currentFrame = currentLevel ? trace[currentStep] : null;
  let isWin = false;
  let progressText = "";

  if (currentLevel) {
    if (currentLevel.requiredOutput) {
        const logContent = trace.map(f => f.log).filter(Boolean).join('\n');
        isWin = logContent.includes(currentLevel.requiredOutput);
        progressText = isWin ? "UPLINK ESTABLISHED" : "WAITING FOR SIGNAL";
    } else {
        const collectedCount = currentFrame 
          ? currentFrame.objects.filter(o => o.type === 'crystal' && o.state === 'collected').length
          : 0;
        isWin = collectedCount === currentLevel.targets.length;
        progressText = `DATA COLLECTED: ${collectedCount}/${currentLevel.targets.length}`;
    }
  }

  // Handle win completion - save progress and determine next step
  // This useEffect must be called before any early returns to maintain hooks order
  useEffect(() => {
    if (isWin && !hasCompleted && currentLevel) {
      setHasCompleted(true);
      
      const returnTo = searchParams.get('returnTo');
      
      if (returnTo) {
        // If we came from a lesson page, complete that lesson and return to it
        const match = returnTo.match(/\/learn\/([^/]+)\/([^/]+)\/([^/]+)/);
        if (match) {
          const [, courseId, moduleId, lessonId] = match;
          const lessonData = getLessonByGameLevelId(currentLevel.id);
          if (lessonData && lessonData.lesson.id === lessonId) {
            completeLesson(lessonId, lessonData.lesson.xpReward);
          }
          // Return to the lesson page (which will show completion)
          router.push(returnTo);
          return;
        }
      }
      
      // Otherwise, find the lesson associated with this game level
      const lessonData = getLessonByGameLevelId(currentLevel.id);
      if (lessonData) {
        const { course, module, lesson } = lessonData;
        completeLesson(lesson.id, lesson.xpReward);
        
        // Find next lesson in the module
        const nextLesson = getNextLessonInModule(course.id, module.id, lesson.id);
        if (nextLesson) {
          // Redirect to next lesson after a short delay
          setTimeout(() => {
            router.push(`/learn/${course.id}/${module.id}/${nextLesson.id}`);
          }, 2000);
        } else {
          // No next lesson, go back to module page
          setTimeout(() => {
            router.push(`/learn/${course.id}/${module.id}`);
          }, 2000);
        }
      }
    }
  }, [isWin, hasCompleted, currentLevel, searchParams, completeLesson, router]);

  // Handle math game completion
  const handleMathGameComplete = () => {
    if (!hasCompleted) {
      setHasCompleted(true);
      
      const returnTo = searchParams.get('returnTo');
      
      if (returnTo) {
        const match = returnTo.match(/\/learn\/([^/]+)\/([^/]+)\/([^/]+)/);
        if (match) {
          const [, courseId, moduleId, lessonId] = match;
          const lessonData = getLessonByGameLevelId(Number(levelId));
          if (lessonData && lessonData.lesson.id === lessonId) {
            completeLesson(lessonId, lessonData.lesson.xpReward);
          }
          router.push(returnTo);
          return;
        }
      }
      
      const lessonData = getLessonByGameLevelId(Number(levelId));
      if (lessonData) {
        const { course, module, lesson } = lessonData;
        completeLesson(lesson.id, lesson.xpReward);
        
        const nextLesson = getNextLessonInModule(course.id, module.id, lesson.id);
        if (nextLesson) {
          setTimeout(() => {
            router.push(`/learn/${course.id}/${module.id}/${nextLesson.id}`);
          }, 2000);
        } else {
          setTimeout(() => {
            router.push(`/learn/${course.id}/${module.id}`);
          }, 2000);
        }
      }
    }
  };

  // Show math game if it's a math game
  if (isMathGame && mathGameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120]">
        <div className="absolute top-6 left-6 z-10">
          <Link 
            href={searchParams.get('returnTo') || '/learn'} 
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700 group-hover:border-blue-500/50 transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="font-bold">חזרה</span>
          </Link>
        </div>
        <MathGame config={mathGameConfig} onComplete={handleMathGameComplete} />
      </div>
    );
  }

  if (!isClient || !currentLevel) return <div className="h-screen bg-[#0B1120] text-white flex items-center justify-center font-mono">INITIALIZING...</div>;

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 overflow-hidden relative font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

      {/* Grid Layout */}
      <div className="relative z-10 h-full w-full p-6 grid grid-cols-12 gap-6">
        
        {/* Left Column: Game Monitor & Info (5 cols) */}
        <div className="col-span-5 flex flex-col gap-6 h-full min-h-0">
            
            {/* Header / Nav */}
            <div className="flex items-center justify-between shrink-0 px-2">
                <Link 
                    href={searchParams.get('returnTo') || '/learn'} 
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
                >
                    <div className="p-1.5 rounded-md bg-slate-800/50 group-hover:bg-blue-500/20 border border-slate-700 group-hover:border-blue-500/50 transition-all">
                        <ChevronLeft size={16} />
                    </div>
                    <span className="font-mono text-sm tracking-wider">BACK_TO_BASE</span>
                </Link>
                <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700/50 backdrop-blur">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-blue-200 tracking-widest">LEVEL_{currentLevel.id} :: {currentLevel.title.toUpperCase()}</span>
                </div>
            </div>

            {/* Game View Container (Monitor) */}
            <div className="flex-1 relative bg-slate-900/40 rounded-2xl border-2 border-slate-700/50 shadow-2xl overflow-hidden group">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 rounded-tl-xl z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/50 rounded-tr-xl z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/50 rounded-bl-xl z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-xl z-20" />
                
                {/* Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50" />

                <GameView />
            </div>

            {/* Mission Briefing Panel */}
            <div className="h-1/3 min-h-[200px] bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-indigo-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/30 p-6 flex flex-col relative overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                {/* Decorative Stars */}
                <div className="absolute top-2 right-4 text-yellow-300 text-xl animate-pulse pointer-events-none z-10">✨</div>
                <div className="absolute bottom-4 left-4 text-blue-300 text-lg animate-pulse pointer-events-none z-10" style={{ animationDelay: '0.3s' }}>⭐</div>
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 text-yellow-300 shrink-0">
                    <div className="p-2 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                        <Rocket size={20} className="text-yellow-400" />
                    </div>
                    <h2 className="font-bold text-xl text-white drop-shadow-lg">המשימה שלך</h2>
                </div>
                
                {/* Description */}
                <div className="mb-4 bg-slate-700/30 rounded-2xl p-4 border border-white/20 backdrop-blur-sm shrink-0">
                    <p className="text-white leading-relaxed text-lg font-medium drop-shadow-md">
                        {currentLevel.description}
                    </p>
                </div>

                {/* Step-by-Step Instructions */}
                {currentLevel.instructions && currentLevel.instructions.length > 0 && (
                    <div className="mb-4 shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-pink-500/20 rounded-lg border border-pink-500/30">
                                <BookOpen size={16} className="text-pink-300" />
                            </div>
                            <span className="text-pink-300 font-bold text-sm">📚 שלבים</span>
                        </div>
                        <ol className="space-y-3">
                            {currentLevel.instructions.map((instruction, idx) => (
                                <li key={idx} className="flex gap-3 items-start group">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                                        {idx + 1}
                                    </div>
                            <div className="flex-1 bg-slate-800/50 rounded-xl p-3 border border-white/10 group-hover:bg-slate-700/50 transition-colors">
                                <span className="text-white text-sm leading-relaxed block">{instruction}</span>
                            </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Hints Section */}
                {currentLevel.hints && currentLevel.hints.length > 0 && (
                    <div className="mb-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border-2 border-yellow-400/30 shadow-lg shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-yellow-500/30 rounded-lg">
                                <Sparkles size={16} className="text-yellow-300" />
                            </div>
                            <span className="text-yellow-200 font-bold text-sm">💡 טיפים חכמים</span>
                        </div>
                        <ul className="space-y-2">
                            {currentLevel.hints.map((hint, idx) => (
                                <li key={idx} className="flex gap-2 items-start">
                                    <span className="text-yellow-300 text-lg shrink-0">✨</span>
                                    <span className="text-yellow-100 text-sm leading-relaxed">{hint}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Objectives */}
                <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-2xl p-4 border-2 border-green-500/30 shadow-lg shrink-0">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Target size={18} className="text-green-400" />
                            <span className="text-green-300 font-bold text-sm">🎯 המטרה</span>
                        </div>
                        <span className={clsx("text-sm font-bold px-3 py-1 rounded-full", 
                            isWin ? "bg-green-500 text-white shadow-lg" : "bg-yellow-500/30 text-yellow-200"
                        )}>
                            {isWin ? "✅ הושלם!" : "⏳ בתהליך"}
                        </span>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-white/10">
                        <span className={clsx("text-base font-bold", isWin ? "text-green-200" : "text-white")}>
                            {progressText}
                        </span>
                    </div>
                </div>

                {/* Success Overlay */}
                {isWin && (
                    <div className="absolute inset-0 z-50 bg-gradient-to-br from-green-900/95 via-emerald-900/95 to-teal-900/95 backdrop-blur flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-50 animate-pulse" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-yellow-300/50">
                                <Trophy className="text-white" size={48} fill="currentColor" />
                            </div>
                        </div>
                        <h3 className="text-4xl font-black text-white mb-3 drop-shadow-lg animate-bounce">
                            🎉 כל הכבוד! 🎉
                        </h3>
                        <p className="text-xl text-green-100 mb-8 max-w-md mx-auto font-medium drop-shadow-md">
                            המשימה הושלמה בהצלחה! הרובר ביצע את הפקודות שלך בצורה מושלמת! 🚀
                        </p>
                        <div className="text-green-100 text-lg font-medium">
                            {searchParams.get('returnTo') ? (
                                'מחזירים אותך לשיעור...'
                            ) : (
                                'מעבירים אותך לשיעור הבא...'
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Right Column: Editor (7 cols) */}
        <div className="col-span-7 h-full min-h-0">
            <CodeEditor />
        </div>

      </div>
    </div>
  );
}
