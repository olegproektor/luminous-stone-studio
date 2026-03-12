import { metadataMap, metadataForCollectionDetail, metadataForProductDetail, metadataForProjectDetail } from "@/config/metadata-map";
import type { Collection, Product, Project } from "@/types";

export const getListMetadata = (page: "collections" | "products" | "projects") => {
  switch (page) {
    case "collections":
      return metadataMap.collectionsIndex;
    case "products":
      return metadataMap.productsIndex;
    case "projects":
      return metadataMap.projectsIndex;
  }
};

export const getDetailMetadata = (entity: { type: "collection"; value: Collection } | { type: "product"; value: Product } | { type: "project"; value: Project }) => {
  switch (entity.type) {
    case "collection":
      return metadataForCollectionDetail(entity.value);
    case "product":
      return metadataForProductDetail(entity.value);
    case "project":
      return metadataForProjectDetail(entity.value);
  }
};
