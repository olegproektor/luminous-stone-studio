import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ArticleCard from "@/components/ui/article-card";
import { getArticleBySlug, getRelatedArticles, articleCategories } from "@/data/articles";
import { navPaths } from "@/lib/route-helpers";
import { trackEvent } from "@/lib/analytics";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      trackEvent("article_view", { slug: article.slug, category: article.category });
    }
  }, [article]);

  if (!article) {
    return (
      <PageLayout title="Материал не найден — Форма Света" noIndex suppressCanonical>
        <Section>
          <div className="py-20 text-center">
            <h1 className="mb-4 font-display text-3xl text-foreground">Материал не найден</h1>
            <Link to={navPaths.news} className="font-body text-sm text-muted-foreground underline">
              Все материалы
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const related = getRelatedArticles(article);

  const renderContent = (content: string) => {
    if (!content) return null;

    return content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="mb-4 mt-10 font-display text-2xl font-medium text-foreground">
              {line.replace("## ", "")}
            </h2>
          );
        }

        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="mb-3 mt-8 font-display text-xl font-medium text-foreground">
              {line.replace("### ", "")}
            </h3>
          );
        }

        return (
          <p key={index} className="mb-4 font-body text-base leading-relaxed text-muted-foreground">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      });
  };

  return (
    <PageLayout title={article.seo.title} description={article.seo.description}>
      <div className="container-brand px-6 pt-6 md:px-12 lg:px-24">
        <Breadcrumbs items={[{ label: "Новости", href: navPaths.news }, { label: article.title }]} />
      </div>

      <div className="container-brand mt-6 px-6 md:px-12 lg:px-24">
        <div className="aspect-[21/9] overflow-hidden bg-secondary">
          <img src={article.coverImage.src} alt={article.coverImage.alt} className="h-full w-full object-cover" />
        </div>
      </div>

      <Section>
        <article className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-body font-medium uppercase tracking-[0.1em] text-accent">
              {articleCategories[article.category] || article.category}
            </span>
            <span className="text-xs font-body text-muted-foreground">{article.readingTime} мин</span>
            <span className="text-xs font-body text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mb-8 font-display text-3xl font-light leading-tight text-foreground md:text-5xl">{article.title}</h1>

          <div className="prose-ston">
            {article.content ? (
              renderContent(article.content)
            ) : (
              <>
                <p className="mb-4 font-body text-base leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <p className="text-sm italic text-muted-foreground/60">
                  Полный текст будет опубликован после следующей контентной итерации.
                </p>
              </>
            )}
          </div>
        </article>
      </Section>

      {related.length > 0 ? (
        <Section variant="alt" eyebrow="Читайте также">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </Section>
      ) : null}

      <CTASection
        eyebrow="Следующий шаг"
        title="Нужен разбор под ваш объект?"
        subtitle="Если тема совпадает с вашей задачей, переведём материал в конкретный проектный сценарий и подскажем следующий шаг."
        primaryCta={{ label: "Связаться", href: navPaths.contacts }}
        secondaryCta={{ label: "Все материалы", href: navPaths.news }}
        context="news_detail_final"
      />
    </PageLayout>
  );
};

export default BlogPostPage;
