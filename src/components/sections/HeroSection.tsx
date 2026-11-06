import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroBollard from "@/assets/hero-bollard.jpg";
import stoneSceneDay from "@/assets/hero/stone-scene-day.png";
import stoneSceneNight from "@/assets/hero/stone-scene-night.png";
import TrackedCta from "@/components/TrackedCta";
import { siteStrategy } from "@/config/site-strategy";

const AUTO_PLAY_DURATION = 5600;
const HERO_IMAGE_SWAP_DURATION = 2600;

type HeroSlide = {
  title: string;
  position: string;
  overlay: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
};

const slides: HeroSlide[] = [
  {
    title: "Каменные светильники\nдля частных и\nобъектных пространств",
    position: "object-center",
    overlay: "from-black/82 via-black/42 to-black/10",
    images: [
      {
        src: stoneSceneNight,
        alt: "Каменные светильники в архитектурном дворе, вечерняя сцена",
      },
      {
        src: stoneSceneDay,
        alt: "Каменные светильники в архитектурном дворе, дневная сцена",
      },
    ],
  },
  {
    title: "Мягкая навигация\nдля вечернего пространства",
    position: "object-[56%_center]",
    overlay: "from-black/82 via-black/48 to-stone-900/10",
    images: [
      {
        src: heroBollard,
        alt: "Каменный светильник в вечернем ландшафте",
      },
    ],
  },
  {
    title: "Свет, который\nподчёркивает материал",
    position: "object-[44%_center]",
    overlay: "from-black/86 via-stone-950/50 to-amber-950/8",
    images: [
      {
        src: heroBollard,
        alt: "Каменный светильник в вечернем ландшафте",
      },
    ],
  },
];

const metrics = [
  { value: "IP65+", label: "Защита" },
  { value: "30000+ часов", label: "Ресурс" },
  { value: "Ручная", label: "Сборка" },
  { value: "5 лет", label: "Гарантия" },
];

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeImagePhase, setActiveImagePhase] = useState(0);
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 780], [0, 118]);
  const imageScale = useTransform(scrollY, [0, 780], [1.04, 1.16]);
  const contentY = useTransform(scrollY, [0, 360], [0, 38]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_DURATION);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    setActiveImagePhase(0);
  }, [activeSlide]);

  useEffect(() => {
    const imageCount = slides[activeSlide].images.length;
    if (prefersReducedMotion || imageCount <= 1) return undefined;

    if (imageCount === 2) {
      const timeout = window.setTimeout(() => {
        setActiveImagePhase(1);
      }, HERO_IMAGE_SWAP_DURATION);

      return () => window.clearTimeout(timeout);
    }

    const interval = window.setInterval(() => {
      setActiveImagePhase((current) => (current + 1) % imageCount);
    }, HERO_IMAGE_SWAP_DURATION);
    return () => window.clearInterval(interval);
  }, [activeSlide, prefersReducedMotion]);

  const currentSlide = slides[activeSlide];
  const currentImage = currentSlide.images[activeImagePhase] ?? currentSlide.images[0];

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[hsl(var(--hero-overlay))] text-[hsl(var(--hero-text))]">
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide}
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0.18 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentSlide.images.map((image, index) => (
              <motion.img
                key={`${activeSlide}-${image.src}`}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 h-full w-full object-cover ${currentSlide.position}`}
                style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
                loading="eager"
                initial={index === 0 ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: index === activeImagePhase ? 1 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
            <div className={`absolute inset-0 bg-gradient-to-t ${currentSlide.overlay}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,228,196,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_30%)]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          className="container-brand px-6 pb-[11rem] pt-32 md:px-12 md:pb-[9.75rem] lg:px-24 lg:pb-[10.25rem]"
          style={prefersReducedMotion ? undefined : { y: contentY }}
        >
          <div className="max-w-[72rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="max-w-5xl whitespace-pre-line font-display text-5xl leading-[1.05] text-[hsl(var(--hero-text))] md:text-7xl lg:text-[6.25rem]">
                  {currentSlide.title}
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
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 w-full max-w-[20rem] md:mt-14 md:ml-[-5.25rem] md:max-w-[24rem] lg:ml-[-6.5rem]">
              <div className="relative">
                <div className="flex items-center justify-between px-1">
                  {slides.map((slide, index) => {
                    const isActive = index === activeSlide;
                    return (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Показать слайд ${index + 1}`}
                        className={`
                          relative z-10 flex h-10 w-10 items-center justify-center text-xl
                          transition-colors duration-300
                          ${isActive ? "text-[hsl(var(--hero-text))]" : "text-[hsl(var(--hero-text-muted)/0.72)] hover:text-[hsl(var(--hero-text))]"}
                        `}
                      >
                        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
                          {isActive ? (
                            <motion.circle
                              cx="20"
                              cy="20"
                              r="18.5"
                              fill="none"
                              stroke="hsl(var(--hero-text))"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{
                                duration: prefersReducedMotion ? 0 : AUTO_PLAY_DURATION / 1000,
                                ease: "linear",
                              }}
                            />
                          ) : (
                            <circle
                              cx="20"
                              cy="20"
                              r="18.5"
                              fill="none"
                              stroke="transparent"
                              strokeWidth="1.25"
                            />
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
        </motion.div>

        <motion.div className="absolute inset-x-0 bottom-0 z-30 border-t border-[hsl(var(--hero-line)/0.12)] bg-[hsl(var(--hero-surface)/0.16)] backdrop-blur-[2px]">
          <div className="grid grid-cols-2 gap-px bg-[hsl(var(--hero-line)/0.08)] md:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="flex min-h-[72px] flex-col items-center justify-center bg-[hsl(var(--hero-surface)/0.08)] px-4 py-2.5 text-center md:min-h-[80px] md:px-6 md:py-3 lg:px-8"
              >
                <div className="font-display text-[1.1rem] text-[hsl(var(--hero-text))] md:text-[1.4rem]">{item.value}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-brand-wide text-[hsl(var(--hero-text-muted))]">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
