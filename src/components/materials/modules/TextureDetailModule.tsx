import Section from "@/components/layout/Section";
import type { MaterialFamily } from "@/types/materials";

interface TextureDetailModuleProps {
  material: MaterialFamily;
}

const TextureDetailModule = ({ material }: TextureDetailModuleProps) => {
  return (
    <Section eyebrow="Материал" title={material.name}>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          <img src={material.heroImage.src} alt={material.heroImage.alt} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-8">
          <div>
            <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">
              {material.tagline}
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">{material.summary}</p>
          </div>

          <div>
            <h3 className="mb-3 font-body text-sm uppercase tracking-wide text-muted-foreground">Роль в проекте</h3>
            <ul className="space-y-2">
              {material.properties.map((property) => (
                <li key={property} className="font-body text-sm text-foreground">
                  • {property}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-body text-sm uppercase tracking-wide text-muted-foreground">Сценарии применения</h3>
            <div className="flex flex-wrap gap-2">
              {material.recommendedUseCases.map((useCase) => (
                <span
                  key={useCase}
                  className="inline-flex border border-border px-3 py-1 font-body text-[11px] uppercase tracking-brand-wide text-foreground"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-border p-6 lg:p-8">
          <h3 className="font-display text-2xl font-medium text-foreground">Поверхности и финиши</h3>
          <div className="mt-5 space-y-4">
            {material.availableFinishes.map((finish) => (
              <div key={`${material.slug}-${finish.key}`}>
                <p className="font-body text-xs uppercase tracking-brand-wide text-foreground">{finish.name}</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{finish.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-6 lg:p-8">
          <h3 className="font-display text-2xl font-medium text-foreground">Индивидуальный подбор</h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
            Подбираем материал и поверхность под проект, согласовываем специальные решения и работаем с индивидуальными образцами под задачу объекта.
          </p>

          {material.specialVariants.length > 0 && (
            <div className="mt-6 space-y-4">
              {material.specialVariants.map((variant) => (
                <div key={variant.slug}>
                  <p className="font-body text-xs uppercase tracking-brand-wide text-foreground">{variant.name}</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{variant.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default TextureDetailModule;

