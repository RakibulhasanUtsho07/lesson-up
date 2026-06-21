"use client";

import React, { useState } from "react";
import { Card, Avatar, Button, Tooltip, Badge } from "@heroui/react";
import { 
  FiSearch, 
  FiTrash2, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiEye, 
  FiFilter,
  FiBookOpen,
  FiFlag
} from "react-icons/fi";

// 📝 ডামি গ্লোবাল লেসন ডাটা (সব ইউজারের পোস্ট করা লেসন এডমিন ভিউতে)
const initialGlobalLessons = [
  {
    id: "l1",
    title: "Mastering Next.js 15 Server Actions Like a Pro",
    author: { name: "Utsho", email: "utsho@utsho.com", avatar: "https://i.pravatar.cc/150?img=12" },
    category: "Web Dev",
    status: "Public",
    reports: 0
  },
  {
    id: "l2",
    title: "How to Hack NASA using HTML v5 (Spam Tutorial)",
    author: { name: "Spammy Jack", email: "jack@spam.com", avatar: "https://i.pravatar.cc/150?img=33" },
    category: "Cybersecurity",
    status: "Reported",
    reports: 7
  },
  {
    id: "l3",
    title: "Advanced MongoDB Aggregation Pipelines Explained",
    author: { name: "Asif Rahman", email: "asif@wisdom.com", avatar: "https://i.pravatar.cc/150?img=3" },
    category: "Database",
    status: "Public",
    reports: 0
  }
];

export default function AdminManageLessonsPage() {
  const [lessons, setLessons] = useState(initialGlobalLessons);
  const [filter, setFilter] = useState("All"); // All, Reported, Public
  const [searchQuery, setSearchQuery] = useState("");

  // 🛠️ অ্যাকশন ফাংশনস
  const handleApprove = (id) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, status: "Public", reports: 0 } : l));
  };

  const handleDelete = (id) => {
    setLessons(prev => prev.filter(l => l.id !== id));
  };

  // ফিল্টারিং ও সার্চ লজিক
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "All") return matchesSearch;
    if (filter === "Reported") return matchesSearch && lesson.status === "Reported";
    if (filter === "Public") return matchesSearch && lesson.status === "Public";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] size-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 👑 হেডার সেকশন */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-orange-500 uppercase mb-1">
            <FiFlag className="animate-bounce" /> Moderation Panel
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Manage Lessons
          </h1>
          <p className="text-xs text-slate-500 mt-1">Review flagged contents, categories, and keep the platform clean.</p>
        </div>

        {/* সার্চ এবং ফিল্টার বার */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center max-w-xs w-full sm:w-64">
            <FiSearch className="absolute left-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search content or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-950 border border-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500/50 text-slate-300 placeholder:text-slate-600"
            />
          </div>

          {/* কাস্টম ফিল্টার বাটন ট্যাব */}
          <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-xl text-xs font-bold">
            {["All", "Public", "Reported"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === tab 
                    ? "bg-slate-900 text-cyan-400 shadow-md" 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 ৪. মডারেশন কন্ট্রোল লোগ টেবিল */}
      <Card className="bg-slate-950/20 border border-slate-900 shadow-2xl rounded-2xl overflow-visible relative z-10">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Lesson Content</th>
                <th className="py-4 px-4">Author Info</th>
                <th className="py-4 px-4">Safety Status</th>
                <th className="py-4 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40 text-xs font-medium text-slate-300">
              
              {filteredLessons.map((lesson) => {
                const isReported = lesson.status === "Reported";

                return (
                  <tr key={lesson.id} className={`hover:bg-slate-900/10 transition-colors group ${isReported ? "bg-rose-950/5" : ""}`}>
                    
                    {/* লেসন টাইটেল ও ক্যাটাগরি */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-slate-200 font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors">
                          {lesson.title}
                        </span>
                        <div>
                          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                            {lesson.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* লেখক */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={lesson.author.avatar} className="size-7 rounded-lg border border-slate-800" />
                        <div>
                          <h4 className="font-bold text-slate-300 leading-none">{lesson.author.name}</h4>
                          <span className="text-[10px] text-slate-500">{lesson.author.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* স্ট্যাটাস ব্যাজ ও রিপোর্টের সংখ্যা */}
                    <td className="py-4 px-4">
                      {isReported ? (
                        <div className="flex items-center gap-2 text-rose-400 font-bold animate-pulse">
                          <FiAlertTriangle />
                          <span>Flagged ({lesson.reports} reports)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <FiCheckCircle />
                          <span>Clean / Public</span>
                        </div>
                      )}
                    </td>

                    {/* মডারেশন বাটনস */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        
                        {/* কন্টেন্ট রিভিউ বা ভিউ বাটন */}
                        <Tooltip content="Quick View" className="bg-slate-950 text-xs text-slate-300 border border-slate-800">
                          <button className="p-2 bg-slate-950 border border-slate-900 text-slate-400 hover:text-cyan-400 rounded-xl transition-all">
                            <FiEye className="size-3.5" />
                          </button>
                        </Tooltip>

                        {/* যদি রিপোর্টেড হয় তবে ক্লিয়ার/অ্যাপ্রুভ করার বাটন */}
                        {isReported && (
                          <Tooltip content="Keep & Dismiss Reports" className="bg-slate-950 text-xs text-emerald-400 border border-emerald-950">
                            <button 
                              onClick={() => handleApprove(lesson.id)}
                              className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all"
                            >
                              <FiCheckCircle className="size-3.5" />
                            </button>
                          </Tooltip>
                        )}

                        {/* পার্মানেন্ট ডিলিট বাটন */}
                        <Tooltip content="Force Delete Content" className="bg-slate-950 text-xs text-rose-400 border border-rose-950">
                          <button 
                            onClick={() => handleDelete(lesson.id)}
                            className="p-2 bg-slate-950 border border-slate-900 text-slate-500 hover:text-rose-400 hover:border-rose-500/20 rounded-xl transition-all"
                          >
                            <FiTrash2 className="size-3.5" />
                          </button>
                        </Tooltip>

                      </div>
                    </td>

                  </tr>
                );
              })}

              {/* কন্টেন্ট না থাকলে এম্পটি স্টেট */}
              {filteredLessons.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-14 text-slate-600 font-bold tracking-wide">
                    No items match the active logging filter.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
