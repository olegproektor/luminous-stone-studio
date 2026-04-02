import type { Collection, Product, Project } from "@/types";

export interface MetadataShape {
  title: string;
  description: string;
}

export const metadataMap = {
  collectionsIndex: {
    title: "Коллекции — Форма Света",
    description: "Коллекции архитектурных световых решений для ландшафта, частных и объектных пространств.",
  },
  productsIndex: {
    title: "Изделия — Форма Света",
    description: "Изделия и световые решения для дорожек, входных групп и архитектурных ландшафтов.",
  },
  projectsIndex: {
    title: "Проекты — Форма Света",
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
