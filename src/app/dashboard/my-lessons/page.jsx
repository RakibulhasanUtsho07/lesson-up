import MyLessonsSection from '@/components/shared/MyLessonsSection';
import { userPostedLessons } from '@/lib/action/action';

import { authClient } from '@/lib/auth-client';

import { headers } from "next/headers";


import React from 'react'

const  MyLessonsPage =async() =>{
  const nextHeaders = await headers(); 
   const cookieHeader = nextHeaders.get("cookie") || "";
  const { data: session } = await authClient.getSession({
      fetchOptions: {
         headers: {
            cookie: cookieHeader,
         },
      },
   });
    const user = session?.user;
    const userId = user?.id || user?._id;
  const userLessons = await userPostedLessons(userId)
  console.log(user, "hello")
  console.log(userLessons)
  return (
    <div>
        <MyLessonsSection userLessons={userLessons}  />
    </div>
  )
}

export default MyLessonsPage
