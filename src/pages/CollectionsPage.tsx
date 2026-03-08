import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";
import CTASection from "@/components/layout/CTASection";
import { collections } from "@/data/collections";

const CollectionsPage = () => {
  return (
    <PageLayout
      title="Коллекции — STŌN"
      description="Коллекции архитектурных уличных светильников из литьевого камня и композита. Болларды, садовые светильники, акцентные объекты."
    >
      <PageHero
        eyebrow="Коллекции"
        title="Наши коллекции"
        subtitle="Каждая коллекция — это законченная световая система для определённого типа пространства."
      />

      <Section>
        <Grid columns={3}>
          {collections.map((col) => (
            <a
              key={col.id}
              href={`/catalog?collection=${col.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-secondary mb-4 overflow-hidden">
                <img
                  src={col.coverImage.src}
                  alt={col.coverImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-1">
                {col.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{col.tagline}</p>
            </a>
          ))}
        </Grid>
      </Section>

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
