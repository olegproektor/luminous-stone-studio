export const formEventNames = [
  "form_start",
  "form_submit",
  "form_submit_success",
  "form_submit_fail",
  "form_error",
  "request_project",
  "request_price",
  "request_consultation",
  "request_catalog",
  "request_custom",
  "architect_lead",
] as const;

export type FormAnalyticsEventName = (typeof formEventNames)[number];
