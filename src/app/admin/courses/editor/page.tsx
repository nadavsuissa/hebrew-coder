'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, Eye, Settings, BookOpen } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { Course } from '@/types/course';
import { CourseBasics } from './components/CourseBasics';
import { CurriculumBuilder } from './components/CurriculumBuilder';

export default function CourseEditor() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');

  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    description: '',
    icon: '📚',
    color: 'from-blue-500 to-purple-500',
    modules: [],
    published: false,
    tags: []
  });

  const [activeTab, setActiveTab] = useState<'basics' | 'curriculum'>('basics');
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [saving, setSaving] = useState(false);
  const [canEdit, setCanEdit] = useState(true);

  const loadCourse = useCallback(async (id: string) => {
    // Avoid reloading if we already have the data for this ID to prevent overwriting local state
    if (courseData.id === id) return;

    try {
      setLoadingCourse(true);
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/admin/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        const course = data.courses.find((c: Course) => c.id === id);
        
        if (course) {
          const isOwner = course.createdBy === user?.uid;
          const isAdmin = data.userRole === 'admin';
          setCanEdit(isAdmin || isOwner);
          setCourseData(course);
        } else {
            // Course not found, redirect
            router.push('/admin/courses');
        }
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoadingCourse(false);
    }
  }, [user, router, courseData.id]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (courseId) {
      loadCourse(courseId);
    } else {
      setCourseData(prev => ({
        ...prev,
        createdBy: user?.uid || ''
      }));
    }
  }, [courseId, user, loadCourse]);

  const saveCourse = async () => {
    if (!canEdit) return;
    if (!courseData.title || !courseData.description) {
      alert('נא למלא כותרת ותיאור לקורס');
      setActiveTab('basics');
      return;
    }

    try {
      setSaving(true);
      const token = await user?.getIdToken();
      if (!token) return;

      const method = courseData.id ? 'PUT' : 'POST';
      // Ensure we send the courseId if it exists in the body for PUT
      const body = courseData.id ? { courseId: courseData.id, ...courseData } : courseData;

      const response = await fetch('/api/admin/courses', {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        
        if (!courseData.id && data.courseId) {
          // New course created
          setCourseData(prev => ({ ...prev, id: data.courseId }));
          // Update URL without reloading
          window.history.replaceState(null, '', `/admin/courses/editor?id=${data.courseId}`);
        }
        
        // Optional: Show a better notification
        alert('השינויים נשמרו בהצלחה');
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving course:', error);
      alert('שגיאה בשמירת הקורס');
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingCourse) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!canEdit) {
    return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
            <div className="text-center">
                <h3 className="text-xl font-bold text-red-400 mb-2">אין הרשאה</h3>
                <Link href="/admin/courses" className="text-slate-400 hover:text-white">חזור</Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col">
      {/* Top Bar */}
      <div className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/courses"
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-800"></div>
          <div>
            <h1 className="font-bold text-lg">{courseData.title || 'קורס חדש'}</h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className={clsx(
                "w-2 h-2 rounded-full",
                courseData.published ? "bg-green-500" : "bg-yellow-500"
              )}></span>
              {courseData.published ? 'פורסם' : 'טיוטה'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('basics')}
              className={clsx(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                activeTab === 'basics' ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-white"
              )}
            >
              <Settings size={14} />
              הגדרות
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={clsx(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                activeTab === 'curriculum' ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-white"
              )}
            >
              <BookOpen size={14} />
              תוכן הקורס
            </button>
          </div>

          <div className="h-6 w-px bg-slate-800 mx-2"></div>

          {courseData.id && (
            <Link
              href={`/learn/${courseData.id}`}
              target="_blank"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Eye size={18} />
              <span className="hidden sm:inline">תצוגה מקדימה</span>
            </Link>
          )}

          <button
            onClick={saveCourse}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {saving ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <Save size={18} />}
            <span>שמור שינויים</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {activeTab === 'basics' ? (
            <CourseBasics 
              data={courseData} 
              onChange={(updates) => setCourseData(prev => ({ ...prev, ...updates }))} 
            />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="text-3xl">📚</span>
                תוכן הקורס
              </h2>
              <CurriculumBuilder 
                modules={courseData.modules || []} 
                onChange={(modules) => setCourseData(prev => ({ ...prev, modules }))} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}