import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutProductSection from "@/components/sections/AboutProductSection";
import AudienceSection from "@/components/sections/AudienceSection";
import CTASection from "@/components/sections/CTASection";
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
        <AboutProductSection />
        <AudienceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
