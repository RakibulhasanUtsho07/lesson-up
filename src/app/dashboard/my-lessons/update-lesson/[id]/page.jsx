import UpdateDataLoading from '@/components/shared/UpdateDataLoading'
import UpdateLessonForm from '@/components/shared/UpdateLessonForm'
import { getLessonDetails } from '@/lib/data/data'
// import { getLessonUpdate } from '@/lib/data/data'



import React from 'react'




 

export default async function UpdateLessonPage({ params }) {
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