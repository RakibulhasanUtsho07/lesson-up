import React from 'react'

function TopContributors({ topContributor = [] }) {
   

    const medals = [
        { bg: "bg-amber-500/10 text-amber-400 border-amber-500/30", label: "🥇 Gold" },
        { bg: "bg-slate-300/10 text-slate-300 border-slate-300/30", label: "🥈 Silver" },
        { bg: "bg-orange-500/10 text-orange-400 border-orange-500/30", label: "🥉 Bronze" }
    ];

    if (!topContributor?.length) {
        return (
            <div className="w-full py-12 bg-slate-950 text-center">
                <p className="text-slate-600 text-sm font-semibold">No contributors data available yet.</p>
            </div>
        );
    }

    return (
        <div className="w-full py-12 bg-slate-950">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">
                            Community Leaders
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2">
                            Top Contributors of the Week
                        </h2>
                    </div>
                    <p className="text-sm text-slate-400 max-w-xs md:text-right">
                        Meet the active creators driving our knowledge ecosystem forward this week.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topContributor.slice(0, 4).map((user, index) => {
                        const medal = medals[index] || { bg: "bg-slate-800 text-slate-400 border-slate-700", label: `#${index + 1} Rank` };

                        return (
                            <div
                                key={user._id || index}
                                className="relative group flex items-center p-4 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-950/40 border border-slate-900 hover:border-slate-800 transition-all duration-300 shadow-xl overflow-hidden"
                            >
                                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all duration-500" />

                                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md border ${medal.bg}`}>
                                    {medal.label}
                                </span>

                                <div className="flex items-center gap-4 w-full">
                                    <div className="relative flex-shrink-0">
                                        {user?.userImage ? (
                                            <img
                                                src={user.userImage}
                                                alt={user.name || "User"}
                                                className="w-14 h-14 rounded-full object-cover border border-slate-800 p-0.5 group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            /* ⚡ ফিক্স: ইমেজ না থাকলে নামের প্রথম অক্ষরটি একটি সুন্দর রাউন্ডেড গ্লাস-ডিজাইন বক্সে দেখাবে */
                                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 text-cyan-400 font-bold text-lg shadow-inner group-hover:scale-105 transition-transform duration-300">
                                                {user?.name ? user.name[0].toUpperCase() : "U"}
                                            </div>
                                        )}
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
                                    </div>

                                    <div className="truncate pr-12">
                                        <h3 className="font-bold text-slate-200 text-base group-hover:text-cyan-400 transition-colors truncate">
                                            {user.name}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                            <span className="font-semibold text-cyan-400/90">{user.lessonCount}</span> lessons
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default TopContributors;