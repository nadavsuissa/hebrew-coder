'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { getCourse } from '@/lib/curriculum';
import { MessageSquare, Plus, Search, Clock, Lock, Pin, MessageCircle, X, ArrowRight, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { ForumThread } from '@/types/forum';
import Avatar from '@/components/Avatar';

export default function CourseForum() {
  const params = useParams();
  const courseId = params.courseId as string;
  const { user } = useAuthStore();
  const course = getCourse(courseId);

  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadThreads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch(`/api/forum/threads?courseId=${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to load threads');
      }
    } catch (error) {
      console.error('Error loading threads:', error);
      setError('Failed to load threads. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [user, courseId]);

  useEffect(() => {
    if (user) {
      loadThreads();
    }
  }, [user, loadThreads]);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    try {
      setSubmitting(true);
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId,
          title: newThreadTitle,
          content: newThreadContent
        })
      });

      if (response.ok) {
        await response.json();
        setShowNewThreadModal(false);
        setNewThreadTitle('');
        setNewThreadContent('');
        loadThreads(); // Reload threads
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create thread');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (!course) return <div>Course not found</div>;

  const filteredThreads = threads.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={clsx("absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20", `bg-gradient-to-br ${course.color}`)} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/learn/${courseId}`}
                className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-colors text-slate-400 hover:text-white border border-transparent hover:border-slate-700/50"
              >
                <ArrowRight size={20} />
              </Link>
              <div className={clsx(
                "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-black/20",
                `bg-gradient-to-br ${course.color}`
              )}>
                {course.icon}
              </div>
              <div>
                <h1 className="font-bold text-xl flex items-center gap-2">
                  פורום {course.title}
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/5">
                    קהילה
                  </span>
                </h1>
                <p className="text-xs text-slate-400">שאלות, דיונים ועזרה הדדית</p>
              </div>
            </div>

            <button
              onClick={() => setShowNewThreadModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">דיון חדש</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Search */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="חפש דיונים, שאלות או נושאים..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-4 bg-slate-900/90 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-xl"
            />
          </div>
        </div>

        {/* Threads List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-slate-400 animate-pulse">טוען דיונים...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-500/5 rounded-2xl border border-red-500/10 backdrop-blur-sm">
             <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <X className="text-red-400" size={32} />
             </div>
             <p className="text-red-400 font-bold mb-2 text-lg">שגיאה בטעינת הדיונים</p>
             <p className="text-sm text-red-300/70 mb-6 max-w-md mx-auto">{error}</p>
             <button 
               onClick={loadThreads}
               className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium transition-all"
             >
               נסה שוב
             </button>
          </div>
        ) : filteredThreads.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-700/30 border-dashed backdrop-blur-sm">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <MessageSquare className="text-slate-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">אין דיונים עדיין</h3>
            <p className="text-slate-400 mb-8 max-w-xs mx-auto">הפורום ריק כרגע. היה הראשון לפתוח דיון, לשאול שאלה או לשתף ידע!</p>
            <button
              onClick={() => setShowNewThreadModal(true)}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-medium transition-all inline-flex items-center gap-3 hover:scale-105"
            >
              <Sparkles size={18} className="text-yellow-400" />
              פתח דיון ראשון
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <Link
                key={thread.id}
                href={`/learn/${courseId}/forum/${thread.id}`}
                className="block group"
              >
                <div className="bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-md border border-slate-700/40 hover:border-blue-500/30 rounded-2xl p-5 transition-all hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-0.5 relative overflow-hidden">
                  {/* Hover Gradient Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-start gap-5">
                    {/* Avatar / Icon */}
                    <div className="hidden sm:flex flex-col items-center gap-2 min-w-[60px]">
                       <Avatar 
                         photoURL={user && thread.authorId === user.uid ? user.photoURL : thread.authorPhotoURL} 
                         displayName={thread.authorName} 
                         size="lg"
                         className="shadow-md border border-white/5 transition-transform group-hover:scale-105"
                       />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Tags & Badges */}
                      <div className="flex items-center gap-2 mb-2">
                        {thread.isPinned && (
                          <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Pin size={10} className="rotate-45" /> נעוץ
                          </span>
                        )}
                        {thread.isLocked && (
                          <span className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Lock size={10} /> נעול
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-slate-700/30 text-slate-400 border border-slate-700/30 rounded-md text-[10px] font-medium">
                          דיון כללי
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors truncate pr-1">
                        {thread.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4 group-hover:text-slate-300 transition-colors pl-4 border-l-2 border-slate-700/30 my-2">
                        {thread.content}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-lg">
                          <User size={12} className="text-blue-400" />
                          <span className="font-medium text-slate-300">{thread.authorName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {new Date(thread.createdAt).toLocaleDateString('he-IL')}
                        </div>
                        {thread.lastReplyAt && (
                          <div className="flex items-center gap-1.5 text-blue-400/80 hidden sm:flex">
                            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                            <MessageCircle size={12} />
                            תגובה אחרונה ע״י <span className="font-medium">{thread.lastReplyAuthorName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-2 pl-2 border-l border-slate-700/30 min-w-[80px]">
                      <div className="text-center p-2 bg-slate-800/30 rounded-xl group-hover:bg-slate-800/60 transition-colors">
                        <div className="text-lg font-bold text-slate-200 group-hover:text-blue-400">
                          {thread.replyCount}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">תגובות</div>
                      </div>
                      <div className="text-center p-1">
                        <div className="text-xs font-medium text-slate-500 group-hover:text-slate-400">
                          {thread.viewCount} צפיות
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0F172A] border border-slate-700/50 rounded-3xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 relative overflow-hidden">
            {/* Modal Header Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                   <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">דיון חדש</h2>
                  <p className="text-xs text-slate-400">שתף את המחשבות שלך עם הקהילה</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewThreadModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateThread} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">כותרת הדיון</label>
                <div className="relative">
                   <input
                    type="text"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                    placeholder="במה תרצה לדון היום?"
                    className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">תוכן</label>
                <div className="relative">
                  <textarea
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                    placeholder="פרט את שאלתך, הרעיון שלך או הנושא לדיון..."
                    rows={8}
                    className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all leading-relaxed"
                    required
                  />
                </div>
                <div className="mt-3 flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <Sparkles size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-300/80">
                    נא לשמור על שפה נאותה ומכבדת. התוכן עובר סינון אוטומטי למניעת מילים פוגעניות.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="px-5 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      מפרסם...
                    </>
                  ) : (
                    <>
                      פרסם דיון
                      <ArrowRight size={18} className="rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
