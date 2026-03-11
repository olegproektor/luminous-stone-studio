/**
 * Analytics event system for STŌN
 * Centralized event tracking — ready for Yandex Metrika, GTM, CRM
 *
 * Usage: trackEvent("form_submit", { form: "request_project", clientType: "architect" })
 */

export type AnalyticsEventName =
  | "page_view"
  | "product_view"
  | "project_view"
  | "article_view"
  | "download_pdf"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "click_call"
  | "click_messenger"
  | "click_email"
  | "request_project"
  | "request_price"
  | "request_consultation"
  | "request_catalog"
  | "request_custom"
  | "architect_lead"
  | "cookie_consent_accept"
  | "cookie_consent_reject";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  params?: Record<string, string | number | boolean>;
  timestamp?: number;
}

type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    ym?: (
      metrikaId: number | string,
      action: "reachGoal",
      goal: AnalyticsEventName,
      params: AnalyticsParams
    ) => void;
    __METRIKA_ID__?: number | string;
  }
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
  midFunnel: ["download_pdf", "form_start"],
  micro: ["product_view", "project_view", "article_view", "click_call", "click_messenger"],
} as const;
