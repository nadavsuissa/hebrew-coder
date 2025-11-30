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
  GitBranch, 
  Layers,
  Zap
} from 'lucide-react';

export interface GameTemplate {
  id: string;
  title: string;
  description: string;
  category: 'syntax' | 'logic' | 'data' | 'algorithm';
  icon: any;
  defaultConfig: any;
  fields: GameConfigField[];
}

export interface GameConfigField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'code' | 'array' | 'select' | 'number' | 'boolean';
  placeholder?: string;
  options?: { label: string; value: string }[];
  itemFields?: GameConfigField[];
  defaultValue?: any;
}

export const GAME_TEMPLATES: GameTemplate[] = [
  // --- Syntax & Basics ---
  {
    id: 'code-fixer',
    title: 'צייד הבאגים',
    description: 'מצא ותקן את השגיאות בקוד. מצוין לתרגול דיבאגינג.',
    category: 'syntax',
    icon: FileCode,
    defaultConfig: {
      brokenCode: 'def greet(name)\n    print("Hello " + name)',
      solution: 'def greet(name):\n    print(f"Hello {name}")',
      hints: ['שים לב לנקודותיים בסוף הגדרת הפונקציה'],
      language: 'python'
    },
    fields: [
      { name: 'brokenCode', label: 'קוד שגוי', type: 'code' },
      { name: 'solution', label: 'פתרון תקין', type: 'code' },
      { name: 'hints', label: 'רמזים', type: 'array', itemFields: [{ name: 'text', label: 'רמז', type: 'text' }] },
      { name: 'language', label: 'שפה', type: 'select', options: [{ label: 'Python', value: 'python' }, { label: 'JavaScript', value: 'javascript' }] }
    ]
  },
  {
    id: 'speed-typer',
    title: 'ספיד טייפר',
    description: 'תרגול הקלדה עיוורת של קוד. המטרה: להקליד את הקוד במדויק ובמהירות.',
    category: 'syntax',
    icon: Keyboard,
    defaultConfig: {
      codeSnippet: 'import random\n\nnum = random.randint(1, 10)',
      timeLimit: 30
    },
    fields: [
      { name: 'codeSnippet', label: 'קטע קוד להקלדה', type: 'code' },
      { name: 'timeLimit', label: 'הגבלת זמן (שניות)', type: 'number' }
    ]
  },
  {
    id: 'indent-police',
    title: 'משטרת האינדנטציה',
    description: 'סדר את ההזחות (Indentation) בקוד פייתון. קריטי ללמידת מבנה הקוד.',
    category: 'syntax',
    icon: AlignLeft,
    defaultConfig: {
      scrambledCode: 'def check_num(x):\nif x > 0:\nprint("Positive")',
      solution: 'def check_num(x):\n    if x > 0:\n        print("Positive")'
    },
    fields: [
      { name: 'scrambledCode', label: 'קוד לא מסודר', type: 'code' },
      { name: 'solution', label: 'פתרון (מסודר)', type: 'code' }
    ]
  },

  // --- Logic & Control Flow ---
  {
    id: 'parsons-puzzle',
    title: 'פאזל שורות',
    description: 'גרור ושחרר שורות קוד כדי לבנות תוכנית הגיונית ותקינה.',
    category: 'logic',
    icon: Layers,
    defaultConfig: {
      lines: ['x = 0', 'for i in range(5):', '    x += i', 'print(x)'],
      distractors: ['x = 1', 'for i in range(6):']
    },
    fields: [
      { name: 'lines', label: 'שורות נכונות (לפי הסדר)', type: 'array', itemFields: [{ name: 'content', label: 'שורה', type: 'text' }] },
      { name: 'distractors', label: 'מסיחים (שורות לא נכונות)', type: 'array', itemFields: [{ name: 'content', label: 'שורה', type: 'text' }] }
    ]
  },
  {
    id: 'logic-gatekeeper',
    title: 'שער הלוגיקה',
    description: 'העריך ביטויים בוליאניים (אמת/שקר). תרגול של and, or, not.',
    category: 'logic',
    icon: Binary,
    defaultConfig: {
      expressions: [
        { expr: 'True and False', result: 'False' },
        { expr: 'not (5 > 3)', result: 'False' },
        { expr: '10 == 10 or 5 < 2', result: 'True' }
      ]
    },
    fields: [
      { 
        name: 'expressions', 
        label: 'ביטויים לוגיים', 
        type: 'array', 
        itemFields: [
          { name: 'expr', label: 'ביטוי', type: 'text' },
          { name: 'result', label: 'תוצאה (True/False)', type: 'select', options: [{ label: 'True', value: 'True' }, { label: 'False', value: 'False' }] }
        ] 
      }
    ]
  },
  {
    id: 'robot-turtle',
    title: 'הצב הרובוטי',
    description: 'כתוב פקודות כדי להוביל את הצב ליעד. תרגול של לולאות ותנאים.',
    category: 'logic',
    icon: Zap,
    defaultConfig: {
      gridSize: 5,
      startPos: { x: 0, y: 0 },
      endPos: { x: 4, y: 4 },
      obstacles: [{ x: 2, y: 2 }, { x: 3, y: 1 }]
    },
    fields: [
      { name: 'gridSize', label: 'גודל לוח (N x N)', type: 'number' },
      { name: 'startPos', label: 'התחלה (JSON)', type: 'text', placeholder: '{ "x": 0, "y": 0 }' },
      { name: 'endPos', label: 'סיום (JSON)', type: 'text', placeholder: '{ "x": 4, "y": 4 }' },
      { name: 'obstacles', label: 'מכשולים (JSON Array)', type: 'text', placeholder: '[{ "x": 2, "y": 2 }]' }
    ]
  },

  // --- Data Structures ---
  {
    id: 'slice-master',
    title: 'אשף הסלייסים',
    description: 'תרגול חיתוך רשימות ומחרוזות (Slicing). חתוך את החלק המבוקש.',
    category: 'data',
    icon: Scissors,
    defaultConfig: {
      sourceList: '[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]',
      targetSlice: '[2, 3, 4]',
      correctAnswer: '[2:5]'
    },
    fields: [
      { name: 'sourceList', label: 'רשימת מקור', type: 'text' },
      { name: 'targetSlice', label: 'תוצאה רצויה', type: 'text' },
      { name: 'correctAnswer', label: 'תשובה נכונה (למשל [1:4])', type: 'text' }
    ]
  },
  {
    id: 'memory-match',
    title: 'זיכרון קוד',
    description: 'משחק הזיכרון הקלאסי עם טוויסט של קוד. התאם מושג להגדרה או קוד לפלט.',
    category: 'data',
    icon: BrainCircuit,
    defaultConfig: {
      pairs: [
        { front: 'int', back: 'מספר שלם' },
        { front: 'str', back: 'מחרוזת טקסט' },
        { front: 'bool', back: 'אמת או שקר' }
      ]
    },
    fields: [
      { 
        name: 'pairs', 
        label: 'זוגות קלפים', 
        type: 'array', 
        itemFields: [
          { name: 'front', label: 'צד א (מושג)', type: 'text' },
          { name: 'back', label: 'צד ב (הגדרה)', type: 'text' }
        ] 
      }
    ]
  },

  // --- Algorithms & Comprehension ---
  {
    id: 'output-predictor',
    title: 'נביא הפלט',
    description: 'נתח את הקוד וחזה מה יודפס למסך.',
    category: 'algorithm',
    icon: Terminal,
    defaultConfig: {
      code: 'x = 1\nfor i in range(3):\n    x = x * 2\nprint(x)',
      options: ['2', '4', '8', '6'],
      correctIndex: 2
    },
    fields: [
      { name: 'code', label: 'קוד', type: 'code' },
      { name: 'options', label: 'אפשרויות תשובה', type: 'array', itemFields: [{ name: 'text', label: 'אפשרות', type: 'text' }] },
      { name: 'correctIndex', label: 'אינדקס תשובה נכונה (0-3)', type: 'number' }
    ]
  },
  {
    id: 'fill-blanks',
    title: 'השלם את הקוד',
    description: 'השלם את החלקים החסרים בקוד כדי שיעבוד כשורה.',
    category: 'algorithm',
    icon: Puzzle,
    defaultConfig: {
      code: 'def add(a, b):\n    ___ a + b',
      blanks: ['return']
    },
    fields: [
      { name: 'code', label: 'קוד עם חוסרים (סמן ב-___)', type: 'code' },
      { name: 'blanks', label: 'מילים להשלמה (לפי הסדר)', type: 'array', itemFields: [{ name: 'word', label: 'מילה', type: 'text' }] }
    ]
  },
  {
    id: 'variable-tracer',
    title: 'עוקב המשתנים',
    description: 'עקוב אחר ערכו של משתנה לאורך ריצת התוכנית.',
    category: 'algorithm',
    icon: Search,
    defaultConfig: {
      code: 'count = 0\nwhile count < 3:\n    count += 1',
      variableName: 'count',
      sequence: ['0', '1', '2', '3']
    },
    fields: [
      { name: 'code', label: 'קוד', type: 'code' },
      { name: 'variableName', label: 'שם המשתנה למעקב', type: 'text' },
      { name: 'sequence', label: 'רצף הערכים (כטקסט)', type: 'array', itemFields: [{ name: 'val', label: 'ערך', type: 'text' }] }
    ]
  }
];

export function getGameTemplate(id: string): GameTemplate | undefined {
  return GAME_TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory() {
  return GAME_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, GameTemplate[]>);
}