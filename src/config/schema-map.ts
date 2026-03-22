export type SchemaPageType = "website" | "organization" | "faq" | "collection" | "product" | "project" | "download" | "material" | "contact";

export const schemaPathMap: Array<{ test: RegExp; type: SchemaPageType }> = [
  { test: /^\/$/, type: "website" },
  { test: /^\/(company|about)$/, type: "organization" },
  { test: /^\/(voprosy|faq)$/, type: "faq" },
  { test: /^\/(izdeliya\/(vozduh|zemlya|maya)|collections\/[^/]+)$/, type: "collection" },
  { test: /^\/izdeliya\/(vozduh|zemlya)\/[^/]+$/, type: "product" },
  { test: /^\/(izdeliya|products|catalog(\/[^/]+)?)$/, type: "product" },
  { test: /^\/(proekty|projects)(\/[^/]+)?$/, type: "project" },
  { test: /^\/(skachat|downloads)(\/[^/]+)?$|^\/for-architects$/, type: "download" },
  { test: /^\/(izdeliya\/faktura(\/[^/]+)?|materials|texture\/[^/]+)$/, type: "material" },
  { test: /^\/(kontakty|contacts)$/, type: "contact" },
];
