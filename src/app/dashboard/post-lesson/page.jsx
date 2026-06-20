"use client";

import React, { useState } from "react";
// স্টেবল হিরোইউআই কম্পোনেন্ট
import { Button, Tooltip, Card } from "@heroui/react";


import {
  FiBookOpen,
  FiTag,
  FiSmile,
  FiLock,
  FiImage,
  FiSend,
  FiAlertCircle,
  FiFileText
} from "react-icons/fi";
import { postLesson } from "@/lib/action/action";
import { authClient } from "@/lib/auth-client";

export default function AddLessonForm({ userPlan = "Free" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [image, setImage] = useState("");
  const [accessLevel, setAccessLevel] = useState("Free");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeUser = userPlan === "Free";
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user
 
  const categories = [
    { label: "Personal Growth", value: "personal-growth" },
    { label: "Career", value: "career" },
    { label: "Relationships", value: "relationships" },
    { label: "Mindset", value: "mindset" },
    { label: "Mistakes Learned", value: "mistakes-learned" },
  ];

  const emotionalTones = [
    { label: "Motivational", value: "motivational" },
    { label: "Sad", value: "sad" },
    { label: "Realization", value: "realization" },
    { label: "Gratitude", value: "gratitude" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title,
      description,
      category,
      tone,
      image,
      accessLevel: isFreeUser ? "Free" : accessLevel,
      name: user?.name,
      userId: user?.id || user?._id,
      userImage: user?.image || "",
      
      date: new Date()

    };
    const data = await postLesson(formData)

    console.log("Submitting Live Data:", formData);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 relative">
      {/* ব্যাকগ্রাউন্ড রিফ্লেকশন ব্লাড লাইট (Aesthetic Glows) */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="mb-10 space-y-3 text-center sm:text-left relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Share Your <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">Life Lesson</span>
        </h1>
        <p className="text-sm text-slate-500 font-medium max-w-xl">
          Crystallize your wisdom, document your evolution, and inspire a global community of intentional learners.
        </p>
      </div>

      {/* Main Glassmorphic Card */}
      <Card className="bg-white/70 border bg-blue-50 border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.10)] backdrop-blur-xl rounded-3xl overflow-visible transition-all duration-300">
        <div className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 ">

            {/* 1. Lesson Title Input */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-slate-700 text-xs tracking-wider uppercase">Lesson Title</label>
              <div className="relative flex items-center group">
                <FiBookOpen className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                <input
                  type="text"
                  required
                  placeholder="e.g., What 5 Years of Failure Taught Me About Focus"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none rounded-2xl text-sm text-slate-800 transition-all font-medium placeholder:text-slate-400/80"
                />
              </div>
            </div>

            {/* 2. Full Description Textarea */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-slate-700 text-xs tracking-wider uppercase">Full Description / Story / Insight</label>
              <div className="relative flex items-start group">
                <FiFileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                <textarea
                  required
                  rows={6}
                  placeholder="Deeply explain your experience, the breakthrough moment, and the structural takeaway..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none rounded-2xl text-sm text-slate-800 transition-all font-medium placeholder:text-slate-400/80 resize-y min-h-[160px]"
                />
              </div>
            </div>

            {/* 3. Category & Emotional Tone Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Category Dropdown */}
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-slate-700 text-xs tracking-wider uppercase">Category</label>
                <div className="relative flex items-center group">
                  <FiTag className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none rounded-2xl text-sm text-slate-700 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 pointer-events-none text-slate-400 text-xs transition-transform group-hover:translate-y-0.5">▼</div>
                </div>
              </div>

              {/* Emotional Tone Dropdown */}
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-slate-700 text-xs tracking-wider uppercase">Emotional Tone</label>
                <div className="relative flex items-center group">
                  <FiSmile className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                  <select
                    required
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none rounded-2xl text-sm text-slate-700 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="" disabled>Select a tone</option>
                    {emotionalTones.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 pointer-events-none text-slate-400 text-xs transition-transform group-hover:translate-y-0.5">▼</div>
                </div>
              </div>

            </div>

            {/* 4. Cover Image URL Input */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-slate-700 text-xs tracking-wider uppercase">Cover Image URL (Optional)</label>
              <div className="relative flex items-center group">
                <FiImage className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                <input
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none rounded-2xl text-sm text-slate-800 transition-all font-medium placeholder:text-slate-400/80"
                />
              </div>
            </div>

            {/* 5. Access Level Selector */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-slate-700 text-xs tracking-wider uppercase flex items-center gap-1.5">
                Access Level {isFreeUser && <FiAlertCircle className="text-amber-500 text-sm animate-pulse" />}
              </label>

              {isFreeUser ? (
                <Tooltip
                  content="Upgrade to Premium to unlock paid locks."
                  placement="top-start"
                  className="bg-slate-900 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-800"
                >
                  <div className="relative flex items-center opacity-75 cursor-not-allowed">
                    <FiLock className="absolute left-4 text-slate-400 z-10" />
                    <select
                      disabled
                      value="Free"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-100/80 border border-slate-200 outline-none rounded-2xl text-sm text-slate-400 appearance-none cursor-not-allowed font-medium"
                    >
                      <option value="Free">Free (Standard Tier Restriction)</option>
                    </select>
                  </div>
                </Tooltip>
              ) : (
                <div className="relative flex items-center group">
                  <FiLock className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] outline-none rounded-2xl text-sm text-slate-700 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="Free">Free (Public to all)</option>
                    <option value="Premium">Premium ⚡ (Subscribers Only)</option>
                  </select>
                  <div className="absolute right-4 pointer-events-none text-slate-400 text-xs transition-transform group-hover:translate-y-0.5">▼</div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 relative">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold py-6.5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(124,58,237,0.4)] transition-all duration-300 active:scale-[0.99] text-sm tracking-wide"
                endContent={!isSubmitting && <FiSend className="text-sm transition-transform group-hover:translate-x-1" />}
              >
                Publish Lesson
              </Button>
            </div>

          </form>
        </div>
      </Card>
    </div>
  );
}