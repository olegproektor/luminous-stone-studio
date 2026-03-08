import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Литьевой камень / композит",
  "Высота 500 и 700 мм",
  "Гладкая и текстурная поверхность",
  "Вертикальная световая щель",
  "2 варианта монтажа",
  "LED, тёплый свет 3000K",
];

const AboutProductSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Visual — full-bleed image area */}
        <div className="relative aspect-[3/4] lg:aspect-auto bg-secondary overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="w-px h-40 bg-accent/30 mx-auto mb-8" />
              <p className="font-display text-3xl font-light text-foreground/30">
                500 / 700
              </p>
              <p className="font-body text-xs tracking-brand uppercase text-muted-foreground mt-3">
                Две высоты · Два финиша
              </p>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex items-center order-1 lg:order-2">
          <div className="px-6 py-24 md:px-12 lg:px-20 lg:py-0 max-w-xl">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-6">
              Флагманский продукт
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Боллард STŌN
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
              Минималистичный уличный светильник из литьевого камня с вертикальной световой щелью.
              Спроектирован для архитектурного ландшафта — дорожки, террасы, входные группы, сады.
              Материал, форма и свет работают как единое целое.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check size={14} className="text-accent flex-shrink-0" strokeWidth={2} />
                  <span className="font-body text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/catalog"
              className="inline-flex text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-10 py-4 hover:bg-charcoal-light transition-colors duration-300"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProductSection;
