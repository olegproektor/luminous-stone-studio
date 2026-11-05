import { motion } from "framer-motion";

const storyGroups = [
  {
    title: "Мы производим каменные светильники для ландшафта и архитектуры",
    body: "В основе подхода не декоративный эффект, а сам материал: тактильный, весомый и связанный с окружением. Камень задаёт характер объекта и помогает светильнику выглядеть как естественная часть пространства.",
  },
  {
    title: "Свет помогает собрать сценарий пространства",
    body: "Мы работаем не с абстрактными товарами, а со световыми задачами: маршрут, входная группа, рельеф, акцент на материале и вечерний ритм участка.",
  },
  {
    title: "Каждое решение подбирается под характер пространства",
    body: "Высота, фактура, направление света и ритм установки подбираются не отдельно друг от друга, а как связанная система, которая должна работать в архитектуре участка или объекта.",
  },
  {
    title: "Мы помогаем перевести идею в проектный разговор",
    body: "После первого знакомства с коллекциями и материалами можно перейти к предметному обсуждению: подобрать направление, понять формат применения и определить следующий шаг по проекту.",
  },
];

const HomeStorySection = () => {
  return (
    <section className="section-padding relative z-10 w-full overflow-hidden bg-[hsl(var(--bg-surface))]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--bg-float))_0%,hsl(var(--bg-surface))_52%,hsl(var(--bg-surface-2))_100%)]" />
      <div className="container-brand relative">
        <motion.div
          className="grid gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-x-20 xl:gap-x-24"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lg:self-start">
            <h2 className="max-w-[18rem] font-display text-4xl uppercase leading-[1.02] text-foreground md:text-5xl lg:text-[3.05rem] xl:max-w-[19rem] xl:text-[3.18rem]">
              Световые
              <br />
              решения
              <br />
              для
              <br />
              ландшафта,
              <br />
              архитектуры
              <br />
              и открытых
              <br />
              пространств
            </h2>
          </div>

          <div className="max-w-[42rem] space-y-8 lg:self-start">
            {storyGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-[1.02rem] font-medium leading-[1.5] text-foreground md:text-[1.08rem]">
                  {group.title}
                </p>
                <p className="text-sm leading-[1.82] text-muted-foreground md:text-[15px] md:leading-[1.9]">
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
