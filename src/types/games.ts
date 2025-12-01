/**
 * Unified Game Type System - Extended Version
 * 
 * This file defines ALL game types in the system.
 * Supports learning across all school subjects for all ages!
 */

import { Position, Direction } from './game';

// ============================================================================
// CORE GAME TYPES (Expanded!)
// ============================================================================

export type GameType = 
  // Coding & Programming
  | 'rover'           
  | 'code-fixer'      
  | 'speed-typer'     
  | 'indent-police'   
  | 'parsons-puzzle'  
  | 'logic-gatekeeper'
  | 'robot-turtle'    
  | 'slice-master'    
  | 'memory-match'    
  | 'output-predictor'
  | 'fill-blanks'     
  | 'variable-tracer' 
  
  // Math Games
  | 'math'            
  | 'number-line'     // Jump on number line
  | 'fraction-pizza'  // Visual fraction learning
  | 'equation-balance'// Balance equations
  | 'geometry-builder'// Build shapes
  | 'math-race'       // Speed math facts
  | 'word-problem'    // Visual word problems
  | 'pattern-finder'  // Find number patterns
  | 'place-value-builder' // Build numbers with place value
  | 'measurement-game'// Measure and compare
  
  // Language & Reading
  | 'quiz'            
  | 'word-scramble'   // Unscramble words
  | 'sentence-builder'// Build correct sentences
  | 'spelling-bee'    // Spelling challenge
  | 'reading-comprehension' // Read and answer
  | 'vocabulary-match'// Match words to definitions
  | 'grammar-fix'     // Fix grammar errors
  | 'story-sequencer' // Order story events
  | 'rhyme-matcher'   // Find rhyming words
  | 'syllable-counter'// Count syllables
  | 'alphabet-order'  // Alphabetical ordering
  
  // Science Games
  | 'experiment-sim'  // Virtual experiment
  | 'periodic-table-quiz' // Element quiz
  | 'food-chain-builder' // Build food chains
  | 'animal-classifier' // Classify animals
  | 'plant-cycle'     // Plant life cycle
  | 'states-of-matter'// Solid/liquid/gas
  | 'simple-machines' // Identify machines
  | 'body-parts'      // Label body parts
  | 'ecosystem-builder' // Create ecosystem
  | 'weather-predictor' // Weather patterns
  
  // History & Geography
  | 'timeline-order'  // Order historical events
  | 'map-labeler'     // Label maps
  | 'historical-match'// Match events to dates
  | 'geography-quiz'  // Location quiz
  | 'culture-explorer'// Learn about cultures
  | 'artifact-identifier' // Identify artifacts
  
  // General Learning
  | 'flashcards'      // Classic flashcards
  | 'true-false-rush' // Rapid true/false
  | 'category-sort'   // Drag to categories
  | 'image-quiz'      // Quiz with images
  | 'crossword'       // Crossword puzzle
  | 'word-search'     // Find hidden words
  | 'bingo-game'      // Educational bingo
  | 'matching-pairs'  // Match pairs
  | 'sequence-game'   // Order items correctly
  | 'spot-difference' // Find differences
  | 'jigsaw-puzzle'   // Educational jigsaw
  | 'connect-dots'    // Connect the dots
  | 'coloring-quiz'   // Color by answer
  | 'memory-cards'    // Memory card matching
  | 'wheel-of-fortune'// Spin and answer
  | 'treasure-hunt'   // Find hidden items
  | 'maze-runner'     // Navigate maze
  | 'tower-builder'   // Stack correct answers;

// ============================================================================
// BASE GAME CONFIG
// ============================================================================

export interface BaseGameConfig {
  type: GameType;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// EXISTING GAMES (Already Implemented)
// ============================================================================

export interface RoverGameConfig extends BaseGameConfig {
  type: 'rover';
  initialCode: string;
  gridSize: { rows: number; cols: number };
  startPosition: Position;
  startDirection: Direction;
  targets: Position[];
  obstacles: Position[];
  requiredOutput?: string;
  maxMoves?: number;
  instructions?: string[];
  hints?: string[];
}

export interface MathQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface MathGameConfig extends BaseGameConfig {
  type: 'math';
  questions: MathQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizGameConfig extends BaseGameConfig {
  type: 'quiz';
  questions: QuizQuestion[];
  passingScore?: number;
}

export interface CodeFixerGameConfig extends BaseGameConfig {
  type: 'code-fixer';
  brokenCode: string;
  solution: string;
  hints: string[];
  language: 'python' | 'javascript';
}

export interface SpeedTyperGameConfig extends BaseGameConfig {
  type: 'speed-typer';
  codeSnippet: string;
  timeLimit: number;
  language: 'python' | 'javascript';
}

export interface IndentPoliceGameConfig extends BaseGameConfig {
  type: 'indent-police';
  scrambledCode: string;
  solution: string;
  language: 'python' | 'javascript';
}

export interface ParsonsPuzzleGameConfig extends BaseGameConfig {
  type: 'parsons-puzzle';
  correctLines: string[];
  distractors: string[];
  language: 'python' | 'javascript';
}

export interface LogicExpression {
  expr: string;
  result: 'True' | 'False';
  explanation?: string;
}

export interface LogicGatekeeperGameConfig extends BaseGameConfig {
  type: 'logic-gatekeeper';
  expressions: LogicExpression[];
}

export interface RobotTurtleGameConfig extends BaseGameConfig {
  type: 'robot-turtle';
  gridSize: number;
  startPos: Position;
  endPos: Position;
  obstacles: Position[];
  allowedCommands: string[];
}

export interface SliceMasterGameConfig extends BaseGameConfig {
  type: 'slice-master';
  sourceList: string;
  targetSlice: string;
  correctAnswer: string;
  hints: string[];
}

export interface MemoryPair {
  front: string;
  back: string;
}

export interface MemoryMatchGameConfig extends BaseGameConfig {
  type: 'memory-match';
  pairs: MemoryPair[];
}

export interface OutputPredictorGameConfig extends BaseGameConfig {
  type: 'output-predictor';
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  language: 'python' | 'javascript';
}

export interface FillBlanksGameConfig extends BaseGameConfig {
  type: 'fill-blanks';
  code: string;
  blanks: string[];
  hints: string[];
  language: 'python' | 'javascript';
}

export interface VariableTracerGameConfig extends BaseGameConfig {
  type: 'variable-tracer';
  code: string;
  variableName: string;
  sequence: string[];
  language: 'python' | 'javascript';
}

// ============================================================================
// NEW MATH GAMES
// ============================================================================

export interface NumberLineGameConfig extends BaseGameConfig {
  type: 'number-line';
  startNumber: number;
  endNumber: number;
  targetNumber: number;
  jumpSize?: number;
  operations?: Array<{ operator: '+' | '-', value: number }>;
}

export interface FractionPizzaGameConfig extends BaseGameConfig {
  type: 'fraction-pizza';
  wholeNumber: number;
  fractions: Array<{ numerator: number, denominator: number }>;
  question: string;
  correctAnswer: number; // index
}

export interface EquationBalanceGameConfig extends BaseGameConfig {
  type: 'equation-balance';
  equation: string; // e.g., "x + 5 = 12"
  variable: string; // e.g., "x"
  correctAnswer: number;
  steps?: string[]; // Solution steps
}

export interface GeometryBuilderGameConfig extends BaseGameConfig {
  type: 'geometry-builder';
  shapeType: 'triangle' | 'square' | 'rectangle' | 'circle' | 'polygon';
  properties: Record<string, number>; // e.g., { sides: 4, angles: 90 }
  question: string;
  visualize: boolean;
}

export interface MathRaceGameConfig extends BaseGameConfig {
  type: 'math-race';
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
  numberRange: { min: number, max: number };
  questionsCount: number;
  timeLimit?: number;
}

export interface WordProblemGameConfig extends BaseGameConfig {
  type: 'word-problem';
  problem: string;
  visualAid?: string; // URL or description
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PatternFinderGameConfig extends BaseGameConfig {
  type: 'pattern-finder';
  sequence: (number | string)[];
  missingIndex: number;
  options: (number | string)[];
  correctAnswer: number;
  explanation: string;
}

export interface PlaceValueBuilderGameConfig extends BaseGameConfig {
  type: 'place-value-builder';
  targetNumber: number;
  maxDigits: number;
  visualBlocks: boolean;
}

export interface MeasurementGameConfig extends BaseGameConfig {
  type: 'measurement-game';
  measurementType: 'length' | 'weight' | 'volume' | 'time';
  items: Array<{ name: string, value: number, unit: string }>;
  question: string;
  correctAnswer: string;
}

// ============================================================================
// NEW LANGUAGE & READING GAMES
// ============================================================================

export interface WordScrambleGameConfig extends BaseGameConfig {
  type: 'word-scramble';
  words: Array<{ scrambled: string, correct: string, hint?: string }>;
  timeLimit?: number;
}

export interface SentenceBuilderGameConfig extends BaseGameConfig {
  type: 'sentence-builder';
  words: string[];
  correctSentence: string;
  hints?: string[];
}

export interface SpellingBeeGameConfig extends BaseGameConfig {
  type: 'spelling-bee';
  words: Array<{ word: string, audio?: string, hint?: string, sentence?: string }>;
  lives?: number;
}

export interface ReadingComprehensionGameConfig extends BaseGameConfig {
  type: 'reading-comprehension';
  passage: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }>;
}

export interface VocabularyMatchGameConfig extends BaseGameConfig {
  type: 'vocabulary-match';
  pairs: Array<{ word: string, definition: string, example?: string }>;
  mode: 'match' | 'multiple-choice';
}

export interface GrammarFixGameConfig extends BaseGameConfig {
  type: 'grammar-fix';
  sentences: Array<{
    incorrect: string;
    correct: string;
    errorType: string;
    explanation: string;
  }>;
}

export interface StorySequencerGameConfig extends BaseGameConfig {
  type: 'story-sequencer';
  events: Array<{ text: string, image?: string }>;
  correctOrder: number[];
}

export interface RhymeMatcherGameConfig extends BaseGameConfig {
  type: 'rhyme-matcher';
  words: string[];
  rhymePairs: number[][]; // Indices that rhyme
}

export interface SyllableCounterGameConfig extends BaseGameConfig {
  type: 'syllable-counter';
  words: Array<{ word: string, syllables: number, hint?: string }>;
}

export interface AlphabetOrderGameConfig extends BaseGameConfig {
  type: 'alphabet-order';
  words: string[];
  correctOrder: string[];
}

// ============================================================================
// NEW SCIENCE GAMES
// ============================================================================

export interface ExperimentSimGameConfig extends BaseGameConfig {
  type: 'experiment-sim';
  experimentType: string;
  steps: Array<{ instruction: string, action: string }>;
  expectedOutcome: string;
  safetyTips?: string[];
}

export interface PeriodicTableQuizGameConfig extends BaseGameConfig {
  type: 'periodic-table-quiz';
  elements: Array<{
    symbol: string;
    name: string;
    atomicNumber: number;
    properties: string[];
  }>;
  questionType: 'symbol-to-name' | 'name-to-symbol' | 'properties';
}

export interface FoodChainBuilderGameConfig extends BaseGameConfig {
  type: 'food-chain-builder';
  organisms: Array<{ name: string, type: 'producer' | 'consumer' | 'decomposer', image?: string }>;
  correctChain: string[];
}

export interface AnimalClassifierGameConfig extends BaseGameConfig {
  type: 'animal-classifier';
  animals: Array<{
    name: string;
    category: 'mammal' | 'bird' | 'fish' | 'reptile' | 'amphibian' | 'insect';
    characteristics: string[];
    image?: string;
  }>;
}

export interface PlantCycleGameConfig extends BaseGameConfig {
  type: 'plant-cycle';
  stages: Array<{ name: string, description: string, image?: string }>;
  correctOrder: number[];
}

export interface StatesOfMatterGameConfig extends BaseGameConfig {
  type: 'states-of-matter';
  items: Array<{ name: string, state: 'solid' | 'liquid' | 'gas' }>;
  questions: Array<{ question: string, correctState: string }>;
}

export interface SimpleMachinesGameConfig extends BaseGameConfig {
  type: 'simple-machines';
  machines: Array<{
    name: string;
    type: 'lever' | 'pulley' | 'wheel' | 'inclined-plane' | 'wedge' | 'screw';
    example: string;
    image?: string;
  }>;
}

export interface BodyPartsGameConfig extends BaseGameConfig {
  type: 'body-parts';
  bodySystem: 'skeletal' | 'muscular' | 'digestive' | 'respiratory' | 'circulatory' | 'nervous';
  parts: Array<{ name: string, position: Position, description: string }>;
  image: string;
}

export interface EcosystemBuilderGameConfig extends BaseGameConfig {
  type: 'ecosystem-builder';
  ecosystemType: 'forest' | 'ocean' | 'desert' | 'tundra' | 'grassland';
  elements: Array<{ name: string, type: 'plant' | 'animal' | 'abiotic', role: string }>;
}

export interface WeatherPredictorGameConfig extends BaseGameConfig {
  type: 'weather-predictor';
  scenarios: Array<{
    conditions: Record<string, string>;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

// ============================================================================
// HISTORY & GEOGRAPHY GAMES
// ============================================================================

export interface TimelineOrderGameConfig extends BaseGameConfig {
  type: 'timeline-order';
  events: Array<{ name: string, year: number, description: string }>;
  shuffled: boolean;
}

export interface MapLabelerGameConfig extends BaseGameConfig {
  type: 'map-labeler';
  mapImage: string;
  locations: Array<{ name: string, x: number, y: number }>;
  questionsCount: number;
}

export interface HistoricalMatchGameConfig extends BaseGameConfig {
  type: 'historical-match';
  pairs: Array<{ event: string, date: string, significance: string }>;
}

export interface GeographyQuizGameConfig extends BaseGameConfig {
  type: 'geography-quiz';
  region: 'world' | 'continent' | 'country' | 'local';
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    mapHighlight?: string;
  }>;
}

export interface CultureExplorerGameConfig extends BaseGameConfig {
  type: 'culture-explorer';
  culture: string;
  aspects: Array<{
    category: 'food' | 'clothing' | 'tradition' | 'language' | 'art';
    items: Array<{ name: string, description: string, image?: string }>;
  }>;
}

export interface ArtifactIdentifierGameConfig extends BaseGameConfig {
  type: 'artifact-identifier';
  artifacts: Array<{
    name: string;
    period: string;
    culture: string;
    image?: string;
    facts: string[];
  }>;
}

// ============================================================================
// GENERAL LEARNING GAMES
// ============================================================================

export interface FlashcardsGameConfig extends BaseGameConfig {
  type: 'flashcards';
  cards: Array<{ front: string, back: string, image?: string }>;
  mode: 'flip' | 'swipe' | 'quiz';
}

export interface TrueFalseRushGameConfig extends BaseGameConfig {
  type: 'true-false-rush';
  statements: Array<{ statement: string, isTrue: boolean, explanation: string }>;
  timeLimit?: number;
  livesCount?: number;
}

export interface CategorySortGameConfig extends BaseGameConfig {
  type: 'category-sort';
  categories: string[];
  items: Array<{ name: string, correctCategory: string, image?: string }>;
}

export interface ImageQuizGameConfig extends BaseGameConfig {
  type: 'image-quiz';
  questions: Array<{
    image: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }>;
}

export interface CrosswordGameConfig extends BaseGameConfig {
  type: 'crossword';
  size: { rows: number, cols: number };
  words: Array<{
    word: string;
    clue: string;
    position: Position;
    direction: 'across' | 'down';
  }>;
}

export interface WordSearchGameConfig extends BaseGameConfig {
  type: 'word-search';
  gridSize: { rows: number, cols: number };
  words: string[];
  category: string;
  timeLimit?: number;
}

export interface BingoGameConfig extends BaseGameConfig {
  type: 'bingo-game';
  items: string[];
  gridSize: 3 | 4 | 5;
  callType: 'text' | 'image' | 'question';
}

export interface MatchingPairsGameConfig extends BaseGameConfig {
  type: 'matching-pairs';
  pairs: Array<{ left: string, right: string, leftImage?: string, rightImage?: string }>;
  layout: 'grid' | 'columns';
}

export interface SequenceGameConfig extends BaseGameConfig {
  type: 'sequence-game';
  items: Array<{ content: string, image?: string }>;
  correctOrder: number[];
  hint: string;
}

export interface SpotDifferenceGameConfig extends BaseGameConfig {
  type: 'spot-difference';
  image1: string;
  image2: string;
  differences: Position[];
  differencesCount: number;
  timeLimit?: number;
}

export interface JigsawPuzzleGameConfig extends BaseGameConfig {
  type: 'jigsaw-puzzle';
  image: string;
  pieces: number;
  educational: boolean;
  relatedFacts?: string[];
}

export interface ConnectDotsGameConfig extends BaseGameConfig {
  type: 'connect-dots';
  points: Array<{ x: number, y: number, label: string | number }>;
  correctOrder: number[];
  revealImage?: string;
}

export interface ColoringQuizGameConfig extends BaseGameConfig {
  type: 'coloring-quiz';
  image: string;
  regions: Array<{ id: string, question: string, correctColor: string }>;
}

export interface MemoryCardsGameConfig extends BaseGameConfig {
  type: 'memory-cards';
  cards: Array<{ content: string, pairId: number, image?: string }>;
  gridSize: { rows: number, cols: number };
}

export interface WheelOfFortuneGameConfig extends BaseGameConfig {
  type: 'wheel-of-fortune';
  segments: Array<{ label: string, question: string, answer: string }>;
  spinCount: number;
}

export interface TreasureHuntGameConfig extends BaseGameConfig {
  type: 'treasure-hunt';
  gridSize: { rows: number, cols: number };
  treasures: Position[];
  clues: string[];
  obstacles: Position[];
}

export interface MazeRunnerGameConfig extends BaseGameConfig {
  type: 'maze-runner';
  mazeGrid: number[][]; // 0 = path, 1 = wall
  start: Position;
  end: Position;
  questions?: Array<{ position: Position, question: string, answer: string }>;
}

export interface TowerBuilderGameConfig extends BaseGameConfig {
  type: 'tower-builder';
  blocks: Array<{ text: string, isCorrect: boolean, order?: number }>;
  targetHeight: number;
  category: string;
}

// ============================================================================
// UNION TYPE (All Game Configs)
// ============================================================================

export type GameConfig = 
  // Coding
  | RoverGameConfig
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
  | VariableTracerGameConfig
  // Math
  | MathGameConfig
  | NumberLineGameConfig
  | FractionPizzaGameConfig
  | EquationBalanceGameConfig
  | GeometryBuilderGameConfig
  | MathRaceGameConfig
  | WordProblemGameConfig
  | PatternFinderGameConfig
  | PlaceValueBuilderGameConfig
  | MeasurementGameConfig
  // Language
  | QuizGameConfig
  | WordScrambleGameConfig
  | SentenceBuilderGameConfig
  | SpellingBeeGameConfig
  | ReadingComprehensionGameConfig
  | VocabularyMatchGameConfig
  | GrammarFixGameConfig
  | StorySequencerGameConfig
  | RhymeMatcherGameConfig
  | SyllableCounterGameConfig
  | AlphabetOrderGameConfig
  // Science
  | ExperimentSimGameConfig
  | PeriodicTableQuizGameConfig
  | FoodChainBuilderGameConfig
  | AnimalClassifierGameConfig
  | PlantCycleGameConfig
  | StatesOfMatterGameConfig
  | SimpleMachinesGameConfig
  | BodyPartsGameConfig
  | EcosystemBuilderGameConfig
  | WeatherPredictorGameConfig
  // History & Geography
  | TimelineOrderGameConfig
  | MapLabelerGameConfig
  | HistoricalMatchGameConfig
  | GeographyQuizGameConfig
  | CultureExplorerGameConfig
  | ArtifactIdentifierGameConfig
  // General
  | FlashcardsGameConfig
  | TrueFalseRushGameConfig
  | CategorySortGameConfig
  | ImageQuizGameConfig
  | CrosswordGameConfig
  | WordSearchGameConfig
  | BingoGameConfig
  | MatchingPairsGameConfig
  | SequenceGameConfig
  | SpotDifferenceGameConfig
  | JigsawPuzzleGameConfig
  | ConnectDotsGameConfig
  | ColoringQuizGameConfig
  | MemoryCardsGameConfig
  | WheelOfFortuneGameConfig
  | TreasureHuntGameConfig
  | MazeRunnerGameConfig
  | TowerBuilderGameConfig;

// ============================================================================
// GAME COMPLETION
// ============================================================================

export interface GameCompletionData {
  score?: number;
  timeSpent?: number;
  attempts?: number;
  perfectScore?: boolean;
  starsEarned?: number;
}

export type GameCompletionCallback = (data?: GameCompletionData) => void;
