import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArchitectsSection from "@/components/sections/ArchitectsSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { homeLayoutSeed, type HomeSectionKey } from "@/data/home-layout.seed";

const sectionsMap: Record<HomeSectionKey, JSX.Element> = {
  hero: <HeroSection />,
  advantages: <AdvantagesSection />,
  collections: <CollectionsSection />,
  projects: <ProjectsSection />,
  materials: <MaterialsSection />,
  architects: <ArchitectsSection />,
  process: <ProcessSection />,
  finalCta: <FinalCTASection />,
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
