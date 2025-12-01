'use client';

import { PlaceValueBuilderGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

export function PlaceValueBuilderGame({ config, onComplete, backUrl }: { config: PlaceValueBuilderGameConfig; onComplete: GameCompletionCallback; backUrl?: string }) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">🏗️🔢📦</div>
          <p className="text-2xl text-white mb-4">בונה ערך מקום - מוכן ליישום!</p>
          <button onClick={() => onComplete({ score: 100 })} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold">המשך ⭐</button>
        </div>
      </div>
    </GameContainer>
  );
}

