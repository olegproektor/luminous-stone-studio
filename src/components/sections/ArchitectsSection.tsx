import { Link } from "react-router-dom";
import { FileDown, Package, MessageSquare } from "lucide-react";
import { navPaths } from "@/lib/route-helpers";

const items = [
  {
    icon: FileDown,
    title: "Спецификации и чертежи",
    description: "PDF-каталог, техлисты, размеры и узлы монтажа — всё для включения в проект.",
    cta: "Скачать материалы",
    href: navPaths.downloads,
  },
  {
    icon: Package,
    title: "Образцы",
    description: "Запросите образцы материала и финишей для утверждения у заказчика.",
    cta: "Запросить образцы",
    href: navPaths.contacts,
  },
  {
    icon: MessageSquare,
    title: "Консультация по проекту",
    description: "Подберём модели, рассчитаем количество и адаптируем под объект.",
    cta: "Обсудить проект",
    href: navPaths.requestProject,
  },
];

const ArchitectsSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground relative grain-overlay">
      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left: intro */}
          <div className="lg:col-span-4">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-primary-foreground/40 mb-6">
              Для архитекторов
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-primary-foreground leading-tight mb-6">
              Проектным бюро и дизайнерам
            </h2>
            <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">
              Работаем с архитекторами и ландшафтными дизайнерами напрямую. Предоставляем всё для включения продукта в проект.
            </p>
          </div>

          {/* Right: cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-primary-foreground/10">
            {items.map((item) => (
              <div key={item.title} className="bg-primary p-8 flex flex-col">
                <item.icon size={24} className="text-accent mb-8" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-medium text-primary-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-primary-foreground/45 leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>
                <Link
                  to={item.href}
                  className="text-xs font-body font-medium tracking-brand uppercase text-primary-foreground/70 border-b border-primary-foreground/20 pb-1 hover:text-primary-foreground hover:border-primary-foreground/50 transition-colors self-start"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectsSection;
