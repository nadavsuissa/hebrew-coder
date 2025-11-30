'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { Users, Search, Filter, Mail, Calendar, Award, BookOpen, Shield, UserX, Edit, Trash2, Crown, X } from 'lucide-react';
import clsx from 'clsx';
import { UserRole } from '@/types/course';

interface UserData {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt: string;
  purchasedCourses: string[];
  xp: number;
  completedLessons: string[];
  streakDays: number;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const loadUsers = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to load users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.displayName && user.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, role: newRole })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update user role');
      }

      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }

      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="text-yellow-400" size={16} />;
      case 'moderator':
        return <Shield className="text-blue-400" size={16} />;
      default:
        return <Users className="text-slate-400" size={16} />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'moderator':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const openUserModal = (user: UserData) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-teal-600/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ניהול משתמשים
            </h1>
            <p className="text-slate-300">
              ניהול וצפייה בכל המשתמשים במערכת
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="חיפוש לפי אימייל או שם..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">כל התפקידים</option>
              <option value="user">משתמש רגיל</option>
              <option value="moderator">מנחה</option>
              <option value="admin">מנהל</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">משתמש</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">תפקיד</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">התקדמות</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">תאריך הרשמה</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {(user.displayName || user.email[0]).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {user.displayName || user.email.split('@')[0]}
                        </div>
                        <div className="text-sm text-slate-400 flex items-center gap-1">
                          <Mail size={14} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={clsx(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border",
                      getRoleColor(user.role)
                    )}>
                      {getRoleIcon(user.role)}
                      {user.role === 'admin' ? 'מנהל' :
                       user.role === 'moderator' ? 'מנחה' : 'משתמש'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Award size={14} className="text-yellow-400" />
                        <span>{user.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <BookOpen size={14} />
                        <span>{user.completedLessons?.length || 0} שיעורים</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(user.createdAt).toLocaleDateString('he-IL')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openUserModal(user)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="פרטי משתמש"
                      >
                        <Edit size={16} />
                      </button>
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                        className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="user">משתמש</option>
                        <option value="moderator">מנחה</option>
                        <option value="admin">מנהל</option>
                      </select>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="מחק משתמש"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto mb-4 text-slate-600" size={48} />
            <p className="text-slate-400">לא נמצאו משתמשים</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-blue-400">{users.length}</div>
          <div className="text-sm text-slate-400">סה״כ משתמשים</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-green-400">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-sm text-slate-400">מנהלים</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-purple-400">
            {users.filter(u => u.role === 'moderator').length}
          </div>
          <div className="text-sm text-slate-400">מנחים</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-yellow-400">
            {users.reduce((sum, u) => sum + (u.xp || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">סה״כ XP</div>
        </div>
      </div>
      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-white">פרטי משתמש</h2>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {(selectedUser.displayName || selectedUser.email[0]).toUpperCase()}
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    {selectedUser.displayName || 'משתמש ללא שם'}
                  </div>
                  <div className="text-slate-400">{selectedUser.email}</div>
                  <div className="text-sm text-slate-500 mt-1">
                    ID: {selectedUser.uid}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-slate-400 text-sm mb-1">תאריך הצטרפות</div>
                  <div className="font-semibold text-white">
                    {new Date(selectedUser.createdAt).toLocaleDateString('he-IL')}
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-slate-400 text-sm mb-1">כניסה אחרונה</div>
                  <div className="font-semibold text-white">
                    {selectedUser.lastLoginAt ? new Date(selectedUser.lastLoginAt).toLocaleDateString('he-IL') : '-'}
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-slate-400 text-sm mb-1">רצף ימים</div>
                  <div className="font-semibold text-yellow-400">
                    {selectedUser.streakDays || 0} 🔥
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="text-yellow-400" size={20} />
                    התקדמות והישגים
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                      <span className="text-slate-300">XP צבור</span>
                      <span className="font-bold text-yellow-400">{selectedUser.xp || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                      <span className="text-slate-300">שיעורים הושלמו</span>
                      <span className="font-bold text-green-400">{selectedUser.completedLessons?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                      <span className="text-slate-300">קורסים שנרכשו</span>
                      <span className="font-bold text-blue-400">{selectedUser.purchasedCourses?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="text-blue-400" size={20} />
                    ניהול הרשאות
                  </h3>
                  <div className="p-4 bg-slate-800/30 rounded-xl space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">תפקיד משתמש</label>
                      <select
                        value={selectedUser.role}
                        onChange={(e) => updateUserRole(selectedUser.id, e.target.value as UserRole)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="user">משתמש רגיל</option>
                        <option value="moderator">מנחה</option>
                        <option value="admin">מנהל מערכת</option>
                      </select>
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <button
                        onClick={() => {
                          deleteUser(selectedUser.id);
                          setShowUserModal(false);
                        }}
                        className="w-full py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        מחיקת משתמש
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
