import HeroSlider from "@/components/Banner";

import WhyLearningMatters from "@/components/shared/WhyLearning";
import Image from "next/image";

export default function Home() {
  return (
    <>
    
      <HeroSlider />
      <div> Home page</div>
      <WhyLearningMatters/>
    </>
  );
}
