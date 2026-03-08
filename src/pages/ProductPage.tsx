import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import SpecTable from "@/components/ui/spec-table";
import MaterialSwatch from "@/components/ui/material-swatch";
import ProductCard from "@/components/ui/product-card";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

const mountingLabels: Record<string, string> = {
  surface: "Накладной",
  embedded: "Встраиваемый",
};

const powerLabels: Record<string, string> = {
  "220v": "220V",
  "12v": "12V",
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <PageLayout title="Продукт не найден — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Продукт не найден</h1>
            <Link to="/catalog" className="font-body text-sm text-muted-foreground underline">
              Вернуться в каталог
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const related = getRelatedProducts(product);
  const allImages = [...product.images, ...product.environmentImages];
  const priceFrom = Math.min(...product.variants.map((v) => v.price ?? Infinity));
  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.color, v])).values()
  );
  const uniqueMountings = [...new Set(product.variants.map((v) => v.mounting))];
  const uniquePowers = [...new Set(product.variants.map((v) => v.power))];
  const uniqueTextures = [...new Set(product.variants.map((v) => v.texture))];

  return (
    <PageLayout title={product.seo.title} description={product.seo.description}>
      {/* Breadcrumbs */}
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Каталог", href: "/catalog" },
            { label: product.name },
          ]}
        />
      </div>

      {/* Product hero */}
      <section className="section-padding !pt-8">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div>
              <div className="aspect-square bg-secondary overflow-hidden mb-4">
                <img
                  src={allImages[activeImage]?.src || "/placeholder.svg"}
                  alt={allImages[activeImage]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square bg-secondary overflow-hidden border-2 transition-colors ${
                        i === activeImage ? "border-foreground" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-start">
              <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">
                {product.series}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-2">
                {product.name}
              </h1>
              <p className="font-body text-sm text-muted-foreground mb-6">
                {product.tagline}
              </p>

              {priceFrom < Infinity && (
                <p className="font-display text-2xl text-foreground mb-6">
                  от {priceFrom.toLocaleString("ru-RU")} ₽
                </p>
              )}

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color selector */}
              {uniqueColors.length > 1 && (
                <div className="mb-6">
                  <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
                    Цвет
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueColors.map((v) => (
                      <MaterialSwatch
                        key={v.color}
                        color={v.color}
                        colorHex={v.colorHex}
                        active={selectedColor === v.color}
                        onClick={() => setSelectedColor(v.color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Variant info chips */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm font-body">
                {uniqueTextures.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Фактура: </span>
                    <span className="text-foreground font-medium">
                      {uniqueTextures.map((t) => (t === "smooth" ? "Гладкая" : "Текстурная")).join(", ")}
                    </span>
                  </div>
                )}
                {uniqueMountings.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Монтаж: </span>
                    <span className="text-foreground font-medium">
                      {uniqueMountings.map((m) => mountingLabels[m]).join(", ")}
                    </span>
                  </div>
                )}
                {uniquePowers.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Питание: </span>
                    <span className="text-foreground font-medium">
                      {uniquePowers.map((p) => powerLabels[p]).join(", ")}
                    </span>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/request-project"
                  className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3.5 hover:bg-charcoal-light transition-colors"
                >
                  Запросить цену
                </Link>
                <Link
                  to="/contacts"
                  className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-border text-foreground px-8 py-3.5 hover:bg-secondary transition-colors"
                >
                  Консультация
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Features */}
      <Section variant="alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="font-display text-2xl font-medium text-foreground mb-6">
              Характеристики
            </h2>
            <SpecTable specs={product.specs} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-foreground mb-6">
              Особенности
            </h2>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="font-body text-sm text-foreground leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Use cases */}
      {product.useCases.length > 0 && (
        <Section eyebrow="Применение" title="Где используют">
          <div className="flex flex-wrap gap-3">
            {product.useCases.map((uc) => (
              <span
                key={uc}
                className="text-sm font-body font-medium px-5 py-2.5 bg-secondary text-foreground"
              >
                {uc}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <Section
          variant="alt"
          eyebrow="Похожие изделия"
          title="Вам также может подойти"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title="Обсудим ваш проект"
        subtitle="Подберём оптимальное решение под задачи вашего объекта."
        primaryCta={{ label: "Запросить проект", href: "/request-project" }}
        secondaryCta={{ label: "Позвонить", href: "tel:+74951234567" }}
      />
    </PageLayout>
  );
};

export default ProductPage;
