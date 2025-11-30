import Link from 'next/link';
import { levels } from '@/lib/levels';
import { Trophy, Star, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';

export default function LevelsPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8 transition-colors duration-300">
      <header className="max-w-6xl mx-auto mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            בחר שלב
          </h1>
          <p className="text-slate-400">התקדם שלב אחר שלב כדי להפוך למאסטר פייתון</p>
        </div>
        <Link 
            href="/" 
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-transparent shadow-sm flex items-center gap-2 transition-colors"
        >
            <ChevronLeft size={18} />
            חזרה לדף הבית
        </Link>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <Link 
            key={level.id} 
            href={`/play/${level.id}`}
            className="group block bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 shadow-none transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
                <div className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                    level.difficulty === 'easy' ? "bg-green-500/10 text-green-400" :
                    level.difficulty === 'medium' ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-red-500/10 text-red-400"
                )}>
                    {level.difficulty}
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-yellow-400 transition-colors">
                    <Star size={16} fill="currentColor" />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {level.id}. {level.title}
            </h2>
            
            <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">
                {level.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Trophy size={14} />
                <span>פרס: 3 כוכבים</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

