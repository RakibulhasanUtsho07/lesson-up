"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FiRefreshCw, FiGrid, FiBookmark, FiSliders } from "react-icons/fi";
import toast from "react-hot-toast";
import FavoritesTable from "@/components/shared/FavoritesTable";

import { authClient } from "@/lib/auth-client";
import { getFavoriteLessons } from "@/lib/data/data";

export default function MyFavoritesPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const user = session?.user;
  const userId = user?.id || user?._id;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  // 🔄 ডেটাবেস থেকে ডেটা লোড করার ইফেক্ট
  useEffect(() => {
    async function loadFavorites() {
      if (!userId) return;
      try {
        setIsLoading(true);
        const data = await getFavoriteLessons(userId);
        setFavorites(data || []);
      } catch (error) {
        console.error("Error in fetching user favorites:", error);
        toast.error("Failed to load saved lessons.");
      } finally {
        setIsLoading(false);
      }
    }

    if (!isSessionPending) {
      loadFavorites();
    }
  }, [userId, isSessionPending]);

  // ইউনিক ক্যাটাগরি এবং টোন এক্সট্রাক্ট করা
  const categories = useMemo(() => [...new Set(favorites.map(f => f.category).filter(Boolean))], [favorites]);
  const emotionalTones = useMemo(() => [...new Set(favorites.map(f => f.tone || f.emotionalTone).filter(Boolean))], [favorites]);

  // ফিল্টার লজিক
  const filteredFavorites = useMemo(() => {
    return favorites.filter((lesson) => {
      const matchesCategory = categoryFilter ? lesson.category === categoryFilter : true;
      const currentTone = lesson.tone || lesson.emotionalTone;
      const matchesTone = toneFilter ? currentTone === toneFilter : true;
      return matchesCategory && matchesTone;
    });
  }, [favorites, categoryFilter, toneFilter]);

  const handleRemoveFavorite = async (id, title) => {
    const previousFavorites = [...favorites];
    setFavorites(prev => prev.filter(item => item._id !== id));

    try {
      // এখানে আপনার ব্যাকএন্ড ডিলিট API কলটি যোগ করতে পারেন
      toast.success(`"${title}" removed from favorites.`);
    } catch (error) {
      setFavorites(previousFavorites);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const handleResetFilters = () => {
    setCategoryFilter("");
    setToneFilter("");
  };

  if (isSessionPending || isLoading) {
    return (
      <div className="min-h-screen bg-[#070a13] text-slate-400 flex flex-col gap-3 items-center justify-center font-sans">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
        <p className="text-xs font-bold tracking-widest text-slate-500 uppercase animate-pulse">Loading your vault...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 p-4 md:p-8 space-y-8 font-sans selection:bg-cyan-500/20">
      
      {/* Upper Glass Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-900 bg-gradient-to-br from-slate-900/40 to-slate-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              <FiBookmark className="animate-bounce" /> Curated Collection
            </div>
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Favorite Lessons
            </h1>
            <p className="text-xs text-slate-400 max-w-md">
              Review, filter, and organize your saved masterclasses and personal learning paths.
            </p>
          </div>

          {/* Quick Counter Display */}
          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 p-3 rounded-2xl">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <FiGrid size={20} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{filteredFavorites.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Filter Shell */}
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

      {/* Main Table Content */}
      <FavoritesTable
        lessons={filteredFavorites}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
}