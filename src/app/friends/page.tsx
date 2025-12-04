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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20 transform hover:scale-105 transition-transform duration-300">
                👥
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  החברים שלי
                </h1>
                <p className="text-slate-400 mt-2 text-lg font-light">
                  התחבר, למד והתחרה עם חברים לדרך
                </p>
              </div>
            </div>

            <div className="flex gap-6 bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/5">
              <div className="px-6 py-2 text-center border-l border-white/10">
                <div className="text-2xl font-bold text-blue-400">{friendsData.friends.length}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">חברים</div>
              </div>
              <div className="px-6 py-2 text-center">
                <div className="text-2xl font-bold text-purple-400">{friendsData.receivedRequests.length}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">בקשות</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'friends', label: 'החברים שלי', icon: Users, count: friendsData.friends.length },
              { id: 'leaderboard', label: 'טבלת מובילים', icon: Trophy },
              { id: 'requests', label: 'בקשות חברות', icon: UserPlus, count: friendsData.receivedRequests.length },
              { id: 'add', label: 'חיפוש חברים', icon: Search }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={clsx(
                    "px-2 py-0.5 rounded-full text-xs font-bold",
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-blue-500/20 text-blue-400"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="min-h-[400px]">
            {activeTab === 'friends' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friendsData.friends.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white/5 rounded-3xl border border-white/5 border-dashed">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                      <Users className="text-slate-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">עדיין אין חברים</h3>
                    <p className="text-slate-400 mb-8 max-w-sm mx-auto">הוסף חברים כדי לראות את ההתקדמות שלהם, להתחרות בטבלה וללמוד יחד!</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <UserPlus size={20} />
                      מצא חברים חדשים
                    </button>
                  </div>
                ) : (
                  friendsData.friends.map((friend) => (
                    <div key={friend.id} className="group bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar 
                              photoURL={friend.photoURL} 
                              displayName={friend.displayName} 
                              size="lg" 
                              className="ring-4 ring-slate-900 group-hover:ring-blue-500/20 transition-all"
                            />
                            <div className={clsx(
                              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-slate-900",
                              friend.isOnline ? "bg-green-500" : "bg-slate-500"
                            )} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{friend.displayName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Trophy size={14} className="text-yellow-500" />
                              <span className="text-sm font-mono font-medium text-yellow-500">{friend.xp.toLocaleString()} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => startChat(friend.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl transition-colors font-medium"
                        >
                          <MessageSquare size={18} />
                          <span>הודעה</span>
                        </button>
                        <button
                          onClick={() => removeFriend(friend.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl transition-colors font-medium"
                        >
                          <UserMinus size={18} />
                          <span>הסר</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'leaderboard' && (
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 bg-gradient-to-r from-slate-800/50 to-transparent">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Trophy className="text-yellow-500" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">טבלת המובילים</h3>
                        </div>
                        <p className="text-slate-400">התחרה עם החברים שלך על המקום הראשון!</p>
                    </div>
                    
                    <div className="divide-y divide-white/5">
                        {[...friendsData.friends, { ...user, id: user?.uid, displayName: user?.displayName || 'אני', xp: (user as any)?.xp || 0, photoURL: user?.photoURL } as any]
                            .sort((a, b) => (b.xp || 0) - (a.xp || 0))
                            .map((person, index) => {
                                const isTop3 = index < 3;
                                const isMe = person.uid === user?.uid || person.id === user?.uid;
                                
                                return (
                                    <div key={person.id || person.uid} 
                                        className={clsx(
                                            "p-6 flex items-center justify-between transition-colors",
                                            isMe ? "bg-blue-500/5 hover:bg-blue-500/10" : "hover:bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={clsx(
                                                "w-10 h-10 flex items-center justify-center font-bold text-lg rounded-xl",
                                                index === 0 ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-white shadow-lg shadow-yellow-500/20" : 
                                                index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg shadow-slate-500/20" :
                                                index === 2 ? "bg-gradient-to-br from-orange-300 to-orange-600 text-white shadow-lg shadow-orange-500/20" :
                                                "bg-slate-800 text-slate-500"
                                            )}>
                                                {index + 1}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Avatar 
                                                  photoURL={person.photoURL} 
                                                  displayName={person.displayName} 
                                                  size="md"
                                                  className={isTop3 ? "ring-2 ring-white/20" : ""}
                                                />
                                                <div>
                                                    <span className={clsx("font-medium text-lg", isMe && "text-blue-400")}>
                                                        {person.displayName} {isMe && "(אני)"}
                                                    </span>
                                                    {isTop3 && (
                                                        <div className="text-xs text-yellow-500 font-medium mt-0.5">
                                                            {index === 0 ? '🏆 אלוף הקוד' : index === 1 ? '🥈 מקום שני' : '🥉 מקום שלישי'}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono font-bold text-xl text-blue-400">
                                                {person.xp?.toLocaleString()} 
                                            </div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">נקודות XP</div>
                                        </div>
                                    </div>
                                );
                            })}
                        
                        {friendsData.friends.length === 0 && (
                             <div className="p-12 text-center text-slate-500">
                                 <Trophy className="mx-auto mb-4 opacity-20" size={48} />
                                 <p>הוסף חברים כדי לראות מי מוביל בטבלה!</p>
                             </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'requests' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Received Requests */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-green-400 pb-4 border-b border-white/5">
                    <UserCheck size={24} />
                    בקשות שקיבלתי
                    <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-sm mr-auto">
                      {friendsData.receivedRequests.length}
                    </span>
                  </h3>
                  
                  {friendsData.receivedRequests.length > 0 ? (
                    <div className="space-y-3">
                      {friendsData.receivedRequests.map((request) => (
                        <div key={request.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800/60 transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              photoURL={request.fromUser?.photoURL} 
                              displayName={request.fromUser?.displayName} 
                              size="md" 
                            />
                            <div>
                              <p className="font-bold text-white">{request.fromUser?.displayName}</p>
                              <p className="text-xs text-slate-400">{request.fromUser?.email}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => acceptFriendRequest(request.id)}
                              className="p-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-colors"
                              title="קבל חברות"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => declineFriendRequest(request.id)}
                              className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                              title="דחה בקשה"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        <p className="text-slate-500">אין בקשות חברות חדשות</p>
                    </div>
                  )}
                </div>

                {/* Sent Requests */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-yellow-400 pb-4 border-b border-white/5">
                    <Clock size={24} />
                    בקשות ששלחתי
                    <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-sm mr-auto">
                      {friendsData.sentRequests.length}
                    </span>
                  </h3>

                  {friendsData.sentRequests.length > 0 ? (
                    <div className="space-y-3">
                      {friendsData.sentRequests.map((request) => (
                        <div key={request.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              photoURL={request.toUser?.photoURL} 
                              displayName={request.toUser?.displayName} 
                              size="md" 
                            />
                            <div>
                              <p className="font-bold text-white">{request.toUser?.displayName}</p>
                              <p className="text-xs text-slate-400">{request.toUser?.email}</p>
                            </div>
                          </div>
                          <div className="text-xs font-medium bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full">
                            ממתין לאישור
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        <p className="text-slate-500">לא נשלחו בקשות לאחרונה</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'add' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
                        <Search size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">מצא חברים חדשים</h3>
                    <p className="text-slate-400 mt-2">חפש משתמשים לפי שם או דוא״ל והזמן אותם ללמוד יחד</p>
                  </div>

                  <div className="relative mb-8">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="הקלד שם לחיפוש..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.length >= 3) searchUsers(e.target.value);
                      }}
                      className="w-full pr-12 pl-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {searching ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-slate-500 mt-4 text-sm">מחפש...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl hover:bg-slate-900/50 transition-all border border-white/5 hover:border-blue-500/20 group">
                          <div className="flex items-center gap-4">
                            <Avatar 
                              photoURL={user.photoURL} 
                              displayName={user.displayName} 
                              size="md" 
                            />
                            <div>
                              <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{user.displayName}</p>
                              <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => sendFriendRequest(user.id)}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all hover:scale-105 flex items-center gap-2 text-sm"
                          >
                            <UserPlus size={16} />
                            <span>הוסף</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length >= 3 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-500">לא נמצאו משתמשים תואמים</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
