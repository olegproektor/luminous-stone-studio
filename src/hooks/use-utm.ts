import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  yclid?: string;
  gclid?: string;
  fbclid?: string;
  [key: string]: string | undefined;
}

const UTM_STORAGE_KEY = "ston_utm";

/**
 * Captures UTM params from URL on first visit and persists them.
 */
export function useUTM(): UTMParams {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "yclid", "gclid", "fbclid"];

    const hasUTM = utmKeys.some((key) => params.has(key));
    if (hasUTM) {
      const utm: UTMParams = {};
      utmKeys.forEach((key) => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      try {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
      } catch {
        // Ignore storage errors
      }
    }
  }, [location.search]);

  return useMemo(() => {
    try {
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, []);
}
