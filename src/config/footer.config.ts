import { navPaths } from "@/lib/route-helpers";

export const footerNavigation = {
  primary: [
    { label: "Изделия", href: navPaths.products },
    { label: "Фактура", href: navPaths.materials },
    { label: "Проекты", href: navPaths.projects },
    { label: "Загрузки", href: navPaths.downloads },
    { label: "Новости", href: navPaths.news },
  ],
  company: [
    { label: "О компании", href: navPaths.company },
    { label: "Вопросы", href: navPaths.faq },
    { label: "Комплекты", href: navPaths.forObjects },
    { label: "Контакты", href: navPaths.contacts },
    { label: "Запросить проект", href: navPaths.requestProject },
  ],
} as const;
