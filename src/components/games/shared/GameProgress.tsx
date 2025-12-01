'use client';

import React from 'react';
import { Target } from 'lucide-react';

interface GameProgressProps {
  current: number;
  total: number;
  score?: number;
  label?: string;
}

/**
 * Reusable progress indicator for games
 * Shows current question/level and optional score
 */
export function GameProgress({ current, total, score, label = 'שאלה' }: GameProgressProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-blue-400" />
          <span className="text-white font-bold text-lg">
            {label} {current} מתוך {total}
          </span>
        </div>
        {score !== undefined && (
          <span className="text-blue-300 font-bold text-lg">
            ניקוד: {score}/{total}
          </span>
        )}
      </div>
      
      <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

