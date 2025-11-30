import React from 'react';
import { Palette, Tag } from 'lucide-react';
import clsx from 'clsx';
import { Course } from '@/types/course';

interface CourseBasicsProps {
  data: Partial<Course>;
  onChange: (updates: Partial<Course>) => void;
}

export const CourseBasics: React.FC<CourseBasicsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <span className="text-3xl">📝</span>
          מידע בסיסי
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                כותרת הקורס <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={data.title || ''}
                onChange={(e) => onChange({ title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="לדוגמה: מבוא לפייתון"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                תיאור הקורס <span className="text-red-400">*</span>
              </label>
              <textarea
                value={data.description || ''}
                onChange={(e) => onChange({ description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                placeholder="כתוב תיאור מפורט שימשוך תלמידים..."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                אייקון הקורס
              </label>
              <div className="grid grid-cols-6 gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-700/30">
                {['📚', '🧮', '🔬', '💻', '🌍', '🎨', '⚡', '🚀', '🤖', '🧠', '🔥', '💡'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => onChange({ icon: emoji })}
                    className={clsx(
                      "w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all hover:scale-110",
                      data.icon === emoji
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Palette size={16} />
                צבע עיצובי
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'from-blue-500 to-purple-500', label: 'כחול סגול', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
                  { value: 'from-green-500 to-emerald-500', label: 'ירוק', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
                  { value: 'from-red-500 to-pink-500', label: 'אדום', color: 'bg-gradient-to-r from-red-500 to-pink-500' },
                  { value: 'from-yellow-500 to-orange-500', label: 'כתום', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
                  { value: 'from-purple-500 to-indigo-500', label: 'סגול', color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
                  { value: 'from-cyan-500 to-blue-500', label: 'תכלת', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => onChange({ color: theme.value })}
                    className={clsx(
                      "h-12 rounded-xl border-2 transition-all relative overflow-hidden group",
                      data.color === theme.value ? "border-white shadow-lg" : "border-transparent hover:border-slate-600"
                    )}
                  >
                    <div className={clsx("absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity", theme.color)} />
                    <span className="relative z-10 text-xs font-bold text-white shadow-black/50 drop-shadow-md">
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Tag size={16} />
                תגיות
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="הקלד תגית ולחץ Enter..."
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val && !data.tags?.includes(val)) {
                        onChange({ tags: [...(data.tags || []), val] });
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {data.tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-full text-sm flex items-center gap-2">
                      {tag}
                      <button
                        onClick={() => onChange({ tags: data.tags?.filter(t => t !== tag) })}
                        className="hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                תכונות לכרטיס הקורס
              </label>
              <p className="text-xs text-slate-500 mb-3">
                תכונות אלו יוצגו בכרטיס הקורס בדף הקורסים. אם לא תוגדרו, יוצגו תכונות אוטומטיות לפי תוכן הקורס.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="הקלד תכונה ולחץ Enter..."
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val && !data.features?.includes(val)) {
                        onChange({ features: [...(data.features || []), val] });
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <div className="space-y-2">
                  {data.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-700/30 border border-slate-700 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="flex-1 text-sm text-slate-300">{feature}</span>
                      <button
                        onClick={() => onChange({ features: data.features?.filter((_, i) => i !== idx) })}
                        className="text-slate-500 hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
