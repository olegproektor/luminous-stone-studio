export type IzdeliyaCollectionSlug = "vozduh" | "zemlya" | "maya";
export type IzdeliyaProductSlug = "feya" | "mengir" | "fokus" | "mayak";

export interface IzdeliyaProductSeed {
  slug: IzdeliyaProductSlug;
  collectionSlug: Exclude<IzdeliyaCollectionSlug, "maya">;
  name: string;
  tagline: string;
  summary: string;
  useCases: string[];
  materialNote: string;
  specs: Array<{ label: string; value: string }>;
  seo: {
    title: string;
    description: string;
  };
}

export interface IzdeliyaCollectionSeed {
  slug: IzdeliyaCollectionSlug;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "in-development";
  seo: {
    title: string;
    description: string;
  };
}

export const izdeliyaCollectionsSeed: IzdeliyaCollectionSeed[] = [
  {
    slug: "vozduh",
    name: "Воздух",
    tagline: "Лёгкая вертикаль света для камерных ландшафтов",
    description:
      "Коллекция для дорожек, входных групп и приватных зон. Сдержанный световой акцент без визуального шума.",
    status: "live",
    seo: {
      title: "Коллекция Воздух — STŌN",
      description: "Коллекция Воздух: деликатные уличные светильники для дорожек и входных групп.",
    },
  },
  {
    slug: "zemlya",
    name: "Земля",
    tagline: "Материальная пластика и опорный свет в ландшафте",
    description:
      "Коллекция для сценариев, где важны выразительная фактура и стабильная работа в уличной среде.",
    status: "live",
    seo: {
      title: "Коллекция Земля — STŌN",
      description: "Коллекция Земля: функциональные решения с акцентом на фактуру и архитектурный ритм.",
    },
  },
  {
    slug: "maya",
    name: "Майа",
    tagline: "Новые сценарии в разработке",
    description:
      "Коллекция формируется. Сейчас мы подготавливаем рабочие модели и спецификации для пилотных объектов.",
    status: "in-development",
    seo: {
      title: "Коллекция Майа — STŌN",
      description: "Коллекция Майа находится в разработке. Скоро будут опубликованы первые модели.",
    },
  },
];

const vozduhCollection = izdeliyaCollectionsSeed.find((item) => item.slug === "vozduh");
if (vozduhCollection) {
  vozduhCollection.tagline =
    "\u041b\u0435\u0433\u043a\u0438\u0435 \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0434\u043e\u0440\u043e\u0436\u0435\u043a, \u0432\u0445\u043e\u0434\u043d\u044b\u0445 \u0433\u0440\u0443\u043f\u043f \u0438 \u043a\u0430\u043c\u0435\u0440\u043d\u043e\u0433\u043e \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u0430";
  vozduhCollection.description =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0434\u043b\u044f \u043c\u044f\u0433\u043a\u043e\u0439 \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u043d\u0430 \u0447\u0430\u0441\u0442\u043d\u043e\u043c \u0443\u0447\u0430\u0441\u0442\u043a\u0435 \u0438 \u0432 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u044b\u0445 \u0432\u0445\u043e\u0434\u043d\u044b\u0445 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u044f\u0445. \u041c\u043e\u0434\u0435\u043b\u0438 \u0434\u0430\u044e\u0442 \u0441\u0434\u0435\u0440\u0436\u0430\u043d\u043d\u044b\u0439 \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0432\u0435\u0442, \u043f\u043e\u043c\u043e\u0433\u0430\u044e\u0442 \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043c\u0430\u0440\u0448\u0440\u0443\u0442 \u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0441\u043f\u043e\u043a\u043e\u0439\u043d\u044b\u0439 \u0440\u0438\u0442\u043c \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0430 \u0431\u0435\u0437 \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0448\u0443\u043c\u0430.";
  vozduhCollection.seo.title =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0412\u043e\u0437\u0434\u0443\u0445 - \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0443\u043b\u0438\u0447\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0434\u043e\u0440\u043e\u0436\u0435\u043a \u0438 \u0432\u0445\u043e\u0434\u043d\u044b\u0445 \u0433\u0440\u0443\u043f\u043f | КАМЕНЬ И СВЕТ";
  vozduhCollection.seo.description =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0412\u043e\u0437\u0434\u0443\u0445 - \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0443\u043b\u0438\u0447\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0434\u043e\u0440\u043e\u0436\u0435\u043a, \u0432\u0445\u043e\u0434\u043d\u044b\u0445 \u0433\u0440\u0443\u043f\u043f \u0438 \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u044b\u0445 \u0437\u043e\u043d. \u0421\u0434\u0435\u0440\u0436\u0430\u043d\u043d\u044b\u0439 \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0432\u0435\u0442 \u0434\u043b\u044f \u043a\u0430\u043c\u0435\u0440\u043d\u043e\u0433\u043e \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u0430 \u0438 \u0447\u0430\u0441\u0442\u043d\u043e\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u044b.";
}

const zemlyaCollection = izdeliyaCollectionsSeed.find((item) => item.slug === "zemlya");
if (zemlyaCollection) {
  zemlyaCollection.tagline =
    "\u041a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0441 \u0430\u043a\u0446\u0435\u043d\u0442\u043e\u043c \u043d\u0430 \u0444\u0430\u043a\u0442\u0443\u0440\u0443, \u0440\u0435\u043b\u044c\u0435\u0444 \u0438 \u043e\u043f\u043e\u0440\u043d\u044b\u0439 \u0441\u0432\u0435\u0442 \u0432 \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u0435";
  zemlyaCollection.description =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0434\u043b\u044f \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0435\u0432, \u0433\u0434\u0435 \u0432\u0430\u0436\u043d\u044b \u0432\u044b\u0440\u0430\u0437\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b, \u0443\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u044b\u0439 \u0441\u0432\u0435\u0442\u043e\u0432\u043e\u0439 \u0440\u0438\u0442\u043c \u0438 \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u043e\u0439 \u0444\u0430\u043a\u0442\u0443\u0440\u043e\u0439. \u041f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0434\u043b\u044f \u043f\u043e\u0434\u0441\u0432\u0435\u0442\u043a\u0438 \u0440\u0435\u043b\u044c\u0435\u0444\u0430, \u043f\u043e\u0441\u0430\u0434\u043e\u043a, \u0433\u0440\u0430\u043d\u0438\u0446 \u0437\u043e\u043d \u0438 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u043e\u0432 \u043d\u0430 \u0443\u0447\u0430\u0441\u0442\u043a\u0435.";
  zemlyaCollection.seo.title =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0417\u0435\u043c\u043b\u044f - \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0430\u043a\u0446\u0435\u043d\u0442\u043d\u043e\u0433\u043e \u0438 \u043e\u043f\u043e\u0440\u043d\u043e\u0433\u043e \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u043d\u043e\u0433\u043e \u043e\u0441\u0432\u0435\u0449\u0435\u043d\u0438\u044f | КАМЕНЬ И СВЕТ";
  zemlyaCollection.seo.description =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0417\u0435\u043c\u043b\u044f - \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0430\u043a\u0446\u0435\u043d\u0442\u043d\u043e\u0433\u043e \u0441\u0432\u0435\u0442\u0430, \u043f\u043e\u0434\u0441\u0432\u0435\u0442\u043a\u0438 \u0444\u0430\u043a\u0442\u0443\u0440\u044b, \u0440\u0435\u043b\u044c\u0435\u0444\u0430 \u0438 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u043e\u0432. \u0414\u043b\u044f \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u043d\u043e\u0433\u043e \u043e\u0441\u0432\u0435\u0449\u0435\u043d\u0438\u044f \u0447\u0430\u0441\u0442\u043d\u044b\u0445 \u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u044b\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.";
}

const mayaCollection = izdeliyaCollectionsSeed.find((item) => item.slug === "maya");
if (mayaCollection) {
  mayaCollection.tagline =
    "\u041d\u043e\u0432\u0430\u044f \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0445 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u0434\u043b\u044f \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u044b\u0445 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0435\u0432 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435";
  mayaCollection.description =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0444\u043e\u0440\u043c\u0438\u0440\u0443\u0435\u0442\u0441\u044f. \u041c\u044b \u0433\u043e\u0442\u043e\u0432\u0438\u043c \u043d\u043e\u0432\u044b\u0435 \u043c\u043e\u0434\u0435\u043b\u0438 \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0445 \u0443\u043b\u0438\u0447\u043d\u044b\u0445 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u0434\u043b\u044f \u043f\u0438\u043b\u043e\u0442\u043d\u044b\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432, \u0442\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u043c \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0438 \u0443\u0442\u043e\u0447\u043d\u044f\u0435\u043c \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043f\u0435\u0440\u0435\u0434 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0435\u0439.";
  mayaCollection.seo.title =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u041c\u0430\u0439\u044f - \u043d\u043e\u0432\u0430\u044f \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0445 \u0443\u043b\u0438\u0447\u043d\u044b\u0445 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u0432 | КАМЕНЬ И СВЕТ";
  mayaCollection.seo.description =
    "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u041c\u0430\u0439\u044f \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435. \u0413\u043e\u0442\u043e\u0432\u0438\u043c \u043d\u043e\u0432\u044b\u0435 \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0443\u043b\u0438\u0447\u043d\u044b\u0435 \u0441\u0432\u0435\u0442\u0438\u043b\u044c\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u044b\u0445 \u0438 \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u043d\u044b\u0445 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0435\u0432 \u0441 \u043f\u043e\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0439 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0435\u0439 \u043c\u043e\u0434\u0435\u043b\u0435\u0439 \u0438 \u0441\u043f\u0435\u0446\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0439.";
}

export const izdeliyaProductsSeed: IzdeliyaProductSeed[] = [
  {
    slug: "feya",
    collectionSlug: "vozduh",
    name: "Фея",
    tagline: "Компактный световой акцент для приватного ландшафта",
    summary:
      "Низкий светильник для дорожек и зон отдыха. Мягкий световой контур помогает выстроить спокойную навигацию вечером.",
    useCases: ["Дорожки у дома", "Террасы", "Переходы между функциональными зонами"],
    materialNote: "Сочетается с фактурами из раздела «Фактура», особенно с тёплыми каменными поверхностями.",
    specs: [
      { label: "Высота", value: "≈ 420 мм" },
      { label: "Свет", value: "Тёплый 3000K" },
      { label: "Класс защиты", value: "IP65+" },
      { label: "Монтаж", value: "Поверхностный/закладной (по проекту)" },
    ],
    seo: {
      title: "Фея — коллекция Воздух | STŌN",
      description: "Фея: компактный уличный светильник коллекции Воздух для дорожек, террас и приватных зон.",
    },
  },
  {
    slug: "mengir",
    collectionSlug: "vozduh",
    name: "Менгир",
    tagline: "Вертикальный ориентир для архитектурной композиции",
    summary:
      "Выразительный вертикальный объем с чистой световой линией. Подходит для входных групп и осевых направлений в ландшафте.",
    useCases: ["Входные группы", "Оси движения", "Камерные общественные пространства"],
    materialNote: "Лучше раскрывается в проектах с контрастной фактурой камня и минималистичной посадкой.",
    specs: [
      { label: "Высота", value: "≈ 650 мм" },
      { label: "Свет", value: "Тёплый 3000K" },
      { label: "Класс защиты", value: "IP65+" },
      { label: "Питание", value: "24V / 220V (по проекту)" },
    ],
    seo: {
      title: "Менгир — коллекция Воздух | STŌN",
      description: "Менгир: вертикальный уличный светильник коллекции Воздух для входных и осевых сценариев.",
    },
  },
  {
    slug: "fokus",
    collectionSlug: "zemlya",
    name: "Фокус",
    tagline: "Направленный акцент на материале и рельефе",
    summary:
      "Светильник направленного действия для подсветки фактур, растений и архитектурных деталей на участке.",
    useCases: ["Подсветка фактурных стен", "Акцент на посадках", "Детали фасада"],
    materialNote: "Рекомендуется совместно с разделом «Фактура» для подбора согласованной текстуры и цветовой температуры.",
    specs: [
      { label: "Сценарий", value: "Акцентный свет" },
      { label: "Свет", value: "3000K / направленный пучок" },
      { label: "Класс защиты", value: "IP65+" },
      { label: "Регулировка", value: "По направлению луча" },
    ],
    seo: {
      title: "Фокус — коллекция Земля | STŌN",
      description: "Фокус: направленный акцентный светильник для подсветки фактур и архитектурных деталей.",
    },
  },
  {
    slug: "mayak",
    collectionSlug: "zemlya",
    name: "Маяк",
    tagline: "Опорный световой ритм для маршрутов и границ",
    summary:
      "Светильник для линейной навигации на участке: формирует устойчивый вечерний маршрут без визуальной перегрузки.",
    useCases: ["Маршруты на участке", "Границы функциональных зон", "Подходы к входу"],
    materialNote: "Эффективен в паре с ровной каменной плоскостью и тактильными фактурами в окружении.",
    specs: [
      { label: "Высота", value: "≈ 800 мм" },
      { label: "Свет", value: "Тёплый 3000K" },
      { label: "Класс защиты", value: "IP65+" },
      { label: "Назначение", value: "Маршрутный/опорный свет" },
    ],
    seo: {
      title: "Маяк — коллекция Земля | STŌN",
      description: "Маяк: опорный уличный светильник для маршрутного освещения и границ функциональных зон.",
    },
  },
];

export function getIzdeliyaCollectionBySlug(slug: string) {
  return izdeliyaCollectionsSeed.find((item) => item.slug === slug);
}

export function getIzdeliyaProductsByCollection(slug: string) {
  return izdeliyaProductsSeed.filter((item) => item.collectionSlug === slug);
}

export function getIzdeliyaProductByRoute(collectionSlug: string, productSlug: string) {
  return izdeliyaProductsSeed.find(
    (item) => item.collectionSlug === collectionSlug && item.slug === productSlug
  );
}

export function getIzdeliyaProductBySlug(productSlug: string) {
  return izdeliyaProductsSeed.find((item) => item.slug === productSlug);
}
