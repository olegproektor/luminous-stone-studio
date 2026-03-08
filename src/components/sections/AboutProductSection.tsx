import { Check } from "lucide-react";

const features = [
  { text: "Литьевой камень / композит" },
  { text: "Высота 500 и 700 мм" },
  { text: "Гладкая и текстурная поверхность" },
  { text: "Вертикальная световая щель" },
  { text: "2 варианта монтажа" },
  { text: "LED, тёплый свет 3000K" },
];

const AboutProductSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-body font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Флагманский продукт
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Боллард STŌN
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Минималистичный уличный светильник из литьевого камня с вертикальной световой щелью.
              Создан для архитектурного ландшафта — дорожки, террасы, входные группы, сады.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3">
                  <Check size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            <a
              href="/catalog"
              className="inline-flex mt-10 text-sm font-body font-medium tracking-wide text-primary-foreground bg-primary px-8 py-3.5 hover:bg-charcoal-light transition-colors duration-200"
            >
              Подробнее о продукте
            </a>
          </div>

          {/* Visual placeholder — будет заменён на реальное фото продукта */}
          <div className="relative aspect-[3/4] bg-secondary flex items-center justify-center">
            <div className="text-center px-8">
              <div className="w-px h-32 bg-accent mx-auto mb-6" />
              <p className="font-display text-2xl font-light text-foreground/40">
                500 / 700 мм
              </p>
              <p className="font-body text-sm text-muted-foreground mt-2">
                Две высоты, два финиша
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProductSection;
