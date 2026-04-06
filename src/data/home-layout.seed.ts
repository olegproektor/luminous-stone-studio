export type HomeSectionKey = "hero" | "story" | "mosaic" | "finalCta";

export const homeLayoutSeed = {
  title: "Форма Света — каменные светильники для ландшафта",
  description:
    "Каменные светильники для частных садов, дворов, глэмпингов и курортных территорий. Световые решения для открытых пространств из натурального и литьевого камня.",
  featuredSections: ["mosaic"] as HomeSectionKey[],
  order: ["hero", "story", "mosaic", "finalCta"] as HomeSectionKey[],
} as const;
