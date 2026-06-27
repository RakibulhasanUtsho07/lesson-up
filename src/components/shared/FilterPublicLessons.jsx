"use client";
import { useEffect, useState } from 'react';
import { FiGrid } from 'react-icons/fi';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function FilterPublicLessons({ publicLessons , filters }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

   
    const [category, setCategory] = useState(filters.category || "all");


    useEffect(() => {
        const sp = new URLSearchParams(searchParams.toString());
        
        if (category !== 'all') {
            sp.set('category', category);
        } else {
            sp.delete('category'); 
        }

      
        router.push(`${pathname}?${sp.toString()}`, { scroll: false });
        
        console.log("search params", sp.toString());
    }, [category, router, pathname, searchParams]);

    const quickFilters = [
        { label: "All Lessons", value: "all" },
        { label: "Personal Growth", value: "personal-growth" },
        { label: "Career", value: "career" },
        { label: "Relationships", value: "relationships" },
        { label: "Mindset", value: "mindset" },
    ];

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-900">
            <div className="flex flex-wrap gap-2 items-center">
                {quickFilters.map((filter, index) => {
                    // ⚡ ফিক্স: ইডেক্স ০ না দেখে বর্তমান স্টেটের সাথে ক্যাটাগরি মিলছে কিনা চেক করা
                    const isActive = category === filter.value;

                    return (
                        <button
                            onClick={() => setCategory(filter.value)}
                            key={index}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                                isActive
                                    ? "bg-slate-900 border-cyan-500/50 text-cyan-400 shadow-[0_4px_12px_rgba(6,182,212,0.1)]"
                                    : "bg-slate-900/30 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                            }`}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <FiGrid /> Showing {publicLessons.length} available lessons
            </div>
        </div>
    );
}

export default FilterPublicLessons;