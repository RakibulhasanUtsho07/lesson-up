import React from 'react'

function MostFavoritesLessons({ mostFavoritesLesson = [] }) {
  
const lessons = Array.isArray(mostFavoritesLesson) ? mostFavoritesLesson : [];
  if (!lessons?.length) {
    return (
      <div className="w-full py-12 bg-slate-950 text-center">
        <p className="text-slate-600 text-sm font-semibold">No favorite lessons available yet.</p>
      </div>
    );
  }
console.log(mostFavoritesLesson, "lessons")
  return (
    <div className="w-full py-12 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-pink-500" />
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
              Community Favorites
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2">
            Most Saved Lessons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson, index) => (
            <div
              key={lesson._id || index}
              className="group relative flex flex-col sm:flex-row bg-slate-900/20 border border-slate-900/80 rounded-2xl overflow-hidden hover:border-pink-500/20 transition-all duration-300 backdrop-blur-md"
            >
              {/* Left: Image */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                {lesson.image ? (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <span className="text-slate-600 text-xs">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 sm:from-transparent via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-slate-950/80 text-pink-400 border border-slate-800/80 backdrop-blur-md">
                  {lesson.category || "General"}
                </span>
              </div>

              {/* Right: Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-slate-200 text-base leading-snug line-clamp-2 group-hover:text-pink-400 transition-colors">
                    {lesson.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-3">
                    {lesson.userImage ? (
                      <img
                        src={lesson.userImage}
                        alt={lesson.name}
                        className="w-5 h-5 rounded-full object-cover border border-slate-800"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[9px] text-slate-400">
                        {lesson.name?.charAt(0) || "?"}
                      </div>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {lesson.name || "Anonymous"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-900/60 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    👍 <span className="text-slate-300 font-semibold">{lesson.likes ?? 0}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-pink-500/5 px-2.5 py-1 rounded-xl border border-pink-500/10 text-pink-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M4.75 3A1.75 1.75 0 0 0 3 4.75v12.5c0 .41.43.68.79.47l6.21-3.63a1 1 0 0 1 1 0l6.21 3.63c.36.21.79-.06.79-.47V4.75A1.75 1.75 0 0 0 15.25 3H4.75Z" />
                    </svg>
                    <span className="text-xs font-bold tracking-tight">
                      {lesson.favorites ?? 0} Saves
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MostFavoritesLessons;