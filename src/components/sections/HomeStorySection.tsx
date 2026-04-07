import { motion } from "framer-motion";

const storyGroups = [
  {
    title: "Материал работает как часть архитектурного языка",
    body: "Камень здесь важен не как декоративная оболочка, а как основа характера объекта: тактильная, весомая и связанная с окружением.",
  },
  {
    title: "Свет помогает собрать сценарий пространства",
    body: "Мы работаем не с абстрактными товарами, а со световыми задачами: маршрут, входная группа, рельеф, акцент на материале и вечерний ритм участка.",
  },
  {
    title: "Сайт помогает выбрать направление решения",
    body: "Главная ведёт в коллекции, материалы и объектный сценарий, чтобы пользователь не терялся в витрине, а быстро понимал следующий шаг.",
  },
  {
    title: "Следующий шаг — обсуждение проекта",
    body: "После знакомства с направлением света и коллекциями пользователь должен прийти не к просмотру ради просмотра, а к диалогу о применении решения в своём пространстве.",
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
              решения
              <br />
              для
              <br />
              ландшафта
              <br />
              и открытых
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
