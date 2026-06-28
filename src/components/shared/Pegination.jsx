"use client";

import { useState } from "react";
import PublicLesson from "@/components/shared/PublicLesson";

export function PaginationWithSummary({ publicLessons, user }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = publicLessons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // ✅ Math.ceil নাহলে decimal হবে

  // ✅ paginatedLessons এখানে define করা
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLessons = publicLessons.slice(startIndex, endIndex);

  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, totalItems);

  return (
    <div className="space-y-8">
      {/* Lesson Grid */}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900">
          
          {/* Summary */}
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-300 font-bold">{startItem}–{endItem}</span> of{" "}
            <span className="text-slate-300 font-bold">{totalItems}</span> results
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${
                    p === page
                      ? "bg-cyan-500 text-slate-950 border border-cyan-400"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}