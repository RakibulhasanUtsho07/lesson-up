"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Button, 
  Tooltip, 
  Card, 
  Input,
  TextArea,  // ✅ Fixed: lowercase 'a'
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
import toast from "react-hot-toast";


export default function UpdateLessonForm({ lesson }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tone: "",
    image: "",
    accessLevel: "Free",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (res.ok) {
        
        toast.success(`${lesson?.title } Update Successfully`)
        
      
        router.refresh(); 
      } else {
        console.error("Failed to update lesson");
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lesson) {
    return (
      <div className="flex min-h-screen bg-slate-950 items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium tracking-wide">Fetching lesson data...</p>
        </div>
      </div>
    );
  }

  // ✅ Shared classNames for HeroUI Input & Textarea
  const inputClass = {
    label: "text-slate-400 text-xs font-bold tracking-widest uppercase pb-1.5",
    inputWrapper: [
      "bg-slate-900/60",
      "border",
      "border-slate-800",
      "hover:border-slate-600",
      "focus-within:!border-cyan-500",
      "focus-within:!ring-1",
      "focus-within:!ring-cyan-500/30",
      "rounded-xl",
      "h-12",
      "transition-all",
      "duration-200",
      "shadow-none",
      "px-1",
    ],
    input: "text-slate-100 text-sm font-medium placeholder:text-slate-600 bg-transparent",
    base: "w-full",
  };

  const textareaClass = {
    ...inputClass,
    inputWrapper: [
      ...inputClass.inputWrapper.filter(c => c !== "h-12"),
      "py-3",
      "min-h-[120px]",
    ],
  };

  // ✅ Shared select wrapper style
  const selectWrapperClass =
    "w-full pl-11 pr-10 h-12 bg-slate-900/60 border border-slate-800 hover:border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 outline-none rounded-xl text-sm text-slate-100 font-medium transition-all duration-200 appearance-none cursor-pointer";

  return (
    <div className="bg-slate-950 w-full min-h-screen">
      <div className="w-full max-w-3xl mx-auto px-4 py-10 relative">

        {/* Ambient glow */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />

        {/* ── Header ── */}
        <div className="mb-8 pb-6 border-b border-slate-800/70 relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Update Your{" "}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Life Lesson
            </span>
          </h1>
          <p className="text-sm text-slate-400 font-medium max-w-xl leading-relaxed">
            Refine your thoughts, update your insights, and make sure your documented wisdom stays sharp and impactful.
          </p>
        </div>

        {/* ── Main Card ── */}
        <Card className="bg-slate-900/30 border border-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl relative z-10">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* 1 ── Lesson Title */}
              <Input
                type="text"
                label="Lesson Title"
                labelPlacement="outside"
                required
                placeholder="e.g., What 5 Years of Failure Taught Me About Focus"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                startContent={<FiBookOpen className="text-slate-500 text-base shrink-0" />}
                classNames={`${inputClass} py- 2`}
              />

              {/* 2 ── Description */}
              <TextArea
                label="Full Description / Story / Insight"
                labelPlacement="outside"
                required
                placeholder="Deeply explain your experience, the breakthrough moment, and the key takeaway..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                startContent={<FiFileText className="text-slate-500 text-base mt-0.5 shrink-0" />}
                classNames={`${textareaClass} py-3`}
                minRows={4}
              />

              {/* 3 ── Category & Emotional Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                    Category
                  </span>
                  <div className="relative group">
                    <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 pointer-events-none z-10 text-base transition-colors" />
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className={selectWrapperClass}
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-600">
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-slate-900 text-slate-200">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[9px]">▼</div>
                  </div>
                </div>

                {/* Emotional Tone */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                    Emotional Tone
                  </span>
                  <div className="relative group">
                    <FiSmile className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 pointer-events-none z-10 text-base transition-colors" />
                    <select
                      required
                      value={formData.tone}
                      onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                      className={selectWrapperClass}
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-600">
                        Select a tone
                      </option>
                      {emotionalTones.map((t) => (
                        <option key={t.value} value={t.value} className="bg-slate-900 text-slate-200">
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[9px]">▼</div>
                  </div>
                </div>

              </div>

              {/* 4 ── Cover Image URL */}
              <Input
                type="url"
                label="Cover Image URL (Optional)"
                labelPlacement="outside"
                placeholder="https://example.com/image.png"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                startContent={<FiImage className="text-slate-500 text-base shrink-0" />}
                classNames={inputClass}
              />

              {/* 5 ── Access Level */}
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                  Access Level
                  {isFreeUser && (
                    <Tooltip
                      content="Upgrade to Premium to unlock paid access locks."
                      placement="top-start"
                      classNames={{
                        content: "bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 shadow-xl"
                      }}
                    >
                      <span className="cursor-help">
                        <FiAlertCircle className="text-amber-400 text-sm" />
                      </span>
                    </Tooltip>
                  )}
                </span>

                {isFreeUser ? (
                  <div className="relative flex items-center w-full opacity-50 cursor-not-allowed">
                    <FiLock className="absolute left-3.5 text-slate-600 z-10 text-base" />
                    <div className={`${selectWrapperClass} flex items-center pointer-events-none`}>
                      Free (Standard Tier Restriction)
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 pointer-events-none z-10 text-base transition-colors" />
                    <select
                      value={formData.accessLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, accessLevel: e.target.value }))}
                      className={selectWrapperClass}
                    >
                      <option value="Free" className="bg-slate-900 text-slate-200">Free — Public to all</option>
                      <option value="Premium" className="bg-slate-900 text-cyan-300">Premium ⚡ — Subscribers only</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[9px]">▼</div>
                  </div>
                )}
              </div>

              {/* 6 ── Divider */}
              <div className="border-t border-slate-800/60" />

              {/* 7 ── Submit */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 text-slate-950 font-black py-6 rounded-xl text-sm tracking-wide shadow-[0_0_30px_rgba(34,211,238,0.12)] hover:shadow-[0_0_40px_rgba(34,211,238,0.22)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                endContent={!isSubmitting && <FiCheck className="text-sm" />}
              >
                Save Changes
              </Button>

            </form>
          </div>
        </Card>

      </div>
    </div>
  );
}