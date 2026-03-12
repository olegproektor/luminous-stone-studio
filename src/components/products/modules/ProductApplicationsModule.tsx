import Section from "@/components/layout/Section";
import type { Product } from "@/types";

interface ProductApplicationsModuleProps {
  product: Product;
}

const ProductApplicationsModule = ({ product }: ProductApplicationsModuleProps) => {
  if (product.useCases.length === 0) return null;

  return (
    <Section eyebrow="Применение" title="Где используют">
      <div className="flex flex-wrap gap-3">
        {product.useCases.map((useCase) => (
          <span key={useCase} className="text-sm font-body font-medium px-5 py-2.5 bg-secondary text-foreground">
            {useCase}
          </span>
        ))}
      </div>
    </Section>
  );
};

export default ProductApplicationsModule;
