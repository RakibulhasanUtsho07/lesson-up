"use client";

import React from "react";

export default function WhyLearningMatters() {
  const benefits = [
    {
      id: 1,
      icon: (
        <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Prevent Knowledge Fade",
      description: "Human memory is fragile. Documenting your breakthrough moments ensures that valuable lessons learned today remain active blueprints for your future self.",
      glowColor: "hover:border-cyan-500/50 bg-cyan-100 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)]"
    },
    {
      id: 2,
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Accelerate Personal Growth",
      description: "Reviewing past experiences allows you to find patterns in your decisions. Avoid repeating the same mistakes and fast-track your emotional and professional maturity.",
      glowColor: "hover:border-indigo-500/50 bg-indigo-100 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
    },
    {
      id: 3,
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Collective Shared Wisdom",
      description: "By securely putting your lessons into the public sphere, you contribute to a meaningful global mentor-pool, helping someone else navigate their hardest days.",
      glowColor: "hover:border-amber-500/50 bg-amber-100 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
    },
    {
      id: 4,
      icon: (
        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Clarify Your True Intentions",
      description: "Writing down life metrics helps remove emotional noise. It crystallizes your focus, builds core accountability, and transforms raw thoughts into structural identity.",
      glowColor: "hover:border-emerald-500/50 bg-emerald-100  hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      
      {/* হেডিং সেকশন (সাদা ব্যাকগ্রাউন্ডে স্পষ্ট দেখার জন্য text-slate-900 ও text-slate-600 ব্যবহার করা হয়েছে) */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          Why Learning From Life <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 bg-clip-text text-transparent">Matters</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
          Preserving personal wisdom isn't just about indexing thoughts; it's the core architecture of intentional living.
        </p>
      </div>

      {/* ৪টি বেনিফিট কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className={`group p-6 rounded-2xl  border border-slate-200 shadow-sm transition-all duration-300 flex flex-col justify-between ${benefit.glowColor}`}
          >
            <div>
              {/* আইকন কন্টেইনার */}
              <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>

              {/* কার্ড টাইটেল (text-slate-800) */}
              <h3 className="text-base font-bold text-slate-800 transition-colors">
                {benefit.title}
              </h3>

              {/* কার্ড ডেসক্রিপশন (text-slate-600 দিয়ে স্পষ্ট করা হয়েছে) */}
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {benefit.description}
              </p>
            </div>

            {/* নিচের বর্ডার লাইন */}
            <div className="w-8 h-[2px] bg-slate-300 mt-6 group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>

    </section>
  );
}