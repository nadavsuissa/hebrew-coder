import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export const PlaybackControls: React.FC = () => {
  const { 
    isPlaying, 
    currentStep, 
    trace, 
    startPlayback, 
    pausePlayback, 
    stepForward, 
    stepBackward, 
    seekTo,
    resetPlayback
  } = useGameStore();

  const maxSteps = trace.length > 0 ? trace.length - 1 : 0;

  if (trace.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl absolute bottom-8 left-1/2 -translate-x-1/2 max-w-lg z-50 transition-colors duration-300">
      {/* Progress Bar */}
      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
        <span>0</span>
        <input 
            type="range" 
            min={0} 
            max={maxSteps} 
            value={currentStep} 
            onChange={(e) => seekTo(Number(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span>{maxSteps}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={resetPlayback} className="p-2 text-slate-400 hover:text-white transition-colors" title="Restart">
            <RotateCcw size={20} />
        </button>
        
        <button onClick={stepBackward} className="p-2 text-slate-400 hover:text-white transition-colors" disabled={currentStep === 0}>
            <SkipBack size={24} fill="currentColor" />
        </button>

        <button 
            onClick={isPlaying ? pausePlayback : startPlayback}
            className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95"
        >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={stepForward} className="p-2 text-slate-400 hover:text-white transition-colors" disabled={currentStep === maxSteps}>
            <SkipForward size={24} fill="currentColor" />
        </button>
      </div>
      
      {/* Status Text */}
      <div className="text-center text-xs text-slate-500">
        {isPlaying ? 'Playing...' : `Step ${currentStep} / ${maxSteps}`}
      </div>
    </div>
  );
};

