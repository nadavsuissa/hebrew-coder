import { Module, Course } from '@/types/course';

// ========== מודולי פייתון ==========
export const pythonModules: Module[] = [
  {
    id: 'basics',
    title: 'יסודות הפייתון',
    description: 'התחילו כאן! למדו את בסיס השפה, משתנים והדפסה למסך.',
    lessons: [
      {
        id: 'basics-1',
        title: 'מה זה פייתון?',
        description: 'היכרות ראשונית עם שפת התכנות הפופולרית בעולם.',
        type: 'text',
        xpReward: 50,
        content: `
# ברוכים הבאים לפייתון! 🐍

## מה זה פייתון?

פייתון היא שפת תכנות קסומה שמאפשרת לנו לדבר עם המחשב בצורה פשוטה וברורה.
היא נקראת על שם להקת הקומדיה הבריטית "מונטי פייתון" - מה שמראה שהמפתחים שלה אוהבים כיף!

פייתון נוצרה בשנת 1991 על ידי גווידו ואן רוסום, והיא הפכה לאחת משפות התכנות הפופולריות ביותר בעולם.
היום, מיליוני מפתחים משתמשים בפייתון מדי יום כדי לבנות תוכנות מדהימות!

### למה פייתון כל כך מיוחדת?

1. **קלה ללמידה:** התחביר שלה מזכיר אנגלית פשוטה. אין צורך בסוגריים מסולסלים או נקודה-פסיק!
   הקוד נקי וקריא, מה שהופך את הלמידה למהנה ופשוטה.

2. **פופולרית מאוד:** משתמשים בה בחברות הגדולות בעולם כמו גוגל, נאס"א, נטפליקס, פייסבוק, אמזון ועוד.
   אם חברות ענק כאלה משתמשות בפייתון, זה אומר שהיא באמת חזקה ואמינה!

3. **חזקה:** אפשר לעשות איתה כמעט הכל - אתרים, בינה מלאכותית, משחקים, רובוטיקה, אוטומציה ועוד.
   פייתון היא כמו סכין שוויצרי - כלי אחד שעושה הכל!

4. **חינמית:** פייתון היא חינמית לחלוטין וכל אחד יכול להשתמש בה!
   אין צורך לשלם או לבקש רשות - פשוט מורידים ומתחילים לתכנת!

5. **קהילה גדולה:** יש מיליוני מפתחים ברחבי העולם שמשתמשים בפייתון ומסייעים זה לזה.
   אם יש לך שאלה, תמיד יש מישהו שיכול לעזור!

### מה אפשר לעשות עם פייתון?

- **אתרים:** אתרים כמו YouTube, Instagram, Reddit ו-Pinterest משתמשים בפייתון בצד השרת שלהם.
  אפשר לבנות אתרים מלאים עם פייתון!

- **בינה מלאכותית:** רוב מערכות הבינה המלאכותית נבנות בפייתון.
  ChatGPT, מערכות זיהוי פנים, מכוניות אוטונומיות - הכל בפייתון!

- **משחקים:** אפשר ליצור משחקים מגניבים עם ספריות כמו Pygame.
  משחקי פלטפורמה, משחקי אסטרטגיה, משחקי חידות - הכל אפשרי!

- **רובוטיקה:** לשלוט ברובוטים ולבנות פרויקטים מגניבים.
  רובוטים שמנקים, רובוטים שמבשלים, רובוטים שמשחקים - הכל בפייתון!

- **מדע נתונים:** לנתח מידע ולמצוא תבניות מעניינות.
  מדענים משתמשים בפייתון כדי לחקור את העולם ולמצוא תגליות מדהימות!

- **אוטומציה:** לעשות משימות משעממות אוטומטית.
  לשלוח אימיילים, לארגן קבצים, לבדוק את מזג האוויר - הכל אוטומטי!

### ההיסטוריה של פייתון

פייתון נוצרה בשנת 1991 על ידי גווידו ואן רוסום, מפתח הולנדי.
הוא רצה ליצור שפה שתהה קלה לקריאה ופשוטה לשימוש.

השם "פייתון" נבחר כי גווידו היה מעריץ של להקת הקומדיה הבריטית "מונטי פייתון".
זה מראה שהתכנות יכול להיות גם כיף וגם רציני!

### למה ללמוד פייתון?

למידת תכנות היא כמו למידת שפה חדשה - אבל במקום לדבר עם אנשים, אנחנו מדברים עם מחשבים!
פייתון היא השפה המושלמת להתחיל איתה כי:

- היא קלה להבנה גם למתחילים
- יש לה המון שימושים מעשיים
- היא מלמדת חשיבה לוגית ופתרון בעיות
- היא פותחת דלתות לקריירה מעניינת
- היא מאפשרת לבנות דברים מדהימים!

### הפקודה הראשונה שלנו: print

בואו נראה את הפקודה הראשונה שלנו: \`print\`.
פקודה זו מאפשרת למחשב "לדבר" אלינו חזרה ולהציג מידע על המסך.

\`\`\`python
print("שלום עולם!")
\`\`\`

כשנריץ את הקוד הזה, המחשב ידפיס: שלום עולם!

זהו המסורת של כל מתכנת מתחיל - להדפיס "שלום עולם!" כשמתחילים ללמוד שפה חדשה.
זה כמו להגיד "היי, אני כאן ואני יכול לתכנת!"

### איך פייתון עובדת?

כשאנחנו כותבים קוד בפייתון, המחשב קורא אותו שורה אחר שורה ומבצע את ההוראות שלנו.
זה כמו לתת למחשב רשימת משימות - הוא עושה אותן בסדר!

פייתון היא שפה "מפורשת" (interpreted) - זה אומר שהקוד שלנו רץ ישירות ללא צורך להמיר אותו קודם.
זה הופך את הפיתוח למהיר ונוח יותר!

### מה הלאה?

בשיעור הבא נלמד איך להשתמש בפקודה print בצורה מתקדמת יותר,
ואיך להדפיס מספרים, משתנים ועוד המון דברים מגניבים!

אבל לפני שנתקדם, בואו נבין: פייתון היא כלי חזק שיכול לעזור לכם לבנות כל מה שאתם מדמיינים.
הדמיון הוא הגבול היחיד!
        `
      },
      {
        id: 'basics-2',
        title: 'הפקודה print',
        description: 'איך גורמים למחשב לדבר?',
        type: 'quiz',
        xpReward: 150,
        quizQuestions: [
          {
            id: 'q1',
            question: 'איזו פקודה מדפיסה טקסט למסך?',
            options: ['write()', 'print()', 'say()', 'echo()'],
            correctAnswer: 1,
            explanation: 'הפקודה print() היא הפקודה הבסיסית בפייתון להצגת פלט למסך.'
          },
          {
            id: 'q2',
            question: 'איך מדפיסים את המשפט "Hello World"?',
            options: ['print "Hello World"', 'print("Hello World")', 'console.log("Hello World")', 'echo "Hello World"'],
            correctAnswer: 1,
            explanation: 'בפייתון 3, חובה להשתמש בסוגריים מסביב לטקסט שאנחנו רוצים להדפיס.'
          },
          {
            id: 'q3',
            question: 'מה ידפיס הקוד: print("שלום")?',
            options: ['print("שלום")', 'שלום', '"שלום"', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'הפקודה print מדפיסה את התוכן שבתוך הסוגריים, בלי המרכאות.'
          },
          {
            id: 'q4',
            question: 'איזה סימן משמש להדפסת טקסט בפייתון?',
            options: ['מרכאות בודדות בלבד', 'מרכאות כפולות בלבד', 'מרכאות בודדות או כפולות', 'סוגריים מרובעים'],
            correctAnswer: 2,
            explanation: 'בפייתון אפשר להשתמש גם במרכאות בודדות (\') וגם בכפולות (") לטקסט.'
          },
          {
            id: 'q5',
            question: 'מה יקרה אם נכתוב: print(שלום)?',
            options: ['ידפיס שלום', 'ידפיס "שלום"', 'שגיאה - חסרות מרכאות', 'לא יקרה כלום'],
            correctAnswer: 2,
            explanation: 'טקסט חייב להיות בתוך מרכאות, אחרת פייתון יחשוב שזה שם של משתנה.'
          },
          {
            id: 'q6',
            question: 'מה ידפיס הקוד: print("1 + 2")?',
            options: ['3', '1 + 2', '12', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'כשהביטוי בתוך מרכאות, הוא נחשב לטקסט ולא לחישוב מתמטי.'
          },
          {
            id: 'q7',
            question: 'מה ידפיס הקוד: print(1 + 2)?',
            options: ['3', '1 + 2', '12', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'בלי מרכאות, פייתון מחשב את הביטוי ומדפיס את התוצאה.'
          },
          {
            id: 'q8',
            question: 'איך מדפיסים שתי שורות נפרדות?',
            options: ['print("שורה 1" + "שורה 2")', 'print("שורה 1"); print("שורה 2")', 'print("שורה 1\\nשורה 2")', 'שתי התשובות האחרונות נכונות'],
            correctAnswer: 3,
            explanation: 'אפשר להשתמש בשתי פקודות print נפרדות או בתו \\n שמייצג ירידת שורה.'
          },
          {
            id: 'q9',
            question: 'מה ידפיס: print("Hello", "World")?',
            options: ['HelloWorld', 'Hello World', 'Hello, World', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'כשמעבירים כמה ערכים ל-print, הם מודפסים עם רווח ביניהם.'
          },
          {
            id: 'q10',
            question: 'איזו שורה תגרום לשגיאה?',
            options: ['print("שלום")', 'print(\'שלום\')', 'print(שלום)', 'print("שלום", "עולם")'],
            correctAnswer: 2,
            explanation: 'שורה 3 תגרום לשגיאה כי הטקסט לא בתוך מרכאות.'
          }
        ]
      },
      {
        id: 'basics-game-1',
        title: 'אתגר: צעד ראשון',
        description: 'השתמשו במה שלמדתם כדי להזיז את הדמות.',
        type: 'game',
        gameLevelId: 1,
        xpReward: 150
      },
      {
        id: 'basics-3',
        title: 'משתנים',
        description: 'מה זה משתנה ואיך להשתמש בו?',
        type: 'text',
        xpReward: 75,
        content: `
# משתנים (Variables) 📦

## מה זה משתנה?

משתנה הוא כמו קופסה שבה אנחנו שומרים מידע. אפשר לשים בקופסה מספר, טקסט, או כל דבר אחר!
דמיינו שיש לכם קופסה עם תווית, ואתם שמים בה משהו. אחר כך אפשר לקחת את מה שבקופסה ולהשתמש בו.

## איך יוצרים משתנה?

פשוט מאוד! אנחנו נותנים שם לקופסה ושומרים בה ערך.
התחביר הוא: **שם המשתנה = הערך**

\`\`\`python
name = "דני"
age = 10
is_happy = True
\`\`\`

### הסבר על הדוגמה:

- \`name = "דני"\` - יוצר משתנה בשם name עם הערך "דני" (טקסט)
- \`age = 10\` - יוצר משתנה בשם age עם הערך 10 (מספר)
- \`is_happy = True\` - יוצר משתנה בשם is_happy עם הערך True (בוליאני)

## כללי שמות משתנים:

1. **אותיות ומספרים:** אפשר להשתמש באותיות (עברית או אנגלית) ומספרים
2. **לא מתחיל במספר:** שם המשתנה לא יכול להתחיל במספר
3. **אין רווחים:** במקום רווח, משתמשים בקו תחתון (_)
4. **אין מילים שמורות:** לא אפשר להשתמש במילים כמו print, if, for כשם משתנה

### דוגמאות לשמות טובים:
\`\`\`python
student_name = "שרה"
student_age = 12
number_of_apples = 5
is_ready = True
\`\`\`

### דוגמאות לשמות לא טובים:
\`\`\`python
# לא טוב - מתחיל במספר
2students = 10

# לא טוב - יש רווח
student name = "שרה"

# לא טוב - מילה שמורה
print = "שלום"
\`\`\`

## למה משתנים חשובים?

1. **שמירת מידע** - אנחנו יכולים לשמור מידע ולשתמש בו אחר כך בקוד
2. **שינוי ערכים** - אפשר לשנות את הערך של המשתנה במהלך התוכנית
3. **קוד נקי** - במקום לחזור על אותו מספר או טקסט, אנחנו משתמשים בשם משמעותי
4. **קריאות** - קוד עם משתנים נקי וקל להבנה יותר

## דוגמה מעשית:

\`\`\`python
rover_name = "רובי"
rover_age = 5
print("הרובר שלי נקרא " + rover_name)
print("הוא בן " + str(rover_age) + " שנים")
\`\`\`

זה ידפיס:
הרובר שלי נקרא רובי
הוא בן 5 שנים

## שינוי ערך של משתנה:

אפשר לשנות את הערך של משתנה בכל עת:

\`\`\`python
score = 0
print("הניקוד שלך: " + str(score))

score = 10
print("הניקוד שלך עכשיו: " + str(score))

score = score + 5
print("הניקוד שלך אחרי הוספה: " + str(score))
\`\`\`

## טיפים חשובים:

- **בחרו שמות משמעותיים:** \`name\` טוב יותר מ-\`n\` או \`x\`
  כשאתם קוראים את הקוד אחרי שבוע, תבינו מה המשתנה עושה!

- **השתמשו בעברית:** אפשר להשתמש בעברית בשמות משתנים!
  \`שם_תלמיד\`, \`גיל\`, \`ציון\` - הכל עובד מצוין!

- **היו עקביים:** אם אתם משתמשים בקו תחתון, המשיכו עם זה
  עקביות עוזרת לקוד להיות נקי וקריא יותר.

- **השתמשו בשמות ארוכים כשצריך:** \`number_of_students\` טוב יותר מ-\`n\`
  עדיף שם ארוך וברור מאשר שם קצר ומבלבל!

### שימוש במשתנים עם print

אפשר להשתמש במשתנים יחד עם print כדי להדפיס מידע דינמי:

\`\`\`python
name = "דני"
age = 10
print("השם שלי הוא " + name)
print("אני בן " + str(age) + " שנים")
\`\`\`

שימו לב: כשאנחנו מחברים מספר לטקסט, צריך להמיר אותו לטקסט עם \`str()\`.

### משתנים יכולים להשתנות

המילה "משתנה" אומרת שהערך יכול להשתנות! אפשר לשנות את הערך של משתנה בכל עת:

\`\`\`python
score = 0
print("הניקוד: " + str(score))

score = 10
print("הניקוד עכשיו: " + str(score))

score = score + 5
print("הניקוד אחרי הוספה: " + str(score))
\`\`\`

### משתנים מרובים

אפשר ליצור כמה משתנים שאנחנו רוצים:

\`\`\`python
first_name = "דני"
last_name = "כהן"
age = 10
city = "תל אביב"
school = "בית ספר יסודי"

print("היי! אני " + first_name + " " + last_name)
print("אני בן " + str(age) + " ואני גר ב-" + city)
print("אני לומד ב-" + school)
\`\`\`

### למה משתנים כל כך חשובים?

משתנים הם הבסיס של כל תוכנה. בלעדיהם, לא נוכל:
- לזכור מידע
- לעבוד עם נתונים דינמיים
- לבנות תוכנות מורכבות
- ליצור תוכנות אינטראקטיביות

כל תוכנה משתמשת במשתנים - החל ממשחק פשוט ועד לאפליקציות מורכבות!
        `
      },
      {
        id: 'basics-4',
        title: 'סוגי משתנים',
        description: 'מספרים, טקסט ובוליאני - מה ההבדל?',
        type: 'quiz',
        xpReward: 175,
        quizQuestions: [
          {
            id: 'v1',
            question: 'איזה משתנה מכיל מספר שלם?',
            options: ['name = "דני"', 'age = 10', 'is_student = True', 'height = 1.5'],
            correctAnswer: 1,
            explanation: 'מספר שלם (integer) הוא מספר בלי נקודה עשרונית, כמו 10, 5, או 100.'
          },
          {
            id: 'v2',
            question: 'איזה משתנה מכיל טקסט?',
            options: ['count = 5', 'name = "שרה"', 'price = 9.99', 'is_active = False'],
            correctAnswer: 1,
            explanation: 'מחרוזת (string) היא טקסט שצריך להיות בתוך מרכאות, כמו "שרה" או \'hello\'.'
          },
          {
            id: 'v3',
            question: 'מה הערך של משתנה בוליאני?',
            options: ['מספר', 'טקסט', 'True או False', 'רשימה'],
            correctAnswer: 2,
            explanation: 'משתנה בוליאני (boolean) יכול להיות רק True (נכון) או False (לא נכון).'
          },
          {
            id: 'v4',
            question: 'איך נכון ליצור משתנה עם השם "מספר"?',
            options: ['מספר = 5', 'מספר = "5"', 'מספר = True', 'כל התשובות נכונות'],
            correctAnswer: 3,
            explanation: 'אפשר ליצור משתנה עם כל שם (בעברית או באנגלית) ולהקצות לו כל ערך!'
          },
          {
            id: 'v5',
            question: 'מה הסוג של המשתנה: price = 19.99?',
            options: ['int (מספר שלם)', 'float (מספר עשרוני)', 'str (מחרוזת)', 'bool (בוליאני)'],
            correctAnswer: 1,
            explanation: 'מספר עם נקודה עשרונית נקרא float (מספר צף).'
          },
          {
            id: 'v6',
            question: 'מה ידפיס: x = 5; print(type(x))?',
            options: ['5', 'x', '<class \'int\'>', '<class \'str\'>'],
            correctAnswer: 2,
            explanation: 'הפונקציה type() מחזירה את סוג המשתנה. 5 הוא מספר שלם (int).'
          },
          {
            id: 'v7',
            question: 'מה ההבדל בין 5 ל-"5"?',
            options: ['אין הבדל', '5 הוא מספר, "5" הוא טקסט', '"5" גדול יותר', '5 הוא טקסט, "5" הוא מספר'],
            correctAnswer: 1,
            explanation: '5 הוא מספר שאפשר לעשות איתו חישובים, "5" הוא טקסט.'
          },
          {
            id: 'v8',
            question: 'מה יקרה אם נכתוב: result = "5" + 3?',
            options: ['result יהיה 8', 'result יהיה "53"', 'שגיאה - אי אפשר לחבר טקסט ומספר', 'result יהיה "5 + 3"'],
            correctAnswer: 2,
            explanation: 'אי אפשר לחבר מחרוזת ומספר ישירות. צריך להמיר קודם.'
          },
          {
            id: 'v9',
            question: 'איזה שם משתנה לא תקין?',
            options: ['my_name', 'myName', '2names', '_private'],
            correctAnswer: 2,
            explanation: 'שם משתנה לא יכול להתחיל במספר.'
          },
          {
            id: 'v10',
            question: 'מה ידפיס: a = 10; a = 20; print(a)?',
            options: ['10', '20', '10 20', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'משתנה יכול לקבל ערך חדש. הערך האחרון שהוקצה הוא 20.'
          },
          {
            id: 'v11',
            question: 'מה הסוג של: is_raining = False?',
            options: ['int', 'str', 'bool', 'float'],
            correctAnswer: 2,
            explanation: 'True ו-False הם ערכים בוליאניים (bool).'
          },
          {
            id: 'v12',
            question: 'איך ממירים מספר לטקסט?',
            options: ['int()', 'str()', 'text()', 'convert()'],
            correctAnswer: 1,
            explanation: 'הפונקציה str() ממירה כל ערך למחרוזת (טקסט).'
          }
        ]
      },
      {
        id: 'basics-game-2',
        title: 'אתגר: משתנים',
        description: 'השתמשו במשתנים כדי לפתור את האתגר.',
        type: 'game',
        gameLevelId: 4,
        xpReward: 175
      },
      {
        id: 'basics-5',
        title: 'קלט מהמשתמש',
        description: 'איך לקבל מידע מהמשתמש?',
        type: 'text',
        xpReward: 75,
        content: `
# קלט מהמשתמש (Input) ⌨️

## מה זה קלט?

עד עכשיו למדנו איך להדפיס מידע למסך עם \`print()\`.
עכשיו נלמד איך לקבל מידע מהמשתמש - זה נקרא "קלט" (Input).

## הפקודה input()

הפקודה \`input()\` מאפשרת לנו לשאול את המשתמש שאלה ולקבל תשובה.
התחביר הוא: **משתנה = input("השאלה שלך")**

\`\`\`python
name = input("מה השם שלך? ")
print("שלום, " + name + "!")
\`\`\`

### איך זה עובד?

1. המחשב מציג את השאלה למשתמש על המסך
2. המשתמש מקליד תשובה ולוחץ Enter
3. התשובה נשמרת במשתנה (תמיד כטקסט!)

## דוגמאות מעשיות:

### דוגמה 1: שאילת שם

\`\`\`python
name = input("מה השם שלך? ")
print("שלום " + name + ", נעים להכיר!")
\`\`\`

### דוגמה 2: שאילת גיל

\`\`\`python
age = input("כמה אתה בן? ")
print("אתה בן " + age + " שנים")
\`\`\`

### דוגמה 3: שאילת מספר שאלות

\`\`\`python
name = input("מה השם שלך? ")
age = input("כמה אתה בן? ")
city = input("איפה אתה גר? ")

print("היי " + name + "!")
print("אתה בן " + age + " שנים")
print("אתה גר ב-" + city)
\`\`\`

## חשוב לזכור - input תמיד מחזיר טקסט!

כל מה שהמשתמש מקליד נשמר כטקסט (string), גם אם הוא מקליד מספר!

\`\`\`python
age = input("כמה אתה בן? ")
# age הוא טקסט, לא מספר!
# אם המשתמש מקליד "10", זה הטקסט "10" ולא המספר 10
\`\`\`

## המרה למספר

אם אנחנו רוצים לעבוד עם מספרים, צריך להמיר את הטקסט למספר:

### המרה למספר שלם (int):

\`\`\`python
age = input("כמה אתה בן? ")
age_number = int(age)
print("בעוד 5 שנים תהיה בן " + str(age_number + 5))
\`\`\`

### המרה למספר עשרוני (float):

\`\`\`python
height = input("מה הגובה שלך במטרים? ")
height_number = float(height)
print("הגובה שלך הוא " + str(height_number) + " מטרים")
\`\`\`

### דרך קצרה יותר:

\`\`\`python
age = int(input("כמה אתה בן? "))
height = float(input("מה הגובה שלך? "))
\`\`\`

## דוגמה מלאה - מחשבון פשוט:

\`\`\`python
print("מחשבון פשוט")
print("=============")

number1 = int(input("הכנס מספר ראשון: "))
number2 = int(input("הכנס מספר שני: "))

result = number1 + number2
print("התוצאה היא: " + str(result))
\`\`\`

## דוגמאות נוספות עם input

### דוגמה 1: שאלון אישי

\`\`\`python
print("=== שאלון אישי ===")
name = input("מה השם שלך? ")
age = int(input("כמה אתה בן? "))
city = input("איפה אתה גר? ")
hobby = input("מה התחביב שלך? ")

print("\\n=== המידע שלך ===")
print("שם: " + name)
print("גיל: " + str(age))
print("עיר: " + city)
print("תחביב: " + hobby)
\`\`\`

### דוגמה 2: מחשבון מתקדם

\`\`\`python
print("מחשבון מתקדם")
print("==============")

num1 = int(input("הכנס מספר ראשון: "))
num2 = int(input("הכנס מספר שני: "))

print("\\nתוצאות:")
print("חיבור: " + str(num1 + num2))
print("חיסור: " + str(num1 - num2))
print("כפל: " + str(num1 * num2))
print("חילוק: " + str(num1 / num2))
\`\`\`

### דוגמה 3: משחק ניחושים פשוט

\`\`\`python
print("משחק ניחושים!")
secret_number = 7
guess = int(input("נחש איזה מספר אני חושב עליו (1-10): "))

if guess == secret_number:
    print("כל הכבוד! ניחשת נכון!")
else:
    print("לא נכון, נסה שוב!")
\`\`\`

## טיפים חשובים:

1. **הוסיפו רווח בסוף השאלה:** \`input("מה השם שלך? ")\` - הרווח עוזר לקריאות
   זה עושה את הממשק יותר נעים למשתמש!

2. **השתמשו בשאלות ברורות:** שאלו בדיוק מה אתם רוצים לדעת
   "מה השם שלך?" טוב יותר מ-"הכנס שם"

3. **המירו למספרים כשצריך:** זכרו ש-input תמיד מחזיר טקסט
   אם אתם רוצים לעשות חישובים, תמיד המירו ל-int או float!

4. **טפלו בשגיאות:** אם המשתמש מקליד משהו לא נכון, התוכנית עלולה לקרוס
   למדו לזהות מתי המשתמש מקליד משהו לא תקין!

5. **השתמשו בהסברים:** הוסיפו הודעות שמסבירות למשתמש מה לעשות
   "הכנס מספר בין 1 ל-10:" טוב יותר מ-"הכנס מספר"

## מה קורה מאחורי הקulisים?

כשאנחנו משתמשים ב-input(), התוכנית מחכה שהמשתמש יקליד משהו וללחוץ Enter.
רק אחרי שהמשתמש לוחץ Enter, הקוד ממשיך לרוץ!

זה נקרא "בלוקינג" - התוכנית נעצרת ומחכה לקלט מהמשתמש.
זה חשוב להבין כי זה אומר שהתוכנית לא תמשיך עד שהמשתמש יקליד משהו!

## מה הלאה?

בשיעור הבא נלמד על בוחן שמסכם את כל מה שלמדנו במודול הראשון!
אחר כך נתחיל ללמוד על תנאים ולולאות - מושגים חזקים שיאפשרו לנו לבנות תוכנות מורכבות יותר!
        `
      },
      {
        id: 'basics-6',
        title: 'בוחן יסודות מקיף',
        description: 'בואו נבדוק מה למדנו עד עכשיו! בוחן מקיף על כל היסודות.',
        type: 'quiz',
        xpReward: 250,
        quizQuestions: [
          {
            id: 'b1',
            question: 'מה ידפיס הקוד: print("Hello" + "World")?',
            options: ['HelloWorld', 'Hello World', 'Hello+World', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'כשמחברים מחרוזות עם +, הן מתחברות זו לזו בלי רווח.'
          },
          {
            id: 'b2',
            question: 'איך נכון ליצור משתנה עם המספר 42?',
            options: ['number = "42"', 'number = 42', 'number = forty-two', 'שתי התשובות הראשונות נכונות'],
            correctAnswer: 3,
            explanation: 'אפשר ליצור משתנה עם מספר (42) או עם מחרוזת ("42") - זה תלוי במה שאנחנו רוצים לעשות איתו.'
          },
          {
            id: 'b3',
            question: 'מה תעשה הפקודה input("מה השם שלך? ")?',
            options: ['תדפיס שאלה ותמתין לתשובה', 'תדפיס שאלה בלבד', 'תשמור את השם במשתנה', 'תדפיס שאלה ותשמור תשובה במשתנה'],
            correctAnswer: 0,
            explanation: 'input() מציגה את השאלה למשתמש וממתינה שהוא יקליד תשובה וללחוץ Enter.'
          },
          {
            id: 'b4',
            question: 'מה ההבדל בין 5 ל-"5"?',
            options: ['אין הבדל', '5 הוא מספר, "5" הוא טקסט', '"5" הוא מספר, 5 הוא טקסט', '5 גדול יותר'],
            correctAnswer: 1,
            explanation: '5 הוא מספר (integer) שאפשר לעשות איתו חישובים, ו-"5" הוא מחרוזת (string) שזה טקסט.'
          },
          {
            id: 'b5',
            question: 'מה ידפיס: name = "דני"; print("שלום " + name)?',
            options: ['שלום name', 'שלום דני', 'שלום + name', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'המשתנה name מכיל את הערך "דני", והוא מתחבר לטקסט "שלום ".'
          },
          {
            id: 'b6',
            question: 'מה יחזיר input() תמיד?',
            options: ['מספר', 'מחרוזת (טקסט)', 'בוליאני', 'תלוי במה שהמשתמש מקליד'],
            correctAnswer: 1,
            explanation: 'input() תמיד מחזיר מחרוזת, גם אם המשתמש מקליד מספר.'
          },
          {
            id: 'b7',
            question: 'איך ממירים קלט מהמשתמש למספר שלם?',
            options: ['number(input())', 'int(input())', 'input(int())', 'str(input())'],
            correctAnswer: 1,
            explanation: 'int() ממיר מחרוזת למספר שלם. עוטפים את input() ב-int().'
          },
          {
            id: 'b8',
            question: 'מה ידפיס: x = 10; y = 3; print(x + y)?',
            options: ['103', '13', 'x + y', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'x ו-y הם מספרים, אז + מבצע חיבור מתמטי.'
          },
          {
            id: 'b9',
            question: 'מה ידפיס: x = "10"; y = "3"; print(x + y)?',
            options: ['103', '13', 'x + y', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'x ו-y הם מחרוזות, אז + מחבר אותן כטקסט.'
          },
          {
            id: 'b10',
            question: 'איזה שם משתנה תקין?',
            options: ['my-name', 'my name', 'my_name', '123name'],
            correctAnswer: 2,
            explanation: 'שם משתנה יכול להכיל אותיות, מספרים וקו תחתון, אבל לא מקף או רווח.'
          },
          {
            id: 'b11',
            question: 'מה ידפיס: print(5 * 3)?',
            options: ['53', '15', '5 * 3', 'שגיאה'],
            correctAnswer: 1,
            explanation: '* הוא סימן הכפל בפייתון.'
          },
          {
            id: 'b12',
            question: 'מה ידפיס: print(10 / 4)?',
            options: ['2', '2.5', '2.0', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'חילוק רגיל (/) תמיד מחזיר מספר עשרוני.'
          },
          {
            id: 'b13',
            question: 'מה ידפיס: print(10 // 4)?',
            options: ['2', '2.5', '2.0', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'חילוק שלם (//) מחזיר רק את החלק השלם של התוצאה.'
          },
          {
            id: 'b14',
            question: 'מה ידפיס: print(10 % 3)?',
            options: ['3', '1', '0', '3.33'],
            correctAnswer: 1,
            explanation: '% (מודולו) מחזיר את השארית של החילוק. 10 חלקי 3 = 3 עם שארית 1.'
          },
          {
            id: 'b15',
            question: 'מה ידפיס: print(2 ** 3)?',
            options: ['6', '8', '23', 'שגיאה'],
            correctAnswer: 1,
            explanation: '** הוא סימן החזקה. 2 בחזקת 3 = 2×2×2 = 8.'
          }
        ]
      }
    ]
  },
  {
    id: 'control-flow',
    title: 'זרימת תוכנית',
    description: 'למדו איך לקבל החלטות ולחזור על פעולות באמצעות לולאות ותנאים.',
    lessons: [
      {
        id: 'conditions-1',
        title: 'תנאים - if',
        description: 'איך לקבל החלטות בקוד?',
        type: 'text',
        xpReward: 75,
        content: `
# תנאים (Conditions) 🤔

תנאים מאפשרים למחשב לקבל החלטות! כמו שאנחנו מחליטים מה לעשות לפי המצב, גם המחשב יכול.

דמיינו שאתם עומדים לפני דלת. אם יש לכם מפתח - אתם נכנסים. אם אין - אתם מחפשים דרך אחרת.
זה בדיוק איך תנאים עובדים בתכנות! המחשב בודק אם משהו נכון, ואז מחליט מה לעשות.

## למה תנאים כל כך חשובים?

בלי תנאים, המחשב היה עושה את אותו דבר תמיד - כמו רובוט שמבצע רק פקודה אחת!
עם תנאים, המחשב יכול להיות חכם ולהתאים את ההתנהגות שלו למצב.

## הפקודה if - הבסיס

הפקודה \`if\` אומרת למחשב: "אם משהו נכון, תעשה משהו".
התחביר הוא: **if תנאי:**

\`\`\`python
age = 10
if age >= 10:
    print("אתה גדול מספיק!")
\`\`\`

### איך זה עובד?

1. המחשב בודק אם התנאי נכון (age >= 10)
2. אם כן - הוא מריץ את הקוד שבתוך ה-if (הקוד שמוזח פנימה)
3. אם לא - הוא מדלג על הקוד וממשיך הלאה

### חשוב לזכור - הזחה (Indentation)!

בפייתון, הזחה (רווחים או טאבים בתחילת השורה) היא קריטית!
הקוד שבתוך ה-if חייב להיות מוזח פנימה. זה אומר למחשב: "זה הקוד שירוץ אם התנאי נכון".

\`\`\`python
age = 10
if age >= 10:
    print("זה יודפס אם התנאי נכון")  # מוזח פנימה
    print("גם זה יודפס")  # גם מוזח פנימה
print("זה יודפס תמיד")  # לא מוזח - יודפס תמיד!
\`\`\`

## מפעילי השוואה (Comparison Operators)

פייתון מספקת לנו כמה דרכים להשוות בין ערכים:

- \`==\` - שווה ל- (שימו לב: שני סימני שוויון!)
  \`\`\`python
  if 5 == 5:  # נכון
      print("זה נכון!")
  \`\`\`

- \`!=\` - לא שווה ל-
  \`\`\`python
  if 5 != 3:  # נכון
      print("5 לא שווה ל-3")
  \`\`\`

- \`>\` - גדול מ-
  \`\`\`python
  if 10 > 5:  # נכון
      print("10 גדול מ-5")
  \`\`\`

- \`<\` - קטן מ-
  \`\`\`python
  if 3 < 7:  # נכון
      print("3 קטן מ-7")
  \`\`\`

- \`>=\` - גדול או שווה ל-
  \`\`\`python
  if 5 >= 5:  # נכון (גדול או שווה)
  if 6 >= 5:  # נכון (גדול)
  \`\`\`

- \`<=\` - קטן או שווה ל-
  \`\`\`python
  if 5 <= 5:  # נכון (קטן או שווה)
  if 4 <= 5:  # נכון (קטן)
  \`\`\`

### ⚠️ טעות נפוצה!

שימו לב להבדל בין \`=\` ל-\`==\`:
- \`=\` - משמש להקצאת ערך למשתנה (assignment)
- \`==\` - משמש להשוואה (comparison)

\`\`\`python
age = 10      # מקצה את הערך 10 למשתנה age
if age == 10: # בודק אם age שווה ל-10
    print("נכון!")
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: בדיקת גיל

\`\`\`python
age = int(input("כמה אתה בן? "))

if age >= 18:
    print("אתה מבוגר מספיק!")
else:
    print("אתה עדיין צעיר!")
\`\`\`

### דוגמה 2: בדיקת ציון

\`\`\`python
score = int(input("מה הציון שלך? "))

if score >= 90:
    print("מצוין! כל הכבוד!")
elif score >= 70:
    print("טוב מאוד!")
elif score >= 60:
    print("עובר")
else:
    print("צריך להשתפר")
\`\`\`

### דוגמה 3: בדיקת שוויון

\`\`\`python
password = input("הכנס סיסמה: ")

if password == "סוד123":
    print("נכנסת בהצלחה!")
else:
    print("סיסמה שגויה!")
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
distance = 5

if distance > 3:
    move_right(3)
    print("זזתי כי המרחק גדול מ-3")
else:
    print("המרחק קטן מדי, לא זזתי")
\`\`\`

## תנאים עם מחרוזות

אפשר גם להשוות מחרוזות (טקסט):

\`\`\`python
name = input("מה השם שלך? ")

if name == "דני":
    print("היי דני! איך אתה?")
elif name == "שרה":
    print("שלום שרה! נעים להכיר!")
else:
    print(f"שלום {name}!")
\`\`\`

## תנאים עם משתנים בוליאניים

משתנים בוליאניים (True/False) עובדים מצוין עם תנאים:

\`\`\`python
is_raining = True
has_umbrella = False

if is_raining:
    if has_umbrella:
        print("יוצאים עם מטריה!")
    else:
        print("נשארים בבית!")
else:
    print("יוצאים החוצה!")
\`\`\`

## טיפים חשובים

1. **תמיד בדקו את ההזחה** - קוד שבתוך if חייב להיות מוזח פנימה
2. **השתמשו ב-== להשוואה** - לא ב-= (זה להקצאה)
3. **בדקו את התנאי** - וודאו שהתנאי שלכם הגיוני
4. **השתמשו בשמות משתנים ברורים** - זה עוזר להבין את הקוד
5. **תמיד חשבו על המקרה שבו התנאי לא נכון** - מה יקרה אז?

## מה הלאה?

בשיעור הבא נלמד על \`elif\` ו-\`else\` - איך לבדוק כמה תנאים ולטפל במקרה שבו אף תנאי לא נכון.
נלמד גם איך לשלב תנאים מורכבים עם \`and\`, \`or\` ו-\`not\`!
        `
      },
      {
        id: 'conditions-2',
        title: 'תנאים מורכבים',
        description: 'elif, else ותנאים משולבים',
        type: 'quiz',
        xpReward: 200,
        quizQuestions: [
          {
            id: 'c1',
            question: 'מה תעשה הפקודה: if age > 10: print("גדול") else: print("קטן")?',
            options: ['תדפיס "גדול" תמיד', 'תדפיס "גדול" אם age > 10, אחרת "קטן"', 'תדפיס "קטן" תמיד', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'else אומר "אחרת" - אם התנאי לא נכון, הקוד של else ירוץ.'
          },
          {
            id: 'c2',
            question: 'מה ההבדל בין if-elif-else?',
            options: ['אין הבדל', 'if בודק תנאי ראשון, elif תנאים נוספים, else אם אף אחד לא נכון', 'elif זה קיצור של else if', 'שתי התשובות האחרונות נכונות'],
            correctAnswer: 3,
            explanation: 'elif (קיצור של else if) מאפשר לבדוק תנאים נוספים אחרי if, ו-else רץ אם אף תנאי לא נכון.'
          },
          {
            id: 'c3',
            question: 'מה ידפיס הקוד: if 5 > 3: print("A") elif 5 > 4: print("B") else: print("C")?',
            options: ['A', 'B', 'C', 'A ו-B'],
            correctAnswer: 0,
            explanation: 'רק הקוד של התנאי הראשון שנכון ירוץ. כאן 5 > 3 נכון, אז רק A יודפס.'
          },
          {
            id: 'c4',
            question: 'מה ההבדל בין = ל-==?',
            options: ['אין הבדל', '= להשוואה, == להקצאה', '= להקצאה, == להשוואה', 'שניהם להשוואה'],
            correctAnswer: 2,
            explanation: '= משמש להקצאת ערך למשתנה, == משמש להשוואה בין ערכים.'
          },
          {
            id: 'c5',
            question: 'מה יחזיר הביטוי: 5 != 3?',
            options: ['True', 'False', '2', 'שגיאה'],
            correctAnswer: 0,
            explanation: '!= פירושו "לא שווה". 5 אכן לא שווה ל-3, אז התוצאה היא True.'
          },
          {
            id: 'c6',
            question: 'מה יחזיר: 10 >= 10?',
            options: ['True', 'False', '10', '0'],
            correctAnswer: 0,
            explanation: '>= פירושו "גדול או שווה". 10 שווה ל-10, אז התוצאה היא True.'
          },
          {
            id: 'c7',
            question: 'מה ידפיס: x = 5; if x: print("yes")?',
            options: ['yes', 'לא ידפיס כלום', 'שגיאה', '5'],
            correctAnswer: 0,
            explanation: 'בפייתון, כל מספר שונה מ-0 נחשב ל-True בתנאי.'
          },
          {
            id: 'c8',
            question: 'מה ידפיס: x = 0; if x: print("yes") else: print("no")?',
            options: ['yes', 'no', 'שגיאה', '0'],
            correctAnswer: 1,
            explanation: 'המספר 0 נחשב ל-False בפייתון.'
          },
          {
            id: 'c9',
            question: 'מה ידפיס: if "": print("yes") else: print("no")?',
            options: ['yes', 'no', 'שגיאה', '""'],
            correctAnswer: 1,
            explanation: 'מחרוזת ריקה "" נחשבת ל-False בפייתון.'
          },
          {
            id: 'c10',
            question: 'כמה תנאי elif אפשר לשים אחרי if?',
            options: ['אחד בלבד', 'שניים בלבד', 'כמה שרוצים', 'אף אחד'],
            correctAnswer: 2,
            explanation: 'אפשר לשים כמה תנאי elif שרוצים אחרי if.'
          },
          {
            id: 'c11',
            question: 'האם חייבים else אחרי if?',
            options: ['כן, תמיד', 'לא, זה אופציונלי', 'רק אם יש elif', 'רק אם התנאי מורכב'],
            correctAnswer: 1,
            explanation: 'else הוא אופציונלי. אפשר להשתמש ב-if בלי else.'
          },
          {
            id: 'c12',
            question: 'מה יקרה אם נשכח את ה-: אחרי if?',
            options: ['הקוד ירוץ רגיל', 'שגיאת תחביר', 'התנאי יהיה תמיד False', 'התנאי יהיה תמיד True'],
            correctAnswer: 1,
            explanation: 'הנקודתיים : חובה אחרי if, elif ו-else. בלעדיהן תהיה שגיאה.'
          }
        ]
      },
      {
        id: 'conditions-game',
        title: 'אתגר: תנאים',
        description: 'השתמשו בתנאים כדי לפתור את האתגר.',
        type: 'game',
        gameLevelId: 5,
        xpReward: 200
      },
      {
        id: 'loops-1',
        title: 'לולאות For',
        description: 'למה לכתוב את אותו קוד פעמיים?',
        type: 'text',
        xpReward: 75,
        content: `
# לולאות For 🔄

מתכנתים הם אנשים עצלנים (במובן הטוב!). הם לא אוהבים לחזור על עצמם.
דמיינו שאתם צריכים לכתוב את אותו דבר 100 פעמים - זה משעמם ומעייף!
במקום זה, אנחנו יכולים להשתמש בלולאה שתעשה את זה עבורנו.

## למה אנחנו צריכים לולאות?

בלי לולאות, אם היינו רוצים שהרובר יזוז 10 צעדים ימינה, היינו צריכים לכתוב:
\`\`\`python
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
\`\`\`

זה ארוך, משעמם וקשה לתחזוקה! מה אם נרצה לשנות ל-20 צעדים?

עם לולאה, זה פשוט:
\`\`\`python
for i in range(10):
    move_right()
\`\`\`

זה אומר למחשב: "תעשה את הפעולה הזו 10 פעמים".

## איך לולאת for עובדת?

לולאת \`for\` עוברת על סדרה של ערכים ומריצה את הקוד שבתוכה עבור כל ערך.

התחביר הבסיסי:
\`\`\`python
for משתנה in סדרה:
    # הקוד שירוץ עבור כל ערך
\`\`\`

### דוגמה פשוטה:

\`\`\`python
for number in range(5):
    print(number)
\`\`\`

זה ידפיס:
\`
0
1
2
3
4
\`

## איך range() עובד?

הפונקציה \`range()\` יוצרת סדרה של מספרים. יש לה כמה צורות:

### 1. range(סוף) - מ-0 עד סוף (לא כולל)

\`\`\`python
for i in range(5):
    print(i)
# ידפיס: 0, 1, 2, 3, 4
\`\`\`

**חשוב:** range(5) יוצר 5 מספרים: 0, 1, 2, 3, 4 (לא כולל 5!)

### 2. range(התחלה, סוף) - מ-התחלה עד סוף (לא כולל)

\`\`\`python
for i in range(2, 6):
    print(i)
# ידפיס: 2, 3, 4, 5
\`\`\`

### 3. range(התחלה, סוף, קפיצה) - בקפיצות

\`\`\`python
for i in range(0, 10, 2):
    print(i)
# ידפיס: 0, 2, 4, 6, 8 (קפיצות של 2)
\`\`\`

\`\`\`python
for i in range(10, 0, -1):
    print(i)
# ידפיס: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 (ספירה לאחור)
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: ספירה

\`\`\`python
print("ספירה עד 10:")
for i in range(1, 11):
    print(i)
\`\`\`

### דוגמה 2: חישוב סכום

\`\`\`python
sum = 0
for i in range(1, 6):
    sum = sum + i
    print(f"סכום עד {i}: {sum}")
\`\`\`

### דוגמה 3: הדפסת טבלת כפל

\`\`\`python
number = 5
print(f"טבלת הכפל של {number}:")
for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")
\`\`\`

## לולאות עם רשימות

אפשר גם לעבור על רשימות (לא רק מספרים):

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]

for fruit in fruits:
    print(f"אני אוהב {fruit}")
\`\`\`

זה ידפיס:
\`
אני אוהב תפוח
אני אוהב בננה
אני אוהב תפוז
\`

### דוגמה עם enumerate:

אם אנחנו רוצים גם את המיקום וגם את הערך:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]

for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")
\`\`\`

זה ידפיס:
\`
1. תפוח
2. בננה
3. תפוז
\`

## דוגמה עם הרובר:

\`\`\`python
# זוז 5 צעדים ימינה
for step in range(5):
    move_right()
    print(f"זזתי צעד מספר {step + 1}")
\`\`\`

### דוגמה מורכבת יותר:

\`\`\`python
# צור דפוס של ריבוע
for i in range(4):
    move_right()
    move_down()
    move_left()
    move_up()
    print(f"סיימתי סיבוב {i + 1}")
\`\`\`

## שימוש במשתנה הלולאה

המשתנה בלולאה (כמו \`i\` או \`step\`) יכול לשמש בתוך הלולאה:

\`\`\`python
for i in range(5):
    print(f"זה סיבוב מספר {i}")
    if i == 2:
        print("  הגענו למספר 2!")
\`\`\`

## לולאות מקוננות (נדון בהן בהרחבה בשיעור אחר)

אפשר לשים לולאה בתוך לולאה:

\`\`\`python
for i in range(3):
    print(f"שורה {i + 1}:")
    for j in range(3):
        print(f"  עמודה {j + 1}")
\`\`\`

## טיפים חשובים

1. **הזחה נכונה** - הקוד שבתוך הלולאה חייב להיות מוזח פנימה
2. **שם משתנה ברור** - השתמשו בשמות כמו \`i\`, \`j\`, \`step\`, \`item\` וכו'
3. **range לא כולל את המספר האחרון** - range(5) זה 0-4, לא 0-5!
4. **השתמשו בלולאות כשאתם יודעים כמה פעמים** - אם לא יודעים, השתמשו ב-while
5. **חשבו על מה שאתם רוצים לעשות** - לפעמים לולאה פשוטה יותר טובה מלולאה מורכבת

## מתי להשתמש ב-for?

- כשאתם יודעים כמה פעמים צריך לחזור
- כשאתם רוצים לעבור על רשימה או סדרה
- כשאתם רוצים לספור או לחזור מספר מסוים של פעמים

## מה הלאה?

בשיעור הבא נלמד על לולאות \`while\` - לולאות שממשיכות כל עוד תנאי מסוים נכון.
זה שימושי כשאנחנו לא יודעים מראש כמה פעמים צריך לחזור!
        `
      },
      {
        id: 'loops-2',
        title: 'לולאות While',
        description: 'לולאות עם תנאי עצירה',
        type: 'text',
        xpReward: 75,
        content: `
# לולאות While 🔁

לולאת \`while\` ממשיכה לרוץ כל עוד תנאי מסוים נכון!
זה כמו לומר: "כל עוד משהו נכון, תמשיך לעשות את זה".

## ההבדל בין for ל-while

- **for** - משתמשים כשאנחנו יודעים כמה פעמים צריך לחזור
- **while** - משתמשים כשאנחנו לא יודעים כמה פעמים, אבל יודעים מתי לעצור

## איך זה עובד?

התחביר הבסיסי:
\`\`\`python
while תנאי:
    # הקוד שירוץ כל עוד התנאי נכון
\`\`\`

### דוגמה פשוטה:

\`\`\`python
count = 0
while count < 5:
    print("ספירה:", count)
    count = count + 1
\`\`\`

זה ידפיס:
\`
ספירה: 0
ספירה: 1
ספירה: 2
ספירה: 3
ספירה: 4
\`

### איך זה עובד שלב אחר שלב:

1. המחשב בודק: האם count < 5? (0 < 5 = כן)
2. מריץ את הקוד שבתוך הלולאה
3. מעדכן את count ל-1
4. חוזר לבדוק: האם count < 5? (1 < 5 = כן)
5. ממשיך...
6. כש-count מגיע ל-5, התנאי כבר לא נכון (5 < 5 = לא), והלולאה נעצרת

## מתי להשתמש ב-while?

### 1. כשאנחנו לא יודעים כמה פעמים צריך לחזור

\`\`\`python
# המשתמש ממשיך להזין מספרים עד שהוא מזין 0
number = int(input("הכנס מספר (0 לעצירה): "))
while number != 0:
    print(f"הזנת: {number}")
    number = int(input("הכנס מספר (0 לעצירה): "))
print("סיימת!")
\`\`\`

### 2. כשאנחנו מחכים למשהו לקרות

\`\`\`python
# מחכים שהמשתמש יזין את הסיסמה הנכונה
password = ""
while password != "סוד123":
    password = input("הכנס סיסמה: ")
    if password != "סוד123":
        print("סיסמה שגויה, נסה שוב!")
print("נכנסת בהצלחה!")
\`\`\`

### 3. כשאנחנו רוצים לעצור לפי תנאי מורכב

\`\`\`python
# ממשיכים לשאול שאלות עד שהמשתמש עונה "כן"
answer = ""
while answer.lower() != "כן":
    answer = input("האם אתה מוכן להתחיל? (כן/לא): ")
print("מצוין! בואו נתחיל!")
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
distance = 0
while distance < 10:
    move_right()
    distance = distance + 1
    print(f"המרחק הוא: {distance}")
print("הגעתי ליעד!")
\`\`\`

### דוגמה מורכבת יותר:

\`\`\`python
# הרובר ממשיך לזוז עד שהוא מגיע למטרה
has_reached_goal = False
steps = 0

while not has_reached_goal:
    move_right()
    steps = steps + 1
    
    # נניח שיש לנו פונקציה שבודקת אם הגענו
    if check_if_at_goal():
        has_reached_goal = True
        print(f"הגעתי ליעד אחרי {steps} צעדים!")
\`\`\`

## לולאות while עם break

אפשר להשתמש ב-\`break\` כדי לצאת מהלולאה מיד:

\`\`\`python
while True:  # לולאה אינסופית לכאורה
    number = int(input("הכנס מספר (0 לעצירה): "))
    if number == 0:
        break  # יוצא מהלולאה מיד
    print(f"הזנת: {number}")
print("סיימת!")
\`\`\`

## לולאות while עם continue

אפשר להשתמש ב-\`continue\` כדי לדלג על שאר הקוד ולחזור לבדיקת התנאי:

\`\`\`python
count = 0
while count < 10:
    count = count + 1
    if count % 2 == 0:  # אם המספר זוגי
        continue  # דלג על שאר הקוד
    print(count)  # ידפיס רק מספרים אי-זוגיים
\`\`\`

## ⚠️ זהירות! לולאות אינסופיות

אם התנאי תמיד נכון, הלולאה תרוץ לנצח! זה נקרא "לולאה אינסופית".

### דוגמה ללולאה אינסופית (לא להריץ!):

\`\`\`python
# ⚠️ זה לא יעצור לעולם!
count = 0
while count < 5:
    print(count)
    # שכחנו לעדכן את count!
    # הלולאה תרוץ לנצח!
\`\`\`

### איך למנוע לולאות אינסופיות:

1. **תמיד וודאו שהתנאי ישתנה** - עדכנו משתנים שבתוך התנאי
2. **השתמשו ב-break** - אם יש דרך לצאת מהלולאה
3. **בדקו את הלוגיקה** - וודאו שהתנאי יכול להיות False בסוף
4. **השתמשו במונה** - אם צריך, הוסיפו מונה שמגביל את מספר החזרות

### דוגמה בטוחה:

\`\`\`python
count = 0
max_iterations = 100  # הגבלה למקרה של בעיה

while count < 5 and count < max_iterations:
    print(count)
    count = count + 1  # תמיד מעדכנים את count!
\`\`\`

## השוואה: for vs while

### for - כשאנחנו יודעים כמה פעמים:

\`\`\`python
# אנחנו יודעים: 10 פעמים
for i in range(10):
    print(i)
\`\`\`

### while - כשאנחנו לא יודעים כמה פעמים:

\`\`\`python
# אנחנו לא יודעים כמה פעמים, אבל יודעים מתי לעצור
number = int(input("הכנס מספר: "))
while number != 0:
    print(number)
    number = int(input("הכנס מספר: "))
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: משחק ניחושים

\`\`\`python
secret_number = 7
guess = 0
attempts = 0

while guess != secret_number:
    guess = int(input("נחש את המספר (1-10): "))
    attempts = attempts + 1
    
    if guess < secret_number:
        print("המספר גדול יותר!")
    elif guess > secret_number:
        print("המספר קטן יותר!")

print(f"כל הכבוד! ניחשת נכון אחרי {attempts} ניסיונות!")
\`\`\`

### דוגמה 2: מחשבון פשוט

\`\`\`python
print("מחשבון פשוט (הקלד 'סגור' כדי לסיים)")
while True:
    operation = input("מה הפעולה? (+, -, *, /, סגור): ")
    
    if operation == "סגור":
        break
    
    num1 = int(input("מספר ראשון: "))
    num2 = int(input("מספר שני: "))
    
    if operation == "+":
        print(f"תוצאה: {num1 + num2}")
    elif operation == "-":
        print(f"תוצאה: {num1 - num2}")
    elif operation == "*":
        print(f"תוצאה: {num1 * num2}")
    elif operation == "/":
        print(f"תוצאה: {num1 / num2}")
\`\`\`

## טיפים חשובים

1. **תמיד עדכנו את המשתנה בתנאי** - אחרת תקבלו לולאה אינסופית
2. **השתמשו ב-break כשצריך** - זה יכול להפוך את הקוד לפשוט יותר
3. **בדקו את התנאי** - וודאו שהוא יכול להיות False
4. **השתמשו במונה הגבלה** - למקרה של בעיות לא צפויות
5. **העדיפו for כשאפשר** - for בדרך כלל פשוט יותר וברור יותר

## מה הלאה?

בשיעור הבא נלמד על לולאות מקוננות - לולאות בתוך לולאות!
זה מאפשר לנו לעשות דברים מורכבים יותר, כמו לעבור על טבלאות או ליצור דפוסים.
        `
      },
      {
        id: 'loops-quiz',
        title: 'בוחן לולאות מקיף',
        description: 'נראה אם הבנתם את העקרון - בוחן מקיף על לולאות',
        type: 'quiz',
        xpReward: 200,
        quizQuestions: [
          {
            id: 'l1',
            question: 'מה תעשה הפקודה range(5)?',
            options: ['תייצר מספרים מ-1 עד 5', 'תייצר מספרים מ-0 עד 4', 'תייצר מספרים מ-0 עד 5', 'תייצר 5 פעמים את המספר 1'],
            correctAnswer: 1,
            explanation: 'הפונקציה range(n) מייצרת סדרה של n מספרים, המתחילה ב-0.'
          },
          {
            id: 'l2',
            question: 'מה ההבדל בין for ל-while?',
            options: ['אין הבדל', 'for יודע כמה פעמים לרוץ, while בודק תנאי', 'while רק עם מספרים', 'for רק עם רשימות'],
            correctAnswer: 1,
            explanation: 'for משמש כשאנחנו יודעים כמה פעמים לרוץ, while כשאנחנו רוצים לעצור לפי תנאי.'
          },
          {
            id: 'l3',
            question: 'מה יקרה בקוד: while True: print("hello")?',
            options: ['ידפיס hello פעם אחת', 'ידפיס hello 5 פעמים', 'ידפיס hello לנצח', 'שגיאה'],
            correctAnswer: 2,
            explanation: 'True תמיד נכון, אז הלולאה תרוץ לנצח - זו לולאה אינסופית!'
          },
          {
            id: 'l4',
            question: 'מה ידפיס: for i in range(3): print(i)?',
            options: ['1 2 3', '0 1 2', '0 1 2 3', '1 2'],
            correctAnswer: 1,
            explanation: 'range(3) מייצר 0, 1, 2 - שלושה מספרים שמתחילים מ-0.'
          },
          {
            id: 'l5',
            question: 'מה ידפיס: for i in range(2, 5): print(i)?',
            options: ['2 3 4', '2 3 4 5', '0 1 2 3 4', '2 5'],
            correctAnswer: 0,
            explanation: 'range(2, 5) מייצר מספרים מ-2 עד 5 (לא כולל 5).'
          },
          {
            id: 'l6',
            question: 'מה ידפיס: for i in range(0, 10, 2): print(i)?',
            options: ['0 2 4 6 8', '0 2 4 6 8 10', '2 4 6 8 10', '0 1 2 3 4'],
            correctAnswer: 0,
            explanation: 'הפרמטר השלישי (2) הוא הקפיצה. מתחילים מ-0 ומדלגים 2 כל פעם.'
          },
          {
            id: 'l7',
            question: 'כמה פעמים תרוץ הלולאה: for i in range(10): print(i)?',
            options: ['9 פעמים', '10 פעמים', '11 פעמים', 'פעם אחת'],
            correctAnswer: 1,
            explanation: 'range(10) מייצר 10 מספרים (0-9), אז הלולאה תרוץ 10 פעמים.'
          },
          {
            id: 'l8',
            question: 'מה עושה break בתוך לולאה?',
            options: ['שובר את המחשב', 'יוצא מהלולאה מיד', 'מדלג לסיבוב הבא', 'מפסיק את התוכנית'],
            correctAnswer: 1,
            explanation: 'break עוצר את הלולאה מיד ויוצא ממנה.'
          },
          {
            id: 'l9',
            question: 'מה עושה continue בתוך לולאה?',
            options: ['ממשיך כרגיל', 'יוצא מהלולאה', 'מדלג לסיבוב הבא', 'מתחיל מההתחלה'],
            correctAnswer: 2,
            explanation: 'continue מדלג על שאר הקוד בסיבוב הנוכחי ועובר לסיבוב הבא.'
          },
          {
            id: 'l10',
            question: 'מה ידפיס: x = 0; while x < 3: print(x); x += 1?',
            options: ['0 1 2', '0 1 2 3', '1 2 3', 'לולאה אינסופית'],
            correctAnswer: 0,
            explanation: 'הלולאה רצה כל עוד x < 3. מדפיסים 0, 1, 2 ואז x מגיע ל-3 והלולאה נעצרת.'
          },
          {
            id: 'l11',
            question: 'מה יקרה אם נשכח לעדכן את המשתנה בלולאת while?',
            options: ['הלולאה תרוץ פעם אחת', 'לולאה אינסופית', 'שגיאה', 'הלולאה לא תרוץ'],
            correctAnswer: 1,
            explanation: 'אם התנאי תמיד נכון (כי המשתנה לא משתנה), נקבל לולאה אינסופית.'
          },
          {
            id: 'l12',
            question: 'מה ידפיס: for letter in "ABC": print(letter)?',
            options: ['ABC', 'A B C', 'A\\nB\\nC', '[A, B, C]'],
            correctAnswer: 2,
            explanation: 'אפשר לעבור על מחרוזת עם for. כל אות מודפסת בשורה נפרדת.'
          }
        ]
      },
      {
        id: 'loops-game',
        title: 'אתגר הלולאות',
        description: 'השתמשו בלולאות כדי לפתור את השלב ביעילות.',
        type: 'game',
        gameLevelId: 3,
        xpReward: 200
      },
      {
        id: 'loops-3',
        title: 'לולאות מקוננות',
        description: 'לולאות בתוך לולאות',
        type: 'text',
        xpReward: 100,
        content: `
# לולאות מקוננות (Nested Loops) 🔄🔄

לולאה מקוננת היא לולאה בתוך לולאה! זה מאפשר לנו לעשות דברים מורכבים יותר.

## דוגמה פשוטה:

\`\`\`python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")
\`\`\`

זה ידפיס:
- i=0, j=0
- i=0, j=1
- i=1, j=0
- i=1, j=1
- i=2, j=0
- i=2, j=1

## דוגמה עם הרובר:

\`\`\`python
# זוז 3 שורות, בכל שורה זוז 2 צעדים ימינה
for row in range(3):
    move_down()
    for col in range(2):
        move_right()
\`\`\`

## מתי להשתמש?

- כשצריך לעבור על טבלה (שורות ועמודות)
- כשצריך לחזור על משהו כמה פעמים, וכל פעם לעשות משהו נוסף
- כשצריך ליצור דפוסים מורכבים

## ⚠️ זהירות!

לולאות מקוננות יכולות להיות איטיות אם יש הרבה חזרות!
        `
      },
      {
        id: 'loops-game-2',
        title: 'אתגר מתקדם: לולאות',
        description: 'השתמשו בלולאות מקוננות כדי לפתור את האתגר המורכב.',
        type: 'game',
        gameLevelId: 6,
        xpReward: 250
      }
    ]
  },
  {
    id: 'lists-data',
    title: 'רשימות ונתונים',
    description: 'למדו איך לשמור הרבה נתונים במשתנה אחד באמצעות רשימות ומילונים.',
    lessons: [
      {
        id: 'lists-1',
        title: 'מה זה רשימה?',
        description: 'הכרות עם רשימות (Lists)',
        type: 'text',
        xpReward: 100,
        content: `
# רשימות (Lists) 📝

רשימה היא משתנה מיוחד שיכול להחזיק הרבה ערכים! דמיינו רשימת קניות בסופר - יש בה כמה פריטים, ואפשר להוסיף, להסיר ולשנות אותם.

## למה אנחנו צריכים רשימות?

בלי רשימות, אם היינו רוצים לשמור כמה שמות, היינו צריכים ליצור משתנה נפרד לכל שם:
\`\`\`python
name1 = "דני"
name2 = "שרה"
name3 = "יוסי"
name4 = "מיכל"
# וכך הלאה...
\`\`\`

זה מסורבל! עם רשימה, זה פשוט:
\`\`\`python
names = ["דני", "שרה", "יוסי", "מיכל"]
\`\`\`

## איך יוצרים רשימה?

משתמשים בסוגריים מרובעים \`[]\` ומפרידים בין הערכים בפסיקים:

\`\`\`python
# רשימה של מספרים
numbers = [1, 2, 3, 4, 5]

# רשימה של מחרוזות (טקסט)
fruits = ["תפוח", "בננה", "תפוז"]

# רשימה מעורבת (מספרים, טקסט, בוליאני)
mixed = [1, "שלום", True, 3.14]

# רשימה ריקה
empty_list = []
\`\`\`

## גישה לפריטים - אינדקסים

אפשר לגשת לכל פריט ברשימה לפי המיקום שלו (אינדקס).
**חשוב מאוד:** הספירה מתחילה מ-0, לא מ-1!

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
print(fruits[0])  # ידפיס: תפוח (הפריט הראשון)
print(fruits[1])  # ידפיס: בננה (הפריט השני)
print(fruits[2])  # ידפיס: תפוז (הפריט השלישי)
\`\`\`

### למה מתחילים מ-0?

זה נראה מוזר בהתחלה, אבל יש לזה סיבה טובה! המחשב חושב על המיקום כעל "כמה צעדים צריך לעשות מההתחלה".
- 0 צעדים = הפריט הראשון
- 1 צעד = הפריט השני
- 2 צעדים = הפריט השלישי

### גישה מהסוף

אפשר גם לגשת לפריטים מהסוף עם מספרים שליליים:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
print(fruits[-1])  # ידפיס: תפוז (האחרון)
print(fruits[-2])  # ידפיס: בננה (לפני האחרון)
print(fruits[-3])  # ידפיס: תפוח (הראשון מהסוף)
\`\`\`

## שינוי פריטים ברשימה

רשימות הן "משתנות" (mutable) - אפשר לשנות אותן:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
fruits[1] = "אבטיח"  # משנה את הפריט השני
print(fruits)  # ["תפוח", "אבטיח", "תפוז"]
\`\`\`

## הוספת פריטים

### append() - הוספה לסוף

\`\`\`python
fruits = ["תפוח", "בננה"]
fruits.append("תפוז")  # מוסיף לסוף
print(fruits)  # ["תפוח", "בננה", "תפוז"]
\`\`\`

### insert() - הוספה במיקום מסוים

\`\`\`python
fruits = ["תפוח", "תפוז"]
fruits.insert(1, "בננה")  # מוסיף במיקום 1
print(fruits)  # ["תפוח", "בננה", "תפוז"]
\`\`\`

## הסרת פריטים

### remove() - הסרה לפי ערך

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
fruits.remove("בננה")  # מסיר את "בננה"
print(fruits)  # ["תפוח", "תפוז"]
\`\`\`

### pop() - הסרה לפי אינדקס

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
removed = fruits.pop(1)  # מסיר את הפריט במיקום 1
print(removed)  # "בננה"
print(fruits)  # ["תפוח", "תפוז"]
\`\`\`

## אורך הרשימה

הפונקציה \`len()\` מחזירה את מספר הפריטים ברשימה:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
print(len(fruits))  # ידפיס: 3
\`\`\`

## חיתוך רשימות (Slicing)

אפשר לקחת חלק מהרשימה:

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])  # [1, 2, 3] (מ-1 עד 4 לא כולל)
print(numbers[:3])   # [0, 1, 2] (מההתחלה עד 3)
print(numbers[3:])   # [3, 4, 5] (מ-3 עד הסוף)
\`\`\`

## מעבר על רשימה עם לולאה

### עם for:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]

for fruit in fruits:
    print(f"אני אוהב {fruit}")
\`\`\`

### עם אינדקס:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]

for i in range(len(fruits)):
    print(f"{i + 1}. {fruits[i]}")
\`\`\`

### עם enumerate:

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]

for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")
\`\`\`

## חיפוש ברשימה

### in - בדיקה אם פריט קיים

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
if "תפוח" in fruits:
    print("יש תפוח ברשימה!")
\`\`\`

### index() - מציאת מיקום

\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
position = fruits.index("בננה")
print(f"בננה נמצאת במיקום {position}")  # 1
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: רשימת ציונים

\`\`\`python
scores = [85, 92, 78, 96, 88]
total = 0

for score in scores:
    total = total + score

average = total / len(scores)
print(f"הממוצע הוא: {average}")
\`\`\`

### דוגמה 2: רשימת משימות

\`\`\`python
tasks = ["לשטוף כלים", "לעשות שיעורים", "לשחק"]

print("רשימת המשימות שלי:")
for i, task in enumerate(tasks, 1):
    print(f"{i}. {task}")

# הוספת משימה חדשה
tasks.append("לקרוא ספר")
print(f"\\nהוספתי משימה! עכשיו יש {len(tasks)} משימות")
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
# רשימה של כיוונים
path = ["right", "right", "up", "right", "down"]

# מעבר על הרשימה עם לולאה
for direction in path:
    if direction == "right":
        move_right()
    elif direction == "left":
        move_left()
    elif direction == "up":
        move_up()
    elif direction == "down":
        move_down()
    print(f"זזתי {direction}")
\`\`\`

### דוגמה מורכבת יותר:

\`\`\`python
# רשימה של מספרי צעדים לכל כיוון
steps = [3, 2, 1, 4]

# הרובר זז לפי הרשימה
for i, num_steps in enumerate(steps):
    if i % 2 == 0:  # זוגי - ימינה
        for _ in range(num_steps):
            move_right()
    else:  # אי-זוגי - למעלה
        for _ in range(num_steps):
            move_up()
\`\`\`

## רשימות מקוננות

אפשר לשים רשימות בתוך רשימות:

\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0][1])  # 2 (שורה 0, עמודה 1)
\`\`\`

## טיפים חשובים

1. **אינדקסים מתחילים מ-0** - הפריט הראשון הוא 0, לא 1!
2. **רשימות הן משתנות** - אפשר לשנות אותן אחרי יצירה
3. **השתמשו ב-len()** - כדי לדעת כמה פריטים יש
4. **השתמשו ב-in** - כדי לבדוק אם פריט קיים
5. **היזהרו מטעויות אינדקס** - אם הרשימה קצרה, לא תוכלו לגשת לאינדקס גבוה

## מה הלאה?

בשיעור הבא נלמד על פעולות נוספות על רשימות - איך למיין, להפוך, ולעבוד עם רשימות בצורה מתקדמת יותר.
אחר כך נלמד על מילונים - דרך נוספת לשמור נתונים!
        `
      },
      {
        id: 'lists-2',
        title: 'עבודה עם רשימות',
        description: 'הוספה, הסרה ושינוי רשימות',
        type: 'text',
        xpReward: 100,
        content: `
# עבודה עם רשימות 🛠️

רשימות הן גמישות! אפשר לשנות אותן תוך כדי ריצה.

## הוספת פריטים

הפקודה \`append()\` מוסיפה פריט לסוף הרשימה:

\`\`\`python
cart = ["חלב", "לחם"]
cart.append("ביצים")
print(cart)  # ["חלב", "לחם", "ביצים"]
\`\`\`

## אורך הרשימה

הפונקציה \`len()\` מחזירה את מספר הפריטים ברשימה:

\`\`\`python
print(len(cart))  # ידפיס 3
\`\`\`

## שינוי פריטים

אפשר לשנות פריט קיים לפי האינדקס שלו:

\`\`\`python
cart[0] = "חלב סויה"
print(cart)  # ["חלב סויה", "לחם", "ביצים"]
\`\`\`
        `
      },
      {
        id: 'lists-quiz',
        title: 'בוחן רשימות מקיף',
        description: 'בואו נבדוק את הידע שלכם ברשימות - בוחן מקיף',
        type: 'quiz',
        xpReward: 225,
        quizQuestions: [
          {
            id: 'ls1',
            question: 'מה ידפיס הקוד: nums = [10, 20, 30]; print(nums[1])?',
            options: ['10', '20', '30', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'האינדקסים מתחילים מ-0, אז nums[0] הוא 10 ו-nums[1] הוא 20.'
          },
          {
            id: 'ls2',
            question: 'איזו פקודה מוסיפה פריט לסוף הרשימה?',
            options: ['add()', 'push()', 'append()', 'insert()'],
            correctAnswer: 2,
            explanation: 'הפקודה append() מוסיפה פריט חדש לסוף הרשימה.'
          },
          {
            id: 'ls3',
            question: 'איך מקבלים את אורך הרשימה my_list?',
            options: ['my_list.length', 'length(my_list)', 'len(my_list)', 'count(my_list)'],
            correctAnswer: 2,
            explanation: 'הפונקציה len() מחזירה את מספר הפריטים ברשימה.'
          },
          {
            id: 'ls4',
            question: 'מה ידפיס: nums = [1, 2, 3]; print(nums[-1])?',
            options: ['1', '2', '3', 'שגיאה'],
            correctAnswer: 2,
            explanation: 'אינדקס שלילי מתחיל מהסוף. -1 הוא הפריט האחרון.'
          },
          {
            id: 'ls5',
            question: 'מה ידפיס: nums = [1, 2, 3, 4, 5]; print(nums[1:4])?',
            options: ['[1, 2, 3, 4]', '[2, 3, 4]', '[2, 3, 4, 5]', '[1, 2, 3]'],
            correctAnswer: 1,
            explanation: 'חיתוך [1:4] לוקח מאינדקס 1 עד 4 (לא כולל 4).'
          },
          {
            id: 'ls6',
            question: 'מה ידפיס: nums = [1, 2, 3]; nums.append(4); print(nums)?',
            options: ['[1, 2, 3]', '[4, 1, 2, 3]', '[1, 2, 3, 4]', '[1, 2, 4, 3]'],
            correctAnswer: 2,
            explanation: 'append() מוסיף את הפריט לסוף הרשימה.'
          },
          {
            id: 'ls7',
            question: 'איך מוסיפים פריט במיקום מסוים ברשימה?',
            options: ['append()', 'add()', 'insert()', 'put()'],
            correctAnswer: 2,
            explanation: 'insert(index, item) מוסיף פריט במיקום מסוים.'
          },
          {
            id: 'ls8',
            question: 'מה ידפיס: nums = [1, 2, 3]; nums.remove(2); print(nums)?',
            options: ['[1, 3]', '[1, 2]', '[2, 3]', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'remove() מסיר את הפריט הראשון עם הערך המבוקש.'
          },
          {
            id: 'ls9',
            question: 'מה ידפיס: nums = [1, 2, 3]; x = nums.pop(); print(x)?',
            options: ['1', '2', '3', '[1, 2]'],
            correctAnswer: 2,
            explanation: 'pop() מסיר ומחזיר את הפריט האחרון ברשימה.'
          },
          {
            id: 'ls10',
            question: 'איך בודקים אם פריט נמצא ברשימה?',
            options: ['nums.contains(5)', 'nums.has(5)', '5 in nums', 'nums.find(5)'],
            correctAnswer: 2,
            explanation: 'האופרטור in בודק אם פריט נמצא ברשימה.'
          },
          {
            id: 'ls11',
            question: 'מה ידפיס: nums = [3, 1, 2]; nums.sort(); print(nums)?',
            options: ['[3, 1, 2]', '[1, 2, 3]', '[3, 2, 1]', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'sort() ממיין את הרשימה בסדר עולה.'
          },
          {
            id: 'ls12',
            question: 'מה ידפיס: nums = [1, 2, 3]; nums.reverse(); print(nums)?',
            options: ['[1, 2, 3]', '[3, 2, 1]', '[3, 1, 2]', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'reverse() הופך את סדר הפריטים ברשימה.'
          },
          {
            id: 'ls13',
            question: 'מה ידפיס: nums = [1, 2, 2, 3]; print(nums.count(2))?',
            options: ['1', '2', '3', '4'],
            correctAnswer: 1,
            explanation: 'count() סופר כמה פעמים הפריט מופיע ברשימה.'
          },
          {
            id: 'ls14',
            question: 'איך יוצרים רשימה ריקה?',
            options: ['list()', '[]', 'empty_list', 'שתי התשובות הראשונות נכונות'],
            correctAnswer: 3,
            explanation: 'אפשר ליצור רשימה ריקה עם [] או עם list().'
          },
          {
            id: 'ls15',
            question: 'מה ידפיס: nums = [1, 2, 3]; print(nums + [4, 5])?',
            options: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', 'שגיאה', '[5, 7, 8]'],
            correctAnswer: 0,
            explanation: '+ מחבר שתי רשימות לרשימה אחת.'
          }
        ]
      },
      {
        id: 'lists-game',
        title: 'אתגר: רשימות',
        description: 'השתמשו ברשימה כדי לנווט את הרובר במבוך.',
        type: 'game',
        gameLevelId: 7,
        xpReward: 250
      },
      {
        id: 'dicts-1',
        title: 'מילונים (Dictionaries)',
        description: 'זוגות של מפתח וערך',
        type: 'text',
        xpReward: 100,
        content: `
# מילונים (Dictionaries) 📖

מילון הוא כמו רשימה, אבל במקום מספרים (אינדקסים), אנחנו משתמשים במפתחות (Keys) כדי לגשת לערכים (Values).
דמיינו מילון אמיתי - יש בו מילים (מפתחות) והסברים (ערכים). כדי למצוא הסבר, אנחנו מחפשים את המילה!

## למה אנחנו צריכים מילונים?

ברשימה, אנחנו משתמשים במספרים כדי לגשת לערכים:
\`\`\`python
fruits = ["תפוח", "בננה", "תפוז"]
print(fruits[0])  # תפוח
\`\`\`

אבל מה אם אנחנו רוצים לשמור מידע מורכב יותר? למשל, על כל פרי אנחנו רוצים לשמור את הצבע, הטעם והמחיר?

עם מילון, זה פשוט:
\`\`\`python
apple = {
    "name": "תפוח",
    "color": "אדום",
    "taste": "מתוק",
    "price": 5
}
\`\`\`

## איך יוצרים מילון?

משתמשים בסוגריים מסולסלים \`{}\` ומפרידים בין זוגות מפתח-ערך בפסיקים:

\`\`\`python
# מילון של צבעים לפירות
fruit_colors = {
    "apple": "red",
    "banana": "yellow",
    "grape": "purple"
}

# מילון ריק
empty_dict = {}

# מילון עם ערכים מעורבים
student = {
    "name": "דני",
    "age": 10,
    "grades": [85, 90, 88],
    "is_active": True
}
\`\`\`

## גישה לערכים

ניגשים לערך באמצעות המפתח שלו (בסוגריים מרובעים):

\`\`\`python
fruit_colors = {
    "apple": "red",
    "banana": "yellow",
    "grape": "purple"
}

print(fruit_colors["apple"])   # ידפיס: red
print(fruit_colors["banana"])  # ידפיס: yellow
\`\`\`

### ⚠️ זהירות!

אם תנסו לגשת למפתח שלא קיים, תקבלו שגיאה:
\`\`\`python
print(fruit_colors["orange"])  # שגיאה! המפתח לא קיים
\`\`\`

### שימוש ב-get() - בטוח יותר

\`\`\`python
# אם המפתח לא קיים, מחזיר None (או ערך ברירת מחדל)
color = fruit_colors.get("orange")  # None
color = fruit_colors.get("orange", "לא ידוע")  # "לא ידוע"
\`\`\`

## הוספה ושינוי ערכים

מילונים הם משתנים - אפשר להוסיף ולשנות:

\`\`\`python
fruit_colors = {"apple": "red"}

# הוספת מפתח חדש
fruit_colors["banana"] = "yellow"

# שינוי ערך קיים
fruit_colors["apple"] = "green"

print(fruit_colors)  # {"apple": "green", "banana": "yellow"}
\`\`\`

## הסרת מפתחות

### del - הסרה

\`\`\`python
fruit_colors = {"apple": "red", "banana": "yellow"}
del fruit_colors["banana"]
print(fruit_colors)  # {"apple": "red"}
\`\`\`

### pop() - הסרה והחזרת הערך

\`\`\`python
fruit_colors = {"apple": "red", "banana": "yellow"}
color = fruit_colors.pop("banana")
print(color)  # "yellow"
print(fruit_colors)  # {"apple": "red"}
\`\`\`

## מעבר על מילון

### מעבר על מפתחות:

\`\`\`python
fruit_colors = {"apple": "red", "banana": "yellow", "grape": "purple"}

for fruit in fruit_colors:
    print(f"{fruit} הוא {fruit_colors[fruit]}")
\`\`\`

### מעבר על מפתחות וערכים יחד:

\`\`\`python
fruit_colors = {"apple": "red", "banana": "yellow", "grape": "purple"}

for fruit, color in fruit_colors.items():
    print(f"{fruit} הוא {color}")
\`\`\`

### מעבר רק על מפתחות:

\`\`\`python
for fruit in fruit_colors.keys():
    print(fruit)
\`\`\`

### מעבר רק על ערכים:

\`\`\`python
for color in fruit_colors.values():
    print(color)
\`\`\`

## בדיקה אם מפתח קיים

\`\`\`python
fruit_colors = {"apple": "red", "banana": "yellow"}

if "apple" in fruit_colors:
    print("יש תפוח במילון!")

if "orange" not in fruit_colors:
    print("אין תפוז במילון")
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: רשימת תלמידים

\`\`\`python
students = {
    "דני": {"age": 10, "grade": 85},
    "שרה": {"age": 11, "grade": 92},
    "יוסי": {"age": 10, "grade": 78}
}

for name, info in students.items():
    print(f"{name} בן {info['age']} קיבל {info['grade']}")
\`\`\`

### דוגמה 2: מחשבון ציונים

\`\`\`python
grades = {
    "מתמטיקה": 85,
    "אנגלית": 90,
    "מדעים": 88
}

total = 0
for subject, grade in grades.items():
    print(f"{subject}: {grade}")
    total = total + grade

average = total / len(grades)
print(f"ממוצע: {average}")
\`\`\`

### דוגמה 3: מילון תרגום

\`\`\`python
translations = {
    "שלום": "Hello",
    "תודה": "Thank you",
    "בבקשה": "Please"
}

word = input("הכנס מילה בעברית: ")
if word in translations:
    print(f"באנגלית: {translations[word]}")
else:
    print("לא מצאתי תרגום")
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
# מילון המתרגם אותיות לכיוונים
controls = {
    "R": "right",
    "L": "left",
    "U": "up",
    "D": "down"
}

# רשימת פקודות
commands = ["R", "R", "U", "R", "D"]

# הרובר מבצע את הפקודות
for command in commands:
    direction = controls[command]
    if direction == "right":
        move_right()
    elif direction == "left":
        move_left()
    elif direction == "up":
        move_up()
    elif direction == "down":
        move_down()
    print(f"זזתי {direction}")
\`\`\`

### דוגמה מורכבת יותר:

\`\`\`python
# מילון עם מידע על כל כיוון
directions_info = {
    "right": {"steps": 3, "message": "זזתי ימינה"},
    "up": {"steps": 2, "message": "זזתי למעלה"},
    "left": {"steps": 1, "message": "זזתי שמאלה"}
}

# הרובר זז לפי המידע במילון
for direction, info in directions_info.items():
    for _ in range(info["steps"]):
        if direction == "right":
            move_right()
        elif direction == "up":
            move_up()
        elif direction == "left":
            move_left()
    print(info["message"])
\`\`\`

## ההבדל בין רשימות למילונים

| רשימות | מילונים |
|---------|---------|
| משתמשים במספרים (אינדקסים) | משתמשים במפתחות (טקסט או מספר) |
| מסודרים לפי מיקום | לא מסודרים (בפייתון 3.7+ יש סדר) |
| \`my_list[0]\` | \`my_dict["key"]\` |
| טובים לסדרות | טובים לזוגות מפתח-ערך |

## מילונים מקוננים

אפשר לשים מילונים בתוך מילונים:

\`\`\`python
school = {
    "students": {
        "דני": {"age": 10, "grade": 85},
        "שרה": {"age": 11, "grade": 92}
    },
    "teachers": {
        "מורה1": "מתמטיקה",
        "מורה2": "אנגלית"
    }
}

print(school["students"]["דני"]["age"])  # 10
\`\`\`

## טיפים חשובים

1. **מפתחות חייבים להיות ייחודיים** - לא יכולים להיות שני מפתחות זהים
2. **מפתחות יכולים להיות מחרוזות, מספרים או tuples** - אבל לא רשימות או מילונים
3. **השתמשו ב-get()** - כדי להימנע משגיאות כשהמפתח לא קיים
4. **השתמשו ב-items()** - כדי לעבור על מפתחות וערכים יחד
5. **מילונים מהירים יותר** - חיפוש במילון מהיר יותר מאשר ברשימה

## מה הלאה?

בשיעור הבא נלמד על פונקציות - איך לארגן את הקוד שלנו וליצור פקודות משלנו!
פונקציות יעזרו לנו לכתוב קוד נקי ונוח יותר לשימוש חוזר.
        `
      },
      {
        id: 'dicts-quiz',
        title: 'בוחן מילונים מקיף',
        description: 'האם הבנתם איך עובדים מילונים? בוחן מקיף',
        type: 'quiz',
        xpReward: 225,
        quizQuestions: [
          {
            id: 'd1',
            question: 'מה ההבדל העיקרי בין רשימה למילון?',
            options: ['אין הבדל', 'רשימה משתמשת במספרים (אינדקסים), מילון במפתחות', 'מילון יכול להחזיק רק מספרים', 'רשימה מסודרת ומילון לא'],
            correctAnswer: 1,
            explanation: 'ברשימה ניגשים לערכים לפי המיקום שלהם (0, 1, 2...), ובמילון לפי המפתח שלהם (שיכול להיות טקסט).'
          },
          {
            id: 'd2',
            question: 'מה ידפיס הקוד: d = {"a": 1, "b": 2}; print(d["b"])?',
            options: ['1', '2', 'a', 'b'],
            correctAnswer: 1,
            explanation: 'אנחנו מבקשים את הערך ששייך למפתח "b", והוא 2.'
          },
          {
            id: 'd3',
            question: 'איך יוצרים מילון ריק?',
            options: ['dict()', '{}', 'empty_dict', 'שתי התשובות הראשונות נכונות'],
            correctAnswer: 3,
            explanation: 'אפשר ליצור מילון ריק עם {} או עם dict().'
          },
          {
            id: 'd4',
            question: 'מה יקרה אם ננסה לגשת למפתח שלא קיים?',
            options: ['יחזיר None', 'יחזיר 0', 'שגיאת KeyError', 'יחזיר מחרוזת ריקה'],
            correctAnswer: 2,
            explanation: 'ניסיון לגשת למפתח שלא קיים עם [] יגרום לשגיאת KeyError.'
          },
          {
            id: 'd5',
            question: 'איך לגשת למפתח בצורה בטוחה (בלי שגיאה)?',
            options: ['d.safe["key"]', 'd.get("key")', 'd.find("key")', 'd.search("key")'],
            correctAnswer: 1,
            explanation: 'get() מחזיר None אם המפתח לא קיים, במקום לזרוק שגיאה.'
          },
          {
            id: 'd6',
            question: 'מה ידפיס: d = {"a": 1}; d["b"] = 2; print(d)?',
            options: ['{"a": 1}', '{"b": 2}', '{"a": 1, "b": 2}', 'שגיאה'],
            correctAnswer: 2,
            explanation: 'אפשר להוסיף מפתח חדש למילון על ידי הקצאה.'
          },
          {
            id: 'd7',
            question: 'איך מקבלים את כל המפתחות במילון?',
            options: ['d.keys()', 'd.all_keys()', 'd.get_keys()', 'keys(d)'],
            correctAnswer: 0,
            explanation: 'המתודה keys() מחזירה את כל המפתחות במילון.'
          },
          {
            id: 'd8',
            question: 'איך מקבלים את כל הערכים במילון?',
            options: ['d.vals()', 'd.values()', 'd.get_values()', 'values(d)'],
            correctAnswer: 1,
            explanation: 'המתודה values() מחזירה את כל הערכים במילון.'
          },
          {
            id: 'd9',
            question: 'איך מקבלים את כל הזוגות (מפתח, ערך)?',
            options: ['d.pairs()', 'd.items()', 'd.all()', 'd.entries()'],
            correctAnswer: 1,
            explanation: 'המתודה items() מחזירה את כל הזוגות של מפתח-ערך.'
          },
          {
            id: 'd10',
            question: 'מה ידפיס: d = {"a": 1}; print(len(d))?',
            options: ['1', '2', 'a', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'len() מחזיר את מספר הזוגות (מפתח-ערך) במילון.'
          },
          {
            id: 'd11',
            question: 'איך בודקים אם מפתח קיים במילון?',
            options: ['d.contains("key")', 'd.has("key")', '"key" in d', 'd.exists("key")'],
            correctAnswer: 2,
            explanation: 'האופרטור in בודק אם מפתח קיים במילון.'
          },
          {
            id: 'd12',
            question: 'מה ידפיס: d = {"a": 1, "b": 2}; del d["a"]; print(d)?',
            options: ['{"a": 1, "b": 2}', '{"b": 2}', '{"a": 1}', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'del מוחק את המפתח והערך שלו מהמילון.'
          },
          {
            id: 'd13',
            question: 'מה ידפיס: d = {"a": 1}; x = d.pop("a"); print(x)?',
            options: ['{"a": 1}', '1', 'a', 'None'],
            correctAnswer: 1,
            explanation: 'pop() מוחק את המפתח ומחזיר את הערך שלו.'
          },
          {
            id: 'd14',
            question: 'האם מפתחות במילון יכולים להיות כפולים?',
            options: ['כן', 'לא', 'רק אם הערכים שונים', 'רק אם הם מספרים'],
            correctAnswer: 1,
            explanation: 'מפתחות במילון חייבים להיות ייחודיים. אם מוסיפים מפתח שכבר קיים, הערך מתעדכן.'
          },
          {
            id: 'd15',
            question: 'איזה סוג לא יכול להיות מפתח במילון?',
            options: ['מספר', 'מחרוזת', 'רשימה', 'tuple'],
            correctAnswer: 2,
            explanation: 'רשימות הן mutable (ניתנות לשינוי) ולכן לא יכולות להיות מפתחות.'
          }
        ]
      },
      {
        id: 'dicts-game',
        title: 'אתגר: מילונים',
        description: 'השתמשו במילון כדי לפענח את הצופן ולהגיע ליעד.',
        type: 'game',
        gameLevelId: 8,
        xpReward: 275
      }
    ]
  },
  {
    id: 'functions',
    title: 'פונקציות (Functions)',
    description: 'למדו איך לארגן את הקוד שלכם וליצור פקודות משלכם!',
    lessons: [
      {
        id: 'functions-1',
        title: 'מה זה פונקציה?',
        description: 'למה אנחנו צריכים פונקציות?',
        type: 'text',
        xpReward: 100,
        content: `
# פונקציות (Functions) 📦

פונקציה היא קטע קוד שיש לו שם, ואנחנו יכולים להריץ אותו מתי שנרצה.
זה כמו ללמד את הרובר טריק חדש - אחרי שלימדנו אותו פעם אחת, הוא יכול לעשות את זה שוב ושוב!

דמיינו שאתם מבשלים עוגה. יש לכם מתכון (הפונקציה) שאפשר להשתמש בו שוב ושוב.
כל פעם שתבשלו עוגה, תעקבו אחרי אותו מתכון, אבל התוצאה תהיה עוגה חדשה!

## למה צריך פונקציות?

### 1. סדר וארגון

פונקציות מחלקות את הקוד לחלקים קטנים והגיוניים. זה כמו לפרק משימה גדולה לחלקים קטנים.

### 2. שימוש חוזר

כותבים קוד פעם אחת ומשתמשים בו הרבה פעמים. זה חוסך זמן ומפחית טעויות!

### 3. קריאות

קוד עם שמות ברורים קל יותר להבנה. כשאנחנו רואים \`greet_user()\`, אנחנו יודעים בדיוק מה זה עושה.

### 4. תחזוקה

אם צריך לשנות משהו, משנים במקום אחד במקום לחפש בכל הקוד.

## דוגמה פשוטה:

בלי פונקציות, אם היינו רוצים שהרובר יזוז באלכסון כמה פעמים, היינו כותבים:
\`\`\`python
move_right()
move_right()
move_up()

move_right()
move_right()
move_up()

move_right()
move_right()
move_up()
\`\`\`

עם פונקציה, זה הרבה יותר פשוט:
\`\`\`python
def jump_diagonal():
    move_right()
    move_right()
    move_up()

jump_diagonal()
jump_diagonal()
jump_diagonal()
\`\`\`

## איך פונקציות עובדות?

כשאנחנו קוראים לפונקציה (מריצים אותה), המחשב:
1. קופץ למקום שבו הפונקציה מוגדרת
2. מריץ את כל הקוד שבתוך הפונקציה
3. חוזר למקום שבו קראנו לה וממשיך משם

## דוגמאות מעשיות

### דוגמה 1: פונקציה פשוטה

\`\`\`python
def say_hello():
    print("שלום!")
    print("נעים להכיר!")

# קריאה לפונקציה
say_hello()
say_hello()
\`\`\`

### דוגמה 2: פונקציה עם כמה פקודות

\`\`\`python
def print_info():
    print("=== מידע עליי ===")
    print("שם: דני")
    print("גיל: 10")
    print("עיר: תל אביב")

print_info()
\`\`\`

## פונקציות מובנות בפייתון

פייתון כבר מגיעה עם הרבה פונקציות מוכנות:
- \`print()\` - להדפסה
- \`input()\` - לקלט מהמשתמש
- \`len()\` - לאורך של רשימה
- \`range()\` - ליצירת סדרת מספרים
- \`int()\`, \`str()\`, \`float()\` - להמרות

## טיפים חשובים

1. **שם ברור** - השם צריך להסביר מה הפונקציה עושה
2. **הזחה נכונה** - הקוד שבתוך הפונקציה חייב להיות מוזח פנימה
3. **קריאה לפונקציה** - חייבים להוסיף \`()\` בסוף השם כדי להריץ אותה
4. **הגדרה לפני שימוש** - צריך להגדיר את הפונקציה לפני שקוראים לה

## מה הלאה?

בשיעור הבא נלמד איך ליצור פונקציות עם פרמטרים - כך שהפונקציה תוכל לקבל מידע ולעבוד איתו!
        `
      },
      {
        id: 'functions-2',
        title: 'יצירת פונקציות',
        description: 'איך יוצרים פונקציה חדשה?',
        type: 'text',
        xpReward: 100,
        content: `
# יצירת פונקציות (Defining Functions) 🛠️

כדי ליצור פונקציה משתמשים במילה השמורה \`def\` (קיצור של define - להגדיר).
זה אומר למחשב: "הנה פונקציה חדשה בשם הזה, וזה מה שהיא עושה".

## המבנה של פונקציה:

\`\`\`python
def my_function_name():
    # הקוד שהפונקציה תבצע
    print("שלום מהפונקציה!")
\`\`\`

### חלקי הפונקציה:

1. **\`def\`** - המילה השמורה שמתחילה הגדרת פונקציה
2. **שם הפונקציה** - השם שאנחנו בוחרים (עם כללי שמות כמו משתנים)
3. **\`()\`** - סוגריים (עכשיו ריקים, אבל נוסיף פרמטרים אחר כך)
4. **\`:\`** - נקודתיים שמסמנים שההגדרה מתחילה
5. **הקוד** - מוזח פנימה, זה מה שהפונקציה עושה

## דוגמאות

### דוגמה 1: פונקציה פשוטה

\`\`\`python
def greet():
    print("שלום!")
    print("איך אתה?")

greet()  # קוראים לפונקציה
\`\`\`

### דוגמה 2: פונקציה עם כמה פעולות

\`\`\`python
def morning_routine():
    print("קמתי מהמיטה")
    print("צחצחתי שיניים")
    print("אכלתי ארוחת בוקר")
    print("הלכתי לבית ספר")

morning_routine()
\`\`\`

### דוגמה 3: פונקציה שמופיעה כמה פעמים

\`\`\`python
def draw_square():
    move_right()
    move_down()
    move_left()
    move_up()

# מציירים 3 ריבועים
for i in range(3):
    draw_square()
    move_right()
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
def jump_obstacle():
    move_up()
    move_right()
    move_right()
    move_down()

# עכשיו אפשר להשתמש בפונקציה החדשה!
jump_obstacle()
move_right()
jump_obstacle()
move_right()
jump_obstacle()
\`\`\`

### דוגמה מורכבת יותר:

\`\`\`python
def move_in_square():
    """זז בארבעה כיוונים ויוצר ריבוע"""
    move_right()
    move_down()
    move_left()
    move_up()

def navigate_maze():
    """נווט במבוך עם כמה ריבועים"""
    for i in range(3):
        move_in_square()
        move_right()

navigate_maze()
\`\`\`

## כללי שמות פונקציות

1. **אותיות ומספרים** - כמו משתנים
2. **לא מתחיל במספר**
3. **אין רווחים** - משתמשים בקו תחתון
4. **שם ברור** - השם צריך להסביר מה הפונקציה עושה

### דוגמאות לשמות טובים:
- \`greet_user\`
- \`calculate_sum\`
- \`move_rover\`
- \`print_info\`

### דוגמאות לשמות לא טובים:
- \`f\` - לא ברור מה זה עושה
- \`do_stuff\` - לא ספציפי
- \`func1\` - לא משמעותי

## הערות תיעוד (Docstrings)

אפשר להוסיף הסבר קצר על מה הפונקציה עושה:

\`\`\`python
def greet():
    """מדפיס ברכה למשתמש"""
    print("שלום!")
    print("איך אתה?")

def calculate_area():
    """מחשב את השטח של ריבוע"""
    side = 5
    area = side * side
    print(f"השטח הוא: {area}")
\`\`\`

## סדר הקריאה חשוב!

חייבים להגדיר את הפונקציה לפני שקוראים לה:

\`\`\`python
# ✅ נכון - הגדרה לפני קריאה
def greet():
    print("שלום!")

greet()

# ❌ שגיאה - קריאה לפני הגדרה
greet()  # שגיאה! הפונקציה עדיין לא מוגדרת

def greet():
    print("שלום!")
\`\`\`

## פונקציות בתוך פונקציות

אפשר לקרוא לפונקציה אחת מתוך פונקציה אחרת:

\`\`\`python
def move_right_twice():
    move_right()
    move_right()

def move_diagonal():
    move_right_twice()
    move_up()
    move_right_twice()

move_diagonal()
\`\`\`

## טיפים חשובים

1. **הזחה נכונה** - כל הקוד שבתוך הפונקציה חייב להיות מוזח פנימה
2. **שם ברור** - השם צריך להסביר מה הפונקציה עושה
3. **קריאה עם ()** - חייבים להוסיף סוגריים כדי להריץ את הפונקציה
4. **הגדרה לפני שימוש** - תמיד הגדירו את הפונקציה לפני שקוראים לה
5. **השתמשו בפונקציות** - אם אתם כותבים את אותו קוד פעמיים, צרו פונקציה!

## מה הלאה?

בשיעור הבא נלמד על פרמטרים - איך להעביר מידע לפונקציה כדי שהיא תעבוד עם ערכים שונים בכל פעם!
        `
      },
      {
        id: 'functions-quiz',
        title: 'בוחן פונקציות מקיף',
        description: 'האם הבנתם איך יוצרים פונקציות? בוחן מקיף',
        type: 'quiz',
        xpReward: 250,
        quizQuestions: [
          {
            id: 'f1',
            question: 'איזו מילה שמורה משמשת להגדרת פונקציה?',
            options: ['func', 'function', 'def', 'define'],
            correctAnswer: 2,
            explanation: 'בפייתון משתמשים במילה def כדי להגדיר פונקציה חדשה.'
          },
          {
            id: 'f2',
            question: 'איך קוראים לפונקציה בשם say_hello?',
            options: ['say_hello', 'call say_hello', 'say_hello()', 'def say_hello'],
            correctAnswer: 2,
            explanation: 'כדי לקרוא לפונקציה (להריץ אותה), חייבים להוסיף סוגריים () בסוף השם שלה.'
          },
          {
            id: 'f3',
            question: 'מה עושה return בפונקציה?',
            options: ['מדפיס ערך', 'מחזיר ערך', 'מסיים את התוכנית', 'מתחיל את הפונקציה מחדש'],
            correctAnswer: 1,
            explanation: 'return מחזיר ערך מהפונקציה ומסיים את הריצה שלה.'
          },
          {
            id: 'f4',
            question: 'מה יחזיר: def add(a, b): return a + b; add(3, 5)?',
            options: ['3', '5', '8', 'None'],
            correctAnswer: 2,
            explanation: 'הפונקציה מחברת את הפרמטרים ומחזירה את התוצאה.'
          },
          {
            id: 'f5',
            question: 'מה ההבדל בין פרמטר לארגומנט?',
            options: ['אין הבדל', 'פרמטר בהגדרה, ארגומנט בקריאה', 'ארגומנט בהגדרה, פרמטר בקריאה', 'פרמטר למספרים, ארגומנט לטקסט'],
            correctAnswer: 1,
            explanation: 'פרמטר הוא המשתנה בהגדרת הפונקציה, ארגומנט הוא הערך שמעבירים בקריאה.'
          },
          {
            id: 'f6',
            question: 'מה יחזיר פונקציה בלי return?',
            options: ['0', '""', 'None', 'שגיאה'],
            correctAnswer: 2,
            explanation: 'פונקציה בלי return מחזירה None באופן אוטומטי.'
          },
          {
            id: 'f7',
            question: 'מה ידפיס: def greet(name="עולם"): print(f"שלום {name}"); greet()?',
            options: ['שלום', 'שלום עולם', 'שגיאה', 'None'],
            correctAnswer: 1,
            explanation: 'כשלא מעבירים ארגומנט, משתמשים בערך ברירת המחדל.'
          },
          {
            id: 'f8',
            question: 'כמה פרמטרים יכולה לקבל פונקציה?',
            options: ['אחד בלבד', 'עד 10', 'כמה שרוצים', 'עד 5'],
            correctAnswer: 2,
            explanation: 'אפשר להגדיר כמה פרמטרים שרוצים בפונקציה.'
          },
          {
            id: 'f9',
            question: 'מה יקרה אם נקרא לפונקציה לפני שהגדרנו אותה?',
            options: ['הקוד ירוץ רגיל', 'שגיאת NameError', 'הפונקציה תוגדר אוטומטית', 'יחזיר None'],
            correctAnswer: 1,
            explanation: 'חייבים להגדיר פונקציה לפני שקוראים לה.'
          },
          {
            id: 'f10',
            question: 'מה ידפיס: def f(): return 1; return 2; print(f())?',
            options: ['1', '2', '1 2', 'שגיאה'],
            correctAnswer: 0,
            explanation: 'return מסיים את הפונקציה מיד. הקוד אחרי return לא ירוץ.'
          },
          {
            id: 'f11',
            question: 'האם אפשר לקרוא לפונקציה מתוך פונקציה אחרת?',
            options: ['לא', 'כן', 'רק אם היא מוגדרת קודם', 'רק פונקציות מובנות'],
            correctAnswer: 1,
            explanation: 'אפשר לקרוא לכל פונקציה מתוך פונקציה אחרת.'
          },
          {
            id: 'f12',
            question: 'מה זה *args בפונקציה?',
            options: ['שגיאה', 'מאפשר לקבל מספר לא ידוע של ארגומנטים', 'מכפיל את הארגומנטים', 'מציין ארגומנט חובה'],
            correctAnswer: 1,
            explanation: '*args מאפשר לפונקציה לקבל כמה ארגומנטים שרוצים.'
          },
          {
            id: 'f13',
            question: 'מה ידפיס: def double(x): return x * 2; print(double(double(3)))?',
            options: ['6', '12', '9', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'double(3) מחזיר 6, ואז double(6) מחזיר 12.'
          },
          {
            id: 'f14',
            question: 'מה ההבדל בין print() ל-return?',
            options: ['אין הבדל', 'print מדפיס, return מחזיר ערך', 'return מדפיס, print מחזיר', 'שניהם מחזירים ערך'],
            correctAnswer: 1,
            explanation: 'print() מדפיס למסך, return מחזיר ערך שאפשר להשתמש בו.'
          },
          {
            id: 'f15',
            question: 'מה ידפיס: x = 10; def f(): x = 5; f(); print(x)?',
            options: ['5', '10', '15', 'שגיאה'],
            correctAnswer: 1,
            explanation: 'x בתוך הפונקציה הוא משתנה מקומי, לא משפיע על x החיצוני.'
          }
        ]
      },
      {
        id: 'functions-game',
        title: 'אתגר: פונקציות',
        description: 'צרו פונקציה שתעזור לרובר לעבור מכשולים חוזרים.',
        type: 'game',
        gameLevelId: 9,
        xpReward: 300
      },
      {
        id: 'functions-params',
        title: 'פונקציות עם פרמטרים',
        description: 'העברת מידע לפונקציות',
        type: 'text',
        xpReward: 125,
        content: `
# פרמטרים (Parameters) 📥

פרמטרים מאפשרים לנו להעביר מידע לפונקציה כדי שהיא תעשה דברים קצת אחרת בכל פעם.
זה כמו לתת למתכון ערכים שונים - אותו מתכון, אבל עם מרכיבים שונים!

## למה פרמטרים חשובים?

בלי פרמטרים, כל פונקציה הייתה עושה בדיוק את אותו דבר כל פעם.
עם פרמטרים, אנחנו יכולים ליצור פונקציה גמישה שעובדת עם ערכים שונים.

## איך זה עובד?

כשאנחנו מגדירים פונקציה, אנחנו יכולים להוסיף פרמטרים בסוגריים:

\`\`\`python
def greet(name):
    print("שלום " + name)
\`\`\`

כשאנחנו קוראים לפונקציה, אנחנו מעבירים ערך (argument):

\`\`\`python
greet("דני")  # "דני" הוא הארגומנט
\`\`\`

## דוגמה פשוטה:

\`\`\`python
def greet(name):
    print("שלום " + name)
    print("נעים להכיר!")

greet("דני")   # ידפיס: שלום דני
greet("שרה")   # ידפיס: שלום שרה
greet("יוסי")  # ידפיס: שלום יוסי
\`\`\`

## כמה פרמטרים

אפשר להעביר כמה פרמטרים:

\`\`\`python
def introduce(name, age):
    print(f"שלום, אני {name}")
    print(f"אני בן {age} שנים")

introduce("דני", 10)
introduce("שרה", 11)
\`\`\`

### סדר הפרמטרים חשוב!

\`\`\`python
def calculate_area(length, width):
    area = length * width
    print(f"השטח הוא: {area}")

calculate_area(5, 3)   # נכון: אורך=5, רוחב=3
calculate_area(3, 5)   # שונה: אורך=3, רוחב=5
\`\`\`

## פרמטרים עם ערכי ברירת מחדל

אפשר לתת לפרמטרים ערכי ברירת מחדל:

\`\`\`python
def greet(name, greeting="שלום"):
    print(f"{greeting}, {name}!")

greet("דני")                    # שלום, דני!
greet("שרה", "היי")            # היי, שרה!
greet("יוסי", "בוקר טוב")      # בוקר טוב, יוסי!
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: מחשבון פשוט

\`\`\`python
def add_numbers(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add_numbers(5, 3)   # 5 + 3 = 8
add_numbers(10, 20) # 10 + 20 = 30
\`\`\`

### דוגמה 2: הדפסת הודעה מותאמת

\`\`\`python
def print_message(message, times):
    for i in range(times):
        print(message)

print_message("שלום!", 3)
# ידפיס:
# שלום!
# שלום!
# שלום!
\`\`\`

### דוגמה 3: חישוב שטח

\`\`\`python
def calculate_rectangle_area(length, width):
    area = length * width
    print(f"שטח המלבן: {area}")

calculate_rectangle_area(5, 3)  # שטח המלבן: 15
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
def move_diagonal(steps):
    """זז באלכסון מספר פעמים"""
    for i in range(steps):
        move_right()
        move_up()

move_diagonal(3)  # יזוז 3 פעמים באלכסון
move_diagonal(5)  # יזוז 5 פעמים באלכסון
\`\`\`

### דוגמה מורכבת יותר:

\`\`\`python
def move_pattern(direction, steps):
    """זז בכיוון מסוים מספר צעדים"""
    for i in range(steps):
        if direction == "right":
            move_right()
        elif direction == "left":
            move_left()
        elif direction == "up":
            move_up()
        elif direction == "down":
            move_down()

move_pattern("right", 3)
move_pattern("up", 2)
move_pattern("right", 1)
\`\`\`

## טיפים חשובים

1. **שם פרמטר ברור** - השם צריך להסביר מה הפרמטר מייצג
2. **סדר חשוב** - כשקוראים לפונקציה, הערכים חייבים להיות באותו סדר
3. **מספר נכון** - חייבים להעביר את אותו מספר של ערכים כמו פרמטרים
4. **ערכי ברירת מחדל** - שימושיים כשאנחנו רוצים שהפרמטר יהיה אופציונלי

## מה הלאה?

בשיעור הבא נלמד על \`return\` - איך לקבל תשובה מהפונקציה!
זה יאפשר לנו להשתמש בתוצאה של הפונקציה במקומות אחרים בקוד.
        `
      },
      {
        id: 'functions-return',
        title: 'ערך החזרה (Return)',
        description: 'קבלת תשובה מהפונקציה',
        type: 'text',
        xpReward: 125,
        content: `
# ערך החזרה (Return Value) 📤

פונקציה יכולה גם להחזיר תשובה! משתמשים במילה \`return\`.
זה כמו לשאול שאלה ולקבל תשובה - הפונקציה עושה חישוב או פעולה ומחזירה את התוצאה.

## למה return חשוב?

עד עכשיו, הפונקציות שלנו רק הדפיסו דברים. אבל לפעמים אנחנו רוצים להשתמש בתוצאה של הפונקציה במקומות אחרים בקוד, לא רק להדפיס אותה.

## איך זה עובד?

\`\`\`python
def double(number):
    return number * 2

result = double(5)
print(result)  # ידפיס 10
\`\`\`

כשאנחנו קוראים ל-\`double(5)\`, הפונקציה:
1. מקבלת את המספר 5
2. מכפילה אותו ב-2
3. מחזירה את התוצאה (10)
4. התוצאה נשמרת במשתנה \`result\`

## דוגמאות

### דוגמה 1: חישוב פשוט

\`\`\`python
def add(a, b):
    return a + b

sum_result = add(5, 3)
print(sum_result)  # 8

# אפשר להשתמש ישירות
print(add(10, 20))  # 30
\`\`\`

### דוגמה 2: חישוב מורכב יותר

\`\`\`python
def calculate_area(length, width):
    area = length * width
    return area

room_area = calculate_area(5, 4)
print(f"שטח החדר: {room_area}")  # שטח החדר: 20
\`\`\`

### דוגמה 3: בדיקה והחזרת תשובה

\`\`\`python
def is_even(number):
    if number % 2 == 0:
        return True
    else:
        return False

if is_even(4):
    print("4 הוא מספר זוגי")
\`\`\`

## return עוצר את הפונקציה

כשפונקציה מגיעה ל-\`return\`, היא מסיימת את הריצה שלה מיד!

\`\`\`python
def check_number(num):
    print("בודק מספר...")
    if num > 10:
        return "גדול מ-10"
    print("המספר קטן או שווה ל-10")
    return "קטן או שווה ל-10"

result = check_number(15)
# ידפיס: "בודק מספר..."
# result = "גדול מ-10"
# השורה השנייה לא תודפס כי הפונקציה כבר חזרה!
\`\`\`

## פונקציות בלי return

אם פונקציה לא מחזירה ערך מפורש, היא מחזירה \`None\`:

\`\`\`python
def say_hello():
    print("שלום!")

result = say_hello()
print(result)  # None
\`\`\`

## שימוש בתוצאה של פונקציה

אפשר להשתמש בתוצאה של פונקציה בכל מקום:

\`\`\`python
def multiply(a, b):
    return a * b

# בתוך חישוב אחר
result = multiply(3, 4) + multiply(2, 5)
print(result)  # 12 + 10 = 22

# כתנאי
if multiply(5, 2) > 8:
    print("התוצאה גדולה מ-8")

# בלולאה
for i in range(multiply(2, 3)):
    print(i)  # ידפיס 0, 1, 2, 3, 4, 5
\`\`\`

## החזרת כמה ערכים

אפשר להחזיר כמה ערכים (כמו tuple):

\`\`\`python
def get_name_and_age():
    return "דני", 10

name, age = get_name_and_age()
print(f"שם: {name}, גיל: {age}")
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: מחשבון מתקדם

\`\`\`python
def calculate_total(items):
    total = 0
    for price in items:
        total = total + price
    return total

prices = [10, 20, 15, 5]
total_price = calculate_total(prices)
print(f"סה\"כ: {total_price}")  # סה"כ: 50
\`\`\`

### דוגמה 2: מציאת המקסימום

\`\`\`python
def find_max(numbers):
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num

numbers = [5, 12, 3, 8, 20]
max_number = find_max(numbers)
print(f"המספר הגדול ביותר: {max_number}")  # 20
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
def calculate_steps_needed(distance, step_size):
    """מחשב כמה צעדים צריך לעשות כדי לעבור מרחק מסוים"""
    steps = distance / step_size
    return int(steps)

distance_to_goal = 15
step_size = 3
steps_needed = calculate_steps_needed(distance_to_goal, step_size)

for i in range(steps_needed):
    move_right()
    print(f"צעד {i + 1} מתוך {steps_needed}")
\`\`\`

## טיפים חשובים

1. **return עוצר את הפונקציה** - כל קוד אחרי return לא ירוץ
2. **אפשר להחזיר כל סוג** - מספרים, מחרוזות, רשימות, מילונים, True/False
3. **שמרו את התוצאה** - אם אתם רוצים להשתמש בתוצאה, שמרו אותה במשתנה
4. **return vs print** - return מחזיר ערך, print רק מדפיס (לא מחזיר שימושי)
5. **פונקציות יכולות להיות שימושיות** - אם הן מחזירות ערך, אפשר להשתמש בהן בחישובים

## מה הלאה?

עכשיו אתם יודעים איך ליצור פונקציות חזקות עם פרמטרים וערכי החזרה!
בשיעורים הבאים נלמד על נושאים מתקדמים יותר כמו תנאים מורכבים ועבודה עם מחרוזות.
        `
      },
      {
        id: 'functions-game-2',
        title: 'אתגר מתקדם: פונקציות',
        description: 'השתמשו בפונקציה עם פרמטרים כדי לפתור את המבוך.',
        type: 'game',
        gameLevelId: 10,
        xpReward: 350
      }
    ]
  },
  {
    id: 'advanced-control',
    title: 'לולאות ותנאים מתקדמים',
    description: 'קחו את השליטה לשלב הבא עם break, continue ותנאים מורכבים.',
    lessons: [
      {
        id: 'adv-control-1',
        title: 'שליטה בלולאות',
        description: 'break ו-continue',
        type: 'text',
        xpReward: 150,
        content: `
# שליטה בלולאות (Loop Control) 🛑

לפעמים אנחנו רוצים לשנות את ההתנהגות של לולאה באמצע.

## הפקודה break

עוצרת את הלולאה מיד ויוצאת ממנה.

\`\`\`python
for i in range(10):
    if i == 5:
        break  # עוצר כשהגענו ל-5
    print(i)
\`\`\`

## הפקודה continue

מדלגת על האיטרציה הנוכחית ועוברת ישר לבאה.

\`\`\`python
for i in range(5):
    if i == 2:
        continue  # מדלג על 2
    print(i)
\`\`\`

## דוגמה עם הרובר:

\`\`\`python
# הולכים ימינה עד שנתקלים בקיר
while True:
    move_right()
    # נניח שיש לנו דרך לבדוק אם יש קיר
    if check_wall():
        break
\`\`\`
        `
      },
      {
        id: 'adv-control-quiz',
        title: 'בוחן שליטה בלולאות',
        description: 'האם הבנתם את ההבדל בין break ל-continue?',
        type: 'quiz',
        xpReward: 150,
        quizQuestions: [
          {
            id: 'ac1',
            question: 'מה עושה הפקודה break?',
            options: ['שוברת את המחשב', 'עוצרת את התוכנית כולה', 'יוצאת מהלולאה מיד', 'מדלגת לסיבוב הבא'],
            correctAnswer: 2,
            explanation: 'break גורמת ללולאה להסתיים מיד וממשיכה לקוד שאחריה.'
          },
          {
            id: 'ac2',
            question: 'מה עושה הפקודה continue?',
            options: ['ממשיכה את הלולאה כרגיל', 'יוצאת מהלולאה', 'מדלגת על שאר הקוד בסיבוב הנוכחי ועוברת לסיבוב הבא', 'חוזרת להתחלה'],
            correctAnswer: 2,
            explanation: 'continue מפסיקה את הסיבוב הנוכחי וקופצת ישר לסיבוב הבא של הלולאה.'
          }
        ]
      },
      {
        id: 'adv-control-game',
        title: 'אתגר: שליטה בלולאות',
        description: 'השתמשו ב-break כדי לעצור בזמן.',
        type: 'game',
        gameLevelId: 11,
        xpReward: 350
      },
      {
        id: 'adv-conditions',
        title: 'תנאים מורכבים',
        description: 'and, or, not',
        type: 'text',
        xpReward: 150,
        content: `
# תנאים מורכבים (Logical Operators) 🧠

אפשר לשלב תנאים באמצעות \`and\`, \`or\` ו-\`not\`.

## המפעיל and (וגם)

מחזיר אמת רק אם **שני** התנאים נכונים.

\`\`\`python
age = 12
has_ticket = True

if age >= 10 and has_ticket:
    print("אפשר להיכנס!")
\`\`\`

## המפעיל or (או)

מחזיר אמת אם **לפחות אחד** מהתנאים נכון.

\`\`\`python
is_weekend = False
is_holiday = True

if is_weekend or is_holiday:
    print("אין בית ספר!")
\`\`\`

## המפעיל not (לא)

הופך את התוצאה (אמת לשקר, שקר לאמת).

\`\`\`python
is_raining = False

if not is_raining:
    print("אפשר לצאת החוצה")
\`\`\`
        `
      },
      {
        id: 'adv-conditions-quiz',
        title: 'בוחן תנאים מורכבים',
        description: 'בואו נבדוק את הלוגיקה שלכם',
        type: 'quiz',
        xpReward: 150,
        quizQuestions: [
          {
            id: 'lc1',
            question: 'מה יחזיר הביטוי: True and False?',
            options: ['True', 'False', 'Error', 'None'],
            correctAnswer: 1,
            explanation: 'and דורש ששני הצדדים יהיו True. מכיוון שאחד הוא False, התוצאה היא False.'
          },
          {
            id: 'lc2',
            question: 'מה יחזיר הביטוי: True or False?',
            options: ['True', 'False', 'Error', 'None'],
            correctAnswer: 0,
            explanation: 'or דורש שרק צד אחד יהיה True. מכיוון שיש True אחד, התוצאה היא True.'
          },
          {
            id: 'lc3',
            question: 'מה יחזיר הביטוי: not (5 > 3)?',
            options: ['True', 'False', '5', '3'],
            correctAnswer: 1,
            explanation: 'הביטוי 5 > 3 הוא True. ה-not הופך אותו ל-False.'
          }
        ]
      },
      {
        id: 'adv-conditions-game',
        title: 'אתגר: תנאים מורכבים',
        description: 'השתמשו בלוגיקה מורכבת כדי לפתור את החידה.',
        type: 'game',
        gameLevelId: 12,
        xpReward: 400
      }
    ]
  },
  {
    id: 'strings',
    title: 'עבודה עם מחרוזות',
    description: 'טקסט הוא לא סתם מילים! למדו איך לחתוך, לחבר ולעצב מחרוזות.',
    lessons: [
      {
        id: 'strings-1',
        title: 'מה זה מחרוזת?',
        description: 'הכרות עם טיפוס הנתונים String',
        type: 'text',
        xpReward: 100,
        content: `
# מחרוזות (Strings) 🧵

מחרוזת היא רצף של תווים (אותיות, מספרים, סימנים). כבר ראינו אותה הרבה פעמים!
כל טקסט שאנחנו כותבים בתוך מרכאות הוא מחרוזת.

## מה זה מחרוזת?

מחרוזת היא סוג של נתונים שמייצג טקסט. אפשר לחשוב עליה כעל רשימה של תווים.

\`\`\`python
name = "דני"
message = 'שלום עולם'
sentence = "אני לומד פייתון!"
\`\`\`

### מרכאות בודדות או כפולות?

בפייתון, אפשר להשתמש גם במרכאות בודדות וגם בכפולות:

\`\`\`python
text1 = "שלום"
text2 = 'שלום'
# שתיהן זהות!
\`\`\`

אבל אם הטקסט מכיל מרכאות, צריך להשתמש בסוג השני:

\`\`\`python
text1 = "הוא אמר 'שלום'"
text2 = 'היא אמרה "היי"'
\`\`\`

## גישה לתווים

אפשר לגשת לכל תו במחרוזת כמו ברשימה - עם אינדקסים!

\`\`\`python
word = "Python"
print(word[0])  # P (התו הראשון)
print(word[1])  # y (התו השני)
print(word[2])  # t (התו השלישי)
\`\`\`

### גישה מהסוף

אפשר גם לגשת מהסוף עם מספרים שליליים:

\`\`\`python
word = "Python"
print(word[-1])  # n (התו האחרון)
print(word[-2])  # o (לפני האחרון)
\`\`\`

## אורך המחרוזת

הפונקציה \`len()\` מחזירה את מספר התווים במחרוזת:

\`\`\`python
print(len("Hello"))     # 5
print(len("שלום"))      # 4 (כל אות עברית היא תו אחד)
print(len(""))          # 0 (מחרוזת ריקה)
\`\`\`

## מחרוזות הן בלתי משתנות (Immutable)

בניגוד לרשימות, אי אפשר לשנות מחרוזת ישירות:

\`\`\`python
word = "Hello"
# word[0] = "h"  # שגיאה! אי אפשר לשנות מחרוזת

# אבל אפשר ליצור מחרוזת חדשה
new_word = "h" + word[1:]  # "hello"
\`\`\`

## חיבור מחרוזות

אפשר לחבר מחרוזות עם \`+\`:

\`\`\`python
first = "שלום"
second = "עולם"
full = first + " " + second
print(full)  # שלום עולם
\`\`\`

## הכפלת מחרוזות

אפשר להכפיל מחרוזת במספר:

\`\`\`python
print("היי! " * 3)  # היי! היי! היי!
print("-" * 10)     # ----------
\`\`\`

## חיתוך מחרוזות (Slicing)

אפשר לקחת חלק מהמחרוזת:

\`\`\`python
text = "Python"
print(text[0:2])   # Py (מ-0 עד 2 לא כולל)
print(text[2:])    # thon (מ-2 עד הסוף)
print(text[:4])    # Pyth (מההתחלה עד 4)
print(text[1:4])   # yth (מ-1 עד 4)
\`\`\`

## דוגמאות מעשיות

### דוגמה 1: בדיקת תחילת מחרוזת

\`\`\`python
email = "user@example.com"
if email.startswith("user"):
    print("האימייל מתחיל ב-user")
\`\`\`

### דוגמה 2: המרה לאותיות גדולות/קטנות

\`\`\`python
text = "Hello World"
print(text.upper())  # HELLO WORLD
print(text.lower())  # hello world
\`\`\`

### דוגמה 3: חיפוש במחרוזת

\`\`\`python
text = "Python הוא כיף"
if "Python" in text:
    print("נמצא!")
\`\`\`

## מה הלאה?

בשיעור הבא נלמד על פעולות נוספות על מחרוזות - חיתוך, חיבור, והחלפה.
נלמד גם על f-strings - הדרך המודרנית והנוחה לעבוד עם מחרוזות!
        `
      },
      {
        id: 'strings-2',
        title: 'פעולות על מחרוזות',
        description: 'חיבור, הכפלה וחיתוך',
        type: 'text',
        xpReward: 125,
        content: `
# פעולות על מחרוזות ✂️

## חיבור (Concatenation)

אפשר לחבר מחרוזות עם \`+\`:

\`\`\`python
first = "Hello"
second = "World"
full = first + " " + second
print(full)  # Hello World
\`\`\`

## הכפלה

אפשר להכפיל מחרוזת במספר!

\`\`\`python
print("Na" * 4 + " Batman!")
# NaNaNaNa Batman!
\`\`\`

## חיתוך (Slicing)

אפשר לקחת חלק ממחרוזת:

\`\`\`python
text = "Python"
print(text[0:2])  # Py (מתו 0 עד 2 לא כולל)
print(text[2:])   # thon (מתו 2 עד הסוף)
\`\`\`
        `
      },
      {
        id: 'strings-quiz',
        title: 'בוחן מחרוזות',
        description: 'מה אתם יודעים על טקסט?',
        type: 'quiz',
        xpReward: 150,
        quizQuestions: [
          {
            id: 's1',
            question: 'מה ידפיס הקוד: print("A" + "B")?',
            options: ['A B', 'AB', 'A+B', 'Error'],
            correctAnswer: 1,
            explanation: 'חיבור מחרוזות מצמיד אותן זו לזו ללא רווחים.'
          },
          {
            id: 's2',
            question: 'מה ידפיס הקוד: print("Hi" * 3)?',
            options: ['Hi3', 'HiHiHi', 'Hi Hi Hi', 'Error'],
            correctAnswer: 1,
            explanation: 'הכפלת מחרוזת חוזרת עליה כמספר הפעמים שביקשנו.'
          },
          {
            id: 's3',
            question: 'איך מקבלים את האות הראשונה במחרוזת s?',
            options: ['s[1]', 's[0]', 's.first()', 's(0)'],
            correctAnswer: 1,
            explanation: 'כמו ברשימות, האינדקס הראשון הוא 0.'
          }
        ]
      },
      {
        id: 'strings-game',
        title: 'אתגר: מחרוזות',
        description: 'הרכיבו את הסיסמה הנכונה כדי לפתוח את הדלת.',
        type: 'game',
        gameLevelId: 13,
        xpReward: 350
      },
      {
        id: 'strings-format',
        title: 'עיצוב מחרוזות (f-strings)',
        description: 'הדרך המודרנית לשלב משתנים בטקסט',
        type: 'text',
        xpReward: 125,
        content: `
# עיצוב מחרוזות (f-strings) 🎨

עד עכשיו חיברנו מחרוזות עם \`+\`. זה יכול להיות מסורבל.
בפייתון יש דרך קסומה שנקראת **f-string**.

## איך זה עובד?

מוסיפים \`f\` לפני הגרשיים, ואז אפשר לשים משתנים בתוך \`{}\`:

\`\`\`python
name = "דני"
age = 10

# השיטה הישנה
print("שלום " + name + ", אתה בן " + str(age))

# השיטה החדשה (f-string)
print(f"שלום {name}, אתה בן {age}")
\`\`\`

זה הרבה יותר קריא ונוח!
        `
      },
      {
        id: 'strings-format-quiz',
        title: 'בוחן פורמט',
        description: 'f-strings זה החיים',
        type: 'quiz',
        xpReward: 150,
        quizQuestions: [
          {
            id: 'sf1',
            question: 'מה חסר בקוד: name="Ben"; print(__"Hello {name}")?',
            options: ['f', 'F', 'format', 'str'],
            correctAnswer: 0,
            explanation: 'כדי להשתמש ב-f-string חייבים לשים את האות f לפני תחילת המחרוזת.'
          },
          {
            id: 'sf2',
            question: 'מה יודפס: x=5; print(f"Result: {x+1}")?',
            options: ['Result: x+1', 'Result: 5+1', 'Result: 6', 'Error'],
            correctAnswer: 2,
            explanation: 'בתוך הסוגריים המסולסלים {} אפשר לכתוב ביטויים וחישובים, והתוצאה שלהם תוכנס למחרוזת.'
          }
        ]
      }
    ]
  },
  {
    id: 'projects',
    title: 'פרויקטים מעשיים',
    description: 'זה הזמן לחבר את הכל יחד! בנו פרויקטים אמיתיים כמו מחשבון ומשחקים.',
    lessons: [
      {
        id: 'project-calculator',
        title: 'פרויקט 1: מחשבון פשוט',
        description: 'בנו מחשבון שמבצע חיבור וחיסור',
        type: 'game',
        gameLevelId: 14,
        xpReward: 500
      },
      {
        id: 'project-guess',
        title: 'פרויקט 2: משחק ניחושים',
        description: 'המחשב בוחר מספר, אתם מנחשים!',
        type: 'game',
        gameLevelId: 15,
        xpReward: 600
      }
    ]
  }
];

export const pythonCourse: Course = {
    id: 'python',
    title: 'פייתון לילדים',
    description: 'קורס מקיף ללימוד תכנות בפייתון לילדים בגילאי 8-14',
    icon: '🐍',
    color: 'from-green-500 to-emerald-500',
    modules: pythonModules,
    features: [
        'למידת תכנות מאפס ועד מתקדם',
        'פרויקטים מעשיים ומשחקים',
        'הסברים בעברית פשוטה וברורה',
        'תרגול עם רובוט וירטואלי'
    ]
};

