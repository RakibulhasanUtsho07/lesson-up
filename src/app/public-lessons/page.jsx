import React from 'react';
import PublicLesson from '@/components/shared/PublicLesson';
import { getPublicLessons } from '@/lib/data/data';
import { FiCompass } from 'react-icons/fi';
import { getSessionData } from '@/lib/core/session';
import FilterPublicLessons from '@/components/shared/FilterPublicLessons';
import SearchPublicLessons from '@/components/shared/SearchPublicLessons';
import { PaginationWithSummary } from '@/components/shared/Pegination'; // বানান চেক করে নিবেন (Pagination)

async function PublicLessonsPage({ searchParams }) {
  // ১. searchParams রিজলভ করা (Next.js SSR স্ট্যান্ডার্ড)
  const filters = await searchParams;
 
  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();
  
  // ২. সার্ভার সাইড থেকে ফিল্টার, সার্চ ও পেজিনেশনসহ ডেটা ফেচিং
  const publicLessons = await getPublicLessons(queryString) || [];

  const user = await getSessionData();

  // ৩. পেজিনেশনের জন্য লিমিট সেটআপ (যদি এপিআই লেভেলে স্লাইস না করে ফ্রন্টএন্ডে করতে চান)
  const currentPage = Number(filters?.page) || 1;
  const itemsPerPage = 6; // আপনার গ্রিড অনুযায়ী প্রতি পেজে ৬ বা ৯টি করে লেসন দেখানো বেস্ট হবে
  
  // যদি আপনার এপিআই অলরেডি স্লাইসড ডাটা দেয়, তবে ব্যাকএন্ড থেকে টোটাল কাউন্ট আনবেন।
  // আর যদি এপিআই ফিল্টার করা সব ডেটা একসাথে দেয়, তবে নিচের মতো করে ফ্রন্টএন্ডে স্লাইস করে নেবেন:
  const totalItems = publicLessons.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLessons = publicLessons.slice(startIndex, endIndex);
 
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

            {/* Client-side Search (যা ইউআরএল আপডেট করবে) */}
            <SearchPublicLessons filters={filters} />

          </div>
        </div>
      </div>

      {/* 2. Main Content & Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filters Top Bar */}
        <FilterPublicLessons filters={filters} publicLessons={publicLessons} />

        {/* 3. Responsive Grid Container */}
        {totalItems === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-slate-900 rounded-3xl bg-slate-900/10">
            <p className="text-slate-500 font-medium text-sm">No public lessons found. Be the first to share one!</p>
          </div>
        ) : (
         <>
          {/* এখানে আমরা paginatedLessons ম্যাপ করছি */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedLessons.map((lesson, ind) => (
              <div 
                key={lesson._id || ind} 
                className="group transform hover:-translate-y-1 transition-all duration-300"
              >
                <PublicLesson lesson={lesson} user={user} />
              </div>
            ))}
          </div>
          
          {/* ⚡ ৪. সার্ভার সাইড পেজিনেশন লিংক */}
          <PaginationWithSummary 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
          />
         </>
        )}

      </div>
    </div>
  );
}

export default PublicLessonsPage;