import Link from 'next/link';
import { Code2, Globe, ArrowLeft } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}

