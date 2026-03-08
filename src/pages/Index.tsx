import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutProductSection from "@/components/sections/AboutProductSection";
import AudienceSection from "@/components/sections/AudienceSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
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
