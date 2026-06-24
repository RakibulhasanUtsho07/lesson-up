"use client";

import React, { useState, useEffect } from "react";
import { Button, Link, Tooltip, Card } from "@heroui/react";
import { 
  FiEye, 
  FiEyeOff, 
  FiLock, 
  FiUnlock, 
  FiTrash2, 
  FiEdit2, 
  FiInfo, 
  FiHeart, 
  FiBookmark, 
  FiCalendar,
  FiSearch
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

export default function MyLessonsSection({ userLessons, userPlan = "Free" }) {
  
  const initialLessonsArray = Array.isArray(userLessons) 
    ? userLessons 
    : (userLessons?.totalLessons || []);

  const isFreeUser = userPlan === "Free";

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  
  const [lessons, setLessons] = useState(initialLessonsArray);

  useEffect(() => {
    setLessons(initialLessonsArray);
  }, [userLessons]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

 
  const toggleVisibility = (id) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        (lesson._id === id || lesson.id === id) 
          ? { ...lesson, visibility: lesson.visibility === "Public" ? "Private" : "Public" }
          : lesson
      )
    );
  };

  const toggleAccessLevel = (id) => {
    if (isFreeUser) return; 
    setLessons(prevLessons => 
      prevLessons.map(lesson =>
        (lesson._id === id || lesson.id === id) 
          ? { ...lesson, accessLevel: lesson.accessLevel === "Free" ? "Premium" : "Free" }
          : lesson
      )
    );
  };

  const triggerDeleteConfirm = (lesson) => {
    setLessonToDelete(lesson);
    setIsDeleteModalOpen(true);
  };


  const executeDelete = () => {
    setLessons(prevLessons => prevLessons.filter(l => l._id !== lessonToDelete._id && l.id !== lessonToDelete.id));
    setIsDeleteModalOpen(false);
    setLessonToDelete(null);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center">
        <p className="text-sm font-medium text-slate-400">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-8 relative overflow-hidden">
    
      <div className="absolute top-10 right-10 size-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

 
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-6 relative z-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            My Lessons
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage, update, track stats, and configure access settings for your published wisdom.
          </p>
        </div>
        
        {/* সার্চ বার */}
        <div className="relative flex items-center max-w-xs w-full">
          <FiSearch className="absolute left-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search your lessons..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500/50 text-slate-300 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* 📊 টেবিল কন্টেইনার */}
      <Card className="bg-slate-900/20 border border-slate-900 shadow-2xl backdrop-blur-md rounded-2xl overflow-visible relative z-10">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Lesson Info</th>
                <th className="py-4 px-4">Stats</th>
                <th className="py-4 px-4">Visibility</th>
                <th className="py-4 px-4">Access Level</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 text-sm font-medium">
              {
                lessons?.map((lesson, ind) => {
                  console.log(lesson, "count lesson")
                  // এখানে কারেন্ট আইডি নির্ধারণ করা হলো যাতে ক্র্যাশ না করে
                  const currentId = lesson._id || lesson.id;

                  return (
                    <tr key={currentId} className="hover:bg-slate-900/30 transition-colors group">
                      
                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-slate-200 font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors">
                            {lesson.title}
                          </span>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-900 uppercase font-black tracking-wide text-slate-400">
                              {lesson.category || "General"}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar /> {lesson.date || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* কাউন্টার */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-900 px-2.5 py-1 rounded-lg text-rose-400">
                            <FiHeart className="fill-rose-500/10" /> {lesson.likes || 0}
                          </span>
                          <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-900 px-2.5 py-1 rounded-lg text-amber-400">
                            <FiBookmark className="fill-amber-500/10" /> {lesson.favorites || 0}
                          </span>
                        </div>
                      </td>

                      {/* ভিজিবিলিটি */}
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => toggleVisibility(currentId)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                            lesson.visibility === "Public" 
                              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20" 
                              : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {lesson.visibility === "Public" ? <FiEye /> : <FiEyeOff />}
                          {lesson.visibility || "Public"}
                        </button>
                      </td>

                      {/* অ্যাক্সেস লেভেল */}
                      <td className="py-4 px-4">
                        {isFreeUser ? (
                          <Tooltip 
                            content="Upgrade to Premium to restrict content" 
                            placement="top"
                            className="bg-slate-900 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-800"
                          >
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-600 cursor-not-allowed w-fit">
                              <FiLock />
                              Free Tier Only
                            </div>
                          </Tooltip>
                        ) : (
                          <button 
                            onClick={() => toggleAccessLevel(currentId)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                              lesson.accessLevel === "Premium" 
                                ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-orange-500/30 text-orange-400 hover:brightness-110" 
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            {lesson.accessLevel === "Premium" ? <FiLock /> : <FiUnlock />}
                            {lesson.accessLevel || "Free"}
                          </button>
                        )}
                      </td>

                      {/* অ্যাকশন বাটনস */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip content="View Lesson" className="bg-slate-900 text-slate-200 text-xs rounded-lg">
                            <button className="p-2 bg-slate-950 border border-slate-900 text-slate-400 hover:text-cyan-400 rounded-xl transition-all hover:scale-105">
                              <FiInfo className="size-4" />
                            </button>
                          </Tooltip>

                          <Link href={`/dashboard/my-lessons/update-lesson/${lesson._id}`}  content="Edit Lesson" className="bg-slate-900 text-slate-200 text-xs rounded-lg">
                            <button className="p-2 bg-slate-950 border border-slate-900 text-slate-400 hover:text-amber-400 rounded-xl transition-all hover:scale-105">
                              <FiEdit2 className="size-4" />
                            </button>
                          </Link>

                          <Tooltip content="Delete Permanently" className="bg-slate-900 text-slate-200 text-xs rounded-lg">
                            <button 
                              onClick={() => triggerDeleteConfirm(lesson)}
                              className="p-2 bg-slate-950 border border-slate-900 text-slate-500 hover:text-rose-400 hover:border-rose-500/20 rounded-xl transition-all hover:scale-105"
                            >
                              <FiTrash2 className="size-4" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>

                    </tr>
                  );
                })
              }
              {lessons?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-600 font-bold">
                    No lessons found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 🚨 মোডাল */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Permanently Delete Lesson?</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to delete <span className="text-rose-400 font-bold">"{lessonToDelete?.title}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-500 rounded-xl shadow-lg shadow-rose-500/10 hover:brightness-110 active:scale-95 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}