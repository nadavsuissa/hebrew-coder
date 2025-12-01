'use client';

import { LogicGatekeeperGameConfig, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface LogicGatekeeperGameProps {
  config: LogicGatekeeperGameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

export function LogicGatekeeperGame({ config, onComplete, backUrl }: LogicGatekeeperGameProps) {
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

