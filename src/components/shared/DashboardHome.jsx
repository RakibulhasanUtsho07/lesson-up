"use client";

import React from "react";
import { Card, Avatar } from "@heroui/react";
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
  FiActivity, 
  FiTrendingUp, 
  FiShield, 
  FiZap 
} from "react-icons/fi";

// 📊 লিনিয়ার গ্রোথ ডেটা (User & Lesson Growth Together)
const analyticsGraphData = [
  { name: "Jan", users: 400, lessons: 240 },
  { name: "Feb", users: 780, lessons: 410 },
  { name: "Mar", users: 1200, lessons: 780 },
  { name: "Apr", users: 1850, lessons: 1100 },
  { name: "May", users: 2600, lessons: 1650 },
  { name: "Jun", users: 3520, lessons: 2412 },
];

// 🏆 মোস্ট একটিভ কন্ট্রিবিউটর মেটা-ডাটা
const topContributors = [
  { id: 1, name: "Asif Rahman", email: "asif@wisdom.com", lessons: 42, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: 2, name: "Tamanna Islam", email: "tamanna@wisdom.com", lessons: 38, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Utsho", email: "utsho@utsho.com", lessons: 35, avatar: "https://i.pravatar.cc/150?img=12" },
];

export default function AdminDashboardHomeSection({totalLessonsCount, totalUserCount}) {
  
  // 📈 স্ট্যাটস কার্ড কনফিগারেশন
  const statsSummary = [
    { title: "Total Users", value: totalUserCount, icon: FiUsers, color: "from-cyan-500/10 to-blue-500/5", text: "text-cyan-400", border: "border-cyan-500/20" },
    { title: "Total Public Lessons", value: totalLessonsCount, icon: FiBookOpen, color: "from-emerald-500/10 to-teal-500/5", text: "text-emerald-400", border: "border-emerald-500/20" },
    { title: "Reported Lessons", value: "14", icon: FiAlertTriangle, color: "from-rose-500/10 to-red-500/5", text: "text-rose-400", border: "border-rose-500/20" },
    { title: "Today's New Lessons", value: "48", icon: FiActivity, color: "from-amber-500/10 to-orange-500/5", text: "text-amber-400", border: "border-amber-500/20" },
  ];

  return (
    <div className="space-y-8 relative">
      {/* 👑 ওয়ান-লাইন এডমিন ব্যাজ ও হেডার */}
      <div className="border-b border-slate-900 pb-6">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-cyan-400 uppercase mb-1">
          <FiShield className="animate-pulse" /> System Core Overview
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Admin Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time metrics, platform growth telemetry, and structural auditing logs.
        </p>
      </div>

      {/* 📊 ১. প্ল্যাটফর্ম-ওয়াইড অ্যানালিটিক্স গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsSummary.map((item, index) => (
          <Card key={index} className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-5 shadow-xl backdrop-blur-md`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.title}</span>
              <item.icon className={`size-5 ${item.text}`} />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">{item.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                <FiTrendingUp className="text-emerald-500" /> Active updates live
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* 📈 ২. জোড়া গ্রাফ ও টপ কন্ট্রিবিউটর সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts ইন্টারেক্টিভ গ্লোয়িং চার্ট */}
        <Card className="lg:col-span-2 bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="mb-6">
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <FiZap className="text-cyan-400 animate-bounce" /> Platform Growth Telemetry
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">Chronological comparison between overall user onboarding and public content submissions.</p>
          </div>
          
          <div className="w-full h-72 text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="glowUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="glowLessons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: "#020617", borderRadius: "12px", borderColor: "#1e293b", color: "#fff" }}
                />
                <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#glowUsers)" name="User Growth" />
                <Area type="monotone" dataKey="lessons" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#glowLessons)" name="Lesson Growth" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 🏆 মোস্ট একটিভ কন্ট্রিবিউটর লিডারবোর্ড */}
        <Card className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4">
          <div>
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Top Content Contributors</h3>
            <p className="text-[11px] text-slate-600 mt-0.5">Creators with highest knowledge base production.</p>
          </div>

          <div className="divide-y divide-slate-900/60 space-y-3.5">
            {topContributors.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between pt-3.5 first:pt-0 group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar src={item.avatar} className="size-9 rounded-xl border border-slate-800" />
                    <span className="absolute -top-1 -left-1 size-4 bg-cyan-500 rounded-full text-[9px] font-black flex items-center justify-center text-slate-950">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors leading-none">{item.name}</h4>
                    <span className="text-[9px] text-slate-500 font-mono">{item.email}</span>
                  </div>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80 text-cyan-400 uppercase tracking-wider">
                  {item.lessons} Posts
                </span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
