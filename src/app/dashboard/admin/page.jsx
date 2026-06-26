import AdminDashboardHomeSection from '@/components/shared/DashboardHome';
import { getLessonsCount, getTotalUserCount } from '@/lib/action/action';
import { getSessionData } from '@/lib/core/session';
import { getMonthlyLessonsCount, getReportsCount, getTodayLessonsCount } from '@/lib/data/data';
import { redirect } from 'next/navigation'; // 🎯 সঠিক ইম্পোর্ট পাথ

import React from 'react';

const AdminDashboardHomePage = async () => {
  const user = await getSessionData();

  
  if (!user || user?.role !== 'admin') {
    redirect("/");
  }

  const lessonCountData = await getLessonsCount();
  const userCountData = await getTotalUserCount();
  const countReports = await getReportsCount()
  const todaysLessonCount = await getTodayLessonsCount()
  const countMonthlyLessons = await getMonthlyLessonsCount()
  console.log(countMonthlyLessons, "hi hello")
  
  const totalUser = userCountData?.totalUser || 0;
  const totalLessons = lessonCountData?.totalLessons || 0;
  

  console.log(totalLessons, "totalLessons");
  
  return (
    <div>
      <AdminDashboardHomeSection
        totalLessonsCount={totalLessons}
        totalUserCount={totalUser}
        totalReports={ countReports}
        todaysLessonCount={todaysLessonCount}
        countMonthlyLessons={countMonthlyLessons}
      />
    </div>
  );
};

export default AdminDashboardHomePage;