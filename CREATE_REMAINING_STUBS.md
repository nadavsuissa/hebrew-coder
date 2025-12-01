# Guide: Creating Remaining Game Stubs

## Overview

You have 65 game stubs to create. Here's a systematic approach:

---

## Template for Creating a Stub

Each stub follows this pattern:

```typescript
'use client';

import { [GameType]Config, GameCompletionCallback } from '@/types/games';
import { GameContainer } from '../shared/GameContainer';

interface [GameType]Props {
  config: [GameType]Config;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

export function [GameType]({ config, onComplete, backUrl }: [GameType]Props) {
  return (
    <GameContainer backUrl={backUrl} title={config.title}>
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">[EMOJI]</div>
          <p className="text-2xl text-white mb-4">[HEBREW_TITLE] - מוכן ליישום!</p>
          <p className="text-slate-400 mb-6">{config.description}</p>
          <div className="bg-[COLOR]-900/30 rounded-xl p-6 mb-6 border border-[COLOR]-500/30">
            <p className="text-[COLOR]-200 text-sm">
              [EDUCATIONAL_VALUE_DESCRIPTION]
            </p>
          </div>
          <button
            onClick={() => onComplete({ score: 100 })}
            className="px-8 py-4 bg-gradient-to-r from-[COLOR]-600 to-[COLOR2]-600 hover:from-[COLOR]-500 hover:to-[COLOR2]-500 text-white rounded-xl font-bold text-lg"
          >
            המשך ⭐
          </button>
        </div>
      </div>
    </GameContainer>
  );
}
```

---

## Quick Creation Script

Since manually creating 65 files is tedious, you can:

### Option 1: Auto-Generate (Recommended)
Use this pattern to bulk-create files. I'll provide a generation pattern.

### Option 2: Implement As Needed
Only create the games you plan to use immediately.

### Option 3: Gradual Implementation
Create stubs first, then implement fully one by one.

---

## Priority Implementation Order

### Phase 1: High Priority (Most Useful)
1. `true-false-rush` - Works for any subject
2. `flashcards` - Universal learning tool
3. `category-sort` - Great for classification
4. `image-quiz` - Visual learning
5. `matching-pairs` - Versatile for any topic

### Phase 2: Math Games
6. `number-line` - Fundamental math concept
7. `fraction-pizza` - Visual fractions
8. `math-race` - Fun drill practice
9. `word-problem` - Real-world application
10. `pattern-finder` - Critical thinking

### Phase 3: Language Games
11. `word-scramble` - Vocabulary building
12. `sentence-builder` - Grammar practice
13. `spelling-bee` - Spelling improvement
14. `reading-comprehension` - Core skill
15. `vocabulary-match` - Word learning

### Phase 4: Science Games
16. `food-chain-builder` - Ecology basics
17. `animal-classifier` - Biology
18. `plant-cycle` - Life science
19. `states-of-matter` - Physics basics
20. `body-parts` - Anatomy

### Phase 5: Everything Else
Implement based on course needs.

---

## Folders to Create

```
src/components/games/
├── language/      (NEW - 10 games)
├── science/       (NEW - 10 games)
├── history/       (NEW - 6 games)
└── general/       (NEW - 17 games)
```

---

## Current Status

- ✅ All 68 types defined in `types/games.ts`
- ✅ All 68 templates in `lib/games/templates.ts`
- ✅ 3 fully implemented (rover, math, quiz)
- ✅ 9 math game stubs created
- ⏳ 56 more stubs to create

---

## Recommendation

**Don't create all 65 stubs now!**

Instead:
1. Keep the 3 working games
2. Create stubs AS NEEDED when implementing courses
3. Focus on quality over quantity
4. Implement fully when you use them

This approach is more efficient and practical!

---

## When Implementing a Course

**Step 1**: Choose game types needed
**Step 2**: Create stub if doesn't exist
**Step 3**: Implement the game fully
**Step 4**: Add to course

Example:
```
Need math-race for course → 
Create math/MathRaceGame.tsx stub →
Implement game logic →
Use in course
```

---

You're ready to start adding games to courses! 🚀

