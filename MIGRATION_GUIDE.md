# Game System Migration Guide

## Overview

The game system has been completely refactored to provide a unified, maintainable, and extensible architecture. This guide explains what changed and how to migrate existing code.

---

## What Changed?

### Before (Old System)
```typescript
// Multiple disconnected fields
interface Lesson {
  gameLevelId?: number;        // For rover games
  gameTemplateId?: string;     // Never used
  quizQuestions?: QuizQuestion[]; // For quizzes
  // Math games detected by hardcoded ID ranges
}
```

### After (New System)
```typescript
// Single unified field
interface Lesson {
  gameConfig?: GameConfig; // Works for ALL game types
}
```

---

## Key Improvements

1. **Unified Interface**: All games use `gameConfig` instead of multiple fields
2. **Type Safety**: Full TypeScript support with discriminated unions
3. **Organization**: Each game type in its own folder
4. **Extensibility**: Easy to add new game types
5. **Consistency**: Shared components for common patterns
6. **Factory Pattern**: Single `GameRenderer` component handles routing

---

## New Structure

```
src/
  types/
    games.ts               # All game type definitions
    
  components/
    games/
      GameRenderer.tsx     # Main factory component
      
      shared/              # Reusable components
        GameContainer.tsx
        GameComplete.tsx
        GameProgress.tsx
        
      rover/               # Code + simulation
        RoverGame.tsx
        
      math/                # Math questions
        MathGame.tsx
        
      quiz/                # General quiz
        QuizGame.tsx
        
      coding/              # Coding challenges
        CodeFixerGame.tsx
        SpeedTyperGame.tsx
        IndentPoliceGame.tsx
        ParsonsPuzzleGame.tsx
        
      logic/               # Logic puzzles
        LogicGatekeeperGame.tsx
        RobotTurtleGame.tsx
        
      data/                # Data structure games
        SliceMasterGame.tsx
        MemoryMatchGame.tsx
        
      algorithm/           # Algorithm games
        OutputPredictorGame.tsx
        FillBlanksGame.tsx
        VariableTracerGame.tsx
```

---

## Migration Examples

### Example 1: Rover Game (Code Challenge)

**Before:**
```typescript
{
  type: 'game',
  gameLevelId: 2,
  // Level defined separately in lib/levels.ts
}
```

**After:**
```typescript
{
  type: 'game',
  gameConfig: {
    type: 'rover',
    title: 'First Movement',
    description: 'Learn to move the rover',
    difficulty: 'easy',
    initialCode: 'move_right()',
    gridSize: { rows: 1, cols: 7 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 6, y: 0 }],
    obstacles: [],
    instructions: ['Step 1...', 'Step 2...'],
    hints: ['Tip 1...', 'Tip 2...']
  }
}
```

### Example 2: Math Game

**Before:**
```typescript
{
  type: 'game',
  gameLevelId: 16, // Hardcoded ID range for math games
  // Questions in MathGame component
}
```

**After:**
```typescript
{
  type: 'game',
  gameConfig: {
    type: 'math',
    title: 'Addition Practice',
    description: 'Practice addition',
    difficulty: 'easy',
    questions: [
      {
        question: 'What is 47 + 28?',
        options: ['65', '75', '85', '95'],
        correct: 1,
        explanation: '47 + 28 = 75'
      }
    ]
  }
}
```

### Example 3: Quiz

**Before:**
```typescript
{
  type: 'quiz',
  quizQuestions: [
    {
      id: 'q1',
      question: 'What is Python?',
      options: ['...'],
      correctAnswer: 0
    }
  ]
}
```

**After:**
```typescript
{
  type: 'game',
  gameConfig: {
    type: 'quiz',
    title: 'Python Basics Quiz',
    description: 'Test your Python knowledge',
    difficulty: 'medium',
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is Python?',
        options: ['...'],
        correctAnswer: 0,
        explanation: '...'
      }
    ]
  }
}
```

### Example 4: New Game Type (Code Fixer)

**Before:** Not possible

**After:**
```typescript
{
  type: 'game',
  gameConfig: {
    type: 'code-fixer',
    title: 'Bug Hunter',
    description: 'Find and fix the bugs',
    difficulty: 'medium',
    brokenCode: 'def greet(name)\n    print("Hello " + name)',
    solution: 'def greet(name):\n    print(f"Hello {name}")',
    hints: ['Check the function definition...'],
    language: 'python'
  }
}
```

---

## How to Use in Pages

### Old Way (Multiple Routes)
```typescript
// Different handling for each game type
if (lesson.type === 'quiz') {
  // Inline quiz rendering
} else if (lesson.gameLevelId >= 16 && lesson.gameLevelId <= 21) {
  // Math game
} else if (lesson.gameLevelId) {
  // Rover game
}
```

### New Way (Single Component)
```typescript
import { GameRenderer } from '@/components/games/GameRenderer';

// Render any game type with one line
<GameRenderer 
  config={lesson.gameConfig} 
  onComplete={(data) => handleComplete(data)}
  backUrl="/learn/course/module"
/>
```

---

## Backwards Compatibility

The system maintains backwards compatibility with the old format:

- `gameLevelId` still works (for rover games)
- `quizQuestions` still works (for quizzes)
- Math game ID detection still works

However, these are **deprecated** and will be removed in a future version.

---

## Migration Checklist

### For New Lessons
- [ ] Use `gameConfig` instead of legacy fields
- [ ] Choose appropriate game `type`
- [ ] Provide all required config fields
- [ ] Test the game renders correctly

### For Existing Lessons
- [ ] Identify game type (rover, math, quiz)
- [ ] Convert to new `gameConfig` format
- [ ] Remove legacy fields
- [ ] Test functionality

### For New Game Types
- [ ] Define config interface in `src/types/games.ts`
- [ ] Add to `GameConfig` union type
- [ ] Create component in appropriate folder
- [ ] Add to `GameRenderer` switch statement
- [ ] Test and document

---

## Benefits

1. **Cleaner Code**: Single field instead of multiple conditional fields
2. **Type Safety**: TypeScript catches configuration errors
3. **Flexibility**: Easy to add fields or customize games
4. **Maintainability**: Each game in its own file
5. **Discoverability**: Clear structure makes finding code easy
6. **Reusability**: Shared components reduce duplication
7. **Testability**: Isolated components easier to test

---

## Next Steps

1. **Implement Missing Games**: Complete the stub components
2. **Migrate Data**: Convert existing course data to new format
3. **Remove Legacy Code**: Clean up old game logic after migration
4. **Documentation**: Document each game type's configuration
5. **Testing**: Comprehensive tests for all game types

---

## Support

For questions or issues with migration:
1. Check `src/types/games.ts` for config definitions
2. Look at existing game components for examples
3. Refer to `GAME_REFACTOR_PLAN.md` for architecture details

