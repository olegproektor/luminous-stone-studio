export type DownloadAccessMode = "open" | "gated";

export type DownloadCategorySlug = "catalogue" | "bim" | "support";

export type DownloadFileType = "pdf" | "dwg" | "3d" | "zip" | "doc";

export type DownloadTargetSegment = "b2c" | "b2b" | "architect" | "developer";

export interface DownloadFileGovernance {
  version: string;
  status: "active" | "deprecated";
  launchRelevant: boolean;
  legalApproved: boolean;
}

export interface DownloadCategory {
  id: string;
  slug: DownloadCategorySlug;
  title: string;
  description: string;
  accessMode: DownloadAccessMode;
}

export interface DownloadAsset {
  id: string;
  slug: string;
  category: DownloadCategorySlug;
  title: string;
  description: string;
  fileType: DownloadFileType;
  fileUrl: string;
  accessMode: DownloadAccessMode;
  targetSegment: DownloadTargetSegment;
  relatedCollectionSlugs?: string[];
  relatedProductSlugs?: string[];
  governance: DownloadFileGovernance;
}
