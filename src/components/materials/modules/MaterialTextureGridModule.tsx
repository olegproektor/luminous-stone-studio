import Section from "@/components/layout/Section";
import type { MaterialFamily } from "@/types/materials";
import { Link } from "react-router-dom";
import { buildPath } from "@/lib/route-helpers";

interface MaterialTextureGridModuleProps {
  materials: MaterialFamily[];
}

const MaterialTextureGridModule = ({ materials }: MaterialTextureGridModuleProps) => {
  const sharedFinishes = Array.from(
    new Map(materials.flatMap((material) => material.availableFinishes).map((item) => [item.key, item])).values()
  );

  return (
    <Section
      eyebrow="Направления"
      title="Материальные направления для проекта"
      subtitle="Сначала определяем тип материала, затем поверхность, финиш и возможные специальные решения под конкретное пространство."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {materials.map((material) => (
          <Link key={material.id} to={buildPath.texture(material.slug)} className="group block bg-secondary">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={material.heroImage.src}
                alt={material.heroImage.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 p-6">
              <div>
                <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">
                  {material.tagline}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-foreground transition-colors group-hover:text-accent">
                  {material.name}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{material.summary}</p>
              <div className="flex flex-wrap gap-2">
                {material.availableFinishes.slice(0, 3).map((finish) => (
                  <span
                    key={`${material.slug}-${finish.key}`}
                    className="inline-flex border border-border px-3 py-1 font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground"
                  >
                    {finish.name}
                  </span>
                ))}
              </div>
              <span className="inline-flex text-xs font-body font-medium uppercase tracking-brand text-foreground">
                Смотреть материал
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-border p-6 lg:p-8">
          <h3 className="font-display text-2xl font-medium text-foreground">Финиши и поверхности</h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
            Гладкий и текстурный, матовый и полированный. Поверхность подбирается под материал, задачу и характер пространства.
          </p>
          <div className="mt-6 space-y-3">
            {sharedFinishes.map((finish) => (
              <div key={finish.key}>
                <p className="font-body text-xs uppercase tracking-brand-wide text-foreground">{finish.name}</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{finish.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-6 lg:p-8">
          <h3 className="font-display text-2xl font-medium text-foreground">Индивидуальный заказ</h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
            Помимо базовых материалов, можем согласовать специальные варианты под объект: оникс, горное стекло, композит под оникс и другие декоративные решения.
          </p>
          <div className="mt-6 space-y-3">
            {materials
              .find((material) => material.slug === "special-materials")
              ?.specialVariants.map((variant) => (
                <div key={variant.slug}>
                  <p className="font-body text-xs uppercase tracking-brand-wide text-foreground">{variant.name}</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{variant.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MaterialTextureGridModule;

