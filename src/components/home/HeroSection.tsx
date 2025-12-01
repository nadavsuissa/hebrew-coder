import Link from 'next/link';
import { 
  ArrowLeft, Sparkles, Trophy, BookOpen, PlayCircle, HelpCircle 
} from 'lucide-react';

const stats = [
  { value: '4+', label: 'קורסים', icon: BookOpen, color: 'text-blue-400' },
  { value: '50+', label: 'שיעורים', icon: PlayCircle, color: 'text-purple-400' },
  { value: '20+', label: 'בוחנים', icon: HelpCircle, color: 'text-yellow-400' },
  { value: '5000+', label: 'XP אפשרי', icon: Trophy, color: 'text-green-400' },
];

export default function HeroSection() {
  return (
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
            <span className="text-slate-400">אנגלית, חשבון, מדעים, תנ&quot;ך ותכנות - הכל במקום אחד!</span>
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
  );
}

