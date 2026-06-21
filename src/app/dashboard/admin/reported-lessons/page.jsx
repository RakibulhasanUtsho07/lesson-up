"use client";

import React, { useState } from "react";
import { Card, Avatar, Button, Tooltip } from "@heroui/react";
import { 
  FiAlertTriangle, 
  FiTrash2, 
  FiCheckCircle, 
  FiEye, 
  FiUser, 
  FiX, 
  FiInfo 
} from "react-icons/fi";

// 📋 ডামি রিপোর্টেড লেসন ডাটা (রিপোর্ট করার কারণ এবং রিপোর্টারের মেটাডাটাসহ)
const initialReportedLessons = [
  {
    id: "rep_1",
    title: "How to Hack NASA using HTML v5 (Spam Tutorial)",
    reportCount: 7,
    category: "Cybersecurity",
    reports: [
      { id: "r1", reporter: "Rahat Khan", email: "rahat@gmail.com", reason: "Spam content and misleading clickbait title." },
      { id: "r2", reporter: "Samiul Islam", email: "sami@yahoo.com", reason: "Dangerous content promoting illegal activity." },
      { id: "r3", reporter: "Anika Ahmed", email: "anika@outlook.com", reason: "Irrelevant and fake tutorials." },
    ]
  },
  {
    id: "rep_2",
    title: "Unlocking Free Premium Subscriptions Forever",
    reportCount: 3,
    category: "Tech Hacks",
    reports: [
      { id: "r4", reporter: "Admin Bot", email: "system@lessonup.com", reason: "Copyright infringement and piracy instructions." },
      { id: "r5", reporter: "Tanvir Hossain", email: "tanvir@dev.com", reason: "Violates community guidelines." }
    ]
  }
];

export default function ReportedLessonsPage() {
  const [reportedLessons, setReportedLessons] = useState(initialReportedLessons);
  const [selectedLesson, setSelectedLesson] = useState(null); // মোডাল কন্ট্রোল স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🗑️ Action 1: Delete Lesson (Permanently removes from platform)
  const handleDeleteLesson = (id) => {
    setReportedLessons(prev => prev.filter(lesson => lesson.id !== id));
    if (selectedLesson?.id === id) closeModal();
  };

  // ✅ Action 2: Ignore (Keeps the lesson live and clears all reports)
  const handleIgnoreReports = (id) => {
    setReportedLessons(prev => prev.filter(lesson => lesson.id !== id));
    if (selectedLesson?.id === id) closeModal();
  };

  // মোডাল হ্যান্ডলার্স
  const openReportsModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-[#02050d] text-slate-100 p-4 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Cyber Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 👑 হেডার সেকশন */}
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

      {/* 📊 টেবিল ডিসপ্লে */}
      <Card className="bg-slate-950/20 border border-slate-900 shadow-2xl rounded-2xl overflow-visible relative z-10">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Lesson Details</th>
                <th className="py-4 px-4 text-center">Report Count</th>
                <th className="py-4 px-4 text-center">Logs</th>
                <th className="py-4 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40 text-xs font-medium text-slate-300">
              
              {reportedLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-rose-950/5 transition-colors group">
                  
                  {/* লেসন টাইটেল */}
                  <td className="py-4 px-6 max-w-sm">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-200 font-bold line-clamp-1 group-hover:text-rose-400 transition-colors">
                        {lesson.title}
                      </span>
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[9px] font-black uppercase tracking-wide text-slate-500">
                          {lesson.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* রিপোর্টের সংখ্যা */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-black">
                      <FiAlertTriangle className="size-3" /> {lesson.reportCount} Flags
                    </span>
                  </td>

                  {/* মোডাল খোলার বাটন */}
                  <td className="py-4 px-4 text-center">
                    <Button 
                      size="sm"
                      variant="bordered"
                      onClick={() => openReportsModal(lesson)}
                      className="border-slate-800 text-[11px] font-bold h-8 rounded-xl text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 bg-slate-950"
                      startContent={<FiInfo className="text-xs" />}
                    >
                      View Reasons
                    </Button>
                  </td>

                  {/* অপারেশনাল অ্যাকশনস */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      
                      {/* Ignore/Keep Live Button */}
                      <Button 
                        size="sm"
                        onClick={() => handleIgnoreReports(lesson.id)}
                        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px] h-8 rounded-xl hover:bg-emerald-500/20 px-3"
                        startContent={<FiCheckCircle />}
                      >
                        Ignore
                      </Button>

                      {/* Permanent Delete Button */}
                      <Tooltip content="Permanently Delete Lesson" className="bg-slate-950 text-xs text-rose-400 border border-rose-950">
                        <button 
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all"
                        >
                          <FiTrash2 className="size-3.5" />
                        </button>
                      </Tooltip>

                    </div>
                  </td>

                </tr>
              ))}

              {reportedLessons.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-slate-600 font-bold tracking-widest uppercase text-xs">
                    🎉 Platform Clean. Zero Reported Material.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </Card>

      {/* 🚨 রিপোর্টের কারণ এবং রিপোর্টার ইনফো দেখার মোডাল (Custom Overlay) */}
      {isModalOpen && selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-900 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[85vh]">
            
            {/* মোডাল হেডার */}
            <div className="p-5 border-b border-slate-900/60 flex items-start justify-between bg-slate-900/10">
              <div className="space-y-1 pr-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Incident Details Log</span>
                <h3 className="text-sm font-black text-white leading-snug line-clamp-2">{selectedLesson.title}</h3>
              </div>
              <button 
                onClick={closeModal}
                className="p-1.5 text-slate-500 hover:text-white bg-slate-900/60 border border-slate-800 rounded-lg transition-colors"
              >
                <FiX className="size-4" />
              </button>
            </div>

            {/* মোডাল বডি (রিপোর্টার্স গ্রিড/লিস্ট) */}
            <div className="p-6 overflow-y-auto space-y-4 bg-slate-950 flex-1">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Logged Grievances ({selectedLesson.reports.length})</h4>
              
              <div className="space-y-3">
                {selectedLesson.reports.map((report) => (
                  <div key={report.id} className="p-4 bg-slate-900/30 border border-slate-900/80 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <FiUser className="text-cyan-500 shrink-0" />
                      <span className="font-bold text-slate-300">{report.reporter}</span>
                      <span className="text-[10px] text-slate-600 font-medium">({report.email})</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium pl-6 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-900/40">
                      "{report.reason}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* মোডাল ফুটার (দ্রুত সিদ্ধান্তের জন্য অ্যাকশন বাটন) */}
            <div className="p-4 border-t border-slate-900/60 bg-slate-900/20 flex items-center justify-end gap-3">
              <Button 
                size="sm"
                variant="flat"
                onClick={() => handleIgnoreReports(selectedLesson.id)}
                className="bg-emerald-500/10 text-emerald-400 font-bold rounded-xl text-xs h-9 px-4"
              >
                Ignore Reports
              </Button>
              <Button 
                size="sm"
                onClick={() => handleDeleteLesson(selectedLesson.id)}
                className="bg-gradient-to-r from-rose-600 to-red-500 text-white font-black rounded-xl text-xs h-9 px-4"
              >
                Delete Content
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
