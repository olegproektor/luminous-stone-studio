// =============================================
// Core data models for the STŌN brand website
// CMS-ready: all types mirror future CMS schemas
// =============================================
import type { ProductTechGroup, ProductTechGroupId } from "./product-tech";
import type { ProductTaxonomyState } from "./taxonomy";
import type { DownloadAccessMode, DownloadCategorySlug, DownloadFileGovernance, DownloadTargetSegment } from "./downloads";
import type { MaterialTextureKey } from "./materials";

// ---- Common ----

export interface SeoFields {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
}

// ---- Product ----

export type ProductCategory =
  | "bollard"
  | "garden-light"
  | "accent-light"
  | "small-form"
  | "custom";

export type TextureType = "smooth" | "stone";
export type MountingType = "surface" | "embedded";
export type PowerType = "220v" | "12v";

export interface ProductVariant {
  id: string;
  height: number; // mm
  texture: TextureType;
  color: string;
  colorHex: string;
  mounting: MountingType;
  power: PowerType;
  sku: string;
  price?: number; // ₽, undefined = "по запросу"
  inStock: boolean;
  wattage?: string;
  lumen?: string;
  voltage?: string;
  beamAngle?: string;
  cct?: string;
  leadTimeDays?: number;
}

export interface ProductSpec {
  key?: string;
  label: string;
  value: string;
  unit?: string;
  group?: ProductTechGroupId;
  priority?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  variants: ProductVariant[];
  images: ImageAsset[];
  nightImages: ImageAsset[];
  environmentImages: ImageAsset[];
  materials: string[];
  ipRating: string;
  lightTemp: string; // e.g. "3000K"
  pdfSpec?: string;
  relatedProductIds: string[];
  useCases: string[];
  techGroups?: ProductTechGroup[];
  taxonomy?: Partial<ProductTaxonomyState>;
  seo: SeoFields;
  createdAt: string;
  launchTier?: "primary" | "secondary";
  isHidden?: boolean;
  collectionSlug?: string;
  textureSlugs?: MaterialTextureKey[];
}

// ---- Collection ----

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: ImageAsset;
  productIds: string[];
  seo: SeoFields;
  launchTier?: "primary" | "secondary";
  isHidden?: boolean;
  textureSlugs?: MaterialTextureKey[];
}

// ---- Project / Case Study ----

export type ProjectType =
  | "private-house"
  | "glamping"
  | "hotel"
  | "restaurant"
  | "public-space"
  | "residential-complex";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  projectType: ProjectType;
  region: string;
  year: number;
  challenge: string;
  solution: string;
  result: string;
  products: string[]; // product IDs
  productSlugs?: string[];
  collectionSlugs?: string[];
  materialSlugs?: string[];
  gallery: ImageAsset[];
  coverImage: ImageAsset;
  seo: SeoFields;
}

// ---- Blog / Article ----

export type ArticleCategory =
  | "landscape-lighting"
  | "bollards"
  | "stone-lights"
  | "composite"
  | "mounting"
  | "outdoor-lighting"
  | "glamping-solutions"
  | "mistakes"
  | "styles-and-scenarios";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown or rich text
  category: ArticleCategory;
  coverImage: ImageAsset;
  author: string;
  publishedAt: string;
  readingTime: number; // minutes
  relatedArticleIds: string[];
  seo: SeoFields;
}

// ---- FAQ ----

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

// ---- Material ----

export interface Material {
  id: string;
  slug: string;
  name: string;
  description: string;
  properties: string[];
  image?: ImageAsset;
}

// ---- Download / Tech File ----

export interface DownloadFile {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: "pdf" | "dwg" | "3d" | "image";
  category: "catalog" | "techsheet" | "drawing" | "certificate";
  productId?: string;
  slug?: string;
  categorySlug?: DownloadCategorySlug;
  accessMode?: DownloadAccessMode;
  targetSegment?: DownloadTargetSegment;
  governance?: DownloadFileGovernance;
  collectionSlug?: string;
  productSlug?: string;
}

// ---- Lead Form ----

export type ClientType =
  | "private"
  | "architect"
  | "glamping-hotel"
  | "developer"
  | "other";

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  clientType: ClientType;
  city?: string;
  objectType?: string;
  message?: string;
  categories?: ProductCategory[];
  budget?: string;
  file?: File;
  consentGiven: boolean;
  source: string;
  utmParams?: Record<string, string>;
}

// ---- Region Page ----

export interface RegionPage {
  id: string;
  slug: string;
  regionName: string;
  title: string;
  description: string;
  seo: SeoFields;
}

// ---- Navigation ----

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
