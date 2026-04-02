import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import TextureDetailModule from "@/components/materials/modules/TextureDetailModule";
import { getMaterialFamilyBySlug, resolveMaterialFamilySlug } from "@/data/materials-texture.seed";
import { navPaths, buildPath } from "@/lib/route-helpers";

const TextureDetailPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const material = getMaterialFamilyBySlug(slug);
  const canonicalSlug = resolveMaterialFamilySlug(slug);
  const canonical = canonicalSlug ? buildPath.texture(canonicalSlug) : undefined;
  const isLegacyAlias = canonicalSlug !== undefined && slug !== canonicalSlug;

  const pageTitle = useMemo(() => {
    if (!material) return "Материал не найден — Форма Света";
    return material.seo.title;
  }, [material]);

  if (!material) {
    return (
      <PageLayout title={pageTitle}>
        <Section>
          <div className="py-20 text-center">
            <h1 className="mb-4 font-display text-3xl">Материал не найден</h1>
            <Link to={navPaths.materials} className="font-body text-sm text-muted-foreground underline">
              Вернуться к материалам
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={material.seo.title} description={material.seo.description} canonical={canonical}>
      <div className="container-brand px-6 pt-6 md:px-12 lg:px-24">
        <Breadcrumbs
          items={[
            { label: "Изделия", href: navPaths.products },
            { label: "Фактура", href: navPaths.materials },
            { label: material.name },
          ]}
        />
      </div>
      <PageHero
        eyebrow={isLegacyAlias ? "Материал" : "Материалы"}
        title={material.name}
        subtitle={material.summary}
      />
      <TextureDetailModule material={material} />
      <CTASection
        eyebrow="Обсуждение проекта"
        title="Подберём материал под ваш проект"
        subtitle="Обсудим характер пространства, подскажем подходящую поверхность и согласуем специальные решения под задачу."
        primaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Получить подбор решения", href: navPaths.requestProject }}
      />
    </PageLayout>
  );
};

export default TextureDetailPage;

