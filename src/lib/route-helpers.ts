import { resolveCanonicalCollectionSlug, resolveNestedProductPathBySlug, routes } from "@/config/routes";

export const navPaths = {
  home: routes.home,
  company: routes.company,
  collections: routes.products,
  products: routes.products,
  projects: routes.projects,
  downloads: routes.downloads,
  forObjects: routes.forObjects,
  materials: routes.materials,
  faq: routes.faq,
  news: routes.news,
  contacts: routes.contacts,
  requestProject: routes.requestProject,
} as const;

export const buildPath = {
  collection: (slug: string) => {
    const canonical = resolveCanonicalCollectionSlug(slug);
    return canonical ? `${routes.products}/${canonical}` : routes.products;
  },
  product: (slug: string) => resolveNestedProductPathBySlug(slug) ?? routes.productDetail(slug),
  collectionProduct: (collectionSlug: string, productSlug: string) =>
    routes.collectionProduct(collectionSlug, productSlug),
  project: (slug: string) => routes.projectDetail(slug),
  texture: (slug: string) => routes.textureDetail(slug),
  downloadCategory: (category: string) => routes.downloadsCategory(category),
} as const;
