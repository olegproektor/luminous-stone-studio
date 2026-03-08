import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "STŌN — Архитектурные уличные светильники из камня";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Болларды и светильники из литьевого камня для архитектурного ландшафта. Премиальное качество, российское производство."
      );
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <AboutProductSection />
        <CollectionsSection />
        <ScenariosSection />
        <FeaturedProductsSection />
        <ProjectsSection />
        <ArchitectsSection />
        <ProcessSection />
        <CustomSection />
        <MaterialsSection />
        <TrustSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
