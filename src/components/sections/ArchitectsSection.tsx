import { Link } from "react-router-dom";
import { FileDown, Package, MessageSquare } from "lucide-react";
import { navPaths } from "@/lib/route-helpers";

const items = [
  {
    icon: FileDown,
    title: "Спецификации и чертежи",
    description: "PDF-каталоги, техлисты, размеры и узлы монтажа для включения решения в проект.",
    cta: "Скачать материалы",
    href: navPaths.downloads,
  },
  {
    icon: Package,
    title: "Образцы",
    description: "Подготовим образцы материалов и финишей для согласования у заказчика и проектной команды.",
    cta: "Запросить образцы",
    href: navPaths.contacts,
  },
  {
    icon: MessageSquare,
    title: "Консультация по проекту",
    description: "Поможем определить сценарий света, подобрать решение и адаптировать его под объект.",
    cta: "Обсудить проект",
    href: navPaths.requestProject,
  },
];

const ArchitectsSection = () => {
  return (
    <section className="relative bg-primary text-primary-foreground section-padding grain-overlay">
      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="mb-6 text-xs font-body font-medium uppercase tracking-brand-wide text-primary-foreground/40">
              Для архитекторов
            </p>
            <h2 className="mb-6 font-display text-3xl font-light leading-tight text-primary-foreground md:text-4xl">
              Проектным бюро и дизайнерам
            </h2>
            <p className="font-body text-sm leading-relaxed text-primary-foreground/50">
              Работаем напрямую с архитектурными и ландшафтными командами. Даём материалы, образцы и проектную
              поддержку без лишнего narrative.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-primary-foreground/10 lg:col-span-8 md:grid-cols-3">
            {items.map((item) => (
              <div key={item.title} className="flex flex-col bg-primary p-8">
                <item.icon size={24} className="mb-8 text-accent" strokeWidth={1.5} />
                <h3 className="mb-3 font-display text-lg font-medium text-primary-foreground">{item.title}</h3>
                <p className="mb-8 flex-grow font-body text-xs leading-relaxed text-primary-foreground/45">
                  {item.description}
                </p>
                <Link
                  to={item.href}
                  className="self-start border-b border-primary-foreground/20 pb-1 text-xs font-body font-medium uppercase tracking-brand text-primary-foreground/70 transition-colors hover:border-primary-foreground/50 hover:text-primary-foreground"
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
