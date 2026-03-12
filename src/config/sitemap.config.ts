import { routes } from "@/config/routes";
import { launchSetSeed } from "@/data/launch-set.seed";
import { downloadsCategoriesSeed } from "@/data/downloads.seed";
import { materialsTextureSeed } from "@/data/materials-texture.seed";

export const sitemapConfig = {
  siteUrl: "https://ston.ru",
  staticPaths: [
    routes.home,
    routes.company,
    routes.collections,
    routes.products,
    routes.projects,
    routes.downloads,
    routes.materials,
    routes.forObjects,
    routes.faq,
    routes.contacts,
    routes.requestProject,
    routes.privacy,
    routes.cookies,
    routes.consent,
    routes.terms,
  ],
  collectionSlugs: launchSetSeed.primaryCollectionSlugs,
  productSlugs: launchSetSeed.primaryProductSlugs,
  downloadCategories: downloadsCategoriesSeed.map((item) => item.slug),
  textureSlugs: materialsTextureSeed.map((item) => item.slug),
} as const;
