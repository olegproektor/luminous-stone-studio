import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";
import CTASection from "@/components/layout/CTASection";
import { products } from "@/data/products";

const CatalogPage = () => {
  return (
    <PageLayout
      title="Каталог — STŌN"
      description="Каталог архитектурных уличных светильников из литьевого камня: болларды, садовые светильники, акцентные объекты."
    >
      <PageHero
        eyebrow="Каталог"
        title="Все изделия"
        subtitle="Болларды, садовые светильники и акцентные объекты из литьевого камня и композита."
      />

      <Section>
        {/* Filters placeholder — будет реализован на шаге 2 */}
        <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-border">
          {["Все", "Болларды", "Садовые", "Акцентные"].map((label) => (
            <button
              key={label}
              className="text-sm font-body font-medium px-5 py-2 border border-border text-foreground hover:bg-secondary transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <Grid columns={3}>
          {products.map((product) => (
            <a
              key={product.id}
              href={`/catalog/${product.slug}`}
              className="group block"
            >
              <div className="aspect-square bg-secondary mb-4 overflow-hidden">
                <img
                  src={product.images[0]?.src || "/placeholder.svg"}
                  alt={product.images[0]?.alt || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-body text-muted-foreground mb-1">{product.series}</p>
              <h3 className="font-display text-lg font-medium text-foreground mb-1">
                {product.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{product.tagline}</p>
              {product.variants[0]?.price && (
                <p className="font-body text-sm font-medium text-foreground mt-2">
                  от {product.variants[0].price.toLocaleString("ru-RU")} ₽
                </p>
              )}
            </a>
          ))}
        </Grid>
      </Section>

      <CTASection
        eyebrow="Нужна помощь с выбором?"
        title="Подберём решение под ваш объект"
        primaryCta={{ label: "Получить консультацию", href: "/contacts" }}
      />
    </PageLayout>
  );
};

export default CatalogPage;
