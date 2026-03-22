import { schemaPathMap, type SchemaPageType } from "@/config/schema-map";

interface SchemaInput {
  pathname: string;
  title?: string;
  description?: string;
  canonical?: string;
}

function typeForPath(pathname: string): SchemaPageType {
  return schemaPathMap.find((item) => item.test.test(pathname))?.type ?? "website";
}

export function resolveSchema(input: SchemaInput): Record<string, unknown> {
  const schemaType = typeForPath(input.pathname);
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    name: input.title,
    description: input.description,
    url: input.canonical,
  };

  switch (schemaType) {
    case "organization":
      return {
        ...base,
        "@type": "Organization",
        name: "КАМЕНЬ И СВЕТ",
      };
    case "faq":
      return {
        ...base,
        "@type": "FAQPage",
      };
    case "collection":
      return {
        ...base,
        "@type": "CollectionPage",
      };
    case "product":
      return {
        ...base,
        "@type": "Product",
      };
    case "project":
      return {
        ...base,
        "@type": "CreativeWork",
      };
    case "download":
      return {
        ...base,
        "@type": "WebPage",
        about: "Downloads",
      };
    case "material":
      return {
        ...base,
        "@type": "WebPage",
        about: "Materials",
      };
    case "contact":
      return {
        ...base,
        "@type": "ContactPage",
      };
    default:
      return {
        ...base,
        "@type": "WebSite",
      };
  }
}
