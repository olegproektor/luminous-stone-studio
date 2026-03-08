import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";
import { FileDown, Package, MessageSquare } from "lucide-react";

const items = [
  {
    icon: FileDown,
    title: "Спецификации и чертежи",
    description: "PDF-каталог, техлисты, размеры и узлы монтажа — всё для включения в проект.",
    cta: "Скачать материалы",
    href: "/for-architects",
  },
  {
    icon: Package,
    title: "Образцы",
    description: "Запросите образцы материала и финишей для утверждения у заказчика.",
    cta: "Запросить образцы",
    href: "/contacts",
  },
  {
    icon: MessageSquare,
    title: "Консультация по проекту",
    description: "Поможем подобрать модели, рассчитать количество и адаптировать под конкретный объект.",
    cta: "Обсудить проект",
    href: "/request-project",
  },
];

const ArchitectsSection = () => {
  return (
    <Section
      variant="dark"
      eyebrow="Для архитекторов"
      title="Проектным бюро и дизайнерам"
      subtitle="Работаем с архитекторами и ландшафтными дизайнерами напрямую. Предоставляем всё необходимое для включения продукта в проект."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.title} className="border border-primary-foreground/15 p-8 flex flex-col">
            <item.icon size={28} className="text-accent mb-6" strokeWidth={1.5} />
            <h3 className="font-display text-xl font-medium text-primary-foreground mb-3">
              {item.title}
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed mb-8 flex-grow">
              {item.description}
            </p>
            <Link
              to={item.href}
              className="inline-flex text-sm font-body font-medium tracking-wide text-primary-foreground border-b border-primary-foreground/30 pb-1 hover:border-primary-foreground transition-colors self-start"
            >
              {item.cta}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ArchitectsSection;
