export type ProductTechGroupId =
  | "electrical"
  | "optical"
  | "material"
  | "mounting"
  | "compliance";

export interface ProductTechSpec {
  key: string;
  label: string;
  value: string;
  unit?: string;
  priority?: number;
}

export interface ProductTechGroup {
  id: ProductTechGroupId;
  label: string;
  specs: ProductTechSpec[];
}
