import type { FormAnalyticsEventName } from "@/types/form-events";
import type { FormKind } from "@/types/form-delivery";

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
  formId: FormKind;
  submitLabel: string;
  analyticsEvent: FormAnalyticsEventName;
  fields: LeadFormField[];
}
