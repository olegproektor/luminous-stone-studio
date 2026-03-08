import heroBollard from "@/assets/hero-bollard.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end md:items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBollard}
          alt="Архитектурный боллард из литьевого камня с вертикальной световой щелью в вечернем саду"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-brand px-6 md:px-12 lg:px-24 pb-20 md:pb-0">
        <div className="max-w-xl animate-fade-up">
          <p className="text-sm font-body font-medium tracking-[0.2em] uppercase text-background/60 mb-4">
            Архитектурный свет
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-background leading-[1.1] mb-6">
            Камень.
            <br />
            Свет.
            <br />
            Ландшафт.
          </h1>
          <p className="font-body text-base md:text-lg text-background/70 leading-relaxed mb-10 max-w-md">
            Болларды и светильники из литьевого камня для архитектурного ландшафта. Премиальное качество, российское производство.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/catalog"
              className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-background text-foreground px-8 py-3.5 hover:bg-background/90 transition-colors duration-200"
            >
              Смотреть каталог
            </a>
            <a
              href="/contacts"
              className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-background/40 text-background px-8 py-3.5 hover:bg-background/10 transition-colors duration-200"
            >
              Запросить проект
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
