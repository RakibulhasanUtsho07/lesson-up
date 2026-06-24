import React from "react";
import { getSessionData } from "@/lib/core/session";
import { getFavoriteLessons } from "@/lib/data/data";
import MyFavoritesClientContainer from "@/components/shared/MyFavoritesClientContainer";
import { redirect } from "next/navigation";

// export const metadata = {
//   title: "My Favorites | LessonUp",
//   description: "Review and organize your saved masterclasses and personal learning paths.",
// };

export default async function MyFavoritesPage() {
  
   const user = await getSessionData();
  
    
    if (!user || user?.role !== 'user') {
      redirect("/");
    }
  const userId = user?.id || user?._id || null;

const favoritesLessons = await getFavoriteLessons(userId)
console.log(favoritesLessons, userId, "favo")
  
  // 🔄 সার্ভার থেকেই ডেটাবেস কুয়েরি রান করা হচ্ছে
  

  return (
    <MyFavoritesClientContainer 
      initialFavorites={favoritesLessons} 
    />
  );
}