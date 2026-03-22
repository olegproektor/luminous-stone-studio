export const routes = {
  home: "/",
  // Canonical IA (Phase 1A)
  products: "/izdeliya",
  collectionVozduh: "/izdeliya/vozduh",
  collectionZemlya: "/izdeliya/zemlya",
  collectionMaya: "/izdeliya/maya",
  collectionProductFeya: "/izdeliya/vozduh/feya",
  collectionProductMengir: "/izdeliya/vozduh/mengir",
  collectionProductFokus: "/izdeliya/zemlya/fokus",
  collectionProductMayak: "/izdeliya/zemlya/mayak",
  collectionProduct: (collectionSlug: string, productSlug: string) =>
    `/izdeliya/${collectionSlug}/${productSlug}`,
  materials: "/izdeliya/faktura",
  textureDetailPattern: "/izdeliya/faktura/:slug",
  textureDetail: (slug: string) => `/izdeliya/faktura/${slug}`,
  forObjects: "/komplekty",
  projects: "/proekty",
  projectDetailPattern: "/proekty/:slug",
  projectDetail: (slug: string) => `/proekty/${slug}`,
  faq: "/voprosy",
  downloads: "/skachat",
  downloadsCategoryPattern: "/skachat/:category",
  downloadsCategory: (category: string) => `/skachat/${category}`,
  news: "/novosti",
  newsDetailPattern: "/novosti/:slug",
  newsDetail: (slug: string) => `/novosti/${slug}`,
  contacts: "/kontakty",
  company: "/company",

  // Product detail stays stable in Phase 1A
  productsDetailPattern: "/products/:slug",
  productDetail: (slug: string) => `/products/${slug}`,
  productsDetailLegacyPattern: "/catalog/:slug",
  productDetailLegacy: (slug: string) => `/catalog/${slug}`,

  // Aliases / legacy compatibility
  aboutLegacy: "/about",
  collections: "/collections",
  collectionsDetailPattern: "/collections/:slug",
  collectionDetail: (slug: string) => `/collections/${slug}`,
  productsLegacy: "/products",
  productsCatalogLegacy: "/catalog",
  projectsLegacy: "/projects",
  projectDetailLegacyPattern: "/projects/:slug",
  projectDetailLegacy: (slug: string) => `/projects/${slug}`,
  faqLegacy: "/faq",
  downloadsLegacy: "/downloads",
  downloadsCategoryLegacyPattern: "/downloads/:category",
  downloadsArchitectLegacy: "/for-architects",
  forObjectsLegacy: "/for-objects",
  forObjectsCustomLegacy: "/custom",
  contactsLegacy: "/contacts",
  newsLegacy: "/blog",
  newsDetailLegacyPattern: "/blog/:slug",
  materialsLegacy: "/materials",
  textureDetailLegacyPattern: "/texture/:slug",
  materialsDetailLegacyPattern: "/materials/:slug",

  // System / legal
  requestProject: "/request-project",
  privacy: "/privacy",
  cookies: "/cookies",
  consent: "/consent",
  terms: "/terms",
} as const;

export const canonicalCollectionSlugMap = {
  "bollards-core": "vozduh",
  "ston-classic": "vozduh",
  "ston-texture": "zemlya",
  "lira-garden": "maya",
  vozduh: "vozduh",
  zemlya: "zemlya",
  maya: "maya",
} as const;

export const canonicalCollectionToDataSlug = {
  vozduh: "bollards-core",
  zemlya: "ston-texture",
  maya: "lira-garden",
} as const;

export function resolveCanonicalCollectionSlug(slug: string): "vozduh" | "zemlya" | "maya" | undefined {
  return canonicalCollectionSlugMap[slug as keyof typeof canonicalCollectionSlugMap];
}

export function resolveCollectionDataSlug(slug: string): string | undefined {
  const canonical = resolveCanonicalCollectionSlug(slug);
  if (!canonical) return undefined;
  return canonicalCollectionToDataSlug[canonical];
}

export const legacyToCanonical = {
  "/products": routes.products,
  "/catalog": routes.products,
  "/collections": routes.products,
  "/materials": routes.materials,
  "/for-objects": routes.forObjects,
  "/custom": routes.forObjects,
  "/projects": routes.projects,
  "/faq": routes.faq,
  "/downloads": routes.downloads,
  "/for-architects": routes.downloads,
  "/blog": routes.news,
  "/contacts": routes.contacts,
  "/about": routes.company,
} as const;

export const nestedProductPathBySlug = {
  feya: routes.collectionProductFeya,
  mengir: routes.collectionProductMengir,
  fokus: routes.collectionProductFokus,
  mayak: routes.collectionProductMayak,
} as const;

export function resolveNestedProductPathBySlug(slug: string): string | undefined {
  return nestedProductPathBySlug[slug as keyof typeof nestedProductPathBySlug];
}
