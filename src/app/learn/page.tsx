'use client';

import React, { useEffect, useState } from 'react';
import { getAllCourses } from '@/lib/curriculum';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Trophy, ChevronRight, ShoppingCart } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => {
            const progress = getCourseProgress(course);
            const isCourseCompleted = progress.percentage === 100;
            const totalModules = course.modules.length;
            
            return (
              <Link
                key={course.id}
                href={`/learn/${course.id}`}
                className={clsx(
                  "group relative rounded-3xl border-2 transition-all duration-300 overflow-hidden",
                  isCourseCompleted
                    ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/50 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20"
                    : `bg-gradient-to-br ${course.color || 'from-blue-900/20 to-purple-900/20'} border-slate-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2`
                )}
              >
                {/* Course Icon */}
                <div className={clsx(
                  "absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg",
                  isCourseCompleted
                    ? "bg-green-500/20"
                    : "bg-slate-800/50"
                )}>
                  {course.icon || '📚'}
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Course Title */}
                  <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors pr-20">
                    {course.title}
                  </h2>
                  <p className="text-slate-400 text-base mb-6 min-h-[3rem]">
                    {course.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      <span>התקדמות כללית</span>
                      <span className="font-bold text-slate-300">{progress.percentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          "h-full transition-all duration-500",
                          isCourseCompleted 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                            : `bg-gradient-to-r ${course.color || 'from-blue-500 to-purple-500'}`
                        )}
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">{totalModules}</div>
                      <div className="text-xs text-slate-400 mt-1">מודולים</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">{progress.total}</div>
                      <div className="text-xs text-slate-400 mt-1">שיעורים</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400">{progress.completed}</div>
                      <div className="text-xs text-slate-400 mt-1">הושלמו</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className={clsx(
                    "flex items-center justify-between w-full py-4 px-6 rounded-xl font-bold transition-all",
                    isCourseCompleted
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : `bg-gradient-to-r ${course.color || 'from-blue-500 to-purple-500'} text-white hover:opacity-90`
                  )}>
                    <span>
                      {isCourseCompleted ? 'קורס הושלם!' : progress.completed > 0 ? `המשך לימוד (${progress.completed}/${progress.total})` : 'התחל ללמוד'}
                    </span>
                    <ChevronRight size={20} />
                  </div>
                </div>

                {/* Completion Badge */}
                {isCourseCompleted && (
                  <div className="absolute top-6 left-6">
                    <div className="bg-green-500 rounded-full p-3 shadow-lg">
                      <Trophy size={24} className="text-white" />
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
