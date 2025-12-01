import { BookOpen, Sparkles, Gamepad2, Trophy } from 'lucide-react';

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

export default function HowItWorksSection() {
  return (
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
  );
}

