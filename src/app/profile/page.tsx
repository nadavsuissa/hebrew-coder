'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { User, Save, Loader2, Check, RefreshCw } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import Image from 'next/image';

// DiceBear avatar styles - each produces unique, high-quality avatars
const AVATAR_STYLES = [
  { id: 'adventurer', name: 'Adventurer', description: 'RPG characters' },
  { id: 'bottts', name: 'Bottts', description: 'Friendly robots' },
  { id: 'fun-emoji', name: 'Fun Emoji', description: 'Expressive faces' },
  { id: 'lorelei', name: 'Lorelei', description: 'Artistic portraits' },
  { id: 'notionists', name: 'Notionists', description: 'Notion-style' },
  { id: 'open-peeps', name: 'Open Peeps', description: 'Hand-drawn' },
];

// Generate DiceBear URL
function generateAvatarUrl(style: string, seed: string): string {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

// Parse existing DiceBear URL to extract style and seed
function parseAvatarUrl(url: string): { style: string; seed: string } | null {
  if (!url || !url.includes('dicebear.com')) return null;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const style = pathParts[2]; // /9.x/[style]/svg
    const seed = urlObj.searchParams.get('seed') || '';
    return { style, seed };
  } catch {
    return null;
  }
}

export default function UserProfile() {
  const { user, loading, refreshUserData } = useAuthStore();
  const [displayName, setDisplayName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('notionists');
  const [seed, setSeed] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Initialize state from user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      
      // Try to parse existing avatar URL
      const parsed = parseAvatarUrl(user.photoURL || '');
      if (parsed && AVATAR_STYLES.some(s => s.id === parsed.style)) {
        setSelectedStyle(parsed.style);
        setSeed(parsed.seed);
        setAvatarUrl(user.photoURL || '');
      } else {
        // Generate new avatar with user's UID as seed
        const defaultSeed = user.uid;
        setSeed(defaultSeed);
        setAvatarUrl(generateAvatarUrl('notionists', defaultSeed));
      }
    }
  }, [user]);

  // Update avatar URL when style or seed changes
  const updateAvatar = (newStyle: string, newSeed: string) => {
    const url = generateAvatarUrl(newStyle, newSeed);
    setAvatarUrl(url);
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    updateAvatar(style, seed);
  };

  const randomizeSeed = () => {
    const newSeed = Math.random().toString(36).substring(2, 10);
    setSeed(newSeed);
    updateAvatar(selectedStyle, newSeed);
  };

  const handleSave = async () => {
    if (!user || !auth.currentUser) return;
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: avatarUrl
      });

      // Update Firestore user document
      await updateDoc(doc(db, 'users', user.uid), {
        displayName,
        photoURL: avatarUrl
      });

      // Refresh user data in the store to update UI everywhere
      await refreshUserData();

      setMessage({ type: 'success', text: 'הפרופיל עודכן בהצלחה!' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: 'error', text: 'שגיאה בעדכון הפרופיל. נסה שוב.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">יש להתחבר כדי לגשת לדף זה</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <User className="text-blue-400" />
        הגדרות פרופיל
      </h1>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Avatar Preview Section */}
          <div className="flex flex-col items-center gap-4 lg:w-64">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl bg-slate-800">
                {avatarUrl ? (
                  <Image 
                    src={avatarUrl} 
                    alt="Avatar" 
                    width={160} 
                    height={160} 
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
                  </div>
                )}
              </div>
              <button 
                onClick={randomizeSeed}
                className="absolute -bottom-2 -right-2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
                title="רנדומלי"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <p className="text-slate-400 text-sm text-center">לחץ על הכפתור לרנדומיזציה</p>
          </div>

          {/* Settings Section */}
          <div className="flex-1 space-y-6">
            
            {/* Style Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">סגנון אווטאר</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AVATAR_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleChange(style.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-right ${
                      selectedStyle === style.id 
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{style.name}</div>
                    <div className="text-xs opacity-70">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">שם תצוגה</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="הכנס את שמך"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">אימייל</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? 'שומר...' : 'שמור שינויים'}
            </button>

            {/* Status Message */}
            {message.text && (
              <div className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
                message.type === 'success' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {message.type === 'success' && <Check size={16} />}
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
