'use client';

import { MathContent } from '@/components/MathContent';
import { createFractionMultiplicationLesson, createFractionAdditionSubtractionLesson } from '@/lib/math-content-helpers';

export default function MathDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          🎯 דמו של מערכת העברת המתמטיקה
        </h1>

        <div className="grid gap-8">
          {/* Basic Math Rendering */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-green-400">📐 דוגמאות בסיסיות</h2>
            <MathContent
              content={`
הנה כמה דוגמאות של שברים:
- שבר פשוט: 1/2
- חיבור שברים: 1/3 + 1/6 = 1/2
- כפל שברים: 2/3 × 4/5 = 8/15
- חילוק שברים: 3/4 ÷ 2/5 = 15/8

ונוסחאות מתמטיות:
- שטח מלבן: אורך × רוחב
- היקף מלבן: 2 × (אורך + רוחב)
- ממוצע: (סכום כל המספרים) ÷ (מספר המספרים)
              `}
            />
          </div>

          {/* Fraction Multiplication Lesson */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">🍕 שיעור כפל שברים</h2>
            <MathContent
              content={createFractionMultiplicationLesson()}
            />
          </div>

          {/* Fraction Addition Lesson */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">➕➖ שיעור חיבור שברים</h2>
            <MathContent
              content={createFractionAdditionSubtractionLesson()}
            />
          </div>

          {/* Advanced Examples */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-red-400">🔬 דוגמאות מתקדמות</h2>
            <MathContent
              content={`
## פתרון בעיות מורכבות

### תרגיל 1: חישוב שטח משולש
יש משולש עם בסיס 12 ס"מ וגובה 8 ס"מ.
מה השטח?

**פתרון:**
שטח משולש = (בסיס × גובה) ÷ 2
שטח משולש = (12 × 8) ÷ 2
שטח משולש = 96 ÷ 2
**שטח משולש = 48 סמ"ר**

### תרגיל 2: חילוק שברים
חלק את 5/6 ב-2/3.

**פתרון:**
5/6 ÷ 2/3 = 5/6 × 3/2 = (5 × 3) ÷ (6 × 2) = 15 ÷ 12 = 5/4

**תוצאה:** 5/6 ÷ 2/3 = 5/4 = 1 ו-1/4

### תרגיל 3: משוואה עם שברים
פתור: 2/3x + 1/4 = 5/6

**פתרון:**
2/3x = 5/6 - 1/4
2/3x = 10/12 - 3/12
2/3x = 7/12
x = (7/12) × (3/2)
**x = 7/8**
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


