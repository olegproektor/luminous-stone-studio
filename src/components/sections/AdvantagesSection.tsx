import Section from "@/components/layout/Section";

const advantages = [
  {
    number: "01",
    title: "Архитектурная форма",
    description: "Спроектировано как архитектурный объект — выверенные пропорции, чистая геометрия, строгий силуэт в ландшафте.",
  },
  {
    number: "02",
    title: "Фактура камня",
    description: "Литьевой камень передаёт тактильность и визуальную глубину природного материала. Два финиша: гладкий и текстурный.",
  },
  {
    number: "03",
    title: "Под ваш проект",
    description: "Высота, фактура, цвет, монтаж — адаптируем под конкретный ландшафт. От единичного заказа до серии.",
  },
  {
    number: "04",
    title: "Любой масштаб",
    description: "Частный сад, бутик-отель или территория курорта — работаем с проектами любого объёма и сложности.",
  },
];

const AdvantagesSection = () => {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {advantages.map((item) => (
          <div key={item.number} className="bg-background p-8 lg:p-10">
            <span className="font-display text-4xl font-light text-accent/40 block mb-6">
              {item.number}
            </span>
            <h3 className="font-display text-xl font-medium text-foreground mb-4 leading-snug">
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
