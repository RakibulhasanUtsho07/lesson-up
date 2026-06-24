import UpdateDataLoading from '@/components/shared/UpdateDataLoading'
import UpdateLessonForm from '@/components/shared/UpdateLessonForm'
import { getSessionData } from '@/lib/core/session';
import { getLessonDetails } from '@/lib/data/data'
import { redirect } from 'next/navigation';




import React from 'react'




 

export default async function UpdateLessonPage({ params }) {
    const user = await getSessionData();
  
    
    if (!user || user?.role !== 'user') {
      redirect("/");
    }
  const { id } = await params
  const lessonData = await getLessonDetails(id)
  console.log(lessonData, "lessonData")

  if (!lessonData) {
    return (
      <UpdateDataLoading/>
    )
  }

  return (
   
    <UpdateLessonForm lesson={lessonData} />
  )
}