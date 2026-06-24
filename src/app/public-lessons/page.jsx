import React from 'react';
import PublicLesson from '@/components/shared/PublicLesson';
import { getPublicLessons } from '@/lib/data/data';
import { FiGrid, FiCompass, FiSearch, FiSliders } from 'react-icons/fi';
import { getSessionData } from '@/lib/core/session';

// রেসপনসিভ এবং স্টাইলিশ ক্যাটাগরি ট্যাগস (আপনার ক্রিয়েট লেসন পেজের সাথে মিল রেখে)
const quickFilters = [
  { label: "All Lessons", value: "all" },
  { label: "Personal Growth", value: "personal-growth" },
  { label: "Career", value: "career" },
  { label: "Relationships", value: "relationships" },
  { label: "Mindset", value: "mindset" },
];

async function PublicLessonsPage() {
  const publicLessons = await getPublicLessons() || [];
  const user =await getSessionData()

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100">
      
      {/* 1. Hero & Search Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-transparent pt-16 pb-12 border-b border-slate-900">
        {/* Background Glowing Ambient Light */}
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[10%] right-[20%] w-[400px] h-[250px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            {/* Header Text */}
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 tracking-wide uppercase">
                <FiCompass className="animate-spin-slow" /> Discover Insights
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                All <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Life Lessons</span>
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Explore real stories, deep realizations, and curated wisdom shared by our global community.
              </p>
            </div>

            {/* Quick Modern Client-side Search / Input UI */}
            <div className="w-full md:w-80 relative flex items-center">
              <FiSearch className="absolute left-4 text-slate-500 text-base pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search community wisdom..." 
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] outline-none rounded-xl text-sm font-medium transition-all text-slate-200 placeholder:text-slate-600"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Content & Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filters Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-900">
          <div className="flex flex-wrap gap-2 items-center">
            {quickFilters.map((filter, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                  index === 0 
                    ? "bg-slate-900 border-cyan-500/50 text-cyan-400 shadow-[0_4px_12px_rgba(6,182,212,0.1)]" 
                    : "bg-slate-900/30 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <FiGrid /> Showing {publicLessons.length} available lessons
          </div>
        </div>

        {/* 3. Responsive Grid Container */}
        {publicLessons.length === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-slate-900 rounded-3xl bg-slate-900/10">
            <p className="text-slate-500 font-medium text-sm">No public lessons found. Be the first to share one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publicLessons.map((lesson, ind) => (
              <div 
                key={lesson._id || ind} 
                className="group transform hover:-translate-y-1 transition-all duration-300"
              >
                
                <PublicLesson lesson={lesson} user={user} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default PublicLessonsPage;