export type MaterialTextureKey = "smooth" | "stone" | "sand";

export interface MaterialTexture {
  id: string;
  slug: string;
  key: MaterialTextureKey;
  name: string;
  shortDescription: string;
  description: string;
  properties: string[];
  recommendedUseCases: string[];
  relatedCollectionSlugs: string[];
  relatedProductSlugs: string[];
  image: {
    src: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
  };
}
