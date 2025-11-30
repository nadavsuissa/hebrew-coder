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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  "group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-none",
                  isModuleLocked
                    ? "bg-slate-900/30 border-slate-800 opacity-60"
                    : isModuleCompleted
                    ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20"
                    : "bg-slate-800/50 border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
                )}
              >
                {/* Module Number Badge */}
                <div className={clsx(
                  "absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg",
                  isModuleCompleted
                    ? "bg-green-500 text-white"
                    : "bg-slate-700 text-slate-300"
                )}>
                  {moduleIndex + 1}
                </div>

                {/* Content */}
                <div className="p-6 pt-16">
                  {/* Module Title */}
                  <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                    {module.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 min-h-[3rem]">
                    {module.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>התקדמות</span>
                      <span className="font-bold text-slate-300">{progress.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          "h-full transition-all duration-500",
                          isModuleCompleted ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-blue-500 to-purple-500"
                        )}
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Lessons Preview */}
                  <div className="space-y-2 mb-4">
                    {module.lessons.slice(0, 3).map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const Icon = lesson.type === 'game' ? PlayCircle : lesson.type === 'quiz' ? HelpCircle : BookOpen;
                      
                      return (
                        <div
                          key={lesson.id}
                          className={clsx(
                            "flex items-center gap-2 text-sm p-2 rounded-lg",
                            isCompleted ? "bg-green-500/10 text-green-400" : "bg-slate-700/30 text-slate-400"
                          )}
                        >
                          <Icon size={16} />
                          <span className="truncate flex-1">{lesson.title}</span>
                          {isCompleted && <CheckCircle size={14} className="text-green-500" />}
                        </div>
                      );
                    })}
                    {module.lessons.length > 3 && (
                      <div className="text-xs text-slate-500 text-center py-1">
                        +{module.lessons.length - 3} שיעורים נוספים
                      </div>
                    )}
                  </div>

                  {/* Module Stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{module.lessons.filter(l => l.type === 'text').length} שיעורים</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle size={14} />
                      <span>{module.lessons.filter(l => l.type === 'game').length} משחקים</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HelpCircle size={14} />
                      <span>{module.lessons.filter(l => l.type === 'quiz').length} בוחנים</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={isModuleLocked ? '#' : `/learn/${course.id}/${module.id}`}
                    className={clsx(
                      "block w-full py-3 rounded-xl font-bold text-center transition-all",
                      isModuleLocked
                        ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                        : isModuleCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                    )}
                  >
                    {isModuleLocked ? (
                      <span className="flex items-center justify-center gap-2">
                        <Lock size={18} />
                        נעול
                      </span>
                    ) : isModuleCompleted ? (
                      <span className="flex items-center justify-center gap-2">
                        <Trophy size={18} />
                        הושלם!
                      </span>
                    ) : progress.completed > 0 ? (
                      `המשך לימוד (${progress.completed}/${progress.total})`
                    ) : (
                      'התחל ללמוד'
                    )}
                  </Link>
                </div>

                {/* Completion Badge */}
                {isModuleCompleted && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg">
                      <Trophy size={20} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

