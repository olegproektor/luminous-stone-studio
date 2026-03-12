export const routes = {
  home: "/",
  company: "/company",
  aboutLegacy: "/about",
  collections: "/collections",
  collectionDetail: (slug: string) => `/collections/${slug}`,
  products: "/products",
  productsLegacy: "/catalog",
  productDetail: (slug: string) => `/products/${slug}`,
  productDetailLegacy: (slug: string) => `/catalog/${slug}`,
  projects: "/projects",
  projectDetail: (slug: string) => `/projects/${slug}`,
  downloads: "/downloads",
  downloadsLegacy: "/for-architects",
  faq: "/faq",
  contacts: "/contacts",
  requestProject: "/request-project",
  materials: "/materials",
  privacy: "/privacy",
  cookies: "/cookies",
  consent: "/consent",
  terms: "/terms",
} as const;

export const legacyToCanonical = {
  "/catalog": routes.products,
  "/about": routes.company,
  "/for-architects": routes.downloads,
} as const;
