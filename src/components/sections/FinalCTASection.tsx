import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="section-padding bg-primary relative grain-overlay">
      <div className="container-brand text-center relative z-10">
        <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-primary-foreground/35 mb-6">
          Начните проект
        </p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-[0.95] mb-8 max-w-3xl mx-auto">
          Расскажите о вашем ландшафте
        </h2>
        <p className="font-body text-sm text-primary-foreground/45 max-w-md mx-auto mb-12">
          Бесплатная консультация, подбор светильников и расчёт проекта.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/request-project"
            className="inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase bg-background text-foreground px-12 py-4 hover:bg-background/90 transition-colors duration-300"
          >
            Запросить проект
          </Link>
          <a
            href="tel:+74951234567"
            className="inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase border border-primary-foreground/20 text-primary-foreground/70 px-12 py-4 hover:text-primary-foreground hover:border-primary-foreground/40 transition-colors duration-300"
          >
            +7 (495) 123-45-67
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
