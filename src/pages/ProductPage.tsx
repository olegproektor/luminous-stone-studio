import { Link, Navigate, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { getIzdeliyaProductBySlug } from "@/data/izdeliya-architecture.seed";
import { buildPath, navPaths } from "@/lib/route-helpers";

const LegacyProductFallback = ({ productName }: { productName?: string }) => (
  <>
    <Section>
      <div className="mx-auto max-w-3xl border border-border bg-secondary/30 px-6 py-14 text-center md:px-10">
        <p className="font-body text-xs uppercase tracking-brand-wide text-muted-foreground">Маршрут-алиас</p>
        <h1 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
          Изделие доступно в основном каталоге
        </h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
          {productName
            ? `Решение ${productName} ведётся через canonical-раздел «Изделия».`
            : "Старый маршрут product detail больше не используется как самостоятельная публичная страница."}{" "}
          Перейдите в основной каталог, чтобы открыть актуальные коллекции и решения.
        </p>
      </div>
    </Section>

    <CTASection
      title="Продолжить в каталоге"
      subtitle="Все актуальные решения и коллекции теперь собраны внутри canonical-раздела «Изделия»."
      primaryCta={{ label: "Открыть каталог", href: navPaths.products }}
      secondaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
    />
  </>
);

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const canonicalProduct = slug ? getIzdeliyaProductBySlug(slug) : undefined;

  if (canonicalProduct) {
    return <Navigate to={buildPath.collectionProduct(canonicalProduct.collectionSlug, canonicalProduct.slug)} replace />;
  }

  return (
    <PageLayout
      title="Изделие доступно в каталоге — Форма Света"
      description="Старый маршрут товара переведён в alias-режим. Актуальный каталог доступен в разделе «Изделия»."
      noIndex
      suppressCanonical
    >
      <Section>
        <div className="pt-10 text-center">
          <Link to={navPaths.products} className="font-body text-sm text-muted-foreground underline">
            Вернуться в каталог
          </Link>
        </div>
      </Section>
      <LegacyProductFallback productName={slug} />
    </PageLayout>
  );
};

export default ProductPage;
