import { writeFileSync } from "node:fs";
import { sitemapConfig } from "./sitemap.config.mjs";

const now = new Date().toISOString();
const urls = [
  ...sitemapConfig.staticPaths,
  ...sitemapConfig.collectionSlugs.map((slug) => `/collections/${slug}`),
  ...sitemapConfig.productSlugs.map((slug) => `/products/${slug}`),
  ...sitemapConfig.textureSlugs.map((slug) => `/texture/${slug}`),
  ...sitemapConfig.downloadCategories.map((category) => `/downloads/${category}`),
];

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
