"use client"

import React from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlinePhotograph } from 'react-icons/hi';
// import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast"; // assuming you are using react-hot-toast

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegistration = async (data) => {
        // const { email, name, photo, password } = data;

        // console.log(data, "data");
        // const { data: res, error } = await authClient.signUp.email({
        //     name: name,
        //     email: email,
        //     password: password,
        //     image: photo,
        //     callbackURL: "/",
        // });

        // if (error) {
        //     toast.error(error.message || "Invalid email or password.", {
        //         position: "top-right",
        //         duration: 4000,
        //         style: {
        //             borderLeft: "5px solid #EF4444", 
        //             padding: "16px",
        //             color: "#FFFFFF", 
        //             background: "#11131c", 
        //             borderRadius: "12px", 
        //             boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        //             fontSize: "14px",
        //             fontWeight: "500"
        //         },
        //         iconTheme: {
        //             primary: "#EF4444",
        //             secondary: "#FFFFFF",
        //         },
        //     });
        //     return;
        // }
        // if (res) {
        //     toast.success("SignUp Successfully");
        // }
    };

    const handleGoogleSingIn = async () => {
        // await authClient.signIn.social({
        //     provider: "google"
        // });
    };

    return (
        // ১. মেইন কন্টেইনার: নেভিগেশনের মেটালিক ডার্ক থিমের সাথে ম্যাচিং ব্যাকগ্রাউন্ড
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0b10] via-[#0f111a] to-[#050608] p-4 md:p-8 relative overflow-hidden">
            
            {/* ব্যাকগ্রাউন্ডে প্রিমিয়াম গ্লো আনার জন্য মায়াবী নিওন আভা */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* ২. কার্ড ডিজাইন: গ্লাস মরফিজম আল্ট্রা-ডার্ক মেটালিক কার্ড */}
            <div className="w-full max-w-[480px] bg-[#11131c]/60 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 relative z-10">

                {/* লোগো ও হেডার সেকশন */}
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 select-none mb-2">
                        <div className="relative flex h-8 w-9 items-center justify-center filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                            <div className="absolute left-0 h-6 w-6 rounded-full border-[2.5px] border-cyan-400 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                            <div className="absolute right-0 h-6 w-6 rounded-full border-[2.5px] border-orange-500 bg-gradient-to-bl from-amber-500/15 to-transparent mix-blend-screen" />
                            <div className="absolute z-10 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">
                            lesson<span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">up</span>
                        </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">Create Account</h3>
                    <p className="text-sm text-slate-400 font-medium">Join us to start creating and learning lessons</p>
                </div>

                {/* গুগল সাইন আপ বাটন */}
                <button
                    onClick={handleGoogleSingIn}
                    type="button"
                    className="w-full h-12 flex items-center justify-center gap-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] text-slate-200 hover:text-white font-semibold text-sm rounded-2xl shadow-sm transition-all duration-200 active:scale-[0.99]"
                >
                    <FcGoogle className="text-xl" />
                    Sign up with Google
                </button>

                {/* ডিভাইডার লাইন */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-white/[0.08]"></div>
                    <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Or register with email</span>
                    <div className="flex-grow border-t border-white/[0.08]"></div>
                </div>

                {/* ফর্ম সেকশন */}
                <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

                    {/* নাম ইনপুট */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
                        <div className="relative flex items-center">
                            <HiOutlineUser className="absolute left-4 text-xl text-slate-500 z-10" />
                            <input
                                type="text"
                                {...register("name", { required: "Name field is required" })}
                                className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] text-white text-sm rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-[#0d0f16] transition-all font-medium placeholder:text-slate-600"
                                placeholder="Rakib Hasan"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-400 font-medium pl-1 mt-0.5">{errors.name.message}</p>
                        )}
                    </div>

                    {/* ফটো ইউআরএল ইনপুট */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Photo URL</label>
                        <div className="relative flex items-center">
                            <HiOutlinePhotograph className="absolute left-4 text-xl text-slate-500 z-10" />
                            <input
                                type="text"
                                {...register("photo", { required: "Photo URL field is required" })}
                                className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] text-white text-sm rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-[#0d0f16] transition-all font-medium placeholder:text-slate-600"
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>
                        {errors.photo && (
                            <p className="text-xs text-red-400 font-medium pl-1 mt-0.5">{errors.photo.message}</p>
                        )}
                    </div>

                    {/* ইমেইল ইনপুট */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
                        <div className="relative flex items-center">
                            <HiOutlineMail className="absolute left-4 text-xl text-slate-500 z-10" />
                            <input
                                type="email"
                                {...register("email", { required: "Email field is required" })}
                                className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] text-white text-sm rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-[#0d0f16] transition-all font-medium placeholder:text-slate-600"
                                placeholder="name@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-400 font-medium pl-1 mt-0.5">{errors.email.message}</p>
                        )}
                    </div>

                    {/* পাসওয়ার্ড ইনপুট */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Password</label>
                        <div className="relative flex items-center">
                            <HiOutlineLockClosed className="absolute left-4 text-xl text-slate-500 z-10" />
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password field is required",
                                    validate: {
                                        minLength: (value) => value.length >= 8 || "Password must be at least 8 characters",
                                        uppercase: (value) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                        number: (value) => /[0-9]/.test(value) || "Password must contain at least one number"
                                    }
                                })}
                                className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] text-white text-sm rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-[#0d0f16] transition-all font-medium placeholder:text-slate-600"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-400 font-medium pl-1 mt-0.5">{errors.password.message}</p>
                        )}
                    </div>

                    {/* সাবমিট বাটন (গেট স্টার্টেড থিম কালার ম্যাচিং) */}
                    <button
                        type="submit"
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-[0_4px_20px_0_rgba(79,70,229,0.3)] transition-all duration-200 mt-4 active:scale-[0.99]"
                    >
                        Create Free Account
                    </button>
                </form>

                {/* ফুটার লিঙ্ক */}
                <div className="text-center pt-4 border-t border-white/[0.06]">
                    <p className="text-sm font-medium text-slate-400">
                        Already have an account?
                        <Link className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline transition-all ml-1" href="/login">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;