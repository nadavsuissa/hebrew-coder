'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { BookOpen, Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { Course, Lesson } from '@/types/course';

export default function CoursesManagement() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'moderator'>('moderator');

  const loadCourses = useCallback(async () => {
    try {
      setLoadingCourses(true);
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/admin/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserRole(data.userRole);
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadCourses();
    }
  }, [user, loadCourses]);

  const deleteCourse = async (courseId: string) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק קורס זה? הפעולה אינה הפיכה.')) {
      return;
    }

    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/admin/courses', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete course');
      }

      // Remove course from state
      setCourses(courses.filter(c => c.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('שגיאה במחיקת הקורס');
    }
  };

  const getTotalLessons = (course: Course) => {
    return course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  };

  const getTotalXP = (course: Course) => {
    return course.modules.reduce((sum, module) =>
      sum + module.lessons.reduce((lessonSum: number, lesson: Lesson) => lessonSum + (lesson.xpReward || 0), 0), 0);
  };

  if (!user || loading || loadingCourses) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>טוען קורסים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1a1f3a] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </Link>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  📚
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    ניהול קורסים
                  </h1>
                  <p className="text-slate-300 mt-1">
                    צור וערוך קורסים במערכת
                  </p>
                </div>
              </div>

              <Link
                href="/admin/courses/editor"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Plus size={20} />
                קורס חדש
              </Link>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="mx-auto mb-4 text-slate-600" size={64} />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">אין קורסים</h3>
                <p className="text-slate-500 mb-4">התחל ביצירת הקורס הראשון שלך</p>
                <Link
                  href="/admin/courses/editor"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  צור קורס ראשון
                </Link>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/30 transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl",
                          `bg-gradient-to-br ${course.color || 'from-blue-500 to-purple-500'}`
                        )}>
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{course.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>{course.published ? 'פורסם' : 'טיוטה'}</span>
                            {userRole === 'admin' && course.createdBy !== user?.uid && (
                              <span className="text-xs bg-slate-700 px-2 py-1 rounded">של משתמש אחר</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-400">{course.modules.length}</div>
                        <div className="text-xs text-slate-500">מודולים</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">{getTotalLessons(course)}</div>
                        <div className="text-xs text-slate-500">שיעורים</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-yellow-400">{getTotalXP(course)}</div>
                        <div className="text-xs text-slate-500">XP</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/courses/editor?id=${course.id}`}
                        className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit size={14} />
                        ערוך
                      </Link>
                      <Link
                        href={`/learn/${course.id}`}
                        target="_blank"
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white flex items-center justify-center"
                        title="תצוגה מקדימה"
                      >
                        <Eye size={14} />
                      </Link>
                      <button 
                        onClick={() => deleteCourse(course.id)}
                        className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center justify-center"
                        title="מחק קורס"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-blue-400">{courses.length}</div>
              <div className="text-sm text-slate-400">סה״כ קורסים</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-green-400">
                {courses.reduce((sum, course) => sum + course.modules.length, 0)}
              </div>
              <div className="text-sm text-slate-400">סה״כ מודולים</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-purple-400">
                {courses.reduce((sum, course) => sum + getTotalLessons(course), 0)}
              </div>
              <div className="text-sm text-slate-400">סה״כ שיעורים</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-yellow-400">
                {courses.reduce((sum, course) => sum + getTotalXP(course), 0)}
              </div>
              <div className="text-sm text-slate-400">סה״כ XP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}