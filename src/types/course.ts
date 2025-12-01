import { GameConfig } from './games';

/**
 * Course Type Definitions
 * All game handling is now unified through GameConfig
 */

export type LessonType = 'text' | 'video' | 'game' | 'quiz';

// Re-export for backward compatibility with admin editor
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  
  // Type-specific fields
  content?: string;          // For text lessons (Markdown)
  videoUrl?: string;         // For video lessons
  gameConfig?: GameConfig;   // For game lessons (unified system!)
  
  // BACKWARD COMPATIBILITY (will be auto-converted)
  gameLevelId?: number;      // @deprecated - auto-converts to gameConfig
  gameTemplateId?: string;   // @deprecated - used by admin editor
  quizQuestions?: QuizQuestion[]; // @deprecated - auto-converts to gameConfig
  
  xpReward: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  tags?: string[];
  modules: Module[];
  published?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  features?: string[];
}

export type UserRole = 'user' | 'admin' | 'moderator';

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  xp: number;
  streakDays: number;
  lastLoginDate: string;
  unlockedBadges: string[];
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt: string;
  purchasedCourses: string[];
  progress: UserProgress;
}
