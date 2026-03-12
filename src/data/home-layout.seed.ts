export type HomeSectionKey =
  | "hero"
  | "advantages"
  | "aboutProduct"
  | "collections"
  | "scenarios"
  | "featuredProducts"
  | "projects"
  | "materials"
  | "architects"
  | "process"
  | "custom"
  | "trust"
  | "faq"
  | "finalCta";

export const homeLayoutSeed = {
  title: "STŌN — Архитектурные уличные светильники из камня",
  description:
    "Болларды и светильники из литьевого камня для архитектурного ландшафта. Премиальное качество, российское производство.",
  featuredSections: ["collections", "featuredProducts", "projects"] as HomeSectionKey[],
  order: [
    "hero",
    "advantages",
    "aboutProduct",
    "collections",
    "scenarios",
    "featuredProducts",
    "projects",
    "materials",
    "architects",
    "process",
    "custom",
    "trust",
    "faq",
    "finalCta",
  ] as HomeSectionKey[],
} as const;
