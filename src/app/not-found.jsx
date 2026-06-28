"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0d0e12] text-white px-6 overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full filter blur-[130px] opacity-20"></div>

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 w-full max-w-lg p-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl text-center">
        
        {/* Large 404 Text with Gradient */}
        <div className="relative inline-block mb-4">
          <h1 className="text-9xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 select-none">
            404
          </h1>
          {/* Decorative Badge */}
          <span className="absolute -bottom-2 right-2 bg-purple-600 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md shadow-md shadow-purple-900/50">
            Lost in Space
          </span>
        </div>

        {/* Error Messages in English */}
        <h2 className="text-2xl font-bold mb-3 text-white/90">
          Page Not Found
        </h2>
        
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The lesson or page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-6 z-10 text-xs text-slate-600 font-medium tracking-wide uppercase">
        LessonUp Platform • All Rights Reserved
      </div>
    </div>
  );
}