/**
 * Unified Game Type System
 * 
 * This file defines all game types and their configurations in a consistent way.
 * Every game in the system should extend BaseGameConfig with its specific needs.
 */

import { Position, Direction } from './game';

// ============================================================================
// CORE GAME TYPES
// ============================================================================

export type GameType = 
  | 'rover'           // Python code + rover simulation
  | 'math'            // Math questions
  | 'quiz'            // General knowledge quiz
  | 'code-fixer'      // Find and fix bugs
  | 'speed-typer'     // Typing speed challenge
  | 'indent-police'   // Fix indentation
  | 'parsons-puzzle'  // Drag & drop code lines
  | 'logic-gatekeeper'// Boolean logic evaluation
  | 'robot-turtle'    // Grid navigation commands
  | 'slice-master'    // String/list slicing
  | 'memory-match'    // Memory card game
  | 'output-predictor'// Predict code output
  | 'fill-blanks'     // Fill in missing code
  | 'variable-tracer';// Track variable values

// ============================================================================
// BASE GAME CONFIG (All games extend this)
// ============================================================================

export interface BaseGameConfig {
  type: GameType;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// ROVER GAME
// ============================================================================

export interface RoverGameConfig extends BaseGameConfig {
  type: 'rover';
  initialCode: string;
  gridSize: { rows: number; cols: number };
  startPosition: Position;
  startDirection: Direction;
  targets: Position[];
  obstacles: Position[];
  requiredOutput?: string; // For print-based challenges
  maxMoves?: number;
  instructions?: string[];
  hints?: string[];
}

// ============================================================================
// MATH GAME
// ============================================================================

export interface MathQuestion {
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
}

export interface MathGameConfig extends BaseGameConfig {
  type: 'math';
  questions: MathQuestion[];
}

// ============================================================================
// QUIZ GAME
// ============================================================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index
  explanation?: string;
}

export interface QuizGameConfig extends BaseGameConfig {
  type: 'quiz';
  questions: QuizQuestion[];
  passingScore?: number; // Default 70%
}

// ============================================================================
// CODE FIXER GAME
// ============================================================================

export interface CodeFixerGameConfig extends BaseGameConfig {
  type: 'code-fixer';
  brokenCode: string;
  solution: string;
  hints: string[];
  language: 'python' | 'javascript';
}

// ============================================================================
// SPEED TYPER GAME
// ============================================================================

export interface SpeedTyperGameConfig extends BaseGameConfig {
  type: 'speed-typer';
  codeSnippet: string;
  timeLimit: number; // seconds
  language: 'python' | 'javascript';
}

// ============================================================================
// INDENT POLICE GAME
// ============================================================================

export interface IndentPoliceGameConfig extends BaseGameConfig {
  type: 'indent-police';
  scrambledCode: string;
  solution: string;
  language: 'python' | 'javascript';
}

// ============================================================================
// PARSONS PUZZLE GAME
// ============================================================================

export interface ParsonsPuzzleGameConfig extends BaseGameConfig {
  type: 'parsons-puzzle';
  correctLines: string[]; // In correct order
  distractors: string[]; // Wrong lines to confuse
  language: 'python' | 'javascript';
}

// ============================================================================
// LOGIC GATEKEEPER GAME
// ============================================================================

export interface LogicExpression {
  expr: string;
  result: 'True' | 'False';
  explanation?: string;
}

export interface LogicGatekeeperGameConfig extends BaseGameConfig {
  type: 'logic-gatekeeper';
  expressions: LogicExpression[];
}

// ============================================================================
// ROBOT TURTLE GAME
// ============================================================================

export interface RobotTurtleGameConfig extends BaseGameConfig {
  type: 'robot-turtle';
  gridSize: number; // N x N grid
  startPos: Position;
  endPos: Position;
  obstacles: Position[];
  allowedCommands: string[]; // e.g., ['forward', 'turn_left', 'turn_right']
}

// ============================================================================
// SLICE MASTER GAME
// ============================================================================

export interface SliceMasterGameConfig extends BaseGameConfig {
  type: 'slice-master';
  sourceList: string; // e.g., '[0, 1, 2, 3, 4, 5]'
  targetSlice: string; // e.g., '[2, 3, 4]'
  correctAnswer: string; // e.g., '[2:5]'
  hints: string[];
}

// ============================================================================
// MEMORY MATCH GAME
// ============================================================================

export interface MemoryPair {
  front: string; // Term or code
  back: string; // Definition or output
}

export interface MemoryMatchGameConfig extends BaseGameConfig {
  type: 'memory-match';
  pairs: MemoryPair[];
}

// ============================================================================
// OUTPUT PREDICTOR GAME
// ============================================================================

export interface OutputPredictorGameConfig extends BaseGameConfig {
  type: 'output-predictor';
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  language: 'python' | 'javascript';
}

// ============================================================================
// FILL BLANKS GAME
// ============================================================================

export interface FillBlanksGameConfig extends BaseGameConfig {
  type: 'fill-blanks';
  code: string; // Code with ___ for blanks
  blanks: string[]; // Correct words in order
  hints: string[];
  language: 'python' | 'javascript';
}

// ============================================================================
// VARIABLE TRACER GAME
// ============================================================================

export interface VariableTracerGameConfig extends BaseGameConfig {
  type: 'variable-tracer';
  code: string;
  variableName: string;
  sequence: string[]; // Expected values in order
  language: 'python' | 'javascript';
}

// ============================================================================
// UNION TYPE (for type-safe game config handling)
// ============================================================================

export type GameConfig = 
  | RoverGameConfig
  | MathGameConfig
  | QuizGameConfig
  | CodeFixerGameConfig
  | SpeedTyperGameConfig
  | IndentPoliceGameConfig
  | ParsonsPuzzleGameConfig
  | LogicGatekeeperGameConfig
  | RobotTurtleGameConfig
  | SliceMasterGameConfig
  | MemoryMatchGameConfig
  | OutputPredictorGameConfig
  | FillBlanksGameConfig
  | VariableTracerGameConfig;

// ============================================================================
// GAME COMPLETION CALLBACK
// ============================================================================

export interface GameCompletionData {
  score?: number;
  timeSpent?: number;
  attempts?: number;
}

export type GameCompletionCallback = (data?: GameCompletionData) => void;

