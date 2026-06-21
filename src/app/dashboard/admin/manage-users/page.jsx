"use client";

import React, { useState } from "react";
import { Card, Avatar, Button, Input, Tooltip } from "@heroui/react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as ChartTooltip, 
  CartesianGrid 
} from "recharts";
import { 
  FiUsers, 
  FiBookOpen, 
  FiAlertTriangle, 
  FiTrendingUp, 
  FiActivity, 
  FiSearch, 
  FiShield, 
  FiTrash2, 
  FiCheckCircle 
} from "react-icons/fi";

// 📊 গ্রাফের জন্য ডামি গ্রোথ ডেটা (Lesson & User Growth)
const growthData = [
  { name: "Jan", users: 400, lessons: 240 },
  { name: "Feb", users: 700, lessons: 450 },
  { name: "Mar", users: 1200, lessons: 890 },
  { name: "Apr", users: 1900, lessons: 1200 },
  { name: "May", users: 2800, lessons: 1700 },
  { name: "Jun", users: 3500, lessons: 2400 },
];

// 🏆 মোস্ট একটিভ কন্ট্রিবিউটর ডেটা
const topContributors = [
  { id: 1, name: "Asif Rahman", email: "asif@wisdom.com", lessons: 42, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: 2, name: "Tamanna Islam", email: "tamanna@wisdom.com", lessons: 38, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Utsho", email: "utsho@utsho.com", lessons: 35, avatar: "https://i.pravatar.cc/150?img=12" },
];

export default function AdminManageUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 📈 মেট্রিকেক্স অ্যানালিটিক্স কার্ড ডেটা
  const analytics = [
    { title: "Total Users", value: "3,520", change: "+12% this week", icon: FiUsers, color: "from-cyan-500/20 to-blue-500/10", text: "text-cyan-400" },
    { title: "Public Lessons", value: "2,412", change: "+8% today", icon: FiBookOpen, color: "from-emerald-500/20 to-teal-500/10", text: "text-emerald-400" },
    { title: "Flagged Lessons", value: "14", change: "4 pending review", icon: FiAlertTriangle, color: "from-rose-500/20 to-red-500/10", text: "text-rose-400" },
    { title: "Today's New Lessons", value: "48", change: "Highest this month", icon: FiActivity, color: "from-amber-500/20 to-orange-500/10", text: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Background Cyber Glows */}
      <div className="absolute top-[-20%] left-[-10%] size-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 👑 ড্যাশবোর্ড হেডার */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-cyan-500 uppercase mb-1">
            <FiShield className="animate-pulse" /> Core Administration
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Control Center
          </h1>
        </div>

        {/* গ্লোবাল সার্চ বার */}
        <div className="relative flex items-center max-w-xs w-full">
          <FiSearch className="absolute left-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search master log..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500/50 text-slate-300 transition-all placeholder:text-slate-600 shadow-inner"
          />
        </div>
      </div>

      {/* 📊 ১. অ্যানালিটিক্স মেট্রিকেক্স কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {analytics.map((item, index) => (
          <Card key={index} className={`bg-gradient-to-br ${item.color} border border-slate-900 rounded-2xl p-5 shadow-xl backdrop-blur-md`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.title}</span>
              <item.icon className={`size-5 ${item.text}`} />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">{item.value}</h3>
              <p className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                <FiTrendingUp className="text-emerald-500" /> {item.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* 📈 ২. গ্রাফ এবং মোস্ট একটিভ কন্ট্রিবিউটর গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Recharts গ্রাফ কার্ড (২ কলাম জুড়ে থাকবে) */}
        <Card className="lg:col-span-2 bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-black tracking-widest text-slate-300 uppercase">Platform Growth</h3>
            <p className="text-[11px] text-slate-600">Comparison between User onboarding and Wisdom Publishing.</p>
          </div>
          
          <div className="w-full h-64 text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: "#090d16", borderRadius: "12px", borderColor: "#1f2937", color: "#fff" }}
                />
                <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" name="Total Users" />
                <Area type="monotone" dataKey="lessons" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorLessons)" name="Public Lessons" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 🏆 মোস্ট একটিভ কন্ট্রিবিউটর কার্ড */}
        <Card className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4">
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-300 uppercase">Top Contributors</h3>
            <p className="text-[11px] text-slate-600">Users with the highest lesson outputs.</p>
          </div>

          <div className="divide-y divide-slate-900/60 space-y-3">
            {topContributors.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between pt-3 first:pt-0 group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar src={item.avatar} className="size-9 rounded-xl border border-slate-800" />
                    <span className="absolute -top-1 -left-1 size-4 bg-cyan-500 rounded-full text-[9px] font-black flex items-center justify-center text-slate-950">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.name}</h4>
                    <p className="text-[10px] text-slate-500">{item.email}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80 text-cyan-400">
                  {item.lessons} Posts
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 👥 ৩. ইউজার লিস্ট ম্যানেজমেন্ট টেবিল (ফাংশনালিটি) */}
      <Card className="bg-slate-950/20 border border-slate-900 shadow-2xl rounded-2xl overflow-visible relative z-10">
        <div className="p-5 border-b border-slate-900 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-300 uppercase">User Accounts Management</h3>
            <p className="text-[11px] text-slate-600">Grant admin rights, review status, or revoke accesses instantly.</p>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Identities</th>
                <th className="py-4 px-4">Role/Tier</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40 text-xs font-medium text-slate-300">
              
              {/* ডামি ইউজার রো ১ */}
              <tr className="hover:bg-slate-900/20 transition-colors group">
                <td className="py-4 px-6 flex items-center gap-3">
                  <Avatar src="https://i.pravatar.cc/150?img=11" className="size-8 rounded-lg" />
                  <div>
                    <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Mahdi Mortuza</span>
                    <p className="text-[10px] text-slate-500">mahdi@wisdom.com</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold uppercase text-[9px]">
                    Premium ⭐
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <FiCheckCircle /> Active
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="bordered" className="border-slate-800 text-[10px] font-bold h-7 rounded-lg text-slate-400 hover:text-cyan-400">
                      Make Admin
                    </Button>
                    <Tooltip content="Ban User" className="bg-slate-950 text-xs rounded-lg text-rose-400 border border-rose-500/20">
                      <button className="p-1.5 bg-slate-950 border border-slate-900 text-slate-500 hover:text-rose-400 rounded-lg transition-transform hover:scale-105">
                        <FiTrash2 />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

              {/* ডামি ইউজার রো ২ */}
              <tr className="hover:bg-slate-900/20 transition-colors group">
                <td className="py-4 px-6 flex items-center gap-3">
                  <Avatar src="https://i.pravatar.cc/150?img=60" className="size-8 rounded-lg" />
                  <div>
                    <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Zayan Khan</span>
                    <p className="text-[10px] text-slate-500">zayan@wisdom.com</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-500 font-bold uppercase text-[9px]">
                    Free User
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <FiCheckCircle /> Active
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="bordered" className="border-slate-800 text-[10px] font-bold h-7 rounded-lg text-slate-400 hover:text-cyan-400">
                      Make Admin
                    </Button>
                    <Tooltip content="Ban User" className="bg-slate-950 text-xs rounded-lg text-rose-400 border border-rose-500/20">
                      <button className="p-1.5 bg-slate-950 border border-slate-900 text-slate-500 hover:text-rose-400 rounded-lg transition-transform hover:scale-105">
                        <FiTrash2 />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}