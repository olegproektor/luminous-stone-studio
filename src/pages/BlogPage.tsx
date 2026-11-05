import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import ArticleCard from "@/components/ui/article-card";
import ChipTag from "@/components/ui/chip-tag";
import { articles, articleCategories } from "@/data/articles";
import { navPaths } from "@/lib/route-helpers";
import { trackEvent } from "@/lib/analytics";

const BlogPage = () => {
  const [category, setCategory] = useState("all");

  const filtered = category === "all" ? articles : articles.filter((article) => article.category === category);
  const activeCategories = [...new Set(articles.map((article) => article.category))];

  return (
    <PageLayout
      title="Новости и материалы — Форма Света"
      description="Материалы о проектном освещении, работе с фактурой, сценариях применения и подготовке световых решений для частных и объектных пространств."
    >
      <PageHero
        eyebrow="Новости"
        title="Материалы о свете, фактуре и проектной логике"
        subtitle="Здесь собираем не потоковый блог, а прикладовые материалы: как решение работает в пространстве, что важно в проектном сценарии и какие нюансы влияют на выбор."
      />

      <Section>
        <div className="mb-10 border-b border-border pb-8">
          <div className="mb-4 max-w-3xl">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Раздел помогает архитектурным и проектным командам быстрее собрать контекст до личного обсуждения: сценарий, материал, тип пространства и следующий шаг по объекту.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ChipTag label="Все" active={category === "all"} onClick={() => setCategory("all")} />
            {activeCategories.map((item) => (
              <ChipTag
                key={item}
                label={articleCategories[item] || item}
                active={category === item}
                onClick={() => {
                  setCategory(item);
                  trackEvent("cta_click", { context: "news_filter", target: item });
                }}
              />
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-foreground/40">В этой рубрике материалы появятся чуть позже</p>
          </div>
        )}
      </Section>

      <CTASection
        eyebrow="Следующий шаг"
        title="Нужен разбор под ваш объект?"
        subtitle="Если материал близок по задаче, переведём его в конкретный сценарий для проекта и подскажем, какие коллекции и материалы посмотреть дальше."
        primaryCta={{ label: "Связаться", href: navPaths.contacts }}
        secondaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
        context="news_index_final"
      />
    </PageLayout>
  );
};

export default BlogPage;
