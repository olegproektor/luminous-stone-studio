import MetricBlock from "@/components/ui/metric-block";
import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

const MaterialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left: intro and descriptions */}
          <div className="lg:col-span-7">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-6">
              Материалы
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Литьевой камень и композит
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-12 max-w-lg">
              Материалы, которые сочетают эстетику натурального камня с инженерной надёжностью для круглогодичной уличной эксплуатации.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l border-accent/40 pl-6">
                <h3 className="font-display text-lg font-medium text-foreground mb-3">Литьевой камень</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Минеральный композит на основе натурального камня. Тактильность и визуальная глубина природного материала. Устойчив к морозу, влаге и ультрафиолету.
                </p>
              </div>
              <div className="border-l border-accent/40 pl-6">
                <h3 className="font-display text-lg font-medium text-foreground mb-3">Архитектурный композит</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Полимерный материал с каменной крошкой. Легче натурального камня, сохраняет его визуальные свойства. Идеален для компактных форм.
                </p>
              </div>
            </div>

            <Link
              to={navPaths.materials}
              className="inline-flex mt-10 text-xs font-body font-medium tracking-brand uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Подробнее о материалах
            </Link>
          </div>

          {/* Right: metrics */}
          <div className="lg:col-span-5 flex items-center">
            <div className="grid grid-cols-2 gap-px bg-border w-full">
              <div className="bg-background p-8">
                <MetricBlock value="IP65" label="Класс защиты" />
              </div>
              <div className="bg-background p-8">
                <MetricBlock value="–40°C" label="Мин. температура" />
              </div>
              <div className="bg-background p-8">
                <MetricBlock value="10+" label="Лет эксплуатации" />
              </div>
              <div className="bg-background p-8">
                <MetricBlock value="LED" label="Источник света" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
