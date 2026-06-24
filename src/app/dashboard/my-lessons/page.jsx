import MyLessonsSection from '@/components/shared/MyLessonsSection';
import { userPostedLessons } from '@/lib/action/action';

import { authClient } from '@/lib/auth-client';
import { getSessionData } from '@/lib/core/session';

import { headers } from "next/headers";
import { redirect } from 'next/navigation';


import React from 'react'

const  MyLessonsPage =async() =>{
    const user = await getSessionData();
  
    
    if (!user || user?.role !== 'user') {
      redirect("/");
    }

  
    const userId = user?.id || user?._id;
  const userLessons = await userPostedLessons(userId)
  console.log(user, "hello")
  console.log(userLessons,"user lessons")
  return (
    <div>
        <MyLessonsSection userLessons={userLessons}  />
    </div>
  )
}

export default MyLessonsPage
