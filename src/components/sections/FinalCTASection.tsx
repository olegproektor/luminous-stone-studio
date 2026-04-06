import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navPaths } from "@/lib/route-helpers";

const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-stone-950 py-28 text-white md:py-36 lg:py-40">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,18,17,0.92)_0%,rgba(19,18,17,0.98)_35%,rgba(17,16,15,1)_100%)]" />
      <div className="container-brand relative px-6 text-center md:px-12 lg:px-24">
        <p className="mb-6 text-[11px] uppercase tracking-[0.24em] text-white/38">Обсуждение проекта</p>
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-light leading-[0.95] md:text-6xl lg:text-7xl">
          Подберём решение
          <br />
          для вашего пространства
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-white/56 md:text-base">
          Обсудим задачу, предложим сценарий света и подготовим направление по изделиям, материалам и объектному
          применению.
        </p>
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="siteInverse" size="siteLg">
            <Link to={navPaths.requestProject}>Обсудить проект</Link>
          </Button>
          <Button asChild variant="siteInverseOutline" size="siteLg">
            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
