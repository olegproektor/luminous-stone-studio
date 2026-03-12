import { routes } from "@/config/routes";

export const navPaths = {
  home: routes.home,
  company: routes.company,
  collections: routes.collections,
  products: routes.products,
  projects: routes.projects,
  downloads: routes.downloads,
  forObjects: routes.forObjects,
  materials: routes.materials,
  faq: routes.faq,
  contacts: routes.contacts,
  requestProject: routes.requestProject,
} as const;

export const buildPath = {
  collection: (slug: string) => routes.collectionDetail(slug),
  product: (slug: string) => routes.productDetail(slug),
  project: (slug: string) => routes.projectDetail(slug),
  texture: (slug: string) => routes.textureDetail(slug),
  downloadCategory: (category: string) => routes.downloadsCategory(category),
} as const;
