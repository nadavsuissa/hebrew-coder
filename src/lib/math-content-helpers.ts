/**
 * Dynamic Math Content Helpers
 * Reusable templates and components for creating engaging math lessons
 */

import {
  renderFraction,
  renderMixedNumber,
  renderEquation,
  renderMultiplication,
  renderDivision,
  createMathSteps,
  createVisualFraction,
  createInteractiveMathProblem,
  formatMathContent
} from './math-rendering';

export interface MathExample {
  problem: string;
  solution: string;
  visual?: string;
  explanation: string;
}

export interface MathConcept {
  title: string;
  emoji: string;
  description: string;
  examples: MathExample[];
  tips?: string[];
}

/**
 * Creates engaging fraction addition and subtraction content
 */
export function createFractionAdditionSubtractionLesson(): string {
  const visualExample1 = createVisualFraction({ numerator: 2, denominator: 6 });
  const visualExample2 = createVisualFraction({ numerator: 3, denominator: 6 });
  const visualExample3 = createVisualFraction({ numerator: 5, denominator: 6 });

  const stepsExample = createMathSteps([
    {
      description: "הרחבת השבר הראשון",
      expression: `1/2 = 2/4`,
      explanation: "הרחבנו פי 2 כדי להגיע למכנה 4"
    },
    {
      description: "הוספת השברים",
      expression: `2/4 + 1/4 = 3/4`,
      explanation: "עכשיו שניהם עם מכנה 4, אפשר לחבר!"
    }
  ]);

  return `# ➕➖ חיבור וחיסור שברים - המשחק המשפחתי!

## 🎯 כשהמכנים שווים - כיף וקל!

כששני השברים הם מאותו "גודל חלקים" (מכנה זהה), זה כמו לשחק משחק קבוצתי!
החלקים מתאימים בדיוק זה לזה, אז פשוט מוסיפים או גורעים את הכמויות.

### 🎲 דוגמה עם קוביות:
יש לכם ${renderFraction(2, 6)} קוביות אדומות ו-${renderFraction(3, 6)} קוביות כחולות.
כמה קוביות יש לכם בסך הכל?

**הפתרון:** ${renderEquation(renderFraction(2, 6), '+', renderFraction(3, 6), renderFraction(5, 6))} קוביות! 🎉

### 🎨 דוגמה עם צבעים:
יש לכם ${renderFraction(1, 4)} צנצנת צבע אדום ו-${renderFraction(2, 4)} צנצנת צבע כחול.
כמה צבע יש לכם?

**הפתרון:** ${renderEquation(renderFraction(1, 4), '+', renderFraction(2, 4), renderFraction(3, 4))} צנצנת צבע!

## 🧩 כשהמכנים שונים - אתגר מרגש!

כשלשברים יש מכנים שונים, זה כמו לנסות לחבר תפוחים ותפוזים!
צריך להפוך אותם לאותו "גודל חלקים" קודם.

### 🛠️ הכלי הסודי: הרחבת שברים!

**הכלל:** מכפילים גם מונה וגם מכנה באותו מספר.
הערך נשאר זהה, אבל החלקים קטנים יותר!

### 🍕 דוגמה עם פיצה:
יש לכם ${renderFraction(1, 2)} פיצה ו-${renderFraction(1, 4)} פיצה. כמה פיצה יש לכם?

${stepsExample}

**תוצאה:** ${renderFraction(3, 4)} פיצה! 🍕

### 🥤 דוגמה עם שתייה:
שרה שתתה ${renderFraction(1, 3)} בקבוק מיץ, ודני שתה ${renderFraction(1, 6)} בקבוק.
כמה שתו ביחד?

${createMathSteps([
  {
    description: "הרחבת השבר הראשון",
    expression: `1/3 = 2/6`,
    explanation: "הרחבנו פי 2 כדי להגיע למכנה 6"
  },
  {
    description: "הוספת השברים",
    expression: `2/6 + 1/6 = 3/6 = 1/2`,
    explanation: "עכשיו שניהם עם מכנה 6, אפשר לחבר!"
  }
])}

**תוצאה:** ${renderFraction(1, 2)} בקבוק! 🥤

## ➖ חיסור שברים - אותם כללים!

חיסור עובד בדיוק אותו דבר!

### 📚 דוגמה עם ספרים:
יש לכם ${renderFraction(5, 8)} ספרים בכיתה ו-${renderFraction(3, 8)} ספרים בבית.
כמה ספרים בבית?

**הפתרון:** ${renderEquation(renderFraction(5, 8), '-', renderFraction(3, 8), renderFraction(2, 8) + ' = ' + renderFraction(1, 4))} מהספרים! 📚

### 🍪 דוגמה עם עוגיות:
אפיתם ${renderFraction(3, 4)} קילו עוגיות ואכלתם ${renderFraction(1, 4)} קילו.
כמה נשאר?

${createMathSteps([
  {
    description: "חיסור ישיר",
    expression: `3/4 - 1/4 = 2/4 = 1/2`,
    explanation: "אותו מכנה - אפשר לחסר ישירות!"
  }
])}

**תוצאה:** ${renderFraction(1, 2)} קילו עוגיות! 🍪

## 🎮 תרגול מהיר - בואו נראה אם תפסתם!

1. **${renderFraction(2, 5)} + ${renderFraction(1, 5)} = ?** (אותו מכנה - קל!)
   תשובה: ${renderFraction(3, 5)}

2. **${renderFraction(1, 3)} + ${renderFraction(1, 6)} = ?** (מכנים שונים - אתגר!)
   תשובה: ${renderFraction(1, 3)} = ${renderFraction(2, 6)}, אז ${renderFraction(2, 6)} + ${renderFraction(1, 6)} = ${renderFraction(3, 6)} = ${renderFraction(1, 2)}

3. **${renderFraction(4, 7)} - ${renderFraction(2, 7)} = ?** (חיסור עם מכנה זהה)
   תשובה: ${renderFraction(2, 7)}

## 🌟 מה למדנו היום?

- **מכנים שווים** = פשוט מוסיפים/גורעים את המונים!
- **מכנים שונים** = קודם מרחיבים לאותו מכנה, אחר כך מוסיפים/גורעים!
- **הרחבה** = מכפילים מונה ומכנה באותו מספר
- שברים הם כמו חלקי עוגה - צריך חלקים באותו גודל כדי לחבר!

**אתם כבר אלופי חיבור שברים! המשיכו להתאמן!** 🏆`;
}

/**
 * Creates engaging fraction multiplication content
 */
export function createFractionMultiplicationLesson(): string {
  const pizzaExample = createVisualFraction({ numerator: 3, denominator: 8 });

  const multiplicationSteps = createMathSteps([
    {
      description: "מכפילים את המונים",
      expression: `1 × 3 = 3`,
      explanation: "מונה × מונה = מונה חדש"
    },
    {
      description: "מכפילים את המכנים",
      expression: `2 × 4 = 8`,
      explanation: "מכנה × מכנה = מכנה חדש"
    },
    {
      description: "התוצאה הסופית",
      expression: `3/8`,
      explanation: "זהו השבר שמייצג את התוצאה!"
    }
  ]);

  const wholeNumberSteps = createMathSteps([
    {
      description: "הופכת את המספר השלם לשבר",
      expression: `5 = 5/1`,
      explanation: "כל מספר שלם הוא שבר עם מכנה 1"
    },
    {
      description: "מכפילה כמו שבר רגיל",
      expression: `2/3 × 5/1 = (2×5)/(3×1) = 10/3`,
      explanation: "מונה×מונה ומכנה×מכנה"
    },
    {
      description: "התוצאה כמספר מעורב",
      expression: `10/3 = 3 ו-1/3`,
      explanation: "3 עוגות שלמות ועוד שליש עוגה!"
    }
  ]);

  const divisionExample = createInteractiveMathProblem({
    question: `יש לכם ${renderFraction(3, 4)} תפוח ואתם רוצים לחלק אותו ל-${renderFraction(2, 5)} (שני חמישים).`,
    steps: [
      {
        instruction: "השבר הראשון נשאר כמו שהוא",
        expression: `3/4`,
        hint: "אל תיגעו בו!"
      },
      {
        instruction: "הופכו את השבר השני",
        expression: `2/5 הופך ל-5/2`,
        hint: "מונה ↔ מכנה"
      },
      {
        instruction: "כפלו במקום לחלק",
        expression: `3/4 × 5/2`,
        hint: "עכשיו זה כפל רגיל!"
      },
      {
        instruction: "חשבו את התוצאה",
        expression: `(3×5)/(4×2) = 15/8`,
        hint: "מונה×מונה ומכנה×מכנה"
      }
    ],
    finalAnswer: `15/8 = 1 ו-${renderFraction(7, 8)} תפוח! 🍎`,
    explanation: "קיבלתם תפוח אחד שלם ועוד 7/8 מתפוח!"
  });

  return `# 🍕 כפל שברים - המסע המופלא! 🔢

## 🚀 כפל שברים - זה קל כמו פיצה!

שמעתם פעם שכפל שברים הוא **הכי קל** מכל הפעולות? זה נכון! אין צורך במכנה משותף או בכל הכאב הראש הזה.

### הכלל הזהב שישנה את החיים שלכם:
**מכפילים מונה במונה, מכנה במכנה** ✨

### 🎪 דוגמה עם פיצה:
דמיינו שיש לכם **חצי פיצה** ${renderFraction(1, 2)} ואתם רוצים להכפיל אותה ב**${renderFraction(3, 4)}** (שלושה רבעים).

${multiplicationSteps}

כלומר, אם היתה לכם פיצה שלמה וחילקתם אותה ל-8 חלקים שווים, קיבלתם 3 חלקים!

${pizzaExample}

### 🎂 כפל שבר במספר שלם - עוגה למסיבה!
מספר שלם הוא בעצם שבר עם מכנה 1. למשל: 5 = ${renderFraction(5, 1)}

**דוגמה:** ${renderFraction(2, 3)} × 5

${wholeNumberSteps}

כלומר, אם יש לכם ${renderFraction(2, 3)} עוגה ותרצו להכפיל ב-5, תקבלו 3 עוגות שלמות ועוד ${renderFraction(1, 3)} עוגה!

## 🌀 חילוק שברים - הטריק הכי מגניב בעולם!

חילוק שברים הוא כמו קסם! **הופכים את השבר השני והופכים לכפל!**

### למה זה עובד?
כי לחלק ב-${renderFraction(1, 2)} זה בדיוק כמו לכפול ב-2! (ניסו פעם?)

### 📝 השלבים הקסומים:
1. **השבר הראשון נשאר כמו שהוא** (אל תיגעו בו!)
2. **הופכים** את השבר השני (מונה ↔ מכנה)
3. **כופלים** במקום לחלק

${divisionExample}

### 🎯 טיפי זהב לזכירה:
- **"חילוק זה הכפלה בהופכי!"** 🔄
- **תמיד הופכו רק את השבר השני!**
- **אחרי ההיפוך - כפלו כמו תמיד!**

## 🎮 תרגול מהיר - בואו נראה אם הבנתם!

1. **${renderFraction(1, 3)} × ${renderFraction(2, 5)} = ?**
   תשובה: ${renderFraction(2, 15)} - שני חלקים מתוך 15!

2. **${renderFraction(4, 5)} : ${renderFraction(3, 7)} = ?**
   היפוך: ${renderFraction(4, 5)} × ${renderFraction(7, 3)} = ${renderFraction(28, 15)} = 1 ו-${renderFraction(13, 15)}

## 🌟 מה למדנו היום?
- כפל שברים הוא הכי קל - מונה×מונה, מכנה×מכנה
- מספרים שלמים = שברים עם מכנה 1
- חילוק = הכפלה בהופכי
- שברים הם כמו חתיכות של עוגה - כיף לחלק ולכפול אותן!

**המשיכו להתאמן - אתם כבר אלופי שברים!** 🏆`;
}

/**
 * Creates a visual pizza fraction representation
 */
export function createPizzaFractionVisual(fraction: { numerator: number; denominator: number }): string {
  const { numerator, denominator } = fraction;
  const slices = '🍕'.repeat(numerator) + '⚪'.repeat(denominator - numerator);
  return `פיצה חלקה ל-${denominator} חלקים:\n${slices}\n(לקחתם ${numerator} מתוך ${denominator})`;
}

/**
 * Creates step-by-step multiplication animation
 */
export function createMultiplicationSteps(num1: string, num2: string, result: string): string {
  return `## 📐 שלבי הכפל:
1. **מונה:** ${num1.split('/')[0]} × ${num2.split('/')[0]} = ${parseInt(num1.split('/')[0]) * parseInt(num2.split('/')[0])}
2. **מכנה:** ${num1.split('/')[1]} × ${num2.split('/')[1]} = ${parseInt(num1.split('/')[1]) * parseInt(num2.split('/')[1])}
3. **תוצאה:** ${result} ✨`;
}

/**
 * Creates engaging real-world examples for math concepts
 */
export function createRealWorldExamples(concept: string): string {
  const examples: Record<string, string[]> = {
    'fractions': [
      '🍫 **שוקולד:** אם יש לכם חפיסה של 8 קוביות ואכלתם 3, אכלתם 3/8 מהחפיסה!',
      '⏰ **זמן:** אם השיעור נמשך 45 דקות ונותרו 15 דקות, עבר 2/3 מהזמן!',
      '🎂 **עוגה:** אם העוגה חלקה ל-6 חלקים ואכלתם 4, אכלתם 4/6 = 2/3!',
      '💰 **כסף:** אם חסכתם 150 ש"ח מתוך 200 ש"ח שקיבלתם, חסכתם 150/200 = 3/4!'
    ],
    'multiplication': [
      '🚌 **אוטובוס:** אם באוטובוס 4 שורות עם 6 מושבים כל שורה, יש 24 מושבים!',
      '🍪 **עוגיות:** אם אפיתם 3 תבניות עם 12 עוגיות כל אחת, הכנתם 36 עוגיות!',
      '📚 **ספרים:** אם יש לכם 5 מדפים עם 8 ספרים כל מדף, יש לכם 40 ספרים!',
      '⚽ **כדורגל:** אם קבוצה שיחקה 6 משחקים וזכתה ב-4, זכתה ב-4/6 = 2/3 מהמשחקים!'
    ],
    'division': [
      '🍭 **ממתקים:** אם יש 24 ממתקים לחלוק ל-6 ילדים, כל ילד מקבל 4 ממתקים!',
      '📏 **סרט:** אם סרט באורך 3 מטר חתוך ל-6 חלקים שווים, כל חלק באורך 0.5 מטר!',
      '🕐 **שעות:** אם 60 דקות חולקות ל-12 חלקים, כל חלק הוא 5 דקות!',
      '🥤 **מיץ:** אם בקבוק של 2 ליטר מיץ לשתות ב-8 כוסות, כל כוס מקבלת 250 מ"ל!'
    ]
  };

  const relevantExamples = examples[concept] || examples['fractions'];
  return `## 🌍 דוגמאות מהחיים האמיתיים:\n\n${relevantExamples.map(example => `• ${example}`).join('\n')}\n`;
}

/**
 * Creates encouraging progress messages
 */
export function createEncouragementMessage(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const messages = {
    beginner: [
      '🎉 מעולה! אתם כבר מבינים את היסודות!',
      '⭐ כל הכבוד! המשיכו ככה!',
      '🌟 אתם מתקדמים יפה מאוד!',
      '💫 אתם אלופים מתחילים!'
    ],
    intermediate: [
      '🚀 וואו! אתם כבר ברמה בינונית!',
      '🏆 מצוין! אתם שולטים בחומר!',
      '🎯 בול! אתם מבינים את הרעיון!',
      '💪 אתם חזקים מאוד במתמטיקה!'
    ],
    advanced: [
      '👑 אתם מלכי המתמטיקה!',
      '🎖️ אלופים אמיתיים!',
      '🏅 ביצועים מעולים!',
      '🌠 אתם כוכבים!'
    ]
  };

  const randomMessage = messages[level][Math.floor(Math.random() * messages[level].length)];
  return `\n## ${randomMessage}\n\n**המשיכו להתאמן - אתם מדהימים!** ✨`;
}

/**
 * Creates interactive quiz questions with fun elements
 */
export function createInteractiveQuiz(questions: Array<{
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact?: string;
}>): string {
  return `## 🎯 תרגול אינטראקטיבי - בואו נראה אם הבנתם!

${questions.map((q, index) => {
  const options = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
  const funFact = q.funFact ? `\n\n🎭 **עובדה מעניינת:** ${q.funFact}` : '';

  return `### שאלה ${index + 1}: ${q.question}
${options}

**תשובה נכונה:** ${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}
**הסבר:** ${q.explanation}${funFact}`;
}).join('\n\n---\n\n')}

## 🏆 סיימתם את התרגול! כל הכבוד!`;
}

/**
 * Creates a complete engaging math lesson template
 */
export function createEngagingMathLesson(
  title: string,
  emoji: string,
  introduction: string,
  concepts: MathConcept[],
  realWorldExamples: string[] = [],
  quizQuestions: any[] = []
): string {
  const header = `# ${emoji} ${title}\n\n${introduction}\n`;

  const conceptsSection = concepts.map(concept => {
    const examples = concept.examples.map(example =>
      `### ${example.problem}\n${example.visual ? `${example.visual}\n` : ''}**פתרון:** ${example.solution}\n**הסבר:** ${example.explanation}`
    ).join('\n\n');

    const tips = concept.tips ? `\n\n💡 **טיפים לזכירה:**\n${concept.tips.map(tip => `• ${tip}`).join('\n')}` : '';

    return `## ${concept.emoji} ${concept.title}\n\n${concept.description}\n\n${examples}${tips}`;
  }).join('\n\n---\n\n');

  const realWorldSection = realWorldExamples.length > 0 ?
    `\n\n## 🌍 דוגמאות מהחיים האמיתיים\n\n${realWorldExamples.map(example => `• ${example}`).join('\n')}\n` : '';

  const quizSection = quizQuestions.length > 0 ?
    `\n\n${createInteractiveQuiz(quizQuestions)}\n` : '';

  const encouragement = '\n\n## 🎉 כל הכבוד! אתם מתקדמים יפה!\n\n**זכרו: מתמטיקה היא כמו שריר - ככל שתתאמנו יותר, היא תהיה חזקה יותר! 💪**';

  return header + conceptsSection + realWorldSection + quizSection + encouragement;
}
