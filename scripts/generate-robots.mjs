import { writeFileSync } from "node:fs";
import { sitemapConfig } from "./sitemap.config.mjs";

const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "",
  `Sitemap: ${sitemapConfig.siteUrl}/sitemap.xml`,
  `Host: ${sitemapConfig.siteUrl}`,
  "",
].join("\n");

writeFileSync("public/robots.txt", robots, "utf8");
console.log("Generated robots.txt");
