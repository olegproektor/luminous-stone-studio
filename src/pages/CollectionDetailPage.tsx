import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { collections, getCollectionBySlug } from "@/data/collections";
import { products } from "@/data/products";
import { navPaths } from "@/lib/route-helpers";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import CollectionHeroModule from "@/components/collections/modules/CollectionHeroModule";
import CollectionProductsModule from "@/components/collections/modules/CollectionProductsModule";
import CollectionRelatedModule from "@/components/collections/modules/CollectionRelatedModule";
import { getDetailMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";

const CollectionDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollectionBySlug(slug) : undefined;

  if (!collection) {
    return (
      <PageLayout title="Коллекция не найдена — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Коллекция не найдена</h1>
            <Link to={navPaths.collections} className="font-body text-sm text-muted-foreground underline">
              Вернуться к коллекциям
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const collectionProducts = products.filter((product) => collection.productIds.includes(product.id) && !product.isHidden);
  const relatedCollections = collections
    .filter((item) => item.id !== collection.id && !item.isHidden)
    .slice(0, 3);
  const meta = getDetailMetadata({ type: "collection", value: collection });
  useAnalyticsView({ type: "detail", entity: "collection", slug: collection.slug });

  return (
    <PageLayout title={meta.title} description={meta.description}>
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Коллекции", href: navPaths.collections },
            { label: collection.name },
          ]}
        />
      </div>

      <CollectionHeroModule collection={collection} />
      <TrustProofStrip />
      <CollectionProductsModule products={collectionProducts} />
      <CollectionRelatedModule collections={relatedCollections} />

      <CTASection
        title="Подберём коллекцию под ваш объект"
        subtitle="Определим нужные модели, высоты и сценарии монтажа."
        primaryCta={{ label: "Запросить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Смотреть все продукты", href: navPaths.products }}
      />
    </PageLayout>
  );
};

export default CollectionDetailPage;
