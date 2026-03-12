import Section from "@/components/layout/Section";
import ProductCard from "@/components/ui/product-card";
import type { Product } from "@/types";

interface CollectionProductsModuleProps {
  products: Product[];
}

const CollectionProductsModule = ({ products }: CollectionProductsModuleProps) => {
  return (
    <Section eyebrow="Изделия коллекции" title="Модели в этой коллекции">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-sm font-body text-muted-foreground">
          Для этой коллекции модели будут добавлены в ближайшем обновлении.
        </div>
      )}
    </Section>
  );
};

export default CollectionProductsModule;
