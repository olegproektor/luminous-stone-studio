import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import heroBollard from "@/assets/hero-bollard.jpg";
import TrackedCta from "@/components/TrackedCta";
import { siteStrategy } from "@/config/site-strategy";
import { trackEvent } from "@/lib/analytics";

const AUTO_PLAY_DURATION = 5600;

const slides = [
  {
    eyebrow: "Каменные световые решения для ландшафта и архитектуры",
    title: "Подбираем решения из камня\nдля частных и объектных пространств",
    body:
      "Сайт помогает выбрать характер света, коллекцию и формат применения для участка, входной группы, маршрутов и архитектурных акцентов, а затем перевести задачу в обсуждение проекта.",
    position: "object-center",
    overlay: "from-black/82 via-black/42 to-black/10",
  },
  {
    eyebrow: "Сценарий для маршрутов и входных групп",
    title: "Мягкая навигация\nдля вечернего пространства",
    body:
      "Деликатный тёплый свет помогает обозначить движение, вход и границы функциональных зон без визуальной перегрузки. Такой сценарий особенно важен для частных участков, камерных объектов и гостиничных территорий.",
    position: "object-[56%_center]",
    overlay: "from-black/82 via-black/48 to-stone-900/10",
  },
  {
    eyebrow: "Сценарий для рельефа и архитектурных акцентов",
    title: "Свет, который\nподчёркивает материал",
    body:
      "Акцентный свет помогает работать с фактурой камня, посадками и пластикой пространства. Такой подход нужен там, где материал должен читаться как часть архитектурного языка, а не как фон.",
    position: "object-[44%_center]",
    overlay: "from-black/86 via-stone-950/50 to-amber-950/8",
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

  const currentSlide = slides[activeSlide];

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
            <motion.img
              src={heroBollard}
              alt="Каменный светильник в вечернем ландшафте"
              className={`h-full w-full object-cover ${currentSlide.position}`}
              style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
              loading="eager"
            />
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
                <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--hero-text-muted))] md:mb-7">
                  {currentSlide.eyebrow}
                </p>
                <h1 className="max-w-5xl whitespace-pre-line font-display text-5xl font-light leading-[0.94] text-[hsl(var(--hero-text))] md:text-7xl lg:text-[6.25rem]">
                  {currentSlide.title}
                </h1>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-[hsl(var(--hero-text-muted))] md:mt-8 md:text-base">
                  {currentSlide.body}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-12">
                  <TrackedCta
                    href={siteStrategy.primaryConversion.href}
                    label={siteStrategy.primaryConversion.label}
                    context="home_hero_primary"
                    variant="siteInverse"
                    size="siteLg"
                  />
                  <TrackedCta
                    href={siteStrategy.secondaryCtas.collections.href}
                    label={siteStrategy.secondaryCtas.collections.label}
                    context="home_hero_secondary"
                    variant="siteInverseOutline"
                    size="siteLg"
                  />
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                  {siteStrategy.audiencePaths.map((item) => (
                    <Link
                      key={item.context}
                      to={item.href}
                      onClick={() => trackEvent("cta_click", { context: item.context, target: item.href })}
                      className="inline-flex items-center gap-2 border-b border-[hsl(var(--hero-line)/0.45)] pb-1 text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--hero-text-muted))] transition-colors hover:text-[hsl(var(--hero-text))]"
                    >
                      {item.label}
                    </Link>
                  ))}
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
                        key={slide.eyebrow}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Показать слайд ${slide.eyebrow}`}
                        className={`
                          relative z-10 flex h-10 w-10 items-center justify-center text-xl font-light
                          transition-colors duration-300
                          ${isActive ? "text-[hsl(var(--hero-text))]" : "text-[hsl(var(--hero-text-muted)/0.72)] hover:text-[hsl(var(--hero-text))]"}
                        `}
                      >
                        <svg
                          className="absolute inset-0 -rotate-90"
                          viewBox="0 0 40 40"
                          aria-hidden="true"
                        >
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
                <div className="font-display text-[1.1rem] font-light text-[hsl(var(--hero-text))] md:text-[1.4rem]">{item.value}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--hero-text-muted))]">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
