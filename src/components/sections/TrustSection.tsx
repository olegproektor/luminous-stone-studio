import { ShieldCheck, Ruler, Headphones, Factory } from "lucide-react";

const trustItems = [
  {
    icon: Factory,
    title: "Производство в России",
    description: "Собственное производство. Контроль качества на каждом этапе — от формовки до упаковки.",
  },
  {
    icon: Ruler,
    title: "Работа под проект",
    description: "Подбираем решение под задачу: от частного сада до территории курорта.",
  },
  {
    icon: Headphones,
    title: "Сопровождение",
    description: "Консультация, подбор, монтажная документация и техподдержка после установки.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия",
    description: "Гарантия на все изделия. Сертифицированная продукция для уличной эксплуатации.",
  },
];

const TrustSection = () => {
  return (
    <section className="section-padding-sm bg-secondary">
      <div className="container-brand">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {trustItems.map((item) => (
            <div key={item.title} className="bg-secondary p-8 lg:p-10">
              <item.icon size={24} className="text-accent/70 mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-medium text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
