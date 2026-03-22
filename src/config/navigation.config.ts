import { buildPath, navPaths } from "@/lib/route-helpers";

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export const headerNavigation: NavigationItem[] = [
  {
    label: "О компании",
    href: navPaths.company,
  },
  {
    label: "Изделия",
    href: navPaths.products,
    children: [
      { label: "Воздух", href: buildPath.collection("vozduh"), description: "Основная линейка боллардов" },
      { label: "Земля", href: buildPath.collection("zemlya"), description: "Текстурные формы и природная пластика" },
      { label: "Майа", href: buildPath.collection("maya"), description: "Акцентные и декоративные решения" },
      { label: "Фактура", href: navPaths.materials, description: "Материалы и текстуры" },
    ],
  },
  { label: "Комплекты", href: navPaths.forObjects },
  { label: "Проекты", href: navPaths.projects },
  { label: "Вопросы", href: navPaths.faq },
  { label: "Скачать", href: navPaths.downloads },
  { label: "Новости", href: navPaths.news },
  { label: "Контакты", href: navPaths.contacts },
];
