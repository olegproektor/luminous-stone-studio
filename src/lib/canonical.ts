import {
  legacyToCanonical,
  resolveCanonicalCollectionSlug,
  routes,
} from "@/config/routes";

function toCanonicalPath(pathname: string): string {
  if (pathname === routes.productsLegacy || pathname === routes.productsCatalogLegacy || pathname === routes.collections) {
    return routes.products;
  }
  if (pathname.startsWith("/catalog/")) {
    const slug = pathname.split("/")[2];
    return slug ? routes.productDetail(slug) : routes.products;
  }

  if (pathname.startsWith(`${routes.collections}/`)) {
    const slug = pathname.split("/")[2];
    const canonicalSlug = slug ? resolveCanonicalCollectionSlug(slug) : undefined;
    return canonicalSlug ? `${routes.products}/${canonicalSlug}` : routes.products;
  }

  if (pathname === routes.materialsLegacy) return routes.materials;
  if (pathname.startsWith("/texture/")) {
    const slug = pathname.split("/")[2];
    return slug ? routes.textureDetail(slug) : routes.materials;
  }
  if (pathname.startsWith("/materials/")) {
    const slug = pathname.split("/")[2];
    return slug ? routes.textureDetail(slug) : routes.materials;
  }

  if (pathname === routes.forObjectsLegacy || pathname === routes.forObjectsCustomLegacy) return routes.forObjects;

  if (pathname === routes.projectsLegacy) return routes.projects;
  if (pathname.startsWith(`${routes.projectsLegacy}/`)) {
    return pathname.replace(routes.projectsLegacy, routes.projects);
  }

  if (pathname === routes.faqLegacy) return routes.faq;

  if (pathname === routes.downloadsLegacy || pathname === routes.downloadsArchitectLegacy) return routes.downloads;
  if (pathname.startsWith(`${routes.downloadsLegacy}/`)) {
    return pathname.replace(routes.downloadsLegacy, routes.downloads);
  }

  if (pathname === routes.newsLegacy) return routes.news;
  if (pathname.startsWith(`${routes.newsLegacy}/`)) {
    return pathname.replace(routes.newsLegacy, routes.news);
  }

  if (pathname === routes.contactsLegacy) return routes.contacts;
  if (pathname === routes.aboutLegacy) return routes.company;

  const direct = legacyToCanonical[pathname as keyof typeof legacyToCanonical];
  return direct ?? pathname;
}

export function resolveCanonicalUrl(pathname: string, explicitCanonical?: string): string | undefined {
  if (explicitCanonical) return explicitCanonical;
  if (typeof window === "undefined") return undefined;

  const canonicalPath = toCanonicalPath(pathname);
  return `${window.location.origin}${canonicalPath}`;
}
