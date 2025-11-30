import React, { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Terminal, Activity } from 'lucide-react';

export const Console: React.FC = () => {
  const { trace, currentStep } = useGameStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const logs: string[] = [];
  if (trace) {
      for (let i = 0; i <= currentStep && i < trace.length; i++) {
          if (trace[i].log) {
              logs.push(trace[i].log!);
          }
      }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, trace]);

  return (
    <div className="flex flex-col h-full overflow-hidden font-mono transition-colors duration-300">
        <div className="px-4 py-2 border-b border-slate-700/30 flex items-center justify-between text-slate-500 bg-black/20">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest">
                <Terminal size={12} />
                <span>SYSTEM_LOG</span>
            </div>
            <Activity size={12} className="text-green-500 animate-pulse" />
        </div>
        <div className="flex-1 p-4 text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent text-slate-300" dir="ltr">
            {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-2 opacity-50">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-ping" />
                    <span className="text-xs tracking-widest">AWAITING INPUT...</span>
                </div>
            ) : (
                logs.map((line, i) => (
                    <div key={i} className="mb-1.5 break-words font-medium">
                        <span className="text-blue-500 mr-2">➜</span>
                        <span>{line}</span>
                    </div>
                ))
            )}
            {trace[currentStep]?.error && (
                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs">
                    <span className="font-bold block mb-1">⚠ CRITICAL ERROR</span>
                    {trace[currentStep].error}
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    </div>
  );
};
