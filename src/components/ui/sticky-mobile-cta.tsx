import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navPaths } from "@/lib/route-helpers";
import { shouldShowStickyCta } from "@/lib/sticky-cta-policy";
import { trackClick, trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "ston_cookie_consent";

const StickyMobileCTA = React.forwardRef<HTMLDivElement>((_, ref) => {
  const location = useLocation();
  const consentPending = typeof window !== "undefined" && !window.localStorage.getItem(CONSENT_KEY);
  const visible = shouldShowStickyCta(location.pathname, Boolean(consentPending));

  if (!visible) return null;

  return (
    <div ref={ref} className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 border-t border-border bg-background px-4 py-3 lg:hidden">
      <Button asChild variant="sitePrimary" size="site" className="flex-1">
        <Link
          to={navPaths.forObjects}
          onClick={() => trackEvent("cta_click", { source: "sticky_mobile", target: "for_objects" })}
        >
          Для объектов
        </Link>
      </Button>
      <Button asChild variant="siteOutline" size="site">
        <a href="tel:+74951234567" onClick={() => trackClick("call", "+74951234567")}>
          Позвонить
        </a>
      </Button>
    </div>
  );
});

StickyMobileCTA.displayName = "StickyMobileCTA";

export default StickyMobileCTA;
