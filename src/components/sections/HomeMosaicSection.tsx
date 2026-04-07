import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroBollard from "@/assets/hero-bollard.jpg";
import { navPaths } from "@/lib/route-helpers";

interface MosaicTileProps {
  title: string;
  to: string;
  background: string;
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
}

const MosaicTile = ({
  title,
  to,
  background,
  className = "",
  textClassName = "",
  ariaLabel,
}: MosaicTileProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-34, 34]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.28, 0.16, 0.3]);

  return (
    <Link
      ref={ref}
      to={to}
      aria-label={ariaLabel ?? title}
      className={`group relative block overflow-hidden bg-stone-300 ${className}`}
    >
      <motion.div
        className="absolute inset-0 scale-[1.08]"
        style={{ y: bgY, backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-80"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative flex h-full min-h-[340px] items-start p-7 md:min-h-[410px] md:p-10 lg:min-h-0 lg:p-12">
        <span
          className={`font-body text-[2rem] font-light lowercase tracking-[0.01em] text-white transition-transform duration-500 group-hover:translate-x-1 md:text-[2.55rem] lg:text-[2.9rem] ${textClassName}`}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

const HomeMosaicSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#ece9e3] pt-4 pb-28 md:pt-6 md:pb-36 lg:pt-8 lg:pb-40">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f0ede7_0%,#ece9e3_18%,#e7e2d9_58%,#ece8e2_100%)]" />
      <div className="container-brand relative px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          className="px-0 md:px-2"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-5 md:gap-6 lg:grid-cols-12 lg:auto-rows-[300px] xl:auto-rows-[340px]">
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
        </motion.div>
      </div>
    </section>
  );
};

export default HomeMosaicSection;
