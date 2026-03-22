import {
  izdeliyaCollectionsSeed,
  izdeliyaProductsSeed,
  type IzdeliyaCollectionSlug,
  type IzdeliyaProductSlug,
} from "@/data/izdeliya-architecture.seed";

export interface ProductsShowcaseHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ProductsShowcaseIntro {
  title: string;
  paragraphs: string[];
}

export interface ProductsShowcaseCollectionCard {
  collectionSlug: IzdeliyaCollectionSlug;
  title: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ProductsShowcasePanelItem {
  collectionSlug: IzdeliyaCollectionSlug;
  title: string;
  subtitle: string;
  models: Array<{
    productSlug: IzdeliyaProductSlug;
    title: string;
    subtitle: string;
  }>;
}

export interface ProductsShowcaseSeed {
  hero: ProductsShowcaseHero;
  intro: ProductsShowcaseIntro;
  collectionsTitle: string;
  collectionCards: ProductsShowcaseCollectionCard[];
  panelTitle: string;
  panelItems: ProductsShowcasePanelItem[];
  finalCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
}

const fallbackImage = { src: "/placeholder.svg", alt: "Коллекция уличных светильников КАМЕНЬ И СВЕТ" };

const productsByCollection = new Map<IzdeliyaCollectionSlug, typeof izdeliyaProductsSeed>([
  ["vozduh", izdeliyaProductsSeed.filter((item) => item.collectionSlug === "vozduh")],
  ["zemlya", izdeliyaProductsSeed.filter((item) => item.collectionSlug === "zemlya")],
  ["maya", []],
]);

export const productsShowcaseSeed: ProductsShowcaseSeed = {
  hero: {
    eyebrow: "Изделия",
    title: "Каменные светильники для уличной архитектуры",
    subtitle:
      "Коллекции собраны по сценариям участка: мягкая навигация, материалный акцент и опорный свет для маршрутов.",
    image: {
      src: "/placeholder.svg",
      alt: "Каменные уличные светильники в ландшафте",
    },
  },
  intro: {
    title: "Откройте коллекции для вашего проекта",
    paragraphs: [
      "Изделия КАМЕНЬ И СВЕТ объединены в коллекции, где каждая модель решает конкретную задачу в вечернем сценарии участка.",
      "Так проще выбрать решение под архитектуру, материал среды и требуемый ритм света без визуальной перегрузки.",
    ],
  },
  collectionsTitle: "Коллекции",
  collectionCards: izdeliyaCollectionsSeed.map((collection) => ({
    collectionSlug: collection.slug,
    title: collection.name,
    description: collection.description,
    ctaLabel:
      collection.status === "in-development"
        ? "Смотреть коллекцию"
        : `Открыть коллекцию ${collection.name}`,
    image: {
      ...fallbackImage,
      alt: `Коллекция ${collection.name}`,
    },
  })),
  panelTitle: "Коллекции и модели",
  panelItems: izdeliyaCollectionsSeed.map((collection) => ({
    collectionSlug: collection.slug,
    title: collection.name,
    subtitle: collection.tagline,
    models: (productsByCollection.get(collection.slug) ?? []).map((product) => ({
      productSlug: product.slug,
      title: product.name,
      subtitle: product.tagline,
    })),
  })),
  finalCta: {
    eyebrow: "Нужна помощь с выбором?",
    title: "Подберем коллекцию под ваш объект",
    subtitle: "Сопоставим коллекцию, модели и сценарий света под архитектуру и задачи участка.",
    primaryCtaLabel: "Обсудить проект",
    secondaryCtaLabel: "Связаться",
  },
};

export function getShowcaseCollectionCardBySlug(slug: IzdeliyaCollectionSlug) {
  return productsShowcaseSeed.collectionCards.find((item) => item.collectionSlug === slug);
}

export function getShowcasePanelItemBySlug(slug: IzdeliyaCollectionSlug) {
  return productsShowcaseSeed.panelItems.find((item) => item.collectionSlug === slug);
}
