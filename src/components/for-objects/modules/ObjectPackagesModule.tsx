import Section from "@/components/layout/Section";
import type { ObjectPackage } from "@/types/object-packages";

interface ObjectPackagesModuleProps {
  packages: ObjectPackage[];
  className?: string;
}

const ObjectPackagesModule = ({ packages, className = "" }: ObjectPackagesModuleProps) => {
  return (
    <Section
      eyebrow="Типы проектной работы"
      title="Какой формат подбора нужен вашему объекту"
      className={className}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex h-full flex-col bg-secondary p-8">
            <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{pkg.segment}</p>
            <h3 className="font-display text-xl font-medium text-foreground">{pkg.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>
            <div className="mt-4 text-sm font-body text-foreground">{pkg.indicativeBudget}</div>
            <ul className="mt-4 flex-1 space-y-2">
              {pkg.scope.map((item) => (
                <li key={item} className="font-body text-sm text-foreground">
                  • {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border/60 pt-4">
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">Что получите</p>
              <ul className="mt-3 space-y-2">
                {pkg.deliverables.map((item) => (
                  <li key={item} className="font-body text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-xs text-muted-foreground">Срок: {pkg.leadTime}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ObjectPackagesModule;
