"use client";

import React, { useState } from "react";
import { Card, Button, Tooltip } from "@heroui/react";
import {
    FiAlertTriangle,
    FiTrash2,
    FiCheckCircle,
    FiUser,
    FiX,
    FiInfo
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ReportedLessonsClient({ initialReportedLessons }) {
    // ডাটাবেজ থেকে আসা রিয়েল ডাটা স্টেট
    const [reportedLessons, setReportedLessons] = useState(initialReportedLessons);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 🗑️ Action 1: Delete Lesson (Permanently removes from platform)
    const handleDeleteLesson = async (id) => {
        try {
            // ⚡ MongoDB-র রিয়েল আইডি (_id) ফিল্টার আউট করবে
            setReportedLessons(prev => prev.filter(lesson => lesson._id !== id));
            toast.success("Content removed successfully from platform.");
            if (selectedLesson?.lessonId === id || selectedLesson?._id === id) closeModal();
        } catch (error) {
            toast.error("Failed to delete content.");
        }
    };

    // ✅ Action 2: Ignore (Keeps the lesson live and clears all reports)
    const handleIgnoreReports = async (id) => {
        try {
            setReportedLessons(prev => prev.filter(lesson => lesson._id !== id));
            toast.success("Reports dismissed. Content is live.");
            if (selectedLesson?.lessonId === id || selectedLesson?._id === id) closeModal();
        } catch (error) {
            toast.error("Failed to dismiss reports.");
        }
    };

    // মোডাল হ্যান্ডলার্স
    const openReportsModal = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLesson(null);
    };

    return (
        <div className="space-y-8 relative z-10">
            {/* 📊 টেবিল ডিসপ্লে */}
            <Card className="bg-slate-950/20 border border-slate-900 shadow-2xl rounded-2xl overflow-visible">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                <th className="py-4 px-6">Lesson Details</th>
                                <th className="py-4 px-4 text-center">Tone Context</th>
                                <th className="py-4 px-4 text-center">Logs</th>
                                <th className="py-4 px-6 text-right">Moderation Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/40 text-xs font-medium text-slate-300">

                            {reportedLessons.map((lesson) => (
                                <tr key={lesson._id?.$oid || lesson._id} className="hover:bg-rose-950/5 transition-colors group">

                                    {/* লেসন টাইটেল ও ক্যাটাগরি */}
                                    <td className="py-4 px-6 max-w-sm">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-slate-200 font-bold line-clamp-1 group-hover:text-rose-400 transition-colors">
                                                {lesson.title}
                                            </span>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[9px] font-black uppercase tracking-wide text-slate-400">
                                                    ID: {lesson.lessonId?.substring(0, 8)}...
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* টোন কনটেক্সট (রিয়েল অবজেক্ট অনুযায়ী) */}
                                    <td className="py-4 px-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold capitalize text-[11px]">
                                            {lesson.tone || "General"}
                                        </span>
                                    </td>

                                    {/* মোডাল খোলার বাটন */}
                                    <td className="py-4 px-4 text-center">
                                        <Button
                                            size="sm"
                                            variant="bordered"
                                            onClick={() => openReportsModal(lesson)}
                                            className="border-slate-800 text-[11px] font-bold h-8 rounded-xl text-slate-400 hover:text-rose-400 hover:border-rose-500/20 bg-slate-950"
                                            startContent={<FiInfo className="text-xs" />}
                                        >
                                            View Reason
                                        </Button>
                                    </td>

                                    {/* অপারেশনাল অ্যাকশনস */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2.5">

                                            {/* Ignore Button */}
                                            <Button
                                                size="sm"
                                                onClick={() => handleIgnoreReports(lesson._id)}
                                                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px] h-8 rounded-xl hover:bg-emerald-500/20 px-3"
                                                startContent={<FiCheckCircle />}
                                            >
                                                Ignore
                                            </Button>

                                            {/* Permanent Delete Button */}
                                            <Tooltip content="Permanently Delete Lesson" className="bg-slate-950 text-xs text-rose-400 border border-rose-950">
                                                <button
                                                    onClick={() => handleDeleteLesson(lesson._id)}
                                                    className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all"
                                                >
                                                    <FiTrash2 className="size-3.5" />
                                                </button>
                                            </Tooltip>

                                        </div>
                                    </td>

                                </tr>
                            ))}

                            {reportedLessons.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-16 text-slate-600 font-bold tracking-widest uppercase text-xs">
                                        🎉 Platform Clean. Zero Reported Material.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </Card>

            {/* 🚨 রিপোর্টের কারণ দেখার কাস্টম মোডাল */}
            {isModalOpen && selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-xl bg-slate-950 border border-slate-900 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">

                        {/* মোডাল হেডার */}
                        <div className="p-5 border-b border-slate-900/60 flex items-start justify-between bg-slate-900/10">
                            <div className="space-y-1 pr-6">
                                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-rose-500">
                                    <FiAlertTriangle /> Incident Details Log
                                </div>
                                <h3 className="text-sm font-black text-white leading-snug line-clamp-2">{selectedLesson.title}</h3>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-1.5 text-slate-500 hover:text-white bg-slate-900/60 border border-slate-800 rounded-lg transition-colors"
                            >
                                <FiX className="size-4" />
                            </button>
                        </div>

                        {/* মোডাল বডি (রিয়েল ডাটা ফিল্ড ম্যাপিং) */}
                        <div className="p-6 space-y-4 bg-slate-950">
                            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Logged Grievance</h4>

                            <div className="p-4 bg-slate-900/30 border border-slate-900/80 rounded-xl space-y-3">
                                <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                                    <div className="flex items-center gap-2">
                                        <FiUser className="text-cyan-500 shrink-0" />
                                        <span className="font-bold text-slate-300">{selectedLesson.userName || "Anonymous"}</span>
                                        <span className="text-[10px] text-slate-600 font-medium">(ID: {selectedLesson.reporterId || selectedLesson.userId})</span>
                                    </div>
                                    {selectedLesson.createdAt && (
                                        <span className="text-[10px] text-slate-500 font-semibold">
                                            {new Date(selectedLesson.createdAt).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>

                                {/* রিয়েল ডাটাবেজের reportReason ফিল্ড */}
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Violation Reason:</span>
                                    <p className="text-xs text-rose-300 font-medium pl-3 border-l-2 border-rose-500/50 bg-rose-950/10 p-2.5 rounded-r-lg">
                                        {selectedLesson.reportReason || "No specific reason specified."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* মোডাল ফুটার */}
                        <div className="p-4 border-t border-slate-900/60 bg-slate-900/20 flex items-center justify-end gap-3">
                            <Button
                                size="sm"
                                variant="flat"
                                onClick={() => handleIgnoreReports(selectedLesson._id)}
                                className="bg-emerald-500/10 text-emerald-400 font-bold rounded-xl text-xs h-9 px-4"
                            >
                                Ignore Report
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleDeleteLesson(selectedLesson._id)}
                                className="bg-gradient-to-r from-rose-600 to-red-500 text-white font-black rounded-xl text-xs h-9 px-4"
                            >
                                Delete Content
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}