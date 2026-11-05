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
    description: "Раздел для BIM и 3D-материалов под проектирование и рабочую координацию. Пакет сейчас выдаётся по запросу через форму.",
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
    description:
      "Каталог для архитекторов и проектных команд: коллекции, модели и базовый состав решений для частных и объектных пространств.",
    fileType: "pdf",
    fileUrl: "/downloads/forma-sveta-catalogue-2026.pdf",
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
];
