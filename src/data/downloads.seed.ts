import type { DownloadAsset, DownloadCategory } from "@/types/downloads";

export const downloadsCategoriesSeed: DownloadCategory[] = [
  {
    id: "dl-cat-catalogue",
    slug: "catalogue",
    title: "Каталоги",
    description: "Актуальные PDF-каталоги по линейке КАМЕНЬ И СВЕТ.",
    accessMode: "open",
  },
  {
    id: "dl-cat-bim",
    slug: "bim",
    title: "BIM и 3D",
    description: "BIM/3D материалы для проектирования.",
    accessMode: "gated",
  },
];

export const downloadsSeed: DownloadAsset[] = [
  {
    id: "dl-catalogue-main",
    slug: "ston-catalogue-2026",
    category: "catalogue",
    title: "Каталог КАМЕНЬ И СВЕТ 2026",
    description: "Полный каталог стартового ассортимента.",
    fileType: "pdf",
    fileUrl: "/downloads/ston-catalogue-2026.pdf",
    accessMode: "open",
    targetSegment: "b2c",
    relatedCollectionSlugs: ["ston-classic", "ston-texture"],
    governance: {
      version: "2026.1",
      status: "active",
      launchRelevant: true,
      legalApproved: true,
    },
  },
  {
    id: "dl-bim-pack-main",
    slug: "ston-bim-pack-2026",
    category: "bim",
    title: "КАМЕНЬ И СВЕТ BIM Pack 2026",
    description: "Семейства и модели для архитектурных проектов.",
    fileType: "zip",
    fileUrl: "/downloads/ston-bim-pack-2026.zip",
    accessMode: "gated",
    targetSegment: "architect",
    relatedProductSlugs: ["ray", "solis"],
    governance: {
      version: "2026.1",
      status: "active",
      launchRelevant: true,
      legalApproved: true,
    },
  },
];
