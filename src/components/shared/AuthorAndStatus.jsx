import React from "react";
import { Avatar, Button } from "@heroui/react";
import { FiHeart, FiBookmark, FiEye, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function AuthorAndStats({ lesson }) {
  // স্ট্যাটিক ভিউ কাউন্ট র্যান্ডম জেনারেটর
  const viewsCount = React.useMemo(() => Math.floor(Math.random() * 10000) + 500, []);

  return (
    <div className="space-y-5">
      {/* 💳 ডেডিকেটেড অথর কার্ড */}
      <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl text-center space-y-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar src={lesson.userImage} className="w-16 h-16 rounded-xl border-2 border-slate-800" />
          <div>
            <h3 className="text-sm font-black text-white">{lesson.name}</h3>
            <p className="text-[10px] font-mono text-slate-600">ID: {lesson.userId.slice(0, 8)}</p>
          </div>
        </div>
        
        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-900 text-xs font-bold text-slate-400">
          Total Lessons: 24
        </div>

        <Link href={`/profile/${lesson.userId}`} className="block">
          <Button size="sm" fullWidth className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-bold text-slate-300 rounded-xl h-9">
            <FiUser /> View Creator Profile
          </Button>
        </Link>
      </div>

      {/* 📊 স্ট্যাটস বা এঙ্গেজমেন্ট প্যানেল */}
      <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-slate-950 border border-slate-900/60 rounded-xl">
          <FiHeart className="mx-auto text-rose-500 mb-1" />
          <span className="text-xs font-black text-white">{lesson.likes.length}</span>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wide">Likes</p>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-900/60 rounded-xl">
          <FiBookmark className="mx-auto text-cyan-500 mb-1" />
          <span className="text-xs font-black text-white">{lesson.favorites.length}</span>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wide">Saved</p>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-900/60 rounded-xl">
          <FiEye className="mx-auto text-purple-500 mb-1" />
          <span className="text-xs font-black text-white">{viewsCount}</span>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wide">Views</p>
        </div>
      </div>
    </div>
  );
}