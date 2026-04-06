import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand text-center">
        <p className="mb-4 text-xs font-body font-medium uppercase tracking-brand-wide text-muted-foreground">
          Начните проект
        </p>
        <h2 className="mx-auto mb-6 max-w-2xl font-display text-3xl font-light text-foreground md:text-5xl">
          Расскажите о вашем ландшафте — предложим решение
        </h2>
        <p className="mx-auto mb-10 max-w-md font-body text-sm text-muted-foreground">
          Бесплатная консультация, подбор светильников и расчёт проекта.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="sitePrimary" size="siteLg">
            <a href="/contacts">Запросить консультацию</a>
          </Button>
          <Button asChild variant="siteOutline" size="siteLg">
            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
