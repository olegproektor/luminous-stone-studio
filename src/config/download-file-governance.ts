import type { DownloadAccessMode, DownloadCategorySlug, DownloadTargetSegment } from "@/types/downloads";

export interface DownloadFileGovernanceRule {
  category: DownloadCategorySlug;
  defaultAccessMode: DownloadAccessMode;
  allowedFileTypes: Array<"pdf" | "dwg" | "3d" | "zip" | "doc">;
  defaultTargetSegment: DownloadTargetSegment;
}

export const downloadFileGovernance: DownloadFileGovernanceRule[] = [
  {
    category: "catalogue",
    defaultAccessMode: "open",
    allowedFileTypes: ["pdf"],
    defaultTargetSegment: "b2c",
  },
  {
    category: "bim",
    defaultAccessMode: "gated",
    allowedFileTypes: ["zip", "3d", "dwg"],
    defaultTargetSegment: "architect",
  },
];
