/**
 * Legacy Game Converter
 * 
 * Automatically converts old lesson format to new gameConfig format
 * This provides backward compatibility during migration
 */

import { Lesson } from '@/types/course';
import { GameConfig, RoverGameConfig, QuizGameConfig, MathGameConfig } from '@/types/games';
import { levels } from './levels';

/**
 * Convert a lesson with gameLevelId to use gameConfig
 */
export function convertLegacyLesson(lesson: Lesson): Lesson {
  // Already has gameConfig - return as-is
  if (lesson.gameConfig) {
    return lesson;
  }
  
  // Convert gameLevelId to gameConfig
  if (lesson.gameLevelId !== undefined) {
    const level = levels.find(l => l.id === lesson.gameLevelId);
    if (level) {
      // Check if it's a math game (IDs 16-21 or 501-505)
      const isMathGame = (level.id >= 16 && level.id <= 21) || (level.id >= 501 && level.id <= 505);
      
      if (isMathGame) {
        // Convert to math game config
        const mathConfig: MathGameConfig = {
          type: 'math',
          title: level.title,
          description: level.description,
          difficulty: level.difficulty,
          questions: getMathQuestions(level.id)
        };
        
        return {
          ...lesson,
          gameConfig: mathConfig
        };
      } else {
        // Convert to rover game config
        const roverConfig: RoverGameConfig = {
          type: 'rover',
          title: level.title,
          description: level.description,
          difficulty: level.difficulty,
          initialCode: level.initialCode,
          gridSize: level.gridSize,
          startPosition: level.startPosition,
          startDirection: level.startDirection,
          targets: level.targets,
          obstacles: level.obstacles,
          requiredOutput: level.requiredOutput,
          maxMoves: level.maxMoves,
          instructions: level.instructions,
          hints: level.hints
        };
        
        return {
          ...lesson,
          gameConfig: roverConfig
        };
      }
    }
  }
  
  // Convert quizQuestions to gameConfig  
  if (lesson.quizQuestions && lesson.quizQuestions.length > 0) {
    const quizConfig: QuizGameConfig = {
      type: 'quiz',
      title: lesson.title,
      description: lesson.description,
      difficulty: 'medium',
      passingScore: 70,
      questions: lesson.quizQuestions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    };
    
    return {
      ...lesson,
      type: 'game', // Quizzes are now a game type
      gameConfig: quizConfig
    };
  }
  
  return lesson;
}

/**
 * Get math questions for a given level ID
 * This maps the hardcoded math game IDs to question sets
 */
function getMathQuestions(levelId: number) {
  const questionSets: Record<number, any[]> = {
    16: [ // place-value
      { question: 'מה הערך של הספרה 5 במספר 523?', options: ['5', '50', '500', '5000'], correct: 2, explanation: 'הספרה 5 נמצאת במקום המאות, אז הערך שלה הוא 5 × 100 = 500' },
      { question: 'מה הערך של הספרה 3 במספר 834?', options: ['3', '30', '300', '3000'], correct: 1, explanation: 'הספרה 3 נמצאת במקום העשרות, אז הערך שלה הוא 3 × 10 = 30' },
      { question: 'מה הערך של הספרה 7 במספר 472?', options: ['7', '70', '700', '7000'], correct: 1, explanation: 'הספרה 7 נמצאת במקום העשרות, אז הערך שלה הוא 7 × 10 = 70' },
      { question: 'מה הערך של הספרה 2 במספר 256?', options: ['2', '20', '200', '2000'], correct: 2, explanation: 'הספרה 2 נמצאת במקום המאות, אז הערך שלה הוא 2 × 100 = 200' },
      { question: 'מה הערך של הספרה 9 במספר 891?', options: ['9', '90', '900', '9000'], correct: 1, explanation: 'הספרה 9 נמצאת במקום העשרות, אז הערך שלה הוא 9 × 10 = 90' }
    ],
    17: [ // addition
      { question: 'כמה זה 47 + 28?', options: ['65', '75', '85', '95'], correct: 1, explanation: '47 + 28 = 75' },
      { question: 'כמה זה 63 + 19?', options: ['72', '82', '92', '102'], correct: 1, explanation: '63 + 19 = 82' },
      { question: 'כמה זה 35 + 47?', options: ['72', '82', '92', '102'], correct: 1, explanation: '35 + 47 = 82' },
      { question: 'כמה זה 56 + 34?', options: ['80', '90', '100', '110'], correct: 1, explanation: '56 + 34 = 90' },
      { question: 'כמה זה 29 + 18?', options: ['37', '47', '57', '67'], correct: 1, explanation: '29 + 18 = 47' }
    ],
    18: [ // multiplication
      { question: 'כמה זה 7 × 5?', options: ['30', '35', '40', '45'], correct: 1, explanation: '7 × 5 = 35' },
      { question: 'כמה זה 8 × 6?', options: ['42', '48', '54', '60'], correct: 1, explanation: '8 × 6 = 48' },
      { question: 'כמה זה 9 × 4?', options: ['32', '36', '40', '44'], correct: 1, explanation: '9 × 4 = 36' },
      { question: 'כמה זה 6 × 7?', options: ['40', '42', '44', '46'], correct: 1, explanation: '6 × 7 = 42' },
      { question: 'כמה זה 5 × 9?', options: ['40', '45', '50', '55'], correct: 1, explanation: '5 × 9 = 45' }
    ],
    19: [ // fractions
      { question: 'איזה שבר גדול יותר: 1/2 או 1/3?', options: ['1/2', '1/3', 'שווים', 'לא יודע'], correct: 0, explanation: '1/2 = 0.5 ו-1/3 ≈ 0.33, אז 1/2 גדול יותר' },
      { question: 'כמה זה חצי (1/2) של 10?', options: ['3', '4', '5', '6'], correct: 2, explanation: 'חצי של 10 = 10 ÷ 2 = 5' },
      { question: 'כמה זה שליש (1/3) של 12?', options: ['3', '4', '5', '6'], correct: 1, explanation: 'שליש של 12 = 12 ÷ 3 = 4' },
      { question: 'כמה זה רבע (1/4) של 20?', options: ['4', '5', '6', '7'], correct: 1, explanation: 'רבע של 20 = 20 ÷ 4 = 5' },
      { question: 'כמה זה חצי (1/2) של 16?', options: ['6', '7', '8', '9'], correct: 2, explanation: 'חצי של 16 = 16 ÷ 2 = 8' }
    ],
    20: [ // measurement
      { question: 'מה הסכום של האורכים: 5, 8, 3, 12, 6?', options: ['30', '32', '34', '36'], correct: 2, explanation: '5 + 8 + 3 + 12 + 6 = 34' },
      { question: 'מה הממוצע של: 10, 15, 20, 25?', options: ['15', '17.5', '20', '22.5'], correct: 1, explanation: '(10 + 15 + 20 + 25) ÷ 4 = 70 ÷ 4 = 17.5' },
      { question: 'מה ההפרש בין האורך הגדול לקטן: 5, 12, 3, 8?', options: ['7', '8', '9', '10'], correct: 2, explanation: 'הגדול: 12, הקטן: 3, הפרש: 12 - 3 = 9' },
      { question: 'מה הסכום של: 7, 9, 11, 13?', options: ['38', '40', '42', '44'], correct: 1, explanation: '7 + 9 + 11 + 13 = 40' },
      { question: 'מה הממוצע של: 6, 8, 10, 12, 14?', options: ['8', '9', '10', '11'], correct: 2, explanation: '(6 + 8 + 10 + 12 + 14) ÷ 5 = 50 ÷ 5 = 10' }
    ],
    21: [ // data
      { question: 'מה הציון הגבוה ביותר: 85, 90, 78, 92, 88?', options: ['88', '90', '92', '95'], correct: 2, explanation: 'הציון הגבוה ביותר הוא 92' },
      { question: 'מה הציון הנמוך ביותר: 75, 82, 68, 90, 79?', options: ['68', '75', '79', '82'], correct: 0, explanation: 'הציון הנמוך ביותר הוא 68' },
      { question: 'מה ההפרש בין הגבוה לנמוך: 88, 92, 85, 90?', options: ['4', '5', '6', '7'], correct: 3, explanation: 'גבוה: 92, נמוך: 85, הפרש: 92 - 85 = 7' },
      { question: 'מה הציון הגבוה ביותר: 95, 87, 91, 89, 93?', options: ['91', '93', '95', '97'], correct: 2, explanation: 'הציון הגבוה ביותר הוא 95' },
      { question: 'מה ההפרש בין הגבוה לנמוך: 70, 85, 60, 90, 75?', options: ['25', '30', '35', '40'], correct: 1, explanation: 'גבוה: 90, נמוך: 60, הפרש: 90 - 60 = 30' }
    ],
    // Grade 5 math games
    501: [ // fractions
      { question: 'איזה שבר גדול יותר: 1/2 או 1/3?', options: ['1/2', '1/3', 'שווים', 'לא יודע'], correct: 0, explanation: '1/2 = 0.5 ו-1/3 ≈ 0.33, אז 1/2 גדול יותר' },
      { question: 'כמה זה חצי (1/2) של 10?', options: ['3', '4', '5', '6'], correct: 2, explanation: 'חצי של 10 = 10 ÷ 2 = 5' }
    ],
    502: [ // multiplication
      { question: 'כמה זה 7 × 5?', options: ['30', '35', '40', '45'], correct: 1, explanation: '7 × 5 = 35' },
      { question: 'כמה זה 8 × 6?', options: ['42', '48', '54', '60'], correct: 1, explanation: '8 × 6 = 48' }
    ],
    503: [ // data
      { question: 'מה הציון הגבוה ביותר: 85, 90, 78, 92, 88?', options: ['88', '90', '92', '95'], correct: 2, explanation: 'הציון הגבוה ביותר הוא 92' }
    ],
    504: [ // measurement
      { question: 'מה הסכום של האורכים: 5, 8, 3, 12, 6?', options: ['30', '32', '34', '36'], correct: 2, explanation: '5 + 8 + 3 + 12 + 6 = 34' }
    ],
    505: [ // place-value
      { question: 'מה הערך של הספרה 5 במספר 523?', options: ['5', '50', '500', '5000'], correct: 2, explanation: 'הספרה 5 נמצאת במקום המאות, אז הערך שלה הוא 5 × 100 = 500' }
    ]
  };
  
  return questionSets[levelId] || [];
}

