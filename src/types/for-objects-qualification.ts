export interface ForObjectsQualificationPayload {
  name: string;
  phone: string;
  email: string;
  objectType: "hospitality" | "developer" | "private";
  budget?: string;
  timeline?: string;
  message?: string;
}
