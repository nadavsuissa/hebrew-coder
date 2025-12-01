# Game System Refactor Plan

## Current State Analysis

### Problems Identified

#### 1. **Multiple Disconnected Game Systems**
- **Code/Rover Games**: Uses `Level` type, `GameView`, `gameStore`, hardcoded in `lib/levels.ts`
- **Math Games**: Separate `MathGame` component with hardcoded questions, ID-based detection (16-21, 501-505)
- **Quiz System**: Inline implementation in lesson page, uses `quizQuestions` array
- **Game Templates**: Defined in `lib/games/templates.ts` but **NEVER RENDERED OR USED**

#### 2. **Organizational Chaos**
- Empty `src/components/games/quiz/` folder
- Duplicate `GameView.tsx` (root and `/game/` subfolder)
- Game logic scattered across page components
- No centralized game factory or renderer
- Inconsistent lesson type handling

#### 3. **Data Structure Issues**
- Lesson has THREE game-related fields:
  - `gameLevelId?: number` (legacy, for rover games)
  - `gameTemplateId?: string` (defined but never used)
  - `gameConfig?: Record<string, unknown>` (defined but never used)
- No unified game interface

#### 4. **Hardcoded Logic**
- Math game types mapped by hardcoded ID ranges
- Questions embedded in component code
- No dynamic loading or configuration

#### 5. **Missing Implementations**
- 11 game templates defined but not implemented:
  - code-fixer, speed-typer, indent-police
  - parsons-puzzle, logic-gatekeeper, robot-turtle
  - slice-master, memory-match
  - output-predictor, fill-blanks, variable-tracer

---

## New Architecture Design

### 1. **Unified Game Type System**

```typescript
// src/types/games.ts
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

export interface BaseGameConfig {
  type: GameType;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

// Each game type extends this with specific config
```

### 2. **Centralized Game Factory**

```
src/
  components/
    games/
      GameRenderer.tsx         # Main game factory
      
      rover/
        RoverGame.tsx          # Code + simulation game
        RoverView.tsx          # Grid visualization
        PlaybackControls.tsx
        
      math/
        MathGame.tsx           # Math quiz game
        MathQuestion.tsx
        
      quiz/
        QuizGame.tsx           # General quiz game
        QuizQuestion.tsx
        
      coding/
        CodeFixerGame.tsx      # Bug fixing
        SpeedTyperGame.tsx     # Speed typing
        IndentPoliceGame.tsx   # Indentation
        ParsonsPuzzleGame.tsx  # Code ordering
        
      logic/
        LogicGatekeeperGame.tsx
        RobotTurtleGame.tsx
        
      data/
        SliceMasterGame.tsx
        MemoryMatchGame.tsx
        
      algorithm/
        OutputPredictorGame.tsx
        FillBlanksGame.tsx
        VariableTracerGame.tsx
        
      shared/
        GameContainer.tsx      # Common wrapper
        GameComplete.tsx       # Success screen
        GameProgress.tsx       # Progress indicator
```

### 3. **Simplified Lesson Type**

```typescript
// src/types/course.ts
export type LessonType = 'text' | 'video' | 'game';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  content?: string;          // For text lessons
  videoUrl?: string;         // For video lessons
  gameConfig?: GameConfig;   // For game lessons (ANY game type)
  xpReward: number;
}
```

### 4. **Dynamic Game Configuration**

Instead of hardcoded levels and questions, games will be configured via `gameConfig`:

```typescript
// Example: Rover game
{
  type: 'rover',
  title: 'First Movement',
  gridSize: { rows: 1, cols: 7 },
  startPosition: { x: 0, y: 0 },
  targets: [{ x: 6, y: 0 }],
  initialCode: 'move_right()',
  hints: ['...']
}

// Example: Math game
{
  type: 'math',
  title: 'Addition Practice',
  questions: [
    { question: '47 + 28?', options: ['65', '75', '85', '95'], correct: 1 }
  ]
}
```

---

## Migration Strategy

### Phase 1: Create New Structure
1. Create `GameRenderer` factory component
2. Create base interfaces and types
3. Set up folder structure

### Phase 2: Migrate Existing Games
1. Extract Rover game into `rover/RoverGame.tsx`
2. Extract Math game into `math/MathGame.tsx`
3. Extract Quiz into `quiz/QuizGame.tsx`

### Phase 3: Implement Missing Games
1. Implement coding games (code-fixer, speed-typer, etc.)
2. Implement logic games
3. Implement data/algorithm games

### Phase 4: Update Integration
1. Update lesson page to use `GameRenderer`
2. Remove hardcoded ID checks
3. Clean up old files

### Phase 5: Migrate Data
1. Convert hardcoded levels to game configs
2. Update course data files
3. Test all game types

---

## Implementation Benefits

1. **Consistency**: All games use same interface and flow
2. **Maintainability**: Each game in its own file
3. **Extensibility**: Easy to add new game types
4. **Reusability**: Shared components for common patterns
5. **Type Safety**: Proper TypeScript interfaces
6. **Dynamic**: Games configured via data, not code

