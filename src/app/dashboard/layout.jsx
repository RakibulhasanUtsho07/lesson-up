import React from "react";
import DashboardHomePageSidebar from "@/components/shared/DashboardHomePageSidebar"; // আপনার সাইডবারের পাথ

export default function DashboardLayout({ children }) {
  return (
    // ১. পুরো স্ক্রিনকে লক করে দেওয়া হচ্ছে যাতে মূল উইন্ডোতে ডাবল স্ক্রোলবার না আসে
    <div className="flex h-screen w-full bg-[#030712] overflow-hidden">
      
      {/* 🧭 ২. স্টিকি সাইডবার কন্টেইনার */}
      <aside className=" md:hidden h-full w-64 shrink-0 border-r border-slate-900/60 bg-slate-950 hidden md:block">
        <DashboardHomePageSidebar />
      </aside>

      {/* 💻 ৩. ডাইনামিক কনটেন্ট এরিয়া (এটি স্ক্রোল করবে) */}
      <main className="flex-1 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <div className="min-h-full p-4 sm:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}