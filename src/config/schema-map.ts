export type SchemaPageType = "website" | "organization" | "faq" | "collection" | "product" | "project" | "download" | "material" | "contact";

export const schemaPathMap: Array<{ test: RegExp; type: SchemaPageType }> = [
  { test: /^\/$/, type: "website" },
  { test: /^\/company$/, type: "organization" },
  { test: /^\/faq$/, type: "faq" },
  { test: /^\/collections(\/[^/]+)?$/, type: "collection" },
  { test: /^\/(products|catalog)(\/[^/]+)?$/, type: "product" },
  { test: /^\/projects(\/[^/]+)?$/, type: "project" },
  { test: /^\/downloads(\/[^/]+)?$/, type: "download" },
  { test: /^\/(materials|texture\/[^/]+)$/, type: "material" },
  { test: /^\/contacts$/, type: "contact" },
];
