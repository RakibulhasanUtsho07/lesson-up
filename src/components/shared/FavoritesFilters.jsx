"use client";

import React from "react";
import { FiSliders, FiRefreshCw } from "react-icons/fi";

export default function FavoritesFilters({
  categoryFilter,
  setCategoryFilter,
  toneFilter,
  setToneFilter,
  categories,
  emotionalTones
}) {
  const handleResetFilters = () => {
    setCategoryFilter("");
    setToneFilter("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/20 border border-slate-900/60 p-4 rounded-2xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs px-2">
          <FiSliders className="text-cyan-500" /> <span>Filters:</span>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-slate-950 border border-slate-800/80 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-slate-300 focus:outline-none focus:border-cyan-500/40 hover:bg-slate-900/50 cursor-pointer transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tone Dropdown */}
        <div className="relative">
          <select
            value={toneFilter}
            onChange={(e) => setToneFilter(e.target.value)}
            className="appearance-none bg-slate-950 border border-slate-800/80 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-slate-300 focus:outline-none focus:border-cyan-500/40 hover:bg-slate-900/50 cursor-pointer transition-all"
          >
            <option value="">All Tones</option>
            {emotionalTones.map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Trigger */}
      {(categoryFilter || toneFilter) && (
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white hover:bg-rose-500 font-bold text-xs h-9 rounded-xl px-4 transition-all w-full md:w-auto justify-center"
        >
          <FiRefreshCw className="text-xs" />
          Clear Active Filters
        </button>
      )}
    </div>
  );
}