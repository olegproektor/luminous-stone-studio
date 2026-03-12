export const projectRelationsSeed: Record<
  string,
  { productSlugs: string[]; collectionSlugs: string[]; materialSlugs: string[] }
> = {
  "zagorodnyi-dom-rublyovka": {
    productSlugs: ["bollard-400-cast-stone", "bollard-600-cast-stone"],
    collectionSlugs: ["bollards-core"],
    materialSlugs: ["cast-stone"],
  },
  "glamping-altai": {
    productSlugs: ["bollard-600-natural-stone", "bollard-800-cast-stone"],
    collectionSlugs: ["bollards-core"],
    materialSlugs: ["natural-stone", "cast-stone"],
  },
  "hotel-sochi-terrasa": {
    productSlugs: [
      "bollard-400-cast-stone",
      "bollard-600-cast-stone",
      "bollard-600-natural-stone",
    ],
    collectionSlugs: ["bollards-core"],
    materialSlugs: ["cast-stone", "natural-stone"],
  },
};
