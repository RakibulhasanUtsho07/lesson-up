import AdminManageUsersSection from '@/components/shared/AdminManageUsersSection';
import { getUsers } from '@/lib/data/data';
import React from 'react';
import { HiUsers, HiShieldCheck, HiCreditCard } from "react-icons/hi2";

const AdminManageUserPage = async () => {
  const users = await getUsers() || [];

  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === 'admin').length;
  const premiumUsers = users.filter(user => user.plan === 'Premium').length;

  return (
    // 🎯 সব রকমের প্যাডিং (p-6/p-8) এবং bg-slate-950 কালার রিমুভ করা হয়েছে যাতে মেইন লেআউটের গ্যাপ ও ব্যাকগ্রাউন্ড কালার নষ্ট না হয়
    <div className="w-full text-slate-100 antialiased selection:bg-cyan-500/30">
      
      {/* 🔮 Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full space-y-6 relative z-10">
        
        {/* 👋 Welcome & Meta Summary Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-900 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Administrative Console
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-100 mt-1">
              Welcome Back, Admin
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Real-time synchronization with system user records and credentials ledger.
            </p>
          </div>
        </div>

        {/* 📊 Unique Analytics Grid Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Card 1: Total Users */}
          <div className="relative group overflow-hidden bg-slate-900/20 border border-slate-900 rounded-2xl p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Accounts</p>
                <h3 className="text-3xl font-black text-slate-100 font-mono mt-2">{totalUsers}</h3>
              </div>
              <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-cyan-400">
                <HiUsers size={22} />
              </div>
            </div>
          </div>

          {/* Card 2: Admins Count */}
          <div className="relative group overflow-hidden bg-slate-900/20 border border-slate-900 rounded-2xl p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">System Admins</p>
                <h3 className="text-3xl font-black text-slate-100 font-mono mt-2">{totalAdmins}</h3>
              </div>
              <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-rose-400">
                <HiShieldCheck size={22} />
              </div>
            </div>
          </div>

          {/* Card 3: Premium Tiers */}
          <div className="relative group overflow-hidden bg-slate-900/20 border border-slate-900 rounded-2xl p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Premium Plans</p>
                <h3 className="text-3xl font-black text-slate-100 font-mono mt-2">{premiumUsers}</h3>
              </div>
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-400">
                <HiCreditCard size={22} />
              </div>
            </div>
          </div>

        </div>

        {/* 📋 মেইন ইউজার টেবিল সেকশন */}
        <div className="w-full">
          <AdminManageUsersSection users={users} />
        </div>

      </div>
    </div>
  );
};

export default AdminManageUserPage;