import { Level } from '@/types/game';

export const levels: Level[] = [
  {
    id: 1,
    title: "בדיקת מערכות",
    description: "הרובר נחת על מאדים! 🪐 כדי להפעיל אותו, אנחנו צריכים לשלוח הודעה למרכז הבקרה.",
    instructions: [
      "שלב 1: הקלד את המילה `print` (באותיות קטנות)",
      "שלב 2: אחרי `print` הוסף סוגריים: `()`",
      "שלב 3: בתוך הסוגריים, כתוב את הטקסט: \"System Online\" (עם מרכאות!)",
      "שלב 4: לחץ על כפתור EXECUTE כדי להריץ את הקוד",
      "שלב 5: בדוק שההודעה מופיעה במסך הטרמינל"
    ],
    hints: [
      "💡 זכור: הטקסט חייב להיות בתוך מרכאות!",
      "💡 דוגמה: print(\"Hello\")",
      "💡 שים לב לאותיות גדולות וקטנות - \"System Online\" בדיוק כפי שכתוב"
    ],
    initialCode: `# כתוב את הקוד שלך כאן
`,
    gridSize: { rows: 5, cols: 5 },
    startPosition: { x: 2, y: 2 },
    startDirection: 'down',
    targets: [],
    obstacles: [],
    requiredOutput: "System Online",
    difficulty: 'easy'
  },
  {
    id: 2,
    title: "תנועה ראשונה",
    description: "המערכות פועלות! ✅ עכשיו בואו נלמד לזוז. המטרה שלכם היא להגיע לקריסטל הכחול 💎 שנמצא בסוף המסלול.",
    instructions: [
      "שלב 1: הקלד `move_right()` כדי לזוז צעד אחד ימינה",
      "שלב 2: כדי לזוז כמה צעדים, כתוב את הפקודה כמה פעמים",
      "שלב 3: או השתמש ב-`move_right(6)` כדי לזוז 6 צעדים בבת אחת",
      "שלב 4: הריץ את הקוד וצפה ברובר נע על המסך",
      "שלב 5: ודא שהרובר הגיע לקריסטל הכחול"
    ],
    hints: [
      "💡 המרחק לקריסטל הוא 6 צעדים ימינה",
      "💡 אפשר לכתוב `move_right()` 6 פעמים",
      "💡 או להשתמש ב-`move_right(6)` כדי לזוז 6 צעדים בבת אחת",
      "💡 הכיוונים האפשריים: move_up(), move_down(), move_left(), move_right()"
    ],
    initialCode: `move_right()
`,
    gridSize: { rows: 1, cols: 7 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 6, y: 0 }],
    obstacles: [],
    difficulty: 'easy'
  },
  {
    id: 3,
    title: "עוקף מכשולים",
    description: "יש סלע בדרך! 🪨 הרובר לא יכול לעבור דרך סלעים. צריך לעקוף מלמעלה או מלמטה.",
    instructions: [
      "שלב 1: זוז צעד אחד ימינה עם `move_right()`",
      "שלב 2: זוז צעד אחד מעלה עם `move_up()` כדי לעקוף את הסלע",
      "שלב 3: זוז 3 צעדים ימינה עם `move_right(3)`",
      "שלב 4: זוז צעד אחד למטה עם `move_down()` כדי להגיע לקריסטל"
    ],
    hints: [
      "💡 תכנן את המסלול לפני שתכתוב את הקוד",
      "💡 השתמש בפקודות: move_up(), move_down(), move_left(), move_right()",
      "💡 המסלול המדויק: ימינה (1) → מעלה (1) → ימינה (3) → למטה (1)",
      "💡 הסלע נמצא בעמודה 2, שורה 2 - עקוף מלמעלה דרך שורה 1",
      "💡 אחרי שתזוז ימינה פעם אחת, תגיע לעמודה 1. משם תעלה לשורה 1 ותמשיך ימינה"
    ],
    initialCode: `move_right()
# זוז מעלה כדי לעקוף את הסלע
`,
    gridSize: { rows: 5, cols: 5 },
    startPosition: { x: 0, y: 2 },
    startDirection: 'right',
    targets: [{ x: 4, y: 2 }],
    obstacles: [{ x: 2, y: 2 }],
    difficulty: 'medium'
  },
  {
    id: 4,
    title: "משתנים בפעולה",
    description: "הרובר צריך לנוע מספר צעדים ששומרים במשתנה! 📦 השתמשו במשתנים כדי לפתור את האתגר.",
    instructions: [
      "שלב 1: צרו משתנה `steps` עם הערך 4",
      "שלב 2: השתמשו במשתנה כדי לזוז ימינה: `move_right(steps)`",
      "שלב 3: צרו משתנה נוסף `up_steps` עם הערך 2",
      "שלב 4: השתמשו במשתנה כדי לזוז מעלה: `move_up(up_steps)`",
      "שלב 5: הריצו את הקוד וצפו ברובר נע לפי המשתנים"
    ],
    hints: [
      "💡 דוגמה: `steps = 4` יוצר משתנה בשם steps עם הערך 4",
      "💡 אפשר להשתמש במשתנה בפקודת move: `move_right(steps)`",
      "💡 זה יותר נקי מאשר לכתוב `move_right(4)`",
      "💡 אם תשנו את הערך של `steps`, הרובר יזוז מרחק שונה!",
      "💡 המסלול: ימינה 4 צעדים, מעלה 2 צעדים"
    ],
    initialCode: `# צרו משתנה steps עם הערך 4
# השתמשו בו כדי לזוז ימינה
`,
    gridSize: { rows: 5, cols: 6 },
    startPosition: { x: 0, y: 2 },
    startDirection: 'right',
    targets: [{ x: 4, y: 0 }],
    obstacles: [],
    difficulty: 'easy'
  },
  {
    id: 5,
    title: "תנאים בפעולה",
    description: "הרובר צריך להחליט איזה דרך ללכת לפי תנאים! 🤔 השתמשו ב-if כדי לפתור את האתגר.",
    instructions: [
      "שלב 1: צרו משתנה `direction` עם הערך 'right'",
      "שלב 2: השתמשו ב-if כדי לבדוק: אם direction == 'right', זוזו ימינה",
      "שלב 3: הוסיפו else: אחרת, זוזו שמאלה",
      "שלב 4: הריצו את הקוד וצפו ברובר בוחר דרך לפי התנאי"
    ],
    hints: [
      "💡 דוגמה: `if direction == 'right': move_right()`",
      "💡 אפשר להשתמש ב-else: `else: move_left()`",
      "💡 תנאים מאפשרים למחשב להחליט מה לעשות",
      "💡 המסלול: ימינה 3 צעדים, מעלה 2 צעדים"
    ],
    initialCode: `# צרו משתנה direction = 'right'
# השתמשו ב-if כדי לזוז לפי התנאי
`,
    gridSize: { rows: 5, cols: 6 },
    startPosition: { x: 0, y: 2 },
    startDirection: 'right',
    targets: [{ x: 3, y: 0 }],
    obstacles: [],
    difficulty: 'medium'
  },
  {
    id: 6,
    title: "לולאות מקוננות",
    description: "אתגר מורכב עם לולאות בתוך לולאות! 🔄🔄 השתמשו בלולאות מקוננות כדי לאסוף את כל הקריסטלים.",
    instructions: [
      "שלב 1: השתמשו בלולאה חיצונית לעבור על השורות (3 שורות)",
      "שלב 2: בכל שורה, השתמשו בלולאה פנימית לעבור על העמודות (4 עמודות)",
      "שלב 3: בכל תא, זוזו ימינה עם `move_right()` ואספו את הקריסטל",
      "שלב 4: אחרי כל שורה, זוזו למטה לשורה הבאה עם `move_down()`"
    ],
    hints: [
      "💡 דוגמה: `for row in range(3):` - לולאה חיצונית",
      "💡 בתוך הלולאה: `for col in range(4):` - לולאה פנימית",
      "💡 אחרי הלולאה הפנימית: `move_down()` - לעבור לשורה הבאה",
      "💡 זה יוצר דפוס של טבלה - כל שורה וכל עמודה",
      "💡 המסלול: 3 שורות × 4 עמודות = 12 קריסטלים"
    ],
    initialCode: `# השתמשו בלולאות מקוננות
# לולאה חיצונית לשורות, לולאה פנימית לעמודות
`,
    gridSize: { rows: 4, cols: 5 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }
    ],
    obstacles: [],
    difficulty: 'hard'
  },
  {
    id: 7,
    title: "רשימת פקודות",
    description: "הרובר קיבל רשימת פקודות סודית! 📜 עברו על הרשימה ובצעו את הפקודות כדי להגיע ליעד.",
    instructions: [
      "שלב 1: יש לכם רשימה `commands` עם מספר צעדים לכל כיוון",
      "שלב 2: השתמשו בלולאת `for` כדי לעבור על כל מספר ברשימה",
      "שלב 3: אם המספר חיובי (> 0), זוזו ימינה כמספר הצעדים",
      "שלב 4: אם המספר שלילי (< 0), זוזו למטה (הפכו אותו לחיובי עם `abs()`)",
      "שלב 5: טיפ: `abs(-3)` מחזיר 3"
    ],
    hints: [
      "💡 דוגמה: `for steps in commands:`",
      "💡 בדיקה אם חיובי: `if steps > 0:` -> `move_right(steps)`",
      "💡 בדיקה אם שלילי: `else:` -> `move_down(abs(steps))`",
      "💡 הרשימה: `[2, -1, 3, -2]` אומרת: 2 ימינה, 1 למטה, 3 ימינה, 2 למטה"
    ],
    initialCode: `commands = [2, -1, 3, -2]
# כתבו לולאה שעוברת על הרשימה
# מספר חיובי = ימינה, שלילי = למטה
`,
    gridSize: { rows: 4, cols: 6 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 5, y: 3 }],
    obstacles: [],
    difficulty: 'medium'
  },
  {
    id: 8,
    title: "מפענח הצפנים",
    description: "יש לנו מפה סודית! 🗺️ השתמשו במילון כדי לתרגם את הצבעים לכיוונים.",
    instructions: [
      "שלב 1: צרו מילון המתרגם צבעים לכיוונים: 'red' -> 'right', 'blue' -> 'down'",
      "שלב 2: יש לכם רשימת צבעים `path_colors`",
      "שלב 3: עברו על הרשימה עם לולאה",
      "שלב 4: לכל צבע, בדקו במילון מה הכיוון וזוזו צעד אחד לשם"
    ],
    hints: [
      "💡 המילון: `decoder = {'red': 'right', 'blue': 'down'}`",
      "💡 הלולאה: `for color in path_colors:`",
      "💡 בדיקה: `direction = decoder[color]`",
      "💡 תנועה: `if direction == 'right': move_right()`..."
    ],
    initialCode: `path_colors = ['red', 'red', 'blue', 'red', 'blue', 'blue', 'red']
# צרו מילון decoder ותרגמו את הצבעים לתנועה
`,
    gridSize: { rows: 4, cols: 5 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 4, y: 3 }],
    obstacles: [],
    difficulty: 'hard'
  },
  {
    id: 9,
    title: "כוח הפונקציות",
    description: "יש לפנינו סדרה של מדרגות. 📶 במקום לכתוב את קוד הטיפוס שוב ושוב, צרו פונקציה!",
    instructions: [
      "שלב 1: צרו פונקציה בשם `climb_step()`",
      "שלב 2: בתוך הפונקציה, כתבו את הפקודות לטיפוס מדרגה אחת (ימינה ואז למעלה)",
      "שלב 3: השתמשו בלולאה כדי לקרוא לפונקציה 4 פעמים",
      "שלב 4: שימו לב איך הקוד נשאר נקי ומסודר!"
    ],
    hints: [
      "💡 הגדרת פונקציה: `def climb_step():`",
      "💡 בתוך הפונקציה: `move_right()` ואז `move_up()`",
      "💡 קריאה לפונקציה: `climb_step()`",
      "💡 השתמשו בלולאת for כדי לחזור על הפעולה"
    ],
    initialCode: `# הגדירו את הפונקציה כאן
def climb_step():
    # כתבו את קוד הטיפוס כאן
    pass

# קראו לפונקציה בלולאה
`,
    gridSize: { rows: 5, cols: 5 },
    startPosition: { x: 0, y: 4 },
    startDirection: 'right',
    targets: [{ x: 4, y: 0 }],
    obstacles: [
      { x: 1, y: 4 }, { x: 1, y: 3 },
      { x: 2, y: 3 }, { x: 2, y: 2 },
      { x: 3, y: 2 }, { x: 3, y: 1 },
      { x: 4, y: 1 }
    ],
    difficulty: 'medium'
  },
  {
    id: 10,
    title: "קפיצה למרחק",
    description: "הרובר צריך לקפוץ מעל בורות בגדלים שונים. 🕳️ צרו פונקציה שמקבלת את גודל הקפיצה.",
    instructions: [
      "שלב 1: צרו פונקציה `jump(size)` שמקבלת פרמטר",
      "שלב 2: הפונקציה צריכה לזוז למעלה, לזוז ימינה `size` פעמים, ואז לזוז למטה",
      "שלב 3: יש בור קטן (2 צעדים) ובור גדול (4 צעדים)",
      "שלב 4: השתמשו בפונקציה כדי לעבור את שניהם"
    ],
    hints: [
      "💡 הגדרה: `def jump(size):`",
      "💡 תנועה ימינה: `move_right(size)`",
      "💡 המכשול הראשון דורש קפיצה של 2",
      "💡 המכשול השני דורש קפיצה של 4",
      "💡 סדר הפעולות: jump(2), move_right(), jump(4), move_right()"
    ],
    initialCode: `def jump(size):
    # כתבו את הקוד לקפיצה מעל בור בגודל size
    pass

# עברו את הבורות
jump(2)
move_right()
jump(4)
move_right()
`,
    gridSize: { rows: 3, cols: 9 },
    startPosition: { x: 0, y: 2 },
    startDirection: 'right',
    targets: [{ x: 8, y: 2 }],
    obstacles: [
      { x: 1, y: 2 }, { x: 2, y: 2 }, // בור 1 (רוחב 2)
      { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 } // בור 2 (רוחב 4)
    ],
    difficulty: 'hard'
  },
  {
    id: 11,
    title: "עצירת חירום",
    description: "יש לנו לולאה שרצה 10 פעמים, אבל הקריסטל נמצא במרחק לא ידוע! 🛑 השתמשו ב-break כדי לעצור כשתגיעו אליו.",
    instructions: [
      "שלב 1: יש משתנה `target_distance` (לא ידוע לכם)",
      "שלב 2: השתמשו בלולאת `for` שרצה 10 פעמים",
      "שלב 3: בתוך הלולאה, בדקו אם `i == target_distance`",
      "שלב 4: אם כן - השתמשו ב-`break` לעצור",
      "שלב 5: אחרת - זוזו ימינה צעד אחד"
    ],
    hints: [
      "💡 לולאה: `for i in range(10):`",
      "💡 תנאי: `if i == target_distance:`",
      "💡 עצירה: `break`",
      "💡 אם לא עצרתם: `move_right()`",
      "💡 שימו לב: אם לא תעצרו בזמן, הרובר יתנגש בקיר!"
    ],
    initialCode: `target_distance = 6 # נסו לשנות את המספר ולראות מה קורה

# כתבו לולאה שרצה 10 פעמים
# השתמשו ב-break כדי לעצור כשהגעתם למרחק
`,
    gridSize: { rows: 1, cols: 10 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 6, y: 0 }],
    obstacles: [{ x: 7, y: 0 }], // קיר מיד אחרי המטרה
    difficulty: 'medium'
  },
  {
    id: 12,
    title: "השער הלוגי",
    description: "השער נפתח רק אם שני תנאים מתקיימים! 🧠 השתמשו ב-and ו-or כדי לפתוח אותו.",
    instructions: [
      "שלב 1: יש שני מפתחות: `has_red_key` ו-`has_blue_key`",
      "שלב 2: השער העליון נפתח אם יש מפתח אדום **או** כחול",
      "שלב 3: השער התחתון נפתח רק אם יש מפתח אדום **וגם** כחול",
      "שלב 4: בדקו את התנאים והחליטו לאן ללכת (למעלה או למטה) ואז ימינה",
      "שלב 5: במקרה הזה, יש לנו את שני המפתחות!"
    ],
    hints: [
      "💡 תנאי 1: `if has_red_key or has_blue_key:`",
      "💡 תנאי 2: `if has_red_key and has_blue_key:`",
      "💡 לכו למקום שדורש את שני המפתחות (למטה) כי זה הדרך לאוצר",
      "💡 המסלול למטה: `move_down()`, `move_right(3)`"
    ],
    initialCode: `has_red_key = True
has_blue_key = True

# בדקו: אם יש את שני המפתחות, לכו למטה
# אחרת, לכו למעלה
`,
    gridSize: { rows: 3, cols: 5 },
    startPosition: { x: 0, y: 1 },
    startDirection: 'right',
    targets: [{ x: 4, y: 2 }], // המטרה למטה
    obstacles: [
        { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, // חסימה למעלה בסוף
        { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }  // חסימה באמצע
    ],
    difficulty: 'hard'
  },
  {
    id: 13,
    title: "הסיסמה הסודית",
    description: "הדלת נעולה! 🔒 עליכם להרכיב את הסיסמה הנכונה כדי לפתוח אותה.",
    instructions: [
      "שלב 1: הסיסמה מורכבת משלושה חלקים שצריך לחבר",
      "שלב 2: חלק 1: האות הראשונה של `word1` ('Magic')",
      "שלב 3: חלק 2: המילה `word2` ('Open') כפול 2",
      "שלב 4: חלק 3: שלוש האותיות האחרונות של `word3` ('Sesame')",
      "שלב 5: חברו את הכל למשתנה `password` והדפיסו אותו עם `speak(password)`"
    ],
    hints: [
      "💡 חלק 1: `word1[0]` (M)",
      "💡 חלק 2: `word2 * 2` (OpenOpen)",
      "💡 חלק 3: `word3[3:]` (ame)",
      "💡 חיבור: `part1 + part2 + part3`",
      "💡 בסוף אל תשכחו: `speak(password)`"
    ],
    initialCode: `word1 = "Magic"
word2 = "Open"
word3 = "Sesame"

# הרכיבו את הסיסמה:
# 1. האות הראשונה של word1
# 2. המילה word2 פעמיים
# 3. שלוש האותיות האחרונות של word3

password = "" # ...
speak(password)
`,
    gridSize: { rows: 1, cols: 1 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [],
    obstacles: [],
    requiredOutput: "MOpenOpename",
    difficulty: 'medium'
  },
  {
    id: 14,
    title: "המחשבון הראשון שלי",
    description: "בנו מחשבון פשוט! 🧮 עליכם לחשב את התוצאה ולהדפיס אותה.",
    instructions: [
      "שלב 1: יש לכם שני משתנים `num1` ו-`num2` עם מספרים",
      "שלב 2: יש משתנה `operator` עם סוג הפעולה ('+' או '-')",
      "שלב 3: אם הפעולה היא '+', חברו את המספרים והדפיסו עם `speak()`",
      "שלב 4: אם הפעולה היא '-', חסרו את המספרים והדפיסו"
    ],
    hints: [
      "💡 בדיקת הפעולה: `if operator == '+':`",
      "💡 חישוב: `result = num1 + num2`",
      "💡 הדפסה: `speak(result)`",
      "💡 שימו לב: במקרה הזה, הפעולה היא חיבור והמספרים הם 10 ו-5"
    ],
    initialCode: `num1 = 10
num2 = 5
operator = "+"

# בדקו מה הפעולה
# בצעו את החישוב
# הדפיסו את התוצאה עם speak()
`,
    gridSize: { rows: 1, cols: 1 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [],
    obstacles: [],
    requiredOutput: "15",
    difficulty: 'easy'
  },
  {
    id: 15,
    title: "משחק הניחושים",
    description: "המחשב בחר מספר סודי (7). 🎲 נחשו אותו באמצעות לולאה!",
    instructions: [
      "שלב 1: המספר הסודי הוא `secret_number = 7`",
      "שלב 2: יש לכם רשימת ניחושים `guesses = [2, 5, 7, 10]`",
      "שלב 3: עברו על הרשימה בלולאה",
      "שלב 4: אם הניחוש שווה למספר הסודי, הדפיסו 'BINGO' ועצרו עם `break`",
      "שלב 5: אחרת, הדפיסו 'NO'"
    ],
    hints: [
      "💡 לולאה: `for guess in guesses:`",
      "💡 בדיקה: `if guess == secret_number:`",
      "💡 הדפסה: `speak('BINGO')`",
      "💡 עצירה: `break`",
      "💡 אחרת: `else: speak('NO')`"
    ],
    initialCode: `secret_number = 7
guesses = [2, 5, 7, 10]

# עברו על הניחושים
# אם מצאתם את 7, הדפיסו BINGO ועצרו
`,
    gridSize: { rows: 1, cols: 1 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [],
    obstacles: [],
    requiredOutput: "NO\nNO\nBINGO",
    difficulty: 'medium'
  },
  // ========== משחקי מתמטיקה לכיתה ג' ==========
  {
    id: 16,
    title: "מספרים וערך מקום",
    description: "הרובר צריך להגיע לקריסטל! 💎 אבל הדרך נחסמת על ידי מספרים. פתרו את התרגיל כדי לפתוח את הדלת!",
    instructions: [
      "שלב 1: יש משתנה `number` עם המספר 523",
      "שלב 2: חשבו מה הערך של הספרה במקום המאות (הספרה הראשונה)",
      "שלב 3: חשבו: `hundreds = number // 100` (חלוקה שלמה)",
      "שלב 4: חשבו את הערך: `hundreds_value = hundreds * 100`",
      "שלב 5: הדפיסו את הערך עם `speak(hundreds_value)` כדי לפתוח את הדלת"
    ],
    hints: [
      "💡 המספר 523: הספרה במקום המאות היא 5",
      "💡 חלוקה שלמה: `523 // 100 = 5`",
      "💡 הערך: `5 * 100 = 500`",
      "💡 הדפיסו: `speak(500)`"
    ],
    initialCode: `number = 523

# חשבו את הערך של הספרה במקום המאות
# והדפיסו אותו עם speak()
`,
    gridSize: { rows: 1, cols: 1 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [],
    obstacles: [],
    requiredOutput: "500",
    difficulty: 'easy'
  },
  {
    id: 17,
    title: "חיבור וחיסור",
    description: "הרובר צריך לפתור תרגילי חיבור וחיסור כדי לנוע! ➕➖ פתרו את התרגילים כדי להגיע לקריסטל.",
    instructions: [
      "שלב 1: יש שני מספרים: `num1 = 47` ו-`num2 = 28`",
      "שלב 2: חשבו את החיבור: `sum_result = num1 + num2`",
      "שלב 3: חשבו את החיסור: `diff_result = num1 - num2`",
      "שלב 4: אם הסכום גדול מ-70, זוזו ימינה 3 צעדים",
      "שלב 5: אחרת, זוזו ימינה צעד אחד",
      "שלב 6: הדפיסו את תוצאת החיסור עם `speak(diff_result)`"
    ],
    hints: [
      "💡 חיבור: `47 + 28 = 75`",
      "💡 חיסור: `47 - 28 = 19`",
      "💡 בדיקה: `if sum_result > 70:`",
      "💡 תנועה: `move_right(3)` או `move_right(1)`",
      "💡 הדפסה: `speak(19)`"
    ],
    initialCode: `num1 = 47
num2 = 28

# חשבו חיבור וחיסור
# אם הסכום > 70, זוזו 3 צעדים ימינה
# אחרת, זוזו צעד אחד ימינה
# הדפיסו את תוצאת החיסור
`,
    gridSize: { rows: 1, cols: 5 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 3, y: 0 }],
    obstacles: [],
    difficulty: 'easy'
  },
  {
    id: 18,
    title: "כפל וחילוק",
    description: "הרובר צריך לפתור תרגילי כפל כדי לאסוף קריסטלים! ✖️ השתמשו בלולאה כדי לחשב כפולות.",
    instructions: [
      "שלב 1: יש מספר `base = 7`",
      "שלב 2: השתמשו בלולאת `for` כדי לחשב את הכפולות של 7",
      "שלב 3: לכל מספר מ-1 עד 5, חשבו: `result = base * i`",
      "שלב 4: אם התוצאה גדולה מ-20, זוזו ימינה צעד אחד",
      "שלב 5: אחרי הלולאה, הדפיסו את התוצאה האחרונה עם `speak()`"
    ],
    hints: [
      "💡 לולאה: `for i in range(1, 6):` (מ-1 עד 5)",
      "💡 כפל: `result = 7 * i`",
      "💡 בדיקה: `if result > 20: move_right()`",
      "💡 התוצאות: 7, 14, 21, 28, 35",
      "💡 הדפיסו: `speak(35)`"
    ],
    initialCode: `base = 7

# השתמשו בלולאה כדי לחשב כפולות של 7
# אם התוצאה > 20, זוזו ימינה
# הדפיסו את התוצאה האחרונה
`,
    gridSize: { rows: 1, cols: 4 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 3, y: 0 }],
    obstacles: [],
    difficulty: 'medium'
  },
  {
    id: 19,
    title: "שברים",
    description: "הרובר צריך להבין שברים כדי לפתוח דלתות! 🍰 חשבו איזה שבר גדול יותר.",
    instructions: [
      "שלב 1: יש שני שברים: `fraction1 = 1/2` ו-`fraction2 = 1/3`",
      "שלב 2: חשבו את הערכים: `value1 = 1 / 2` ו-`value2 = 1 / 3`",
      "שלב 3: אם `value1 > value2`, זוזו ימינה 2 צעדים",
      "שלב 4: אחרת, זוזו ימינה צעד אחד",
      "שלב 5: הדפיסו את הערך הגדול יותר עם `speak()`"
    ],
    hints: [
      "💡 שבר 1/2 = 0.5",
      "💡 שבר 1/3 ≈ 0.333",
      "💡 1/2 גדול מ-1/3",
      "💡 בדיקה: `if value1 > value2:`",
      "💡 הדפיסו: `speak(0.5)`"
    ],
    initialCode: `# חשבו איזה שבר גדול יותר: 1/2 או 1/3
# זוזו לפי התוצאה והדפיסו את הערך הגדול יותר
`,
    gridSize: { rows: 1, cols: 3 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 2, y: 0 }],
    obstacles: [],
    difficulty: 'easy'
  },
  {
    id: 20,
    title: "מדידות וגאומטריה",
    description: "הרובר צריך למדוד מרחקים ולזהות צורות! 📏🔷 פתרו בעיות מדידה כדי להגיע ליעד.",
    instructions: [
      "שלב 1: יש רשימת אורכים: `lengths = [5, 8, 3, 12, 6]`",
      "שלב 2: חשבו את הסכום הכולל: `total = sum(lengths)`",
      "שלב 3: חשבו את הממוצע: `average = total / len(lengths)`",
      "שלב 4: אם הממוצע גדול מ-6, זוזו ימינה 4 צעדים",
      "שלב 5: אחרת, זוזו ימינה 2 צעדים",
      "שלב 6: הדפיסו את הסכום הכולל עם `speak(total)`"
    ],
    hints: [
      "💡 סכום: `5 + 8 + 3 + 12 + 6 = 34`",
      "💡 ממוצע: `34 / 5 = 6.8`",
      "💡 6.8 > 6, אז זוזו 4 צעדים",
      "💡 הדפיסו: `speak(34)`"
    ],
    initialCode: `lengths = [5, 8, 3, 12, 6]

# חשבו את הסכום והממוצע
# זוזו לפי הממוצע והדפיסו את הסכום
`,
    gridSize: { rows: 1, cols: 5 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 4, y: 0 }],
    obstacles: [],
    difficulty: 'medium'
  },
  {
    id: 21,
    title: "נתונים ויחסים",
    description: "הרובר צריך לנתח נתונים כדי למצוא את הדרך! 📊 השתמשו בנתונים כדי לפתור את האתגר.",
    instructions: [
      "שלב 1: יש רשימת ציונים: `scores = [85, 90, 78, 92, 88]`",
      "שלב 2: מצאו את הציון הגבוה ביותר: `max_score = max(scores)`",
      "שלב 3: מצאו את הציון הנמוך ביותר: `min_score = min(scores)`",
      "שלב 4: חשבו את ההפרש: `difference = max_score - min_score`",
      "שלב 5: אם ההפרש גדול מ-10, זוזו ימינה 3 צעדים",
      "שלב 6: הדפיסו את ההפרש עם `speak(difference)`"
    ],
    hints: [
      "💡 ציון מקסימלי: `max(scores) = 92`",
      "💡 ציון מינימלי: `min(scores) = 78`",
      "💡 הפרש: `92 - 78 = 14`",
      "💡 14 > 10, אז זוזו 3 צעדים",
      "💡 הדפיסו: `speak(14)`"
    ],
    initialCode: `scores = [85, 90, 78, 92, 88]

# מצאו את הציון הגבוה והנמוך ביותר
# חשבו את ההפרש וזוזו לפי התוצאה
# הדפיסו את ההפרש
`,
    gridSize: { rows: 1, cols: 4 },
    startPosition: { x: 0, y: 0 },
    startDirection: 'right',
    targets: [{ x: 3, y: 0 }],
    obstacles: [],
    difficulty: 'medium'
  }
];

export function getLevel(id: number): Level | undefined {
  return levels.find(l => l.id === id);
}
