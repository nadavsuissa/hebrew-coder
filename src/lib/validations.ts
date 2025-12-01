import { z } from 'zod';

// User Validation
export const userProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  photoURL: z.string().url().optional(),
  bio: z.string().max(500).optional(),
});

// Course/Game Progress Validation
export const lessonCompletionSchema = z.object({
  lessonId: z.string().min(1),
  courseId: z.string().min(1),
  xpEarned: z.number().min(0).max(500), // Cap XP to prevent hacking
  stars: z.number().min(0).max(3).optional(),
});

// Admin Course Validation
export const courseSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  id: z.string().min(3).regex(/^[a-z0-9-]+$/, "ID must be slug-friendly"),
  price: z.number().min(0).optional(),
});

// Forum/Social Validation
export const forumPostSchema = z.object({
  threadId: z.string().min(1),
  content: z.string().min(1).max(2000),
});

export const friendRequestSchema = z.object({
  targetUserId: z.string().min(1),
});

