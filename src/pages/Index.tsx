import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import ScenariosSection from "@/components/sections/ScenariosSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import AboutProductSection from "@/components/sections/AboutProductSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArchitectsSection from "@/components/sections/ArchitectsSection";
import CustomSection from "@/components/sections/CustomSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustSection from "@/components/sections/TrustSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { homeLayoutSeed, type HomeSectionKey } from "@/data/home-layout.seed";

const sectionsMap: Record<HomeSectionKey, JSX.Element> = {
  hero: <HeroSection />,
  advantages: <AdvantagesSection />,
  aboutProduct: <AboutProductSection />,
  collections: <CollectionsSection />,
  scenarios: <ScenariosSection />,
  featuredProducts: <FeaturedProductsSection />,
  projects: <ProjectsSection />,
  materials: <MaterialsSection />,
  architects: <ArchitectsSection />,
  process: <ProcessSection />,
  custom: <CustomSection />,
  trust: <TrustSection />,
  faq: <FaqSection />,
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
