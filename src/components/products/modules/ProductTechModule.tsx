import Section from "@/components/layout/Section";
import SpecTable from "@/components/ui/spec-table";
import type { Product } from "@/types";

interface ProductTechModuleProps {
  product: Product;
}

const ProductTechModule = ({ product }: ProductTechModuleProps) => {
  return (
    <Section variant="alt">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h2 className="font-display text-2xl font-medium text-foreground mb-6">Характеристики</h2>
          <SpecTable specs={product.specs} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-medium text-foreground mb-6">Технические группы</h2>
          <div className="space-y-6">
            {(product.techGroups ?? []).map((group) => (
              <div key={group.id}>
                <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">{group.label}</p>
                <ul className="space-y-2">
                  {group.specs.slice(0, 4).map((spec) => (
                    <li key={`${group.id}-${spec.key}`} className="font-body text-sm text-foreground">
                      <span className="text-muted-foreground">{spec.label}: </span>
                      {spec.value}
                      {spec.unit ? ` ${spec.unit}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductTechModule;
