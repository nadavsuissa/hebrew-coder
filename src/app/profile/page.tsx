'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { User, Save, Loader2, Check } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Predefined avatar options
const AVATAR_OPTIONS = [
  // Animals
  { id: '🐵', name: 'Monkey', category: 'animals' },
  { id: '🦁', name: 'Lion', category: 'animals' },
  { id: '🐯', name: 'Tiger', category: 'animals' },
  { id: '🐶', name: 'Dog', category: 'animals' },
  { id: '🐱', name: 'Cat', category: 'animals' },
  { id: '🐻', name: 'Bear', category: 'animals' },
  { id: '🐷', name: 'Pig', category: 'animals' },
  { id: '🐮', name: 'Cow', category: 'animals' },
  { id: '🐸', name: 'Frog', category: 'animals' },
  { id: '🐔', name: 'Chicken', category: 'animals' },
  { id: '🦄', name: 'Unicorn', category: 'fantasy' },
  { id: '🐉', name: 'Dragon', category: 'fantasy' },
  { id: '🦋', name: 'Butterfly', category: 'nature' },
  { id: '🌸', name: 'Flower', category: 'nature' },
  { id: '🌟', name: 'Star', category: 'space' },
  { id: '🚀', name: 'Rocket', category: 'space' },
  { id: '⚡', name: 'Lightning', category: 'elements' },
  { id: '🔥', name: 'Fire', category: 'elements' },
  { id: '💧', name: 'Water', category: 'elements' },
  { id: '🌪️', name: 'Wind', category: 'elements' },
  // More fun options
  { id: '🎨', name: 'Artist', category: 'creative' },
  { id: '🎵', name: 'Musician', category: 'creative' },
  { id: '⚽', name: 'Soccer', category: 'sports' },
  { id: '🏀', name: 'Basketball', category: 'sports' },
  { id: '🎮', name: 'Gamer', category: 'gaming' },
  { id: '💻', name: 'Coder', category: 'tech' },
  { id: '📚', name: 'Reader', category: 'learning' },
  { id: '🧠', name: 'Brain', category: 'intelligence' },
  { id: '🌈', name: 'Rainbow', category: 'colors' },
  { id: '💎', name: 'Gem', category: 'precious' },
];

export default function UserProfile() {
  const { user, loading } = useAuthStore();
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setSelectedAvatar(user.photoURL || '🐵');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Update Auth Profile
      await updateProfile(user, {
        displayName,
        photoURL: selectedAvatar
      });

      // Update Firestore User Doc
      await updateDoc(doc(db, 'users', user.uid), {
        displayName,
        photoURL: selectedAvatar
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
        {/* Current Avatar Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl border-4 border-slate-700 shadow-xl">
            {selectedAvatar}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-white">{displayName || 'Your Name'}</p>
            <p className="text-sm text-slate-400">Current Avatar</p>
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>Choose Your Avatar</span>
            <span className="text-sm text-slate-400 font-normal">(Click to select)</span>
          </h3>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {AVATAR_OPTIONS.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 transition-all hover:scale-110 ${
                  selectedAvatar === avatar.id
                    ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
                title={avatar.name}
              >
                {avatar.id}
                {selectedAvatar === avatar.id && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={8} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form Section */}
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

        {/* Status Message */}
        {message.text && (
          <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {message.text}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Save Changes
        </button>
      </div>
    </div>
  );
}

