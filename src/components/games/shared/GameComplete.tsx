'use client';

import React from 'react';
import { Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GameCompleteProps {
  score?: number;
  totalQuestions?: number;
  percentage?: number;
  message?: string;
  onRetry?: () => void;
  nextUrl?: string;
  showRetry?: boolean;
}

/**
 * Reusable game completion screen
 * Shows score, celebration, and next steps
 */
export function GameComplete({ 
  score, 
  totalQuestions, 
  percentage, 
  message = 'כל הכבוד!',
  onRetry,
  nextUrl,
  showRetry = true
}: GameCompleteProps) {
  const finalPercentage = percentage ?? (score && totalQuestions ? Math.round((score / totalQuestions) * 100) : 100);
  const isPassed = finalPercentage >= 70;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-3xl border-2 border-green-500/50 p-8 shadow-2xl text-center">
        {/* Trophy Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-yellow-300/50">
              <Trophy className="text-white" size={48} fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
          {message} 🎉
        </h2>
        
        {/* Score Display */}
        {finalPercentage !== undefined && (
          <div className="text-6xl font-black text-yellow-400 mb-4 drop-shadow-lg">
            {finalPercentage}%
          </div>
        )}
        
        {/* Details */}
        {score !== undefined && totalQuestions !== undefined && (
          <p className="text-xl text-green-100 mb-6">
            ענית נכון על {score} מתוך {totalQuestions} שאלות!
          </p>
        )}
        
        {/* Pass/Fail Message */}
        {finalPercentage < 100 && (
          <p className={`text-lg mb-6 ${isPassed ? 'text-green-200' : 'text-yellow-200'}`}>
            {isPassed ? 'עברת את המשחק בהצלחה!' : 'נסה שוב כדי לשפר את הציון'}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <RotateCcw size={20} />
              נסה שוב
            </button>
          )}
          
          {nextUrl && (
            <Link
              href={nextUrl}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              המשך
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

