import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { buildPath } from "@/lib/route-helpers";

interface ProjectProductsModuleProps {
  products: Product[];
}

const ProjectProductsModule = ({ products }: ProjectProductsModuleProps) => {
  if (products.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-lg font-medium text-foreground mb-4">Использованные изделия</h3>
      <div className="space-y-4">
        {products.map((product) => (
          <Link key={product.id} to={buildPath.product(product.slug)} className="flex items-center gap-4 group">
            <div className="w-16 h-16 bg-secondary flex-shrink-0 overflow-hidden">
              <img
                src={product.images[0]?.src || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors">{product.name}</p>
              <p className="font-body text-xs text-muted-foreground">{product.series}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectProductsModule;
