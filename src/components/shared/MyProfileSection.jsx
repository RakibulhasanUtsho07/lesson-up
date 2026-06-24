"use client";

import React, { useState, useEffect } from "react";
import { Button, Avatar, Input } from "@heroui/react";

import { 
  FiMail, 
  FiBookOpen, 
  FiBookmark, 
  FiCamera, 
  FiCheck, 
 
  FiSettings,
  FiX
} from "react-icons/fi";
import { LessonCard } from "./LessonCard";

// 📚 sub-component: LessonCard


// 🔮 Main Client Section
export default function MyProfileClient({ initialUser, initialLessons, initialStats }) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(initialUser?.name || "Creator");
  const [photoUrl, setPhotoUrl] = useState(initialUser?.image || "");
  const [myPublicLessons, setMyPublicLessons] = useState(initialLessons || []);
  const [stats, setStats] = useState(initialStats || { created: 0, saved: 0 });

  // প্রোফাইল আপডেট হ্যান্ডেলার (এখানে চাইলে সার্ভার অ্যাকশন কল করতে পারেন)
  const handleConfirmUpdate = () => {
    setIsEditing(false);
    // TODO: আপনার API বা Server Action কল করে ডেটাবেজে আপডেট সেভ করুন।
    console.log("Updated Info:", { displayName, photoUrl });
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 p-4 sm:p-8 space-y-12 relative overflow-hidden">
      {/* Dynamic Cyber Orbs */}
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] size-[500px] bg-gradient-to-bl from-orange-500/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* 🔮 Hero Container */}
      <div className="max-w-5xl mx-auto relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-orange-500/10 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/60 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden">
          
          {/* Neon Top-Line Decorative */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          {/* User Info Block */}
          <div className="flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left w-full">
            <div className="relative group/avatar">
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-orange-500 rounded-2xl blur opacity-30 group-hover/avatar:opacity-60 transition duration-500" />
              <Avatar 
                src={photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                className="w-24 h-24 sm:w-28 sm:h-28 text-large rounded-2xl relative border border-slate-800 bg-slate-900 object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 cursor-pointer border border-cyan-500/40">
                  <FiCamera className="size-5 text-cyan-400" />
                </div>
              )}
            </div>

            <div className="space-y-4 flex-1 w-full">
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
                  {isEditing ? (
                    <Input 
                      size="sm"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="max-w-xs font-bold text-white"
                      variant="bordered"
                      color="primary"
                    />
                  ) : (
                    <h1 className="text-2xl font-black tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
                      {displayName}
                    </h1>
                  )}

                  <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full shadow-inner">
                    Premium ⭐
                  </span>
                </div>

                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                  <FiMail className="text-slate-600 text-sm" /> {initialUser?.email || "No Email Associated"}
                </p>
              </div>

              {isEditing && (
                <div className="pt-1">
                  <Input 
                    placeholder="Paste Avatar Image URL"
                    size="sm"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    variant="bordered"
                    className="max-w-md text-xs"
                  />
                </div>
              )}

              {/* Geometric Counters */}
              <div className="flex items-center justify-center sm:justify-start gap-4 pt-1">
                <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-900 px-4 py-2 rounded-xl text-xs font-bold tracking-wide">
                  <FiBookOpen className="text-cyan-400 text-sm" />
                  <span className="text-slate-400">Created <strong className="text-white ml-1">{stats.created}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-900 px-4 py-2 rounded-xl text-xs font-bold tracking-wide">
                  <FiBookmark className="text-orange-400 text-sm" />
                  <span className="text-slate-400">Saved <strong className="text-white ml-1">{stats.saved}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="shrink-0">
            {isEditing ? (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="light" 
                  className="text-slate-400 font-bold text-xs"
                  onClick={() => setIsEditing(false)}
                  isIconOnly
                >
                  <FiX className="size-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/10 px-4"
                  onClick={handleConfirmUpdate}
                  startContent={<FiCheck />}
                >
                  Confirm
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                variant="light"
                className="text-slate-400 hover:text-white font-bold text-xs rounded-xl border border-slate-900 hover:border-slate-800 bg-slate-950/40 px-4"
                onClick={() => setIsEditing(true)}
                startContent={<FiSettings className="text-slate-500" />}
              >
                Configure
              </Button>
            )}
          </div>

        </div>
      </div>

      {/* 📚 Grid Section */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <div>
            <h2 className="text-base font-black tracking-widest uppercase bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              Published Wisdom
            </h2>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">
              Chronological order of your public masterclasses.
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-950 border border-slate-900 px-3 py-1 rounded-lg">
            Total: {myPublicLessons.length}
          </span>
        </div>

        {/* Asymmetric Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {myPublicLessons.length > 0 ? (
            myPublicLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-slate-950/40 border border-dashed border-slate-900/60 rounded-3xl">
              <p className="text-xs font-black tracking-widest text-slate-600 uppercase">Archive Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}