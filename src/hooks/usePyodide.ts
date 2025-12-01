import { useState, useEffect, useRef } from 'react';
import { useGameStore, GameFrame, GameObject } from '@/store/gameStore';
import { Level, Position, Direction } from '@/types/game';

// Global worker instance to persist across re-renders
let workerInstance: Worker | null = null;

export const usePyodide = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setTrace, setGenerating, currentLevel } = useGameStore();

  useEffect(() => {
    if (!workerInstance) {
      workerInstance = new Worker('/pyodide-worker.js');
    }

    const handleMessage = (event: MessageEvent) => {
      const { type, trace, error } = event.data;

      if (type === 'READY') {
        setIsReady(true);
        setIsLoading(false);
      } else if (type === 'SUCCESS') {
        setTrace(trace);
        setGenerating(false);
      } else if (type === 'ERROR') {
        console.error("Python Runtime Error:", error);
        setGenerating(false);
        // Create a single error frame if we have a runtime error so the user sees it
        // We need a way to inject this error into the game state, ideally via trace
        // For now, let's create a minimal trace with the error
        if (currentLevel) {
             const startPos = { ...currentLevel.startPosition };
             const errorFrame: GameFrame = {
                step: 1,
                playerPos: startPos,
                playerDir: currentLevel.startDirection,
                objects: [
                     ...currentLevel.targets.map((t, i) => ({ id: `crystal-${i}`, type: 'crystal' as const, pos: t, state: 'open' as const })),
                     ...currentLevel.obstacles.map((o, i) => ({ id: `wall-${i}`, type: 'wall' as const, pos: o }))
                ],
                log: null,
                lineNo: null,
                error: error
             };
             setTrace([errorFrame]);
        }
      }
    };

    workerInstance.addEventListener('message', handleMessage);

    // Cleanup listener (but keep worker alive)
    return () => {
      workerInstance?.removeEventListener('message', handleMessage);
    };
  }, [setTrace, setGenerating, currentLevel]);

  const runCode = (code: string) => {
    if (!workerInstance || !currentLevel) return;

    setGenerating(true);

    // Prepare context for the worker
    const initialObjects: GameObject[] = [
        ...currentLevel.targets.map((t, i) => ({ id: `crystal-${i}`, type: 'crystal' as const, pos: { ...t }, state: 'open' as const })),
        ...currentLevel.obstacles.map((o, i) => ({ id: `wall-${i}`, type: 'wall' as const, pos: { ...o } }))
    ];

    workerInstance.postMessage({
      type: 'RUN_CODE',
      code,
      context: {
        level: currentLevel,
        initialObjects
      }
    });
  };

  return { runCode, isLoading: !isReady && isLoading };
};
