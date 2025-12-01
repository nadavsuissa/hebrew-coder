/**
 * Game Templates for Admin Course Editor
 * 
 * This file provides templates for the admin UI when creating game lessons.
 * These templates help editors quickly set up games with sensible defaults.
 */

import { 
  FileCode, 
  Puzzle, 
  Terminal, 
  AlignLeft, 
  BrainCircuit, 
  Keyboard, 
  Search, 
  Scissors, 
  Binary, 
  Layers,
  Zap,
  Rocket,
  Calculator,
  HelpCircle,
  type LucideIcon
} from 'lucide-react';

import { GameConfig } from '@/types/games';

export interface GameConfigField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'code' | 'array' | 'select' | 'number' | 'boolean';
  placeholder?: string;
  options?: { label: string; value: string }[];
  itemFields?: GameConfigField[];
  defaultValue?: unknown;
}

export interface GameTemplate {
  id: string;
  title: string;
  description: string;
  category: 'coding' | 'logic' | 'data' | 'algorithm' | 'math' | 'general';
  icon: LucideIcon;
  defaultConfig: GameConfig;
  fields: GameConfigField[]; // Form fields for admin editor
}

export const GAME_TEMPLATES: GameTemplate[] = [
  // ============================================================================
  // ROVER GAMES (Python Coding)
  // ============================================================================
  {
    id: 'rover-basic',
    title: 'רובר בסיסי',
    description: 'משחק קוד + סימולציה בסיסי',
    category: 'coding',
    icon: Rocket,
    defaultConfig: {
      type: 'rover',
      title: 'משימת רובר',
      description: 'הזז את הרובר ליעד',
      difficulty: 'easy',
      initialCode: 'move_right()\n',
      gridSize: { rows: 1, cols: 5 },
      startPosition: { x: 0, y: 0 },
      startDirection: 'right',
      targets: [{ x: 4, y: 0 }],
      obstacles: [],
      instructions: ['זוז ימינה כדי להגיע לקריסטל'],
      hints: ['השתמש ב-move_right()']
    },
    fields: [] // Rover games are complex - edit JSON directly
  },

  // ============================================================================
  // MATH GAMES
  // ============================================================================
  {
    id: 'math-quiz',
    title: 'חידון מתמטיקה',
    description: 'שאלות מתמטיקה מרובות ברירה',
    category: 'math',
    icon: Calculator,
    defaultConfig: {
      type: 'math',
      title: 'תרגול מתמטיקה',
      description: 'תרגלו מתמטיקה',
      difficulty: 'easy',
      questions: [
        {
          question: 'כמה זה 5 + 3?',
          options: ['6', '7', '8', '9'],
          correct: 2,
          explanation: '5 + 3 = 8'
        }
      ]
    },
    fields: [] // Math games - edit questions directly
  },

  // ============================================================================
  // QUIZ GAMES
  // ============================================================================
  {
    id: 'general-quiz',
    title: 'חידון כללי',
    description: 'שאלות ידע כלליות',
    category: 'general',
    icon: HelpCircle,
    defaultConfig: {
      type: 'quiz',
      title: 'בוחן ידע',
      description: 'בדקו את הידע שלכם',
      difficulty: 'medium',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'שאלה לדוגמה?',
          options: ['תשובה 1', 'תשובה 2', 'תשובה 3', 'תשובה 4'],
          correctAnswer: 0,
          explanation: 'הסבר לתשובה'
        }
      ]
    },
    fields: [] // Quiz - edit questions directly
  },

  // ============================================================================
  // CODING GAMES
  // ============================================================================
  {
    id: 'code-fixer',
    title: 'צייד הבאגים',
    description: 'מצא ותקן את השגיאות בקוד',
    category: 'coding',
    icon: FileCode,
    defaultConfig: {
      type: 'code-fixer',
      title: 'צייד הבאגים',
      description: 'מצא ותקן את הבאגים',
      difficulty: 'medium',
      brokenCode: 'def greet(name)\n    print("Hello " + name)',
      solution: 'def greet(name):\n    print(f"Hello {name}")',
      hints: ['שים לב לנקודותיים בסוף הגדרת הפונקציה'],
      language: 'python'
    },
    fields: []
  },
  {
    id: 'speed-typer',
    title: 'ספיד טייפר',
    description: 'תרגול הקלדה עיוורת של קוד',
    category: 'coding',
    icon: Keyboard,
    defaultConfig: {
      type: 'speed-typer',
      title: 'ספיד טייפר',
      description: 'הקלד את הקוד במהירות',
      difficulty: 'easy',
      codeSnippet: 'import random\n\nnum = random.randint(1, 10)',
      timeLimit: 30,
      language: 'python'
    },
    fields: []
  },
  {
    id: 'indent-police',
    title: 'משטרת האינדנטציה',
    description: 'סדר את ההזחות בקוד',
    category: 'coding',
    icon: AlignLeft,
    defaultConfig: {
      type: 'indent-police',
      title: 'משטרת האינדנטציה',
      description: 'סדר את ההזחות',
      difficulty: 'medium',
      scrambledCode: 'def check_num(x):\nif x > 0:\nprint("Positive")',
      solution: 'def check_num(x):\n    if x > 0:\n        print("Positive")',
      language: 'python'
    },
    fields: []
  },
  {
    id: 'parsons-puzzle',
    title: 'פאזל שורות',
    description: 'סדר את שורות הקוד בסדר הנכון',
    category: 'coding',
    icon: Layers,
    defaultConfig: {
      type: 'parsons-puzzle',
      title: 'פאזל שורות',
      description: 'סדר את השורות',
      difficulty: 'medium',
      correctLines: ['x = 0', 'for i in range(5):', '    x += i', 'print(x)'],
      distractors: ['x = 1', 'for i in range(6):'],
      language: 'python'
    },
    fields: []
  },

  // ============================================================================
  // LOGIC GAMES
  // ============================================================================
  {
    id: 'logic-gatekeeper',
    title: 'שער הלוגיקה',
    description: 'העריך ביטויים בוליאניים',
    category: 'logic',
    icon: Binary,
    defaultConfig: {
      type: 'logic-gatekeeper',
      title: 'שער הלוגיקה',
      description: 'פתור ביטויים לוגיים',
      difficulty: 'medium',
      expressions: [
        { expr: 'True and False', result: 'False', explanation: 'and דורש ששני הצדדים יהיו True' },
        { expr: 'not (5 > 3)', result: 'False', explanation: '5 > 3 הוא True, אז not הופך ל-False' }
      ]
    },
    fields: []
  },
  {
    id: 'robot-turtle',
    title: 'הצב הרובוטי',
    description: 'כתוב פקודות כדי להוביל את הצב ליעד',
    category: 'logic',
    icon: Zap,
    defaultConfig: {
      type: 'robot-turtle',
      title: 'הצב הרובוטי',
      description: 'הוביל את הצב ליעד',
      difficulty: 'easy',
      gridSize: 5,
      startPos: { x: 0, y: 0 },
      endPos: { x: 4, y: 4 },
      obstacles: [{ x: 2, y: 2 }],
      allowedCommands: ['forward', 'turn_left', 'turn_right']
    },
    fields: []
  },

  // ============================================================================
  // DATA STRUCTURE GAMES
  // ============================================================================
  {
    id: 'slice-master',
    title: 'אשף הסלייסים',
    description: 'תרגול חיתוך רשימות ומחרוזות',
    category: 'data',
    icon: Scissors,
    defaultConfig: {
      type: 'slice-master',
      title: 'אשף הסלייסים',
      description: 'חתוך את הרשימה נכון',
      difficulty: 'medium',
      sourceList: '[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]',
      targetSlice: '[2, 3, 4]',
      correctAnswer: '[2:5]',
      hints: ['הסלייס מתחיל מהאינדקס הראשון ומסתיים לפני האינדקס האחרון']
    },
    fields: []
  },
  {
    id: 'memory-match',
    title: 'זיכרון קוד',
    description: 'משחק זיכרון עם קוד',
    category: 'data',
    icon: BrainCircuit,
    defaultConfig: {
      type: 'memory-match',
      title: 'זיכרון קוד',
      description: 'התאם מושגים להגדרות',
      difficulty: 'easy',
      pairs: [
        { front: 'int', back: 'מספר שלם' },
        { front: 'str', back: 'מחרוזת טקסט' },
        { front: 'bool', back: 'אמת או שקר' }
      ]
    },
    fields: []
  },

  // ============================================================================
  // ALGORITHM GAMES
  // ============================================================================
  {
    id: 'output-predictor',
    title: 'נביא הפלט',
    description: 'נתח את הקוד וחזה מה יודפס',
    category: 'algorithm',
    icon: Terminal,
    defaultConfig: {
      type: 'output-predictor',
      title: 'נביא הפלט',
      description: 'מה הקוד הזה ידפיס?',
      difficulty: 'medium',
      code: 'x = 1\nfor i in range(3):\n    x = x * 2\nprint(x)',
      options: ['2', '4', '8', '6'],
      correctIndex: 2,
      explanation: 'הלולאה רצה 3 פעמים: 1*2=2, 2*2=4, 4*2=8',
      language: 'python'
    },
    fields: []
  },
  {
    id: 'fill-blanks',
    title: 'השלם את הקוד',
    description: 'השלם את החלקים החסרים בקוד',
    category: 'algorithm',
    icon: Puzzle,
    defaultConfig: {
      type: 'fill-blanks',
      title: 'השלם את הקוד',
      description: 'מלא את החסר',
      difficulty: 'easy',
      code: 'def add(a, b):\n    ___ a + b',
      blanks: ['return'],
      hints: ['פונקציה צריכה להחזיר ערך'],
      language: 'python'
    },
    fields: []
  },
  {
    id: 'variable-tracer',
    title: 'עוקב המשתנים',
    description: 'עקוב אחר ערכו של משתנה',
    category: 'algorithm',
    icon: Search,
    defaultConfig: {
      type: 'variable-tracer',
      title: 'עוקב המשתנים',
      description: 'עקוב אחר המשתנה',
      difficulty: 'medium',
      code: 'count = 0\nwhile count < 3:\n    count += 1',
      variableName: 'count',
      sequence: ['0', '1', '2', '3'],
      language: 'python'
    },
    fields: []
  }
];

/**
 * Get a game template by ID
 */
export function getGameTemplate(id: string): GameTemplate | undefined {
  return GAME_TEMPLATES.find(t => t.id === id);
}

/**
 * Get templates organized by category
 */
export function getTemplatesByCategory(): Record<string, GameTemplate[]> {
  return GAME_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, GameTemplate[]>);
}

/**
 * Get all available game types for the editor
 */
export function getAllGameTypes(): string[] {
  return Array.from(new Set(GAME_TEMPLATES.map(t => t.defaultConfig.type)));
}

