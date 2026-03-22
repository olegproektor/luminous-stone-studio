import type { Collection, Product, Project } from "@/types";

export interface MetadataShape {
  title: string;
  description: string;
}

export const metadataMap = {
  collectionsIndex: {
    title: "Коллекции — STŌN",
    description: "Коллекции архитектурных уличных светильников из литьевого камня и композита.",
  },
  productsIndex: {
    title: "Изделия — STŌN",
    description: "Изделия STŌN: болларды и архитектурные уличные светильники из камня.",
  },
  projectsIndex: {
    title: "Проекты — STŌN",
    description: "Реализованные проекты ландшафтного освещения: частные дома, глэмпинги, отели, общественные пространства.",
  },
} as const;

export function metadataForCollectionDetail(collection: Collection): MetadataShape {
  return {
    title: collection.seo.title,
    description: collection.seo.description,
  };
}

export function metadataForProductDetail(product: Product): MetadataShape {
  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

export function metadataForProjectDetail(project: Project): MetadataShape {
  return {
    title: project.seo.title,
    description: project.seo.description,
  };
}
