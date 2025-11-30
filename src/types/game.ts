export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Level {
  id: number;
  title: string;
  description: string;
  instructions?: string[]; // Step-by-step instructions
  hints?: string[]; // Helpful hints
  initialCode: string;
  gridSize: { rows: number; cols: number };
  startPosition: Position;
  startDirection: Direction;
  
  // Objectives
  targets: Position[]; // Crystals to collect
  obstacles: Position[]; // Rocks/Craters
  requiredOutput?: string; // If defined, user MUST print this exact string to win
  
  maxMoves?: number;
  difficulty: 'easy' | 'medium' | 'hard';
}
