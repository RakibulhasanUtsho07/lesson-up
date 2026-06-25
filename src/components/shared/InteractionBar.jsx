"use client"
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiHeart, FiBookmark, FiFlag, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { handleReport, postLikedData, postSavedData } from "@/lib/action/action";

export default function InteractionBar({ lesson }) {
  const { _id, likes = 0, favorites = 0 } = lesson || {};
  
  const [likesCount, setLikesCount] = useState(Number(likes));
  const [favoritesCount, setFavoritesCount] = useState(Number(favorites));

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("Spam");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Handles Liking and Sends data to the database
  const handleLikeToggle = async () => {
    if (!user) return toast.error("Please log in to like this lesson!");
    
    // Optimistic UI updates
    if (isLiked) {
      setLikesCount(prev => prev - 1); 
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1); 
      setIsLiked(true);

      const likedUserData = {
        userId: user?.id || user?._id,
        userName: user?.name,
        userImage: user?.image || "",
        lessonId: lesson?.id || _id,
        reportReason : reportReason
      };

      try {
        // Trigger Server Action on user click
        await postLikedData(likedUserData);
        
      } catch (error) {
        // Rollback state if the database operation fails
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
        
      }
    }
  };

 const handleSaveToggle = async () => {
  if (!user) return toast.error("Please log in to save this lesson!");
  
  // Optimistic UI updates
  if (isSaved) {
    setFavoritesCount(prev => prev - 1);
    setIsSaved(false);
    // Optional: Add deleteSavedData(lessonId) here if you handle unsaving in the DB
  } else {
    setFavoritesCount(prev => prev + 1);
    setIsSaved(true);

    const savedData = {
      ...lesson,
      userId: user?.id || user?._id
    };

    try {
      // Pass the savedData payload to your Server Action
      await postSavedData(savedData);
      toast.success("Lesson saved successfully!");
    } catch (error) {
      // Rollback UI state if the backend database operation fails
      setFavoritesCount(prev => prev - 1);
      setIsSaved(false);
      toast.error("Failed to save lesson. Please try again.");
    }
  }
};
const handleReportSubmit = async (e) => {
  if (e && e.preventDefault) e.preventDefault();
  
  const reportedData = {
    lessonId: lesson?._id || lesson?.id,
    reportReason:reportReason,
    title: lesson?.title || "",
    tone: lesson?.tone || "",
    reporterId: user?.id || user?._id,
    createdAt: new Date(), 
    userName: user?.name,
    userId: user?.id || user?._id,
  };

  try {
    const data = await handleReport(reportedData);
    
    // ✅ Fix: check data.success instead of data.acknowledged
    if (data?.success) {
      toast.success("Incident logged. Content moderation team notified. 🛡️");
      if (typeof setIsReportOpen === "function") {
        setIsReportOpen(false);
      }
    } else {
      toast.error(data?.message || "Failed to submit report.");
    }
  } catch (error) {
    console.error("Report Submission Error:", error);
    toast.error(error.message || "Something went wrong while sending the report.");
  }
};

  return (
    <div className="flex items-center justify-between p-4 bg-slate-950/20 border border-slate-900 rounded-xl">
      <div className="flex items-center gap-3">
        {/* Like Button */}
        <Button 
          size="sm" 
          onClick={handleLikeToggle}
          className={`font-bold text-xs rounded-xl h-9 px-4 transition-all ${
            isLiked 
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" 
              : "bg-slate-950 border border-slate-900 text-slate-400 hover:text-rose-400 hover:border-rose-500/20"
          }`}
          startContent={
            <FiHeart 
              size={16} 
              className={isLiked ? "fill-rose-400 text-rose-400" : "text-slate-400"} 
            />
          }
        >
          {isLiked ? "Liked" : "Like"} ({likesCount})
        </Button>

        {/* Save Toggle Button */}
        <Button 
          size="sm"
          onClick={handleSaveToggle}
          className={`font-bold text-xs rounded-xl h-9 px-4 transition-all ${
            isSaved 
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
              : "bg-slate-950 border border-slate-900 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20"
          }`}
          startContent={
            <FiBookmark 
              size={16} 
              className={isSaved ? "fill-cyan-400 text-cyan-400" : "text-slate-400"} 
            />
          }
        >
          {isSaved ? "Saved" : "Save"} ({favoritesCount})
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

      {/* Report Popup Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
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