import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import ProductHeroModule from "@/components/products/modules/ProductHeroModule";
import ProductTechModule from "@/components/products/modules/ProductTechModule";
import ProductApplicationsModule from "@/components/products/modules/ProductApplicationsModule";
import ProductRelatedModule from "@/components/products/modules/ProductRelatedModule";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { navPaths } from "@/lib/route-helpers";
import { resolveProductCta } from "@/lib/product-cta";
import { getDetailMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <PageLayout title="Продукт не найден — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Продукт не найден</h1>
            <Link to={navPaths.products} className="font-body text-sm text-muted-foreground underline">
              Вернуться в каталог
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const related = getRelatedProducts(product);
  const cta = resolveProductCta({ productSlug: product.slug, audience: "b2c" });
  const meta = getDetailMetadata({ type: "product", value: product });
  useAnalyticsView({ type: "detail", entity: "product", slug: product.slug });

  return (
    <PageLayout title={meta.title} description={meta.description}>
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Каталог", href: navPaths.products },
            { label: product.name },
          ]}
        />
      </div>

      <ProductHeroModule product={product} cta={cta} />
      <TrustProofStrip />
      <ProductTechModule product={product} />
      <ProductApplicationsModule product={product} />
      <ProductRelatedModule products={related} />

      <CTASection
        title="Обсудим ваш проект"
        subtitle="Подберём оптимальное решение под задачи вашего объекта."
        primaryCta={{ label: "Запросить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Позвонить", href: "tel:+74951234567" }}
      />
    </PageLayout>
  );
};

export default ProductPage;
