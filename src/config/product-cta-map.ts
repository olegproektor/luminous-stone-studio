import { navPaths } from "@/lib/route-helpers";

export interface ProductCtaConfig {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export const productCtaMap: Record<string, ProductCtaConfig> = {
  default: {
    primary: { label: "Запросить цену", href: "#request-price" },
    secondary: { label: "Запросить проект", href: navPaths.requestProject },
  },
  "bollard-600-natural-stone": {
    primary: { label: "Запросить спецификацию", href: "#request-price" },
    secondary: { label: "Связаться с экспертом", href: navPaths.contacts },
  },
};
