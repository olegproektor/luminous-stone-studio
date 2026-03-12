import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { analyticsEventMap } from "@/config/analytics-event-map";

interface UseAnalyticsViewOptions {
  type: "list" | "detail";
  entity: "collection" | "product" | "project";
  slug?: string;
}

export function useAnalyticsView(options: UseAnalyticsViewOptions) {
  useEffect(() => {
    const eventName = options.type === "list" ? analyticsEventMap.listView : analyticsEventMap.detailView;
    trackEvent(eventName, {
      entity: options.entity,
      slug: options.slug ?? "index",
    });
  }, [options.type, options.entity, options.slug]);
}
