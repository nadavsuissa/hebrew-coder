'use client';

import React, { useEffect, useState } from 'react';
import { getAllCourses } from '@/lib/curriculum';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Trophy, ChevronRight, ShoppingCart, Play, CheckCircle, Target, Award, Zap, Star } from 'lucide-react';
import clsx from 'clsx';

export default function CourseIndexPage() {
  const { completedLessons } = useUserStore();
  const { purchasedCourses, user, loading: authLoading } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (!mounted || authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const allCourses = getAllCourses();
  // Filter only purchased courses
  const courses = allCourses.filter(c => purchasedCourses.includes(c.id));

  const getCourseProgress = (course: ReturnType<typeof getAllCourses>[0]) => {
    const allLessons = course.modules.flatMap(m => m.lessons);
    const completed = allLessons.filter(l => completedLessons.includes(l.id)).length;
    const total = allLessons.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const getTotalXP = () => {
    return courses.reduce((sum, course) => {
      const courseLessons = course.modules.flatMap(m => m.lessons);
      return sum + courseLessons.reduce((lessonSum, lesson) => lessonSum + lesson.xpReward, 0);
    }, 0);
  };

  const getEarnedXP = () => {
    return courses.reduce((sum, course) => {
      const courseLessons = course.modules.flatMap(m => m.lessons);
      return sum + courseLessons
        .filter(l => completedLessons.includes(l.id))
        .reduce((lessonSum, lesson) => lessonSum + lesson.xpReward, 0);
    }, 0);
  };

  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-slate-800/50 p-8 rounded-3xl max-w-lg w-full border border-slate-700">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">אין קורסים זמינים</h1>
          <p className="text-slate-400 mb-8 text-lg">
            נראה שעדיין לא רכשת קורסים. גש לחנות הקורסים כדי להתחיל ללמוד!
          </p>
          <Link 
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all hover:scale-105"
          >
            <ShoppingCart size={24} />
            <span>לחנות הקורסים</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white">
      {/* Header Section */}
      <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                הקורסים שלי 🚀
              </h1>
              <p className="text-slate-400 text-lg">
                המשך מאיפה שהפסקת והתקדם לעבר המטרה
              </p>
            </div>
            <div className="flex gap-6 items-center">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">XP שנצברו</div>
                <div className="text-2xl font-bold text-yellow-400">{getEarnedXP()} / {getTotalXP()}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">שיעורים הושלמו</div>
                <div className="text-2xl font-bold text-green-400">{completedLessons.length}</div>
              </div>
              <Link 
                href="/courses"
                className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl transition-colors text-blue-400 hover:text-blue-300"
                title="חנות הקורסים"
              >
                <ShoppingCart size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course) => {
            const progress = getCourseProgress(course);
            const isCourseCompleted = progress.percentage === 100;
            const totalModules = course.modules.length;

            return (
              <Link
                key={course.id}
                href={`/learn/${course.id}`}
                className="group relative block"
              >
                {/* Main Card Container */}
                <div className={clsx(
                  "relative rounded-3xl overflow-hidden transition-all duration-500 transform",
                  "bg-slate-900/40 backdrop-blur-xl border border-slate-700/50",
                  "hover:border-slate-600/70 hover:shadow-2xl hover:shadow-slate-900/50",
                  "hover:-translate-y-3 hover:scale-[1.02]",
                  isCourseCompleted && "ring-2 ring-green-500/30"
                )}>
                  {/* Background Gradient Overlay */}
                  <div className={clsx(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    isCourseCompleted
                      ? "bg-gradient-to-br from-green-600/10 via-emerald-600/5 to-teal-600/10"
                      : `bg-gradient-to-br ${course.color || 'from-blue-600/10 via-purple-600/5 to-pink-600/10'}`
                  )} />

                  {/* Floating Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-transparent" />
                  </div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-white to-transparent" />
                  </div>

                  {/* Content Container */}
                  <div className="relative p-8">
                    {/* Header Section with Icon and Title */}
                    <div className="flex items-start justify-between mb-6">
                      {/* Course Icon */}
                      <div className={clsx(
                        "relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                        "bg-gradient-to-br shadow-xl transition-all duration-300 group-hover:scale-110",
                        isCourseCompleted
                          ? "from-green-500/20 to-emerald-500/20 shadow-green-500/20"
                          : `from-slate-700/80 to-slate-800/80 shadow-slate-500/20`
                      )}>
                        <span className="filter drop-shadow-sm">{course.icon || '📚'}</span>

                        {/* Subtle glow effect */}
                        <div className={clsx(
                          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          isCourseCompleted
                            ? "bg-gradient-to-br from-green-400/20 to-emerald-400/20"
                            : "bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                        )} />
                      </div>

                      {/* Completion Badge */}
                      {isCourseCompleted && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-sm font-medium text-green-400">הושלם</span>
                        </div>
                      )}
                    </div>

                    {/* Course Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                      {course.title}
                    </h2>

                    {/* Course Description */}
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    {/* Progress Section */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-300">התקדמות בקורס</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{progress.percentage}%</span>
                          {isCourseCompleted && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              "h-full transition-all duration-700 ease-out rounded-full",
                              isCourseCompleted
                                ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg shadow-green-500/30"
                                : `bg-gradient-to-r ${course.color || 'from-blue-500 via-purple-500 to-pink-500'} shadow-lg shadow-blue-500/20`
                            )}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>

                        {/* Animated progress glow */}
                        <div
                          className={clsx(
                            "absolute top-0 h-2 rounded-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-100",
                            isCourseCompleted
                              ? "bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-400/40"
                              : "bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-400/40"
                          )}
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-700/50 group-hover:border-slate-600/50 transition-colors duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <Target size={16} className="text-blue-400" />
                        </div>
                        <div className="text-lg font-bold text-white mb-1">{totalModules}</div>
                        <div className="text-xs text-slate-400 font-medium">מודולים</div>
                      </div>

                      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-700/50 group-hover:border-slate-600/50 transition-colors duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <BookOpen size={16} className="text-purple-400" />
                        </div>
                        <div className="text-lg font-bold text-white mb-1">{progress.total}</div>
                        <div className="text-xs text-slate-400 font-medium">שיעורים</div>
                      </div>

                      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-slate-700/50 group-hover:border-slate-600/50 transition-colors duration-300">
                        <div className="flex items-center justify-center mb-2">
                          <Award size={16} className="text-yellow-400" />
                        </div>
                        <div className="text-lg font-bold text-white mb-1">{progress.completed}</div>
                        <div className="text-xs text-slate-400 font-medium">הושלמו</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className={clsx(
                      "relative overflow-hidden rounded-2xl font-bold transition-all duration-300 group/btn",
                      "bg-gradient-to-r shadow-lg",
                      isCourseCompleted
                        ? "from-green-500 to-emerald-500 shadow-green-500/25 hover:shadow-green-500/40"
                        : `from-blue-500 to-purple-500 shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl`
                    )}>
                      <div className="relative px-6 py-4 bg-black/20 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isCourseCompleted ? (
                              <CheckCircle size={20} className="text-white" />
                            ) : progress.completed > 0 ? (
                              <Play size={20} className="text-white" />
                            ) : (
                              <Zap size={20} className="text-white" />
                            )}
                            <span className="text-white font-bold">
                              {isCourseCompleted
                                ? 'קורס הושלם!'
                                : progress.completed > 0
                                  ? `המשך לימוד`
                                  : 'התחל ללמוד'
                              }
                            </span>
                          </div>
                          <ChevronRight size={20} className="text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Button hover effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                  </div>

                  {/* Completion Trophy Overlay */}
                  {isCourseCompleted && (
                    <div className="absolute top-6 left-6 animate-pulse">
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 shadow-2xl shadow-yellow-500/30">
                        <Trophy size={20} className="text-white drop-shadow-sm" />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
