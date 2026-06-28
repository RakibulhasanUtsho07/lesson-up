import React from "react";

import { getSessionData } from "@/lib/core/session"; // আপনার প্রোজেক্টের সেশন মেথড অনুযায়ী পরিবর্তন করতে পারেন
import MyProfileClient from "@/components/shared/MyProfileSection";
import { redirect } from "next/navigation";
import { userPostedLessons } from "@/lib/action/action";
import { getFavoriteLessons } from "@/lib/data/data";


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
const favoritesLessons = await getFavoriteLessons(userId)
  
 

  const initialStats = {
    created: userLessons.length,
    saved: favoritesLessons.length, 
  };

  return (
    <MyProfileClient
      initialUser={user} 
      initialLessons={userLessons} 
      initialStats={initialStats} 
    />
  );
}