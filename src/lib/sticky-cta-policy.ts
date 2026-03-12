const STICKY_HIDDEN_PATHS = new Set([
  "/contacts",
  "/request-project",
  "/for-objects",
  "/downloads/bim",
]);

export function shouldShowStickyCta(pathname: string, hasPendingCookieConsent: boolean): boolean {
  if (hasPendingCookieConsent) return false;
  if (STICKY_HIDDEN_PATHS.has(pathname)) return false;
  return true;
}
