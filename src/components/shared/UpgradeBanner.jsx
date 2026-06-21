import React from "react";
import { Button } from "@heroui/react";
import { FiLock, FiStar } from "react-icons/fi";
import Link from "next/link";

export default function UpgradeBanner() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-2xl">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800/80 p-6 sm:p-8 rounded-2xl text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -left-10 size-32 bg-amber-500/10 rounded-full blur-xl" />
        
        <div className="size-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mx-auto text-xl shadow-lg shadow-amber-500/5">
          <FiLock />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-black text-white tracking-tight flex items-center justify-center gap-1.5">
            <FiStar className="text-amber-400 fill-amber-400 text-sm" /> Premium Tier Required
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            This asset contains advanced pragmatic insight restricted to premium network tier subscribers. Upgrade to instantly bypass clearance blocks.
          </p>
        </div>

        <Link href="/pricing" className="block">
          <Button fullWidth className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs h-10 rounded-xl shadow-lg shadow-amber-500/10">
            Upgrade Membership
          </Button>
        </Link>
      </div>
    </div>
  );
}