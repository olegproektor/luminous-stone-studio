import Section from "@/components/layout/Section";

const advantages = [
  {
    number: "01",
    title: "Архитектурная форма",
    description:
      "Световой объект проектируется как часть среды — от чистой геометрии до более природной пластики, продолжающей ландшафт.",
  },
  {
    number: "02",
    title: "Фактура камня",
    description:
      "Камень создаёт тактильность и визуальную глубину в пространстве. Два финиша: гладкий и текстурный.",
  },
  {
    number: "03",
    title: "Под ваш проект",
    description:
      "Подбираем высоту, световой сценарий, материал и фактуру под конкретную задачу и характер пространства.",
  },
  {
    number: "04",
    title: "Любой масштаб",
    description:
      "Частный участок, бутик-отель или территория курорта — работаем с проектами любого объёма и сложности.",
  },
];

const AdvantagesSection = () => {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
        {advantages.map((item) => (
          <div key={item.number} className="bg-background p-8 lg:p-10">
            <span className="mb-6 block font-display text-4xl font-light text-accent/40">
              {item.number}
            </span>
            <h3 className="mb-4 font-display text-xl font-medium leading-snug text-foreground">
              {item.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AdvantagesSection;
