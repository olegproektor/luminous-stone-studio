import MetricBlock from "@/components/ui/metric-block";
import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

const MaterialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="mb-6 text-xs font-body font-medium uppercase tracking-brand-wide text-muted-foreground">
              Материалы
            </p>
            <h2 className="mb-6 font-display text-3xl font-light leading-tight text-foreground md:text-5xl">
              Материалы и текстуры под проект
            </h2>
            <p className="mb-10 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
              Подбираем материал, поверхность и финиш под характер пространства: от натурального камня и
              композита до специальных решений по индивидуальному заказу.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="border-l border-accent/40 pl-6">
                <h3 className="mb-3 font-display text-lg font-medium text-foreground">Натуральный камень</h3>
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  Живой рисунок материала и несколько вариантов текстур для частных и архитектурных пространств.
                </p>
              </div>
              <div className="border-l border-accent/40 pl-6">
                <h3 className="mb-3 font-display text-lg font-medium text-foreground">Композит</h3>
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  Управляемая фактура и повторяемая геометрия для объектов, где важны точность и стабильность.
                </p>
              </div>
              <div className="border-l border-accent/40 pl-6">
                <h3 className="mb-3 font-display text-lg font-medium text-foreground">Специальные материалы</h3>
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  Оникс, горное стекло и декоративные решения согласовываем под конкретную задачу и объект.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border-t border-border pt-4">
                <p className="font-body text-xs uppercase tracking-brand-wide text-foreground">Финиши</p>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">
                  Гладкий и текстурный, матовый и полированный — подбираются под материал и характер пространства.
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-body text-xs uppercase tracking-brand-wide text-foreground">Индивидуальный заказ</p>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">
                  Возможны нестандартные фактуры, специальные материалы и светопропускающие решения под проект.
                </p>
              </div>
            </div>

            <Link
              to={navPaths.materials}
              className="mt-10 inline-flex border-b border-foreground/30 pb-1 text-xs font-body font-medium uppercase tracking-brand text-foreground transition-colors hover:border-foreground"
            >
              Подробнее о материалах
            </Link>
          </div>

          <div className="flex items-center lg:col-span-5">
            <div className="grid w-full grid-cols-2 gap-px bg-border">
              <div className="bg-background p-8">
                <MetricBlock value="IP65" label="Класс защиты" />
              </div>
              <div className="bg-background p-8">
                <MetricBlock value="−40°C" label="Мин. температура" />
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
