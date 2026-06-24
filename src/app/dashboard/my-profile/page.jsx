import React from "react";

import { getSessionData } from "@/lib/core/session"; // আপনার প্রোজেক্টের সেশন মেথড অনুযায়ী পরিবর্তন করতে পারেন
import MyProfileClient from "@/components/shared/MyProfileSection";
import { redirect } from "next/navigation";
import { userPostedLessons } from "@/lib/action/action";


// মেটাডাটা সেট করতে পারবেন যেহেতু এটি সার্ভার কম্পোনেন্ট
export const metadata = {
  title: "My Profile | LessonUp",
  description: "Manage your profile and viewed lessons.",
};

export default async function MyProfilePage() {
    const user = await getSessionData();
  
    
    if (!user || user?.role !== 'user') {
      redirect("/");
    }
    const userId = user?.id || user?._id
  
const userLessons = await userPostedLessons(userId)
  // এখানে আপনি চাইলে সরাসরি ডাটাবেজ থেকে ইউজারের তৈরি করা রিয়েল লেসন ডাটা ফেচ করতে পারেন
  const mockLessons = [
    { id: 1, title: "Mastering Next.js 15 Server Actions Like a Pro", category: "Web Dev", reactions: 45, saves: 12, date: "20 May 2026" },
    { id: 2, title: "Advanced MongoDB Aggregation Pipelines Explained", category: "Database", reactions: 32, saves: 9, date: "18 May 2026" },
    { id: 3, title: "Building Secure Auth with Better-Auth & Express", category: "Backend", reactions: 67, saves: 28, date: "10 May 2026" },
  ];

  const initialStats = {
    created: mockLessons.length,
    saved: 8, // ব্যাকএন্ড কাউন্ট লজিক বসাতে পারেন
  };

  return (
    <MyProfileClient
      initialUser={user} 
      initialLessons={userLessons} 
      initialStats={initialStats} 
    />
  );
}