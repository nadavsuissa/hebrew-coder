import { User, Code, BookOpen, Target, Heart, Mail, MapPin, Phone, GraduationCap, Briefcase } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            אודותינו
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            הכירו את האדם מאחורי Hebrew Code Monkey והחזון שמניע אותנו
          </p>
        </div>
      </div>

      {/* Personal Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <User size={64} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-center md:text-right">נדב סויסה</h2>
              <p className="text-slate-300 text-lg mb-6 text-center md:text-right">
                יוצר ומפתח של Hebrew Code Monkey
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <span>בוגר תואר במדעי המחשב ומתמטיקה מאוניברסיטת אריאל</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  <span>מפתח תוכנה מלא סטאק עם התמחות בטכנולוגיות מודרניות</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Code className="w-5 h-5 text-green-400" />
                  <span>מפתח Next.js, React, TypeScript ו-Node.js</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">המסע שלי</h3>
              <div className="space-y-4 text-slate-300">
                <p>
                  בן 31, עם תשוקה עמוקה לטכנולוגיה ולחינוך. התחלתי את המסע שלי בעולם התכנות בגיל צעיר,
                  והיום אני מאמין שחינוך טכנולוגי צריך להיות זמין לכולם, במיוחד בלשון האם שלהם.
                </p>
                <p>
                  כבוגר תואר במדעי המחשב ומתמטיקה מאוניברסיטת אריאל, אני מביא ניסיון רב בתחום הפיתוח
                  ובהוראת מתמטיקה. האמונה שלי היא שכשאתה לומד תכנות בשפה שאתה מכיר היטב,
                  התהליך הופך להיות הרבה יותר אינטואיטיבי ומהנה.
                </p>
                <p>
                  Hebrew Code Monkey הוא הפרויקט האישי שלי שנועד לגשר על הפער בין הטכנולוגיה
                  לבין הקהילה העברית-ישראלית, ולהפוך את עולם הקוד לנגיש ומזמין יותר.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">החזון שלנו</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                להפוך את לימוד התכנות לחוויה מהנה ונגישה לכל דובר עברית.
                אנחנו מאמינים שטכנולוגיה היא הכלי לחדשנות, ולכן היא צריכה להיות נגישה לכולם.
              </p>
              <p>
                הפלטפורמה שלנו מציעה למידה אינטראקטיבית עם תוכן מקצועי,
                תרגולים מעשיים, ובדיקות ידע שיעזרו לכם להפוך למפתחים מיומנים.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">מה אנחנו מציעים</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>קורסי Python מלאים בעברית</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>תרגולים אינטראקטיביים ופרויקטים מעשיים</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>מערכת בדיקות ידע ותעודות סיום</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>קהילת לומדים תומכת</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>קורסי מתמטיקה וחינוך כללי</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-slate-800 p-8 mb-12">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">המשימה שלנו</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">חינוך נגיש</h4>
              <p className="text-slate-300">
                להפוך את לימוד התכנות לנגיש לכל דובר עברית,
                ללא צורך בידע מוקדם באנגלית טכנית.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">למידה מעשית</h4>
              <p className="text-slate-300">
                שילוב של תיאוריה עם תרגולים אינטראקטיביים,
                פרויקטים אמיתיים, ומערכת משוב מיידית.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">קהילה תומכת</h4>
              <p className="text-slate-300">
                בניית קהילה של לומדים ומפתחים שתומכת זה בזה,
                משתפת ידע, ומתפתחת יחד.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8">
          <h3 className="text-3xl font-bold text-center mb-8">צור קשר</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2">אימייל</h4>
              <p className="text-slate-300">support@hebrewcode.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2">מיקום</h4>
              <p className="text-slate-300">תל אביב, ישראל</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2">טלפון</h4>
              <p className="text-slate-300">*5555</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400">
              יש לך שאלות או משוב? אנחנו תמיד שמחים לשמוע ממך!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
