import { readFileSync, writeFileSync } from "node:fs";
import { sitemapConfig } from "./sitemap.config.mjs";

const now = new Date().toISOString();

const staticPaths = [
  "/",
  "/izdeliya",
  "/izdeliya/faktura",
  "/komplekty",
  "/proekty",
  "/voprosy",
  "/skachat",
  "/novosti",
  "/kontakty",
  "/company",
];

function readSource(path) {
  return readFileSync(path, "utf8");
}

function extractObjectStatuses(source, objectName) {
  const objectMatch = source.match(new RegExp(`const ${objectName}: Record<[^>]+> = \\{([\\s\\S]*?)\\};`));
  if (!objectMatch) return new Map();

  return new Map(
    Array.from(objectMatch[1].matchAll(/([a-z-]+):\s*"([^"]+)"/g)).map(([, slug, status]) => [slug, status]),
  );
}

function extractCollectionSlugs(statusMap) {
  return Array.from(statusMap.entries())
    .filter(([, status]) => status !== "draft")
    .map(([slug]) => `/izdeliya/${slug}`);
}

function extractProductPaths(productSource, statusMap) {
  const productsSectionMatch = productSource.match(/export const izdeliyaProductsSeed:[\s\S]*?=\s*\[([\s\S]*?)\];/);
  const productsSection = productsSectionMatch ? productsSectionMatch[1] : productSource;
  const matches = Array.from(
    productsSection.matchAll(/slug:\s*"([a-z-]+)"[\s\S]*?collectionSlug:\s*"([a-z-]+)"/g),
  );

  return matches
    .filter(([, slug]) => statusMap.get(slug) === "active")
    .map(([, slug, collectionSlug]) => `/izdeliya/${collectionSlug}/${slug}`);
}

function extractTopLevelSlugs(source) {
  return Array.from(source.matchAll(/\bslug:\s*"([^"]+)"/g)).map(([, slug]) => slug);
}

function extractTextureSlugs(source) {
  return Array.from(source.matchAll(/id:\s*"mat-[^"]+"[\s\S]*?slug:\s*"([^"]+)"/g)).map(([, slug]) => slug);
}

function extractDownloadCategorySlugs(source) {
  return Array.from(source.matchAll(/id:\s*"dl-cat-[^"]+"[\s\S]*?slug:\s*"([^"]+)"/g)).map(([, slug]) => slug);
}

const catalogStateSource = readSource("src/data/public-catalog-state.ts");
const izdeliyaSource = readSource("src/data/izdeliya-architecture.seed.ts");
const projectsSource = readSource("src/data/projects.ts");
const articlesSource = readSource("src/data/articles.ts");
const materialsSource = readSource("src/data/materials-texture.seed.ts");
const downloadsSource = readSource("src/data/downloads.seed.ts");

const collectionStatuses = extractObjectStatuses(catalogStateSource, "collectionLaunchStatus");
const productStatuses = extractObjectStatuses(catalogStateSource, "productLaunchStatus");

const urls = Array.from(
  new Set([
    ...staticPaths,
    ...extractCollectionSlugs(collectionStatuses),
    ...extractProductPaths(izdeliyaSource, productStatuses),
    ...extractTopLevelSlugs(projectsSource).map((slug) => `/proekty/${slug}`),
    ...extractTopLevelSlugs(articlesSource).map((slug) => `/novosti/${slug}`),
    ...extractTextureSlugs(materialsSource).map((slug) => `/izdeliya/faktura/${slug}`),
    ...extractDownloadCategorySlugs(downloadsSource).map((slug) => `/skachat/${slug}`),
  ]),
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (path) =>
      `  <url><loc>${sitemapConfig.siteUrl}${path}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.7"}</priority></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync("public/sitemap.xml", xml, "utf8");
console.log(`Generated sitemap with ${urls.length} URLs`);
