import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
 // সঠিক পাথ দিন
import { getReportedData } from "@/lib/data/data";
import ReportedLessonsClient from "@/components/shared/ReportedLessonClient";




export default async function ReportedLessonsPage() {
  const reportedLessons = await getReportedData()

  return (
    <div className="min-h-screen bg-[#02050d] text-slate-100 p-4 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Cyber Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 👑 হেডার সেকশন (সার্ভার রেন্ডার্ড) */}
      <div className="border-b border-slate-900 pb-6 relative z-10">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-rose-500 uppercase mb-1">
          <FiAlertTriangle className="animate-pulse text-sm" /> High Priority Incidents
        </div>
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
          Reported Lessons Log
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review community-flagged materials. Protect the platform integrity by dismissing or taking strict down-actions.
        </p>
      </div>

      {/* ⚡ ক্লায়েন্ট ইন্টারেক্টিভ কম্পোনেন্ট লোড করা হলো এবং প্রপস পাস করা হলো */}
      <ReportedLessonsClient initialReportedLessons={reportedLessons} />
    </div>
  );
}