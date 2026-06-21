import React from "react";
import { Card } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";

export default function RecommendedLessons({ currentCategory }) {
  // ম্যাক্সিমাম ৬টি রিলেটেড কার্ড লুপ আউট করার জন্য স্ট্যাটিক অ্যারে
  const recommended = Array(6).fill({
    title: "Navigating Executive Burnout Safely",
    category: currentCategory,
    readTime: "4 mins"
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Similar Wisdom Log</h3>
      <div className="space-y-3">
        {recommended.map((item, index) => (
          <Card key={index} className="bg-slate-950/30 border border-slate-900 p-4 rounded-xl group hover:border-cyan-500/20 transition-all cursor-pointer">
            <div className="space-y-2">
              <span className="text-[9px] font-black text-cyan-500 tracking-wider uppercase bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10 inline-block">
                {item.category}
              </span>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors flex items-center justify-between">
                {item.title} <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-all text-cyan-400 shrink-0 ml-1" />
              </h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}