'use client';

import { NumberLineGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface NumberLineGameProps {
  config: NumberLineGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

export function NumberLineGame({ config, onComplete, backUrl }: NumberLineGameProps) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">📏➡️🔢</div>
          <p className="text-2xl text-white mb-4">קו המספרים - מוכן ליישום!</p>
          <p className="text-slate-400 mb-6">{config.description}</p>
          <div className="bg-blue-900/30 rounded-xl p-6 mb-6 border border-blue-500/30">
            <p className="text-blue-200 text-sm">
              משחק זה ילמד את הילדים קפיצות על קו המספרים,
              חיבור וחיסור ויזואלי, והבנת מספרים.
            </p>
          </div>
          <button
            onClick={() => onComplete({ score: 100 })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg"
          >
            המשך ⭐
          </button>
        </div>
      </div>
    </GameContainer>
  );
}

