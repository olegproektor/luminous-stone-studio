import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ArticleCard from "@/components/ui/article-card";
import { getArticleBySlug, getRelatedArticles, articleCategories } from "@/data/articles";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <PageLayout title="Статья не найдена — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Статья не найдена</h1>
            <Link to="/blog" className="font-body text-sm text-muted-foreground underline">
              Все статьи
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const related = getRelatedArticles(article);

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    if (!content) return null;
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="font-display text-2xl font-medium text-foreground mt-10 mb-4"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            className="font-display text-xl font-medium text-foreground mt-8 mb-3"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- **")) {
        // Bold list item
        const match = trimmed.match(/^- \*\*(.+?)\*\*\s*[—–-]\s*(.+)$/);
        if (match) {
          elements.push(
            <li key={i} className="flex items-start gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">{match[1]}</strong>
                <span className="text-muted-foreground"> — {match[2]}</span>
              </span>
            </li>
          );
        } else {
          elements.push(
            <p key={i} className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              {trimmed}
            </p>
          );
        }
      } else if (trimmed.startsWith("**")) {
        // Bold paragraph
        const text = trimmed.replace(/\*\*/g, "");
        elements.push(
          <p key={i} className="font-body text-base text-foreground font-medium leading-relaxed mb-4">
            {text}
          </p>
        );
      } else {
        elements.push(
          <p key={i} className="font-body text-base text-muted-foreground leading-relaxed mb-4">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <PageLayout title={article.seo.title} description={article.seo.description}>
      {/* Breadcrumbs */}
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Журнал", href: "/blog" },
            { label: article.title },
          ]}
        />
      </div>

      {/* Cover */}
      <div className="container-brand px-6 md:px-12 lg:px-24 mt-6">
        <div className="aspect-[21/9] bg-secondary overflow-hidden">
          <img
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Section>
        <article className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-body font-medium tracking-[0.1em] uppercase text-accent">
              {articleCategories[article.category] || article.category}
            </span>
            <span className="text-xs font-body text-muted-foreground">
              {article.readingTime} мин
            </span>
            <span className="text-xs font-body text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="prose-ston">
            {article.content ? (
              renderContent(article.content)
            ) : (
              <>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <p className="text-sm italic text-muted-foreground/60">
                  Полный текст статьи будет доступен после подключения CMS.
                </p>
              </>
            )}
          </div>
        </article>
      </Section>

      {/* Related articles */}
      {related.length > 0 && (
        <Section variant="alt" eyebrow="Читайте также">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title="Нужна консультация?"
        primaryCta={{ label: "Связаться", href: "/contacts" }}
        secondaryCta={{ label: "Все статьи", href: "/blog" }}
      />
    </PageLayout>
  );
};

export default BlogPostPage;
