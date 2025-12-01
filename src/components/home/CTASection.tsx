import Link from 'next/link';
import { Rocket, ArrowLeft } from 'lucide-react';

export default function CTASection() {
  return (
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
  );
}

