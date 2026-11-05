import type { Project } from "@/types";
import { projectRelationsSeed } from "./project-relations.seed";

export const projects: Project[] = [
  {
    id: "pr1",
    slug: "zagorodnyi-dom-rublyovka",
    title: "Загородный дом на Рублёвке",
    projectType: "private-house",
    region: "Московская область",
    year: 2024,
    challenge:
      "Нужно было собрать единую вечернюю логику для участка 30 соток: входная группа, дорожки, терраса и зона у бассейна должны были читаться как связанный маршрут без визуального шума.",
    solution:
      "Основу сценария собрали на маршрутных и опорных решениях: свет расставили так, чтобы движение по участку читалось спокойно, а акценты поддерживали архитектуру и геометрию дорожек.",
    result:
      "Проект доказал, что каменные световые решения могут одновременно работать как навигация, атмосфера и часть архитектурного языка частного участка.",
    products: ["lp1", "lp2"],
    productSlugs: projectRelationsSeed["zagorodnyi-dom-rublyovka"].productSlugs,
    collectionSlugs: projectRelationsSeed["zagorodnyi-dom-rublyovka"].collectionSlugs,
    materialSlugs: projectRelationsSeed["zagorodnyi-dom-rublyovka"].materialSlugs,
    summary: "Кейс о том, как собрать спокойную навигацию и цельный вечерний ритм на большом частном участке.",
    gallery: [{ src: "/placeholder.svg", alt: "Загородный дом — дорожки" }],
    coverImage: { src: "/placeholder.svg", alt: "Загородный дом на Рублёвке — обложка" },
    seo: {
      title: "Проект: Загородный дом на Рублёвке — Ландшафтное освещение «Форма Света»",
      description:
        "Кейс: спокойная вечерняя навигация и единый световой ритм для загородного участка 30 соток: дорожки, терраса и входная группа.",
    },
  },
  {
    id: "pr2",
    slug: "glamping-altai",
    title: "Глэмпинг «Алтай Резорт»",
    projectType: "glamping",
    region: "Алтайский край",
    year: 2024,
    challenge:
      "На территории глэмпинга нужно было выстроить навигацию и вечернюю атмосферу так, чтобы свет поддерживал природный контекст, а не спорил с горным ландшафтом.",
    solution:
      "Маршруты и зоны отдыха собрали на фактурных решениях с мягким вечерним ритмом: свет направляет движение, а материал помогает встроить объекты в окружающую среду.",
    result:
      "Кейс показывает, как сценарий для гостевого объекта можно решить без светового шума: навигация остаётся понятной, а подсветка становится частью ландшафта.",
    products: ["lp3", "lp4"],
    productSlugs: projectRelationsSeed["glamping-altai"].productSlugs,
    collectionSlugs: projectRelationsSeed["glamping-altai"].collectionSlugs,
    materialSlugs: projectRelationsSeed["glamping-altai"].materialSlugs,
    summary: "Кейс о том, как встроить маршрутный свет в природный ландшафт гостевого объекта без потери атмосферы.",
    gallery: [{ src: "/placeholder.svg", alt: "Глэмпинг Алтай — вечер" }],
    coverImage: { src: "/placeholder.svg", alt: "Глэмпинг Алтай Резорт — обложка" },
    seo: {
      title: "Проект: Глэмпинг «Алтай Резорт» — Световые решения «Форма Света»",
      description:
        "Кейс: маршрутный и фактурный свет для глэмпинга на Алтае, где освещение поддерживает природный контекст и не спорит с ландшафтом.",
    },
  },
  {
    id: "pr3",
    slug: "hotel-sochi-terrasa",
    title: "Отель «Сочи Терраса»",
    projectType: "hotel",
    region: "Краснодарский край",
    year: 2025,
    challenge:
      "Для бутик-отеля нужно было собрать единый световой язык для входной зоны, ресторанной террасы и маршрутов к бассейну, не дробя территорию на несвязанные сценарии.",
    solution:
      "Свет выстроили как систему: вход, ресторанная зона и транзитные маршруты получили разные роли, но остались частью одного вечернего сценария и общего архитектурного образа.",
    result:
      "Проект подтвердил, что для гостиничного объекта свет может одновременно решать навигацию, поддерживать премиальный тон и связывать разные функциональные зоны в одну систему.",
    products: ["lp1", "lp2", "lp3"],
    productSlugs: projectRelationsSeed["hotel-sochi-terrasa"].productSlugs,
    collectionSlugs: projectRelationsSeed["hotel-sochi-terrasa"].collectionSlugs,
    materialSlugs: projectRelationsSeed["hotel-sochi-terrasa"].materialSlugs,
    summary: "Кейс о едином световом языке для гостиничного объекта с несколькими зонами и разной функцией света.",
    gallery: [{ src: "/placeholder.svg", alt: "Отель Сочи Терраса — вечер" }],
    coverImage: { src: "/placeholder.svg", alt: "Отель Сочи Терраса — обложка" },
    seo: {
      title: "Проект: Отель «Сочи Терраса» — Комплексное ландшафтное освещение",
      description:
        "Кейс: единый световой язык для входной зоны, террасы и транзитных маршрутов бутик-отеля в Сочи.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
