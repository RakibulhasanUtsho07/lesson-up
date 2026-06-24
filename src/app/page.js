import HeroSlider from "@/components/Banner";
import FeaturedLessons from "@/components/shared/FeaturedLessons";

import WhyLearningMatters from "@/components/shared/WhyLearning";
import { getPublicLessons } from "@/lib/data/data";
import Image from "next/image";

export default async function Home() {
  const lessons = await getPublicLessons()
  return (
    <>
    
      <HeroSlider />
      <div> Home page</div>
      <FeaturedLessons lessons={lessons}/>
      <WhyLearningMatters/>

    </>
  );
}
