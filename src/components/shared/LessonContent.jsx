import React from "react";
import { FiCalendar, FiClock, FiTag, FiSmile } from "react-icons/fi";

export default function LessonContent({ lesson }) {
  return (
    <div className="bg-slate-950/40 border border-slate-900/80 p-6 sm:p-8 rounded-2xl space-y-6">
      {lesson.image && (
        <img 
          src={lesson.image} 
          alt={lesson.title} 
          className="w-full h-64 sm:h-80 object-cover rounded-xl border border-slate-900"
        />
      )}

      {/* মেটা ট্যাগস */}
      <div className="flex flex-wrap gap-2.5">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          <FiTag /> {lesson.category}
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-wider text-amber-400">
          <FiSmile /> {lesson.tone}
        </span>
      </div>

      {/* টাইটেল ও ডেসক্রিপশন */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{lesson.title}</h1>
        <p className="text-sm text-slate-400 font-medium leading-relaxed whitespace-pre-line">
          {lesson.description}
        </p>
      </div>

      {/* ক্লিন মেটাডাটা ব্লক */}
      <div className="pt-4 border-t border-slate-900/60 flex flex-wrap items-center gap-6 text-[11px] text-slate-500 font-bold">
        <span className="flex items-center gap-1.5"><FiCalendar /> Created: {new Date(lesson.date).toLocaleDateString()}</span>
        <span className="flex items-center gap-1.5"><FiClock /> Est. Read Time: 3 mins</span>
        <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[9px] rounded uppercase tracking-widest text-emerald-400">{lesson.accessLevel}</span>
      </div>
    </div>
  );
}
