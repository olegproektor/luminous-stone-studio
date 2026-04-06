import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Обсуждение задачи",
    description: "Определяем тип пространства, сценарий света и ключевые ограничения проекта.",
  },
  {
    number: "02",
    title: "Подбор решения",
    description: "Сопоставляем коллекцию, модель, материал и фактуру под конкретный объект.",
  },
  {
    number: "03",
    title: "Производство",
    description: "Готовим стандартное или адаптированное решение в согласованные сроки.",
  },
  {
    number: "04",
    title: "Поставка и монтаж",
    description: "Передаём схемы, инструкции и поддержку для аккуратной интеграции на объекте.",
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-brand">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs font-body font-medium uppercase tracking-brand-wide text-muted-foreground">
            Как мы работаем
          </p>
          <h2 className="font-display text-3xl font-light leading-tight text-foreground md:text-5xl">
            От обсуждения до установки
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="bg-card p-8 lg:p-10">
              <span className="mb-6 block font-display text-4xl font-light text-accent/40">{step.number}</span>
              <h3 className="mb-3 font-display text-lg font-medium text-foreground">{step.title}</h3>
              <p className="font-body text-xs leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={navPaths.requestProject}
            className={cn(buttonVariants({ variant: "sitePrimary", size: "siteLg" }))}
          >
            Начать проект
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
