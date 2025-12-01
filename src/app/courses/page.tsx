'use client';

import { courses } from '@/lib/curriculum';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Star, Shield, Zap, GraduationCap, Brain } from 'lucide-react';
import clsx from 'clsx';

export default function CoursesPage() {
  const { user, purchasedCourses, loading: authLoading, refreshUserData } = useAuthStore();
  const router = useRouter();

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      router.push(`/login?redirect=/courses`);
      return;
    }

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, userId: user.uid }),
      });

      if (res.ok) {
        await refreshUserData();
        router.push(`/learn/${courseId}`);
      } else {
        alert('שגיאה בעת הרישום לקורס. אנא צור קשר עם התמיכה.');
      }
    } catch (err) {
      console.error(err);
      alert('אירעה שגיאה. נסה שוב.');
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-300 text-sm font-medium mb-6">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span>השקעה בעתיד שלך</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            חנות הקורסים
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            בחר את המסלול שמתאים לך והתחל ללמוד עוד היום. 
            גישה לכל החיים, עדכונים שוטפים ותמיכה מלאה.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const isPurchased = purchasedCourses.includes(course.id);
            
            // Calculate dynamic course statistics
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
            const totalModules = course.modules.length;
            const quizLessons = course.modules.reduce((sum, m) => 
              sum + m.lessons.filter(l => l.type === 'quiz').length, 0
            );
            const gameLessons = course.modules.reduce((sum, m) => 
              sum + m.lessons.filter(l => l.type === 'game').length, 0
            );

            // Use custom features if available, otherwise generate from course content
            const features = course.features || [
              `${totalModules} מודולי למידה מקיפים`,
              `${totalLessons} שיעורים אינטראקטיביים`,
              `${quizLessons} בוחנים לבדיקת הבנה`,
              `${gameLessons} משחקים ותרגולים`
            ];

            return (
              <div 
                key={course.id} 
                className={clsx(
                  "relative group rounded-3xl transition-all duration-300 flex flex-col",
                  isPurchased 
                    ? "bg-slate-900/50 border-2 border-green-500/30 hover:border-green-500/50" 
                    : "bg-slate-900/50 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
                )}
              >
                {/* Course Header */}
                <div className={clsx(
                  "h-48 rounded-t-3xl relative overflow-hidden flex items-center justify-center",
                  `bg-gradient-to-br ${course.color || 'from-blue-600 to-purple-600'}`
                )}>
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                  <div className="relative z-10 text-7xl drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                    {course.icon || '🎓'}
                  </div>
                  {isPurchased && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                      <Check size={14} />
                      בבעלותך
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
                  <p className="text-slate-400 mb-6 line-clamp-2 h-12">{course.description}</p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                          <Check size={12} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-white/10">
                    {isPurchased ? (
                      <Link 
                        href={`/learn/${course.id}`} 
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40"
                      >
                        <Brain size={20} />
                        המשך ללמוד
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                      >
                        <Brain size={20} />
                        התחל ללמוד בחינם
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="border-t border-white/10 bg-slate-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-4">
                <Shield size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">למידה בטוחה</h3>
              <p className="text-slate-400 text-sm">סביבת למידה מוגנת ומותאמת לילדים</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">גישה מיידית</h3>
              <p className="text-slate-400 text-sm">התחילו ללמוד מיד לאחר ההרשמה</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 mx-auto mb-4">
                <GraduationCap size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">תעודת סיום</h3>
              <p className="text-slate-400 text-sm">קבלו תעודה יוקרתית בסיום כל קורס</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
