import { routes } from "@/config/routes";

const STICKY_HIDDEN_PATHS = new Set([
  routes.contacts,
  routes.contactsLegacy,
  routes.requestProject,
  routes.forObjects,
  routes.forObjectsLegacy,
  routes.forObjectsCustomLegacy,
  routes.downloadsCategory("bim"),
  "/downloads/bim",
]);

export function shouldShowStickyCta(pathname: string, hasPendingCookieConsent: boolean): boolean {
  if (hasPendingCookieConsent) return false;
  if (STICKY_HIDDEN_PATHS.has(pathname)) return false;
  return true;
}
