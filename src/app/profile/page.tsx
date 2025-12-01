'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { User, Save, Loader2, Check, RefreshCw } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

// Using DiceBear API for rich avatars
// Styles: adventurer, bottts, fun-emoji, lorelei, notionists, open-peeps
const AVATAR_STYLES = [
  'adventurer',
  'bottts', 
  'fun-emoji',
  'lorelei', 
  'notionists', 
  'open-peeps'
];

export default function UserProfile() {
  const { user, loading } = useAuthStore();
  const [displayName, setDisplayName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('notionists');
  const [seed, setSeed] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      // Try to parse existing avatar URL to set initial state
      const currentUrl = user.photoURL || '';
      if (currentUrl.includes('dicebear.com')) {
        setCustomAvatarUrl(currentUrl);
        // Extract style and seed if possible, otherwise generate new random
        try {
            const url = new URL(currentUrl);
            const pathParts = url.pathname.split('/');
            const style = pathParts[2]; // /7.x/[style]/svg
            const seedParam = url.searchParams.get('seed');
            if (AVATAR_STYLES.includes(style)) setSelectedStyle(style);
            if (seedParam) setSeed(seedParam);
        } catch (e) {
            setSeed(user.uid);
        }
      } else {
        setSeed(user.uid);
        updateAvatarPreview('notionists', user.uid);
      }
    }
  }, [user]);

  const updateAvatarPreview = (style: string, currentSeed: string) => {
    const url = `https://api.dicebear.com/9.x/${style}/svg?seed=${currentSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    setCustomAvatarUrl(url);
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    updateAvatarPreview(style, seed);
  };

  const randomizeSeed = () => {
    const newSeed = Math.random().toString(36).substring(7);
    setSeed(newSeed);
    updateAvatarPreview(selectedStyle, newSeed);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Update Auth Profile
      await updateProfile(user, {
        displayName,
        photoURL: customAvatarUrl
      });

      // Update Firestore User Doc
      await updateDoc(doc(db, 'users', user.uid), {
        displayName,
        photoURL: customAvatarUrl
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (!user) return <div className="p-8 text-center text-white">Please log in.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <User className="text-blue-400" />
        Profile Settings
      </h1>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Column: Avatar Preview */}
            <div className="flex-1 w-full flex flex-col items-center gap-6">
                <div className="relative group w-48 h-48">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl bg-slate-800 relative">
                        {customAvatarUrl ? (
                            <Image 
                                src={customAvatarUrl} 
                                alt="Avatar" 
                                width={192} 
                                height={192} 
                                className="w-full h-full object-cover"
                                unoptimized // DiceBear SVGs don't need optimization
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-700" />
                        )}
                    </div>
                    <button 
                        onClick={randomizeSeed}
                        className="absolute bottom-2 right-2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                        title="Randomize"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
                
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">{displayName || 'Your Name'}</h3>
                    <p className="text-slate-400 text-sm">Customize your look below</p>
                </div>
            </div>

            {/* Right Column: Controls */}
            <div className="flex-[2] w-full space-y-6">
                
                {/* Style Selector */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Avatar Style</label>
                    <div className="grid grid-cols-3 gap-3">
                        {AVATAR_STYLES.map((style) => (
                            <button
                                key={style}
                                onClick={() => handleStyleChange(style)}
                                className={`p-3 rounded-xl border-2 transition-all text-sm font-medium capitalize ${
                                    selectedStyle === style 
                                    ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-700'
                                }`}
                            >
                                {style.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={user.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        Save Profile
                    </button>
                </div>

                {/* Status Message */}
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
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
