export interface ProductFilterQueryState {
  category: string;
  texture: string;
  height: string;
  material: string;
  ip: string;
  priceBand: string;
  sort: string;
}

export const defaultProductFilterQuery: ProductFilterQueryState = {
  category: "all",
  texture: "all",
  height: "all",
  material: "all",
  ip: "all",
  priceBand: "all",
  sort: "default",
};

export function parseProductFilterQuery(searchParams: URLSearchParams): ProductFilterQueryState {
  return {
    category: searchParams.get("category") ?? defaultProductFilterQuery.category,
    texture: searchParams.get("texture") ?? defaultProductFilterQuery.texture,
    height: searchParams.get("height") ?? defaultProductFilterQuery.height,
    material: searchParams.get("material") ?? defaultProductFilterQuery.material,
    ip: searchParams.get("ip") ?? defaultProductFilterQuery.ip,
    priceBand: searchParams.get("priceBand") ?? defaultProductFilterQuery.priceBand,
    sort: searchParams.get("sort") ?? defaultProductFilterQuery.sort,
  };
}

export function toProductFilterQuery(state: ProductFilterQueryState): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(state).forEach(([key, value]) => {
    if (value !== "all" && value !== "default") {
      params.set(key, value);
    }
  });
  return params;
}
