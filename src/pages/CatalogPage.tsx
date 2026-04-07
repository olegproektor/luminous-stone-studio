import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import CollectionsPanel, { collectionsRailOffsetClass } from "@/components/products/CollectionsPanel";
import { siteStrategy } from "@/config/site-strategy";
import { getCollectionLaunchStatus } from "@/data/public-catalog-state";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { getListMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { getIzdeliyaCollectionBySlug } from "@/data/izdeliya-architecture.seed";
import { productsShowcaseSeed } from "@/data/products-showcase.seed";

const catalogCopy = {
  introTitle: "Подберите направление света для вашего проекта",
  introParagraphs: [
    "Начинать с коллекции проще, чем с отдельной модели: каждая из них отвечает за свой сценарий света и помогает быстро сузить выбор под архитектуру пространства.",
    "Сначала выберите характер света, затем перейдите к моделям и материалам, а после этого обсудите проект, если нужна точная рекомендация под участок или объект.",
  ],
  collectionsTitle: "Коллекции решений",
  inDevelopment: "Готовим к запуску",
  cardCtaLabel: "Смотреть коллекцию",
  finalCta: {
    eyebrow: "Подбор решения",
    title: "Подберём коллекцию под архитектуру и задачу пространства",
    subtitle:
      "Если не уверены, с какого сценария начать, поможем сопоставить коллекцию, материал и применение под частный или объектный проект.",
    primaryCtaLabel: "Обсудить проект",
    secondaryCtaLabel: "Получить материалы",
  },
} as const;

const CatalogPage = () => {
  const meta = getListMetadata("products");
  useAnalyticsView({ type: "list", entity: "product" });

  return (
    <PageLayout title={meta.title} description={meta.description}>
      <PageHero
        eyebrow={productsShowcaseSeed.hero.eyebrow}
        title={productsShowcaseSeed.hero.title}
        subtitle={productsShowcaseSeed.hero.subtitle}
        backgroundImage={productsShowcaseSeed.hero.image.src}
        compact={false}
      />

      <CollectionsPanel title={productsShowcaseSeed.panelTitle} items={productsShowcaseSeed.panelItems} />

      <Section className={`overflow-x-hidden ${collectionsRailOffsetClass}`}>
        <div className="max-w-3xl">
          <h2 className="font-display text-[1.9rem] leading-tight text-foreground sm:text-4xl lg:text-[2.55rem]">
            {catalogCopy.introTitle}
          </h2>
          <div className="mt-6 space-y-4">
            {catalogCopy.introParagraphs.map((paragraph) => (
              <p key={paragraph} className="font-body text-[0.98rem] leading-relaxed text-muted-foreground lg:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section title={catalogCopy.collectionsTitle} className={`overflow-x-hidden ${collectionsRailOffsetClass}`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {productsShowcaseSeed.collectionCards.map((card) => {
            const collection = getIzdeliyaCollectionBySlug(card.collectionSlug);
            return (
              <article key={card.collectionSlug} className="overflow-hidden border border-border bg-background">
                <Link to={buildPath.collection(card.collectionSlug)} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={card.image.src}
                      alt={card.image.alt}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground">{card.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{card.description}</p>

                  {collection && getCollectionLaunchStatus(collection.slug) === "coming-soon" && (
                    <p className="mt-4 font-body text-xs uppercase tracking-brand-wide text-muted-foreground">
                      {catalogCopy.inDevelopment}
                    </p>
                  )}

                  <Link
                    to={buildPath.collection(card.collectionSlug)}
                    className="mt-6 inline-block border-b border-foreground/30 pb-1 text-xs font-body font-medium uppercase tracking-brand"
                  >
                    {catalogCopy.cardCtaLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <div className={`overflow-x-hidden ${collectionsRailOffsetClass}`}>
        <CTASection
          eyebrow={catalogCopy.finalCta.eyebrow}
          title={catalogCopy.finalCta.title}
          subtitle={catalogCopy.finalCta.subtitle}
          primaryCta={{ label: siteStrategy.primaryConversion.label, href: siteStrategy.primaryConversion.href }}
          secondaryCta={{ label: catalogCopy.finalCta.secondaryCtaLabel, href: navPaths.downloads }}
          context="catalog_final"
        />
      </div>
    </PageLayout>
  );
};

export default CatalogPage;
