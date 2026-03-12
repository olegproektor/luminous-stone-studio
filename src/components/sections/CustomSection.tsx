import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

const CustomSection = () => {
  return (
    <section className="bg-secondary">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Visual */}
        <div className="relative aspect-square lg:aspect-auto bg-card overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="w-20 h-20 border border-accent/30 mx-auto mb-6 flex items-center justify-center">
                <div className="w-10 h-10 bg-accent/15" />
              </div>
              <p className="font-display text-2xl font-light text-foreground/30">Ваш проект</p>
              <p className="font-body text-xs tracking-brand uppercase text-muted-foreground mt-3">
                Форма · Фактура · Свет
              </p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex items-center">
          <div className="px-6 py-24 md:px-12 lg:px-20 lg:py-0 max-w-lg">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-6">
              Кастомизация
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight mb-6">
              Адаптируем под ваш проект
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
              Форма, размеры, фактура, цвет, тип монтажа — всё подстраивается под конкретный объект. От единичного изделия до серийной партии.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Нестандартные размеры и пропорции",
                "Индивидуальные цвета и фактуры",
                "Кастомная форма световой щели",
                "Специальные варианты монтажа",
                "Адаптация под 12V или солнечные панели",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="font-body text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to={navPaths.forObjects}
              className="inline-flex text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-10 py-4 hover:bg-charcoal-light transition-colors duration-300"
            >
              Обсудить кастомизацию
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
