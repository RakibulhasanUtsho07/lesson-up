"use client";

import React, { useState } from "react";
import {
    Link,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar
} from "@heroui/react";

export default function AppNavbar({ isLoggedIn = false, userPlan = "Free", user = null }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentUser = user || {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    };

    return (
        // ১. ব্যাকগ্রাউন্ড থিম পরিবর্তন: আল্ট্রা-ডার্ক সাইবার মেটালিক থিম উইথ গ্লাস ইফেক্ট ও বটম নিওন-বর্ডার লাইন
        <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-gradient-to-r from-[#0a0b10]/90 via-[#11131c]/85 to-[#0a0b10]/90 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            {/* কালারটিকে আরও প্রিমিয়াম লুক দিতে একটি মায়াবী ব্যাকগ্রাউন্ড রিফ্লেকশন লেয়ার */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/[0.04] via-transparent to-transparent pointer-events-none" />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex h-16 items-center justify-between">

                    {/* 1. Logo Section */}
                    <div className="flex items-center">
                        <Link href="/" className="group flex items-center gap-3 text-foreground select-none">
                            {/* Modern Interlocking Double-Ring Logo Emblem */}
                            <div className="relative flex h-9 w-10 items-center justify-center filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                                {/* Left Blue/Cyan Ring */}
                                <div className="absolute left-0 h-7 w-7 rounded-full border-[3px] border-cyan-400 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-90 transition-transform duration-300 group-hover:scale-110" />

                                {/* Right Orange/Red Ring (Interlocking overlay) */}
                                <div className="absolute right-0 h-7 w-7 rounded-full border-[3px] border-orange-500 bg-gradient-to-bl from-amber-500/15 to-transparent opacity-90 mix-blend-screen transition-transform duration-300 group-hover:scale-110" />

                                {/* Glowing Core Center (The intersection of the rings) */}
                                <div className="absolute z-10 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#f97316] animate-pulse" />
                            </div>

                            {/* Sleek, High-Contrast Typography */}
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                                    lesson<span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">up</span>
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* 2. Desktop Center Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                            Home
                        </Link>

                        {isLoggedIn && (
                            <>
                                <Link href="/dashboard/add-lesson" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                    Add Lesson
                                </Link>
                                <Link href="/dashboard/my-lessons" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                    My Lessons
                                </Link>
                            </>
                        )}

                        <Link href="/public-lessons" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                            Public Lessons
                        </Link>

                        {isLoggedIn && userPlan === "Free" && (
                            <Link href="/pricing" className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
                                Upgrade ⚡
                            </Link>
                        )}
                    </div>

                    {/* 3. Right Action / Profile Menu */}
                    <div className="flex items-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/login" className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                    Sign In
                                </Link>
                                <Button
                                    as={Link}
                                    href="/signup"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] transition-all duration-200"
                                >
                                    Get Started
                                </Button>
                            </>
                        ) : (
                            <Dropdown placement="bottom-end" className="bg-[#11131c] border border-white/[0.08] text-white">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform cursor-pointer border-indigo-500"
                                        color="primary"
                                        name={currentUser.name}
                                        size="sm"
                                        src={currentUser.avatar}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile_header" className="h-14 gap-2 opacity-100 cursor-default">
                                        <p className="font-semibold text-xs text-slate-400">Signed in as</p>
                                        <p className="font-bold text-white">{currentUser.name}</p>
                                    </DropdownItem>
                                    <DropdownItem key="profile" href="/profile" className="text-slate-200 hover:text-white">
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem key="dashboard" href="/dashboard" className="text-slate-200 hover:text-white">
                                        Dashboard
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger" className="text-danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )}

                        {/* Mobile Hamburger Icon */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex md:hidden p-2 rounded-lg text-slate-300 hover:bg-white/[0.05]"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isOpen && (
                <div className="md:hidden border-t border-white/[0.06] bg-[#0a0b10]/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-3 flex flex-col">
                    <Link href="/" className="text-base font-medium py-2 text-slate-200">Home</Link>
                    {isLoggedIn && (
                        <>
                            <Link href="/dashboard/add-lesson" className="text-base font-medium py-2 text-slate-200">Add Lesson</Link>
                            <Link href="/dashboard/my-lessons" className="text-base font-medium py-2 text-slate-200">My Lessons</Link>
                        </>
                    )}
                    <Link href="/public-lessons" className="text-base font-medium py-2 text-slate-200">Public Lessons</Link>
                    {isLoggedIn && userPlan === "Free" && (
                        <Link href="/pricing" className="text-base font-semibold text-warning py-2">Upgrade ⚡</Link>
                    )}
                    {!isLoggedIn && (
                        <Link href="/login" className="text-base font-medium py-2 text-slate-200 sm:hidden">Sign In</Link>
                    )}
                </div>
            )}
        </nav>
    );
}