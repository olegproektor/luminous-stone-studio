import { navPaths } from "@/lib/route-helpers";

export const siteBrand = {
  name: "Форма Света",
  descriptor: "каменные световые решения для ландшафта и архитектуры",
} as const;

export const siteStrategy = {
  primaryConversion: {
    label: "Обсудить проект",
    href: navPaths.requestProject,
  },
  secondaryCtas: {
    collections: {
      label: "Смотреть изделия",
      href: navPaths.collections,
    },
    forObjects: {
      label: "Для объектов",
      href: navPaths.forObjects,
    },
    projects: {
      label: "Смотреть проекты",
      href: navPaths.projects,
    },
    downloads: {
      label: "Получить материалы",
      href: navPaths.downloads,
    },
    contacts: {
      label: "Связаться",
      href: navPaths.contacts,
    },
  },
  audiencePaths: [
    {
      label: "Архитекторам и дизайнерам",
      href: navPaths.downloads,
      context: "home_audience_architects",
    },
    {
      label: "Девелоперам и объектам",
      href: navPaths.forObjects,
      context: "home_audience_b2b",
    },
    {
      label: "Частным клиентам",
      href: navPaths.collections,
      context: "home_audience_private",
    },
  ],
} as const;
