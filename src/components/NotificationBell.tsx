'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Info, UserPlus, MessageSquare, Star } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import Link from 'next/link';
import clsx from 'clsx';
import { Notification, NotificationType } from '@/types/notification';

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    setIsOpen(false);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'friend_request':
        return <UserPlus size={16} className="text-blue-400" />;
      case 'friend_accept':
        return <Check size={16} className="text-green-400" />;
      case 'chat_message':
        return <MessageSquare size={16} className="text-purple-400" />;
      case 'achievement':
        return <Star size={16} className="text-yellow-400" />;
      default:
        return <Info size={16} className="text-slate-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `לפני ${minutes} דקות`;
    }
    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `לפני ${hours} שעות`;
    }
    // Date
    return date.toLocaleDateString('he-IL');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-slate-900"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-white">התראות</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => markAllAsRead()}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                סמן הכל כנקרא
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                אין התראות חדשות
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {notifications.map((notification) => (
                  <Link 
                    href={notification.link || '#'} 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={clsx(
                      "block p-4 hover:bg-slate-800/50 transition-colors",
                      !notification.read ? "bg-slate-800/20" : ""
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        !notification.read ? "bg-slate-800" : "bg-slate-800/50"
                      )}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={clsx(
                          "text-sm font-medium mb-0.5",
                          !notification.read ? "text-white" : "text-slate-300"
                        )}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-1">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1"></div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

