'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { FirebaseError } from 'firebase/app';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      const errorCode = err instanceof FirebaseError ? err.code : 'unknown';
      setError(getErrorMessage(errorCode));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      setError('התחברות עם גוגל נכשלה');
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'אימייל או סיסמה שגויים';
      case 'auth/user-not-found':
        return 'משתמש לא נמצא';
      case 'auth/wrong-password':
        return 'סיסמה שגויה';
      case 'auth/too-many-requests':
        return 'יותר מדי ניסיונות התחברות. נסה שוב מאוחר יותר.';
      default:
        return 'אירעה שגיאה בהתחברות. נסה שוב.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 shadow-lg shadow-blue-500/20">
            <Sparkles className="text-blue-400" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">ברוכים הבאים! 👋</h1>
          <p className="text-slate-400">שמחים לראות אותך שוב</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl border border-slate-700"
        >
           <svg className="w-6 h-6" viewBox="0 0 24 24">
             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
             <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
           </svg>
          התחבר עם Google
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#0F1623] text-slate-500 rounded-full">או עם אימייל</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium mr-1">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              placeholder="name@example.com"
              required
              dir="ltr"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium mr-1">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              'מתחבר...'
            ) : (
              <>
                <span>התחבר למערכת</span>
                <ArrowLeft size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            עדיין אין לך חשבון?{' '}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
              הירשם עכשיו בחינם
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
