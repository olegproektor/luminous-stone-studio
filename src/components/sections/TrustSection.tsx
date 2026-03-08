import Section from "@/components/layout/Section";
import { ShieldCheck, Ruler, Headphones, Factory } from "lucide-react";

const trustItems = [
  {
    icon: Factory,
    title: "Производство в России",
    description: "Собственное производство. Контролируем качество на каждом этапе.",
  },
  {
    icon: Ruler,
    title: "Работа под проект",
    description: "Подбираем решение под задачу: от частного сада до территории курорта.",
  },
  {
    icon: Headphones,
    title: "Помощь на всех этапах",
    description: "Консультация, подбор, монтажная документация, техподдержка после установки.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия качества",
    description: "Гарантия на все изделия. Сертифицированная продукция для уличной эксплуатации.",
  },
];

const TrustSection = () => {
  return (
    <Section variant="alt" eyebrow="Доверие" title="Почему нам доверяют">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {trustItems.map((item) => (
          <div key={item.title} className="flex flex-col items-start">
            <item.icon size={32} className="text-accent mb-4" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-medium text-foreground mb-2">{item.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default TrustSection;
