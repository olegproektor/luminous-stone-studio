import { Link } from "react-router-dom";
import heroBollard from "@/assets/hero-bollard.jpg";
import { useOnceInView } from "@/hooks/useInViewMotion";
import { navPaths } from "@/lib/route-helpers";
import { cn } from "@/lib/utils";

interface MosaicTileProps {
  title: string;
  to: string;
  background: string;
  className?: string;
  ariaLabel?: string;
}

const MosaicTile = ({ title, to, background, className = "", ariaLabel }: MosaicTileProps) => {
  return (
    <Link
      to={to}
      aria-label={ariaLabel ?? title}
      className={cn("group relative block overflow-hidden bg-stone-300", className)}
    >
      <div
        className="motion-tile-media absolute inset-0"
        style={{ backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5" />
      <div className="relative flex h-full min-h-[260px] items-end p-6 md:min-h-[300px] md:p-8 lg:min-h-0 lg:p-10">
        <span className="motion-tile-label font-body text-2xl lowercase tracking-[0.01em] text-white md:text-3xl lg:text-[2.35rem]">
          {title}
        </span>
      </div>
    </Link>
  );
};

const HomeMosaicSection = () => {
  const { ref, shown } = useOnceInView<HTMLDivElement>(0.16);

  return (
    <section className="relative w-full overflow-hidden bg-[hsl(var(--bg-surface-2))] px-6 py-14 md:px-12 md:py-16 lg:px-24 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--bg-surface))_0%,hsl(var(--bg-surface-2))_100%)]" />
      <div className="container-brand relative">
        <div ref={ref} className={cn("motion-reveal", shown && "is-shown")}>
          <div className="grid gap-4 md:gap-5 lg:grid-cols-12 lg:auto-rows-[240px] xl:auto-rows-[280px]">
            <MosaicTile
              title="изделия"
              to={navPaths.collections}
              ariaLabel="Перейти в раздел изделий и коллекций"
              className="lg:col-span-7 lg:row-span-1"
              background={`linear-gradient(180deg, rgba(16,16,16,0.08), rgba(16,16,16,0.28)), url(${heroBollard})`}
            />
            <MosaicTile
              title="о нас"
              to={navPaths.company}
              ariaLabel="Перейти в раздел о компании"
              className="lg:col-span-5 lg:row-span-2"
              background="radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), transparent 26%), linear-gradient(145deg, #d7d2c8 0%, #c4bbad 34%, #e4dfd5 58%, #bcb09e 100%)"
            />
            <MosaicTile
              title="для объектов"
              to={navPaths.forObjects}
              ariaLabel="Перейти в раздел для объектов"
              className="lg:col-span-7 lg:row-span-2"
              background="linear-gradient(145deg, #efede8 0%, #d8d4cb 34%, #f4f2ee 58%, #c9c4ba 100%), radial-gradient(circle at 74% 68%, rgba(255,255,255,0.78), transparent 23%)"
            />
            <MosaicTile
              title="материалы"
              to={navPaths.materials}
              ariaLabel="Перейти в раздел материалов и фактур"
              className="lg:col-span-5 lg:row-span-1"
              background="linear-gradient(162deg, #e4dbc8 0%, #cabda6 46%, #1d1b19 48%, #ece2cf 52%, #d7c7ae 100%)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMosaicSection;
