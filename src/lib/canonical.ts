import { legacyToCanonical, routes } from "@/config/routes";

function toCanonicalPath(pathname: string): string {
  if (pathname === routes.productsLegacy) return routes.products;
  if (pathname.startsWith(`${routes.productsLegacy}/`)) {
    return pathname.replace(routes.productsLegacy, routes.products);
  }

  if (pathname === routes.aboutLegacy) return routes.company;
  if (pathname === routes.downloadsLegacy) return routes.downloads;
  if (pathname === routes.forObjectsLegacy) return routes.forObjects;
  if (pathname.startsWith(`${routes.materials}/`) && pathname.split("/").length > 2) {
    return pathname.replace(`${routes.materials}/`, "/texture/");
  }

  const direct = legacyToCanonical[pathname as keyof typeof legacyToCanonical];
  return direct ?? pathname;
}

export function resolveCanonicalUrl(pathname: string, explicitCanonical?: string): string | undefined {
  if (explicitCanonical) return explicitCanonical;
  if (typeof window === "undefined") return undefined;

  const canonicalPath = toCanonicalPath(pathname);
  return `${window.location.origin}${canonicalPath}`;
}
