import Link from 'next/link';
import { BookOpen, PlayCircle, ArrowLeft } from 'lucide-react';
import { courses } from '@/lib/curriculum';

export default function CoursesPreviewSection() {
  return (
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
          {courses.map((course) => (
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
  );
}

