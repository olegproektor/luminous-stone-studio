import type { DownloadAsset, DownloadCategory } from "@/types/downloads";

export const downloadsCategoriesSeed: DownloadCategory[] = [
  {
    id: "dl-cat-catalogue",
    slug: "catalogue",
    title: "Каталоги",
    description: "Каталоги для выбора направления, согласования коллекций и обсуждения проектного сценария.",
    accessMode: "open",
  },
  {
    id: "dl-cat-bim",
    slug: "bim",
    title: "BIM и 3D",
    description: "BIM и 3D-материалы для проектирования, рабочей координации и передачи в команду проекта.",
    accessMode: "gated",
  },
  {
    id: "dl-cat-support",
    slug: "support",
    title: "Техническая поддержка",
    description: "Материалы по внедрению, монтажу и сопровождению после выбора решения.",
    accessMode: "open",
  },
];

export const downloadsSeed: DownloadAsset[] = [
  {
    id: "dl-catalogue-main",
    slug: "forma-sveta-catalogue-2026",
    category: "catalogue",
    title: "Каталог Форма Света 2026",
    description: "Каталог для архитекторов и проектных команд: коллекции, модели и базовый состав решений для частных и объектных пространств.",
    fileType: "pdf",
    fileUrl: "/downloads/ston-catalogue-2026.pdf",
    accessMode: "open",
    targetSegment: "architect",
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
    description: "BIM и 3D-материалы для архитектурных, объектных и девелоперских проектов, где решение уже входит в проектирование и координацию.",
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
