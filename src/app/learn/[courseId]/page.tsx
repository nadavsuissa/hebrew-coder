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
                  "group relative rounded-3xl transition-all duration-500 overflow-hidden",
                  isModuleLocked
                    ? "bg-slate-900/40 opacity-50"
                    : "hover:scale-[1.02] hover:-translate-y-2"
                )}
              >
                {/* Gradient Border Effect */}
                <div className={clsx(
                  "absolute inset-0 rounded-3xl p-[2px] transition-all duration-500",
                  isModuleLocked
                    ? "bg-slate-800/50"
                    : isModuleCompleted
                    ? "bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 group-hover:from-green-300 group-hover:via-emerald-300 group-hover:to-teal-300"
                    : "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400"
                )}>
                  <div className="w-full h-full rounded-3xl bg-[#0F172A]" />
                </div>

                {/* Glow Effect */}
                {!isModuleLocked && (
                  <div className={clsx(
                    "absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10",
                    isModuleCompleted
                      ? "bg-gradient-to-br from-green-500 to-emerald-500"
                      : "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                  )} />
                )}

                {/* Content Container */}
                <div className="relative z-10 p-8">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Module Number Badge */}
                    <div className={clsx(
                      "relative w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl transition-all duration-500",
                      isModuleCompleted
                        ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white ring-4 ring-green-500/20"
                        : isModuleLocked
                        ? "bg-slate-800 text-slate-600"
                        : "bg-gradient-to-br from-blue-500 to-purple-500 text-white group-hover:scale-110 group-hover:rotate-3"
                    )}>
                      {moduleIndex + 1}
                      {!isModuleLocked && (
                        <div className={clsx(
                          "absolute inset-0 rounded-2xl blur-xl opacity-50",
                          isModuleCompleted ? "bg-green-500" : "bg-blue-500"
                        )} />
                      )}
                    </div>

                    {/* Completion Badge */}
                    {isModuleCompleted && (
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping bg-green-500 rounded-full opacity-20" />
                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-3 shadow-xl ring-4 ring-green-500/20">
                          <Trophy size={20} className="text-white" />
                        </div>
                      </div>
                    )}

                    {isModuleLocked && (
                      <div className="bg-slate-800 rounded-full p-3">
                        <Lock size={20} className="text-slate-600" />
                      </div>
                    )}
                  </div>

                  {/* Module Title & Description */}
                  <div className="mb-6">
                    <h2 className={clsx(
                      "text-2xl font-black mb-3 transition-all duration-300",
                      isModuleLocked
                        ? "text-slate-600"
                        : "text-white group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent"
                    )}>
                      {module.title}
                    </h2>
                    <p className={clsx(
                      "text-sm leading-relaxed min-h-[3rem]",
                      isModuleLocked ? "text-slate-600" : "text-slate-400"
                    )}>
                      {module.description}
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-bold mb-3">
                      <span className={clsx(
                        isModuleLocked ? "text-slate-600" : "text-slate-300"
                      )}>
                        התקדמות
                      </span>
                      <span className={clsx(
                        "text-base",
                        isModuleCompleted
                          ? "text-green-400"
                          : isModuleLocked
                          ? "text-slate-600"
                          : "text-blue-400"
                      )}>
                        {progress.percentage}%
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className={clsx(
                          "h-full transition-all duration-700 rounded-full relative",
                          isModuleCompleted
                            ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        )}
                        style={{ width: `${progress.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Lessons Preview */}
                  <div className="space-y-2 mb-6">
                    {module.lessons.slice(0, 3).map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const Icon = lesson.type === 'game' ? PlayCircle : lesson.type === 'quiz' ? HelpCircle : BookOpen;
                      
                      return (
                        <div
                          key={lesson.id}
                          className={clsx(
                            "flex items-center gap-3 text-sm p-3 rounded-xl transition-all duration-300",
                            isCompleted
                              ? "bg-green-500/10 text-green-300 border border-green-500/20"
                              : isModuleLocked
                              ? "bg-slate-800/30 text-slate-600"
                              : "bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700/50"
                          )}
                        >
                          <div className={clsx(
                            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                            isCompleted
                              ? "bg-green-500/20"
                              : isModuleLocked
                              ? "bg-slate-800"
                              : "bg-slate-700"
                          )}>
                            <Icon size={16} />
                          </div>
                          <span className="truncate flex-1 font-medium">{lesson.title}</span>
                          {isCompleted && (
                            <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                    {module.lessons.length > 3 && (
                      <div className={clsx(
                        "text-xs text-center py-2 font-medium",
                        isModuleLocked ? "text-slate-600" : "text-slate-500"
                      )}>
                        +{module.lessons.length - 3} שיעורים נוספים
                      </div>
                    )}
                  </div>

                  {/* Module Stats */}
                  <div className="flex items-center justify-between text-xs font-medium mb-6 py-4 border-y border-slate-800">
                    <div className={clsx(
                      "flex flex-col items-center gap-1",
                      isModuleLocked ? "text-slate-600" : "text-slate-400"
                    )}>
                      <BookOpen size={18} />
                      <span>{module.lessons.filter(l => l.type === 'text').length}</span>
                    </div>
                    <div className={clsx(
                      "flex flex-col items-center gap-1",
                      isModuleLocked ? "text-slate-600" : "text-slate-400"
                    )}>
                      <PlayCircle size={18} />
                      <span>{module.lessons.filter(l => l.type === 'game').length}</span>
                    </div>
                    <div className={clsx(
                      "flex flex-col items-center gap-1",
                      isModuleLocked ? "text-slate-600" : "text-slate-400"
                    )}>
                      <HelpCircle size={18} />
                      <span>{module.lessons.filter(l => l.type === 'quiz').length}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={isModuleLocked ? '#' : `/learn/${course.id}/${module.id}`}
                    className={clsx(
                      "relative block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 overflow-hidden group/btn",
                      isModuleLocked
                        ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                        : isModuleCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
                        : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    )}
                  >
                    {!isModuleLocked && (
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isModuleLocked ? (
                        <>
                          <Lock size={18} />
                          נעול
                        </>
                      ) : isModuleCompleted ? (
                        <>
                          <Trophy size={18} />
                          הושלם!
                        </>
                      ) : progress.completed > 0 ? (
                        <>
                          <ChevronRight size={18} />
                          המשך לימוד ({progress.completed}/{progress.total})
                        </>
                      ) : (
                        <>
                          <ChevronRight size={18} />
                          התחל ללמוד
                        </>
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

