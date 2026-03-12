import React from "react";
import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

/**
 * Sticky mobile CTA bar — appears on all pages on mobile.
 */
const StickyMobileCTA = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border px-4 py-3 flex gap-3">
      <Link
        to={navPaths.requestProject}
        className="flex-1 inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground py-3 hover:bg-charcoal-light transition-colors"
      >
        Запросить проект
      </Link>
      <a
        href="tel:+74951234567"
        className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-border text-foreground px-5 py-3 hover:bg-secondary transition-colors"
      >
        Позвонить
      </a>
    </div>
  );
});

StickyMobileCTA.displayName = "StickyMobileCTA";

export default StickyMobileCTA;
