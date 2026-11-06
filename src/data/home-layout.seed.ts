export type HomeSectionKey = "hero" | "story" | "mosaic";

export const homeLayoutSeed = {
  title: "Форма Света — премиальные каменные световые решения для ландшафта и архитектуры",
  description:
    "Каменные светильники для частных и объектных пространств: тактильный материал, вечерний ритм и направление света под характер ландшафта и архитектуры.",
  featuredSections: ["mosaic"] as HomeSectionKey[],
  order: ["hero", "story", "mosaic"] as HomeSectionKey[],
} as const;
