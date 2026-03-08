import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Обсуждение",
    description: "Расскажите о вашем объекте и задачах. Поможем определить тип, количество и расположение светильников.",
  },
  {
    number: "02",
    title: "Подбор решения",
    description: "Предложим модели из каталога или кастомное решение. Подготовим визуализацию и спецификацию.",
  },
  {
    number: "03",
    title: "Производство",
    description: "Изготовим изделия на собственном производстве. Стандартные модели — от 5 дней, кастом — от 3 недель.",
  },
  {
    number: "04",
    title: "Доставка и монтаж",
    description: "Доставим по России. Предоставим инструкции и схемы монтажа. Поддержка на всех этапах.",
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-brand">
        <div className="max-w-xl mb-16">
          <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
            Как мы работаем
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
            От обсуждения до установки
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {steps.map((step) => (
            <div key={step.number} className="bg-card p-8 lg:p-10">
              <span className="font-display text-4xl font-light text-accent/40 block mb-6">
                {step.number}
              </span>
              <h3 className="font-display text-lg font-medium text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/request-project"
            className="inline-flex text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-10 py-4 hover:bg-charcoal-light transition-colors duration-300"
          >
            Начать проект
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
