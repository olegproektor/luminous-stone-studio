import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import ProductCard from "@/components/ui/product-card";
import ChipTag from "@/components/ui/chip-tag";
import { products } from "@/data/products";
import type { ProductCategory, TextureType } from "@/types";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

const categoryLabels: Record<string, string> = {
  all: "Все",
  bollard: "Болларды",
  "garden-light": "Садовые",
  "accent-light": "Акцентные",
  "small-form": "Малые формы",
};

const textureLabels: Record<string, string> = {
  all: "Любая",
  smooth: "Гладкая",
  stone: "Текстурная",
};

const heightOptions = ["all", "350", "500", "700"] as const;
const heightLabels: Record<string, string> = {
  all: "Любая",
  "350": "350 мм",
  "500": "500 мм",
  "700": "700 мм",
};

const sortLabels: Record<SortOption, string> = {
  default: "По умолчанию",
  "price-asc": "Цена ↑",
  "price-desc": "Цена ↓",
  name: "По названию",
};

const CatalogPage = () => {
  const [category, setCategory] = useState<string>("all");
  const [texture, setTexture] = useState<string>("all");
  const [height, setHeight] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    if (texture !== "all") {
      result = result.filter((p) =>
        p.variants.some((v) => v.texture === texture)
      );
    }
    if (height !== "all") {
      const h = parseInt(height);
      result = result.filter((p) => p.variants.some((v) => v.height === h));
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => {
          const pa = Math.min(...a.variants.map((v) => v.price ?? Infinity));
          const pb = Math.min(...b.variants.map((v) => v.price ?? Infinity));
          return pa - pb;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const pa = Math.min(...a.variants.map((v) => v.price ?? 0));
          const pb = Math.min(...b.variants.map((v) => v.price ?? 0));
          return pb - pa;
        });
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
        break;
    }

    return result;
  }, [category, texture, height, sort]);

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
        {/* Filters */}
        <div className="space-y-6 mb-10 pb-8 border-b border-border">
          {/* Category */}
          <div>
            <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
              Тип
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <ChipTag
                  key={key}
                  label={label}
                  active={category === key}
                  onClick={() => setCategory(key)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Texture */}
            <div>
              <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
                Фактура
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(textureLabels).map(([key, label]) => (
                  <ChipTag
                    key={key}
                    label={label}
                    active={texture === key}
                    onClick={() => setTexture(key)}
                  />
                ))}
              </div>
            </div>

            {/* Height */}
            <div>
              <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
                Высота
              </p>
              <div className="flex flex-wrap gap-2">
                {heightOptions.map((key) => (
                  <ChipTag
                    key={key}
                    label={heightLabels[key]}
                    active={height === key}
                    onClick={() => setHeight(key)}
                  />
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
                Сортировка
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="font-body text-sm border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="font-body text-sm text-muted-foreground mb-8">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "изделие"
            : filtered.length < 5
              ? "изделия"
              : "изделий"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-foreground/40 mb-4">
              Ничего не найдено
            </p>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Попробуйте изменить фильтры
            </p>
            <button
              onClick={() => {
                setCategory("all");
                setTexture("all");
                setHeight("all");
                setSort("default");
              }}
              className="text-sm font-body font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </Section>

      <CTASection
        eyebrow="Нужна помощь с выбором?"
        title="Подберём решение под ваш объект"
        primaryCta={{ label: "Получить консультацию", href: "/contacts" }}
        secondaryCta={{ label: "Скачать каталог", href: "/for-architects#resources" }}
      />
    </PageLayout>
  );
};

export default CatalogPage;
