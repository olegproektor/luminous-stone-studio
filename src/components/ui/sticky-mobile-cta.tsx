import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";
import { shouldShowStickyCta } from "@/lib/sticky-cta-policy";
import { trackClick, trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "ston_cookie_consent";

/**
 * Sticky mobile CTA bar — appears on all pages on mobile.
 */
const StickyMobileCTA = React.forwardRef<HTMLDivElement>((_, ref) => {
  const location = useLocation();
  const consentPending =
    typeof window !== "undefined" && !window.localStorage.getItem(CONSENT_KEY);
  const visible = shouldShowStickyCta(location.pathname, Boolean(consentPending));

  if (!visible) return null;

  return (
    <div ref={ref} className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border px-4 py-3 flex gap-3">
      <Link
        to={navPaths.forObjects}
        onClick={() => trackEvent("cta_click", { source: "sticky_mobile", target: "for_objects" })}
        className="flex-1 inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground py-3 hover:bg-charcoal-light transition-colors"
      >
        Для объектов
      </Link>
      <a
        href="tel:+74951234567"
        onClick={() => trackClick("call", "+74951234567")}
        className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-border text-foreground px-5 py-3 hover:bg-secondary transition-colors"
      >
        Позвонить
      </a>
    </div>
  );
});

StickyMobileCTA.displayName = "StickyMobileCTA";

export default StickyMobileCTA;
