import { useState } from 'react';
import { Globe, Gamepad2, Brain, Zap, Target, Award } from 'lucide-react';

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

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
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
  );
}

