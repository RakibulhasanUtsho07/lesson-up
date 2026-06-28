"use client";

import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SearchPublicLessons({filters}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ⚡ ফিক্স ২: URL-এ আগে থেকে 'searchQuery' থাকলে সেটা নিবে, নাহলে খালি স্ট্রিং ""
    const [searchQuery, setSearchQuery] = useState(filters.search || "");

    useEffect(() => {
        const sp = new URLSearchParams(searchParams.toString());
        
        if (searchQuery !== "") {
            sp.set('search', searchQuery);
        } else {
            sp.delete('search'); 
        }

        router.push(`${pathname}?${sp.toString()}`, { scroll: false });
        console.log("search params", sp.toString());
    }, [searchQuery, router, pathname, searchParams]);

    return (
        <div className="w-full md:w-80 relative flex items-center">
            <FiSearch className="absolute left-4 text-slate-500 text-base pointer-events-none" />
            <input
                // ⚡ ফিক্স ৩: onClick এর বদলে onChange ব্যবহার করা হয়েছে এবং value বাইন্ড করা হয়েছে
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search community wisdom..."
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] outline-none rounded-xl text-sm font-medium transition-all text-slate-200 placeholder:text-slate-600"
            />
        </div>
    );
}

export default SearchPublicLessons;