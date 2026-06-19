"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link, Button } from "@heroui/react";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      headline: "Capture Your Lifelong Wisdom",
      supportText: "Don't let your most valuable insights fade away. Create, organize, and securely store your personal growth milestones and meaningful life lessons in one digital journal.",
      ctaText: "Start Your Journal",
      ctaLink: "/dashboard/add-lesson",
      image: "https://i.ibb.co.com/PvXzGjPP/2aa4b9ef-d818-4da3-b9b4-d0b5d781f90e.png",
      gradient: "from-cyan-500/20 via-transparent to-transparent"
    },
    {
      id: 2,
      headline: "Learn From a Shared Well of Wisdom",
      supportText: "Growth doesn't happen in isolation. Browse public lessons shared by a global community, mark your favorites, and draw inspiration from real human experiences.",
      ctaText: "Explore Public Lessons",
      ctaLink: "/public-lessons",
      image: "https://i.ibb.co.com/M0gRcYm/Gemini-Generated-Image-kkj97akkj97akkj9.png",
      gradient: "from-indigo-500/20 via-transparent to-transparent"
    },
    {
      id: 3,
      headline: "Track Your Personal Evolution",
      supportText: "Watch yourself grow over time. Organize your insights by categories, track your learning progress, and look back at the wisdom that shaped your journey.",
      ctaText: "View My Progress",
      ctaLink: "/dashboard/my-lessons",
      image: "https://i.ibb.co.com/FjS42fN/Gemini-Generated-Image-xm14odxm14odxm14.png",
      gradient: "from-amber-500/20 via-transparent to-transparent"
    }
  ];

  // ৫ সেকেন্ড পর পর অটোমেটিক স্লাইড চেঞ্জ হওয়ার ইফেক্ট
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden select-none">
      
      {/* স্লাইড কন্টেইনার এরিয়া */}
      <div className="relative min-h-[500px] md:min-h-[420px] w-full rounded-3xl bg-[#11131c]/60 border border-white/[0.06] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center transition-all duration-1000 ease-in-out ${
                isActive 
                  ? "opacity-100 translate-x-0 pointer-events-auto z-10" 
                  : "opacity-0 translate-x-8 pointer-events-none z-0"
              }`}
            >
              {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-40 pointer-events-none rounded-3xl`} />

              {/* বামপাশ: টেক্সট ও কন্টেন্ট সেকশন (অ্যানিমেশনসহ) */}
              <div className={`flex flex-col space-y-6 relative z-10 transform transition-transform duration-700 delay-200 ${isActive ? "translate-y-0" : "translate-y-4"}`}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  {slide.headline.split(" ").map((word, i, arr) => {
                    // শেষ শব্দটি হাইলাইট করার জন্য গ্রাডিয়েন্ট টেক্সট লজিক
                    if (i === arr.length - 1 || i === arr.length - 2) {
                      return <span key={i} className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent"> {word}</span>;
                    }
                    return <span key={i}> {word}</span>;
                  })}
                </h1>
                
                <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-lg">
                  {slide.supportText}
                </p>

                <div>
                  <Button
                    as={Link}
                    href={slide.ctaLink}
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold px-6 py-6 rounded-xl shadow-[0_4px_20px_0_rgba(79,70,229,0.4)] transition-all duration-300 active:scale-95"
                  >
                    {slide.ctaText}
                  </Button>
                </div>
              </div>

              {/* ডানপাশ: ইমেজ সেকশন (গ্লাস রিফ্লেকশন ফ্রেমসহ) */}
              <div className={`relative flex justify-center items-center h-64 md:h-full transform transition-all duration-700 delay-300 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <div className="relative w-full h-full max-h-[300px] md:max-h-[340px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-750"
                  />
                  {/* ওভারলে শাইন লেয়ার */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* নিচে স্লাইড ইন্ডিকেটর ডটস (ম্যানুয়ালি স্লাইড চেঞ্জ করার জন্য) */}
      <div className="flex justify-center items-center space-x-3 mt-6 relative z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 bg-gradient-to-r from-cyan-400 to-indigo-500" 
                : "w-2.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
