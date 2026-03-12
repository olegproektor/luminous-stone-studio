import Section from "@/components/layout/Section";
import type { ObjectPackage } from "@/types/object-packages";

interface ObjectPackagesModuleProps {
  packages: ObjectPackage[];
}

const ObjectPackagesModule = ({ packages }: ObjectPackagesModuleProps) => {
  return (
    <Section eyebrow="Пакеты" title="Пакетные предложения для объектов">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="p-8 bg-secondary flex flex-col h-full">
            <h3 className="font-display text-xl font-medium text-foreground">{pkg.title}</h3>
            <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{pkg.summary}</p>
            <div className="mt-4 text-sm font-body text-foreground">{pkg.indicativeBudget}</div>
            <ul className="mt-4 space-y-2 flex-1">
              {pkg.scope.map((item) => (
                <li key={item} className="font-body text-sm text-foreground">• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ObjectPackagesModule;
