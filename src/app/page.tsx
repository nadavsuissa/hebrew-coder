'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Code2, Terminal, Gamepad2, Sparkles, ArrowLeft, 
  Trophy, BookOpen, Target, Zap, Users, Star, 
  CheckCircle, PlayCircle, HelpCircle, Rocket,
  TrendingUp, Award, Flame, Brain, Puzzle, Globe, Calculator, Scroll, Microscope
} from 'lucide-react';
import { courses } from '@/lib/curriculum';

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const stats = [
    { value: '4+', label: 'קורסים', icon: BookOpen, color: 'text-blue-400' },
    { value: '50+', label: 'שיעורים', icon: PlayCircle, color: 'text-purple-400' },
    { value: '20+', label: 'בוחנים', icon: HelpCircle, color: 'text-yellow-400' },
    { value: '5000+', label: 'XP אפשרי', icon: Trophy, color: 'text-green-400' },
  ];

  const features = [
    {
      icon: <Globe size={32} className="text-green-400" />,
      title: 'מגוון מקצועות',
      description: 'אנגלית, חשבון, מדעים, תנ"ך ותכנות. כל מקצועות הליבה במקום אחד.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      icon: <Gamepad2 size={32} className="text-purple-400" />,
      title: 'למידה דרך משחק',
      description: 'פתור חידות, שחק משחקים והרווח נקודות תוך כדי למידה.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: <Brain size={32} className="text-blue-400" />,
      title: 'מותאם לישראל',
      description: 'תוכנית הלימודים מותאמת למערכת החינוך בישראל, בעברית מלאה.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: <Zap size={32} className="text-orange-400" />,
      title: 'למידה הדרגתית',
      description: 'השיעורים בנויים ברמת קושי עולה, מהבסיס ועד להבנה עמוקה.',
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: <Target size={32} className="text-pink-400" />,
      title: 'משוב מיידי',
      description: 'קבל משוב מיידי על התשובות שלך, למד מהטעויות והשתפר.',
      gradient: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30'
    },
    {
      icon: <Award size={32} className="text-yellow-400" />,
      title: 'מערכת תגמולים',
      description: 'הרוויח XP, פתח תגים ושמור על רצף למידה יומי.',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30'
    },
  ];

  const howItWorks = [
    { 
      step: 1, 
      title: 'בחר קורס', 
      description: 'בחר מתוך מגוון הקורסים שלנו: אנגלית, חשבון, מדעים ועוד',
      icon: <BookOpen size={24} />,
      color: 'blue'
    },
    { 
      step: 2, 
      title: 'למד שיעורים', 
      description: 'קרא הסברים מעניינים וצפה בדוגמאות ברורות',
      icon: <Sparkles size={24} />,
      color: 'purple'
    },
    { 
      step: 3, 
      title: 'תרגל במשחק', 
      description: 'פתור חידונים ומשחקים אינטראקטיביים להטמעת החומר',
      icon: <Gamepad2 size={24} />,
      color: 'pink'
    },
    { 
      step: 4, 
      title: 'צבור נקודות', 
      description: 'הרווח XP ועלה דרגות ככל שתתקדם בלימודים',
      icon: <Trophy size={24} />,
      color: 'yellow'
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 text-blue-300 text-sm font-medium backdrop-blur-sm animate-fade-in-up">
              <Sparkles size={18} />
              <span>לומדים בכיף - חינם לחלוטין 🎉</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              המקום שבו לומדים
              <br />
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                את הכל
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              פלטפורמת לימוד אינטראקטיבית לילדים ונוער.
              <br />
              <span className="text-slate-400">אנגלית, חשבון, מדעים, תנ"ך ותכנות - הכל במקום אחד!</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link 
                href="/learn"
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  התחל ללמוד עכשיו
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                href="/dashboard"
                className="px-10 py-5 bg-slate-800/50 hover:bg-slate-800 rounded-2xl font-bold text-lg border-2 border-slate-700 hover:border-blue-500/50 transition-all backdrop-blur-sm"
              >
                אזור אישי
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105"
                >
                  <stat.icon className={`${stat.color} mb-3`} size={28} />
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              איך זה עובד?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              תהליך למידה פשוט ומהנה שמותאם בדיוק בשבילך
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-pink-500 to-yellow-500 transform translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {howItWorks.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} w-full`}>
                      <div className={`p-8 rounded-3xl bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-500/20 to-cyan-500/20' : item.color === 'purple' ? 'from-purple-500/20 to-pink-500/20' : item.color === 'pink' ? 'from-pink-500/20 to-rose-500/20' : 'from-yellow-500/20 to-amber-500/20'} border-2 ${item.color === 'blue' ? 'border-blue-500/30' : item.color === 'purple' ? 'border-purple-500/30' : item.color === 'pink' ? 'border-pink-500/30' : 'border-yellow-500/30'} backdrop-blur-sm hover:scale-105 transition-transform shadow-xl`}>
                        <div className={`flex items-center gap-4 mb-4 ${isEven ? '' : 'flex-row-reverse'}`}>
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-500 to-cyan-500' : item.color === 'purple' ? 'from-purple-500 to-pink-500' : item.color === 'pink' ? 'from-pink-500 to-rose-500' : 'from-yellow-500 to-amber-500'} text-white shadow-lg`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-400 mb-1">שלב {item.step}</div>
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-500 to-cyan-500' : item.color === 'purple' ? 'from-purple-500 to-pink-500' : item.color === 'pink' ? 'from-pink-500 to-rose-500' : 'from-yellow-500 to-amber-500'} flex items-center justify-center text-white font-black text-xl shadow-2xl border-4 border-[#0B1120]`}>
                        {item.step}
                      </div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              למה לבחור בנו?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              הפלטפורמה המובילה ללימוד חוויתי בישראל
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} border-2 ${feature.borderColor} backdrop-blur-sm transition-all duration-300 ${
                  hoveredFeature === index ? 'scale-105 shadow-2xl shadow-blue-500/20' : 'hover:scale-102'
                }`}
              >
                <div className="relative z-10">
                  <div className={`mb-6 w-16 h-16 rounded-2xl bg-slate-900/50 flex items-center justify-center group-hover:scale-110 transition-transform ${hoveredFeature === index ? 'rotate-6' : ''}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              הקורסים שלנו
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              בחר את הקורס שמתאים לך והתחל ללמוד
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Link
                key={course.id}
                href={`/learn/${course.id}`}
                className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${course.color || 'from-blue-500 to-purple-500'} flex items-center justify-center text-2xl shadow-lg`}>
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {course.modules.length} מודולים
                      </span>
                      <span className="flex items-center gap-1">
                        <PlayCircle size={14} />
                        {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} שיעורים
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>לכל הקורסים</span>
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-2 border-blue-500/30 backdrop-blur-sm overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat" />
            </div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6 shadow-2xl">
                <Rocket size={40} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                מוכן להתחיל?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                הצטרף לאלפי תלמידים שכבר לומדים ונהנים. זה חינם, זה כיף, וזה עובד!
              </p>
              <Link
                href="/learn"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>התחל עכשיו - זה חינם!</span>
                <ArrowLeft size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-[#0F172A] pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                  <Code2 size={24} />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Hebrew Code Monkey
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md mb-8">
                פלטפורמת הלימודים המובילה בישראל לילדים ונוער.
                אנחנו מאמינים שלכל ילד מגיעה ההזדמנות ללמוד, להתפתח ולהצליח בעולם המחר.
              </p>
              <div className="flex gap-4">
                {/* Social Links Placeholder */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                    <Globe size={20} />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">ניווט מהיר</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/learn" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <ArrowLeft size={16} />
                    קורסים
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <ArrowLeft size={16} />
                    אזור אישי
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <ArrowLeft size={16} />
                    אודותינו
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">צור קשר</h4>
              <ul className="space-y-4 text-slate-400">
                <li>support@hebrewcode.com</li>
                <li>תל אביב, ישראל</li>
                <li>*5555</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Hebrew Code Monkey. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
              <Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
