'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  displayName?: string;
  role?: string;
  xp?: number;
  isBanned?: boolean;
  createdAt?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (userId: string, action: string) => {
    setActionLoading(userId);
    try {
      await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action }),
      });
      await fetchUsers(); // Refresh list
    } catch (error) {
      console.error("Action failed", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400 animate-pulse">Loading users...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="text-blue-400" />
          User Management
        </h1>
        <div className="text-sm text-slate-400">
          Total Users: {users.length}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 uppercase font-medium border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">XP</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{user.displayName || 'No Name'}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-700/50 text-slate-400'}`}>
                    {user.role || 'STUDENT'}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-blue-400">
                  {user.xp || 0} XP
                </td>
                <td className="px-6 py-4">
                  {user.isBanned ? (
                    <span className="text-red-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      Banned
                    </span>
                  ) : (
                    <span className="text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                   {actionLoading === user.id ? (
                       <span className="text-xs animate-pulse">Updating...</span>
                   ) : (
                       <>
                        {user.isBanned ? (
                             <button 
                                onClick={() => handleAction(user.id, 'unban')}
                                className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded hover:bg-green-500/20 transition-colors"
                             >
                                Unban
                             </button>
                        ) : (
                            <button 
                                onClick={() => handleAction(user.id, 'ban')}
                                className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded hover:bg-red-500/20 transition-colors"
                             >
                                Ban
                             </button>
                        )}
                        
                        {user.role !== 'admin' && (
                             <button 
                                onClick={() => handleAction(user.id, 'promote_admin')}
                                className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded hover:bg-purple-500/20 transition-colors"
                             >
                                Make Admin
                             </button>
                        )}
                       </>
                   )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No users found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
