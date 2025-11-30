'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { getCourse, getModule, getNextLessonInModule } from '@/lib/curriculum';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';
import { CheckCircle, Lock, PlayCircle, BookOpen, HelpCircle, Trophy, ChevronRight, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

export default function ModulePage() {
  const params = useParams();
  const { courseId, moduleId } = params;
  const { completedLessons } = useUserStore();

  const course = courseId ? getCourse(courseId as string) : null;
  const module = courseId && moduleId ? getModule(courseId as string, moduleId as string) : null;

  if (!course || !module) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">מודול לא נמצא</h1>
          <Link href={course ? `/learn/${course.id}` : '/learn'} className="text-blue-400 hover:text-blue-300">
            חזרה לקורס
          </Link>
        </div>
      </div>
    );
  }

  const getModuleProgress = () => {
    const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    const total = module.lessons.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const getNextLessonId = () => {
    const firstIncomplete = module.lessons.find(lesson => !completedLessons.includes(lesson.id));
    return firstIncomplete?.id || module.lessons[module.lessons.length - 1]?.id || module.lessons[0]?.id;
  };

  const progress = getModuleProgress();
  const isModuleCompleted = progress.percentage === 100;
  const nextLessonId = getNextLessonId();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/learn/${course.id}`} 
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-400" />
              </Link>
              <div>
                <h1 className={clsx(
                  "text-3xl font-bold bg-clip-text text-transparent",
                  `bg-gradient-to-r ${course.color || 'from-blue-400 via-purple-400 to-pink-400'}`
                )}>
                  {module.title}
                </h1>
                <p className="text-slate-400 mt-1">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">התקדמות</div>
                <div className="text-2xl font-bold text-blue-400">{progress.completed} / {progress.total}</div>
              </div>
              {isModuleCompleted && (
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/50">
                  <Trophy size={24} className="text-green-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-full transition-all duration-500",
              isModuleCompleted 
                ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                : `bg-gradient-to-r ${course.color || 'from-blue-500 to-purple-500'}`
            )}
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Lessons List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(module.lessons[index - 1].id);
            const Icon = lesson.type === 'game' ? PlayCircle : lesson.type === 'quiz' ? HelpCircle : BookOpen;
            
            return (
              <Link
                key={lesson.id}
                href={isLocked ? '#' : `/learn/${course.id}/${module.id}/${lesson.id}`}
                className={clsx(
                  "group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                  isLocked
                    ? "bg-slate-900/30 border-slate-800 opacity-60 cursor-not-allowed"
                    : isCompleted
                    ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/50 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1"
                    : "bg-slate-800/50 border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
                )}
              >
                {/* Lesson Number */}
                <div className={clsx(
                  "absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isLocked
                    ? "bg-slate-700 text-slate-500"
                    : "bg-slate-700 text-slate-300"
                )}>
                  {index + 1}
                </div>

                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                      <CheckCircle size={18} className="text-white" />
                    </div>
                  </div>
                )}

                {/* Lock Badge */}
                {isLocked && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-slate-700 rounded-full p-1.5">
                      <Lock size={18} className="text-slate-500" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 pt-16">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={clsx(
                      "p-2 rounded-lg",
                      isCompleted
                        ? "bg-green-500/20"
                        : isLocked
                        ? "bg-slate-700/50"
                        : "bg-blue-500/20"
                    )}>
                      <Icon 
                        size={20} 
                        className={clsx(
                          isCompleted ? "text-green-400" : isLocked ? "text-slate-500" : "text-blue-400"
                        )} 
                      />
                    </div>
                    <span className={clsx(
                      "text-xs font-bold px-2 py-1 rounded-full",
                      lesson.type === 'game' 
                        ? "bg-purple-500/20 text-purple-300"
                        : lesson.type === 'quiz'
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-blue-500/20 text-blue-300"
                    )}>
                      {lesson.type === 'game' ? 'משחק' : lesson.type === 'quiz' ? 'בוחן' : 'שיעור'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Trophy size={14} />
                      <span>{lesson.xpReward} XP</span>
                    </div>
                    {!isLocked && (
                      <ChevronRight 
                        size={18} 
                        className={clsx(
                          "transition-transform group-hover:translate-x-1",
                          isCompleted ? "text-green-400" : "text-slate-400"
                        )} 
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Continue Button */}
        {!isModuleCompleted && (
          <div className="mt-8 flex justify-center">
            <Link
              href={`/learn/${course.id}/${module.id}/${nextLessonId}`}
              className={clsx(
                "px-8 py-4 text-white font-bold text-lg rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2",
                `bg-gradient-to-r ${course.color || 'from-blue-500 to-purple-500'} hover:opacity-90`
              )}
            >
              <span>המשך לימוד</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

