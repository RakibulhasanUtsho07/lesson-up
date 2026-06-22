import React from "react";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Sparkles, ShieldCheck } from "@gravity-ui/icons";
import PricingCard from "./PricingCard";
import ComparisonTable from "./ComparisonTable";

export default async function UpgradeUserExperiencePage() {

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });


  if (!session?.data?.user) {
    redirect("/auth/sign-in");
  }

  const user = session.data.user;

  const isPremium = user?.plan === "Premium" || user?.isPremium === true;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 space-y-12 overflow-hidden relative">
   
      <div className="absolute top-0 left-1/4 size-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-[500px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      
      {isPremium ? (
        <div className="max-w-2xl mx-auto text-center py-20 border border-amber-500/20 bg-slate-900/40 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.05)]">
          <div className="inline-flex p-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse mb-6">
            <ShieldCheck className="size-12" />
          </div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
            You are a Premium Member!
          </h1>
          <p className="text-slate-400 mt-3 max-w-md mx-auto text-sm">
            Thank you for supporting us. You have full lifetime access to all premium features, ad-free experience, and exclusive community badges.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 uppercase tracking-widest shadow-lg">
            <Sparkles className="size-4 stroke-[3]" /> Premium ⭐ Status Active
          </div>
        </div>
      ) : (
        
        <div className="max-w-6xl mx-auto space-y-16">
          
         
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 uppercase tracking-wider">
              <Sparkles className="size-3.5" /> Upgrade Your Experience
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Unlock Unlimited Learning & <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Premium Access</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Take your workspace to the next level. Get lifetime access to advanced tools, infinite lesson creation, and priority listing.
            </p>
          </div>

          
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
           
            <div className="rounded-3xl p-8 border border-slate-900 bg-slate-900/20 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-300">Free Explorer</h3>
                  <p className="text-xs text-slate-500 mt-1">Perfect to get started with basic features.</p>
                </div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-4xl font-black">৳0</span>
                  <span className="text-xs text-slate-500 font-medium">/ lifetime</span>
                </div>
                <div className="w-full h-[1px] bg-slate-900" />
                <ul className="space-y-3.5 text-sm text-slate-400">
                  <li className="flex items-center gap-2.5">✅ Create up to 5 Lessons</li>
                  <li className="flex items-center gap-2.5">❌ No Premium Content Access</li>
                  <li className="flex items-center gap-2.5">❌ Standard Public Listing</li>
                  <li className="flex items-center gap-2.5">❌ Contains Third-party Ads</li>
                </ul>
              </div>
              <button disabled className="w-full mt-8 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 font-bold text-sm cursor-not-allowed">
                Current Plan
              </button>
            </div>

           
            <PricingCard userId={user.id} />
          </div>

       
          <div className="space-y-6">
            <h2 className="text-xl font-black tracking-tight text-slate-200 text-center md:text-left">
              Compare Plans & Features
            </h2>
            <ComparisonTable />
          </div>

        </div>
      )}
    </div>
  );
}
