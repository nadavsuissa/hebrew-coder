'use client';

import { EquationBalanceGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface EquationBalanceGameProps {
  config: EquationBalanceGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

export function EquationBalanceGame({ config, onComplete, backUrl }: EquationBalanceGameProps) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">⚖️🔢✨</div>
          <p className="text-2xl text-white mb-4">מאזן משוואות - מוכן ליישום!</p>
          <p className="text-slate-400 mb-6">{config.description}</p>
          <div className="bg-purple-900/30 rounded-xl p-6 mb-6 border border-purple-500/30">
            <p className="text-purple-200 text-sm">
              למד לפתור משוואות עם מאזניים ויזואליים!
              הילדים יבינו שצריך לעשות את אותה פעולה בשני הצדדים.
            </p>
          </div>
          <button
            onClick={() => onComplete({ score: 100 })}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold text-lg"
          >
            המשך ⭐
          </button>
        </div>
      </div>
    </GameContainer>
  );
}

