"use client";

import { Pagination } from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function PaginationWithSummary({ totalItems, itemsPerPage = 6 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL থেকে কারেন্ট পেজ রিড করা (ডিফল্ট ১)
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  // সামারি ক্যালকুলেশন (যা অলরেডি আপনার স্ক্রিনে দেখা যাচ্ছে)
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // 🔄 এই ফাংশনটি বাটনে ক্লিক করলে URL চেঞ্জ করবে (যেমন: ?page=2)
  const handlePageChange = (newPage) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("page", newPage.toString());
    
    // URL আপডেট হওয়া মাত্রই SSR পেজ নতুন ডাটা নিয়ে রি-রেন্ডার হবে
    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-900/60">
      {/* বাম পাশের সামারি টেক্সট */}
      <div className="text-xs font-semibold text-slate-500">
        Showing <span className="text-cyan-400 font-bold">{startItem}</span> to{" "}
        <span className="text-cyan-400 font-bold">{endItem}</span> of{" "}
        <span className="text-slate-300 font-bold">{totalItems}</span> available wisdom
      </div>

      {/* 🧭 ডান পাশের পেজিনেশন বাটন (নিশ্চিত করা হয়েছে যেন ডার্ক ব্যাকগ্রাউন্ডে দেখা যায়) */}
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          showControls
          siblings={1}
          size="sm"
          classNames={{
            wrapper: "gap-1.5 bg-slate-900/40 p-1 rounded-xl border border-slate-800/80 backdrop-blur-md",
            item: "bg-slate-950 text-slate-400 font-bold text-xs hover:bg-slate-800 hover:text-slate-200 min-w-8 h-8 rounded-lg transition-all border border-slate-900",
            cursor: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-extrabold rounded-lg",
            prev: "bg-slate-950 hover:bg-slate-900 text-slate-400 min-w-8 h-8 rounded-lg border border-slate-900",
            next: "bg-slate-950 hover:bg-slate-900 text-slate-400 min-w-8 h-8 rounded-lg border border-slate-900",
          }}
        />
      )}
    </div>
  );
}