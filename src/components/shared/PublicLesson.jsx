"use client";

import React, { useState } from "react";
import {Link, Card, Button, Tooltip, Avatar } from "@heroui/react";
import { 
  FiClock, 
  FiArrowUpRight, 
  FiBookmark, 
  FiShare2, 
  FiSmile, 
  FiTrendingUp,
  FiHeart
} from "react-icons/fi";
// ফিল্ড হার্ট অ্যানিমেশনের জন্য FaHeart ইমপোর্ট করা হলো
import { FaHeart } from "react-icons/fa"; 

function PublicLesson({ lesson, user }) {
  // ডেটা ডিস্ট্রাকচারিং
  const {
    _id,
    title = "Untitled Lesson",
    description = "No description provided.",
    category = "General",
    tone = "Neutral",
    image = "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500",
    accessLevel = "Free",
    name = "Anonymous",
    userImage = "",
    date
  } = lesson || {};

  // লাইক স্টেট এবং কাউন্টার
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24); 

  const handleLike = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); // ইভেন্ট বাবলিং বন্ধ করার জন্য যাতে প্যারেন্ট কার্ডে ক্লিক ট্রিগার না হয়
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  // ডেট ফরম্যাটিং
  const formattedDate = date 
    ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent";

  return (
    <Card className="group relative w-full bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-[450px]">
      
      {/* ১. টপ ইমেজ ও ব্যাজ সেকশন */}
      <div className="relative w-full h-48 overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
        
        {/* অ্যাক্সেস লেভেল ব্যাজ */}
        <span className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          accessLevel?.toLowerCase() === "premium"
            ? "bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            : "bg-slate-950/80 border-slate-800 text-cyan-400"
        }`}>
          {lesson?.accessLevel}
        </span>

        {/* ক্যাটাগরি ও ইমোশনাল টোন ব্যাজ */}
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold text-cyan-400 backdrop-blur-sm">
            <FiTrendingUp className="text-xs" /> {category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-fuchsia-500/10 border border-fuchsia-500/20 text-[11px] font-bold text-fuchsia-400 backdrop-blur-sm">
            <FiSmile className="text-xs" /> {tone}
          </span>
        </div>
      </div>

      {/* ২. মিডল কন্টেন্ট (টাইটেল ও ডেসক্রিপশন) */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-3 bg-gradient-to-b from-transparent to-slate-950/20">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* ৩. ইউজার প্রোফাইল এবং ডেট */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/50 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar 
              src={userImage} 
              name={name} 
              size="sm" 
              className="border border-slate-700 w-8 h-8 text-xs bg-slate-800 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-300 truncate max-w-[90px] sm:max-w-[100px]">{name}</span>
              <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                <FiClock /> {formattedDate}
              </span>
            </div>
          </div>

          {/* ৪. ইন্টারঅ্যাকশন টুলস ও একশন বাটন */}
          <div className="flex items-center gap-1 shrink-0">
            
            {/* লাইক বাটন (বাগ-ফ্রি এবং স্মুথ অ্যানিমেটেড) */}
            

            {/* Read Insights মডার্ন বাটন */}
            <Link
              href={`/lessons-details/${_id}`}
              size="sm"
              className="ml-1 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-black text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              endContent={<FiArrowUpRight className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            >
              Read
            </Link>
          </div>
        </div>
      </div>
      
    </Card>
  );
}

export default PublicLesson;