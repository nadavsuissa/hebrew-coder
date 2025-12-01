'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { Users, BookOpen, TrendingUp, Activity, Award, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

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
  id: string;
  title: string;
  modules?: CourseModule[];
}

interface ChartData {
  name: string;
  value?: number;
  users?: number;
  [key: string]: string | number | undefined;
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
  
  // Chart Data
  const [userGrowthData, setUserGrowthData] = useState<ChartData[]>([]);
  const [coursePopularityData, setCoursePopularityData] = useState<ChartData[]>([]);

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
      
      const users: RecentUser[] = usersData.users;
      const courses: ApiCourse[] = coursesData.courses;

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
      setRecentUsers(users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5));

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

      // --- Generate Chart Data ---

      // 1. User Growth (Last 6 Months)
      const months = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'];
      const growthMap = new Map<string, number>();
      
      // Initialize last 6 months with 0
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const key = `${months[d.getMonth()]}`;
        growthMap.set(key, 0);
      }

      users.forEach(user => {
        const d = new Date(user.createdAt);
        // Only count if within last 6 months approx (simple check)
        const monthKey = months[d.getMonth()];
        if (growthMap.has(monthKey)) {
          growthMap.set(monthKey, (growthMap.get(monthKey) || 0) + 1);
        }
      });

      const growthChartData = Array.from(growthMap.entries()).map(([name, users]) => ({ name, users }));
      setUserGrowthData(growthChartData);

      // 2. Course Popularity
      const courseCounts = new Map<string, number>();
      users.forEach(user => {
        user.purchasedCourses?.forEach(courseId => {
          // Find course name
          const course = courses.find(c => c.id === courseId);
          const name = course ? course.title : courseId;
          courseCounts.set(name, (courseCounts.get(name) || 0) + 1);
        });
      });

      // If no purchases, show dummy data or empty
      if (courseCounts.size === 0 && courses.length > 0) {
         // For demo purposes, if no data, show course distribution by lessons count or equal
         // Let's just show 0 for now to be accurate, or fallback to dummy
         courses.forEach(c => courseCounts.set(c.title, 0));
      }

      // Convert to array and sort
      const popularityChartData = Array.from(courseCounts.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Top 5

      setCoursePopularityData(popularityChartData);


    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">לוח בקרה</h1>
          <p className="text-slate-400 mt-1">סקירה כללית של ביצועי המערכת והמשתמשים</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-slate-300">מערכת פעילה</span>
          </div>
        </div>
      </div>

      {/* Stats Cards - Clean Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">סה״כ משתמשים</p>
              <h3 className="text-3xl font-bold text-white mt-2">{userStats.totalUsers.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
              <Users className="text-blue-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded">
              <ArrowUp size={12} /> +{userStats.newUsersToday}
            </span>
            <span className="text-slate-500">הצטרפו היום</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">נקודות XP שנוצרו</p>
              <h3 className="text-3xl font-bold text-white mt-2">{userStats.totalXP.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
              <Award className="text-purple-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-purple-400 flex items-center gap-1 bg-purple-400/10 px-2 py-0.5 rounded">
              <Activity size={12} /> {courseStats.completedLessons}
            </span>
            <span className="text-slate-500">שיעורים הושלמו</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-green-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">הכנסות (משוער)</p>
              <h3 className="text-3xl font-bold text-white mt-2">₪{systemStats.coursePurchases * 199}</h3>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-slate-500">מתוך {systemStats.coursePurchases} רכישות</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">שיעור השלמה</p>
              <h3 className="text-3xl font-bold text-white mt-2">{courseStats.averageCompletion}%</h3>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
              <BookOpen className="text-orange-400" size={24} />
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-700 rounded-full h-1.5">
            <div 
              className="bg-orange-400 h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${courseStats.averageCompletion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - User Growth */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-6">צמיחת משתמשים (חצי שנה אחרונה)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  tick={{ fill: '#64748B', fontSize: 12 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748B" 
                  tick={{ fill: '#64748B', fontSize: 12 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Course Popularity */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-6">פופולריות קורסים</h3>
          <div className="h-[300px] w-full relative">
            {coursePopularityData.length > 0 && coursePopularityData.some(d => (d.value || 0) > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={coursePopularityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {coursePopularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <PieChart width={200} height={200}>
                   <Pie
                    data={[{name: 'אין נתונים', value: 1}]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#1E293B"
                    dataKey="value"
                    stroke="none"
                  />
                </PieChart>
                <p className="mt-4 text-sm">אין מספיק נתונים להצגה</p>
              </div>
            )}
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {coursePopularityData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs text-slate-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Recent Users & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">משתמשים אחרונים</h3>
            <Link href="/admin/users" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              צפה בכולם
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 rounded-tr-lg text-right">משתמש</th>
                  <th className="px-4 py-3 text-right">סטטוס</th>
                  <th className="px-4 py-3 text-right">תאריך הצטרפות</th>
                  <th className="px-4 py-3 rounded-tl-lg text-right">XP</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {(user.displayName?.[0] || user.email?.[0] || '?').toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.displayName || 'משתמש ללא שם'}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium border border-green-500/20">
                        פעיל
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString('he-IL')}
                    </td>
                    <td className="px-4 py-3 font-mono text-blue-400">
                      {user.xp?.toLocaleString() || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">פעולות מהירות</h3>
            <div className="space-y-3">
              <Link 
                href="/admin/users" 
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/20 group"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                  <Users size={18} />
                </div>
                <div>
                  <div className="font-medium text-white">ניהול משתמשים</div>
                  <div className="text-xs text-slate-400">צפייה ועריכה</div>
                </div>
              </Link>

              <Link 
                href="/admin/courses" 
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/20 group"
              >
                <div className="p-2 bg-green-500/20 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="font-medium text-white">ניהול קורסים</div>
                  <div className="text-xs text-slate-400">הוספת תוכן חדש</div>
                </div>
              </Link>

              <Link 
                href="/admin/settings" 
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/20 group"
              >
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="font-medium text-white">דוחות ונתונים</div>
                  <div className="text-xs text-slate-400">סטטיסטיקות מתקדמות</div>
                </div>
              </Link>
            </div>
          </div>

          {/* System Status Mini Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">סטטוס מערכת</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">שרת API</span>
                <span className="flex items-center gap-1.5 text-green-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  תקין (98ms)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">מסד נתונים</span>
                <span className="flex items-center gap-1.5 text-green-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  מחובר
                </span>
              </div>
              <div className="w-full bg-slate-700/50 h-px"></div>
              <div className="text-xs text-slate-500 text-center">
                גרסה 1.2.0 • עודכן לאחרונה: היום
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}