'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { getCourse } from '@/lib/curriculum';
import { ArrowLeft, Clock, Send, Lock, Share2, MoreVertical, Heart, Reply } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { ForumThread, ForumPost } from '@/types/forum';

export default function ThreadView() {
  const params = useParams();
  const courseId = params.courseId as string;
  const threadId = params.threadId as string;
  const { user } = useAuthStore();
  const course = getCourse(courseId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [thread, setThread] = useState<ForumThread | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadThreadData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await user?.getIdToken();
      if (!token) return;

      // Load thread details
      const threadResponse = await fetch(`/api/forum/threads?threadId=${threadId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (threadResponse.ok) {
        const data = await threadResponse.json();
        setThread(data.thread);
      }

      // Load posts
      const postsResponse = await fetch(`/api/forum/posts?threadId=${threadId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (postsResponse.ok) {
        const data = await postsResponse.json();
        setPosts(data.posts);
      } else {
         // Log error if fetch fails (e.g. missing index)
         const errorData = await postsResponse.json();
         console.error('Failed to load posts:', errorData);
      }

    } catch (error) {
      console.error('Error loading thread data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, threadId]);

  useEffect(() => {
    if (user && threadId) {
      loadThreadData();
    }
  }, [user, threadId, loadThreadData]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          threadId,
          content: replyContent
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(prev => [...prev, data.post]);
        setReplyContent('');
        setTimeout(scrollToBottom, 100);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (!course) return <div>Course not found</div>;
  if (loading && !thread) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!thread) return <div>Thread not found</div>;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative">
       {/* Background Gradients */}
       <div className="fixed inset-0 pointer-events-none">
        <div className={clsx("absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20", `bg-gradient-to-br ${course.color}`)} />
      </div>

      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href={`/learn/${courseId}/forum`}
              className="p-2 hover:bg-slate-800/50 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg truncate">{thread.title}</h1>
                {thread.isLocked && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-400 rounded-md text-[10px] font-bold border border-red-500/20">
                    <Lock size={10} />
                    נעול
                  </div>
                )}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>פורסם ע״י {thread.authorName}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>{new Date(thread.createdAt).toLocaleDateString('he-IL')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-32 relative z-10">
        {/* Original Post */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
          <div className="p-5 border-b border-slate-700/50 flex items-start justify-between bg-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {thread.authorName[0].toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-white text-lg">{thread.authorName}</div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md font-medium border border-blue-500/20">
                    מחבר הדיון
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="flex items-center gap-1">
                     <Clock size={12} />
                     {new Date(thread.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
          <div className="p-8 text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
            {thread.content}
          </div>
          <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/30 flex items-center gap-4">
             <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
               <Heart size={18} />
               <span>לייק</span>
             </button>
             <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
               <Share2 size={18} />
               <span>שתף</span>
             </button>
          </div>
        </div>

        {/* Divider */}
        {posts.length > 0 && (
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-slate-500 text-sm font-medium px-2">{posts.length} תגובות</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>
        )}

        {/* Replies */}
        {posts.length > 0 && (
           <div className="space-y-6">
              {posts.map((post, index) => (
                <div key={post.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex-shrink-0">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/5",
                      post.authorId === thread.authorId ? "bg-blue-600" : "bg-slate-700"
                    )}>
                      {post.authorName[0].toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                     <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl rounded-tr-none p-4 hover:bg-slate-800/50 transition-colors relative group-hover:shadow-lg group-hover:shadow-black/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{post.authorName}</span>
                            {post.authorId === thread.authorId && (
                              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-medium border border-blue-500/10">OP</span>
                            )}
                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                            <span className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleString('he-IL')}</span>
                          </div>
                        </div>
                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </div>
                     </div>
                     <div className="flex items-center gap-4 mt-1 px-2">
                        <button className="text-xs text-slate-500 hover:text-blue-400 font-medium transition-colors flex items-center gap-1">
                          <Heart size={12} />
                          לייק
                        </button>
                        <button className="text-xs text-slate-500 hover:text-blue-400 font-medium transition-colors flex items-center gap-1">
                          <Reply size={12} />
                          הגב
                        </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Box */}
      {!thread.isLocked ? (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0B1120]/80 backdrop-blur-xl border-t border-slate-800/50 p-4 z-50 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleReply} className="flex items-end gap-3 bg-slate-900/50 border border-slate-700/50 p-2 rounded-2xl shadow-lg relative group focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all">
              <div className="flex-1">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="כתוב תגובה..."
                  className="w-full px-4 py-3 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 resize-none h-[50px] min-h-[50px] max-h-[150px] leading-relaxed"
                  style={{ minHeight: '50px' }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !replyContent.trim()}
                className={clsx(
                  "p-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center mb-1 mr-1",
                  replyContent.trim() 
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 hover:scale-105" 
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                )}
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/50 border-t-white"></div>
                ) : (
                  <Send size={20} className={clsx("transition-transform", replyContent.trim() && "rotate-[-45deg] translate-x-0.5 -translate-y-0.5")} />
                )}
              </button>
            </form>
            <div className="text-center mt-2 opacity-0 transition-opacity duration-500" style={{ opacity: replyContent.trim() ? 1 : 0 }}>
              <p className="text-[10px] text-slate-500">
                נא לשמור על שיח מכבד. התוכן עובר סינון אוטומטי.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-6 z-50">
          <div className="max-w-4xl mx-auto text-center text-slate-400 flex items-center justify-center gap-2">
            <Lock size={16} />
            <span>הדיון הזה נעול ולא ניתן להוסיף תגובות חדשות</span>
          </div>
        </div>
      )}
    </div>
  );
}

