"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Button, 
  Tooltip, 
  Card, 
  Input, 
  TextArea // 👈 Textarea থেকেTextArea তে পরিবর্তন করা হলো (Build Error ফিক্স)
} from "@heroui/react";
import {
  FiBookOpen,
  FiTag,
  FiSmile,
  FiLock,
  FiImage,
  FiCheck,
  FiAlertCircle,
  FiFileText
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function UpdateLessonForm({ lesson }) {
  console.log(lesson, "lesson data received");
  const router = useRouter();

  // ১. ইনিশিয়াল ফর্ম স্টেট
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tone: "",
    image: "",
    accessLevel: "Free",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ২. ডাটা আসার সাথে সাথে স্টেট আপডেট করা
  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || "",
        description: lesson.description || "",
        category: lesson.category || "",
        tone: lesson.tone || "",
        image: lesson.image || "",
        accessLevel: lesson.accessLevel || "Free",
      });
    }
  }, [lesson]);

  // ইউজারের প্ল্যান সাবস্ক্রিপশন চেক
  const { data: session } = authClient.useSession();
  const userPlan = session?.user?.plan || "Free"; 
  const isFreeUser = userPlan === "Free";

  const categories = [
    { label: "Personal Growth", value: "Personal Growth" },
    { label: "Career & Professional Growth", value: "Career & Professional Growth" },
    { label: "Relationships", value: "Relationships" },
    { label: "Mindset & Resilience", value: "Mindset & Resilience" },
    { label: "Mistakes Learned", value: "Mistakes Learned" },
  ];

  const emotionalTones = [
    { label: "Professional & Pragmatic", value: "Professional & Pragmatic" },
    { label: "Motivational", value: "Motivational" },
    { label: "Sad", value: "Sad" },
    { label: "Realization", value: "Realization" },
    { label: "Gratitude", value: "Gratitude" },
  ];

  // ৩. ফর্ম সাবমিট হ্যান্ডলার (PATCH Request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lesson?._id) return;
    setIsSubmitting(true);

    const updatedFormData = {
      ...formData,
      accessLevel: isFreeUser ? "Free" : formData.accessLevel,
      lastUpdated: new Date()
    };

    try {
      const res = await fetch(`http://localhost:5000/lessons/${lesson._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (res.ok) {
        console.log("Lesson updated successfully!");
        router.push("/dashboard/my-lessons"); 
        router.refresh(); 
      } else {
        console.error("Failed to update lesson on express backend");
      }
    } catch (error) {
      console.error("Network error during update workflow:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lesson) {
    return (
      <div className="flex min-h-screen bg-slate-950 items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Fetching lesson data...</p>
        </div>
      </div>
    );
  }

  // HeroUI ইনপুটের অভ্যন্তরীণ লেআউট গ্লোবাল অবজেক্ট (ডিজাইন ও উইডথ ফিক্স)
  // const inputVariantClasses = {
  //   base: "w-full min-w-full block",
  //   mainWrapper: "w-full min-w-full flex flex-col",
  //   inputWrapper: "bg-slate-950 border border-slate-900 hover:border-slate-800 focus-within:!border-cyan-500/50 rounded-xl h-12 transition-all duration-300 w-full min-w-full px-4 data-[hover=true]:border-slate-800",
  //   input: "text-slate-200 text-sm font-medium placeholder:text-slate-600 w-full min-w-full bg-transparent outline-none border-none focus:ring-0",
  //   label: "font-bold text-slate-400 text-xs tracking-wider uppercase mb-1.5 block",
  // };

  return (
    <div className="bg-slate-950 w-full min-h-screen">
      <div className="w-full max-w-3xl mx-auto px-4 py-8 relative text-slate-100">
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute top-12 left-4 size-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-12 right-4 size-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Section */}
        <div className="mb-10 space-y-2 text-center sm:text-left relative z-10 border-b border-slate-900 pb-6">
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Update Your <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">Life Lesson</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Refine your thoughts, update your insights, and make sure your documented wisdom stays sharp and impactful.
          </p>
        </div>

        {/* Main Card Wrapper */}
        <Card className="bg-slate-900/40 border border-cyan-500/10 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="p-6 sm:p-10 w-full">
            <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col">

              {/* 1. Lesson Title Input */}
              <div className="w-full min-w-full block">
                <Input
                  type="text"
                  label="Lesson Title"
                  labelPlacement="outside"
                  required
                  placeholder="e.g., What 5 Years of Failure Taught Me About Focus"
                  value={formData.title}
                  onChange={(e)=> setFormData((prev)=>({
                    ...prev,
                    title: e.target.value
                  }))}
                  startContent={<FiBookOpen className="text-slate-500 text-base mr-2 shrink-0" />}
                  classNames="w-full"
                />
              </div>

              {/* 2. Full Description TextArea */}
              <div className="w-full min-w-full block">
                <TextArea
                  required
                  label="Full Description / Story / Insight"
                  labelPlacement="outside"
                  placeholder="Deeply explain your experience, the breakthrough moment, and the structural takeaway..."
                  value={formData.description}
                  onChange={(e)=> setFormData((prov)=>({
                    ...prev,
                    description: e.target.value
                    
                  }))}
                  startContent={<FiFileText className="text-slate-500 text-base mt-0.5 mr-2 shrink-0" />}
                  // 
                  className={"w-full"}
                />
              </div>

              {/* 3. Category & Emotional Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                
                {/* Category Dropdown */}
                <div className="flex flex-col space-y-1.5 w-full">
                  <span className="font-bold text-slate-400 text-xs tracking-wider uppercase mb-0.5">Category</span>
                  <div className="relative group w-full">
                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 pointer-events-none z-20 text-base" />
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full pl-12 pr-10 h-12 bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-cyan-500/50 outline-none rounded-xl text-sm text-slate-200 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-600">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-slate-950 text-slate-300">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
                  </div>
                </div>

                {/* Emotional Tone Dropdown */}
                <div className="flex flex-col space-y-1.5 w-full">
                  <span className="font-bold text-slate-400 text-xs tracking-wider uppercase mb-0.5">Emotional Tone</span>
                  <div className="relative group w-full">
                    <FiSmile className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 pointer-events-none z-20 text-base" />
                    <select
                      required
                      value={formData.tone}
                      onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                      className="w-full pl-12 pr-10 h-12 bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-cyan-500/50 outline-none rounded-xl text-sm text-slate-200 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-600">Select a tone</option>
                      {emotionalTones.map((t) => (
                        <option key={t.value} value={t.value} className="bg-slate-950 text-slate-300">
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
                  </div>
                </div>

              </div>

              {/* 4. Cover Image URL Input */}
              <div className="w-full min-w-full block">
                <Input
                  type="url"
                  label="Cover Image URL (Optional)"
                  labelPlacement="outside"
                  placeholder="https://example.com/image.png"
                  value={formData.image}
                  onChange={(e)=> setFormData((prov)=>({
                    ...prov,
                    image: e.target.value

                  }))}
                  startContent={<FiImage className="text-slate-500 text-base mr-2 shrink-0" />}
                  classNames={"w-full"}
                />
              </div>

              {/* 5. Access Level Selector */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label className="font-bold text-slate-400 text-xs tracking-wider uppercase flex items-center gap-1.5 mb-0.5">
                  Access Level {isFreeUser && <FiAlertCircle className="text-amber-500 text-sm" />}
                </label>

                {isFreeUser ? (
                  <Tooltip
                    content="Upgrade to Premium to unlock paid locks."
                    placement="top-start"
                    className="bg-slate-900 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-800"
                  >
                    <div className="relative flex items-center opacity-50 cursor-not-allowed w-full">
                      <FiLock className="absolute left-4 text-slate-600 z-10 text-base" />
                      <Input
                        type="text"
                        disabled
                        value="Free (Standard Tier Restriction)"
                        classNames={{
                          base: "w-full cursor-not-allowed block min-w-full",
                          mainWrapper: "w-full min-w-full flex flex-col",
                          inputWrapper: "bg-slate-950/40 border border-slate-900 rounded-xl h-12 cursor-not-allowed w-full min-w-full px-4 pl-12",
                          input: "text-slate-500 text-sm font-medium cursor-not-allowed w-full min-w-full bg-transparent outline-none border-none focus:ring-0",
                        }}
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <div className="relative group w-full">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 pointer-events-none z-20 text-base" />
                    <select
                      value={formData.accessLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, accessLevel: e.target.value }))}
                      className="w-full pl-12 pr-10 h-12 bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-cyan-500/50 outline-none rounded-xl text-sm text-slate-200 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="Free" className="bg-slate-950 text-slate-300">Free (Public to all)</option>
                      <option value="Premium" className="bg-slate-950 text-cyan-400">Premium ⚡ (Subscribers Only)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
                  </div>
                )}
              </div>

              {/* Submit Changes Button */}
              <div className="pt-4 relative w-full">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 text-slate-950 font-black py-6.5 rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 text-sm tracking-wide"
                  endContent={!isSubmitting && <FiCheck className="text-sm font-black" />}
                >
                  Save Changes
                </Button>
              </div>

            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}