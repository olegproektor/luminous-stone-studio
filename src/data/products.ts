import type { Product, ProductStatus } from "@/types";
import { toTechGroups } from "@/lib/product-tech";

type ProductSeed = Omit<Product, "status"> & { status?: ProductStatus };

const legacyProducts: ProductSeed[] = [
  {
    id: "p1",
    slug: "bollard-ston-500-smooth",
    name: "Боллард 500",
    series: "Гладкая линия",
    category: "bollard",
    tagline: "Минималистичный боллард с вертикальной световой щелью",
    description:
      "Архитектурный боллард высотой 500 мм из литьевого камня с гладкой поверхностью. Вертикальная световая щель создаёт мягкое направленное освещение дорожек, террас и входных групп. Идеален для современного ландшафта загородного дома или общественного пространства.",
    features: [
      "Литьевой камень — натуральная фактура",
      "Вертикальная световая щель",
      "LED 3000K — тёплый свет",
      "IP65 — всепогодная эксплуатация",
      "Два варианта монтажа",
      "Два варианта питания",
    ],
    specs: [
      { label: "Высота", value: "500 мм" },
      { label: "Диаметр/сечение", value: "120 × 120 мм" },
      { label: "Вес", value: "8 кг" },
      { label: "Материал", value: "Литьевой камень" },
      { label: "Источник света", value: "LED 5W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP65" },
    ],
    variants: [
      {
        id: "v1",
        height: 500,
        texture: "smooth",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "surface",
        power: "220v",
        sku: "STN-500-SM-SND-SRF-220",
        price: 18500,
        inStock: true,
      },
      {
        id: "v2",
        height: 500,
        texture: "smooth",
        color: "Графит",
        colorHex: "#4A4A48",
        mounting: "surface",
        power: "220v",
        sku: "STN-500-SM-GRF-SRF-220",
        price: 18500,
        inStock: true,
      },
      {
        id: "v3",
        height: 500,
        texture: "smooth",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "embedded",
        power: "12v",
        sku: "STN-500-SM-SND-EMB-12",
        price: 19800,
        inStock: true,
      },
      {
        id: "v4",
        height: 500,
        texture: "smooth",
        color: "Графит",
        colorHex: "#4A4A48",
        mounting: "embedded",
        power: "12v",
        sku: "STN-500-SM-GRF-EMB-12",
        price: 19800,
        inStock: false,
      },
    ],
    images: [{ src: "/placeholder.svg", alt: "Боллард 500 гладкий — день" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 500 гладкий — ночь" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 500 в ландшафте" }],
    materials: ["Литьевой камень"],
    ipRating: "IP65",
    lightTemp: "3000K",
    relatedProductIds: ["p2", "p3"],
    useCases: ["Дорожки", "Террасы", "Входные группы", "Частные сады"],
    seo: {
      title: "Боллард 500 гладкий — Архитектурный уличный светильник из камня",
      description:
        "Боллард из литьевого камня 500 мм с вертикальной световой щелью. Тёплый LED свет 3000K, IP65. Для дорожек, террас и ландшафтного освещения.",
    },
    createdAt: "2025-01-15",
  },
  {
    id: "p2",
    slug: "bollard-ston-700-smooth",
    name: "Боллард 700",
    series: "Гладкая линия",
    category: "bollard",
    tagline: "Высокий боллард для масштабного ландшафта",
    description:
      "Архитектурный боллард высотой 700 мм из литьевого камня с гладкой поверхностью. Увеличенная высота подходит для подсветки широких дорожек, парковых зон и коммерческих объектов.",
    features: [
      "Литьевой камень — натуральная фактура",
      "Вертикальная световая щель",
      "LED 3000K — тёплый свет",
      "IP65 — всепогодная эксплуатация",
      "Увеличенная высота для масштабных пространств",
    ],
    specs: [
      { label: "Высота", value: "700 мм" },
      { label: "Диаметр/сечение", value: "120 × 120 мм" },
      { label: "Вес", value: "12 кг" },
      { label: "Материал", value: "Литьевой камень" },
      { label: "Источник света", value: "LED 7W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP65" },
    ],
    variants: [
      {
        id: "v5",
        height: 700,
        texture: "smooth",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "surface",
        power: "220v",
        sku: "STN-700-SM-SND-SRF-220",
        price: 23500,
        inStock: true,
      },
      {
        id: "v6",
        height: 700,
        texture: "smooth",
        color: "Графит",
        colorHex: "#4A4A48",
        mounting: "surface",
        power: "220v",
        sku: "STN-700-SM-GRF-SRF-220",
        price: 23500,
        inStock: true,
      },
    ],
    images: [{ src: "/placeholder.svg", alt: "Боллард 700 гладкий — день" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 700 гладкий — ночь" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 700 в парке" }],
    materials: ["Литьевой камень"],
    ipRating: "IP65",
    lightTemp: "3000K",
    relatedProductIds: ["p1", "p4"],
    useCases: ["Парковые маршруты", "Широкие дорожки", "Объектные территории"],
    seo: {
      title: "Боллард 700 гладкий — Уличный светильник из литьевого камня",
      description:
        "Высокий боллард 700 мм из литьевого камня с LED подсветкой 3000K. IP65. Для парков, широких дорожек и коммерческих объектов.",
    },
    createdAt: "2025-01-15",
  },
  {
    id: "p3",
    slug: "bollard-ston-500-textured",
    name: "Боллард 500 Фактура",
    series: "Фактурная линия",
    category: "bollard",
    tagline: "Каменная текстура в компактном формате",
    description:
      "Боллард 500 мм с выраженной каменной текстурой поверхности. Природная фактура усиливает связь с ландшафтом и подчёркивает архитектурную честность материала.",
    features: [
      "Текстурная поверхность — имитация натурального камня",
      "Вертикальная световая щель",
      "LED 3000K — тёплый свет",
      "IP65",
    ],
    specs: [
      { label: "Высота", value: "500 мм" },
      { label: "Диаметр/сечение", value: "120 × 120 мм" },
      { label: "Вес", value: "9 кг" },
      { label: "Материал", value: "Литьевой камень (текстурный)" },
      { label: "Источник света", value: "LED 5W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP65" },
    ],
    variants: [
      {
        id: "v7",
        height: 500,
        texture: "stone",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "surface",
        power: "220v",
        sku: "STN-500-TX-SND-SRF-220",
        price: 21000,
        inStock: true,
      },
      {
        id: "v8",
        height: 500,
        texture: "stone",
        color: "Графит",
        colorHex: "#4A4A48",
        mounting: "surface",
        power: "220v",
        sku: "STN-500-TX-GRF-SRF-220",
        price: 21000,
        inStock: true,
      },
    ],
    images: [{ src: "/placeholder.svg", alt: "Боллард 500 фактурный — день" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 500 фактурный — ночь" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 500 фактурный в саду" }],
    materials: ["Литьевой камень (текстурный)"],
    ipRating: "IP65",
    lightTemp: "3000K",
    relatedProductIds: ["p1", "p4"],
    useCases: ["Частные сады", "Ландшафтные композиции", "Природные маршруты"],
    seo: {
      title: "Боллард 500 фактурный — Каменная фактура для ландшафта",
      description:
        "Фактурный боллард из литьевого камня высотой 500 мм. Природная пластика, LED 3000K, IP65. Для садов и ландшафтных композиций.",
    },
    createdAt: "2025-02-01",
  },
  {
    id: "p4",
    slug: "bollard-ston-700-textured",
    name: "Боллард 700 Фактура",
    series: "Фактурная линия",
    category: "bollard",
    tagline: "Высокий текстурный боллард для выразительного ландшафта",
    description:
      "Высокий боллард 700 мм с текстурой натурального камня. Для объектов, где важна связь архитектуры с природным окружением.",
    features: [
      "Текстурная поверхность",
      "Вертикальная световая щель",
      "LED 3000K",
      "IP65",
      "Увеличенная высота",
    ],
    specs: [
      { label: "Высота", value: "700 мм" },
      { label: "Диаметр/сечение", value: "120 × 120 мм" },
      { label: "Вес", value: "13 кг" },
      { label: "Материал", value: "Литьевой камень (текстурный)" },
      { label: "Источник света", value: "LED 7W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP65" },
    ],
    variants: [
      {
        id: "v9",
        height: 700,
        texture: "stone",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "surface",
        power: "220v",
        sku: "STN-700-TX-SND-SRF-220",
        price: 26500,
        inStock: true,
      },
      {
        id: "v10",
        height: 700,
        texture: "stone",
        color: "Графит",
        colorHex: "#4A4A48",
        mounting: "embedded",
        power: "220v",
        sku: "STN-700-TX-GRF-EMB-220",
        price: 28000,
        inStock: false,
      },
    ],
    images: [{ src: "/placeholder.svg", alt: "Боллард 700 фактурный — день" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 700 фактурный — ночь" }],
    environmentImages: [],
    materials: ["Литьевой камень (текстурный)"],
    ipRating: "IP65",
    lightTemp: "3000K",
    relatedProductIds: ["p2", "p3"],
    useCases: ["Парковые маршруты", "Объектные территории", "Ландшафтные композиции"],
    seo: {
      title: "Боллард 700 фактурный — Высокий уличный светильник из камня",
      description:
        "Фактурный боллард высотой 700 мм из литьевого камня. LED 3000K, IP65. Для парковых маршрутов и объектных территорий.",
    },
    createdAt: "2025-02-01",
  },
  {
    id: "p5",
    slug: "garden-light-lira",
    name: "Садовый светильник Lira",
    series: "Садовые формы",
    category: "garden-light",
    tagline: "Невысокий светильник для камерных садовых сценариев",
    description:
      "Невысокий садовый светильник из композита с мягким рассеянным светом. Подходит для зон отдыха, маршрутов у воды и камерных террас, где важен мягкий вечерний свет без визуального шума.",
    features: [
      "Композитный корпус",
      "Мягкий рассеянный свет",
      "LED 2700K — тёплый свет",
      "IP65",
      "Компактный формат",
    ],
    specs: [
      { label: "Высота", value: "350 мм" },
      { label: "Диаметр", value: "150 мм" },
      { label: "Вес", value: "5 кг" },
      { label: "Материал", value: "Композит" },
      { label: "Источник света", value: "LED 3W" },
      { label: "Цветовая температура", value: "2700K" },
      { label: "IP-класс", value: "IP65" },
    ],
    variants: [
      {
        id: "v11",
        height: 350,
        texture: "smooth",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "surface",
        power: "12v",
        sku: "LRA-350-SM-SND-SRF-12",
        price: 14500,
        inStock: true,
      },
    ],
    images: [{ src: "/placeholder.svg", alt: "Садовый светильник Lira — день" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Садовый светильник Lira — ночь" }],
    environmentImages: [],
    materials: ["Композит"],
    ipRating: "IP65",
    lightTemp: "2700K",
    relatedProductIds: ["p1", "p6"],
    useCases: ["Зоны отдыха", "Террасы", "Маршруты у воды", "Частные сады"],
    seo: {
      title: "Садовый светильник Lira — Мягкий свет для садового ландшафта",
      description:
        "Садовый светильник из композита с мягким рассеянным светом 2700K. IP65. Для зон отдыха, террас и частных садов.",
    },
    createdAt: "2025-03-01",
  },
  {
    id: "p6",
    slug: "accent-light-forma",
    name: "Акцентный светильник Forma",
    series: "Акцентные формы",
    category: "accent-light",
    tagline: "Акцентный световой объект для пластики ландшафта",
    description:
      "Акцентный световой объект из литьевого камня. Подходит для декоративных зон, входных групп и сценариев, где светильник работает как самостоятельный пластический акцент.",
    features: [
      "Литьевой камень",
      "Направленный акцентный свет",
      "LED 3000K",
      "IP65",
      "Скульптурная форма",
    ],
    specs: [
      { label: "Высота", value: "300 мм" },
      { label: "Ширина", value: "200 мм" },
      { label: "Вес", value: "6 кг" },
      { label: "Материал", value: "Литьевой камень" },
      { label: "Источник света", value: "LED 3W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP65" },
    ],
    variants: [
      {
        id: "v12",
        height: 300,
        texture: "smooth",
        color: "Песчаник",
        colorHex: "#C4B5A0",
        mounting: "surface",
        power: "220v",
        sku: "FRM-300-SM-SND-SRF-220",
        price: 16000,
        inStock: true,
      },
    ],
    images: [{ src: "/placeholder.svg", alt: "Акцентный светильник Forma — день" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Акцентный светильник Forma — ночь" }],
    environmentImages: [],
    materials: ["Литьевой камень"],
    ipRating: "IP65",
    lightTemp: "3000K",
    relatedProductIds: ["p1", "p5"],
    useCases: ["Входные группы", "Декоративные зоны", "Акцентные композиции"],
    seo: {
      title: "Акцентный светильник Forma — Акцентный световой объект из камня",
      description:
        "Акцентный световой объект из литьевого камня. LED 3000K, IP65. Для входных групп и ландшафтных композиций.",
    },
    createdAt: "2025-03-01",
  },
];

const launchProducts: ProductSeed[] = [
  {
    id: "lp1",
    slug: "bollard-400-cast-stone",
    status: "active",
    name: "Боллард 400",
    series: "Базовая линия боллардов",
    category: "bollard",
    tagline: "Компактный боллард для мягкой навигационной подсветки",
    description: "Низкий боллард высотой 400 мм из литьевого камня для дорожек, террас и приватных сценариев освещения.",
    features: ["Высота 400 мм", "Литьевой камень", "LED 3000K", "IP67 световой модуль"],
    specs: [
      { label: "Высота", value: "400 мм" },
      { label: "Материал", value: "Литьевой камень" },
      { label: "Источник света", value: "LED 6–12W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP67 (модуль), IP65 (соединения)" },
    ],
    variants: [{ id: "lp1v1", height: 400, texture: "smooth", color: "Песчаник", colorHex: "#C4B5A0", mounting: "surface", power: "220v", sku: "BLD-400-CS-220", price: 12000, inStock: true }],
    images: [{ src: "/placeholder.svg", alt: "Боллард 400" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 400 ночью" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 400 в среде" }],
    materials: ["Литьевой камень"],
    ipRating: "IP67",
    lightTemp: "3000K",
    relatedProductIds: ["lp2", "lp3"],
    useCases: ["Дорожки", "Террасы", "Частные участки"],
    seo: { title: "Боллард 400 — Форма Света", description: "Компактный боллард 400 мм из литьевого камня." },
    createdAt: "2026-03-12",
    launchTier: "primary",
  },
  {
    id: "lp2",
    slug: "bollard-600-cast-stone",
    status: "active",
    name: "Боллард 600 Литьевой камень",
    series: "Базовая линия боллардов",
    category: "bollard",
    tagline: "Базовая высота для архитектурного ландшафта",
    description: "Боллард 600 мм из литьевого камня с вертикальной световой линией для частных и объектных маршрутов.",
    features: ["Высота 600 мм", "Литьевой камень", "24V/220V", "IP67 световой модуль"],
    specs: [
      { label: "Высота", value: "600 мм" },
      { label: "Материал", value: "Литьевой камень" },
      { label: "Источник света", value: "LED 6–12W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP67 (модуль), IP65 (соединения)" },
    ],
    variants: [{ id: "lp2v1", height: 600, texture: "smooth", color: "Графит", colorHex: "#4A4A48", mounting: "surface", power: "220v", sku: "BLD-600-CS-220", price: 15000, inStock: true }],
    images: [{ src: "/placeholder.svg", alt: "Боллард 600 из литьевого камня" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 600 из литьевого камня ночью" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 600 из литьевого камня в среде" }],
    materials: ["Литьевой камень"],
    ipRating: "IP67",
    lightTemp: "3000K",
    relatedProductIds: ["lp1", "lp3", "lp4"],
    useCases: ["Частные участки", "Входные группы", "Глэмпинг"],
    seo: { title: "Боллард 600 из литьевого камня — Форма Света", description: "Боллард 600 мм из литьевого камня." },
    createdAt: "2026-03-12",
    launchTier: "primary",
  },
  {
    id: "lp3",
    slug: "bollard-600-natural-stone",
    status: "coming-soon",
    name: "Боллард 600 Натуральный камень",
    series: "Базовая линия боллардов",
    category: "bollard",
    tagline: "Натуральный камень для премиальных проектных сценариев",
    description: "Боллард 600 мм из натурального камня с уникальной фактурой и более материальным присутствием в среде.",
    features: ["Высота 600 мм", "Натуральный камень", "Индивидуальная фактура", "IP67 световой модуль"],
    specs: [
      { label: "Высота", value: "600 мм" },
      { label: "Материал", value: "Натуральный камень" },
      { label: "Источник света", value: "LED 6–12W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP67 (модуль), IP65 (соединения)" },
    ],
    variants: [{ id: "lp3v1", height: 600, texture: "stone", color: "Натуральный", colorHex: "#8F8576", mounting: "surface", power: "220v", sku: "BLD-600-NS-220", price: 18000, inStock: true }],
    images: [{ src: "/placeholder.svg", alt: "Боллард 600 из натурального камня" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 600 из натурального камня ночью" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 600 из натурального камня в среде" }],
    materials: ["Натуральный камень"],
    ipRating: "IP67",
    lightTemp: "3000K",
    relatedProductIds: ["lp2", "lp4"],
    useCases: ["Премиальные частные объекты", "Отели", "Ресторанные проекты"],
    seo: { title: "Боллард 600 из натурального камня — Форма Света", description: "Боллард 600 мм из натурального камня." },
    createdAt: "2026-03-12",
    launchTier: "primary",
  },
  {
    id: "lp4",
    slug: "bollard-800-cast-stone",
    status: "coming-soon",
    name: "Боллард 800",
    series: "Базовая линия боллардов",
    category: "bollard",
    tagline: "Высокий боллард для масштабных территорий",
    description: "Высокий боллард 800 мм для проектов с большой протяжённостью маршрутов и более выраженным навигационным ритмом.",
    features: ["Высота 800 мм", "Литьевой камень", "Усиленная видимость", "IP67 световой модуль"],
    specs: [
      { label: "Высота", value: "800 мм" },
      { label: "Материал", value: "Литьевой камень" },
      { label: "Источник света", value: "LED 6–12W" },
      { label: "Цветовая температура", value: "3000K" },
      { label: "IP-класс", value: "IP67 (модуль), IP65 (соединения)" },
    ],
    variants: [{ id: "lp4v1", height: 800, texture: "smooth", color: "Графит", colorHex: "#4A4A48", mounting: "surface", power: "220v", sku: "BLD-800-CS-220", price: 20000, inStock: true }],
    images: [{ src: "/placeholder.svg", alt: "Боллард 800" }],
    nightImages: [{ src: "/placeholder.svg", alt: "Боллард 800 ночью" }],
    environmentImages: [{ src: "/placeholder.svg", alt: "Боллард 800 в среде" }],
    materials: ["Литьевой камень"],
    ipRating: "IP67",
    lightTemp: "3000K",
    relatedProductIds: ["lp2", "lp3"],
    useCases: ["Глэмпинг", "Отели", "Общественные пространства"],
    seo: { title: "Боллард 800 — Форма Света", description: "Высокий боллард 800 мм для масштабных объектов." },
    createdAt: "2026-03-12",
    launchTier: "primary",
  },
];

export const products: Product[] = [
  ...launchProducts.map((item) => normalizeProduct(item)),
  ...legacyProducts.map((item) =>
    normalizeProduct({
      ...item,
      status: "draft",
      launchTier: "secondary" as const,
      isHidden: true,
    })
  ),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getVisibleProducts(): Product[] {
  return products.filter((product) => !product.isHidden && product.status !== "draft");
}

export function getActiveProducts(): Product[] {
  return products.filter((product) => !product.isHidden && product.status === "active");
}

export function getComingSoonProducts(): Product[] {
  return products.filter((product) => !product.isHidden && product.status === "coming-soon");
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return getVisibleProducts().filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product): Product[] {
  return getVisibleProducts().filter((p) => product.relatedProductIds.includes(p.id));
}

function normalizeProduct(product: ProductSeed): Product {
  const firstPrice = Math.min(...product.variants.map((variant) => variant.price ?? Infinity));
  const priceBand =
    firstPrice === Infinity ? "request" : firstPrice < 15000 ? "entry" : firstPrice <= 20000 ? "mid" : "premium";

  const lowerUseCases = product.useCases.map((value) => value.toLowerCase());
  let application = "public-space";
  if (lowerUseCases.some((value) => value.includes("дорож") || value.includes("алле"))) application = "pathways";
  else if (lowerUseCases.some((value) => value.includes("террас") || value.includes("патио"))) application = "terrace";
  else if (lowerUseCases.some((value) => value.includes("вход"))) application = "entrance";
  else if (lowerUseCases.some((value) => value.includes("глэмпинг") || value.includes("отел"))) application = "glamping";

  const materialRaw = product.materials.join(" ").toLowerCase();
  const material = materialRaw.includes("натураль")
    ? "natural-stone"
    : materialRaw.includes("композит")
      ? "composite"
      : "cast-stone";

  const ipRaw = product.ipRating.toLowerCase();
  const ip = ipRaw.includes("67") ? "ip67" : "ip65";

  return {
    ...product,
    status: product.status ?? (product.isHidden ? "draft" : "active"),
    techGroups: toTechGroups(product.specs),
    taxonomy: {
      category: product.category,
      application,
      material,
      ip,
      priceBand,
    },
  };
}
