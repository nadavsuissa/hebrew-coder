'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Send, MessageSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: string;
  createdAt: string; // ISO string (converted from Firestore timestamp)
  read: boolean;
}

interface Friend {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  isOnline: boolean;
}

export default function ChatPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const friendId = params.friendId as string;
  
  const [friend, setFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Auth Check
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // 2. Load Friend Details (Once)
  useEffect(() => {
    if (user && friendId) {
      const fetchFriend = async () => {
        try {
           const token = await user.getIdToken();
           // We reuse the existing API for fetching friend details to check friendship status
           const response = await fetch(`/api/chat?friendId=${friendId}`, {
             headers: { 'Authorization': `Bearer ${token}` }
           });
           
           if (response.ok) {
             const data = await response.json();
             setFriend(data.friend);
           } else {
             router.push('/friends');
           }
        } catch (error) {
           console.error("Failed to load friend", error);
        }
      };
      fetchFriend();
    }
  }, [user, friendId, router]);

  // 3. Real-time Messages Listener
  useEffect(() => {
    if (!user || !friendId) return;

    const conversationId = [user.uid, friendId].sort().join('_');
    const messagesRef = collection(db, 'messages');
    const q = query(
        messagesRef, 
        where('conversationId', '==', conversationId),
        where('participants', 'array-contains', user.uid),
        orderBy('createdAt', 'asc'),
        limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => {
            const data = doc.data();
            // Handle Firestore Timestamp
            let createdAt = data.createdAt;
            if (createdAt?.toDate) {
                createdAt = createdAt.toDate().toISOString();
            } else if (!createdAt) {
                createdAt = new Date().toISOString();
            }

            return {
                id: doc.id,
                ...data,
                createdAt
            } as Message;
        });
        setMessages(msgs);
        setLoadingChat(false);
    }, (error) => {
        console.error("Chat Listener Error:", error);
        setLoadingChat(false);
    });

    return () => unsubscribe();
  }, [user, friendId]);

  // 4. Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    setSending(true);
    try {
      // Direct Firestore write for low latency
      // Security rules should validate this!
      const conversationId = [user.uid, friendId].sort().join('_');
      
      await addDoc(collection(db, 'messages'), {
          conversationId,
          senderId: user.uid,
          receiverId: friendId,
          participants: [user.uid, friendId],
          content: message.trim(),
          messageType: 'text',
          createdAt: serverTimestamp(),
          read: false
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to API if direct write fails (e.g. due to strict rules not yet updated)
      // But for now, let's assume we will update rules or this works.
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'היום';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'אתמול';
    } else {
      return date.toLocaleDateString('he-IL');
    }
  };

  if (loading || loadingChat || !friend) {
     // ... same loading state ...
     return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>טוען צ&apos;אט...</p>
        </div>
      </div>
    );
  }

  // Render is mostly same, just using local state variables
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1a1f3a] text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/friends"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar 
                    photoURL={friend.photoURL} 
                    displayName={friend.displayName} 
                    size="md" 
                  />
                  {friend.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                <div>
                  <h1 className="font-semibold text-white">{friend.displayName}</h1>
                  <p className="text-sm text-slate-400">
                    {friend.isOnline ? 'מחובר' : 'לא מחובר'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                {messages.length} הודעות
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto mb-4 text-slate-600" size={48} />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">אין הודעות עדיין</h3>
            <p className="text-slate-500 mb-4">התחל שיחה עם {friend.displayName}!</p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Heart className="text-pink-400" size={16} />
              <span>שתפו ידע ולמדו יחד</span>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === user?.uid;
              const showDate = index === 0 ||
                formatDate(msg.createdAt) !== formatDate(messages[index - 1].createdAt);

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-sm rounded-full">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  )}

                  <div className={clsx(
                    "flex gap-3 max-w-2xl",
                    isOwnMessage ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}>
                    {!isOwnMessage && (
                      <Avatar 
                        photoURL={friend.photoURL} 
                        displayName={friend.displayName} 
                        size="sm" 
                      />
                    )}

                    <div className={clsx(
                      "px-4 py-3 rounded-2xl max-w-xs lg:max-w-md",
                      isOwnMessage
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                        : "bg-slate-800/50 text-white"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className={clsx(
                        "text-xs mt-2",
                        isOwnMessage ? "text-pink-200" : "text-slate-400"
                      )}>
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800 sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`כתוב הודעה ל${friend.displayName}...`}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim() || sending}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center gap-2"
            >
              {sending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
