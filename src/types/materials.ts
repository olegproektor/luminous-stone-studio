export type MaterialTextureKey =
  | "smooth"
  | "stone"
  | "sand"
  | "natural-stone"
  | "composite"
  | "special-materials";

export type MaterialFamilySlug = "natural-stone" | "composite" | "special-materials";

export interface MaterialFinish {
  key: string;
  name: string;
  description: string;
  applicableTo: MaterialFamilySlug[];
}

export interface SpecialMaterialVariant {
  slug: string;
  name: string;
  description: string;
}

export interface MaterialFamily {
  id: string;
  slug: MaterialFamilySlug;
  name: string;
  tagline: string;
  summary: string;
  properties: string[];
  recommendedUseCases: string[];
  availableFinishes: MaterialFinish[];
  specialVariants: SpecialMaterialVariant[];
  customAvailable: boolean;
  legacySlugs?: string[];
  heroImage: {
    src: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

