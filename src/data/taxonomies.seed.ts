import type { TaxonomyBucket } from "@/types/taxonomy";

export const productTaxonomies: TaxonomyBucket[] = [
  {
    kind: "category",
    options: [
      { slug: "all", label: "Все" },
      { slug: "bollard", label: "Болларды" },
      { slug: "garden-light", label: "Садовый свет" },
      { slug: "accent-light", label: "Акцентный свет" },
      { slug: "small-form", label: "Малые формы" },
      { slug: "custom", label: "Кастом" },
    ],
  },
  {
    kind: "application",
    options: [
      { slug: "all", label: "Любая задача" },
      { slug: "pathways", label: "Дорожки" },
      { slug: "terrace", label: "Террасы" },
      { slug: "entrance", label: "Входные группы" },
      { slug: "glamping", label: "Глэмпинг / отели" },
      { slug: "public-space", label: "Общественные пространства" },
    ],
  },
  {
    kind: "material",
    options: [
      { slug: "all", label: "Любой материал" },
      { slug: "cast-stone", label: "Литьевой камень" },
      { slug: "natural-stone", label: "Натуральный камень" },
      { slug: "composite", label: "Композит" },
    ],
  },
  {
    kind: "ip",
    options: [
      { slug: "all", label: "Любой IP" },
      { slug: "ip65", label: "IP65+" },
      { slug: "ip67", label: "IP67+" },
    ],
  },
  {
    kind: "price-band",
    options: [
      { slug: "all", label: "Любая цена" },
      { slug: "entry", label: "До 15 000 ₽" },
      { slug: "mid", label: "15 000–20 000 ₽" },
      { slug: "premium", label: "20 000+ ₽" },
      { slug: "request", label: "По запросу" },
    ],
  },
];

export function getTaxonomyOptions(kind: TaxonomyBucket["kind"]) {
  return productTaxonomies.find((bucket) => bucket.kind === kind)?.options ?? [];
}
