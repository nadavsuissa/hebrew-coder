import { create } from 'zustand';
import { Level, Position, Direction } from '@/types/game';

// --- New Types for the Engine ---

export interface GameObject {
  id: string;
  type: 'player' | 'crystal' | 'wall' | 'door' | 'key' | 'water';
  pos: Position;
  state?: 'closed' | 'open' | 'locked' | 'collected';
  color?: string;
}

export interface GameFrame {
  step: number;
  playerPos: Position;
  playerDir: Direction;
  objects: GameObject[]; // Snapshot of all objects at this step
  log: string | null; // Console output produced at this step
  lineNo: number | null; // Line of code being executed
  error: string | null;
}

interface GameStore {
  currentLevel: Level | null;
  code: string;
  
  // Execution State
  trace: GameFrame[];
  currentStep: number;
  isPlaying: boolean;
  playbackSpeed: number; // ms per step
  isGenerating: boolean; // Pyodide is running
  
  // Actions
  setLevel: (level: Level) => void;
  setCode: (code: string) => void;
  
  // Playback Actions
  setTrace: (trace: GameFrame[]) => void;
  startPlayback: () => void;
  pausePlayback: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  seekTo: (step: number) => void;
  resetPlayback: () => void;
  setGenerating: (isGen: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentLevel: null,
  code: '',
  
  trace: [],
  currentStep: 0,
  isPlaying: false,
  playbackSpeed: 500,
  isGenerating: false,

  setLevel: (level) => set({
    currentLevel: level,
    code: level.initialCode,
    trace: [],
    currentStep: 0,
    isPlaying: false
  }),

  setCode: (code) => set({ code }),

  setTrace: (trace) => set({ 
    trace, 
    currentStep: 0, 
    isPlaying: true // Auto-start
  }),

  setGenerating: (isGenerating) => set({ isGenerating }),

  startPlayback: () => set({ isPlaying: true }),
  
  pausePlayback: () => set({ isPlaying: false }),

  stepForward: () => {
    const { currentStep, trace } = get();
    if (currentStep < trace.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  seekTo: (step) => {
    const { trace } = get();
    const safeStep = Math.max(0, Math.min(step, trace.length - 1));
    set({ currentStep: safeStep });
  },

  resetPlayback: () => set({ currentStep: 0, isPlaying: false })
}));
