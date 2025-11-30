'use client';

import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Trophy, Flame, Star, Target, BookOpen, Medal, Activity, TrendingUp, Zap, Award, CheckCircle2, Rocket, Sparkles, ArrowRight, Code2, Library } from 'lucide-react';
import Link from 'next/link';
import { getAllCourses } from '@/lib/curriculum';
import clsx from 'clsx';

export default function DashboardPage() {
  const { xp, completedLessons, streakDays, checkStreak } = useUserStore();
  const { user, loading, purchasedCourses } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkStreak();
  }, [checkStreak]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!mounted || loading || !user) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getLevel = (xp: number) => Math.floor(xp / 1000) + 1;
  const getProgressToNextLevel = (xp: number) => ((xp % 1000) / 1000) * 100;
  const getLevelTitle = (level: number) => {
    if (level < 5) return 'תלמיד מתחיל';
    if (level < 10) return 'תלמיד מתקדם';
    if (level < 20) return 'חוקר צעיר';
    if (level < 30) return 'מדען צעיר';
    return 'גאון הדור';
  };

  // Calculate course progress
  const getCourseProgress = () => {
    const courses = getAllCourses();
    const userCourses = courses.filter(course => purchasedCourses.includes(course.id));
    
    return userCourses.map(course => {
      const allLessons = course.modules.flatMap(m => m.lessons);
      const total = allLessons.length;
      const completed = allLessons.filter(l => completedLessons.includes(l.id)).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { ...course, completed, total, percentage };
    });
  };

  const courseProgress = getCourseProgress();
  const totalLessons = courseProgress.reduce((sum, c) => sum + c.total, 0);
  const completedCount = completedLessons.length;
  const completedPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Calculate achievements
  const achievements = [
    { id: 'first', unlocked: completedLessons.length > 0, title: 'צעד ראשון', desc: 'השלמת שיעור ראשון', icon: Target, color: 'green' },
    { id: 'streak5', unlocked: streakDays >= 5, title: 'רצף חם', desc: '5 ימים ברצף', icon: Flame, color: 'orange' },
    { id: 'streak10', unlocked: streakDays >= 10, title: 'מחויבות', desc: '10 ימים ברצף', icon: Zap, color: 'yellow' },
    { id: 'level5', unlocked: getLevel(xp) >= 5, title: 'תלמיד מתקדם', desc: 'הגעת לרמה 5', icon: Trophy, color: 'blue' },
    { id: 'level10', unlocked: getLevel(xp) >= 10, title: 'חוקר צעיר', desc: 'הגעת לרמה 10', icon: Award, color: 'purple' },
    { id: 'lessons10', unlocked: completedLessons.length >= 10, title: 'לומד נחוש', desc: '10 שיעורים הושלמו', icon: BookOpen, color: 'indigo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1a1f3a] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Header */}
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/50">
                        🚀
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0F172A] flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        היי {user.displayName?.split(' ')[0] || 'אלוף'}! 👋
                      </h1>
                      <p className="text-slate-300 mt-1">כיף לראות אותך שוב. בוא נראה מה השגת.</p>
                    </div>
                  </div>
                  
                  {/* Level Badge */}
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="relative">
                      <Trophy className="text-yellow-400" size={24} />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-black">{getLevel(xp)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">רמה נוכחית</div>
                      <div className="font-bold text-lg">{getLevelTitle(getLevel(xp))}</div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/learn" 
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>המשך ללמוד</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Grid - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard 
              icon={<Flame className="text-orange-500" size={28} />}
              label="רצף ימים"
              value={streakDays.toString()}
              subtext="ימים ברצף"
              gradient="from-orange-500/20 to-red-500/20"
              borderColor="border-orange-500/30"
            />
            <StatCard 
              icon={<Star className="text-yellow-400" size={28} />}
              label="נקודות XP"
              value={xp.toLocaleString()}
              subtext="סה״כ נקודות"
              gradient="from-yellow-500/20 to-amber-500/20"
              borderColor="border-yellow-500/30"
            />
            <StatCard 
              icon={<BookOpen className="text-blue-400" size={28} />}
              label="שיעורים"
              value={completedLessons.length.toString()}
              subtext="הושלמו בהצלחה"
              gradient="from-blue-500/20 to-cyan-500/20"
              borderColor="border-blue-500/30"
            />
            <StatCard 
              icon={<TrendingUp className="text-green-400" size={28} />}
              label="התקדמות"
              value={`${completedPercentage}%`}
              subtext="מכל הקורסים"
              gradient="from-green-500/20 to-emerald-500/20"
              borderColor="border-green-500/30"
            />
          </div>

          {/* Level Progress - Enhanced */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                  <Activity className="text-blue-400" size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-xl">התקדמות לרמה {getLevel(xp) + 1}</h2>
                  <p className="text-sm text-slate-400">{getLevelTitle(getLevel(xp) + 1)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {xp % 1000}
                </div>
                <div className="text-sm text-slate-400">/ 1000 XP</div>
              </div>
            </div>
            <div className="relative h-6 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${getProgressToNextLevel(xp)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>רמה {getLevel(xp)}</span>
              <span className="text-blue-400 font-medium">{1000 - (xp % 1000)} XP עד הרמה הבאה</span>
              <span>רמה {getLevel(xp) + 1}</span>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
                <Library className="text-indigo-400" size={24} />
              </div>
              <h2 className="font-bold text-xl">התקדמות בקורסים</h2>
            </div>
            
            {courseProgress.length > 0 ? (
              <div className="space-y-4">
                {courseProgress.map((course, idx) => (
                  <div key={course.id} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all shadow-lg",
                          `bg-gradient-to-br ${course.color || 'from-blue-500 to-purple-500'} text-white`
                        )}>
                          {course.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{course.title}</div>
                          <div className="text-xs text-slate-400">{course.completed} / {course.total} שיעורים</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{course.percentage}%</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div 
                        className={clsx(
                          "h-full transition-all duration-1000 ease-out",
                          course.percentage === 100 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                            : `bg-gradient-to-r ${course.color || 'from-blue-500 to-purple-500'}`
                        )}
                        style={{ width: `${course.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">עדיין לא נרשמת לקורסים.</p>
                <Link 
                  href="/learn" 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors"
                >
                  <span>דפדף בקורסים</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl">
                  <Medal className="text-yellow-400" size={24} />
                </div>
                <h3 className="font-bold text-xl">הישגים</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  const colorClasses = {
                    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
                    orange: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400',
                    yellow: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400',
                    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
                    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
                    indigo: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
                  };
                  
                  return (
                    <div
                      key={achievement.id}
                      className={clsx(
                        "p-4 rounded-xl border transition-all",
                        achievement.unlocked
                          ? `bg-gradient-to-br ${colorClasses[achievement.color as keyof typeof colorClasses]} shadow-lg`
                          : "bg-slate-800/30 border-slate-700/50 opacity-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={24} className={achievement.unlocked ? '' : 'text-slate-600'} />
                        <div className="flex-1">
                          <div className={clsx("font-bold text-sm", achievement.unlocked ? '' : 'text-slate-500')}>
                            {achievement.title}
                          </div>
                          <div className={clsx("text-xs mt-1", achievement.unlocked ? 'text-slate-300' : 'text-slate-600')}>
                            {achievement.desc}
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                  <Rocket className="text-blue-400" size={40} />
                </div>
                <h3 className="font-bold text-2xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  רוצה עוד אתגר?
                </h3>
                <p className="text-slate-300 mb-6">
                  השלם את כל הקורסים כדי לפתוח את מצב המאסטר ולהשיג הישגים מיוחדים!
                </p>
                <Link 
                  href="/learn" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  <span>לעמוד הקורסים</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  subtext, 
  gradient, 
  borderColor 
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  subtext: string,
  gradient?: string,
  borderColor?: string
}) {
  return (
    <div className={clsx(
      "relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl group overflow-hidden",
      borderColor || "border-slate-700/50"
    )}>
      {/* Background gradient effect */}
      {gradient && (
        <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", gradient)} />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={clsx("p-3 rounded-xl bg-slate-900/50 backdrop-blur-sm", gradient ? `bg-gradient-to-br ${gradient}` : '')}>
            {icon}
          </div>
        </div>
        <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-sm font-semibold text-slate-300 mb-1">{label}</div>
        <div className="text-xs text-slate-500">{subtext}</div>
      </div>
    </div>
  );
}
