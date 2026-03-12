export type FormDeliveryMode = "mock" | "live";

export type FormKind =
  | "contact_general"
  | "request_project"
  | "request_price"
  | "request_catalog"
  | "request_consultation"
  | "request_custom"
  | "architect_lead"
  | "download_gate";

export interface FormDeliveryPayload {
  formId: FormKind;
  data: Record<string, string>;
}

export interface FormDeliveryResult {
  ok: boolean;
  status: number;
  message: string;
  externalDependency?: boolean;
}
