"use client";

import React from "react";
import { FiTrash2, FiEye, FiFolder, FiCpu } from "react-icons/fi";
import Link from "next/link";

export default function FavoritesTable({ lessons = [], onRemove }) {
  
  // ডাইনামিক গ্লো টোন ব্যাজ জেনারেটর
  const getToneStyle = (tone) => {
    if (!tone) return "bg-slate-500/5 text-slate-400 border-slate-800";
    switch (tone.toLowerCase()) {
      case "calm": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]";
      case "focused": return "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.05)]";
      case "inspiring": return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.05)]";
      case "energetic": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]";
      default: return "bg-slate-500/10 text-slate-400 border-slate-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full overflow-hidden border border-slate-900 bg-gradient-to-b from-[#0b0f19] to-[#070a13] rounded-3xl shadow-2xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs text-slate-300 min-w-[700px]">
          
          {/* Elegant Table Header */}
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-900 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <th className="py-5 px-6">Lesson Title</th>
              <th className="py-5 px-6">Category</th>
              <th className="py-5 px-6">Vibe / Tone</th>
              <th className="py-5 px-6">Saved At</th>
              <th className="py-5 px-6 text-right pr-10">Actions</th>
            </tr>
          </thead>

          {/* Smooth Table Body */}
          <tbody className="divide-y divide-slate-900/40">
            {!lessons || lessons.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-20 text-center bg-transparent">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-4 bg-slate-900/40 text-slate-600 rounded-2xl border border-slate-900">
                      <FiCpu size={24} />
                    </div>
                    <p className="text-slate-500 font-semibold tracking-wide">No favorites found matching your criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr 
                  key={lesson._id || lesson.id} 
                  className="hover:bg-slate-900/30 transition-all duration-200 group"
                >
                  {/* 1. Title with Hover Effect */}
                  <td className="py-4 px-6 font-bold text-slate-200 max-w-xs transition-colors group-hover:text-cyan-400">
                    <div className="truncate text-sm tracking-tight">{lesson.title || "Untitled Lesson"}</div>
                  </td>

                  {/* 2. Category with Sleek Minimal Icon */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-slate-400 bg-slate-950/40 border border-slate-900 px-2.5 py-1 rounded-xl font-medium">
                      <FiFolder className="text-slate-500 group-hover:text-cyan-500 transition-colors" size={12} />
                      {lesson.category || "General"}
                    </span>
                  </td>

                  {/* 3. Emotional Tone Badge */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center justify-center font-bold text-[9px] h-5.5 px-3 border rounded-full uppercase tracking-widest ${getToneStyle(lesson.tone || lesson.emotionalTone)}`}>
                      {lesson.tone || lesson.emotionalTone || "N/A"}
                    </span>
                  </td>

                  {/* 4. Pretty Date */}
                  <td className="py-4 px-6 text-slate-400 font-medium font-mono text-[11px]">
                    {formatDate(lesson.savedAt || lesson.date)}
                  </td>

                  {/* 5. Cyberpunk Styled Action Cluster */}
                  <td className="py-4 px-6 text-right pr-10">
                    <div className="flex items-center justify-end gap-2.5">
                      
                      {/* View Button */}
                      <Link
                        href={`/lessons/${lesson._id}`}
                        className="inline-flex items-center justify-center bg-slate-950 border border-slate-850 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 rounded-xl h-8 w-8 transition-all active:scale-95 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                        title="View Lesson Details"
                      >
                        <FiEye size={13} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => onRemove(lesson._id, lesson.title)}
                        className="inline-flex items-center justify-center bg-slate-950 border border-slate-850 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 rounded-xl h-8 w-8 transition-all active:scale-95"
                        title="Remove from Saved"
                      >
                        <FiTrash2 size={13} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}