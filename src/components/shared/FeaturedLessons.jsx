"use client";

import React from "react";
import { FiArrowRight, FiBookOpen, FiClock, FiStar } from "react-icons/fi";
import Link from "next/link";

export default function FeaturedLessons({ lessons = [] }) {
  // ডেটাবেজ থেকে আসা ট্রু/ফলস চেক করে ফিল্টার করা
  const featuredList = lessons.filter(
    (lesson) => lesson.isFeatured === true || lesson.isFeatured === "true"
  );

  if (featuredList.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2">
            <FiStar className="fill-amber-400 animate-pulse" />
            <span>Handpicked Wisdom</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Life Lessons</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            Explore the most impactful stories, profound insights, and practical frameworks shared by top minds.
          </p>
        </div>

        <Link
          href="/public-lessons"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl font-medium px-5 py-2.5 transition-colors duration-200 text-sm"
        >
          <span>View All Lessons</span>
          <FiArrowRight />
        </Link>
      </div>

      {/* Lessons Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {featuredList.map((lesson) => {
          const lessonId = lesson._id || lesson.id;
          
          return (
            <Link
              key={lessonId}
              href={`/public-lessons/${lessonId}`}
              className="bg-slate-950/40 backdrop-blur-md border border-slate-900 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full h-[320px] text-left overflow-hidden"
            >
              {/* Card Main Wrapper */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Card Top: Category & Tone */}
                <div className="flex justify-between items-center w-full mb-4">
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-full">
                    {lesson.category || "General"}
                  </span>
                  {lesson.tone && (
                    <span className="text-slate-500 text-xs font-medium">
                      {lesson.tone}
                    </span>
                  )}
                </div>

                {/* Card Content: Title & Description */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-normal line-clamp-4 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-900/60 flex items-center justify-between text-slate-500 text-xs w-full mt-auto">
                <div className="flex items-center gap-1.5">
                  <FiBookOpen className="text-slate-600" />
                  <span className="truncate max-w-[120px]">
                    By {lesson.name || "Anonymous"}
                  </span>
                </div>
                {lesson.date && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <FiClock className="text-slate-600" />
                    <span>
                      {new Date(lesson.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}