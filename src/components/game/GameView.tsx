import React, { useEffect, useMemo } from 'react';
import { useGameStore, GameFrame } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Position, Direction } from '@/types/game';
import { RoverAsset, CrystalAsset, RockAsset, MarsTile } from './SpaceAssets';
import { PlaybackControls } from './PlaybackControls';

const CELL_SIZE = 64;
const GAP = 4;

const getRotation = (dir: Direction) => {
  switch (dir) {
    case 'up': return -90;
    case 'down': return 90;
    case 'left': return 180;
    case 'right': return 0;
  }
};

// Memoized Grid Component
const GameGrid = React.memo(({ rows, cols, obstacles }: { rows: number, cols: number, obstacles: Position[] }) => {
    const obstacleSet = useMemo(() => {
        const set = new Set<string>();
        obstacles.forEach(o => set.add(`${o.x},${o.y}`));
        return set;
    }, [obstacles]);

    return (
        <>
            {Array.from({ length: rows * cols }).map((_, i) => {
                const x = i % cols;
                const y = Math.floor(i / cols);
                const isWall = obstacleSet.has(`${x},${y}`);
                
                return (
                    <div key={i} className="w-full h-full relative">
                        {isWall ? (
                            <div className="w-full h-full relative">
                                <MarsTile variant={i} />
                                <div className="absolute inset-0 -top-2 z-10 scale-110">
                                    <RockAsset />
                                </div>
                            </div>
                        ) : <MarsTile variant={i} />}
                        
                        <span className="absolute bottom-1 right-1 text-[8px] text-white/20 font-mono select-none opacity-0 hover:opacity-100 transition-opacity">{x},{y}</span>
                    </div>
                );
            })}
        </>
    );
});

GameGrid.displayName = 'GameGrid';

export const GameView: React.FC = () => {
  const { 
    currentLevel, 
    trace, 
    currentStep, 
    stepForward, 
    isPlaying, 
    playbackSpeed,
    isGenerating
  } = useGameStore();

  // Playback Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
        interval = setInterval(() => {
            stepForward();
        }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, stepForward]);

  if (!currentLevel) return null;

  // Display Logic
  let displayState: GameFrame | null = null;
  
  if (trace.length > 0) {
      displayState = trace[currentStep];
  } else {
      // Create initial state from level config
      const startPos = { ...currentLevel.startPosition };
      const targets = currentLevel.targets.map(t => ({ ...t }));
      
      displayState = {
          step: 0,
          playerPos: startPos,
          playerDir: currentLevel.startDirection,
          objects: [
              ...targets.map((t, i) => ({ id: `crystal-${i}`, type: 'crystal' as const, pos: t, state: 'open' as const })),
              ...currentLevel.obstacles.map((o, i) => ({ id: `rock-${i}`, type: 'wall' as const, pos: { ...o } }))
          ],
          log: null,
          lineNo: null,
          error: null
      };
  }

  const { rows, cols } = currentLevel.gridSize;
  const width = cols * (CELL_SIZE + GAP);
  const height = rows * (CELL_SIZE + GAP);

  // Special View for Level 1 (System Check) - No Grid, just a Terminal Visual
  if (currentLevel.requiredOutput && currentLevel.targets.length === 0) {
      return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0F172A] dark:bg-slate-900 rounded-xl border-2 border-slate-700 dark:border-slate-600 p-8 overflow-hidden transition-colors duration-300">
              {/* CRT Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none" />
              
              <div className="z-10 text-center space-y-6">
                  <div className="w-32 h-32 mx-auto relative">
                      <div className="absolute inset-0 animate-ping opacity-20 bg-blue-500 rounded-full" />
                      <RoverAsset color="#60A5FA" />
                  </div>
                  
                  <div className="bg-black/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur font-mono">
                      <div className="text-blue-400 text-sm mb-2">STATUS CHECK</div>
                      <div className="text-xl text-white min-h-[30px]">
                          {displayState?.log ? (
                              <span className={displayState.log.includes(currentLevel.requiredOutput) ? "text-green-400" : "text-yellow-400"}>
                                  &gt; {displayState.log}
                              </span>
                          ) : (
                              <span className="animate-pulse text-slate-500">&gt; WAITING FOR SIGNAL...</span>
                          )}
                      </div>
                  </div>
              </div>
              
              <PlaybackControls />
          </div>
      );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-[#0B1120] overflow-hidden rounded-xl border-2 border-slate-700 transition-colors duration-300">
        {/* Background Decor - Stars */}
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-50 pointer-events-none" />
        
        {/* Loading Overlay */}
        {isGenerating && (
            <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm">
                <div className="text-blue-400 font-mono font-bold text-xl animate-pulse">INITIALIZING SIMULATION...</div>
            </div>
        )}

        <div 
            className="relative z-10 grid gap-1 transition-all duration-500 ease-in-out"
            style={{ 
                gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
                width: width,
                height: height,
                position: 'relative'
            }}
        >
            {/* Static Grid Layer (Memoized) */}
            <GameGrid rows={rows} cols={cols} obstacles={currentLevel.obstacles} />

            {/* Dynamic Objects Layer */}
            <AnimatePresence>
                {displayState?.objects.filter(o => o.type === 'crystal').map((obj) => {
                    const leftPos = obj.pos.x * (CELL_SIZE + GAP);
                    const topPos = obj.pos.y * (CELL_SIZE + GAP);
                    
                    return obj.state === 'open' && (
                        <motion.div
                            key={obj.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
                            exit={{ scale: 1.5, opacity: 0, y: -20 }}
                            transition={{ y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
                            className="absolute z-20 w-10 h-10 pointer-events-none"
                            style={{
                                left: `${leftPos}px`,
                                top: `${topPos}px`,
                                transform: 'translate(12px, 12px)'
                            }}
                        >
                            <CrystalAsset />
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Player Layer */}
            {displayState && (() => {
                const playerLeft = displayState.playerPos.x * (CELL_SIZE + GAP);
                const playerTop = displayState.playerPos.y * (CELL_SIZE + GAP);
                
                return (
                    <motion.div
                        className="absolute z-30 w-16 h-16 pointer-events-none origin-center"
                        style={{
                            left: 0,
                            top: 0
                        }}
                        initial={false}
                        animate={{
                            x: playerLeft,
                            y: playerTop,
                            rotate: getRotation(displayState.playerDir)
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 120, 
                            damping: 15,
                            rotate: { duration: 0.4 }
                        }}
                    >
                        <div className="w-full h-full p-1">
                            <RoverAsset />
                        </div>
                    </motion.div>
                );
            })()}
            
            {/* Error Tooltip */}
            {displayState?.error && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 bg-red-500/90 backdrop-blur text-white text-xs font-mono px-3 py-2 rounded border border-red-400 shadow-lg whitespace-nowrap"
                    style={{
                        left: displayState.playerPos.x * (CELL_SIZE + GAP),
                        top: displayState.playerPos.y * (CELL_SIZE + GAP) - 40
                    }}
                 >
                     ⚠ {displayState.error}
                 </motion.div>
            )}
        </div>

        <PlaybackControls />
    </div>
  );
};
