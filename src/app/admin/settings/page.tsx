'use client';

import React, { useState, ComponentType } from 'react';
import { Settings, Database, Shield, Bell, Globe, Save, Key } from 'lucide-react';

interface SettingCardProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingCard: React.FC<SettingCardProps> = ({
  icon: Icon,
  title,
  description,
  children
}) => (
  <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
        <Icon className="text-blue-400" size={24} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        {children}
      </div>
    </div>
  </div>
);

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Hebrew Code Monkey',
    siteDescription: 'Learn Python in Hebrew',
    allowRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    defaultUserRole: 'user',
    maxUsersPerDay: 100,
    emailNotifications: true,
    pushNotifications: false,
    theme: 'dark',
    language: 'he'
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    // Here you would save to database
  };

  const updateSetting = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-600/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Settings className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                הגדרות מערכת
              </h1>
              <p className="text-slate-300">
                ניהול הגדרות המערכת והעדפות
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={20} />
            {saving ? 'שומר...' : 'שמור שינויים'}
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <SettingCard
          icon={Globe}
          title="הגדרות כלליות"
          description="הגדרות בסיסיות של האתר והמערכת"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                שם האתר
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => updateSetting('siteName', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                תיאור האתר
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => updateSetting('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                שפה ברירת מחדל
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </SettingCard>

        {/* User Management */}
        <SettingCard
          icon={Shield}
          title="ניהול משתמשים"
          description="הגדרות הקשורות לרישום וניהול משתמשים"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-300">אפשר רישום</div>
                <div className="text-xs text-slate-500">משתמשים חדשים יכולים להירשם</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) => updateSetting('allowRegistration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-300">אימות אימייל</div>
                <div className="text-xs text-slate-500">דרוש אימות אימייל לרישום</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => updateSetting('requireEmailVerification', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                תפקיד ברירת מחדל
              </label>
              <select
                value={settings.defaultUserRole}
                onChange={(e) => updateSetting('defaultUserRole', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="user">משתמש רגיל</option>
                <option value="moderator">מנחה</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                מקסימום רישומים ביום
              </label>
              <input
                type="number"
                value={settings.maxUsersPerDay}
                onChange={(e) => updateSetting('maxUsersPerDay', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard
          icon={Bell}
          title="התראות"
          description="הגדרות התראות והודעות"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-300">התראות אימייל</div>
                <div className="text-xs text-slate-500">שלח התראות בדוא״ל</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-300">התראות דחיפה</div>
                <div className="text-xs text-slate-500">שלח התראות דחיפה</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </SettingCard>

        {/* System */}
        <SettingCard
          icon={Database}
          title="מערכת"
          description="הגדרות טכניות של המערכת"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-300">מצב תחזוקה</div>
                <div className="text-xs text-slate-500">הפעל מצב תחזוקה</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => updateSetting('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ערכת נושא
              </label>
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="dark">כהה</option>
                <option value="light">בהיר</option>
                <option value="auto">אוטומטי</option>
              </select>
            </div>
          </div>
        </SettingCard>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 backdrop-blur-xl p-6 rounded-2xl border border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
            <Key className="text-red-400" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-400 mb-2">אזור מסוכן</h3>
            <p className="text-slate-400 text-sm mb-4">
              פעולות אלה עלולות להשפיע באופן קבוע על המערכת. אנא השתמש בזהירות.
            </p>

            <div className="flex gap-4">
              <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                איפוס מסד נתונים
              </button>
              <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                ייצוא נתונים
              </button>
              <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                ייבוא נתונים
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
