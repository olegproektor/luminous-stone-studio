import {
  izdeliyaCollectionsSeed,
  type IzdeliyaCollectionSlug,
  type IzdeliyaProductSlug,
} from "@/data/izdeliya-architecture.seed";
import heroBollard from "@/assets/hero-bollard.jpg";
import { getCollectionLaunchStatus, getPublicCollectionProducts } from "@/data/public-catalog-state";

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
  description?: string;
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

const fallbackImage = { src: heroBollard, alt: "Каменные уличные светильники Форма Света" };

const productsByCollection = new Map<IzdeliyaCollectionSlug, ReturnType<typeof getPublicCollectionProducts>>([
  ["vozduh", getPublicCollectionProducts("vozduh")],
  ["zemlya", getPublicCollectionProducts("zemlya")],
  ["maya", []],
]);

export const productsShowcaseSeed: ProductsShowcaseSeed = {
  hero: {
    eyebrow: "Изделия",
    title: "Выберите сценарий света для вашего пространства",
    subtitle:
      "Коллекции помогают быстро понять, нужен ли проекту мягкий маршрутный свет, акцент на материале или опорный ритм для входов и движения по территории.",
    image: {
      src: heroBollard,
      alt: "Каменные уличные светильники в ландшафте",
    },
  },
  intro: {
    title: "Начните с коллекции, а не с отдельной модели",
    paragraphs: [
      "В каталоге коллекции собраны по роли света в пространстве: навигация, акцент на материале или опорный ритм маршрута. Так проще быстро понять направление решения под конкретный проект.",
      "После выбора коллекции можно перейти к моделям, материалам и следующему шагу в обсуждении проекта, а не теряться в наборе отдельных изделий.",
    ],
  },
  collectionsTitle: "Коллекции решений",
  collectionCards: izdeliyaCollectionsSeed.map((collection) => ({
    collectionSlug: collection.slug,
    title: collection.name,
    description:
      collection.slug === "vozduh"
        ? "Для дорожек, входных групп и спокойной вечерней навигации, когда свет должен направлять движение без визуального шума."
        : collection.slug === "zemlya"
          ? "Для рельефа, фактур и архитектурных акцентов, когда материал и пластика пространства должны читаться вечером."
          : "Для новых декоративных и акцентных сценариев. Готовим решения и спецификации для пилотных объектов и раннего обсуждения.",
    ctaLabel:
      getCollectionLaunchStatus(collection.slug) === "coming-soon"
        ? "Готовим к запуску"
        : `Смотреть коллекцию ${collection.name}`,
    image: {
      ...fallbackImage,
      alt: `Коллекция ${collection.name}`,
    },
  })),
  panelTitle: "Выберите коллекцию",
  panelItems: izdeliyaCollectionsSeed.map((collection) => ({
    collectionSlug: collection.slug,
    title: collection.name,
    subtitle:
      collection.slug === "vozduh"
        ? "Мягкая навигация для маршрутов и входных групп."
        : collection.slug === "zemlya"
          ? "Акцентный свет для материала, рельефа и пластики пространства."
          : "Готовим новые акцентные решения для пилотных сценариев.",
    description:
      collection.slug === "vozduh"
        ? "Подходит для частных участков, камерных объектов и входных групп, где свет должен помогать движению и сохранять спокойный ритм пространства."
        : collection.slug === "zemlya"
          ? "Подходит для архитектурных акцентов, посадок, подпорных стен и фактурных поверхностей, где свет работает на выразительность материала."
          : "Коллекция находится в статусе coming-soon: уже можно понять направление и обсудить применение в проекте, пока готовятся первые модели и спецификации.",
    models: (productsByCollection.get(collection.slug) ?? []).map((product) => ({
      productSlug: product.slug,
      title: product.name,
      subtitle: product.tagline,
    })),
  })),
  finalCta: {
    eyebrow: "Подбор коллекции",
    title: "Если не уверены в направлении, подберём коллекцию под задачу",
    subtitle: "Сопоставим сценарий света, коллекцию и формат применения под частный или объектный проект и предложим следующий рабочий шаг.",
    primaryCtaLabel: "Обсудить проект",
    secondaryCtaLabel: "Получить материалы",
  },
};

export function getShowcaseCollectionCardBySlug(slug: IzdeliyaCollectionSlug) {
  return productsShowcaseSeed.collectionCards.find((item) => item.collectionSlug === slug);
}

export function getShowcasePanelItemBySlug(slug: IzdeliyaCollectionSlug) {
  return productsShowcaseSeed.panelItems.find((item) => item.collectionSlug === slug);
}
