import { FiBookmark, FiCalendar, FiHeart } from "react-icons/fi";

export function LessonCard({ lesson }) {
  return (
    <div className="relative group rounded-3xl p-[1px] bg-slate-900/60 hover:bg-gradient-to-br hover:from-cyan-500/30 hover:to-orange-500/20 transition-all duration-500 shadow-xl">
      <div className="h-full bg-slate-950/80 backdrop-blur-md rounded-[23px] p-6 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-widest mb-3">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              {lesson.category || "General"}
            </span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <FiCalendar /> {lesson.date || "Just now"}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-300 line-clamp-2 leading-relaxed">
            {lesson.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-900/80 pt-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-rose-400 transition-colors">
              <FiHeart className="group-hover:fill-rose-500/10" /> {lesson.likes || 0}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-amber-400 transition-colors">
              <FiBookmark className="group-hover:fill-amber-500/10" /> {lesson.favorites || 0}
            </span>
          </div>
          <button className="text-[11px] font-bold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read →
          </button>
        </div>
      </div>
    </div>
  );
}