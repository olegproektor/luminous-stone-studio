export type HomeSectionKey =
  | "hero"
  | "advantages"
  | "collections"
  | "projects"
  | "materials"
  | "architects"
  | "process"
  | "finalCta";

export const homeLayoutSeed = {
  title: "Форма Света — архитектурные световые решения для ландшафта",
  description:
    "Создаём световые решения для частных и архитектурных пространств. Помогаем определить сценарий света и подобрать решение под конкретную задачу.",
  featuredSections: ["collections", "projects", "materials"] as HomeSectionKey[],
  order: [
    "hero",
    "advantages",
    "collections",
    "projects",
    "materials",
    "architects",
    "process",
    "finalCta",
  ] as HomeSectionKey[],
} as const;
