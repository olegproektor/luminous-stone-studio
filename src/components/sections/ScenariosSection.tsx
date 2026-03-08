import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";

const scenarios = [
  {
    title: "Загородный дом",
    description: "Дорожки, терраса, входная группа, сад. Камерный свет, который подчёркивает архитектуру участка.",
    href: "/catalog",
    image: "/placeholder.svg",
  },
  {
    title: "Глэмпинг / Отель",
    description: "Территория, тропинки к номерам, зоны отдыха. Атмосферное освещение без нарушения природной среды.",
    href: "/projects",
    image: "/placeholder.svg",
  },
  {
    title: "Ресторан / Терраса",
    description: "Мягкий периферийный свет для открытых зон. Создаёт камерность и подчёркивает стиль заведения.",
    href: "/catalog",
    image: "/placeholder.svg",
  },
  {
    title: "Общественное пространство",
    description: "Парки, скверы, набережные. Масштабируемые решения с единым визуальным языком для всей территории.",
    href: "/for-architects",
    image: "/placeholder.svg",
  },
];

const ScenariosSection = () => {
  return (
    <Section eyebrow="Сценарии" title="Где используют STŌN">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((s) => (
          <Link
            key={s.title}
            to={s.href}
            className="group relative aspect-[16/9] overflow-hidden bg-secondary"
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-display text-xl md:text-2xl font-medium text-background mb-2">
                {s.title}
              </h3>
              <p className="font-body text-sm text-background/60 max-w-sm">
                {s.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default ScenariosSection;
