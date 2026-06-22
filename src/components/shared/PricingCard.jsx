"use client";
import React, { useState } from "react";
import { Sparkles, CircleCheck } from "@gravity-ui/icons";

export default function PricingCard({ userId }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          priceAmount: 1500, // ৳১৫০০ এককালীন
          currency: "bdt",
        }),
      });

      const data = await response.json();

      if (data?.url) {
        // স্ট্রাইপ হোস্ট করা চেকআউট পেজে রিডাইরেক্ট
        window.location.href = data.url;
      } else {
        alert("Stripe session creation failed. Please check backend.");
      }
    } catch (error) {
      console.error("Stripe payment redirect error:", error);
      alert("Something went wrong with the payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950 flex flex-col justify-between shadow-[0_0_40px_rgba(245,158,11,0.08)] group overflow-hidden">
      {/* গ্লো টপ বার */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-amber-400 to-orange-500" />
      <div className="absolute -top-10 -right-10 size-24 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-all" />

      <div className="space-y-6 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Premium Creator <span className="text-xs font-black bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-md uppercase">⭐ Lifetime</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Ultimate power for professional educators.</p>
          </div>
        </div>

        <div className="flex items-baseline gap-1 text-white">
          <span className="text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">৳1500</span>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">One-Time Only</span>
        </div>

        <div className="w-full h-[1px] bg-slate-900" />

        <ul className="space-y-3.5 text-sm text-slate-300">
          <li className="flex items-center gap-3"><CircleCheck className="size-4 text-cyan-400 shrink-0" /> Unlimited Lesson Creation</li>
          <li className="flex items-center gap-3"><CircleCheck className="size-4 text-cyan-400 shrink-0" /> Premium Lesson Templates</li>
          <li className="flex items-center gap-3"><CircleCheck className="size-4 text-cyan-400 shrink-0" /> 100% Ad-Free Dynamic Layouts</li>
          <li className="flex items-center gap-3"><CircleCheck className="size-4 text-cyan-400 shrink-0" /> Priority Feed Listing (Top Tier)</li>
          <li className="flex items-center gap-3"><CircleCheck className="size-4 text-cyan-400 shrink-0" /> Verified Premium Badge & Status</li>
        </ul>
      </div>

      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="w-full mt-8 group/btn relative flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.01] transition-all duration-300 active:scale-[0.99] font-black uppercase tracking-wider cursor-pointer"
      >
        {loading ? (
          <span className="size-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Sparkles className="size-4 stroke-[3]" />
            Upgrade to Premium
          </>
        )}
      </button>
    </div>
  );
}