'use client';

import React, { useEffect, useState, ComponentType } from 'react';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { Users, BookOpen, TrendingUp, Activity, Award } from 'lucide-react';
import clsx from 'clsx';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalXP: number;
}

interface CourseStats {
  totalCourses: number;
  totalLessons: number;
  completedLessons: number;
  averageCompletion: number;
}

interface SystemStats {
  totalRevenue: number;
  activeSubscriptions: number;
  coursePurchases: number;
}

interface RecentUser {
  id: string;
  email?: string;
  displayName?: string;
  createdAt: string;
  xp?: number;
  lastLoginAt?: string;
  completedLessons?: string[];
  purchasedCourses?: string[];
}

interface CourseModule {
  lessons?: unknown[];
}

interface ApiCourse {
  modules?: CourseModule[];
}

export default function AdminDashboard() {
  const { } = useAuthStore();
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalXP: 0
  });
  const [courseStats, setCourseStats] = useState<CourseStats>({
    totalCourses: 0,
    totalLessons: 0,
    completedLessons: 0,
    averageCompletion: 0
  });
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalRevenue: 0,
    activeSubscriptions: 0,
    coursePurchases: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      // Fetch users and courses in parallel
      const [usersResponse, coursesResponse] = await Promise.all([
        fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!usersResponse.ok || !coursesResponse.ok) {
        throw new Error('Failed to load dashboard data');
      }

      const usersData = await usersResponse.json();
      const coursesData = await coursesResponse.json();
      
      const users = usersData.users;
      const courses = coursesData.courses;

      // Calculate user stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const totalUsers = users.length;
      const newUsersToday = users.filter((u: RecentUser) => {
        const createdAt = new Date(u.createdAt);
        return createdAt >= today;
      }).length;

      const totalXP = users.reduce((sum: number, u: RecentUser) => sum + (u.xp || 0), 0);
      const activeUsers = users.filter((u: RecentUser) => {
        const lastLogin = new Date(u.lastLoginAt || u.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return lastLogin >= weekAgo;
      }).length;

      setUserStats({
        totalUsers,
        activeUsers,
        newUsersToday,
        totalXP
      });

      // Get recent users
      setRecentUsers(users.slice(0, 5));

      // Calculate course stats
      const totalCourses = courses.length;
      const totalLessons = courses.reduce((sum: number, course: ApiCourse) =>
        sum + (course.modules?.reduce((mSum: number, module: CourseModule) => mSum + (module.lessons?.length || 0), 0) || 0), 0);

      const completedLessons = users.reduce((sum: number, user: RecentUser) => sum + (user.completedLessons?.length || 0), 0);
      // Prevent division by zero
      const potentialTotalLessons = totalUsers * totalLessons;
      const averageCompletion = potentialTotalLessons > 0 ? Math.round((completedLessons / potentialTotalLessons) * 100) : 0;

      setCourseStats({
        totalCourses,
        totalLessons,
        completedLessons,
        averageCompletion
      });

      // Mock system stats (you can integrate with Stripe later)
      setSystemStats({
        totalRevenue: 0, // Will be updated when Stripe is integrated
        activeSubscriptions: 0,
        coursePurchases: users.reduce((sum: number, user: RecentUser) => sum + (user.purchasedCourses?.length || 0), 0)
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const StatCard = ({
    icon: Icon,
    label,
    value,
    subtext,
    gradient,
    trend
  }: {
    icon: ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string | number;
    subtext?: string;
    gradient: string;
    trend?: string;
  }) => (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className={clsx("p-3 rounded-xl bg-gradient-to-br", gradient)}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <div className="text-green-400 text-sm font-medium">
            {trend}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
      <div className="text-slate-300 font-semibold mb-1">{label}</div>
      {subtext && <div className="text-slate-500 text-sm">{subtext}</div>}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            👑
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              ברוך הבא לפאנל המנהל
            </h1>
            <p className="text-slate-300 mt-1">
              ניהול מלא של המערכת והמשתמשים
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="סה״כ משתמשים"
          value={userStats.totalUsers}
          subtext={`${userStats.activeUsers} פעילים השבוע`}
          gradient="from-blue-500/20 to-cyan-500/20"
          trend="+12%"
        />
        <StatCard
          icon={BookOpen}
          label="שיעורים הושלמו"
          value={userStats.totalXP.toLocaleString()}
          subtext="סה״כ נקודות XP"
          gradient="from-green-500/20 to-emerald-500/20"
        />
        <StatCard
          icon={TrendingUp}
          label="התקדמות ממוצעת"
          value={`${courseStats.averageCompletion}%`}
          subtext="מהקורסים"
          gradient="from-purple-500/20 to-pink-500/20"
        />
        <StatCard
          icon={Award}
          label="רכישות קורסים"
          value={systemStats.coursePurchases}
          subtext="סה״כ רכישות"
          gradient="from-yellow-500/20 to-orange-500/20"
        />
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
              <BookOpen className="text-indigo-400" size={24} />
            </div>
            <h3 className="font-bold text-xl">סקירת קורסים</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">סה״כ קורסים</span>
              <span className="font-bold text-xl">{courseStats.totalCourses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">סה״כ שיעורים</span>
              <span className="font-bold text-xl">{courseStats.totalLessons}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">שיעורים הושלמו</span>
              <span className="font-bold text-xl">{courseStats.completedLessons}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
              <Activity className="text-red-400" size={24} />
            </div>
            <h3 className="font-bold text-xl">משתמשים חדשים</h3>
          </div>

          <div className="space-y-4">
            {recentUsers.map((userData) => (
              <div key={userData.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {(userData.displayName || userData.email?.[0] || '?').toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{userData.displayName || userData.email?.split('@')[0]}</div>
                    <div className="text-xs text-slate-500">{userData.email}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(userData.createdAt).toLocaleDateString('he-IL')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h3 className="font-bold text-2xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          פעולות מהירות
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-slate-800/50 hover:bg-slate-800/70 rounded-xl transition-all hover:scale-105 border border-slate-700/50">
            <Users className="mx-auto mb-2 text-blue-400" size={32} />
            <div className="font-bold">ניהול משתמשים</div>
            <div className="text-sm text-slate-400">צפה וערוך משתמשים</div>
          </button>

          <button className="p-4 bg-slate-800/50 hover:bg-slate-800/70 rounded-xl transition-all hover:scale-105 border border-slate-700/50">
            <BookOpen className="mx-auto mb-2 text-green-400" size={32} />
            <div className="font-bold">ניהול קורסים</div>
            <div className="text-sm text-slate-400">הוסף וערוך קורסים</div>
          </button>

          <button className="p-4 bg-slate-800/50 hover:bg-slate-800/70 rounded-xl transition-all hover:scale-105 border border-slate-700/50">
            <TrendingUp className="mx-auto mb-2 text-purple-400" size={32} />
            <div className="font-bold">סטטיסטיקות</div>
            <div className="text-sm text-slate-400">נתוני מערכת מפורטים</div>
          </button>
        </div>
      </div>
    </div>
  );
}
