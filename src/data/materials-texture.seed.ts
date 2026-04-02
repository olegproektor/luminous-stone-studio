import type { MaterialFamily, MaterialFamilySlug, MaterialFinish } from "@/types/materials";

const baseFinishes: MaterialFinish[] = [
  {
    key: "smooth",
    name: "Гладкий",
    description: "Спокойная поверхность для чистой архитектурной геометрии и сдержанного отражения света.",
    applicableTo: ["natural-stone", "composite"],
  },
  {
    key: "textured",
    name: "Текстурный",
    description: "Более выраженный рельеф, который усиливает тактильность и связь материала с ландшафтом.",
    applicableTo: ["natural-stone", "composite"],
  },
  {
    key: "matte",
    name: "Матовый",
    description: "Мягко работает в пространстве и уменьшает лишние блики на поверхности материала.",
    applicableTo: ["natural-stone", "composite", "special-materials"],
  },
  {
    key: "polished",
    name: "Полированный",
    description: "Даёт более плотную, выразительную поверхность для акцентных и декоративных решений.",
    applicableTo: ["natural-stone", "composite", "special-materials"],
  },
];

export const materialsTextureSeed: MaterialFamily[] = [
  {
    id: "mat-natural-stone",
    slug: "natural-stone",
    name: "Натуральный камень",
    tagline: "Природная глубина и живая фактура.",
    summary:
      "Натуральный камень даёт индивидуальный рисунок материала и помогает встроить световое решение в ландшафт без ощущения искусственности.",
    properties: [
      "Несколько вариантов текстуры и природного рисунка",
      "Тактильная глубина и живая поверхность",
      "Подходит для частных и статусных общественных пространств",
    ],
    recommendedUseCases: ["Частные участки", "Бутик-отели", "Премиальные входные группы"],
    availableFinishes: baseFinishes.filter((item) => item.applicableTo.includes("natural-stone")),
    specialVariants: [],
    customAvailable: true,
    legacySlugs: ["stone", "sand"],
    heroImage: {
      src: "/images/textures/stone.jpg",
      alt: "Натуральный камень для световых решений Форма Света",
    },
    seo: {
      title: "Натуральный камень — Форма Света",
      description: "Натуральный камень для архитектурных световых решений: текстуры, финиши и применение в проекте.",
    },
  },
  {
    id: "mat-composite",
    slug: "composite",
    name: "Композит",
    tagline: "Управляемая фактура для проектной задачи.",
    summary:
      "Композит позволяет точнее контролировать геометрию, повторяемость и итоговую поверхность, сохраняя выразительность камня в архитектурной подаче.",
    properties: [
      "Стабильная геометрия и повторяемость в серии",
      "Несколько текстур и вариантов поверхности",
      "Подходит для объектов, где важны точность и эксплуатационная устойчивость",
    ],
    recommendedUseCases: ["Частные пространства", "Гостиничные объекты", "Девелоперские территории"],
    availableFinishes: baseFinishes.filter((item) => item.applicableTo.includes("composite")),
    specialVariants: [],
    customAvailable: true,
    legacySlugs: ["smooth"],
    heroImage: {
      src: "/images/textures/smooth.jpg",
      alt: "Композит для световых решений Форма Света",
    },
    seo: {
      title: "Композит — Форма Света",
      description: "Композитные материалы для архитектурных световых решений: поверхности, финиши и применение в проекте.",
    },
  },
  {
    id: "mat-special",
    slug: "special-materials",
    name: "Специальные материалы",
    tagline: "Оникс и индивидуальные светопропускающие решения.",
    summary:
      "Для декоративных и акцентных сценариев подбираем специальные материалы: оникс, горное стекло, композит под оникс и другие решения под конкретный объект.",
    properties: [
      "Материалы для декоративных и светопропускающих сценариев",
      "Подбор под архитектуру, свет и характер пространства",
      "Работа по индивидуальному запросу и пилотным образцам",
    ],
    recommendedUseCases: ["Акцентные зоны", "Лобби и входные группы", "Приватные декоративные пространства"],
    availableFinishes: [
      {
        key: "translucent",
        name: "Полупрозрачный",
        description: "Свет работает через материал и становится частью декоративного образа пространства.",
        applicableTo: ["special-materials"],
      },
      ...baseFinishes.filter((item) => item.applicableTo.includes("special-materials")),
    ],
    specialVariants: [
      {
        slug: "onyx",
        name: "Оникс",
        description: "Материал для акцентных решений с глубиной и выразительной светопроницаемостью.",
      },
      {
        slug: "mountain-glass",
        name: "Горное стекло",
        description: "Специальный декоративный материал для световых объектов и пластичных акцентов.",
      },
      {
        slug: "composite-onyx",
        name: "Композит под оникс",
        description: "Управляемое решение с визуальным эффектом оникса для проектных задач.",
      },
    ],
    customAvailable: true,
    heroImage: {
      src: "/placeholder.svg",
      alt: "Специальные материалы для световых решений Форма Света",
    },
    seo: {
      title: "Специальные материалы — Форма Света",
      description: "Оникс, горное стекло и индивидуальные специальные материалы для архитектурных световых решений.",
    },
  },
];

const materialSlugAliases: Record<string, MaterialFamilySlug> = {
  smooth: "composite",
  stone: "natural-stone",
  sand: "natural-stone",
};

export function resolveMaterialFamilySlug(slug: string): MaterialFamilySlug | undefined {
  const direct = materialsTextureSeed.find((item) => item.slug === slug)?.slug;
  if (direct) return direct;
  return materialSlugAliases[slug];
}

export function getMaterialFamilyBySlug(slug: string): MaterialFamily | undefined {
  const resolvedSlug = resolveMaterialFamilySlug(slug);
  if (!resolvedSlug) return undefined;
  return materialsTextureSeed.find((item) => item.slug === resolvedSlug);
}

