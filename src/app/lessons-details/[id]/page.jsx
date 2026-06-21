"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LessonContent from "@/components/shared/LessonContent";
import InteractionBar from "@/components/shared/InteractionBar";
import CommentSection from "@/components/shared/CommentSection";
import AuthorAndStats from "@/components/shared/AuthorAndStatus";
import RecommendedLessons from "@/components/shared/RecommendedLessons";
import UpgradeBanner from "@/components/shared/UpgradeBanner";

// 🧩 সাব-কম্পোনেন্টস ইমপোর্ট



// 📝 আপনার দেওয়া ডেমো ডেটা ফরম্যাট অনুযায়ী ডামি ডাটা অবজেক্ট
const mockLesson = {
  _id: "6a3607567f532129a4720b3e",
  title: "The 24-Hour Rule for Emotional Emails",
  description: "Never reply to a frustrating work email immediately. Write the draft, save it, and wait exactly 24 hours. The emotional spikes always drop, and when you review it the next day, you will edit out 90% of the aggression. This protects your professional reputation, prevents unnecessary bridge-burning, and forces pragmatic decision-making. Over the last 5 years, this single habit has saved my career at least three times over.",
  category: "Career & Professional Growth",
  tone: "Professional & Pragmatic",
  image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop&q=80",
  accessLevel: "Premium", 
  name: "Alex Rivera",
  userId: "usr_9a8b7c6d5e4f3g2h",
  userImage: "https://randomuser.me/api/portraits/men/32.jpg",
  date: "2026-06-20T08:15:30.123Z",
  likes: ["usr_123"],
  favorites: ["usr_456"],
};

export default function LessonDetailsPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  
  const isUserPremium = false; 
  const isLocked = mockLesson.accessLevel === "Premium" && !isUserPremium;

  
  const [likes, setLikes] = useState(mockLesson.likes);
  const [favorites, setFavorites] = useState(mockLesson.favorites);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 relative">
      <div className="absolute top-[-10%] right-[-10%] size-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

     
      {isLocked && <UpgradeBanner />}

      
      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 ${isLocked ? "blur-xl select-none pointer-events-none" : ""}`}>
        
        {/* Left Side: Main Body (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          <LessonContent lesson={mockLesson} />
          
          <InteractionBar 
            lessonId={mockLesson._id}
            likes={likes}
            setLikes={setLikes}
            favorites={favorites}
            setFavorites={favorites}
            user={user}
          />

          <CommentSection lessonId={mockLesson._id} user={user} />
        </div>

        {/* Right Side: Meta, Author & Recommendations (1 Column) */}
        <div className="space-y-6">
          <AuthorAndStats lesson={mockLesson} />
          <RecommendedLessons currentCategory={mockLesson.category} />
        </div>

      </div>
    </div>
  );
}
