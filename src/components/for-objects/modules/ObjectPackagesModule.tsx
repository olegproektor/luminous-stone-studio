import Section from "@/components/layout/Section";
import type { ObjectPackage } from "@/types/object-packages";

interface ObjectPackagesModuleProps {
  packages: ObjectPackage[];
  className?: string;
}

const ObjectPackagesModule = ({ packages, className = "" }: ObjectPackagesModuleProps) => {
  return (
    <Section eyebrow="Пакеты" title="Пакетные предложения для объектов" className={className}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex h-full flex-col bg-secondary p-8">
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
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ObjectPackagesModule;
