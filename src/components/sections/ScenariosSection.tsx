import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const scenarios = [
  {
    title: "Загородная резиденция",
    description: "Дорожки, терраса, входная группа, сад. Камерный свет, который подчёркивает архитектуру участка и создаёт вечернюю атмосферу.",
    href: "/catalog",
    image: "/placeholder.svg",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Глэмпинг · Отель",
    description: "Тропинки, зоны отдыха, территория. Свет, который не нарушает природную среду.",
    href: "/projects",
    image: "/placeholder.svg",
    span: "",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Ресторан · Терраса",
    description: "Мягкий периферийный свет для открытых зон. Камерность и стиль заведения.",
    href: "/catalog",
    image: "/placeholder.svg",
    span: "",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Общественное пространство",
    description: "Парки, скверы, набережные. Масштабируемые решения с единым визуальным языком для всей территории.",
    href: "/for-architects",
    image: "/placeholder.svg",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
];

const ScenariosSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
              Сценарии
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
              Где работает STŌN
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mt-4">
              Свет как часть маршрута, пространства и атмосферы — не просто освещение, а инструмент среды.
            </p>
          </div>
          <Link
            to="/catalog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-body font-medium tracking-brand uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Подобрать по задаче <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <Link
              key={s.title}
              to={s.href}
              className={`group relative overflow-hidden bg-secondary ${s.span} ${s.aspect}`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <h3 className="font-display text-xl md:text-2xl font-light text-background mb-2">
                  {s.title}
                </h3>
                <p className="font-body text-xs text-background/50 max-w-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScenariosSection;
