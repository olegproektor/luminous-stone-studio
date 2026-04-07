import type { ProductStatus } from "@/types";
import type { IzdeliyaCollectionSlug, IzdeliyaProductSlug } from "@/data/izdeliya-architecture.seed";
import { izdeliyaProductsSeed } from "@/data/izdeliya-architecture.seed";

const collectionLaunchStatus: Record<IzdeliyaCollectionSlug, ProductStatus> = {
  vozduh: "active",
  zemlya: "active",
  maya: "coming-soon",
};

const productLaunchStatus: Record<IzdeliyaProductSlug, ProductStatus> = {
  feya: "active",
  mengir: "active",
  fokus: "active",
  mayak: "active",
};

export function getCollectionLaunchStatus(slug: IzdeliyaCollectionSlug): ProductStatus {
  return collectionLaunchStatus[slug];
}

export function getProductLaunchStatus(slug: IzdeliyaProductSlug): ProductStatus {
  return productLaunchStatus[slug];
}

export function isCollectionLimited(slug: IzdeliyaCollectionSlug) {
  return getCollectionLaunchStatus(slug) !== "active";
}

export function getPublicCollectionProducts(slug: IzdeliyaCollectionSlug) {
  return izdeliyaProductsSeed.filter(
    (item) => item.collectionSlug === slug && getProductLaunchStatus(item.slug) !== "draft",
  );
}

export function getIndexableCollectionSlugs() {
  return (Object.entries(collectionLaunchStatus) as Array<[IzdeliyaCollectionSlug, ProductStatus]>)
    .filter(([, status]) => status !== "draft")
    .map(([slug]) => slug);
}

export function getIndexableProductPaths() {
  return izdeliyaProductsSeed
    .filter((item) => getProductLaunchStatus(item.slug) === "active")
    .map((item) => `/izdeliya/${item.collectionSlug}/${item.slug}`);
}
