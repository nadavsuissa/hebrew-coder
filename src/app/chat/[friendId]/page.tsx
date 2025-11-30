'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Send, User, MessageSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: string;
  createdAt: string;
  read: boolean;
}

interface Friend {
  id: string;
  displayName: string;
  email: string;
  isOnline: boolean;
}

interface ChatData {
  friend: Friend;
  messages: Message[];
}

export default function ChatPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const friendId = params.friendId as string;
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [loadingChat, setLoadingChat] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && friendId) {
      loadChat();
      // Set up periodic refresh for new messages
      const interval = setInterval(loadChat, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [user, friendId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData?.messages]);

  const loadChat = async () => {
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch(`/api/chat?friendId=${friendId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChatData(data);
      } else if (response.status === 403) {
        // Not friends, redirect to friends page
        router.push('/friends');
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    } finally {
      setLoadingChat(false);
    }
  };


  const sendMessage = async () => {
    if (!message.trim() || !chatData) return;

    setSending(true);
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          friendId,
          content: message.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Add the new message to the chat
        setChatData(prev => prev ? {
          ...prev,
          messages: [...prev.messages, data.message]
        } : null);
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  if (!user || loading || loadingChat) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>טוען צ'אט...</p>
        </div>
      </div>
    );
  }

  if (!chatData) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <MessageSquare className="mx-auto mb-4 text-slate-600" size={64} />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">שגיאה בטעינת הצ'אט</h3>
          <Link
            href="/friends"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            חזור לחברים
          </Link>
        </div>
      </div>
    );
  }

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
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {chatData.friend.displayName[0].toUpperCase()}
                  </div>
                  {chatData.friend.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                <div>
                  <h1 className="font-semibold text-white">{chatData.friend.displayName}</h1>
                  <p className="text-sm text-slate-400">
                    {chatData.friend.isOnline ? 'מחובר' : 'לא מחובר'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                {chatData.messages.length} הודעות
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {chatData.messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto mb-4 text-slate-600" size={48} />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">אין הודעות עדיין</h3>
            <p className="text-slate-500 mb-4">התחל שיחה עם {chatData.friend.displayName}!</p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Heart className="text-pink-400" size={16} />
              <span>שתפו ידע ולמדו יחד</span>
            </div>
          </div>
        ) : (
          <>
            {chatData.messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === user.uid;
              const showDate = index === 0 ||
                formatDate(msg.createdAt) !== formatDate(chatData.messages[index - 1].createdAt);

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
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {chatData.friend.displayName[0].toUpperCase()}
                      </div>
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
                placeholder={`כתוב הודעה ל${chatData.friend.displayName}...`}
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
