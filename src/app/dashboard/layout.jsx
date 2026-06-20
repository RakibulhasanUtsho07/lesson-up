import React from "react";
 // আপনার সাইডবার
import AppNavbar from "@/components/Navbar";
import DashboardHomePageSidebar from "@/components/shared/DashboardHomePageSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
        <div className="flex min-h-screen">
            <DashboardHomePageSidebar/>
            <div class="flex-1">
                {children}
            </div>
        </div>
    </div>
  );
}