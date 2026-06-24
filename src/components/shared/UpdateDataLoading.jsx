import React from 'react'

import Link from 'next/link';
import { Button } from "@heroui/react";
import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

function UpdateDataLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Neon Aura (Theme Matching Glows) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-gradient-to-tr from-orange-500/10 to-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 size-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Error Container */}
      <div className="w-full max-w-md bg-slate-900/30 border border-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md rounded-2xl p-8 text-center relative z-10 space-y-6 transition-all duration-300 hover:border-slate-800/60">
        
        {/* Animated Warning Icon Container */}
        <div className="mx-auto size-16 bg-gradient-to-b from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.05)] group">
          <FiAlertTriangle className="text-2xl text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-black tracking-tight text-slate-200">
            Lesson Content Offline
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
            We couldn't track down this specific piece of wisdom. The data might have been deleted, or the handshake with the database timed out.
          </p>
        </div>

        {/* Decorative Divider Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link href="/dashboard" className="w-full sm:w-1/2">
            <Button
              variant="bordered"
              className="w-full border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-slate-300 font-bold py-5 rounded-xl text-xs transition-all tracking-wide flex items-center justify-center gap-2"
            >
              <FiArrowLeft className="text-sm" />
              Dashboard
            </Button>
          </Link>

          <Link
            href="/dashboard/my-lessons"
            className="w-full sm:w-1/2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 font-black py-5 rounded-xl text-xs shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all tracking-wide flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <FiRefreshCw className="text-sm transition-transform group-hover:rotate-180 duration-500" />
            Retry Connection
          </Link>
        </div>

      </div>
    </div>
  );
}

export default UpdateDataLoading
