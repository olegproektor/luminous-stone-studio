import { motion } from "framer-motion";

const storyGroups = [
  {
    title: "Светильники из литьевого и натурального камня",
    body: "Для частных садов, дворов, глэмпингов, турбаз и курортных территорий.",
  },
  {
    title: "Новые световые сценарии для уличной среды",
    body: "Каменные светильники создаются для пространств, где важны атмосфера, фактура и цельный образ территории.",
  },
  {
    title: "Ручная работа, светотехника и внимание к материалу",
    body: "Каждый светильник раскрывает естественную выразительность камня и превращает его в источник мягкого, теплого света.",
  },
  {
    title: "Камень, свет и простая сильная форма",
    body: "Объект органично входит в ландшафт и рассчитан на работу под открытым небом.",
  },
];

const HomeStorySection = () => {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#f3f1ec] pt-18 pb-9 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.2),transparent_18%),linear-gradient(135deg,#f3f1ec_0%,#efebe3_52%,#f7f4ef_100%)]" />
      <div className="container-brand relative px-6 md:px-12 lg:px-24">
        <motion.div
          className="grid gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-x-20 xl:gap-x-24"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lg:self-start">
            <h2 className="max-w-[18rem] font-display text-4xl font-light uppercase leading-[0.88] text-stone-950 md:text-5xl lg:text-[3.05rem] xl:max-w-[19rem] xl:text-[3.18rem]">
              Каменные
              <br />
              светильники
              <br />
              для
              <br />
              ландшафта
              <br />
              для открытых
              <br />
              пространств
            </h2>
          </div>

          <div className="max-w-[42rem] space-y-8 lg:self-start">
            {storyGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-[1.02rem] font-medium leading-[1.5] text-stone-900 md:text-[1.08rem]">
                  {group.title}
                </p>
                <p className="text-sm leading-[1.82] text-stone-700 md:text-[15px] md:leading-[1.9]">
                  {group.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeStorySection;
