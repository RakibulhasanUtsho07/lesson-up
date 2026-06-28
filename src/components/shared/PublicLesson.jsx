"use client";

import React, { useState } from "react";
import { Link, Card, Button, Tooltip, Avatar } from "@heroui/react";
import { 
  FiClock, 
  FiArrowUpRight, 
  FiBookmark, 
  FiShare2, 
  FiSmile, 
  FiTrendingUp,
  FiHeart
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa"; 

// রাউটার ব্যবহার করার জন্য Next.js থেকে useRouter ইমপোর্ট করা ভালো, 
// অথবা আপনি সরাসরি <Link> ব্যবহার করতে পারেন।
import { useRouter } from "next/navigation";

function PublicLesson({ lesson, user }) {
  const router = useRouter();

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

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24); 

  const handleLike = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };


  const formattedDate = date 
    ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent";


  const isLocked = accessLevel?.toLowerCase() === "premium" && user?.plan?.toLowerCase() !== "premium";

  return (
    <Card className="group relative w-full bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-[450px]">
      
      
      {isLocked && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-md transition-all duration-300 p-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-500 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mb-1">Premium Lesson</h4>
          <p className="text-xs text-slate-400 text-center mb-5 max-w-[200px]">
            Upgrade your plan to unlock this exclusive content.
          </p>
          <Button
            onClick={() => router.push("/plan")} 
            className="px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            Get Premium
          </Button>
        </div>
      )}


      <div className={`w-full h-full flex flex-col justify-between ${isLocked ? "opacity-30 pointer-events-none select-none filter blur-[1px]" : ""}`}>
        
      
        <div className="relative w-full h-48 overflow-hidden shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
          
         
          <span className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            accessLevel?.toLowerCase() === "premium"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              : "bg-slate-950/80 border-slate-800 text-cyan-400"
          }`}>
            {accessLevel}
          </span>

          
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold text-cyan-400 backdrop-blur-sm">
              <FiTrendingUp className="text-xs" /> {category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-fuchsia-500/10 border border-fuchsia-500/20 text-[11px] font-bold text-fuchsia-400 backdrop-blur-sm">
              <FiSmile className="text-xs" /> {tone}
            </span>
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between space-y-3 bg-gradient-to-b from-transparent to-slate-950/20">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          
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

           
            <div className="flex items-center gap-1 shrink-0">
           
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

      </div>
    </Card>
  );
}

export default PublicLesson;