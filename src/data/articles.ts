import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "a1",
    slug: "kak-vybrat-bollard-dlya-uchastka",
    title: "Как выбрать боллард для загородного участка",
    excerpt:
      "Разбираемся, на что обратить внимание при выборе уличного болларда: высота, материал, тип света, монтаж и совместимость с ландшафтом.",
    content: "",
    category: "bollards",
    coverImage: { src: "/placeholder.svg", alt: "Как выбрать боллард" },
    author: "Редакция STŌN",
    publishedAt: "2025-02-15",
    readingTime: 7,
    relatedArticleIds: ["a2", "a3"],
    seo: {
      title: "Как выбрать боллард для загородного участка — STŌN",
      description:
        "Гид по выбору уличного болларда: высота, материал, свет, монтаж. Советы от производителя архитектурных светильников из камня.",
    },
  },
  {
    id: "a2",
    slug: "litievoi-kamen-vs-beton",
    title: "Литьевой камень vs бетон: что лучше для уличных светильников",
    excerpt:
      "Сравниваем два популярных материала для ландшафтных светильников: прочность, внешний вид, устойчивость и стоимость.",
    content: "",
    category: "composite",
    coverImage: { src: "/placeholder.svg", alt: "Литьевой камень vs бетон" },
    author: "Редакция STŌN",
    publishedAt: "2025-03-01",
    readingTime: 5,
    relatedArticleIds: ["a1"],
    seo: {
      title: "Литьевой камень vs бетон для уличных светильников — STŌN",
      description:
        "Сравнение литьевого камня и бетона: какой материал лучше для архитектурных уличных светильников и боллардов.",
    },
  },
  {
    id: "a3",
    slug: "osveshchenie-dlya-glempinga",
    title: "Ландшафтное освещение для глэмпинга: 5 правил",
    excerpt:
      "Как создать атмосферное и функциональное освещение территории глэмпинга, не нарушая связь с природой.",
    content: "",
    category: "glamping-solutions",
    coverImage: { src: "/placeholder.svg", alt: "Освещение для глэмпинга" },
    author: "Редакция STŌN",
    publishedAt: "2025-03-10",
    readingTime: 6,
    relatedArticleIds: ["a1", "a4"],
    seo: {
      title: "Ландшафтное освещение для глэмпинга — 5 правил | STŌN",
      description:
        "5 правил ландшафтного освещения для глэмпинга. Как сохранить природную атмосферу и обеспечить комфорт гостей.",
    },
  },
  {
    id: "a4",
    slug: "oshibki-v-ulichnom-osveshchenii",
    title: "7 ошибок в уличном освещении загородного дома",
    excerpt:
      "Типичные ошибки, которые делают при планировании ландшафтного освещения, и как их избежать.",
    content: "",
    category: "mistakes",
    coverImage: { src: "/placeholder.svg", alt: "Ошибки в уличном освещении" },
    author: "Редакция STŌN",
    publishedAt: "2025-03-20",
    readingTime: 8,
    relatedArticleIds: ["a1", "a3"],
    seo: {
      title: "7 ошибок в уличном освещении загородного дома — STŌN",
      description:
        "Типичные ошибки в ландшафтном освещении и как их избежать. Советы от производителя архитектурных светильников.",
    },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
