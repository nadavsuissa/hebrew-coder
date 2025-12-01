'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { Code2, Menu, X, LogOut, User, Library, BookOpen, Shield, Users, Settings, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Avatar from './Avatar';

export default function Header() {
  const { user, loading } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  const isAdmin = user && useAuthStore.getState().isAdmin();

  const navLinks = [
    { href: '/learn', label: 'לומדים', icon: BookOpen },
    { href: '/courses', label: 'קורסים', icon: Library },
    ...(user ? [
      { href: '/friends', label: 'חברים', icon: Users },
      { href: '/dashboard', label: 'אזור אישי', icon: User }
    ] : []),
    ...(isAdmin ? [{ href: '/admin', label: 'פאנל מנהל', icon: Shield }] : []),
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/30 transition-all">
                <Code2 size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Hebrew Coder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                    >
                      <Avatar 
                        photoURL={user.photoURL} 
                        displayName={user.displayName || user.email} 
                        size="sm" 
                      />
                      <span className="text-sm hidden lg:block">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                      <ChevronDown size={16} className={clsx("transition-transform", isUserMenuOpen && "rotate-180")} />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
                        <div className="p-3 border-b border-slate-700">
                          <div className="text-sm text-slate-300 truncate">
                            {user.displayName || user.email?.split('@')[0]}
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {user.email}
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <User size={16} />
                            אזור אישי
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <Settings size={16} />
                            הגדרות פרופיל
                          </Link>
                        </div>
                        <div className="border-t border-slate-700">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                          >
                            <LogOut size={16} />
                            התנתק
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
                    >
                      התחברות
                    </Link>
                    <Link
                      href="/register"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-600/20"
                    >
                      הרשמה
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg text-base font-medium",
                  isActive(link.href)
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-slate-800 my-2 pt-2">
              {!loading && (
                <>
                  {user ? (
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        <User size={20} />
                        אזור אישי
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        <Settings size={20} />
                        הגדרות פרופיל
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-base font-medium text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut size={20} />
                        התנתק
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 p-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-center p-3 rounded-lg bg-slate-800 text-white font-medium"
                      >
                        התחברות
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-center p-3 rounded-lg bg-blue-600 text-white font-medium"
                      >
                        הרשמה
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
