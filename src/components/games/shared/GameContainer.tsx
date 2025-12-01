'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface GameContainerProps {
  children: React.ReactNode;
  title?: string;
  backUrl?: string;
}

/**
 * Common container wrapper for all games
 * Provides consistent layout, styling, and navigation
 */
export function GameContainer({ children, title, backUrl }: GameContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120]">
      {/* Back Button */}
      {backUrl && (
        <div className="absolute top-6 left-6 z-10">
          <Link 
            href={backUrl} 
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700 group-hover:border-blue-500/50 transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="font-bold">חזרה</span>
          </Link>
        </div>
      )}
      
      {/* Title (if provided) */}
      {title && (
        <div className="pt-24 pb-6 text-center">
          <h1 className="text-4xl font-black text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
      )}
      
      {/* Game Content */}
      {children}
    </div>
  );
}

