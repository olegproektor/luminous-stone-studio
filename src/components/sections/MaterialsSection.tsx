import Section from "@/components/layout/Section";
import MetricBlock from "@/components/ui/metric-block";
import { Link } from "react-router-dom";

const MaterialsSection = () => {
  return (
    <Section
      eyebrow="Материалы"
      title="Литьевой камень и композит"
      subtitle="Материалы, которые сочетают эстетику натурального камня с инженерной надёжностью для уличной эксплуатации."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="border-l-2 border-accent pl-6">
            <h3 className="font-display text-xl font-medium text-foreground mb-2">Литьевой камень</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Минеральный композит на основе натурального камня. Передаёт тактильность и визуальную глубину природного материала. Устойчив к морозу, влаге и ультрафиолету.
            </p>
          </div>
          <div className="border-l-2 border-accent pl-6">
            <h3 className="font-display text-xl font-medium text-foreground mb-2">Архитектурный композит</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Современный полимерный материал с добавлением каменной крошки. Легче натурального камня, но сохраняет его визуальные свойства. Идеален для компактных форм.
            </p>
          </div>
          <Link
            to="/materials"
            className="inline-flex mt-4 text-sm font-body font-medium tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Подробнее о материалах
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <MetricBlock value="IP65" label="Класс защиты" />
          <MetricBlock value="–40°C" label="Мин. температура" />
          <MetricBlock value="10+" label="Лет эксплуатации" />
          <MetricBlock value="LED" label="Источник света" />
        </div>
      </div>
    </Section>
  );
};

export default MaterialsSection;
