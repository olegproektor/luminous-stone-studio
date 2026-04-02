import type { DownloadAsset, DownloadCategory } from "@/types/downloads";

export const downloadsCategoriesSeed: DownloadCategory[] = [
  {
    id: "dl-cat-catalogue",
    slug: "catalogue",
    title: "Каталоги",
    description: "Актуальные PDF-каталоги по решениям Форма Света.",
    accessMode: "open",
  },
  {
    id: "dl-cat-bim",
    slug: "bim",
    title: "BIM и 3D",
    description: "BIM и 3D-материалы для проектирования и рабочей координации.",
    accessMode: "gated",
  },
  {
    id: "dl-cat-support",
    slug: "support",
    title: "Техническая поддержка",
    description: "Видео по подключению, монтажу и сервисному сопровождению световых решений.",
    accessMode: "open",
  },
];

export const downloadsSeed: DownloadAsset[] = [
  {
    id: "dl-catalogue-main",
    slug: "forma-sveta-catalogue-2026",
    category: "catalogue",
    title: "Каталог Форма Света 2026",
    description: "Базовый каталог решений и коллекций для частных и объектных пространств.",
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
    slug: "forma-sveta-bim-pack-2026",
    category: "bim",
    title: "BIM Pack 2026",
    description: "Семейства и модели для архитектурных и девелоперских проектов.",
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

