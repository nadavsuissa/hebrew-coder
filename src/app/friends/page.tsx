'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, MessageSquare, Search, Check, X, UserMinus, Clock, UserCheck, Trophy } from 'lucide-react';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';

interface Friend {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  xp: number;
  lastLoginAt: string;
  isOnline: boolean;
}

interface FriendRequest {
  id: string;
  toUser?: {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
  };
  fromUser?: {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
  };
  createdAt: string;
}

interface FriendsData {
  friends: Friend[];
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
}

interface SearchResult {
  id: string;
  displayName?: string;
  email: string;
  photoURL?: string;
}

export default function FriendsPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [friendsData, setFriendsData] = useState<FriendsData>({
    friends: [],
    sentRequests: [],
    receivedRequests: []
  });
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'add' | 'leaderboard'>('friends');

  const loadFriends = useCallback(async () => {
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/friends', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setFriendsData(data);
      }
    } catch (error) {
      console.error('Error loading friends:', error);
    } finally {
      setLoadingFriends(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadFriends();
      const interval = setInterval(loadFriends, 30000);
      return () => clearInterval(interval);
    }
  }, [user, loadFriends]);

  const searchUsers = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
          const data = await response.json();
          // Filter out existing friends and self
          const filtered = data.users.filter((u: SearchResult) =>
              u.id !== user?.uid &&
              !friendsData.friends.some(f => f.id === u.id)
          );
          setSearchResults(filtered);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearching(false);
    }
  };

  const sendFriendRequest = async (targetUserId: string) => {
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'send_request',
          targetUserId
        })
      });

      if (response.ok) {
        loadFriends();
        setSearchQuery('');
        setSearchResults([]);
        setActiveTab('requests');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'accept_request',
          requestId
        })
      });

      if (response.ok) {
        loadFriends();
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const declineFriendRequest = async (requestId: string) => {
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'decline_request',
          requestId
        })
      });

      if (response.ok) {
        loadFriends();
      }
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  const removeFriend = async (friendId: string) => {
    if (!confirm('האם אתה בטוח שברצונך להסיר את החבר הזה?')) return;

    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'remove_friend',
          targetUserId: friendId
        })
      });

      if (response.ok) {
        loadFriends();
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const startChat = (friendId: string) => {
    router.push(`/chat/${friendId}`);
  };

  if (!user || loading || loadingFriends) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>טוען חברים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1a1f3a] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  👥
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    החברים שלי
                  </h1>
                  <p className="text-slate-300 mt-1">
                    התחבר עם חברים, התחרה בטבלה ולמד יחד
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">{friendsData.friends.length}</div>
                  <div className="text-xs text-slate-500">חברים</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{friendsData.receivedRequests.length}</div>
                  <div className="text-xs text-slate-500">בקשות</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-slate-800/50 backdrop-blur-xl p-2 rounded-2xl border border-slate-700/50 overflow-x-auto">
            {[
              { id: 'friends', label: 'חברים', icon: Users, count: friendsData.friends.length },
              { id: 'leaderboard', label: 'טבלת מובילים', icon: Trophy },
              { id: 'requests', label: 'בקשות', icon: UserPlus, count: friendsData.receivedRequests.length },
              { id: 'add', label: 'הוסף חברים', icon: Search }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'friends' | 'requests' | 'add' | 'leaderboard')}
                className={clsx(
                  "flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                )}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'friends' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friendsData.friends.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Users className="mx-auto mb-4 text-slate-600" size={64} />
                    <h3 className="text-xl font-semibold text-slate-400 mb-2">אין לך חברים עדיין</h3>
                    <p className="text-slate-500 mb-4">התחל להוסיף חברים כדי ללמוד יחד!</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl font-bold shadow-lg transition-all hover:scale-105"
                    >
                      הוסף חברים
                    </button>
                  </div>
                ) : (
                  friendsData.friends.map((friend) => (
                    <div key={friend.id} className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-pink-500/30 transition-all group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar 
                              photoURL={friend.photoURL} 
                              displayName={friend.displayName} 
                              size="lg" 
                              className="shadow-lg group-hover:scale-110 transition-transform"
                            />
                            {friend.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{friend.displayName}</h3>
                            <p className="text-sm text-blue-400 font-mono font-bold">{friend.xp} XP</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startChat(friend.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors"
                        >
                          <MessageSquare size={16} />
                          <span>צ&apos;אט</span>
                        </button>
                        <button
                          onClick={() => removeFriend(friend.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="הסר חבר"
                        >
                          <UserMinus size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'leaderboard' && (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="p-6 border-b border-slate-700/50">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Trophy className="text-yellow-400" />
                            מובילים בניקוד
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-700/50">
                        {[...friendsData.friends].sort((a, b) => b.xp - a.xp).map((friend, index) => (
                            <div key={friend.id} className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "w-8 h-8 flex items-center justify-center font-bold rounded-full",
                                        index === 0 ? "bg-yellow-500 text-black" : 
                                        index === 1 ? "bg-slate-400 text-black" :
                                        index === 2 ? "bg-orange-600 text-white" :
                                        "bg-slate-800 text-slate-500"
                                    )}>
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Avatar 
                                          photoURL={friend.photoURL} 
                                          displayName={friend.displayName} 
                                          size="md" 
                                        />
                                        <span className="font-medium">{friend.displayName}</span>
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-blue-400">
                                    {friend.xp} XP
                                </div>
                            </div>
                        ))}
                        {friendsData.friends.length === 0 && (
                             <div className="p-8 text-center text-slate-500">
                                 הוסף חברים כדי לראות מי מוביל!
                             </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-6">
                {/* Received Requests */}
                {friendsData.receivedRequests.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <UserCheck className="text-green-400" size={24} />
                      בקשות שקיבלתי
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {friendsData.receivedRequests.map((request) => (
                        <div key={request.id} className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar 
                                photoURL={request.fromUser?.photoURL} 
                                displayName={request.fromUser?.displayName} 
                                size="md" 
                              />
                              <div>
                                <p className="font-semibold text-white">{request.fromUser?.displayName}</p>
                                <p className="text-sm text-slate-400">{request.fromUser?.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => acceptFriendRequest(request.id)}
                                className="p-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors"
                                title="קבל"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => declineFriendRequest(request.id)}
                                className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                                title="דחה"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sent Requests */}
                {friendsData.sentRequests.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Clock className="text-yellow-400" size={24} />
                      בקשות ששלחתי
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {friendsData.sentRequests.map((request) => (
                        <div key={request.id} className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50 opacity-75">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar 
                                photoURL={request.toUser?.photoURL} 
                                displayName={request.toUser?.displayName} 
                                size="md" 
                              />
                              <div>
                                <p className="font-semibold text-white">{request.toUser?.displayName}</p>
                                <p className="text-sm text-slate-400">{request.toUser?.email}</p>
                              </div>
                            </div>
                            <div className="text-sm text-slate-500">ממתין לאישור</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {friendsData.receivedRequests.length === 0 && friendsData.sentRequests.length === 0 && (
                  <div className="text-center py-12">
                    <UserPlus className="mx-auto mb-4 text-slate-600" size={64} />
                    <h3 className="text-xl font-semibold text-slate-400 mb-2">אין בקשות חברות</h3>
                    <p className="text-slate-500">כשתקבל או תשלח בקשות חברות, הן יופיעו כאן</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'add' && (
              <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
                  <h3 className="text-xl font-semibold mb-4">חפש חברים</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="הקלד שם (מינימום 3 תווים)..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        // Debounce needed ideally, but simple implementation for now
                        if (e.target.value.length >= 3) searchUsers(e.target.value);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  {searching && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {searchResults.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              photoURL={user.photoURL} 
                              displayName={user.displayName} 
                              size="md" 
                            />
                            <div>
                              <p className="font-semibold text-white">{user.displayName}</p>
                              <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => sendFriendRequest(user.id)}
                            className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
                          >
                            <UserPlus size={16} />
                            <span>הוסף</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchQuery.length >= 3 && !searching && searchResults.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="mx-auto mb-4 text-slate-600" size={48} />
                      <p className="text-slate-500">לא נמצאו משתמשים</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
