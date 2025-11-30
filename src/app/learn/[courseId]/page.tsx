'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { getCourse } from '@/lib/curriculum';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';
import { CheckCircle, Lock, PlayCircle, BookOpen, HelpCircle, Trophy, ChevronRight, ArrowLeft, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

export default function CourseModulesPage() {
  const params = useParams();
  const { courseId } = params;
  const { completedLessons } = useUserStore();

  const course = courseId ? getCourse(courseId as string) : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">קורס לא נמצא</h1>
          <Link href="/learn" className="text-blue-400 hover:text-blue-300">
            חזרה לרשימת הקורסים
          </Link>
        </div>
      </div>
    );
  }

  const getModuleProgress = (module: typeof course.modules[0]) => {
    const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    const total = module.lessons.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const getCourseProgress = () => {
    const allLessons = course.modules.flatMap(m => m.lessons);
    const completed = allLessons.filter(l => completedLessons.includes(l.id)).length;
    const total = allLessons.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const courseProgress = getCourseProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/learn" 
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-transparent transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-400" />
              </Link>
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg text-white",
                  `bg-gradient-to-br ${course.color || 'from-blue-500 to-purple-500'}`
                )}>
                  {course.icon || '📚'}
                </div>
                <div>
                  <h1 className={clsx(
                    "text-3xl font-bold bg-clip-text text-transparent",
                    `bg-gradient-to-r ${course.color || 'from-blue-400 via-purple-400 to-pink-400'}`
                  )}>
                    {course.title}
                  </h1>
                  <p className="text-slate-400 mt-1">{course.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/learn/${courseId}/forum`}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl flex items-center gap-2 transition-all hover:scale-105 hover:text-blue-400"
              >
                <MessageSquare size={20} />
                <span className="font-bold hidden sm:inline">פורום הקורס</span>
              </Link>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 shadow-none">
                <div className="text-sm text-slate-400 mb-1">התקדמות כללית</div>
                <div className="text-2xl font-bold text-blue-400">{courseProgress.completed} / {courseProgress.total}</div>
              </div>
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
              courseProgress.percentage === 100
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : `bg-gradient-to-r ${course.color || 'from-blue-500 to-purple-500'}`
            )}
            style={{ width: `${courseProgress.percentage}%` }}
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {course.modules.map((module, moduleIndex) => {
            const progress = getModuleProgress(module);
            const isModuleLocked = moduleIndex > 0 && 
              !course.modules[moduleIndex - 1].lessons.every(l => completedLessons.includes(l.id));
            const isModuleCompleted = progress.percentage === 100;
            const firstIncomplete = module.lessons.find(lesson => !completedLessons.includes(lesson.id));
            const nextLessonId = firstIncomplete?.id || module.lessons[0]?.id;

            return (
              <div
                key={module.id}
                className={clsx(
                  "group relative flex flex-col h-full rounded-2xl transition-all duration-300 border",
                  isModuleLocked
                    ? "bg-slate-900/50 border-slate-800/50 opacity-75"
                    : isModuleCompleted
                    ? "bg-slate-900/80 border-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-900/20"
                    : "bg-slate-900/80 border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1"
                )}
              >
                {/* Module Number Badge - positioned absolutely */}
                <div className={clsx(
                  "absolute -top-3 -left-3 z-20 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg border",
                  isModuleCompleted
                    ? "bg-green-600 border-green-500 text-white"
                    : isModuleLocked
                    ? "bg-slate-800 border-slate-700 text-slate-500"
                    : "bg-blue-600 border-blue-500 text-white"
                )}>
                  {moduleIndex + 1}
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow p-6 relative overflow-hidden rounded-2xl">
                  {/* Background Gradient Accent - subtle */}
                  {!isModuleLocked && (
                    <div className={clsx(
                      "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full -mr-10 -mt-10 pointer-events-none",
                      isModuleCompleted ? "from-green-500 to-transparent" : "from-blue-500 to-transparent"
                    )} />
                  )}

                  {/* Header Section */}
                  <div className="flex items-start justify-between gap-4 mb-4 z-10">
                    <h2 className={clsx(
                      "text-xl font-bold leading-tight",
                      isModuleLocked ? "text-slate-500" : "text-slate-100"
                    )}>
                      {module.title}
                    </h2>
                    
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {isModuleCompleted ? (
                        <div className="bg-green-500/20 p-2 rounded-full">
                          <Trophy size={20} className="text-green-400" />
                        </div>
                      ) : isModuleLocked ? (
                        <div className="bg-slate-800 p-2 rounded-full">
                          <Lock size={20} className="text-slate-600" />
                        </div>
                      ) : (
                        <div className="bg-blue-500/20 p-2 rounded-full">
                          <PlayCircle size={20} className="text-blue-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={clsx(
                    "text-sm mb-6 flex-grow leading-relaxed",
                    isModuleLocked ? "text-slate-600" : "text-slate-400"
                  )}>
                    {module.description}
                  </p>

                  {/* Progress Bar (only if unlocked) */}
                  {!isModuleLocked && (
                    <div className="mb-6 space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">התקדמות</span>
                        <span className={clsx(
                          isModuleCompleted ? "text-green-400" : "text-blue-400"
                        )}>
                          {progress.percentage}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={clsx(
                            "h-full rounded-full transition-all duration-500",
                            isModuleCompleted ? "bg-green-500" : "bg-blue-500"
                          )}
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats Row */}
                  <div className={clsx(
                    "flex items-center justify-between text-xs py-3 border-t border-slate-800/50",
                    isModuleLocked ? "text-slate-600" : "text-slate-500"
                  )}>
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} />
                      <span>{module.lessons.filter(l => l.type === 'text').length}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PlayCircle size={14} />
                      <span>{module.lessons.filter(l => l.type === 'game').length}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HelpCircle size={14} />
                      <span>{module.lessons.filter(l => l.type === 'quiz').length}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4">
                    <Link
                      href={isModuleLocked ? '#' : `/learn/${course.id}/${module.id}`}
                      className={clsx(
                        "flex items-center justify-center w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-200",
                        isModuleLocked
                          ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                          : isModuleCompleted
                          ? "bg-green-600/10 text-green-400 hover:bg-green-600/20 border border-green-600/20"
                          : "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                      )}
                    >
                      {isModuleLocked ? (
                        <span className="flex items-center gap-2">
                          <Lock size={14} />
                          נעול
                        </span>
                      ) : isModuleCompleted ? (
                        <span className="flex items-center gap-2">
                          <Trophy size={14} />
                          חזור לתרגול
                        </span>
                      ) : progress.completed > 0 ? (
                        <span className="flex items-center gap-2">
                          <ChevronRight size={16} />
                          המשך ({progress.completed}/{progress.total})
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ChevronRight size={16} />
                          התחל ללמוד
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

