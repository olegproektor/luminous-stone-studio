import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import CollectionsPanel from "@/components/products/CollectionsPanel";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { getListMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { getIzdeliyaCollectionBySlug } from "@/data/izdeliya-architecture.seed";
import { productsShowcaseSeed } from "@/data/products-showcase.seed";

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

      <Section className="overflow-x-hidden lg:pl-[17rem] xl:pl-[18rem] 2xl:pl-[19rem]">
        <div className="max-w-3xl">
          <h2 className="font-display text-[1.9rem] sm:text-4xl lg:text-[2.55rem] text-foreground leading-tight">
            {productsShowcaseSeed.intro.title}
          </h2>
          <div className="mt-6 space-y-4">
            {productsShowcaseSeed.intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-body text-[0.98rem] lg:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="overflow-x-hidden lg:pl-[17rem] xl:pl-[18rem] 2xl:pl-[19rem]">
        <CollectionsPanel title={productsShowcaseSeed.panelTitle} items={productsShowcaseSeed.panelItems} />
      </Section>

      <Section title={productsShowcaseSeed.collectionsTitle} className="overflow-x-hidden lg:pl-[17rem] xl:pl-[18rem] 2xl:pl-[19rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {productsShowcaseSeed.collectionCards.map((card) => {
            const collection = getIzdeliyaCollectionBySlug(card.collectionSlug);
            return (
              <article key={card.collectionSlug} className="border border-border bg-background overflow-hidden">
                <Link to={buildPath.collection(card.collectionSlug)} className="block">
                  <div className="aspect-[4/5] bg-secondary overflow-hidden">
                    <img
                      src={card.image.src}
                      alt={card.image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground">{card.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{card.description}</p>

                  {collection?.status === "in-development" && (
                    <p className="font-body text-xs uppercase tracking-brand-wide text-muted-foreground mt-4">
                      Коллекция в разработке
                    </p>
                  )}

                  <Link
                    to={buildPath.collection(card.collectionSlug)}
                    className="inline-block mt-6 text-xs font-body font-medium tracking-brand uppercase border-b border-foreground/30 pb-1"
                  >
                    {card.ctaLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <div className="overflow-x-hidden lg:pl-[17rem] xl:pl-[18rem] 2xl:pl-[19rem]">
        <CTASection
          eyebrow={productsShowcaseSeed.finalCta.eyebrow}
          title={productsShowcaseSeed.finalCta.title}
          subtitle={productsShowcaseSeed.finalCta.subtitle}
          primaryCta={{ label: productsShowcaseSeed.finalCta.primaryCtaLabel, href: navPaths.requestProject }}
          secondaryCta={{ label: productsShowcaseSeed.finalCta.secondaryCtaLabel, href: navPaths.contacts }}
        />
      </div>
    </PageLayout>
  );
};

export default CatalogPage;
