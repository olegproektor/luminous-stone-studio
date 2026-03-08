import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import ProductCard from "@/components/ui/product-card";
import ChipTag from "@/components/ui/chip-tag";
import EmptyState from "@/components/ui/empty-state";
import { products } from "@/data/products";
import type { ProductCategory, TextureType } from "@/types";

type SortOption = "default" | "price-asc" | "price-desc" | "name";
type EntryMode = "all" | "collection" | "task";

/* ── Entry 1: By collection ── */
const collections = [
  { key: "bollard", label: "Болларды", icon: "▮", desc: "Вертикальные световые столбики для дорожек и зон" },
  { key: "accent-light", label: "Акцентные светильники", icon: "◈", desc: "Точечный свет для архитектурных деталей" },
  { key: "small-form", label: "Малые формы", icon: "◻", desc: "Компактные светильники для террас и зон отдыха" },
  { key: "light-object", label: "Световые объекты", icon: "◇", desc: "Декоративные световые элементы ландшафта" },
  { key: "custom", label: "Специальные решения", icon: "⚙", desc: "Индивидуальные изделия под проект" },
];

/* ── Entry 2: By task ── */
const tasks = [
  { key: "pathways", label: "Для дорожек", icon: "🛤", useCases: ["Дорожки", "Аллеи", "Пешеходные зоны"] },
  { key: "terrace", label: "Для террасы", icon: "🏡", useCases: ["Террасы", "Патио", "Зоны отдыха"] },
  { key: "entrance", label: "Для входной группы", icon: "🚪", useCases: ["Входные группы", "Подъезды", "Парадные"] },
  { key: "glamping", label: "Для глэмпинга", icon: "⛺", useCases: ["Глэмпинг", "Кемпинг", "Эко-отели"] },
  { key: "hotel", label: "Для отеля", icon: "🏨", useCases: ["Отели", "Рестораны", "SPA"] },
  { key: "private", label: "Для частного участка", icon: "🏠", useCases: ["Частные дома", "Загородные участки", "Дачи"] },
  { key: "public", label: "Для общественных пространств", icon: "🏛", useCases: ["Парки", "Скверы", "Общественные пространства", "Набережные"] },
];

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
  const [entryMode, setEntryMode] = useState<EntryMode>("all");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const [category, setCategory] = useState<string>("all");
  const [texture, setTexture] = useState<string>("all");
  const [height, setHeight] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const handleCollectionSelect = (key: string) => {
    setSelectedCollection(key);
    setEntryMode("collection");
    // Map collection to category filter
    if (key === "light-object") {
      setCategory("accent-light");
    } else if (key === "custom") {
      setCategory("all"); // show all for custom
    } else {
      setCategory(key);
    }
  };

  const handleTaskSelect = (key: string) => {
    setSelectedTask(key);
    setEntryMode("task");
  };

  const resetEntry = () => {
    setEntryMode("all");
    setSelectedCollection(null);
    setSelectedTask(null);
    setCategory("all");
    setTexture("all");
    setHeight("all");
    setSort("default");
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Task-based filtering (by useCases)
    if (entryMode === "task" && selectedTask) {
      const task = tasks.find((t) => t.key === selectedTask);
      if (task) {
        result = result.filter((p) =>
          p.useCases.some((uc) =>
            task.useCases.some((tuc) => uc.toLowerCase().includes(tuc.toLowerCase()))
          )
        );
      }
    }

    // Category filter (for collection mode or manual filter)
    if (entryMode !== "task" && category !== "all") {
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
  }, [category, texture, height, sort, entryMode, selectedCollection, selectedTask]);

  const activeLabel = entryMode === "collection"
    ? collections.find((c) => c.key === selectedCollection)?.label
    : entryMode === "task"
      ? tasks.find((t) => t.key === selectedTask)?.label
      : null;

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

      {/* ── Entry modes ── */}
      {entryMode === "all" && (
        <>
          {/* By Collection */}
          <Section title="По коллекциям">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {collections.map((col) => (
                <button
                  key={col.key}
                  onClick={() => handleCollectionSelect(col.key)}
                  className="group text-left p-6 bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <span className="text-2xl block mb-3">{col.icon}</span>
                  <h3 className="font-display text-base font-medium mb-1">{col.label}</h3>
                  <p className="font-body text-xs text-muted-foreground group-hover:text-primary-foreground/70 leading-relaxed">
                    {col.desc}
                  </p>
                </button>
              ))}
            </div>
          </Section>

          {/* By Task */}
          <Section variant="alt" eyebrow="Вход 2" title="По задаче">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tasks.map((task) => (
                <button
                  key={task.key}
                  onClick={() => handleTaskSelect(task.key)}
                  className="group text-left p-5 bg-background border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <span className="text-xl block mb-2">{task.icon}</span>
                  <h3 className="font-body text-sm font-medium">{task.label}</h3>
                </button>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Active filter badge + product grid ── */}
      <Section>
        {/* Active entry mode indicator */}
        {entryMode !== "all" && (
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <span className="font-body text-sm text-muted-foreground">Выбрано:</span>
            <span className="font-body text-sm font-medium text-foreground bg-secondary px-4 py-1.5">
              {activeLabel}
            </span>
            <button
              onClick={resetEntry}
              className="font-body text-sm text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground transition-colors"
            >
              Сбросить
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="space-y-6 mb-10 pb-8 border-b border-border">
          {/* Category (hidden in task mode) */}
          {entryMode !== "task" && (
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
          )}

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
          <EmptyState
            title="Ничего не найдено"
            description="Попробуйте изменить фильтры или выбрать другую категорию."
            action={{ label: "Сбросить всё", href: "#" }}
          />
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
