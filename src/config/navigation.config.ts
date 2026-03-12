import { buildPath, navPaths } from "@/lib/route-helpers";

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export const headerNavigation: NavigationItem[] = [
  {
    label: "Коллекции",
    href: navPaths.collections,
    children: [
      { label: "STŌN Classic", href: "/collections/ston-classic", description: "Гладкая форма, чистый свет" },
      { label: "STŌN Texture", href: "/collections/ston-texture", description: "Природная фактура камня" },
      { label: "Bollards Core", href: buildPath.collection("bollards-core"), description: "Стартовая линейка запуска" },
      { label: "Все коллекции", href: navPaths.collections },
    ],
  },
  { label: "Продукты", href: navPaths.products },
  { label: "Проекты", href: navPaths.projects },
  { label: "Материалы", href: navPaths.materials },
  { label: "Загрузки", href: navPaths.downloads },
  { label: "Для объектов", href: navPaths.forObjects },
  { label: "О компании", href: navPaths.company },
  { label: "FAQ", href: navPaths.faq },
  { label: "Контакты", href: navPaths.contacts },
];
