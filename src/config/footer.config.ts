import { navPaths } from "@/lib/route-helpers";

export const footerNavigation = {
  primary: [
    { label: "Коллекции", href: navPaths.collections },
    { label: "Продукты", href: navPaths.products },
    { label: "Проекты", href: navPaths.projects },
    { label: "Материалы", href: navPaths.materials },
    { label: "Загрузки", href: navPaths.downloads },
  ],
  company: [
    { label: "О компании", href: navPaths.company },
    { label: "FAQ", href: navPaths.faq },
    { label: "Для объектов", href: navPaths.forObjects },
    { label: "Контакты", href: navPaths.contacts },
    { label: "Запросить проект", href: navPaths.requestProject },
  ],
} as const;
