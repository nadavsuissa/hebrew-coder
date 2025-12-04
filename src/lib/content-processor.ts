/**
 * Content Processor - Automatically processes all course content for math rendering
 * This ensures all mathematical expressions are properly formatted across all courses
 */

import { courses } from './curriculum';
import { formatMathContent } from './math-rendering';

/**
 * Process a single lesson's content for math formatting
 */
function processLessonContent(lesson: any): any {
  if (lesson.content && typeof lesson.content === 'string') {
    lesson.content = formatMathContent(lesson.content);
  }

  // Process quiz questions
  if (lesson.quizQuestions) {
    lesson.quizQuestions = lesson.quizQuestions.map((question: any) => ({
      ...question,
      question: formatMathContent(question.question),
      explanation: formatMathContent(question.explanation)
    }));
  }

  // Process game configurations that might have text content
  if (lesson.gameConfig && lesson.gameConfig.question) {
    lesson.gameConfig.question = formatMathContent(lesson.gameConfig.question);
  }

  return lesson;
}

/**
 * Process all courses and apply math formatting to content
 */
export function processAllCourseContent() {
  const processedCourses = courses.map(course => ({
    ...course,
    modules: course.modules.map(module => ({
      ...module,
      lessons: module.lessons.map(processLessonContent)
    }))
  }));

  return processedCourses;
}

/**
 * Get a processed course by ID
 */
export function getProcessedCourse(courseId: string) {
  const processedCourses = processAllCourseContent();
  return processedCourses.find(c => c.id === courseId);
}

/**
 * Get a processed lesson by path
 */
export function getProcessedLesson(courseId: string, moduleId: string, lessonId: string) {
  const course = getProcessedCourse(courseId);
  if (!course) return null;

  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;

  return module.lessons.find(l => l.id === lessonId);
}

/**
 * Process content on demand (useful for dynamic content generation)
 */
export function processContent(content: string): string {
  return formatMathContent(content);
}

/**
 * Batch process multiple content strings
 */
export function processMultipleContent(contents: string[]): string[] {
  return contents.map(processContent);
}


