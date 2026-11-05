import type { FormAnalyticsEventName } from "@/types/form-events";

/**
 * Centralized analytics layer for the public site.
 * Primary web analytics target for this project is Yandex Metrika.
 *
 * Usage: trackEvent("form_submit", { form: "request_project", clientType: "architect" })
 */

type BaseAnalyticsEventName =
  | "list_view"
  | "detail_view"
  | "cta_click"
  | "page_view"
  | "product_view"
  | "project_view"
  | "article_view"
  | "download_pdf"
  | "download_intent"
  | "click_call"
  | "click_messenger"
  | "click_email"
  | "cookie_consent_accept"
  | "cookie_consent_reject";

export type AnalyticsEventName = BaseAnalyticsEventName | FormAnalyticsEventName;

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  params?: Record<string, string | number | boolean>;
  timestamp?: number;
}

type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    __METRIKA_ID__?: number | string;
  }
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  const metrikaId = import.meta.env.VITE_METRIKA_ID;
  if (!metrikaId) return;

  window.__METRIKA_ID__ = metrikaId;

  if (window.ym || document.getElementById("yandex-metrika-script")) {
    return;
  }

  const queue: unknown[][] = [];
  const ymStub = (...args: unknown[]) => {
    queue.push(args);
  };
  window.ym = ymStub;

  const script = document.createElement("script");
  script.id = "yandex-metrika-script";
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  script.onload = () => {
    if (!window.ym) return;

    const liveYm = window.ym;
    liveYm(Number(metrikaId), "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    } as never);

    queue.forEach((args) => liveYm(...args));
  };

  document.head.appendChild(script);
}

/**
 * Central tracking function.
 * In production, wire this to Yandex Metrika reachGoal / params.
 */
export function trackEvent(
  name: AnalyticsEventName,
  params?: AnalyticsParams
) {
  const event: AnalyticsEvent = {
    name,
    params,
    timestamp: Date.now(),
  };

  // Yandex Metrika integration
  if (typeof window !== "undefined" && window.ym) {
    const metrikaId = window.__METRIKA_ID__;
    if (metrikaId) {
      window.ym(metrikaId, "reachGoal", name, params || {});
    }
  }

  // Debug in development
  if (import.meta.env.DEV) {
    console.log("[Analytics]", name, params || "");
  }
}

/**
 * Track outbound link clicks (phone, email, messenger)
 */
export function trackClick(type: "call" | "messenger" | "email", target: string) {
  const eventMap = {
    call: "click_call" as const,
    messenger: "click_messenger" as const,
    email: "click_email" as const,
  };
  trackEvent(eventMap[type], { target });
}

/**
 * Goals map for Yandex Metrika / Yandex Direct
 *
 * Primary goals:
 *   request_project — qualified project lead
 *   architect_lead — architect-specific lead
 *
 * Secondary goals:
 *   request_price, request_consultation, request_catalog, request_custom
 *
 * Mid-funnel:
 *   download_pdf, form_start
 *
 * Micro-conversions:
 *   product_view, project_view, article_view, click_call, click_messenger
 */
export const GOALS_MAP = {
  primary: ["request_project", "architect_lead"],
  secondary: ["request_price", "request_consultation", "request_catalog", "request_custom"],
  midFunnel: ["download_pdf", "form_start", "form_submit_success", "form_submit_fail"],
  micro: ["product_view", "project_view", "article_view", "click_call", "click_messenger"],
} as const;
