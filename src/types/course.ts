import { Level } from './game';

export type LessonType = 'text' | 'video' | 'quiz' | 'game';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  content?: string; // Markdown or HTML for text lessons
  videoUrl?: string;
  quizQuestions?: QuizQuestion[];
  gameLevelId?: number; // Legacy support
  gameTemplateId?: string; // New game system
  gameConfig?: any; // Specific configuration for the selected game template
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
  modules: Module[];
}

export type UserRole = 'user' | 'admin' | 'moderator';

export interface UserProgress {
  completedLessons: string[]; // Lesson IDs
  quizScores: Record<string, number>; // lessonId -> score
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

