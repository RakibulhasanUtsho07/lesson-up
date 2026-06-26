"use client";

import React from "react";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiInstagram
} from "react-icons/fi";

// 𝕏 (New Twitter Logo) SVG Component
function IconX() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-current"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#030712] text-slate-400 border-t border-slate-900/60 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-900/60 pb-12">

          {/* 🚀 Brand & Identity */}
          <div className="space-y-4 md:col-span-1">
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
                    Lesson<span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Up</span>
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              A decentralized core ecosystem engineered for developers, educators, and technology orchestrators.
            </p>
          </div>

          {/* 📌 Platform Matrix (Quick Links) */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><Link href="/lessons" className="hover:text-cyan-400 transition-colors">Browse Wisdom</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Premium Plans</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* ⚖️ Legal & Governance */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-cyan-400 transition-colors">Cookie Architecture</Link></li>
            </ul>
          </div>

          {/* 📞 Contact Terminal */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Contact Node
            </h4>
            <ul className="space-y-3 text-xs font-medium text-slate-500">
              <li className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                <FiMail className="text-cyan-500" /> core@wisdomup.com
              </li>
              <li className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                <FiPhone className="text-cyan-500" /> +880 1700-000000
              </li>
              <li className="flex items-start gap-2 hover:text-slate-300 transition-colors">
                <FiMapPin className="text-cyan-500 mt-0.5 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 🔐 Footer Bottom (Socials & Copyright) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-600">
          <p>© {currentYear} WisdomUp Corp. All operational rights reserved.</p>

          {/* Social Endpoints */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-950 border border-slate-900 rounded-xl hover:text-white hover:border-slate-800 transition-all flex items-center justify-center"
              title="Follow on 𝕏"
            >
              <IconX />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-950 border border-slate-900 rounded-xl hover:text-white hover:border-slate-800 transition-all flex items-center justify-center"
            >
              <FiGithub className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-950 border border-slate-900 rounded-xl hover:text-white hover:border-slate-800 transition-all flex items-center justify-center"
            >
              <FiLinkedin className="size-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-950 border border-slate-900 rounded-xl hover:text-white hover:border-slate-800 transition-all flex items-center justify-center"
            >
              <FiInstagram className="size-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}