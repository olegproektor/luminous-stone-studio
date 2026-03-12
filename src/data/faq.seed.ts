export interface FaqSeedItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqSeed: FaqSeedItem[] = [
  {
    id: "faq-delivery-1",
    category: "Поставка и сроки",
    question: "Какие сроки поставки для launch-set?",
    answer: "Сроки зависят от конфигурации и объема. Точный график подтверждается после квалификации заявки.",
  },
  {
    id: "faq-tech-1",
    category: "Технические характеристики",
    question: "Какие материалы используются в продукции STON?",
    answer: "Используются архитектурные композиты и фактурные поверхности, адаптированные к уличной эксплуатации.",
  },
  {
    id: "faq-project-1",
    category: "Проектная работа",
    question: "Работаете ли вы с объектами под ключ?",
    answer: "Да, для объектов доступны пакетные предложения и квалификационный сценарий на странице Для объектов.",
  },
];
