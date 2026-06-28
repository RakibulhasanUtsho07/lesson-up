import React from "react";
import { 
  BookOpen, 
  Bookmark, 
  Calendar, 
  Clock, 
  Plus, 
  Sparkles, 
  ArrowUpRight,
  GraduationCap
} from "@gravity-ui/icons";
import {Link} from "@heroui/react";
import { FiTrendingUp } from "react-icons/fi";

 
import { countUserFavoriteLessons, countUserLessons } from "@/lib/data/data";

import { getSessionData } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  
   const user = await getSessionData();
  
    
    if (!user || user?.role !== 'user') {
      redirect("/");
    }

  
  
 


  
 
  const userId = user?.id || session?.data?.session?.userId;
  console.log("🎯 Extracted userId:", userId);
  

  
  let countData = { totalLessons: 0 };
  if (userId) {
    countData = await countUserLessons(userId);
  } else {
    console.log("⚠️ No active user session found. Please login.");
  }
  console.log("📊 countData:", countData);
  let countUserFavoritesData = {totalSavedLessons : 0}
  if(userId){
    countUserFavoritesData= await countUserFavoriteLessons(userId)
  }else{
    console.log("⚠️ No active user session found. Please login.");
  }
  const stats = [
    { 
      label: "Total Lessons Created", 
      value: countData?.totalLessons ?? 0, // সেফ ফলব্যাক
      change: "Live Database", 
      icon: BookOpen, 
      accentColor: "from-cyan-500/20 to-blue-600/5",
      iconColor: "text-cyan-400",
      borderColor: "group-hover:border-cyan-500/30"
    },
    { 
      label: "Total Saved Lessons", 
      value: countUserFavoritesData.totalSavedLessons ?? 0, 
      change: "2 categories", 
      icon: Bookmark, 
      accentColor: "from-amber-500/20 to-orange-600/5",
      iconColor: "text-amber-400",
      borderColor: "group-hover:border-amber-500/30"
    },
    { 
      label: "Weekly Goal Progress", 
      value: "85%", 
      change: "On track", 
      icon: FiTrendingUp, 
      accentColor: "from-emerald-500/20 to-teal-600/5",
      iconColor: "text-emerald-400",
      borderColor: "group-hover:border-emerald-500/30"
    },
  ];

  // রিসেন্ট লেসন ডামি ডেটা
  const recentLessons = [
    { title: "React Compound Components Patterns", date: "2 hours ago", category: "Web Dev" },
    { title: "Advanced Architecture with HeroUI v3", date: "Yesterday", category: "UI/UX" },
    { title: "Next.js App Router & Parallel Routes", date: "3 days ago", category: "Next.js" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-8">
      
      {/* 🌟 হেডার সেকশন */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="size-4 animate-bounce" />
            Workspace Overview
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent mt-1">
            Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back, <span className="text-slate-200 font-bold">{user?.name || "Learner"}</span>! Here is what's happening today.
          </p>
        </div>
        
        <Link href="/dashboard/post-lesson" className="group flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:scale-[1.02] transition-all duration-300 shrink-0">
          <Plus className="size-4 stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
          Create New Lesson
        </Link>
      </div>

      {/* 📊 স্ট্যাটস কার্ডস গ্রিড */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 ${stat.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{stat.label}</span>
                <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform ${stat.iconColor}`}>
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-4xl font-black text-white tracking-tight">{stat.value}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-950 border border-slate-900 text-slate-400">
                  {stat.change}
                </span>
              </div>
              <div className={`absolute -bottom-10 -right-10 size-32 rounded-full bg-gradient-to-br ${stat.accentColor} opacity-40 blur-2xl transition-opacity group-hover:opacity-60`} />
            </div>
          );
        })}
      </div>

      {/* 🗺️ চার্ট এবং রিসেন্ট অ্যাক্টিভিটি এরিয়া */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* চার্ট */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-md flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between border-b border-slate-900/60 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-cyan-400" />
              <h3 className="text-base font-bold text-slate-200">Weekly Reflection Trends</h3>
            </div>
            <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Active Performance
            </span>
          </div>

          <div className="flex items-end justify-between gap-4 h-48 pt-6 px-2">
            {[45, 75, 35, 95, 60, 45, 85].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full relative rounded-t-xl bg-slate-950 border border-slate-900 group-hover:border-slate-800 transition-all h-full flex items-end overflow-hidden">
                  <div 
                    style={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-orange-500 via-amber-400 to-cyan-400 rounded-t-xl opacity-80 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-300 origin-bottom"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-wider transition-colors">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* রিসেন্ট লেসন লিস্ট */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-900/60 pb-4">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-amber-400" />
                <h3 className="text-base font-bold text-slate-200">Recent Lessons</h3>
              </div>
              <ArrowUpRight className="size-4 text-slate-500" />
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {recentLessons.map((lesson, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-900/80 hover:border-slate-800 transition-all group cursor-pointer"
                >
                  <div className="flex flex-col gap-1.5 max-w-[70%]">
                    <span className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                      {lesson.title}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="size-3" /> {lesson.date}
                    </span>
                  </div>
                  <span className="text-[9px] font-black text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md uppercase border border-cyan-900/40 tracking-wider">
                    {lesson.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-5 py-3 text-center text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all shadow-md">
            View All Lessons
          </button>
        </div>

      </div>
    </div>
  );
}