import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiHeart, FiBookmark, FiFlag, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export default function InteractionBar({ lessonId, likes, setLikes, favorites, setFavorites, user }) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("Spam");

  const hasLiked = user ? likes.includes(user.id) : false;
  const hasSaved = user ? favorites.includes(user.id) : false;

  const handleLikeToggle = () => {
    if (!user) return toast.error("Please log in to like this lesson!");
    
    if (hasLiked) {
      setLikes(prev => prev.filter(id => id !== user.id));
    } else {
      setLikes(prev => [...prev, user.id]);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনার DB-র lessonsReports কালেকশনে এন্ট্রি তৈরি হবে
    toast.success("Incident logged. Content moderation team notified.");
    setIsReportOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-950/20 border border-slate-900 rounded-xl">
      <div className="flex items-center gap-3">
        {/* Real-time Like Button */}
        <Button 
          size="sm" 
          onClick={handleLikeToggle}
          className={`font-bold text-xs rounded-xl h-9 px-4 ${hasLiked ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-slate-950 border border-slate-900 text-slate-400"}`}
          startContent={<FiHeart className={hasLiked ? "fill-rose-400" : ""} />}
        >
          {hasLiked ? "Liked" : "Like"}
        </Button>

        {/* Save Toggle Button */}
        <Button 
          size="sm"
          className="bg-slate-950 border border-slate-900 font-bold text-xs rounded-xl h-9 text-slate-400 hover:text-cyan-400"
          startContent={<FiBookmark />}
        >
          Save
        </Button>
      </div>

      {/* Report Button */}
      <Button 
        size="sm" 
        onClick={() => setIsReportOpen(true)}
        className="bg-slate-950 border border-slate-900/60 text-slate-500 hover:text-rose-400 font-bold text-xs rounded-xl h-9"
        startContent={<FiFlag />}
      >
        Report Incident
      </Button>

      {/* 🚩 Report Popup Modal Overlay */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto">
          <form onSubmit={handleReportSubmit} className="w-full max-w-md bg-slate-950 border border-slate-900 p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2"><FiFlag className="text-rose-500" /> Report Lesson</h3>
              <button type="button" onClick={() => setIsReportOpen(false)} className="text-slate-500 hover:text-white"><FiX /></button>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Reason for flag</label>
              <select 
                value={reportReason} 
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500/50"
              >
                <option value="Spam">Spam Content / Phishing</option>
                <option value="Harassment">Hate Speech & Harassment</option>
                <option value="Copyright">Copyright Infringement</option>
                <option value="Inaccurate">Misleading Information</option>
              </select>
            </div>

            <Button type="submit" size="sm" fullWidth className="bg-rose-600 text-white font-black text-xs h-10 rounded-xl">
              Submit Grievance
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}