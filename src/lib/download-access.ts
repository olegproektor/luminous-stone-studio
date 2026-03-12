import type { DownloadAsset } from "@/types/downloads";

export function isGatedAsset(asset: DownloadAsset): boolean {
  return asset.accessMode === "gated";
}

export function startAssetDownload(url: string): void {
  if (typeof window === "undefined") return;
  window.location.href = url;
}
