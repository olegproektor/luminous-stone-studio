import Section from "@/components/layout/Section";

const advantages = [
  {
    number: "01",
    title: "Архитектурная форма",
    description: "Каждый светильник спроектирован как архитектурный объект — чистая геометрия, выверенные пропорции, строгий силуэт.",
  },
  {
    number: "02",
    title: "Фактура натурального камня",
    description: "Литьевой камень и композит передают тактильность и визуальную глубину натурального материала.",
  },
  {
    number: "03",
    title: "Кастомизация под проект",
    description: "Высота, фактура, цвет, тип монтажа и питания — адаптируем под конкретный ландшафт и задачу.",
  },
  {
    number: "04",
    title: "Для любого масштаба",
    description: "От одного болларда для частного сада до комплектации целого курорта — работаем с проектами любого объёма.",
  },
];

const AdvantagesSection = () => {
  return (
    <Section eyebrow="Преимущества" title="Почему STŌN">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {advantages.map((item) => (
          <div key={item.number} className="group">
            <span className="font-display text-3xl font-light text-accent/60 block mb-4">
              {item.number}
            </span>
            <h3 className="font-display text-xl font-medium text-foreground mb-3">
              {item.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AdvantagesSection;
