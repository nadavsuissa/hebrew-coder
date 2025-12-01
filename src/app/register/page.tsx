'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, ArrowLeft } from 'lucide-react';
import { FirebaseError } from 'firebase/app';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        purchasedCourses: [],
        xp: 0,
        completedLessons: []
      });

      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      const errorCode = err instanceof FirebaseError ? err.code : 'unknown';
      setError(getErrorMessage(errorCode));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Check if user already exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Only create new document if it doesn't exist
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          createdAt: new Date(),
          purchasedCourses: [],
          xp: 0,
          completedLessons: []
        });
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      setError('הרשמה עם גוגל נכשלה');
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'האימייל הזה כבר בשימוש';
      case 'auth/invalid-email':
        return 'כתובת אימייל לא תקינה';
      case 'auth/weak-password':
        return 'הסיסמה חלשה מדי';
      default:
        return 'אירעה שגיאה בהרשמה. נסה שוב מאוחר יותר.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4 shadow-lg shadow-purple-500/20">
            <Rocket className="text-purple-400" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">צור חשבון חדש 🚀</h1>
          <p className="text-slate-400">הצטרף לאלפי לומדים ומתכנתים</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl border border-slate-700"
        >
           <svg className="w-6 h-6" viewBox="0 0 24 24">
             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
             <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
           </svg>
          הירשם עם Google
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#0F1623] text-slate-500 rounded-full">או עם אימייל</span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium mr-1">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
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
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium mr-1">אימות סיסמה</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              'יוצר משתמש...'
            ) : (
              <>
                <span>צור חשבון חינם</span>
                <ArrowLeft size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            כבר יש לך חשבון?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
              התחבר כאן
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
