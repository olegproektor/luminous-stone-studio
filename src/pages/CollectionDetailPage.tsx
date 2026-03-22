import { Link, useLocation, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { getCollectionBySlug } from "@/data/collections";
import { products } from "@/data/products";
import { buildPath, navPaths } from "@/lib/route-helpers";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import CollectionHeroModule from "@/components/collections/modules/CollectionHeroModule";
import CollectionProductsModule from "@/components/collections/modules/CollectionProductsModule";
import { getDetailMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { resolveCanonicalCollectionSlug, resolveCollectionDataSlug } from "@/config/routes";
import { getIzdeliyaCollectionBySlug, getIzdeliyaProductsByCollection } from "@/data/izdeliya-architecture.seed";

const t = {
  products: "\u0418\u0437\u0434\u0435\u043b\u0438\u044f",
  collection: "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f",
  notFoundTitle: "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430",
  backToProducts: "\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0438\u0437\u0434\u0435\u043b\u0438\u044f\u043c",
  trustGalleryEyebrow: "\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u0432 \u044d\u043a\u0441\u0442\u0435\u0440\u044c\u0435\u0440\u0435",
  trustGalleryTitle: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u043f\u043b\u0438\u0442\u043a\u0438 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438",
  inDev: "\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435",
  inDevText:
    "\u041f\u0443\u0431\u043b\u0438\u043a\u0443\u0435\u043c \u0444\u0438\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u043c\u043e\u0434\u0435\u043b\u0438 \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0435\u043a\u0442\u043d\u043e\u0439 \u0432\u0430\u043b\u0438\u0434\u0430\u0446\u0438\u0438.",
  collectionProducts: "\u0418\u0437\u0434\u0435\u043b\u0438\u044f \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438",
  openModel: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u043e\u0434\u0435\u043b\u044c",
  modelInProgress: "\u041c\u043e\u0434\u0435\u043b\u044c \u0432 \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0435",
  modelInProgressText: "\u041f\u0443\u0431\u043b\u0438\u043a\u0443\u0435\u043c \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u043f\u043e \u043c\u0435\u0440\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0435\u043a\u0442\u043d\u043e\u0439 \u0432\u0430\u043b\u0438\u0434\u0430\u0446\u0438\u0438.",
  ctaTitle: "\u041f\u043e\u0434\u0431\u0435\u0440\u0451\u043c \u0440\u0435\u0448\u0435\u043d\u0438\u0435 \u043f\u043e\u0434 \u0432\u0430\u0448 \u043e\u0431\u044a\u0435\u043a\u0442",
  ctaSubtitle:
    "\u0421\u043e\u043f\u043e\u0441\u0442\u0430\u0432\u0438\u043c \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e, \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0439 \u0441\u0432\u0435\u0442\u0430 \u0438 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b \u0432 \u0440\u0430\u043c\u043a\u0430\u0445 \u0432\u0430\u0448\u0435\u0433\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430.",
  discussProject: "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442",
  allProducts: "\u0412\u0441\u0435 \u0438\u0437\u0434\u0435\u043b\u0438\u044f",
};

const CollectionDetailPage = () => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const pathnameSlug = location.pathname.startsWith("/izdeliya/") ? location.pathname.split("/")[2] : undefined;
  const resolvedSlug = pathnameSlug ?? slug;
  const canonicalCollectionSlug = resolvedSlug ? resolveCanonicalCollectionSlug(resolvedSlug) : undefined;

  const iaCollection = canonicalCollectionSlug ? getIzdeliyaCollectionBySlug(canonicalCollectionSlug) : undefined;
  const iaProducts = canonicalCollectionSlug ? getIzdeliyaProductsByCollection(canonicalCollectionSlug) : [];

  useAnalyticsView({ type: "detail", entity: "collection", slug: canonicalCollectionSlug ?? resolvedSlug ?? "unknown" });

  if (iaCollection) {
    return (
      <PageLayout title={iaCollection.seo.title} description={iaCollection.seo.description}>
        <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
          <Breadcrumbs items={[{ label: t.products, href: navPaths.products }, { label: iaCollection.name }]} />
        </div>

        <PageHero eyebrow={t.collection} title={iaCollection.name} subtitle={iaCollection.description} />
        <TrustProofStrip />

        <Section eyebrow={t.trustGalleryEyebrow} title={t.trustGalleryTitle} className="!pt-8 md:!pt-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(iaProducts.length > 0 ? iaProducts : [null, null]).map((product, index) => {
              const tile = (
                <div className="group h-full border border-border bg-secondary/20 transition-colors hover:bg-secondary/35">
                  <div className="aspect-[5/4] bg-gradient-to-br from-secondary/40 via-secondary to-secondary/20" />
                  <div className="p-4">
                    <p className="font-display text-xl text-foreground">{product?.name ?? t.modelInProgress}</p>
                    <p className="mt-2 font-body text-sm text-muted-foreground line-clamp-3">
                      {product?.summary ?? t.modelInProgressText}
                    </p>
                  </div>
                </div>
              );

              if (!product) return <div key={`placeholder-${index}`}>{tile}</div>;

              return (
                <Link key={product.slug} to={buildPath.collectionProduct(product.collectionSlug, product.slug)} className="block">
                  {tile}
                </Link>
              );
            })}
          </div>
        </Section>

        {iaCollection.status === "in-development" ? (
          <Section title={t.collectionProducts}>
            <div className="border border-border bg-secondary/40 p-6">
              <h2 className="font-display text-2xl text-foreground">{t.inDev}</h2>
              <p className="font-body text-muted-foreground mt-2">{t.inDevText}</p>
            </div>
          </Section>
        ) : (
          <Section title={t.collectionProducts}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {iaProducts.map((product) => (
                <Link
                  key={product.slug}
                  to={buildPath.collectionProduct(product.collectionSlug, product.slug)}
                  className="border border-border bg-background px-5 py-5 transition-colors hover:bg-secondary/30"
                >
                  <p className="font-display text-2xl text-foreground">{product.name}</p>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{product.tagline}</p>
                  <p className="mt-4 inline-flex border border-border/70 px-3 py-1 text-[11px] tracking-[0.11em] uppercase">{t.openModel}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <CTASection
          title={t.ctaTitle}
          subtitle={t.ctaSubtitle}
          primaryCta={{ label: t.discussProject, href: navPaths.requestProject }}
          secondaryCta={{ label: t.allProducts, href: navPaths.products }}
        />
      </PageLayout>
    );
  }

  const dataSlug = resolvedSlug ? resolveCollectionDataSlug(resolvedSlug) ?? resolvedSlug : undefined;
  const collection = dataSlug ? getCollectionBySlug(dataSlug) : undefined;

  if (!collection) {
    return (
      <PageLayout title={`${t.notFoundTitle} - КАМЕНЬ И СВЕТ`}>
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">{t.notFoundTitle}</h1>
            <Link to={navPaths.products} className="font-body text-sm text-muted-foreground underline">
              {t.backToProducts}
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const collectionProducts = products.filter((product) => collection.productIds.includes(product.id) && !product.isHidden);
  const galleryItems = collectionProducts
    .map((product) => ({ product, image: product.environmentImages[0] ?? product.images[0] }))
    .filter((item) => item.image)
    .slice(0, 4);

  const meta = getDetailMetadata({ type: "collection", value: collection });

  return (
    <PageLayout title={meta.title} description={meta.description}>
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs items={[{ label: t.products, href: navPaths.products }, { label: collection.name }]} />
      </div>

      <CollectionHeroModule collection={collection} />
      <TrustProofStrip />

      <Section eyebrow={t.trustGalleryEyebrow} title={t.trustGalleryTitle} className="!pt-8 md:!pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {galleryItems.map(({ product, image }) => (
            <Link key={product.id} to={buildPath.product(product.slug)} className="group block">
              <div className="h-full border border-border bg-secondary/20 transition-colors hover:bg-secondary/35">
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="font-display text-xl text-foreground">{product.name}</p>
                  <p className="mt-2 line-clamp-2 font-body text-sm text-muted-foreground">{product.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CollectionProductsModule products={collectionProducts} />

      <CTASection
        title={t.ctaTitle}
        subtitle={t.ctaSubtitle}
        primaryCta={{ label: t.discussProject, href: navPaths.requestProject }}
        secondaryCta={{ label: t.allProducts, href: navPaths.products }}
      />
    </PageLayout>
  );
};

export default CollectionDetailPage;