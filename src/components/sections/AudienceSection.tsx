const audiences = [
  {
    title: "Частным клиентам",
    description: "Для загородного дома, террасы, сада. Подберём решение под ваш ландшафт и стиль.",
    cta: "Подобрать светильник",
    href: "/catalog",
  },
  {
    title: "Архитекторам",
    description: "3D-модели, спецификации, кастомизация под проект. Работаем напрямую с проектными бюро.",
    cta: "Запросить материалы",
    href: "/contacts",
  },
  {
    title: "Бизнесу",
    description: "Глэмпинги, отели, рестораны, девелоперы. Комплектация проектов любого масштаба.",
    cta: "Обсудить проект",
    href: "/contacts",
  },
];

const AudienceSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-brand">
        <div className="text-center mb-16">
          <p className="text-sm font-body font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Для кого
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
            Работаем с теми, кто ценит свет
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 md:p-10 flex flex-col"
            >
              <h3 className="font-display text-2xl font-medium text-foreground mb-4">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>
              <a
                href={item.href}
                className="inline-flex text-sm font-body font-medium tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors self-start"
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
