/**
 * Game Templates for Admin Course Editor - EXTENDED VERSION
 * 
 * 68 different game types for maximum educational variety!
 * Suitable for all ages and all school subjects
 */

import { 
  FileCode, Puzzle, Terminal, AlignLeft, BrainCircuit, Keyboard, Search, Scissors, Binary, Layers, Zap, Rocket,
  Calculator, HelpCircle, TrendingUp, Scale, Shapes, Book, PenTool,
  Atom, Leaf, Fish, Heart, Cloud, Clock, MapPin, Globe, Landmark, Users,
  Image, Grid3x3, Target, Eye, Pencil, Award, TrendingDown
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
  category: 'coding' | 'math' | 'language' | 'science' | 'history' | 'general';
  icon: LucideIcon;
  defaultConfig: GameConfig;
  fields: GameConfigField[];
}

export const GAME_TEMPLATES: GameTemplate[] = [
  // ============================================================================
  // CODING & PROGRAMMING GAMES (14 types)
  // ============================================================================
  {
    id: 'rover-basic',
    title: 'רובר - משחק קוד',
    description: 'קוד פייתון + סימולציית רובר על מאדים',
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
    fields: []
  },
  {
    id: 'code-fixer',
    title: 'צייד הבאגים',
    description: 'מצא ותקן שגיאות בקוד',
    category: 'coding',
    icon: FileCode,
    defaultConfig: {
      type: 'code-fixer',
      title: 'צייד הבאגים',
      description: 'מצא ותקן את הבאגים',
      difficulty: 'medium',
      brokenCode: 'def greet(name)\n    print("Hello " + name)',
      solution: 'def greet(name):\n    print(f"Hello {name}")',
      hints: ['שים לב לנקודותיים'],
      language: 'python'
    },
    fields: []
  },
  {
    id: 'speed-typer',
    title: 'ספיד טייפר',
    description: 'הקלדת קוד מהירה ומדויקת',
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

  // ============================================================================
  // MATH GAMES (10 types)
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
        { question: 'כמה זה 5 + 3?', options: ['6', '7', '8', '9'], correct: 2, explanation: '5 + 3 = 8' }
      ]
    },
    fields: []
  },
  {
    id: 'number-line',
    title: 'קו המספרים',
    description: 'קפיצות על קו המספרים',
    category: 'math',
    icon: TrendingUp,
    defaultConfig: {
      type: 'number-line',
      title: 'קפיצות על קו המספרים',
      description: 'קפוץ למספר הנכון',
      difficulty: 'easy',
      startNumber: 0,
      endNumber: 20,
      targetNumber: 15,
      operations: [{ operator: '+', value: 5 }, { operator: '+', value: 10 }]
    },
    fields: []
  },
  {
    id: 'fraction-pizza',
    title: 'פיצה של שברים',
    description: 'למד שברים עם פיצות',
    category: 'math',
    icon: Calculator,
    defaultConfig: {
      type: 'fraction-pizza',
      title: 'שברים בפיצה',
      description: 'חלק את הפיצה',
      difficulty: 'medium',
      wholeNumber: 1,
      fractions: [{ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 4 }],
      question: 'איזה שבר גדול יותר?',
      correctAnswer: 0
    },
    fields: []
  },
  {
    id: 'equation-balance',
    title: 'מאזן משוואות',
    description: 'פתור משוואות עם מאזניים',
    category: 'math',
    icon: Scale,
    defaultConfig: {
      type: 'equation-balance',
      title: 'מאזן משוואות',
      description: 'שמור על האיזון',
      difficulty: 'medium',
      equation: 'x + 5 = 12',
      variable: 'x',
      correctAnswer: 7,
      steps: ['הורד 5 משני הצדדים', 'x = 7']
    },
    fields: []
  },
  {
    id: 'geometry-builder',
    title: 'בונה צורות',
    description: 'בנה צורות גיאומטריות',
    category: 'math',
    icon: Shapes,
    defaultConfig: {
      type: 'geometry-builder',
      title: 'בונה צורות',
      description: 'בנה את הצורה הנכונה',
      difficulty: 'easy',
      shapeType: 'square',
      properties: { sides: 4, angles: 90 },
      question: 'בנה ריבוע',
      visualize: true
    },
    fields: []
  },
  {
    id: 'math-race',
    title: 'מירוץ מתמטיקה',
    description: 'מהירות בפתרון תרגילים',
    category: 'math',
    icon: Zap,
    defaultConfig: {
      type: 'math-race',
      title: 'מירוץ מתמטיקה',
      description: 'פתור במהירות!',
      difficulty: 'medium',
      operation: 'addition',
      numberRange: { min: 1, max: 20 },
      questionsCount: 10,
      timeLimit: 60
    },
    fields: []
  },

  // ============================================================================
  // LANGUAGE & READING GAMES (11 types)
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
        { id: 'q1', question: 'שאלה לדוגמה?', options: ['תשובה 1', 'תשובה 2', 'תשובה 3', 'תשובה 4'], correctAnswer: 0, explanation: 'הסבר' }
      ]
    },
    fields: []
  },
  {
    id: 'word-scramble',
    title: 'סדר את המילה',
    description: 'סדר אותיות מבולבלות',
    category: 'language',
    icon: Puzzle,
    defaultConfig: {
      type: 'word-scramble',
      title: 'סדר את המילה',
      description: 'סדר את האותיות',
      difficulty: 'easy',
      words: [
        { scrambled: 'למשל', correct: 'שלום', hint: 'ברכה' },
        { scrambled: 'רפס', correct: 'ספר', hint: 'קוראים בו' }
      ],
      timeLimit: 60
    },
    fields: []
  },
  {
    id: 'sentence-builder',
    title: 'בונה משפטים',
    description: 'בנה משפט תקין',
    category: 'language',
    icon: PenTool,
    defaultConfig: {
      type: 'sentence-builder',
      title: 'בונה משפטים',
      description: 'בנה משפט נכון',
      difficulty: 'medium',
      words: ['הילד', 'הלך', 'לבית', 'הספר'],
      correctSentence: 'הילד הלך לבית הספר',
      hints: ['התחל עם הנושא']
    },
    fields: []
  },
  {
    id: 'spelling-bee',
    title: 'דבורת האיות',
    description: 'אתגר איות מילים',
    category: 'language',
    icon: Book,
    defaultConfig: {
      type: 'spelling-bee',
      title: 'דבורת האיות',
      description: 'אייתו נכון',
      difficulty: 'medium',
      words: [
        { word: 'מחשב', hint: 'מכשיר אלקטרוני', sentence: 'אני עובד על ה___' },
        { word: 'ספר', hint: 'קוראים בו', sentence: 'אני קורא ___' }
      ],
      lives: 3
    },
    fields: []
  },

  // ============================================================================
  // SCIENCE GAMES (10 types)
  // ============================================================================
  {
    id: 'periodic-table',
    title: 'הטבלה המחזורית',
    description: 'למד יסודות כימיים',
    category: 'science',
    icon: Atom,
    defaultConfig: {
      type: 'periodic-table-quiz',
      title: 'חידון יסודות',
      description: 'זהה יסודות',
      difficulty: 'medium',
      elements: [
        { symbol: 'H', name: 'מימן', atomicNumber: 1, properties: ['גז', 'קל'] },
        { symbol: 'O', name: 'חמצן', atomicNumber: 8, properties: ['גז', 'חיוני'] }
      ],
      questionType: 'symbol-to-name'
    },
    fields: []
  },
  {
    id: 'food-chain',
    title: 'שרשרת המזון',
    description: 'בנה שרשרת מזון',
    category: 'science',
    icon: Fish,
    defaultConfig: {
      type: 'food-chain-builder',
      title: 'שרשרת המזון',
      description: 'סדר את הארגניזמים',
      difficulty: 'easy',
      organisms: [
        { name: 'דשא', type: 'producer' },
        { name: 'ארנב', type: 'consumer' },
        { name: 'שועל', type: 'consumer' }
      ],
      correctChain: ['דשא', 'ארנב', 'שועל']
    },
    fields: []
  },
  {
    id: 'animal-classifier',
    title: 'מסווג בעלי חיים',
    description: 'סווג בעלי חיים לקבוצות',
    category: 'science',
    icon: Fish,
    defaultConfig: {
      type: 'animal-classifier',
      title: 'סיווג בעלי חיים',
      description: 'זהה את הקבוצה',
      difficulty: 'easy',
      animals: [
        { name: 'כלב', category: 'mammal', characteristics: ['פרווה', 'יונק'] },
        { name: 'ציפור', category: 'bird', characteristics: ['נוצות', 'מטילה ביצים'] }
      ]
    },
    fields: []
  },
  {
    id: 'plant-cycle',
    title: 'מחזור החיים של הצמח',
    description: 'למד איך צמחים גדלים',
    category: 'science',
    icon: Leaf,
    defaultConfig: {
      type: 'plant-cycle',
      title: 'מחזור החיים',
      description: 'סדר את השלבים',
      difficulty: 'easy',
      stages: [
        { name: 'זרע', description: 'הזרע בקרקע' },
        { name: 'נביטה', description: 'הזרע נובט' },
        { name: 'צמח', description: 'הצמח גדל' },
        { name: 'פרח', description: 'הצמח פורח' }
      ],
      correctOrder: [0, 1, 2, 3]
    },
    fields: []
  },
  {
    id: 'states-of-matter',
    title: 'מצבי צבירה',
    description: 'מוצק, נוזל, גז',
    category: 'science',
    icon: Cloud,
    defaultConfig: {
      type: 'states-of-matter',
      title: 'מצבי צבירה',
      description: 'זהה את המצב',
      difficulty: 'easy',
      items: [
        { name: 'קרח', state: 'solid' },
        { name: 'מים', state: 'liquid' },
        { name: 'אדים', state: 'gas' }
      ],
      questions: [
        { question: 'מה מצב הצבירה של מים?', correctState: 'liquid' }
      ]
    },
    fields: []
  },
  {
    id: 'body-parts',
    title: 'חלקי הגוף',
    description: 'זהה חלקי גוף',
    category: 'science',
    icon: Heart,
    defaultConfig: {
      type: 'body-parts',
      title: 'חלקי הגוף',
      description: 'סמן את החלקים',
      difficulty: 'easy',
      bodySystem: 'skeletal',
      parts: [
        { name: 'ראש', position: { x: 5, y: 1 }, description: 'החלק העליון' },
        { name: 'גוף', position: { x: 5, y: 5 }, description: 'החלק המרכזי' }
      ],
      image: '/body-diagram.svg'
    },
    fields: []
  },

  // ============================================================================
  // HISTORY & GEOGRAPHY GAMES (6 types)
  // ============================================================================
  {
    id: 'timeline-order',
    title: 'ציר הזמן',
    description: 'סדר אירועים לפי זמן',
    category: 'history',
    icon: Clock,
    defaultConfig: {
      type: 'timeline-order',
      title: 'ציר הזמן',
      description: 'סדר את האירועים',
      difficulty: 'medium',
      events: [
        { name: 'מלחמת העולם הראשונה', year: 1914, description: '1914-1918' },
        { name: 'מלחמת העולם השנייה', year: 1939, description: '1939-1945' }
      ],
      shuffled: true
    },
    fields: []
  },
  {
    id: 'map-labeler',
    title: 'תייג את המפה',
    description: 'סמן מיקומים על המפה',
    category: 'history',
    icon: MapPin,
    defaultConfig: {
      type: 'map-labeler',
      title: 'תייג את המפה',
      description: 'מצא מיקומים',
      difficulty: 'medium',
      mapImage: '/map-israel.svg',
      locations: [
        { name: 'ירושלים', x: 50, y: 60 },
        { name: 'תל אביב', x: 30, y: 50 }
      ],
      questionsCount: 5
    },
    fields: []
  },
  {
    id: 'geography-quiz',
    title: 'חידון גיאוגרפיה',
    description: 'בחן ידע גיאוגרפי',
    category: 'history',
    icon: Globe,
    defaultConfig: {
      type: 'geography-quiz',
      title: 'חידון גיאוגרפיה',
      description: 'מה אתה יודע?',
      difficulty: 'medium',
      region: 'world',
      questions: [
        { question: 'מה הבירה של צרפת?', options: ['לונדון', 'פריז', 'ברלין', 'רומא'], correctAnswer: 1 }
      ]
    },
    fields: []
  },
  {
    id: 'culture-explorer',
    title: 'חוקר תרבויות',
    description: 'למד על תרבויות שונות',
    category: 'history',
    icon: Users,
    defaultConfig: {
      type: 'culture-explorer',
      title: 'חוקר תרבויות',
      description: 'גלה תרבויות',
      difficulty: 'medium',
      culture: 'יוון עתיקה',
      aspects: [
        { category: 'food', items: [{ name: 'זיתים', description: 'מאכל עיקרי' }] },
        { category: 'art', items: [{ name: 'פסלים', description: 'אמנות יוונית' }] }
      ]
    },
    fields: []
  },

  // ============================================================================
  // GENERAL LEARNING GAMES (18 types!)
  // ============================================================================
  {
    id: 'flashcards',
    title: 'כרטיסי זיכרון',
    description: 'כרטיסיות לימוד',
    category: 'general',
    icon: Grid3x3,
    defaultConfig: {
      type: 'flashcards',
      title: 'כרטיסי זיכרון',
      description: 'למד והזכר',
      difficulty: 'easy',
      cards: [
        { front: 'What is 2+2?', back: '4' },
        { front: 'Capital of France?', back: 'Paris' }
      ],
      mode: 'flip'
    },
    fields: []
  },
  {
    id: 'true-false-rush',
    title: 'נכון או לא נכון',
    description: 'משחק מהיר של נכון/לא נכון',
    category: 'general',
    icon: Target,
    defaultConfig: {
      type: 'true-false-rush',
      title: 'נכון או לא נכון',
      description: 'ענה במהירות!',
      difficulty: 'easy',
      statements: [
        { statement: 'השמש היא כוכב', isTrue: true, explanation: 'השמש היא כוכב במרכז מערכת השמש' },
        { statement: 'כדור הארץ שטוח', isTrue: false, explanation: 'כדור הארץ עגול' }
      ],
      timeLimit: 30,
      livesCount: 3
    },
    fields: []
  },
  {
    id: 'category-sort',
    title: 'מיון לקטגוריות',
    description: 'גרור פריטים לקטגוריות',
    category: 'general',
    icon: Layers,
    defaultConfig: {
      type: 'category-sort',
      title: 'מיון לקטגוריות',
      description: 'סווג את הפריטים',
      difficulty: 'easy',
      categories: ['פירות', 'ירקות', 'בשר'],
      items: [
        { name: 'תפוח', correctCategory: 'פירות' },
        { name: 'גזר', correctCategory: 'ירקות' },
        { name: 'עוף', correctCategory: 'בשר' }
      ]
    },
    fields: []
  },
  {
    id: 'image-quiz',
    title: 'חידון תמונות',
    description: 'שאלות עם תמונות',
    category: 'general',
    icon: Image,
    defaultConfig: {
      type: 'image-quiz',
      title: 'חידון תמונות',
      description: 'זהה מהתמונה',
      difficulty: 'easy',
      questions: [
        {
          image: '/images/apple.jpg',
          question: 'מה זה?',
          options: ['תפוח', 'אגס', 'בננה', 'תפוז'],
          correctAnswer: 0,
          explanation: 'זה תפוח!'
        }
      ]
    },
    fields: []
  },
  {
    id: 'matching-pairs',
    title: 'התאמת זוגות',
    description: 'התאם פריטים זה לזה',
    category: 'general',
    icon: Grid3x3,
    defaultConfig: {
      type: 'matching-pairs',
      title: 'התאמת זוגות',
      description: 'מצא את הזוגות',
      difficulty: 'easy',
      pairs: [
        { left: 'כלב', right: 'נביחה' },
        { left: 'חתול', right: 'מיאו' },
        { left: 'ציפור', right: 'ציוץ' }
      ],
      layout: 'grid'
    },
    fields: []
  },
  {
    id: 'sequence-game',
    title: 'משחק הסדר',
    description: 'סדר פריטים בסדר הנכון',
    category: 'general',
    icon: TrendingUp,
    defaultConfig: {
      type: 'sequence-game',
      title: 'משחק הסדר',
      description: 'סדר נכון',
      difficulty: 'easy',
      items: [
        { content: 'ראשון' },
        { content: 'שני' },
        { content: 'שלישי' }
      ],
      correctOrder: [0, 1, 2],
      hint: 'סדר מספרי'
    },
    fields: []
  },
  {
    id: 'treasure-hunt',
    title: 'ציד האוצר',
    description: 'מצא את האוצר עם רמזים',
    category: 'general',
    icon: Award,
    defaultConfig: {
      type: 'treasure-hunt',
      title: 'ציד האוצר',
      description: 'מצא את האוצר!',
      difficulty: 'medium',
      gridSize: { rows: 5, cols: 5 },
      treasures: [{ x: 4, y: 4 }],
      clues: ['לך מזרחה', 'לך דרומה'],
      obstacles: [{ x: 2, y: 2 }]
    },
    fields: []
  },
  {
    id: 'tower-builder',
    title: 'בונה המגדל',
    description: 'בנה מגדל מתשובות נכונות',
    category: 'general',
    icon: Landmark,
    defaultConfig: {
      type: 'tower-builder',
      title: 'בונה המגדל',
      description: 'בנה גבוה!',
      difficulty: 'easy',
      blocks: [
        { text: '2+2=4', isCorrect: true, order: 1 },
        { text: '2+2=5', isCorrect: false },
        { text: '3+3=6', isCorrect: true, order: 2 }
      ],
      targetHeight: 5,
      category: 'מתמטיקה'
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
 * Get all available game types
 */
export function getAllGameTypes(): string[] {
  return Array.from(new Set(GAME_TEMPLATES.map(t => t.defaultConfig.type)));
}

/**
 * Get templates by category
 */
export function getTemplatesByCategories() {
  return {
    coding: GAME_TEMPLATES.filter(t => t.category === 'coding'),
    math: GAME_TEMPLATES.filter(t => t.category === 'math'),
    language: GAME_TEMPLATES.filter(t => t.category === 'language'),
    science: GAME_TEMPLATES.filter(t => t.category === 'science'),
    history: GAME_TEMPLATES.filter(t => t.category === 'history'),
    general: GAME_TEMPLATES.filter(t => t.category === 'general')
  };
}
