


// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
import LessonContent from "@/components/shared/LessonContent";
import InteractionBar from "@/components/shared/InteractionBar";
import CommentSection from "@/components/shared/CommentSection";
import AuthorAndStats from "@/components/shared/AuthorAndStatus";
import RecommendedLessons from "@/components/shared/RecommendedLessons";
import UpgradeBanner from "@/components/shared/UpgradeBanner";
import { getLessonDetails } from "@/lib/data/data";
import { getSessionData } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function LessonDetailsPage({ params }) {
  const { id } = await params
  const lesson = await getLessonDetails(id)
  console.log(lesson, "recived lessons")
  const user = await getSessionData()
  if (!user || user?.role !== 'admin') {
    redirect("/");
  }



  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 relative">
      <div className="absolute top-[-10%] right-[-10%] size-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />




      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 `}>

        {/* Left Side: Main Body (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          <LessonContent lesson={lesson} />

          <InteractionBar
            lesson={lesson}
          />

          <CommentSection lessonId={lesson._id} />
        </div>

        {/* Right Side: Meta, Author & Recommendations (1 Column) */}
        <div className="space-y-6">
          <AuthorAndStats lesson={lesson} />
          <RecommendedLessons lesson={lesson} />
        </div>

      </div>
    </div>
  );
}
