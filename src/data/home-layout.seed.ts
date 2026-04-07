export type HomeSectionKey = "hero" | "story" | "mosaic" | "finalCta";

export const homeLayoutSeed = {
  title: "Форма Света — премиальные каменные световые решения для ландшафта и архитектуры",
  description:
    "Премиальные световые решения из камня для частных и объектных пространств российского рынка: подбор коллекций, материалов и сценариев применения под архитектурный проект.",
  featuredSections: ["mosaic"] as HomeSectionKey[],
  order: ["hero", "story", "mosaic", "finalCta"] as HomeSectionKey[],
} as const;
