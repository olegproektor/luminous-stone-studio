import type { FormAnalyticsEventName } from "@/types/form-events";

export type LeadFieldType = "text" | "email" | "tel" | "textarea" | "select";

export interface LeadFieldOption {
  value: string;
  label: string;
}

export interface LeadFormField {
  name: string;
  label: string;
  type: LeadFieldType;
  required?: boolean;
  placeholder?: string;
  options?: LeadFieldOption[];
  half?: boolean;
}

export interface LeadFormPreset {
  formId: string;
  submitLabel: string;
  analyticsEvent: FormAnalyticsEventName;
  fields: LeadFormField[];
}
