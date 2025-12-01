# Old Files Status & Cleanup Checklist

## Overview
This document tracks old game-related files that still exist for backwards compatibility and when they can be removed.

---

## Files That Still Exist (And Why)

### 1. `src/components/MathGame.tsx`
- **Status**: ⚠️ Wrapper (Deprecated)
- **Why it exists**: Used by `src/app/play/[levelId]/page.tsx` for legacy math game support
- **What it does**: Converts old interface to new format and delegates to new implementation
- **Can be removed**: After updating the play page to use `GameRenderer`

### 2. `src/app/play/[levelId]/page.tsx`
- **Status**: ⚠️ Legacy Page (Still Used)
- **Why it exists**: Handles old `gameLevelId` system with hardcoded ID ranges
- **What it does**: 
  - Detects math games by ID range (16-21, 501-505)
  - Renders rover games with code editor
  - Routes to appropriate game type
- **Can be removed**: After all lessons are migrated to use `gameConfig`

### 3. `src/lib/levels.ts`
- **Status**: ⚠️ Legacy Data (Still Used)
- **Why it exists**: Contains hardcoded rover game levels
- **What it does**: Exports array of `Level` objects for rover games
- **Can be removed**: After converting all levels to lesson `gameConfig` format

### 4. `src/lib/games/templates.ts`
- **Status**: ❓ Unused (But Valuable Reference)
- **Why it exists**: Originally defined game templates that were never implemented
- **What it does**: Contains game ideas and configurations
- **Can be removed**: Or repurpose as reference/documentation for implementing stub games

---

## Files That Were Cleaned Up

### ✅ `src/components/GameView.tsx`
- **Status**: Cleaned (Now just re-export)
- **Location**: Now properly at `src/components/game/GameView.tsx`

### ✅ `src/components/games/quiz/` (folder)
- **Status**: Fixed (Was empty, now has QuizGame.tsx)

---

## Cleanup Plan

### Phase 1: Immediate (No Breaking Changes)
- [x] Create new game system
- [x] Maintain backwards compatibility
- [x] Update old files to be wrappers

### Phase 2: Update Integration Points
- [ ] Update lesson page (`src/app/learn/[courseId]/[moduleId]/[lessonId]/page.tsx`) to use `GameRenderer`
- [ ] Test with existing lessons
- [ ] Document any issues

### Phase 3: Migrate Data
- [ ] Convert levels in `lib/levels.ts` to lesson `gameConfig` format
- [ ] Update course files to use new format
- [ ] Test all game types work correctly

### Phase 4: Remove Legacy Code
- [ ] Remove `src/components/MathGame.tsx`
- [ ] Remove or update `src/app/play/[levelId]/page.tsx`
- [ ] Remove `src/lib/levels.ts` (if fully migrated)
- [ ] Clean up deprecated fields from `types/course.ts`

---

## How to Migrate a Lesson

### Old Format (Currently Used)
```typescript
{
  type: 'game',
  gameLevelId: 2,  // References lib/levels.ts
}
```

### New Format (Target)
```typescript
{
  type: 'game',
  gameConfig: {
    type: 'rover',
    title: 'First Movement',
    description: '...',
    difficulty: 'easy',
    initialCode: 'move_right()',
    gridSize: { rows: 1, cols: 7 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 6, y: 0 }],
    obstacles: [],
    instructions: ['...'],
    hints: ['...']
  }
}
```

---

## Impact Assessment

### Current State
- ✅ New system works
- ✅ Old system still works
- ✅ No breaking changes
- ⚠️ Code duplication (temporary)
- ⚠️ Two systems running in parallel

### After Full Migration
- ✅ Single unified system
- ✅ No code duplication
- ✅ Cleaner codebase
- ✅ Easier to maintain
- ✅ Type-safe everywhere

---

## Testing Checklist

Before removing any old files, verify:
- [ ] All rover games work with new system
- [ ] All math games work with new system
- [ ] All quizzes work with new system
- [ ] Lesson completion works
- [ ] XP rewards work correctly
- [ ] Navigation works (back buttons, etc.)
- [ ] No console errors
- [ ] No TypeScript errors

---

## Priority: What to Do Next

### High Priority 🔴
1. Update main lesson page to use `GameRenderer` instead of inline rendering
2. Test thoroughly with existing lessons

### Medium Priority 🟡
3. Migrate a few lessons from old format to new format (as proof of concept)
4. Document any issues or edge cases

### Low Priority 🟢
5. Migrate all remaining lessons
6. Remove old files
7. Celebrate clean codebase 🎉

---

## Questions?

- **Q: Can I delete `MathGame.tsx` now?**
  - A: No, it's still used by the play page. Wait until the play page is updated.

- **Q: Do I need to migrate all lessons at once?**
  - A: No! The system supports both formats. Migrate gradually.

- **Q: What if something breaks?**
  - A: The old system still works. You can roll back specific lessons if needed.

- **Q: When can I remove the deprecated fields from `types/course.ts`?**
  - A: After all lessons are migrated and no code uses `gameLevelId`, `quizQuestions`, or `gameTemplateId`.

---

## Summary

**Current Status**: ✅ New system complete, old system still working for compatibility

**Next Step**: Update lesson page integration

**Timeline**: Migrate gradually, remove old files when safe

**Risk**: Low (backwards compatibility maintained)

