import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { getArticleBySlug } from "@/data/articles";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <PageLayout title="Статья не найдена — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Статья не найдена</h1>
            <a href="/blog" className="font-body text-sm text-muted-foreground underline">
              Все статьи
            </a>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={article.seo.title} description={article.seo.description}>
      {/* Cover */}
      <div className="aspect-[21/9] bg-secondary">
        <img
          src={article.coverImage.src}
          alt={article.coverImage.alt}
          className="w-full h-full object-cover"
        />
      </div>

      <Section>
        <article className="max-w-3xl">
          <p className="text-xs font-body text-muted-foreground mb-4">
            {article.readingTime} мин · {new Date(article.publishedAt).toLocaleDateString("ru-RU")} · {article.author}
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-8">
            {article.title}
          </h1>
          <div className="font-body text-base text-muted-foreground leading-relaxed space-y-6">
            <p>{article.excerpt}</p>
            <p className="text-sm italic text-muted-foreground/60">
              Полный текст статьи будет доступен после подключения CMS.
            </p>
          </div>
        </article>
      </Section>

      <CTASection
        title="Нужна консультация?"
        primaryCta={{ label: "Связаться", href: "/contacts" }}
        secondaryCta={{ label: "Все статьи", href: "/blog" }}
      />
    </PageLayout>
  );
};

export default BlogPostPage;
