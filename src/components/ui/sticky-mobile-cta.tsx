import React from "react";
import { useLocation } from "react-router-dom";
import TrackedCta from "@/components/TrackedCta";
import { siteStrategy } from "@/config/site-strategy";
import { shouldShowStickyCta } from "@/lib/sticky-cta-policy";
import { trackClick } from "@/lib/analytics";

const CONSENT_KEY = "ston_cookie_consent";

const StickyMobileCTA = React.forwardRef<HTMLDivElement>((_, ref) => {
  const location = useLocation();
  const consentPending = typeof window !== "undefined" && !window.localStorage.getItem(CONSENT_KEY);
  const visible = shouldShowStickyCta(location.pathname, Boolean(consentPending));

  if (!visible) return null;

  return (
    <div ref={ref} className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 border-t border-border bg-background px-4 py-3 lg:hidden">
      <TrackedCta
        href={siteStrategy.primaryConversion.href}
        label={siteStrategy.primaryConversion.label}
        context="sticky_mobile_primary"
        variant="sitePrimary"
        size="site"
        className="flex-1"
        eventParams={{ source: "sticky_mobile" }}
      />
      <TrackedCta
        href={siteStrategy.secondaryCtas.forObjects.href}
        label={siteStrategy.secondaryCtas.forObjects.label}
        context="sticky_mobile_secondary"
        variant="siteOutline"
        size="site"
        eventParams={{ source: "sticky_mobile" }}
      />
      <a
        href="tel:+74951234567"
        onClick={() => trackClick("call", "+74951234567")}
        className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-border bg-transparent px-5 py-3 text-xs font-body font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-[hsl(var(--bg-surface))]"
      >
        Позвонить
      </a>
    </div>
  );
});

StickyMobileCTA.displayName = "StickyMobileCTA";

export default StickyMobileCTA;
