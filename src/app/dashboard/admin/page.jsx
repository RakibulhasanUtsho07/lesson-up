import AdminDashboardHomeSection from '@/components/shared/DashboardHome'
import { getLessonsCount } from '@/lib/action/action';

import React from 'react'

const AdminDashboardHomePage = async () => {

  const data = await getLessonsCount();
  const totalLessons = data?.totalLessons || 0
  console.log(totalLessons, "totalLessons")
  
  return (
    <div>

      <AdminDashboardHomeSection totalLessonsCount={totalLessons}/>
    </div>
  )
}

export default AdminDashboardHomePage;
