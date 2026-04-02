import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/layout/CTASection";
import MaterialTextureGridModule from "@/components/materials/modules/MaterialTextureGridModule";
import { materialsTextureSeed } from "@/data/materials-texture.seed";
import { navPaths } from "@/lib/route-helpers";

const MaterialsPage = () => {
  return (
    <PageLayout
      title="Материалы и текстуры под проект — Форма Света"
      description="Натуральный камень, композит, специальные материалы и поверхности для архитектурных световых решений."
    >
      <PageHero
        eyebrow="Материалы"
        title="Материалы и текстуры под проект"
        subtitle="Подбираем материал, поверхность, финиш и специальные решения под характер пространства, сценарий света и требования объекта."
      />
      <MaterialTextureGridModule materials={materialsTextureSeed} />
      <CTASection
        eyebrow="Подбор материала"
        title="Подберём материал и поверхность под ваш проект"
        subtitle="Поможем определить направление, финиш и специальные решения для частного или объектного сценария."
        primaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Получить подбор решения", href: navPaths.requestProject }}
      />
    </PageLayout>
  );
};

export default MaterialsPage;

