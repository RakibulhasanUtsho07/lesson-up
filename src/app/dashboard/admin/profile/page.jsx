"use client";

import React, { useState } from "react";
import { Card, Avatar, Button, Input, Switch } from "@heroui/react";
import { 
  FiShield, 
  FiMail, 
  FiLock, 
  FiActivity, 
  FiCpu, 
  FiCheck, 
  FiRefreshCw,
  FiTerminal
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

// 🛡️ সিস্টেম সিকিউরিটি লগ ডেটা
const securityLogs = [
  { id: "log_1", action: "Banned User (jack@spam.com)", time: "10 mins ago", ip: "192.168.1.45" },
  { id: "log_2", action: "Cleared Reports for Lesson #l1", time: "1 hour ago", ip: "192.168.1.12" },
  { id: "log_3", action: "Updated Platform Configuration", time: "Yesterday", ip: "104.244.42.1" },
];

export default function AdminProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // সেটিংস স্টেট
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#02050d] text-slate-100 p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="size-6 rounded-full border-2 border-t-cyan-500 animate-spin border-slate-900" />
          <p className="text-xs font-bold tracking-widest text-slate-600 uppercase">Verifying Clearance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Background Cyber Matrix Glows */}
      <div className="absolute top-[-20%] right-[-10%] size-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] size-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 👑 হেডার সেকশন */}
      <div className="border-b border-slate-900 pb-6 relative z-10">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-cyan-400 uppercase mb-1">
          <FiTerminal className="animate-pulse" /> Root Directory
        </div>
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
          Admin Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your root credentials, global system switches, and monitor recent security audit logs.
        </p>
      </div>

      {/* ⚡ লেআউট গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* বাম দিক: অ্যাডমিন আইডেন্টিটি কার্ড (২ কলাম জুড়ে) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 👤 প্রোফাইল কার্ড */}
          <Card className="bg-gradient-to-b from-slate-950 to-slate-900/60 border border-slate-900 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute top-0 right-10 h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative">
                <Avatar 
                  src={user?.image || "https://i.pravatar.cc/150?img=33"} 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-slate-800 bg-slate-950"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-cyan-500 text-slate-950 rounded-lg shadow-lg">
                  <FiShield className="size-3.5 fill-slate-950" />
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h2 className="text-xl font-black text-white tracking-tight">{user?.name || "System Root"}</h2>
                  <span className="text-[9px] font-black tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-md">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                  <FiMail className="text-slate-600" /> {user?.email || "admin@lessonup.com"}
                </p>
              </div>
            </div>

            {/* ক্রেডেনশিয়াল আপডেট ফর্ম */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-900/60">
              <Input 
                label="Display Name" 
                size="sm" 
                defaultValue={user?.name || "System Root"} 
                variant="bordered"
                className="text-xs font-bold"
              />
              <Input 
                label="Root Email" 
                size="sm" 
                disabled
                defaultValue={user?.email || "admin@lessonup.com"} 
                variant="bordered"
                className="text-xs font-bold opacity-60 cursor-not-allowed"
              />
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-black rounded-xl text-xs px-4 shadow-lg shadow-cyan-500/10"
                startContent={<FiCheck />}
              >
                Save Identity
              </Button>
            </div>
          </Card>

          {/* 🛠️ সিস্টেম কন্ট্রোল সুইচেস */}
          <Card className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-5">
            <div>
              <h3 className="text-sm font-black tracking-widest text-slate-300 uppercase">Global System Controls</h3>
              <p className="text-[11px] text-slate-600">Execute infrastructure level toggles instantly.</p>
            </div>

            <div className="divide-y divide-slate-900/60 space-y-4">
              {/* সুইচ ১ */}
              <div className="flex items-center justify-between pt-4 first:pt-0">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <FiCpu className="text-cyan-400" /> Maintenance Mode
                  </h4>
                  <p className="text-[10px] text-slate-500">Block public access and display a maintenance splash screen.</p>
                </div>
                <Switch 
                  size="sm" 
                  color="danger"
                  isSelected={maintenanceMode} 
                  onValueChange={setMaintenanceMode} 
                />
              </div>

              {/* সুইচ ২ */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <FiActivity className="text-purple-400" /> Security Report Notifications
                  </h4>
                  <p className="text-[10px] text-slate-500">Receive instant email updates whenever a lesson receives 5+ flags.</p>
                </div>
                <Switch 
                  size="sm" 
                  color="primary"
                  isSelected={emailNotifications} 
                  onValueChange={setEmailNotifications} 
                />
              </div>
            </div>
          </Card>

        </div>

        {/* ডান দিক: সিকিউরিটি ও মেটা অডিট লগ */}
        <Card className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black tracking-widest text-slate-300 uppercase">Security Audit Log</h3>
                <p className="text-[11px] text-slate-600">Live operational history trail.</p>
              </div>
              <button className="p-1.5 bg-slate-950 border border-slate-900 text-slate-500 hover:text-white rounded-lg transition-colors">
                <FiRefreshCw className="size-3" />
              </button>
            </div>

            {/* লগের লিস্ট */}
            <div className="space-y-3">
              {securityLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5 group hover:border-cyan-500/20 transition-all">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">{log.action}</span>
                    <span className="text-slate-600 font-medium">{log.time}</span>
                  </div>
                  <div className="text-[9px] font-mono text-slate-600 flex items-center gap-1">
                    <FiLock className="size-2" /> IP: {log.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900/60 text-center">
            <span className="text-[10px] font-mono text-slate-600">Encryption Active: AES-256</span>
          </div>
        </Card>

      </div>
    </div>
  );
}
