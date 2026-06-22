import React from "react";
import { FiCheck, FiX, FiAward, FiZap } from "react-icons/fi";

export default function ComparisonTable() {
  const rows = [
    { 
      feature: "Number of lessons created", 
      free: "Up to 5 lessons", 
      premium: "∞ Infinite (Unlimited)" 
    },
    { 
      feature: "Access premium templates", 
      free: (
        <span className="flex items-center gap-2">
          <FiX className="text-rose-500 size-4 shrink-0" /> Basic Only
        </span>
      ), 
      premium: (
        <span className="flex items-center gap-2">
          <FiCheck className="text-emerald-400 size-4 shrink-0" /> All Pro Templates
        </span>
      ) 
    },
    { 
      feature: "Ad-free experience", 
      free: (
        <span className="flex items-center gap-2">
          <FiX className="text-rose-500 size-4 shrink-0" /> Third-party Ads Included
        </span>
      ), 
      premium: (
        <span className="flex items-center gap-2">
          <FiCheck className="text-emerald-400 size-4 shrink-0" /> 100% Ad-Free UI
        </span>
      ) 
    },
    { 
      feature: "Priority listing in public feed", 
      free: (
        <span className="flex items-center gap-2">
          <FiX className="text-rose-500 size-4 shrink-0" /> Standard Rank
        </span>
      ), 
      premium: (
        <span className="flex items-center gap-2">
          <FiCheck className="text-emerald-400 size-4 shrink-0" /> Instant Top Priority Boost
        </span>
      ) 
    },
    { 
      feature: "Access other premium content", 
      free: (
        <span className="flex items-center gap-2">
          <FiX className="text-rose-500 size-4 shrink-0" /> Preview Only
        </span>
      ), 
      premium: (
        <span className="flex items-center gap-2">
          <FiCheck className="text-emerald-400 size-4 shrink-0" /> Full Lifetime Access
        </span>
      ) 
    },
    { 
      feature: "Community Badge & Status", 
      free: "Standard Member", 
      premium: (
        <span className="flex items-center gap-2">
          <FiAward className="text-amber-400 size-4 shrink-0" /> Verified Premium Badge
        </span>
      ) 
    },
    { 
      feature: "Customer Support Tier", 
      free: "Standard Email", 
      premium: (
        <span className="flex items-center gap-2">
          <FiZap className="text-amber-400 size-4 shrink-0" /> 24/7 Priority VIP Chat
        </span>
      ) 
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-900 bg-slate-950/60">
            <th className="p-4 md:p-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Features</th>
            <th className="p-4 md:p-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Free Plan</th>
            <th className="p-4 md:p-5 text-sm font-bold text-amber-400 uppercase tracking-wider">Premium Plan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60 text-sm">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-slate-900/40 transition-colors group">
              <td className="p-4 md:p-5 font-medium text-slate-300 group-hover:text-white transition-colors">
                {row.feature}
              </td>
              <td className="p-4 md:p-5 text-slate-400 vertical-align-middle">
                {row.free}
              </td>
              <td className="p-4 md:p-5 font-semibold text-amber-300 bg-amber-500/[0.01] group-hover:bg-amber-500/[0.03]">
                {row.premium}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}