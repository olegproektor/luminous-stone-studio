import { Link } from "react-router-dom";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const firstVariant = product.variants[0];
  const priceFrom = Math.min(...product.variants.map((v) => v.price));

  return (
    <Link
      to={`/catalog/${product.slug}`}
      className={`group block ${className}`}
    >
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-4">
        <img
          src={product.images[0]?.src || "/placeholder.svg"}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {firstVariant && !firstVariant.inStock && (
          <span className="absolute top-3 right-3 text-xs font-body font-medium tracking-wide bg-foreground/80 text-background px-3 py-1">
            Под заказ
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-1">
          {product.series}
        </p>
        <h3 className="font-display text-lg md:text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-200">
          {product.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.tagline}
        </p>
        <p className="font-body text-sm font-medium text-foreground mt-3">
          от {priceFrom.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
