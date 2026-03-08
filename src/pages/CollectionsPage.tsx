import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import CollectionCard from "@/components/ui/collection-card";
import ProductCard from "@/components/ui/product-card";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

const CollectionsPage = () => {
  return (
    <PageLayout
      title="Коллекции — STŌN"
      description="Коллекции архитектурных уличных светильников из литьевого камня и композита."
    >
      <PageHero
        eyebrow="Коллекции"
        title="Наши коллекции"
        subtitle="Каждая коллекция — это законченная световая система для определённого типа пространства."
      />

      {collections.map((col) => {
        const colProducts = products.filter((p) =>
          col.productIds.includes(p.id)
        );
        return (
          <Section key={col.id} variant={collections.indexOf(col) % 2 === 0 ? "default" : "alt"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-10">
              <div>
                <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
                  Коллекция
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">
                  {col.name}
                </h2>
                <p className="font-body text-lg text-accent mb-4">{col.tagline}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md">
                  {col.description}
                </p>
              </div>
              <div className="aspect-[4/3] bg-secondary overflow-hidden">
                <img
                  src={col.coverImage.src}
                  alt={col.coverImage.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {colProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {colProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </Section>
        );
      })}

      <CTASection
        eyebrow="Не нашли подходящее?"
        title="Обсудим ваш проект"
        subtitle="Мы проектируем кастомные решения под задачи любого масштаба."
        primaryCta={{ label: "Запросить проект", href: "/request-project" }}
        secondaryCta={{ label: "Смотреть каталог", href: "/catalog" }}
      />
    </PageLayout>
  );
};

export default CollectionsPage;
