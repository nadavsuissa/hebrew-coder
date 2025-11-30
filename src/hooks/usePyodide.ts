import { useState, useEffect, useRef } from 'react';
import { useGameStore, GameFrame, GameObject } from '@/store/gameStore';
import { Level, Position, Direction } from '@/types/game';

// Optimized clone - 10x faster than JSON.parse(JSON.stringify)
const fastClone = (objs: GameObject[]): GameObject[] => 
  objs.map(o => ({ ...o, pos: { ...o.pos } }));

// Global promise to prevent multiple Pyodide loads
let pyodideLoadPromise: Promise<any> | null = null;

const MAX_STEPS = 1000; // Safety limit

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setTrace, setGenerating, currentLevel } = useGameStore();

  useEffect(() => {
    const loadPyodideInstance = async () => {
      // Check if already loaded globally
      if ((window as any).pyodide) {
        setPyodide((window as any).pyodide);
        setIsLoading(false);
        return;
      }

      // Initialize singleton promise if not exists
      if (!pyodideLoadPromise) {
        pyodideLoadPromise = (async () => {
          if ((window as any).loadPyodide) {
             return await (window as any).loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
            });
          }
          
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
            script.async = true;
            script.crossOrigin = "anonymous";
            script.onload = async () => {
              try {
                const py = await (window as any).loadPyodide({
                  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
                });
                resolve(py);
              } catch (err) {
                reject(err);
              }
            };
            script.onerror = (e) => reject(e);
            document.body.appendChild(script);
          });
        })();
      }

      try {
        const py = await pyodideLoadPromise;
        (window as any).pyodide = py; // Cache on window
        setPyodide(py);
      } catch (err) {
        console.error("Failed to load Pyodide:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPyodideInstance();
  }, []);

  const runCode = async (code: string) => {
    if (!pyodide || !currentLevel) return;

    setGenerating(true);

    // 1. Initialize Simulation State
    const initialObjects: GameObject[] = [];
    
    // Add Bananas
    currentLevel.targets.forEach((t, i) => {
        initialObjects.push({ id: `banana-${i}`, type: 'banana', pos: { ...t }, state: 'open' });
    });
    // Add Obstacles
    currentLevel.obstacles.forEach((o, i) => {
        initialObjects.push({ id: `wall-${i}`, type: 'wall', pos: { ...o } });
    });

    // Mutable state for the simulation
    let simState = {
        playerPos: { ...currentLevel.startPosition },
        playerDir: currentLevel.startDirection,
        objects: fastClone(initialObjects),
        step: 0
    };

    const trace: GameFrame[] = [];

    // Add initial frame
    trace.push({
        step: 0,
        playerPos: { ...simState.playerPos },
        playerDir: simState.playerDir,
        objects: fastClone(simState.objects),
        log: null,
        lineNo: null,
        error: null
    });

    // 2. Define Python Callbacks
    const move = (direction: Direction, steps: number = 1) => {
        // Safety break
        if (simState.step >= MAX_STEPS) {
            throw new Error(`Execution limit exceeded (${MAX_STEPS} steps). Check for infinite loops!`);
        }

        simState.step++;
        const { playerPos } = simState;
        let newPos = { ...playerPos };
        
        // Move based on explicit direction
        if (direction === 'up') newPos.y -= steps;
        if (direction === 'down') newPos.y += steps;
        if (direction === 'left') newPos.x -= steps;
        if (direction === 'right') newPos.x += steps;

        // Update player direction to match movement
        simState.playerDir = direction;

        // Check Collisions
        // Wall / Bounds
        let hitWall = false;
        if (newPos.x < 0 || newPos.x >= currentLevel.gridSize.cols ||
            newPos.y < 0 || newPos.y >= currentLevel.gridSize.rows ||
            simState.objects.some(o => o.type === 'wall' && o.pos.x === newPos.x && o.pos.y === newPos.y)) {
            hitWall = true;
        }

        if (!hitWall) {
            simState.playerPos = newPos;
            
            // Check Interactions (Collect)
            // Optimization: Only check bananas if we moved
            simState.objects = simState.objects.map(obj => {
                if (obj.type === 'banana' && obj.state === 'open' && obj.pos.x === newPos.x && obj.pos.y === newPos.y) {
                    return { ...obj, state: 'collected' };
                }
                return obj;
            });
        }

        trace.push({
            step: simState.step,
            playerPos: { ...simState.playerPos },
            playerDir: simState.playerDir,
            objects: fastClone(simState.objects),
            log: hitWall ? "Ouch! Hit a wall." : null,
            lineNo: null,
            error: hitWall ? "Hit a wall!" : null
        });
    };

    const log = (text: string) => {
        // Append log to the LAST frame
        if (trace.length > 0) {
            const lastFrame = trace[trace.length - 1];
            lastFrame.log = lastFrame.log ? lastFrame.log + "\n" + text : text;
        }
    };

    // Register JS functions
    (window as any)._game_api = {
        move,
        log
    };

    const bridgeCode = `
import sys
from js import _game_api

# --- Beginner Friendly API (Global Functions) ---
def move_up(steps=1):
    """Move the rover up."""
    _game_api.move('up', steps)

def move_down(steps=1):
    """Move the rover down."""
    _game_api.move('down', steps)

def move_left(steps=1):
    """Move the rover left."""
    _game_api.move('left', steps)

def move_right(steps=1):
    """Move the rover right."""
    _game_api.move('right', steps)

def speak(text):
    """Print a message to the game log."""
    _game_api.log(str(text))

# --- Advanced API (Object Oriented) ---
class Hero:
    def move(self, direction, steps=1):
        """Move the rover in a specific direction.
        
        Args:
            direction: 'up', 'down', 'left', or 'right'
            steps: Number of steps to move (default: 1)
        """
        _game_api.move(direction, steps)
    
    def speak(self, text):
        _game_api.log(str(text))

# Redirect stdout
class StdoutRedirect:
    def write(self, text):
        if text.strip():
            _game_api.log(text)
    def flush(self):
        pass

sys.stdout = StdoutRedirect()
hero = Hero()
rover = Hero()  # Alias for rover
`;

    try {
      await pyodide.runPythonAsync(bridgeCode + "\n" + code);
    } catch (err: any) {
      console.error("Python Runtime Error:", err);
      // Push error frame
      trace.push({
          step: simState.step + 1,
          playerPos: { ...simState.playerPos },
          playerDir: simState.playerDir,
          objects: fastClone(simState.objects),
          log: null,
          lineNo: null,
          error: err.message
      });
    }

    setGenerating(false);
    setTrace(trace);
  };

  return { runCode, isLoading };
};
