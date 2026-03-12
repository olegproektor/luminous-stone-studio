import type { DownloadAsset } from "@/types/downloads";

export interface DownloadGateState {
  asset: DownloadAsset;
  isOpen: boolean;
}

export interface DownloadGatePayload {
  name: string;
  phone: string;
  email: string;
  company?: string;
  role?: string;
  assetSlug: string;
  category: string;
}
