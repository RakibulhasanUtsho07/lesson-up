"use client";

import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";

export default function UniqueSystemAlertDialog({ lesson, executeDelete, setLessonId }) {
  console.log(lesson, "alertDialog")
  console.log(executeDelete, "exeCuteDelete")
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

 const onConfirm = () => {
    const id = lesson?._id || lesson?.id;
    console.log(id,"executeDelete id")
    if (id) {
      executeDelete(id); // ⚡ ফিক্স ১: সরাসরি আইডি সহ ডিলিট ফাংশন কল করা হলো=
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative overflow-hidden group min-w-10 size-10 bg-slate-950 border border-slate-900 text-rose-500 hover:text-rose-400 hover:border-rose-500/30 rounded-xl transition-all duration-300"
        aria-label="Delete lesson"
      >
        <span className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/5 transition-colors duration-300" />
        <FiTrash2 className="size-4 mx-auto" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
        >
          <div
            className="w-full max-w-md bg-[#030712] border border-slate-800 shadow-2xl shadow-rose-500/5 rounded-2xl p-6 overflow-hidden relative"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            {/* Background glow */}
            <div className="absolute top-[-20%] left-[-20%] size-[220px] bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 rounded-lg transition-all focus:outline-none"
              aria-label="Close dialog"
            >
              <FiX className="size-3.5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-900/60 pb-4 mb-4">
              <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 flex items-center justify-center">
                <FiAlertTriangle className="size-4 animate-bounce" />
              </div>
              <div>
                <h2 id="dialog-title" className="text-sm font-black tracking-wide text-slate-100 uppercase">
                  Confirm Destruction
                </h2>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Action cannot be undone</p>
              </div>
            </div>

            {/* Body */}
            <div className="text-xs font-medium text-slate-400 leading-relaxed space-y-3 mb-6">
              <p>
                Are you absolutely sure you want to permanently delete{" "}
                <span className="text-slate-200 font-bold">"{lesson?.title || "this content"}"</span>?
                This operation will instantly wipe all compiled data from our core database cluster.
              </p>
              <div className="p-2.5 bg-rose-950/20 border border-rose-950/50 text-rose-300 rounded-xl text-[11px] font-semibold flex items-start gap-2">
                <span className="select-none">⚠️</span>
                <span>Warning: This action will also revoke access for all sub-authors.</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-900/60 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all duration-200"
              >
                Proceed Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}