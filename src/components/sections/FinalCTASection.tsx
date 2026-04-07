import TrackedCta from "@/components/TrackedCta";
import { siteStrategy } from "@/config/site-strategy";

const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-stone-950 py-28 text-white md:py-36 lg:py-40">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,18,17,0.92)_0%,rgba(19,18,17,0.98)_35%,rgba(17,16,15,1)_100%)]" />
      <div className="container-brand relative px-6 text-center md:px-12 lg:px-24">
        <p className="mb-6 text-[11px] uppercase tracking-[0.24em] text-white/38">Обсуждение проекта</p>
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-light leading-[0.95] md:text-6xl lg:text-7xl">
          Подберём решение
          <br />
          под архитектуру и сценарий пространства
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-white/56 md:text-base">
          Сопоставим коллекции, материалы и формат применения под частный или объектный проект и предложим следующий рабочий шаг.
        </p>
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <TrackedCta
            href={siteStrategy.primaryConversion.href}
            label={siteStrategy.primaryConversion.label}
            context="home_final_primary"
            variant="siteInverse"
            size="siteLg"
          />
          <TrackedCta
            href={siteStrategy.secondaryCtas.forObjects.href}
            label={siteStrategy.secondaryCtas.forObjects.label}
            context="home_final_secondary"
            variant="siteInverseOutline"
            size="siteLg"
          />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
