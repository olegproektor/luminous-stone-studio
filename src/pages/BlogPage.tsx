import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import ArticleCard from "@/components/ui/article-card";
import ChipTag from "@/components/ui/chip-tag";
import { articles, articleCategories } from "@/data/articles";

const BlogPage = () => {
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? articles
      : articles.filter((a) => a.category === category);

  // Only show categories that have articles
  const activeCats = [...new Set(articles.map((a) => a.category))];

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
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-border">
          <ChipTag
            label="Все"
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {activeCats.map((cat) => (
            <ChipTag
              key={cat}
              label={articleCategories[cat] || cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-foreground/40">
              Статей в этой рубрике пока нет
            </p>
          </div>
        )}
      </Section>

      <CTASection
        title="Нужна консультация?"
        subtitle="Поможем подобрать решение для вашего объекта."
        primaryCta={{ label: "Связаться", href: "/contacts" }}
      />
    </PageLayout>
  );
};

export default BlogPage;
