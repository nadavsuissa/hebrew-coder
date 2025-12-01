'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, Users, BookOpen, BarChart3, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuthStore();
  const router = useRouter();
  const [mounted] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      router.push('/dashboard');
    }
  }, [user, loading, isAdmin, router]);

  if (!mounted || loading || !user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <Shield className="mx-auto mb-4 text-blue-400" size={48} />
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>בודק הרשאות מנהל...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'דאשבורד', icon: BarChart3 },
    { href: '/admin/users', label: 'ניהול משתמשים', icon: Users },
    { href: '/admin/courses', label: 'ניהול קורסים', icon: BookOpen },
    { href: '/admin/settings', label: 'הגדרות מערכת', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Admin Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                חזרה לדאשבורד
              </Link>
              <div className="h-6 w-px bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <Shield className="text-red-400" size={24} />
                <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  פאנל מנהל
                </span>
              </div>
            </div>

            <div className="text-sm text-slate-400">
              מחובר כ: {user.displayName || user.email}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800/50",
                  window.location.pathname === item.href
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
