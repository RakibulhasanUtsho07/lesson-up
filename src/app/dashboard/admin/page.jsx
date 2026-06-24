import AdminDashboardHomeSection from '@/components/shared/DashboardHome'
import { getLessonsCount, getTotalUserCount } from '@/lib/action/action';

import React from 'react'

const AdminDashboardHomePage = async () => {

  const lessonCountData = await getLessonsCount();
  const userCountData = await getTotalUserCount()
  const totalUser = userCountData?.totalUser || 0
  const totalLessons = lessonCountData?.totalLessons || 0

  console.log(totalLessons, "totalLessons")
  
  return (
    <div>

      <AdminDashboardHomeSection
       totalLessonsCount={totalLessons}
       totalUserCount={totalUser}
       />
    </div>
  )
}

export default AdminDashboardHomePage;
