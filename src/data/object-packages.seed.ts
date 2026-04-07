import type { ObjectPackage } from "@/types/object-packages";
import { navPaths } from "@/lib/route-helpers";

export const objectPackagesSeed: ObjectPackage[] = [
  {
    id: "pkg-private-base",
    slug: "private-landscape-base",
    title: "Private Premium",
    segment: "private",
    summary:
      "Для частных премиальных участков, где нужен подбор направления света, схемы размещения и спокойной архитектурной интеграции без ухода в большой объектный контур.",
    scope: ["Подбор коллекций и моделей", "Сценарий размещения на участке", "Базовая спецификация и рекомендации по интеграции"],
    deliverables: ["PDF-концепция по сценариям света", "Состав решения и перечень моделей", "Рекомендации по материалам и монтажу"],
    indicativeBudget: "от 250 000 ₽",
    leadTime: "7-10 рабочих дней",
    cta: { label: "Квалифицировать частный проект", href: navPaths.forObjects },
  },
  {
    id: "pkg-hospitality-pro",
    slug: "hospitality-pro",
    title: "Hospitality / Object",
    segment: "hospitality",
    summary:
      "Для гостиниц, глэмпингов, общественных и камерных объектных пространств, где нужно собрать маршрутный, акцентный и атмосферный свет в единый сценарий.",
    scope: ["Сценарии движения и навигации", "Акцентный и поддерживающий свет", "Привязка решений к функциональным зонам объекта"],
    deliverables: ["Сценарная матрица по зонам", "Предварительный состав решения", "Пакет материалов для обсуждения следующего шага"],
    indicativeBudget: "от 700 000 ₽",
    leadTime: "10-15 рабочих дней",
    cta: { label: "Квалифицировать объектный проект", href: navPaths.forObjects },
  },
  {
    id: "pkg-developer-core",
    slug: "developer-core",
    title: "Developer / Large-Scale",
    segment: "developer",
    summary:
      "Для девелоперских и масштабируемых проектов, где важны типология узлов, этапность ввода, предсказуемость состава решения и логика дальнейшей координации.",
    scope: ["Типовые сценарии и узлы", "Сметная и спецификационная структура", "Этапность внедрения и логика поставки"],
    deliverables: ["Пакет спецификаций и типовых решений", "Техническая карта по внедрению", "Материалы для следующего этапа согласования"],
    indicativeBudget: "по запросу",
    leadTime: "по ТЗ",
    cta: { label: "Квалифицировать девелоперский проект", href: navPaths.forObjects },
  },
];
