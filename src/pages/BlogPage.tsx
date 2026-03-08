import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";
import CTASection from "@/components/layout/CTASection";
import { articles } from "@/data/articles";

const BlogPage = () => {
  return (
    <PageLayout
      title="Журнал — STŌN"
      description="Статьи о ландшафтном освещении, боллардах, литьевом камне, монтаже и сценариях уличного света."
    >
      <PageHero
        eyebrow="Журнал"
        title="Статьи и материалы"
        subtitle="Полезное о ландшафтном освещении, материалах и проектных решениях."
      />

      <Section>
        <Grid columns={2}>
          {articles.map((article) => (
            <a
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group block"
            >
              <div className="aspect-[16/9] bg-secondary mb-4 overflow-hidden">
                <img
                  src={article.coverImage.src}
                  alt={article.coverImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-body text-muted-foreground mb-2">
                {article.readingTime} мин · {new Date(article.publishedAt).toLocaleDateString("ru-RU")}
              </p>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">
                {article.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </a>
          ))}
        </Grid>
      </Section>

      <CTASection
        title="Получайте полезные материалы"
        subtitle="Подпишитесь на рассылку — делимся опытом в ландшафтном освещении."
        primaryCta={{ label: "Подписаться", href: "/contacts" }}
      />
    </PageLayout>
  );
};

export default BlogPage;
