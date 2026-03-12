export type TaxonomyKind =
  | "category"
  | "application"
  | "material"
  | "ip"
  | "price-band";

export interface TaxonomyOption {
  slug: string;
  label: string;
  description?: string;
}

export interface TaxonomyBucket {
  kind: TaxonomyKind;
  options: TaxonomyOption[];
}

export interface ProductTaxonomyState {
  category: string;
  application: string;
  material: string;
  ip: string;
  priceBand: string;
}
