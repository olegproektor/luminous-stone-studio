import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import {
  getIzdeliyaCollectionBySlug,
  getIzdeliyaProductByRoute,
} from "@/data/izdeliya-architecture.seed";

const CollectionProductPage = () => {
  const { collectionSlug, productSlug } = useParams<{ collectionSlug: string; productSlug: string }>();
  const resolvedCollectionSlug = collectionSlug;
  const resolvedProductSlug = productSlug;

  const collection = resolvedCollectionSlug ? getIzdeliyaCollectionBySlug(resolvedCollectionSlug) : undefined;
  const product =
    resolvedCollectionSlug && resolvedProductSlug
      ? getIzdeliyaProductByRoute(resolvedCollectionSlug, resolvedProductSlug)
      : undefined;

  useAnalyticsView({ type: "detail", entity: "product", slug: resolvedProductSlug ?? "unknown" });

  if (!collection || !product) {
    return (
      <PageLayout title="Изделие не найдено — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Изделие не найдено</h1>
            <Link to={navPaths.products} className="font-body text-sm text-muted-foreground underline">
              Вернуться к изделиям
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={product.seo.title} description={product.seo.description}>
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Изделия", href: navPaths.products },
            { label: collection.name, href: buildPath.collection(collection.slug) },
            { label: product.name },
          ]}
        />
      </div>

      <PageHero eyebrow={`Коллекция ${collection.name}`} title={product.name} subtitle={product.tagline} />

      <Section title="Позиционирование">
        <p className="font-body text-base text-muted-foreground leading-relaxed max-w-3xl">{product.summary}</p>
      </Section>

      <Section variant="alt" title="Где используется">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {product.useCases.map((item) => (
            <li key={item} className="border border-border bg-background px-4 py-3 font-body text-sm text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Материал и фактура">
        <p className="font-body text-base text-muted-foreground leading-relaxed max-w-3xl">{product.materialNote}</p>
      </Section>

      <Section variant="alt" title="Технический блок">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.specs.map((spec) => (
            <div key={spec.label} className="border border-border/60 bg-background px-5 py-4">
              <p className="font-body text-xs tracking-brand-wide uppercase text-muted-foreground">{spec.label}</p>
              <p className="font-display text-lg text-foreground mt-1">{spec.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Обсудим применение на вашем объекте"
        subtitle="Подберём сценарий света, монтаж и комплект поставки под задачи участка."
        primaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: `Коллекция ${collection.name}`, href: buildPath.collection(collection.slug) }}
      />
    </PageLayout>
  );
};

export default CollectionProductPage;
