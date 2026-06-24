import AdminManageLessonsSection from '@/components/shared/AdminManageLessonsSection'
import { getPublicLessons } from '@/lib/data/data'
import React from 'react'

const  AdminManageLessonsPage=async() =>{
  const lessons =await getPublicLessons()
  console.log(lessons, "hi lessons")
  return (
    <div>
      <AdminManageLessonsSection allLessons={lessons}/>
    </div>
  )
}

export default AdminManageLessonsPage
