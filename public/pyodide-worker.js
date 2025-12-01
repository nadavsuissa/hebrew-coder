importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js");

let pyodide = null;
let isReady = false;

// Optimized clone
const fastClone = (objs) => objs.map(o => ({ ...o, pos: { ...o.pos } }));

const MAX_STEPS = 1000;

async function loadPyodideInstance() {
  try {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
    });
    // Pre-load micropip or other packages if needed
    isReady = true;
    postMessage({ type: 'READY' });
  } catch (err) {
    postMessage({ type: 'ERROR', error: err.message });
  }
}

loadPyodideInstance();

self.onmessage = async (event) => {
  const { type, code, context } = event.data;

  if (type === 'RUN_CODE') {
    if (!isReady) {
      postMessage({ type: 'ERROR', error: "Pyodide is not ready yet." });
      return;
    }

    try {
      const { level, initialObjects } = context;

      // 1. Initialize Simulation State
      let simState = {
        playerPos: { ...level.startPosition },
        playerDir: level.startDirection,
        objects: fastClone(initialObjects),
        step: 0
      };

      const trace = [];

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

      // 2. Define Python Bridge
      // We expose a clean API to Python that calls back into JS (this worker)
      // Since we are in a worker, we can't easily call back to the main thread synchronously during execution
      // if we wanted to yield. But for this simulation, we just run to completion and build the trace.
      
      // We'll use a global object in the Pyodide JS scope to hold state
      self.sim_context = {
        move: (direction, steps) => {
          if (simState.step >= MAX_STEPS) {
             throw new Error(`Execution limit exceeded (${MAX_STEPS} steps). Check for infinite loops!`);
          }

          simState.step++;
          const { playerPos } = simState;
          let newPos = { ...playerPos };

          if (direction === 'up') newPos.y -= steps;
          if (direction === 'down') newPos.y += steps;
          if (direction === 'left') newPos.x -= steps;
          if (direction === 'right') newPos.x += steps;

          simState.playerDir = direction;

          // Check Collisions
          let hitWall = false;
          if (newPos.x < 0 || newPos.x >= level.gridSize.cols ||
              newPos.y < 0 || newPos.y >= level.gridSize.rows ||
              simState.objects.some(o => o.type === 'wall' && o.pos.x === newPos.x && o.pos.y === newPos.y)) {
            hitWall = true;
          }

          if (!hitWall) {
            simState.playerPos = newPos;
             // Check Interactions (Collect)
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
        },
        log: (text) => {
           if (trace.length > 0) {
            const lastFrame = trace[trace.length - 1];
            lastFrame.log = lastFrame.log ? lastFrame.log + "\n" + text : text;
           }
        }
      };

      // Bridge Code
      const bridgeCode = `
import sys
from js import sim_context

# --- Beginner Friendly API ---
def move_up(steps=1):
    sim_context.move('up', steps)

def move_down(steps=1):
    sim_context.move('down', steps)

def move_left(steps=1):
    sim_context.move('left', steps)

def move_right(steps=1):
    sim_context.move('right', steps)

def speak(text):
    sim_context.log(str(text))

# --- Advanced API ---
class Hero:
    def move(self, direction, steps=1):
        sim_context.move(direction, steps)
    
    def speak(self, text):
        sim_context.log(str(text))

# Redirect stdout
class StdoutRedirect:
    def write(self, text):
        if text.strip():
            sim_context.log(text)
    def flush(self):
        pass

sys.stdout = StdoutRedirect()
hero = Hero()
rover = Hero()
`;

      // Run the code
      await pyodide.runPythonAsync(bridgeCode + "\n" + code);

      postMessage({ type: 'SUCCESS', trace });

    } catch (err) {
      postMessage({ type: 'ERROR', error: err.message });
    }
  }
};

