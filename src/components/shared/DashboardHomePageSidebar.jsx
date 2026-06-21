"use client";

import React from "react";
import { 
  Bars, 
  Bell, 
  BookOpen, 
  Envelope, 
  Gear, 
  Heart, 
  House, 
  Magnifier, 
  Person 
} from "@gravity-ui/icons";
import { Drawer, Button } from "@heroui/react";
import Link from "next/link";
import { BiPlusCircle } from "react-icons/bi";
import { LuBookOpenCheck, LuLayoutDashboard } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { RiShieldUserFill } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";

export default function Navigation() {
   const { data: session, isPending } = authClient.useSession();
      const user = session?.user
  // ড্যাশবোর্ডের রাউট লিংকসহ আইটেম লিস্ট
  const userNavLink = [
  { icon: House, label: "Dashboard Home", link: "/dashboard" },
  { icon: BiPlusCircle, label: "Post Lesson", link: "post-lesson" },
  { icon: BookOpen, label: "My Lessons", link: "my-lessons" },
  { icon: Heart, label: "My Favorites", link: "my-favorites" },
  { icon: Person, label: "Profile", link: "my-profile" },
];
const adminNavItems = [
  { icon: LuLayoutDashboard, label: "Admin Home", link: "admin" },
  { icon: BsPeople, label: "Manage Users", link: "admin/manage-users" },
  { icon: LuBookOpenCheck, label: "Manage Lessons", link: "admin/manage-lessons" },
  { icon: FiAlertTriangle, label: "Reported Lessons", link: "admin/reported-lessons" },
  { icon: RiShieldUserFill, label: "Admin Profile", link: "admin/profile" },
];
// const navItems = user?.role === "user" ? userNavLink : adminNavItems
// const navItems = {}
// if(user?.role === "user"){
//   navItems.push(userNavLink)

// }
// else if(user?.role ==="admin"){
//   navItems.push(adminNavItems)
// }
const navItems = user?.role === "admin" ? adminNavItems : userNavLink;

  // লোগো কম্পোনেন্ট (উভয় জায়গায় ব্যবহারের জন্য রেডিমেড)
  const Logo = () => (
    <div className="group flex items-center gap-3 text-foreground select-none">
      <div className="relative flex h-9 w-10 items-center justify-center filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
        <div className="absolute left-0 h-7 w-7 rounded-full border-[3px] border-cyan-400 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-90 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute right-0 h-7 w-7 rounded-full border-[3px] border-orange-500 bg-gradient-to-bl from-amber-500/15 to-transparent opacity-90 mix-blend-screen transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute z-10 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#f97316] animate-pulse" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent group-hover:text-cyan-400 transition-colors duration-300">
          Lesson<span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Up</span>
        </span>
      </div>
    </div>
  );

  // মূল নেভিগেশন লিংকসমূহ (Common for both Desktop and Mobile)
  const renderNavLinks = (isMobile = false) => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            href={`/dashboard/${item.link}`}
            key={item.label}
            // HeroUI v3: মোবাইল ড্রয়ারে থাকলে slot="close" ড্রয়ারটি অটো বন্ধ করবে, ডেক্সটপে এটি প্রভাব ফেলবে না
            slot={isMobile ? "close" : undefined}
            className="group flex items-center justify-between w-full rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white transition-all bg-transparent hover:bg-slate-900/60 border border-transparent hover:border-slate-800/50"
          >
            <div className="flex items-center gap-3.5">
              <IconComponent className="size-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <span className="tracking-wide">{item.label}</span>
            </div>
            
            {/* হোভার নিওন ডট */}
            <div className="size-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(6,182,212,0.8)] transform translate-x-2 group-hover:translate-x-0 duration-300" />
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 🖥️ ডেক্সটপ সাইডবার: বড় স্ক্রিনে (lg এবং তার উপরে) এটি স্থায়ীভাবে থাকবে */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-slate-950 border-r border-slate-900 shrink-0 z-20">
        <div className="flex flex-col gap-1 pt-6 px-6 h-16 justify-center border-b border-slate-900/50">
          <Logo />
        </div>
        <div className="py-6 px-4 flex-1 overflow-y-auto">
          {renderNavLinks(false)}
        </div>
      </aside>

      {/* 📱 মোবাইল ও ট্যাবলেট ড্রয়ার: ছোট স্ক্রিনে (lg এর নিচে) এটি বাটন দিয়ে ওপেন হবে */}
      <div className="lg:hidden fixed top-3 left-4 z-50 ">
        <Drawer>
          {/* ড্রয়ার ট্র্রিগার বাটন */}
          <Button 
            className="bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/30 transition-all font-bold rounded-xl shadow-lg backdrop-blur-sm"
            startContent={<Bars className="size-4" />}
          >
            Menu
          </Button>

          <Drawer.Backdrop variant="blur">
            <Drawer.Content placement="left" className="bg-slate-950/95 text-slate-100 max-w-xs w-full">
              <Drawer.Dialog>
                <Drawer.CloseTrigger className="text-slate-400 hover:text-white" />
                
                <Drawer.Header className="flex flex-col gap-1 pt-6 px-6">
                  <Logo />
                </Drawer.Header>
                
                <Drawer.Body className="py-6 px-4">
                  {renderNavLinks(true)}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}