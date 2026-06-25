"use client";

import React, { useState, useEffect } from "react";
import { Card, Avatar, Tooltip, Link } from "@heroui/react";
import {
  FiSearch,

  FiCheckCircle,
  FiEye,
  FiFlag,
  FiStar
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { adminDeleteLesson, setFeatured } from "@/lib/action/action"; // আপনার সঠিক পাথ দিন

import UniqueSystemAlertDialog from "./AlearDialog";

export default function AdminManageLessonsSection({ allLessons }) {
  const router = useRouter();
  const [lessons, setLessons] = useState(allLessons);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // ⚡ সার্ভার থেকে নতুন ডাটা আসলে স্টেট আপডেট করার জন্য
  useEffect(() => {
    setLessons(allLessons);
  }, [allLessons]);

  const handleFeatured = async (lessonId) => {
    if (!lessonId) return;

    try {
      // নেটওয়ার্ক রিকোয়েস্ট পাঠানো
      const data = await setFeatured(lessonId);

      if (data?.success) {
        toast.success(`${data.message}! 🌟`);

        // ⚡ মেইন ফিক্স: লোকাল স্টেট আপডেট করা যাতে স্ক্রিনে সাথে সাথে চেঞ্জ দেখা যায়
        setLessons((prevLessons) =>
          prevLessons.map((lesson) =>
            lesson._id === lessonId
              ? { ...lesson, isFeatured: data.isFeatured }
              : lesson
          )
        );

        router.refresh(); // সার্ভার সিঙ্ক করার জন্য
      } else {
        toast.error(data?.message || "Failed to update.");
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      toast.error("Something went wrong!");
    }
  };
 // ওপরে নিশ্চিত করুন adminDeleteLesson ইমপোর্ট করা আছে

const handleDelete = async (lessonId) => {
  if (!lessonId) return;

 
  // if (!confirm("Are you sure you want to delete this lesson permanently?")) return;
  
  try {
    // ⚡ ফিক্স ৩: adminDeleteLesson এর ভেতর lessonId পাস করা হলো
    const data = await adminDeleteLesson(lessonId);
    
    if (data?.success) {
      toast.success("Lesson deleted successfully! 🗑️");
      
     
      setLessons((prevLessons) => prevLessons.filter((l) => l._id !== lessonId));
      
      router.refresh(); // সার্ভার ডাটা সিঙ্ক করার জন্য
    } else {
      toast.error(data?.message || "Failed to delete content.");
    }
  } catch (error) {
    console.error("Frontend Error:", error);
    toast.error("Something went wrong!");
  }
};

  // ফিল্টারিং ও সার্চ লজিক
  const filteredLessons = lessons.filter(lesson => {
    const titleMatch = lesson?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const nameMatch = lesson?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = titleMatch || nameMatch;

    if (filter === "All") return matchesSearch;
    if (filter === "Reported") return matchesSearch && lesson.status === "Reported";
    if (filter === "Public") return matchesSearch && lesson.status === "Public";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] size-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 헤더 */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-orange-500 uppercase mb-1">
            <FiFlag className="animate-bounce" /> Moderation Panel
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Manage Lessons
          </h1>
        </div>

        {/* সার্চ বার */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center max-w-xs w-full sm:w-64">
            <FiSearch className="absolute left-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search content or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-950 border border-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500/50 text-slate-300"
            />
          </div>

          <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-xl text-xs font-bold">
            {["All", "Public", "Reported"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all ${filter === tab ? "bg-slate-900 text-cyan-400" : "text-slate-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* টেবিল কার্ড */}
      <Card className="bg-slate-950/20 border border-slate-900 shadow-2xl rounded-2xl overflow-visible relative z-10">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Lesson Content</th>
                <th className="py-4 px-4">Author Info</th>
                <th className="py-4 px-4">Safety Status</th>
                <th className="py-4 px-6 text-center">Featured Status</th>
                <th className="py-4 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40 text-xs font-medium text-slate-300">
              {filteredLessons.map((lesson, ind) => {
                const isReported = lesson.status === "Reported";

                return (
                  <tr key={lesson._id || ind} className="hover:bg-slate-900/10 transition-colors group">
                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-slate-200 font-bold line-clamp-1">{lesson?.title}</span>
                        <span className="w-fit px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 uppercase">{lesson?.category}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={lesson?.image} className="size-7 rounded-lg border border-slate-800" />
                        <div>
                          <h4 className="font-bold text-slate-300 leading-none">{lesson?.name}</h4>
                          <span className="text-[10px] text-slate-500">{lesson?.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={isReported ? "text-rose-400 font-bold" : "text-emerald-400"}>
                        {isReported ? `Flagged (${lesson.reports} reports)` : "Clean / Public"}
                      </span>
                    </td>

                    {/* টগল বাটন */}
                    <td>
                      <button
                        onClick={() => handleFeatured(lesson?._id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${lesson?.isFeatured
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 shadow-lg shadow-amber-500/5"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                          }`}
                      >
                        {lesson?.isFeatured ? (
                          <FaStar className="text-amber-400" />
                        ) : (
                          <FiStar className="text-slate-500" />
                        )}
                        <span>{lesson?.isFeatured ? "Featured" : "Make Featured"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">

                      <div className="flex items-center justify-end gap-2.5">



                        {/* কন্টেন্ট রিভিউ বা ভিউ বাটন */}

                        <Link href={`/dashboard/admin/lessons-details/${lesson?._id}`}>

                          <Tooltip content="Quick View" className="bg-slate-950 text-xs text-slate-300 border border-slate-800">

                            <button className="p-2 bg-slate-950 border border-slate-900 text-slate-400 hover:text-cyan-400 rounded-xl transition-all">

                              <FiEye className="size-3.5" />

                            </button>

                          </Tooltip>

                        </Link>



                        {/* যদি রিপোর্টেড হয় তবে ক্লিয়ার/অ্যাপ্রুভ করার বাটন */}

                        {isReported && (

                          <Tooltip content="Keep & Dismiss Reports" className="bg-slate-950 text-xs text-emerald-400 border border-emerald-950">

                            <button

                              onClick={() => handleApprove(lesson._id)}

                              className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all"

                            >                             
                             <FiCheckCircle className="size-3.5" />

                            </button>

                          </Tooltip>
                        )}
                        {/* পার্মানেন্ট ডিলিট বাটন */}

                        <Tooltip content="Force Delete Content" className="bg-slate-950 text-xs text-rose-400 border border-rose-950">
                            <UniqueSystemAlertDialog handleDelete={handleDelete} lesson={lesson}/>
                          {/* <button
                            onClick={() => handleDelete(lesson._id)}
                            className="p-2 bg-slate-950 border border-slate-900 text-slate-500 hover:text-rose-400 hover:border-rose-500/20 rounded-xl transition-all"
                          >
                            <FiTrash2 className="size-3.5" />
                          </button> */}
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}