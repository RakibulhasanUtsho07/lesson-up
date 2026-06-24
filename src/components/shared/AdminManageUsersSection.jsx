"use client";

import React, { useState } from 'react';
import { HiEllipsisVertical, HiTrash, HiShieldExclamation, HiShieldCheck } from "react-icons/hi2";

function AdminManageUsersSection({ users }) {
  const rawData = Array.isArray(users) ? users : (users?.users || []);
  const [userList, setUserList] = useState(rawData);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleUpdateRole = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setUserList((prev) =>
      prev.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
    );
    setActiveDropdown(null);
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to permanently delete this user account?")) {
      setUserList((prev) => prev.filter((user) => user._id !== userId));
      setActiveDropdown(null);
    }
  };

  return (
    <div className="w-full text-slate-200 antialiased">
      
      {/* Table Header Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Manage Users</h2>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
          Total: {userList.length} Users
        </div>
      </div>

      {/* 📊 Premium Table Layout */}
      <div className="w-full bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-900/40 text-slate-400">
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">User Name / Email</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Role</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center">Plan Tiers</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center">Total Lessons</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-900/50">
              {userList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-600 font-medium">
                    No active users found inside the system ledger.
                  </td>
                </tr>
              ) : (
                userList.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-slate-900/20 transition-colors group">
                    
                    {/* Profile */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-800"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                            {user.name || "Anonymous User"}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        user.role === "admin" 
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                          : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                      }`}>
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Plan */}
                    <td className="py-4 px-5 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        user.plan === "Premium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-slate-800/60 text-slate-400 border-slate-800"
                      }`}>
                        {user.plan || "Free"}
                      </span>
                    </td>

                    {/* Lessons Count */}
                    <td className="py-4 px-5 whitespace-nowrap text-center font-bold text-sm">
                      <span className={user.totalLessons > 0 ? "text-emerald-400" : "text-slate-600"}>
                        {user.totalLessons || 0}
                      </span>
                    </td>

                    {/* Action Operations */}
                    <td className="py-4 px-5 whitespace-nowrap text-center relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === user._id ? null : user._id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-900 hover:text-slate-200 transition-colors inline-flex justify-center items-center"
                      >
                        <HiEllipsisVertical size={18} />
                      </button>

                      {activeDropdown === user._id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setActiveDropdown(null)}></div>
                          
                          <div className="absolute right-6 mt-1 w-52 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-1.5 text-left z-40">
                            <button
                              onClick={() => handleUpdateRole(user._id, user.role)}
                              className="w-full flex flex-col items-start px-3 py-2 text-xs text-slate-300 hover:bg-slate-900 rounded-lg transition-colors"
                            >
                              <div className="flex items-center gap-2 font-bold text-slate-200">
                                {user.role === "admin" ? (
                                  <HiShieldExclamation size={16} className="text-amber-500" />
                                ) : (
                                  <HiShieldCheck size={16} className="text-cyan-400" />
                                )}
                                <span>{user.role === "admin" ? "Demote to User" : "Promote to Admin"}</span>
                              </div>
                            </button>

                            <div className="h-px bg-slate-900 my-1"></div>

                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="w-full flex flex-col items-start px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                              <div className="flex items-center gap-2 font-bold">
                                <HiTrash size={16} />
                                <span>Delete Account</span>
                              </div>
                            </button>
                          </div>
                        </>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminManageUsersSection;