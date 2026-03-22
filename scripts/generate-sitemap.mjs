import { writeFileSync } from "node:fs";
import { sitemapConfig } from "./sitemap.config.mjs";

const now = new Date().toISOString();

const staticPathMap = {
  "/products": "/izdeliya",
  "/catalog": "/izdeliya",
  "/collections": "/izdeliya",
  "/materials": "/izdeliya/faktura",
  "/for-objects": "/komplekty",
  "/custom": "/komplekty",
  "/projects": "/proekty",
  "/faq": "/voprosy",
  "/downloads": "/skachat",
  "/for-architects": "/skachat",
  "/blog": "/novosti",
  "/contacts": "/kontakty",
};

function canonicalize(path) {
  return staticPathMap[path] || path;
}

const requiredCanonicalPaths = [
  "/",
  "/izdeliya",
  "/izdeliya/vozduh",
  "/izdeliya/zemlya",
  "/izdeliya/maya",
  "/izdeliya/faktura",
  "/komplekty",
  "/proekty",
  "/voprosy",
  "/skachat",
  "/novosti",
  "/kontakty",
  "/company",
  "/izdeliya/vozduh/feya",
  "/izdeliya/vozduh/mengir",
  "/izdeliya/zemlya/fokus",
  "/izdeliya/zemlya/mayak",
];

const urls = Array.from(new Set([
  ...requiredCanonicalPaths,
  ...sitemapConfig.staticPaths.map(canonicalize),
  ...((sitemapConfig.collectionSlugs || []).map((slug) => {
    const mapped =
      slug === "bollards-core" || slug === "ston-classic"
        ? "vozduh"
        : slug === "ston-texture"
          ? "zemlya"
          : slug === "lira-garden"
            ? "maya"
            : slug;
    return `/izdeliya/${mapped}`;
  })),
  ...((sitemapConfig.nestedProductPaths || [])),
  ...((sitemapConfig.productSlugs || []).map((slug) => `/products/${slug}`)),
  ...((sitemapConfig.projectSlugs || []).map((slug) => `/proekty/${slug}`)),
  ...((sitemapConfig.newsSlugs || []).map((slug) => `/novosti/${slug}`)),
  ...sitemapConfig.textureSlugs.map((slug) => `/izdeliya/faktura/${slug}`),
  ...sitemapConfig.downloadCategories.map((category) => `/skachat/${category}`),
]));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (path) =>
      `  <url><loc>${sitemapConfig.siteUrl}${path}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.7"}</priority></url>`
  ),
  '</urlset>',
  '',
].join("\n");

writeFileSync("public/sitemap.xml", xml, "utf8");
console.log(`Generated sitemap with ${urls.length} URLs`);
