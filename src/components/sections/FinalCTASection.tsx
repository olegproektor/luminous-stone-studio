import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

const FinalCTASection = () => {
  return (
    <section className="relative bg-primary section-padding grain-overlay">
      <div className="container-brand relative z-10 text-center">
        <p className="mb-6 text-xs font-body font-medium uppercase tracking-brand-wide text-primary-foreground/35">
          Обсуждение проекта
        </p>
        <h2 className="mx-auto mb-8 max-w-3xl font-display text-4xl font-light leading-[0.95] text-primary-foreground md:text-6xl lg:text-7xl">
          Подберём решение
          <br />
          для вашего пространства
        </h2>
        <p className="mx-auto mb-12 max-w-md font-body text-sm text-primary-foreground/45">
          Обсудим задачу, предложим сценарий света и поможем собрать проектное решение под частный или объектный
          контекст.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to={navPaths.requestProject}
            className="inline-flex items-center justify-center bg-background px-12 py-4 text-xs font-body font-medium uppercase tracking-brand text-foreground transition-colors duration-300 hover:bg-background/90"
          >
            Обсудить проект
          </Link>
          <a
            href="tel:+74951234567"
            className="inline-flex items-center justify-center border border-primary-foreground/20 px-12 py-4 text-xs font-body font-medium uppercase tracking-brand text-primary-foreground/70 transition-colors duration-300 hover:border-primary-foreground/40 hover:text-primary-foreground"
          >
            +7 (495) 123-45-67
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
