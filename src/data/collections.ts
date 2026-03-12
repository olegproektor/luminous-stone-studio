import type { Collection } from "@/types";

const legacyCollections: Collection[] = [
  {
    id: "c1",
    slug: "ston-classic",
    name: "STŌN Classic",
    tagline: "Гладкая форма, чистый свет",
    description:
      "Базовая коллекция боллардов с гладкой поверхностью из литьевого камня. Минималистичные формы, вертикальная световая щель, два цвета и две высоты. Основа архитектурного ландшафтного освещения.",
    coverImage: { src: "/placeholder.svg", alt: "Коллекция STŌN Classic" },
    productIds: ["p1", "p2"],
    seo: {
      title: "Коллекция STŌN Classic — Гладкие болларды из литьевого камня",
      description:
        "Болларды STŌN Classic с гладкой поверхностью. Высота 500 и 700 мм, два цвета. Для архитектурного ландшафтного освещения.",
    },
  },
  {
    id: "c2",
    slug: "ston-texture",
    name: "STŌN Texture",
    tagline: "Природная фактура камня",
    description:
      "Коллекция с текстурной поверхностью, имитирующей натуральный камень. Для проектов, где важна связь архитектуры с природным окружением.",
    coverImage: { src: "/placeholder.svg", alt: "Коллекция STŌN Texture" },
    productIds: ["p3", "p4"],
    seo: {
      title: "Коллекция STŌN Texture — Текстурные болларды из камня",
      description:
        "Болларды STŌN Texture с текстурой натурального камня. Для проектов с природным окружением.",
    },
  },
  {
    id: "c3",
    slug: "lira-garden",
    name: "LIRA & FORMA",
    tagline: "Свет для сада и акцентов",
    description:
      "Садовые светильники и акцентные световые объекты. Мягкий рассеянный свет для зон отдыха и выразительные формы для ландшафтных композиций.",
    coverImage: { src: "/placeholder.svg", alt: "Коллекция LIRA & FORMA" },
    productIds: ["p5", "p6"],
    seo: {
      title: "Коллекция LIRA & FORMA — Садовые и акцентные светильники",
      description:
        "Садовые светильники LIRA и акцентные объекты FORMA из литьевого камня и композита.",
    },
  },
];

const launchCollections: Collection[] = [
  {
    id: "lc1",
    slug: "bollards-core",
    name: "Bollards Core",
    tagline: "Стартовая линейка боллардов для частных и коммерческих объектов",
    description:
      "Фокусная коллекция первого релиза: 400 / 600 Cast / 600 Natural / 800. Единая световая логика, совместимые сценарии применения, прозрачная ценовая структура.",
    coverImage: { src: "/placeholder.svg", alt: "Коллекция Bollards Core" },
    productIds: ["lp1", "lp2", "lp3", "lp4"],
    seo: {
      title: "Bollards Core — стартовая коллекция STŌN",
      description: "Стартовая коллекция боллардов STŌN: 400, 600 (cast/natural), 800.",
    },
    launchTier: "primary",
  },
];

export const collections: Collection[] = [
  ...launchCollections,
  ...legacyCollections.map((item) => ({
    ...item,
    launchTier: "secondary" as const,
    isHidden: true,
  })),
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
