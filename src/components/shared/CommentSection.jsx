import React, { useState } from "react";
import { Avatar, Button } from "@heroui/react";

export default function CommentSection({ lessonId, user }) {
  const [comments, setComments] = useState([
    { id: 1, user: "Tahmid Khan", avatar: "https://i.pravatar.cc/150?img=11", text: "This rule literally saved me from blowing up at my product manager yesterday." }
  ]);
  const [input, setInput] = useState("");

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        user: user?.name || "Anonymous Learner",
        avatar: user?.image || "https://i.pravatar.cc/150?img=1",
        text: input
      }
    ]);
    setInput("");
  };

  return (
    <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-6">
      <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Discussion Panel ({comments.length})</h3>

      {/* ইনপুট বক্স */}
      {user ? (
        <form onSubmit={handlePostComment} className="flex gap-3 items-start">
          <Avatar src={user.image} className="w-8 h-8 rounded-lg shrink-0 border border-slate-800" />
          <div className="flex-1 space-y-2">
            <textarea 
              rows="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your insight or perspective on this lesson..."
              className="w-full bg-slate-950 border border-slate-900 p-3 rounded-xl text-xs font-medium focus:outline-none focus:border-cyan-500/40 text-slate-200"
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" className="bg-cyan-600 text-white font-black text-[11px] h-8 rounded-xl px-4">Post Comment</Button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-xs font-medium text-slate-600 bg-slate-950/60 p-4 border border-slate-900 rounded-xl text-center">Please log in to join the conversation.</p>
      )}

      {/* কমেন্ট লিস্ট */}
      <div className="space-y-4 pt-2">
        {comments.map(c => (
          <div key={c.id} className="flex gap-3 items-start p-3 bg-slate-950/20 border border-slate-900/60 rounded-xl">
            <Avatar src={c.avatar} className="w-7 h-7 rounded-lg shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-slate-300">{c.user}</h5>
              <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}