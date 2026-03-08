import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";

const CustomSection = () => {
  return (
    <Section
      variant="alt"
      eyebrow="Индивидуальные решения"
      title="Кастомизация под ваш проект"
      subtitle="Адаптируем форму, размеры, фактуру, цвет, тип монтажа и питания под конкретный объект. Работаем от единичных заказов до серийных партий."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <ul className="space-y-4">
            {[
              "Нестандартные размеры и пропорции",
              "Индивидуальные цвета и фактуры",
              "Кастомная форма световой щели",
              "Специальные варианты монтажа",
              "Адаптация под 12V или солнечные панели",
              "Серийное производство под проект",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/custom"
            className="inline-flex mt-10 text-sm font-body font-medium tracking-wide text-primary-foreground bg-primary px-8 py-3.5 hover:bg-charcoal-light transition-colors duration-200"
          >
            Обсудить кастомизацию
          </Link>
        </div>
        <div className="relative aspect-square bg-secondary flex items-center justify-center">
          <div className="text-center px-8">
            <div className="w-24 h-24 border border-accent/40 mx-auto mb-6 flex items-center justify-center">
              <div className="w-12 h-12 bg-accent/20" />
            </div>
            <p className="font-display text-xl font-light text-foreground/40">Ваш проект</p>
            <p className="font-body text-sm text-muted-foreground mt-2">Форма · Фактура · Свет</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CustomSection;
