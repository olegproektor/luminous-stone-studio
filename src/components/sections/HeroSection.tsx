import heroBollard from "@/assets/hero-bollard.jpg";
import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end">
      <div className="absolute inset-0">
        <img
          src={heroBollard}
          alt="Архитектурное световое решение для ландшафта в вечернем пространстве"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container-brand px-6 md:px-12 lg:px-24 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-background/50 mb-6 animate-fade-up">
              Архитектурные световые решения для ландшафта
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-background leading-[0.95] mb-8 animate-fade-up">
              Свет как часть
              <br />
              архитектуры
              <br />
              ландшафта
            </h1>
            <p className="font-body text-sm md:text-base text-background/60 leading-relaxed mb-12 max-w-md animate-fade-up-delay">
              Форма Света создаёт световые решения для частных и архитектурных пространств.
              Подбираем сценарий света под задачу и интегрируем его в архитектуру.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-2">
              <Link
                to={navPaths.requestProject}
                className="inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase bg-background text-foreground px-10 py-4 hover:bg-background/90 transition-colors duration-300"
              >
                Обсудить проект
              </Link>
              <Link
                to={navPaths.collections}
                className="inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase border border-background/30 text-background px-10 py-4 hover:bg-background/10 transition-colors duration-300"
              >
                Смотреть решения
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10">
          <div className="container-brand px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-background/10">
              {[
                { value: "IP65", label: "Защита" },
                { value: "3000K", label: "Тёплый свет" },
                { value: "10+", label: "Лет службы" },
                { value: "РФ", label: "Производство" },
              ].map((item) => (
                <div key={item.label} className="py-5 md:py-6 px-4 md:px-8">
                  <span className="font-display text-lg md:text-xl font-light text-background/80">
                    {item.value}
                  </span>
                  <span className="block text-[10px] font-body font-medium tracking-brand uppercase text-background/35 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
