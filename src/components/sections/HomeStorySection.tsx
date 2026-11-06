import { motion } from "framer-motion";
import heroBollard from "@/assets/hero-bollard.jpg";
import stoneSceneDay from "@/assets/hero/stone-scene-day.png";
import stoneSceneNight from "@/assets/hero/stone-scene-night.png";

const storyLead =
  "Каменные светильники для ландшафта и архитектуры: свет собирает маршрут, вход и рельеф, а высота и фактура работают как одна система.";

const storyFacts = [
  {
    title: "Материал",
    note: "Тактильный камень задаёт характер",
    src: stoneSceneDay,
    alt: "Тактильный камень в дневном свете: характер объекта в ландшафте и архитектуре",
  },
  {
    title: "Сценарий",
    note: "Вечерний ритм маршрута",
    src: stoneSceneNight,
    alt: "Вечерний сценарий света: маршрут, входная группа и рельеф участка",
  },
  {
    title: "Проект",
    note: "Направление света и ритм установки",
    src: heroBollard,
    alt: "Подбор высоты, фактуры и направления света под характер пространства",
  },
];

const HomeStorySection = () => {
  return (
    <section
      aria-labelledby="home-story-title"
      className="relative z-10 w-full overflow-hidden bg-[hsl(var(--bg-surface))] px-6 py-14 md:px-12 md:py-16 lg:px-24 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--bg-float))_0%,hsl(var(--bg-surface))_52%,hsl(var(--bg-surface-2))_100%)]" />
      <div className="container-brand relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="home-story-title"
            className="max-w-[18rem] font-display text-3xl leading-[1.08] text-foreground md:max-w-[28rem] md:text-4xl lg:text-5xl"
          >
            Световые решения под характер пространства
          </h2>
          <p className="mt-5 max-w-[40rem] text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
            {storyLead}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-12">
            {storyFacts.map((fact) => (
              <figure key={fact.title} className="min-w-0">
                <div className="overflow-hidden bg-stone-300">
                  <img
                    src={fact.src}
                    alt={fact.alt}
                    className="aspect-[3/2] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-sm font-medium text-foreground">{fact.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{fact.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeStorySection;
