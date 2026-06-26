import HeroSlider from "@/components/Banner";
import FeaturedLessons from "@/components/shared/FeaturedLessons";
import MostFavoritesLessons from "@/components/shared/MostFavoritesLessons";
import TopContributors from "@/components/shared/TopContributors";

import WhyLearningMatters from "@/components/shared/WhyLearning";
import { getMostSavedLessons, getPublicLessons, getTopContributors } from "@/lib/data/data";
import Image from "next/image";

export default async function Home() {
  const lessons = await getPublicLessons()
  const mostFavoritesLesson =await getMostSavedLessons()
  const topContributor = await getTopContributors()
   console.log(mostFavoritesLesson, "topContributor mostFavoritesLesson" )
  return (
    <>
    
      <HeroSlider />
      
      <FeaturedLessons lessons={lessons}/>
      <WhyLearningMatters/>
      <MostFavoritesLessons mostFavoritesLesson={mostFavoritesLesson}/>
      <TopContributors topContributor={topContributor} />

    </>
  );
}
