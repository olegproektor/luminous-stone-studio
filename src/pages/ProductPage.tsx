import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { getProductBySlug, getRelatedProducts } from "@/data/products";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <PageLayout title="Продукт не найден — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Продукт не найден</h1>
            <a href="/catalog" className="font-body text-sm text-muted-foreground underline">
              Вернуться в каталог
            </a>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const related = getRelatedProducts(product);

  return (
    <PageLayout title={product.seo.title} description={product.seo.description}>
      {/* Product hero */}
      <section className="section-padding">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="aspect-square bg-secondary flex items-center justify-center">
              <img
                src={product.images[0]?.src || "/placeholder.svg"}
                alt={product.images[0]?.alt || product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-body text-muted-foreground mb-2">{product.series}</p>
              <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-2">
                {product.name}
              </h1>
              <p className="font-body text-sm text-muted-foreground mb-6">{product.tagline}</p>

              {product.variants[0]?.price && (
                <p className="font-display text-2xl text-foreground mb-6">
                  от {product.variants[0].price.toLocaleString("ru-RU")} ₽
                </p>
              )}

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs */}
              <div className="border-t border-border pt-6 space-y-3">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="text-foreground font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href="/request-project"
                  className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3.5 hover:bg-charcoal-light transition-colors"
                >
                  Запросить цену
                </a>
                <a
                  href="/contacts"
                  className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-border text-foreground px-8 py-3.5 hover:bg-secondary transition-colors"
                >
                  Консультация
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <Section eyebrow="Похожие изделия" title="Вам также может подойти" variant="alt">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <a key={p.id} href={`/catalog/${p.slug}`} className="group block">
                <div className="aspect-square bg-background mb-4 overflow-hidden">
                  <img
                    src={p.images[0]?.src || "/placeholder.svg"}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground">{p.name}</h3>
                <p className="font-body text-sm text-muted-foreground">{p.tagline}</p>
              </a>
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
