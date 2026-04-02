import { Link, useLocation, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CollectionsPanel, { collectionsRailOffsetClass } from "@/components/products/CollectionsPanel";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { resolveCanonicalCollectionSlug } from "@/config/routes";
import { getIzdeliyaCollectionBySlug, getIzdeliyaProductsByCollection } from "@/data/izdeliya-architecture.seed";
import { productsShowcaseSeed } from "@/data/products-showcase.seed";

const t = {
  catalog: "Каталог",
  collection: "Коллекция",
  notFoundTitle: "Коллекция не найдена",
  backToCatalog: "Вернуться в каталог",
  identityEyebrow: "Характер коллекции",
  identityTitle: "Коллекция как цельный сценарий",
  identitySupport:
    "Коллекция объединяет решения с общим характером света, материала и работы в пространстве. Она помогает выстроить не отдельный объект, а связный световой ритм внутри проекта.",
  innerSolutions: "Решения внутри коллекции",
  inDev: "Решение в разработке",
  inDevText:
    "Публикуем рабочие решения после завершения проектной валидации и подготовки материалов для обсуждения проекта.",
  collectionProducts: "Решения коллекции",
  openModel: "Смотреть решение",
  ctaTitle: "Подберём решение под ваш проект",
  ctaSubtitle:
    "Сопоставим коллекцию, сценарий света и применение в пространстве в рамках вашего проекта.",
  discussProject: "Обсудить проект",
  viewProjects: "Смотреть проекты",
} as const;

const CollectionDetailPage = () => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const pathnameSlug = location.pathname.startsWith("/izdeliya/") ? location.pathname.split("/")[2] : undefined;
  const resolvedSlug = pathnameSlug ?? slug;
  const canonicalCollectionSlug = resolvedSlug ? resolveCanonicalCollectionSlug(resolvedSlug) : undefined;

  const collection = canonicalCollectionSlug ? getIzdeliyaCollectionBySlug(canonicalCollectionSlug) : undefined;
  const products = canonicalCollectionSlug ? getIzdeliyaProductsByCollection(canonicalCollectionSlug) : [];

  useAnalyticsView({ type: "detail", entity: "collection", slug: canonicalCollectionSlug ?? resolvedSlug ?? "unknown" });

  if (!collection) {
    return (
      <PageLayout title={`${t.notFoundTitle} — Форма Света`} noIndex suppressCanonical>
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
    <PageLayout title={collection.seo.title} description={collection.seo.description}>
      <div className={`container-brand px-6 pt-6 md:px-12 lg:px-24 ${collectionsRailOffsetClass}`}>
        <Breadcrumbs items={[{ label: t.catalog, href: navPaths.products }, { label: collection.name }]} />
      </div>

      <PageHero eyebrow={t.collection} title={collection.name} subtitle={collection.description} />
      <CollectionsPanel
        title={productsShowcaseSeed.panelTitle}
        items={productsShowcaseSeed.panelItems}
        activeCollection={collection.slug}
      />
      <TrustProofStrip className={collectionsRailOffsetClass} />

      <Section eyebrow={t.identityEyebrow} title={t.identityTitle} className={`!pt-8 md:!pt-10 ${collectionsRailOffsetClass}`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden border border-border bg-gradient-to-br from-secondary/60 via-secondary/30 to-background">
            <div className="flex h-full w-full flex-col justify-end p-8">
              <p className="font-display text-4xl text-foreground md:text-5xl">{collection.name}</p>
              <p className="mt-3 font-body text-xs uppercase tracking-brand-wide text-muted-foreground">
                {collection.tagline}
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">{t.identitySupport}</p>
            <p className="mt-6 font-body text-base leading-relaxed text-foreground">{collection.description}</p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{t.innerSolutions}</p>
              <p className="mt-3 font-display text-2xl leading-snug text-foreground">
                {products.map((item) => item.name).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {collection.status === "in-development" ? (
        <Section title={t.collectionProducts} className={collectionsRailOffsetClass}>
          <div className="border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-2xl text-foreground">{t.inDev}</h2>
            <p className="mt-2 font-body text-muted-foreground">{t.inDevText}</p>
          </div>
        </Section>
      ) : (
        <Section title={t.collectionProducts} className={collectionsRailOffsetClass}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                to={buildPath.collectionProduct(product.collectionSlug, product.slug)}
                className="border border-border bg-background px-5 py-5 transition-colors hover:bg-secondary/30"
              >
                <p className="font-display text-2xl text-foreground">{product.name}</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">{product.tagline}</p>
                <p className="mt-4 inline-flex border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.11em]">
                  {t.openModel}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <div className={collectionsRailOffsetClass}>
        <CTASection
          title={t.ctaTitle}
          subtitle={t.ctaSubtitle}
          primaryCta={{ label: t.discussProject, href: navPaths.requestProject }}
          secondaryCta={{ label: t.viewProjects, href: navPaths.projects }}
        />
      </div>
    </PageLayout>
  );
};

export default CollectionDetailPage;
