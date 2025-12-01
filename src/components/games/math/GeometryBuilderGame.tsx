'use client';

import { GeometryBuilderGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface GeometryBuilderGameProps {
  config: GeometryBuilderGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

export function GeometryBuilderGame({ config, onComplete, backUrl }: GeometryBuilderGameProps) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">📐🔷🎨</div>
          <p className="text-2xl text-white mb-4">בונה צורות גיאומטריות - מוכן ליישום!</p>
          <p className="text-slate-400 mb-6">{config.description}</p>
          <div className="bg-indigo-900/30 rounded-xl p-6 mb-6 border border-indigo-500/30">
            <p className="text-indigo-200 text-sm">
              בנה צורות גיאומטריות אינטראקטיבית!
              למד על צלעות, זוויות, היקף ושטח בצורה כיפית.
            </p>
          </div>
          <button
            onClick={() => onComplete({ score: 100 })}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold text-lg"
          >
            המשך ⭐
          </button>
        </div>
      </div>
    </GameContainer>
  );
}

