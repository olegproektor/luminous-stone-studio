import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import HomeStorySection from "@/components/sections/HomeStorySection";
import HomeMosaicSection from "@/components/sections/HomeMosaicSection";
import { homeLayoutSeed, type HomeSectionKey } from "@/data/home-layout.seed";

const sectionsMap: Record<HomeSectionKey, JSX.Element> = {
  hero: <HeroSection />,
  story: <HomeStorySection />,
  mosaic: <HomeMosaicSection />,
};

const Index = () => {
  return (
    <PageLayout title={homeLayoutSeed.title} description={homeLayoutSeed.description}>
      {homeLayoutSeed.order.map((sectionKey) => (
        <div key={sectionKey}>{sectionsMap[sectionKey]}</div>
      ))}
    </PageLayout>
  );
};

export default Index;
