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
      { label: "Воздух", href: buildPath.collection("vozduh"), description: "Мягкая навигация в пространстве" },
      { label: "Земля", href: buildPath.collection("zemlya"), description: "Акцент на материале и рельефе" },
      { label: "Майа", href: buildPath.collection("maya"), description: "Новые акценты в пространстве" },
      { label: "Фактура", href: navPaths.materials, description: "Материал как часть сценария" },
    ],
  },
  { label: "Комплекты", href: navPaths.forObjects },
  { label: "Проекты", href: navPaths.projects },
  { label: "Вопросы", href: navPaths.faq },
  {
    label: "Скачать",
    href: navPaths.downloads,
    children: [
      {
        label: "Каталоги",
        href: buildPath.downloadCategory("catalogue"),
        description: "PDF-материалы по решениям и коллекциям",
      },
      {
        label: "BIM и 3D",
        href: buildPath.downloadCategory("bim"),
        description: "Материалы для проектирования и координации",
      },
      {
        label: "Техническая поддержка",
        href: buildPath.downloadCategory("support"),
        description: "Видео по подключению, монтажу и обслуживанию",
      },
    ],
  },
  { label: "Новости", href: navPaths.news },
  { label: "Контакты", href: navPaths.contacts },
];
