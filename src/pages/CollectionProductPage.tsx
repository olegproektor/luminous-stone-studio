import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CollectionsPanel, { collectionsRailOffsetClass } from "@/components/products/CollectionsPanel";
import { getProductPageContent } from "@/data/product-page-content.seed";
import {
  getIzdeliyaCollectionBySlug,
  getIzdeliyaProductByRoute,
} from "@/data/izdeliya-architecture.seed";
import { productsShowcaseSeed } from "@/data/products-showcase.seed";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const t = {
  notFoundTitle: "Изделие не найдено",
  backToCatalog: "Вернуться в каталог",
  catalog: "Каталог",
  collectionLabel: "Коллекция",
  materialsEyebrow: "Материалы",
  technicalTitle: "Технические параметры",
  utilityEyebrow: "Поддержка проекта",
  utilityCatalogue: "Скачать каталог",
  utilityBim: "BIM и 3D",
  utilitySupport: "Техническая поддержка",
  utilityCatalogueCopy: "PDF-материалы по решениям и коллекциям для согласования концепции и состава проекта.",
  utilityBimCopy: "Материалы для проектирования, координации и проработки технической части объекта.",
  utilitySupportCopy: "Видео по подключению, монтажу и сервисному сопровождению световых решений.",
  customizationTitle: "Индивидуальная настройка",
  discussProject: "Обсудить проект",
  getSelection: "Получить подбор решения",
  finalTitle: "Обсудим применение в вашем проекте",
  finalSubtitle:
    "Подберём сценарий света, материалы и способ интеграции под архитектуру и задачи конкретного объекта.",
  lightingScenario: "Световой сценарий",
} as const;

const CollectionProductPage = () => {
  const { collectionSlug, productSlug } = useParams<{ collectionSlug: string; productSlug: string }>();
  const resolvedCollectionSlug = collectionSlug;
  const resolvedProductSlug = productSlug;

  const collection = resolvedCollectionSlug ? getIzdeliyaCollectionBySlug(resolvedCollectionSlug) : undefined;
  const product =
    resolvedCollectionSlug && resolvedProductSlug
      ? getIzdeliyaProductByRoute(resolvedCollectionSlug, resolvedProductSlug)
      : undefined;
  const presentation = resolvedProductSlug ? getProductPageContent(resolvedProductSlug) : undefined;

  useAnalyticsView({ type: "detail", entity: "product", slug: resolvedProductSlug ?? "unknown" });

  if (!collection || !product || !presentation) {
    return (
      <PageLayout title={`${t.notFoundTitle} — Форма Света`}>
        <Section>
          <div className="py-20 text-center">
            <h1 className="mb-4 font-display text-3xl text-foreground">{t.notFoundTitle}</h1>
            <Link to={navPaths.products} className="font-body text-sm text-muted-foreground underline">
              {t.backToCatalog}
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={product.seo.title} description={product.seo.description}>
      <div className={`container-brand px-6 pb-8 pt-6 md:px-12 lg:px-24 ${collectionsRailOffsetClass}`}>
        <Breadcrumbs
          items={[
            { label: t.catalog, href: navPaths.products },
            { label: collection.name, href: buildPath.collection(collection.slug) },
            { label: product.name },
          ]}
        />
      </div>

      <CollectionsPanel
        title={productsShowcaseSeed.panelTitle}
        items={productsShowcaseSeed.panelItems}
        activeCollection={collection.slug}
        activeProduct={product.slug}
      />

      <section className={`pb-20 pt-4 md:pb-24 ${collectionsRailOffsetClass}`}>
        <div className="container-brand grid grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:px-24">
          <div className="max-w-2xl">
            <p className="mb-4 font-body text-xs font-medium uppercase tracking-brand-wide text-muted-foreground">
              {presentation.heroEyebrow}
            </p>
            <h1 className="font-display text-4xl leading-tight text-foreground md:text-6xl">{product.name}</h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-foreground">{product.tagline}</p>
            <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
              {presentation.intro}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to={navPaths.requestProject}
                className={cn(buttonVariants({ variant: "sitePrimary", size: "siteLg" }))}
              >
                {t.discussProject}
              </Link>
              <Link
                to={navPaths.requestProject}
                className={cn(buttonVariants({ variant: "siteOutline", size: "siteLg" }))}
              >
                {t.getSelection}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden border border-border bg-gradient-to-br from-secondary/70 via-background to-secondary/30">
            <div className="flex h-full min-h-[420px] flex-col justify-between p-8 md:p-10">
              <div>
                <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">
                  {t.collectionLabel}
                </p>
                <p className="mt-3 font-display text-3xl text-foreground md:text-4xl">{collection.name}</p>
                <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
                  {collection.description}
                </p>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">
                  {t.lightingScenario}
                </p>
                <p className="font-display text-2xl leading-snug text-foreground">{product.tagline}</p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {product.specs.slice(0, 2).map((spec) => (
                    <div key={spec.label} className="border border-border/60 bg-background/80 px-4 py-3">
                      <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">
                        {spec.label}
                      </p>
                      <p className="mt-1 font-display text-lg text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title={presentation.positioningTitle} className={collectionsRailOffsetClass}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]">
          <div className="max-w-3xl">
            <p className="font-body text-base leading-relaxed text-muted-foreground">{presentation.positioningBody}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {presentation.positioningHighlights.map((item) => (
              <div key={item} className="border border-border bg-background px-5 py-4">
                <p className="font-body text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        variant="alt"
        eyebrow={t.materialsEyebrow}
        title={presentation.materialBlockTitle}
        subtitle={presentation.materialBlockIntro}
        className={collectionsRailOffsetClass}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="max-w-xl">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">{product.materialNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {presentation.materialLinks.map((material) => (
              <Link
                key={material.slug}
                to={buildPath.texture(material.slug)}
                className="border border-border bg-background px-5 py-5 transition-colors hover:bg-secondary/40"
              >
                <p className="font-display text-2xl text-foreground">{material.label}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                  {material.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section title={t.technicalTitle} className={collectionsRailOffsetClass}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="border border-border/60 bg-background px-5 py-4">
                  <p className="font-body text-xs uppercase tracking-brand-wide text-muted-foreground">
                    {spec.label}
                  </p>
                  <p className="mt-1 font-display text-lg text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3">
              {presentation.technicalHighlights.map((item) => (
                <div key={item} className="border-l border-border pl-4">
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="border border-border bg-secondary/30 px-6 py-6">
              <p className="font-display text-2xl text-foreground">{presentation.installationTitle}</p>
              <div className="mt-5 space-y-3">
                {presentation.installationHighlights.map((item) => (
                  <p key={item} className="font-body text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="border border-border bg-background px-6 py-6">
              <p className="font-display text-2xl text-foreground">{t.customizationTitle}</p>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                {presentation.customizationNote}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow={t.utilityEyebrow} title={presentation.downloadsBlockTitle} subtitle={presentation.downloadsBlockCopy} className={collectionsRailOffsetClass}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Link
            to={buildPath.downloadCategory("catalogue")}
            className="border border-border bg-background px-5 py-6 transition-colors hover:bg-secondary/30"
          >
            <p className="font-display text-2xl text-foreground">{t.utilityCatalogue}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{t.utilityCatalogueCopy}</p>
          </Link>

          <Link
            to={buildPath.downloadCategory("bim")}
            className="border border-border bg-background px-5 py-6 transition-colors hover:bg-secondary/30"
          >
            <p className="font-display text-2xl text-foreground">{t.utilityBim}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{t.utilityBimCopy}</p>
          </Link>

          <Link
            to={buildPath.downloadCategory("support")}
            className="border border-border bg-background px-5 py-6 transition-colors hover:bg-secondary/30"
          >
            <p className="font-display text-2xl text-foreground">{t.utilitySupport}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{t.utilitySupportCopy}</p>
          </Link>
        </div>
      </Section>

      <div className={collectionsRailOffsetClass}>
        <CTASection
          title={t.finalTitle}
          subtitle={t.finalSubtitle}
          primaryCta={{ label: t.discussProject, href: navPaths.requestProject }}
          secondaryCta={{ label: t.getSelection, href: navPaths.requestProject }}
        />
      </div>
    </PageLayout>
  );
};

export default CollectionProductPage;
