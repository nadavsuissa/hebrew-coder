import { Module, Course } from '@/types/course';

// Import individual course files
import { mathGrade3Course } from './courses/math-grade3';
import { pythonCourse } from './courses/python';
import { mathGrade5Course } from './courses/math-grade5';
import { bibleGrade3Course } from './courses/bible-grade3';
import { englishGrade3Course } from './courses/english-grade3';
import { hebrewGrade3Course } from './courses/hebrew-grade3';
import { scienceGrade3Course } from './courses/science-grade3';
import { historyGrade6Course } from './courses/history-grade6';

// Create courses array from imported course objects
export const courses: Course[] = [
  mathGrade3Course,
  pythonCourse,
  mathGrade5Course,
  bibleGrade3Course,
  englishGrade3Course,
  hebrewGrade3Course,
  scienceGrade3Course,
  historyGrade6Course,
];

export function getCourse(courseId: string): Course | undefined {
  return courses.find(c => c.id === courseId);
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getModule(courseId: string, moduleId: string): Module | undefined {
  const course = getCourse(courseId);
  return course?.modules.find(m => m.id === moduleId);
}

export function getAllModules(): Module[] {
  return courses.flatMap(course => course.modules);
}

// פונקציה זו נשמרת לתאימות לאחור
export const courseCurriculum: Module[] = getAllModules();

export function getLesson(courseId: string, moduleId: string, lessonId: string) {
  const courseModule = getModule(courseId, moduleId);
  return courseModule?.lessons.find(l => l.id === lessonId);
}

// פונקציה זו נשמרת לתאימות לאחור (ללא courseId)
export function getLessonLegacy(moduleId: string, lessonId: string) {
  const courseModule = getAllModules().find(m => m.id === moduleId);
  return courseModule?.lessons.find(l => l.id === lessonId);
}

export function getLessonByGameLevelId(gameLevelId: number) {
  for (const course of courses) {
    for (const courseModule of course.modules) {
      const lesson = courseModule.lessons.find(l => l.type === 'game' && l.gameLevelId === gameLevelId);
      if (lesson) {
        return { course, module: courseModule, lesson };
      }
    }
  }
  return null;
}

export function getNextLessonInModule(courseId: string, moduleId: string, currentLessonId: string) {
  const courseModule = getModule(courseId, moduleId);
  if (!courseModule) return null;

  const currentIndex = courseModule.lessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === courseModule.lessons.length - 1) {
    return null; // No next lesson
  }

  return courseModule.lessons[currentIndex + 1];
}

// פונקציה זו נשמרת לתאימות לאחור (ללא courseId)
export function getNextLessonInModuleLegacy(moduleId: string, currentLessonId: string) {
  const courseModule = getAllModules().find(m => m.id === moduleId);
  if (!courseModule) return null;

  const currentIndex = courseModule.lessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === courseModule.lessons.length - 1) {
    return null;
  }

  return courseModule.lessons[currentIndex + 1];
}