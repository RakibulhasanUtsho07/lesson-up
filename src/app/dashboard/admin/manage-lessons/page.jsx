import AdminManageLessonsSection from '@/components/shared/AdminManageLessonsSection'
import { getSessionData } from '@/lib/core/session'
import { getPublicLessons } from '@/lib/data/data'
import { redirect } from 'next/navigation'
import React from 'react'

const  AdminManageLessonsPage=async() =>{
   const user = await getSessionData()
    if (!user || user?.role !== 'admin') {
          redirect("/");
        }
  const lessons =await getPublicLessons()
  console.log(lessons, "hi lessons")
  return (
    <div>
      <AdminManageLessonsSection allLessons={lessons}/>
    </div>
  )
}

export default AdminManageLessonsPage
