const CTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand text-center">
        <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
          Начните проект
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-6 max-w-2xl mx-auto">
          Расскажите о вашем ландшафте — предложим решение
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-10">
          Бесплатная консультация, подбор светильников и расчёт проекта.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contacts"
            className="inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-10 py-4 hover:bg-charcoal-light transition-colors duration-300"
          >
            Запросить консультацию
          </a>
          <a
            href="tel:+74951234567"
            className="inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase text-foreground border border-border px-10 py-4 hover:bg-secondary transition-colors duration-300"
          >
            +7 (495) 123-45-67
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
