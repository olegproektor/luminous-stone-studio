import { Link } from "react-router-dom";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const priceFrom = Math.min(...product.variants.map((v) => v.price ?? Infinity));
  const firstVariant = product.variants[0];

  return (
    <Link
      to={`/catalog/${product.slug}`}
      className={`group block ${className}`}
    >
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-5">
        <img
          src={product.images[0]?.src || "/placeholder.svg"}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {firstVariant && !firstVariant.inStock && (
          <span className="absolute top-4 right-4 text-[10px] font-body font-medium tracking-brand uppercase bg-foreground/80 text-background px-3 py-1.5">
            Под заказ
          </span>
        )}
        {/* Subtle material indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div>
        <p className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-1.5">
          {product.series}
        </p>
        <h3 className="font-display text-lg md:text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-body text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>
        {priceFrom !== Infinity && (
          <p className="font-body text-sm font-medium text-foreground mt-3">
            от {priceFrom.toLocaleString("ru-RU")} ₽
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
