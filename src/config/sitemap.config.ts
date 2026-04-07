import { routes } from "@/config/routes";
import { launchSetSeed } from "@/data/launch-set.seed";
import { downloadsCategoriesSeed } from "@/data/downloads.seed";
import { materialsTextureSeed } from "@/data/materials-texture.seed";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import { izdeliyaProductsSeed } from "@/data/izdeliya-architecture.seed";
import { getIndexableCollectionSlugs, getIndexableProductPaths } from "@/data/public-catalog-state";

export const sitemapConfig = {
  siteUrl: "https://ston.ru",
  staticPaths: [
    routes.home,
    routes.products,
    routes.materials,
    routes.forObjects,
    routes.projects,
    routes.faq,
    routes.downloads,
    routes.news,
    routes.contacts,
    routes.company,
  ],
  collectionSlugs: getIndexableCollectionSlugs(),
  productSlugs: launchSetSeed.primaryProductSlugs,
  nestedProductPaths: getIndexableProductPaths(),
  projectSlugs: projects.map((item) => item.slug),
  newsSlugs: articles.map((item) => item.slug),
  downloadCategories: downloadsCategoriesSeed.map((item) => item.slug),
  textureSlugs: materialsTextureSeed.map((item) => item.slug),
} as const;
