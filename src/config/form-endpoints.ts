import type { FormDeliveryMode, FormKind } from "@/types/form-delivery";

const configuredMode = import.meta.env.VITE_FORM_DELIVERY_MODE as FormDeliveryMode | undefined;

export const formDeliveryMode: FormDeliveryMode =
  configuredMode ?? (import.meta.env.DEV ? "mock" : "live");

export const formEndpoints: Partial<Record<FormKind, string>> = {
  contact_general: import.meta.env.VITE_FORM_ENDPOINT_CONTACT,
  request_project: import.meta.env.VITE_FORM_ENDPOINT_PROJECT,
  request_price: import.meta.env.VITE_FORM_ENDPOINT_PRICE,
  request_catalog: import.meta.env.VITE_FORM_ENDPOINT_CATALOG,
  request_consultation: import.meta.env.VITE_FORM_ENDPOINT_CONSULTATION,
  request_custom: import.meta.env.VITE_FORM_ENDPOINT_CUSTOM,
  architect_lead: import.meta.env.VITE_FORM_ENDPOINT_ARCHITECT,
  download_gate: import.meta.env.VITE_FORM_ENDPOINT_DOWNLOAD_GATE,
};

export function isProductionMockMode() {
  return import.meta.env.PROD && formDeliveryMode === "mock";
}
