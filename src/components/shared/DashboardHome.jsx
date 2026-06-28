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
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { 
  FiUsers, FiBookOpen, FiAlertTriangle, FiActivity, 
  FiTrendingUp, FiShield, FiZap 
} from "react-icons/fi";



export default function AdminDashboardHomeSection({
  totalLessonsCount, 
  totalUserCount, 
  totalReports, 
  todaysLessonCount, 
  countMonthlyLessons ,
  topContributors
  
}) {

  const statsSummary = [
    { title: "Total Users", value: totalUserCount, icon: FiUsers, color: "from-cyan-500/10 to-blue-500/5", text: "text-cyan-400", border: "border-cyan-500/20" },
    { title: "Total Public Lessons", value: totalLessonsCount, icon: FiBookOpen, color: "from-emerald-500/10 to-teal-500/5", text: "text-emerald-400", border: "border-emerald-500/20" },
    { title: "Reported Lessons", value: totalReports, icon: FiAlertTriangle, color: "from-rose-500/10 to-red-500/5", text: "text-rose-400", border: "border-rose-500/20" },
    { title: "Today's New Lessons", value: todaysLessonCount, icon: FiActivity, color: "from-amber-500/10 to-orange-500/5", text: "text-amber-400", border: "border-amber-500/20" },
  ];
  const chartData = countMonthlyLessons?.map(item => ({
  ...item,
  month: item.month?.split(" ")[0]  
}));

  return (
    <div className="space-y-8 relative">
      
      {/* Header */}
      <div className="border-b border-slate-900 pb-6">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-cyan-400 uppercase mb-1">
          <FiShield className="animate-pulse" /> System Core Overview
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">Admin Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time metrics, platform growth telemetry, and structural auditing logs.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsSummary.map((item, index) => (
          <Card key={index} className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-5 shadow-xl backdrop-blur-md`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.title}</span>
              <item.icon className={`size-5 ${item.text}`} />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">{item.value ?? "—"}</h3>
              <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                <FiTrendingUp className="text-emerald-500" /> Active updates live
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ✅ Monthly Lessons Bar Chart — uses correct dataKey="month" and dataKey="count" */}
        <Card className="lg:col-span-2 bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div className="mb-6">
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <FiZap className="text-cyan-400 animate-bounce" /> Platform Growth Telemetry
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Monthly lesson submissions across the platform.
            </p>
          </div>

          {/* ✅ Fixed: explicit height on wrapper, correct dataKeys */}
          <div style={{ width: "100%", height: 280 }}>
            {countMonthlyLessons?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" vertical={false} />
                  {/* ✅ dataKey="month" matches your API response */}
                  <XAxis 
                    dataKey="month" 
                    stroke="#475569" 
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#475569" 
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <ChartTooltip
                    cursor={{ fill: "rgba(6,182,212,0.05)" }}
                    contentStyle={{ 
                      backgroundColor: "#020617", 
                      borderRadius: "12px", 
                      borderColor: "#1e293b", 
                      color: "#fff",
                      fontSize: "12px"
                    }}
                    formatter={(value) => [`${value} lessons`, "Count"]}
                  />
                  {/* ✅ dataKey="count" matches your API response */}
                  <Bar 
                    dataKey="count" 
                    fill="url(#barGrad)" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={48}
                    name="Lessons"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-600 text-xs font-semibold">No monthly data available yet.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Top Contributors */}
        <Card className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4">
          <div>
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Top Content Contributors</h3>
            <p className="text-[11px] text-slate-600 mt-0.5">Creators with highest knowledge base production.</p>
          </div>

          <div className="divide-y divide-slate-900/60">
            {topContributors.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar src={item.avatar} className="size-9 rounded-xl border border-slate-800" />
                    <span className="absolute -top-1 -left-1 size-4 bg-cyan-500 rounded-full text-[9px] font-black flex items-center justify-center text-slate-950">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors leading-none">
                      {item.name}
                    </h4>
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