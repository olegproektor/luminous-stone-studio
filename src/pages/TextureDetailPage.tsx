import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import TextureDetailModule from "@/components/materials/modules/TextureDetailModule";
import { materialsTextureSeed } from "@/data/materials-texture.seed";
import { navPaths } from "@/lib/route-helpers";

const TextureDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const texture = materialsTextureSeed.find((item) => item.slug === slug);

  if (!texture) {
    return (
      <PageLayout title="Текстура не найдена — STON">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl mb-4">Текстура не найдена</h1>
            <Link to={navPaths.materials} className="font-body text-sm underline text-muted-foreground">
              Вернуться к материалам
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={texture.seo.title} description={texture.seo.description}>
      <PageHero eyebrow="Texture" title={texture.name} subtitle={texture.shortDescription} />
      <TextureDetailModule texture={texture} />
      <CTASection
        title="Нужна консультация по материалам?"
        subtitle="Подберем фактуру и решение под ваш проект."
        primaryCta={{ label: "Связаться", href: navPaths.contacts }}
      />
    </PageLayout>
  );
};

export default TextureDetailPage;
