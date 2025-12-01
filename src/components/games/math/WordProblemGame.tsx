'use client';

import { WordProblemGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface WordProblemGameProps {
  config: WordProblemGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

export function WordProblemGame({ config, onComplete, backUrl }: WordProblemGameProps) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">📖🔢💡</div>
          <p className="text-2xl text-white mb-4">בעיות מילוליות - מוכן ליישום!</p>
          <p className="text-slate-400 mb-4">{config.description}</p>
          <button onClick={() => onComplete({ score: 100 })} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold">המשך ⭐</button>
        </div>
      </div>
    </GameContainer>
  );
}

