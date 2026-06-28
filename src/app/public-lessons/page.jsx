import React from 'react';
import { getPublicLessons } from '@/lib/data/data';
import { FiCompass } from 'react-icons/fi';
import { getSessionData } from '@/lib/core/session';
import FilterPublicLessons from '@/components/shared/FilterPublicLessons';
import SearchPublicLessons from '@/components/shared/SearchPublicLessons';
import { PaginationWithSummary } from '@/components/shared/Pegination';


async function PublicLessonsPage({ searchParams }) {
  const filters = await searchParams;
  const queryString = new URLSearchParams(filters).toString();
  const publicLessons = await getPublicLessons(queryString) || [];
  const user = await getSessionData();

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100">

      {/* Hero & Search */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-transparent pt-16 pb-12 border-b border-slate-900">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[10%] right-[20%] w-[400px] h-[250px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 tracking-wide uppercase">
                <FiCompass /> Discover Insights
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                All{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Life Lessons
                </span>
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Explore real stories, deep realizations, and curated wisdom shared by our global community.
              </p>
            </div>
            <SearchPublicLessons filters={filters} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FilterPublicLessons filters={filters} publicLessons={publicLessons} />

        {publicLessons.length === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-slate-900 rounded-3xl bg-slate-900/10">
            <p className="text-slate-500 font-medium text-sm">
              No public lessons found. Be the first to share one!
            </p>
          </div>
        ) : (
          // ✅ user prop পাঠানো হচ্ছে, paginatedLessons client component এ handle হবে
          <PaginationWithSummary publicLessons={publicLessons} user={user} />
        )}
      </div>
    </div>
  );
}

export default PublicLessonsPage;