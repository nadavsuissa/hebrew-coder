'use client';

import { CodeFixerGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface CodeFixerGameProps {
  config: CodeFixerGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

/**
 * Code Fixer Game - Find and fix bugs in code
 * TODO: Implement full functionality
 */
export function CodeFixerGame({ config, onComplete, backUrl }: CodeFixerGameProps) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">🚧 משחק בפיתוח</p>
          <p className="text-slate-400 mb-6">{config.description}</p>
          <button
            onClick={() => onComplete({ score: 100 })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          >
            המשך (זמני)
          </button>
        </div>
      </div>
    </GameContainer>
  );
}

