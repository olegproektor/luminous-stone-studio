import Section from "@/components/layout/Section";
import ProductCard from "@/components/ui/product-card";
import type { Product } from "@/types";

interface ProductRelatedModuleProps {
  products: Product[];
}

const ProductRelatedModule = ({ products }: ProductRelatedModuleProps) => {
  if (products.length === 0) return null;

  return (
    <Section variant="alt" eyebrow="Похожие изделия" title="Вам также может подойти">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
};

export default ProductRelatedModule;
