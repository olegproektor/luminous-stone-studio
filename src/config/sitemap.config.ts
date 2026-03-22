import { routes } from "@/config/routes";
import { launchSetSeed } from "@/data/launch-set.seed";
import { downloadsCategoriesSeed } from "@/data/downloads.seed";
import { materialsTextureSeed } from "@/data/materials-texture.seed";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import { izdeliyaProductsSeed } from "@/data/izdeliya-architecture.seed";

export const sitemapConfig = {
  siteUrl: "https://ston.ru",
  staticPaths: [
    routes.home,
    routes.products,
    routes.collectionVozduh,
    routes.collectionZemlya,
    routes.collectionMaya,
    routes.materials,
    routes.forObjects,
    routes.projects,
    routes.faq,
    routes.downloads,
    routes.news,
    routes.contacts,
    routes.company,
    routes.requestProject,
    routes.privacy,
    routes.cookies,
    routes.consent,
    routes.terms,
  ],
  collectionSlugs: ["vozduh", "zemlya", "maya"],
  productSlugs: launchSetSeed.primaryProductSlugs,
  nestedProductPaths: izdeliyaProductsSeed.map((item) => routes.collectionProduct(item.collectionSlug, item.slug)),
  projectSlugs: projects.map((item) => item.slug),
  newsSlugs: articles.map((item) => item.slug),
  downloadCategories: downloadsCategoriesSeed.map((item) => item.slug),
  textureSlugs: materialsTextureSeed.map((item) => item.slug),
} as const;
