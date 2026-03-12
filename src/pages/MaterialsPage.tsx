import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/layout/CTASection";
import MaterialTextureGridModule from "@/components/materials/modules/MaterialTextureGridModule";
import { materialsTextureSeed } from "@/data/materials-texture.seed";
import { navPaths } from "@/lib/route-helpers";

const MaterialsPage = () => {
  return (
    <PageLayout title="Материалы и текстуры — STON" description="Материалы и текстуры STON для архитектурного освещения.">
      <PageHero
        eyebrow="Materials"
        title="Материалы и текстуры"
        subtitle="Фактура, свойства и сценарии применения для частных и коммерческих объектов."
      />
      <MaterialTextureGridModule textures={materialsTextureSeed} />
      <CTASection
        title="Подобрать текстуру под проект"
        subtitle="Поможем определить фактуру и комплект решений под ваш объект."
        primaryCta={{ label: "Оставить заявку", href: navPaths.requestProject }}
      />
    </PageLayout>
  );
};

export default MaterialsPage;
