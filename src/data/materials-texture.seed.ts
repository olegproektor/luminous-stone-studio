import type { MaterialTexture } from "@/types/materials";

export const materialsTextureSeed: MaterialTexture[] = [
  {
    id: "tx-smooth",
    slug: "smooth",
    key: "smooth",
    name: "Smooth",
    shortDescription: "Гладкая поверхность для современной архитектуры.",
    description: "Гладкая фактура подчеркивает чистую геометрию корпуса и подходит для минималистичных ландшафтов.",
    properties: ["Ровная поверхность", "Легкий уход", "Стабильный оттенок"],
    recommendedUseCases: ["private-house", "developer"],
    relatedCollectionSlugs: ["ston-classic"],
    relatedProductSlugs: ["solis", "ray"],
    image: { src: "/images/textures/smooth.jpg", alt: "Гладкая текстура STON" },
    seo: {
      title: "Smooth texture — STON",
      description: "Гладкая текстура STON для современных уличных светильников.",
    },
  },
  {
    id: "tx-stone",
    slug: "stone",
    key: "stone",
    name: "Stone",
    shortDescription: "Каменная фактура с выраженным рельефом.",
    description: "Фактура с природным рельефом для интеграции светильников в ландшафт и природные сценарии.",
    properties: ["Выраженный рельеф", "Маскирует загрязнение", "Подчеркивает натуральность"],
    recommendedUseCases: ["hospitality", "private-house"],
    relatedCollectionSlugs: ["ston-texture"],
    relatedProductSlugs: ["aura", "nova"],
    image: { src: "/images/textures/stone.jpg", alt: "Каменная текстура STON" },
    seo: {
      title: "Stone texture — STON",
      description: "Каменная текстура STON для ландшафтного и архитектурного освещения.",
    },
  },
];
