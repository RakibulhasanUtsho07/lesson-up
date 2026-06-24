"use client";

import React, { useState, useMemo } from "react";
import { FiBookmark, FiGrid } from "react-icons/fi";
import toast from "react-hot-toast";
import FavoritesTable from "@/components/shared/FavoritesTable";
import FavoritesFilters from "./FavoritesFilters";

export default function MyFavoritesClientContainer({ initialFavorites }) {
  const [favorites, setFavorites] = useState(initialFavorites || []);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

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

  // অপটিমিস্টিক রিমুভ হ্যান্ডেলার
  const handleRemoveFavorite = async (id, title) => {
    const previousFavorites = [...favorites];
    setFavorites(prev => prev.filter(item => item._id !== id));

    try {
      // TODO: আপনার ব্যাকএন্ড ডিলিট API বা সার্ভার অ্যাকশন কল এখানে দিন
      // await deleteFavoriteFromDb(id);
      toast.success(`"${title}" removed from favorites.`);
    } catch (error) {
      setFavorites(previousFavorites);
      toast.error("Failed to remove item. Please try again.");
    }
  };

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

      {/* 🛠️ Filters Component */}
      <FavoritesFilters 
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        toneFilter={toneFilter}
        setToneFilter={setToneFilter}
        categories={categories}
        emotionalTones={emotionalTones}
      />

      {/* Main Table Content */}
      <FavoritesTable
        lessons={filteredFavorites}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
}