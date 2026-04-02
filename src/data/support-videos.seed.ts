export type SupportVideoTopic = "подключение" | "монтаж" | "обслуживание";

export interface SupportVideoItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  topic: SupportVideoTopic;
  embedUrl?: string;
  videoUrl?: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  relatedCollectionSlugs?: string[];
  relatedProductSlugs?: string[];
}

export interface SupportInfoBlock {
  id: string;
  title: string;
  description: string;
}

export const supportPageContent = {
  title: "Техническая поддержка — Форма Света",
  description: "Видео по подключению, монтажу и обслуживанию световых решений Форма Света.",
  heroEyebrow: "Поддержка",
  heroTitle: "Техническая поддержка",
  heroSubtitle:
    "Видео по подключению, монтажу и обслуживанию световых решений Форма Света. Помогаем быстрее пройти от вопроса к рабочему решению на объекте.",
  ctaTitle: "Нужна техническая консультация?",
  ctaSubtitle:
    "Опишите задачу, и мы подскажем подключение, монтаж или обслуживание под ваш объект и тип пространства.",
} as const;

export const supportInfoBlocks: SupportInfoBlock[] = [
  {
    id: "support-connection",
    title: "Подключение",
    description:
      "Показываем базовую логику подключения, типовые ошибки и порядок проверки перед первым запуском на объекте.",
  },
  {
    id: "support-installation",
    title: "Монтаж",
    description:
      "Разбираем установку в среде, требования к узлам и рекомендации по аккуратной интеграции решения в пространство.",
  },
  {
    id: "support-service",
    title: "Сервисное обслуживание",
    description:
      "Даём рекомендации по уходу, проверке узлов и типовым сервисным обращениям после ввода объекта в эксплуатацию.",
  },
];

export const supportVideosSeed: SupportVideoItem[] = [
  {
    id: "support-video-connection",
    slug: "base-connection",
    title: "Подключение базового модуля",
    description: "Пошаговая логика подключения и первичной проверки светового модуля перед запуском.",
    topic: "подключение",
    thumbnail: {
      src: "/placeholder.svg",
      alt: "Видео по подключению базового модуля",
    },
    relatedCollectionSlugs: ["vozduh", "zemlya"],
  },
  {
    id: "support-video-mounting-surface",
    slug: "surface-mounting",
    title: "Монтаж на готовое основание",
    description: "Базовые рекомендации по монтажу на поверхность и контролю положения светильника в среде.",
    topic: "монтаж",
    thumbnail: {
      src: "/placeholder.svg",
      alt: "Видео по монтажу на готовое основание",
    },
    relatedCollectionSlugs: ["vozduh"],
  },
  {
    id: "support-video-mounting-embedded",
    slug: "embedded-mounting",
    title: "Монтаж с закладной частью",
    description: "Последовательность установки и подготовка узла для скрытого и проектного монтажа.",
    topic: "монтаж",
    thumbnail: {
      src: "/placeholder.svg",
      alt: "Видео по монтажу с закладной частью",
    },
    relatedCollectionSlugs: ["zemlya"],
  },
  {
    id: "support-video-service",
    slug: "service-checklist",
    title: "Проверка и сервисное обслуживание",
    description: "Что проверить при сервисном обращении и как поддерживать рабочее состояние решения на объекте.",
    topic: "обслуживание",
    thumbnail: {
      src: "/placeholder.svg",
      alt: "Видео по сервисному обслуживанию световых решений",
    },
  },
];

