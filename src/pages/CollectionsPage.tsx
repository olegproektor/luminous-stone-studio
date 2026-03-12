import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import CollectionCard from "@/components/ui/collection-card";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import { collections } from "@/data/collections";
import { navPaths } from "@/lib/route-helpers";
import { collectionsIndexSeed } from "@/data/collections-index.seed";
import { getListMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";

const CollectionsPage = () => {
  const meta = getListMetadata("collections");
  const visibleCollections = collections.filter((item) => item.launchTier === "primary" && !item.isHidden);
  useAnalyticsView({ type: "list", entity: "collection" });

  return (
    <PageLayout
      title={meta.title}
      description={meta.description}
    >
      <PageHero
        eyebrow={collectionsIndexSeed.eyebrow}
        title={collectionsIndexSeed.title}
        subtitle={collectionsIndexSeed.subtitle}
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {visibleCollections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </Section>

      <TrustProofStrip />

      <CTASection
        eyebrow="Не нашли подходящее?"
        title="Обсудим ваш проект"
        subtitle="Мы проектируем кастомные решения под задачи любого масштаба."
        primaryCta={{ label: "Запросить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Смотреть продукты", href: navPaths.products }}
      />
    </PageLayout>
  );
};

export default CollectionsPage;
