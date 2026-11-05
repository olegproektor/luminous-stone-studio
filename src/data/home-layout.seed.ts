export type HomeSectionKey = "hero" | "story" | "mosaic";

export const homeLayoutSeed = {
  title: "Форма Света — премиальные каменные световые решения для ландшафта и архитектуры",
  description:
    "Каменные световые решения для частных и объектных пространств: коллекции, материалы и сценарии света, собранные под архитектуру участка и проектную задачу.",
  featuredSections: ["mosaic"] as HomeSectionKey[],
  order: ["hero", "story", "mosaic"] as HomeSectionKey[],
} as const;
