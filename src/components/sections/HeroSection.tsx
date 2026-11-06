import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import heroBollard from "@/assets/hero-bollard.jpg";
import stoneSceneDay from "@/assets/hero/stone-scene-day.png";
import stoneSceneNight from "@/assets/hero/stone-scene-night.png";
import TrackedCta from "@/components/TrackedCta";
import { siteStrategy } from "@/config/site-strategy";
import { useInView } from "@/hooks/useInViewMotion";
import { cn } from "@/lib/utils";

const HERO_FRAME_MS = 7600;
const UI_DELAY_MS = 1000;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const HERO_TITLE = "Каменные светильники\nдля частных и\nобъектных пространств";

type HeroFrame = {
  src: string;
  alt: string;
  position: string;
};

const frames: HeroFrame[] = [
  {
    src: stoneSceneNight,
    alt: "Каменные светильники для ландшафта и архитектуры, вечерняя сцена",
    position: "object-center",
  },
  {
    src: stoneSceneDay,
    alt: "Каменные светильники в архитектурном дворе, дневной свет",
    position: "object-center",
  },
  {
    src: heroBollard,
    alt: "Каменный светильник: фактура материала и вечерний ритм участка",
    position: "object-[56%_center]",
  },
];

const metrics = [
  { value: "IP65+", label: "Защита" },
  { value: "30000+ часов", label: "Ресурс" },
  { value: "Ручная", label: "Сборка" },
  { value: "5 лет", label: "Гарантия" },
];

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion ?? prefersReducedMotion();
  const { ref, inView } = useInView<HTMLElement>(0.4);
  const [activeFrame, setActiveFrame] = useState(0);
  const [photoSettled, setPhotoSettled] = useState(prefersReducedMotion);
  const [uiReady, setUiReady] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reduce) {
      setPhotoSettled(true);
      setUiReady(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => setPhotoSettled(true));
    const uiTimer = window.setTimeout(() => setUiReady(true), UI_DELAY_MS);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(uiTimer);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce || !inView) return undefined;

    const interval = window.setInterval(() => {
      setActiveFrame((current) => (current + 1) % frames.length);
    }, HERO_FRAME_MS);

    return () => window.clearInterval(interval);
  }, [reduce, inView, activeFrame]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[hsl(var(--hero-overlay))] text-[hsl(var(--hero-text))]"
      style={{ "--motion-duration-hero-frame": `${HERO_FRAME_MS}ms` } as CSSProperties}
      data-hero-ui={uiReady ? "on" : "settle"}
    >
      <div
        className={cn(
          "hero-photo absolute inset-0",
          reduce || photoSettled ? "scale-100 opacity-100" : "scale-[1.03] opacity-90",
        )}
      >
        {frames.map((frame, index) => {
          const isActive = index === activeFrame;
          return (
            <img
              key={frame.src}
              src={frame.src}
              alt={isActive ? frame.alt : ""}
              aria-hidden={isActive ? undefined : true}
              className={cn(
                "hero-frame absolute inset-0 h-full w-full object-cover",
                frame.position,
                isActive ? "opacity-100" : "opacity-0",
              )}
              loading="eager"
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/36 to-black/20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div
          className={cn(
            "hero-ui container-brand px-6 pb-[11rem] pt-32 md:px-12 md:pb-[9.75rem] lg:px-24 lg:pb-[10.25rem]",
            uiReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <div className="max-w-[72rem]">
            <h1 className="max-w-5xl whitespace-pre-line font-display text-5xl leading-[1.05] text-[hsl(var(--hero-text))] md:text-7xl lg:text-[6.25rem]">
              {HERO_TITLE}
            </h1>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-12">
              <TrackedCta
                href={siteStrategy.secondaryCtas.collections.href}
                label={siteStrategy.secondaryCtas.collections.label}
                context="home_hero_secondary"
                variant="siteInverseOutline"
                size="siteLg"
              />
            </div>

            <div className="mt-10 w-full max-w-[16rem] md:mt-14">
              <div className="flex items-center justify-between px-1">
                {frames.map((frame, index) => {
                  const isActive = index === activeFrame;
                  return (
                    <button
                      key={frame.src}
                      type="button"
                      onClick={() => setActiveFrame(index)}
                      aria-label={`Показать слайд ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative z-10 flex h-10 w-10 items-center justify-center text-xl transition-colors duration-300",
                        isActive
                          ? "text-[hsl(var(--hero-text))]"
                          : "text-[hsl(var(--hero-text-muted)/0.72)] hover:text-[hsl(var(--hero-text))]",
                      )}
                    >
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
                        {isActive && !reduce ? (
                          <circle
                            key={inView ? "run" : "hold"}
                            className={cn("hero-ring", !inView && "is-paused")}
                            cx="20"
                            cy="20"
                            r="18.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                          />
                        ) : (
                          <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
                        )}
                      </svg>
                      <span className="font-body text-[1.1rem]">{index + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "hero-ui absolute inset-x-0 bottom-0 z-30 border-t border-[hsl(var(--hero-line)/0.12)] bg-[hsl(var(--hero-surface)/0.72)]",
            uiReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <div className="grid grid-cols-2 gap-px bg-[hsl(var(--hero-line)/0.08)] md:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="flex min-h-[72px] flex-col items-center justify-center bg-[hsl(var(--hero-surface)/0.2)] px-4 py-2.5 text-center md:min-h-[80px] md:px-6 md:py-3 lg:px-8"
              >
                <div className="font-display text-[1.1rem] text-[hsl(var(--hero-text))] md:text-[1.4rem]">{item.value}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-brand-wide text-[hsl(var(--hero-text-muted))]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
