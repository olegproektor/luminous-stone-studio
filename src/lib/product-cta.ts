import { productCtaMap, type ProductCtaConfig } from "@/config/product-cta-map";

export interface ProductCtaContext {
  productSlug: string;
  variantId?: string;
  audience?: "b2c" | "b2b";
}

export function resolveProductCta(context: ProductCtaContext): ProductCtaConfig {
  if (productCtaMap[context.productSlug]) return productCtaMap[context.productSlug];
  return productCtaMap.default;
}
