import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-brand text-center">
        <p className="text-sm font-body font-medium tracking-[0.2em] uppercase text-primary-foreground/50 mb-4">
          Начните проект
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground leading-tight mb-6 max-w-3xl mx-auto">
          Расскажите о вашем ландшафте — подберём решение
        </h2>
        <p className="font-body text-base md:text-lg text-primary-foreground/60 max-w-lg mx-auto mb-10">
          Бесплатная консультация, подбор светильников и расчёт проекта.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/request-project"
            className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-background text-foreground px-10 py-4 hover:bg-background/90 transition-colors duration-200"
          >
            Запросить проект
          </Link>
          <a
            href="tel:+74951234567"
            className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-primary-foreground/30 text-primary-foreground px-10 py-4 hover:bg-primary-foreground/10 transition-colors duration-200"
          >
            +7 (495) 123-45-67
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
