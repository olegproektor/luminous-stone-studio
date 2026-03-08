import { Link } from "react-router-dom";
import type { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
  className?: string;
}

const CollectionCard = ({ collection, className = "" }: CollectionCardProps) => {
  return (
    <Link
      to={`/collections`}
      className={`group block relative overflow-hidden ${className}`}
    >
      <div className="relative aspect-[3/4] bg-card">
        <img
          src={collection.coverImage.src}
          alt={collection.coverImage.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <p className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-background/40 mb-2">
            {collection.productIds.length}{" "}
            {collection.productIds.length === 1 ? "модель" : "модели"}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-light text-background leading-tight">
            {collection.name}
          </h3>
          <p className="font-body text-xs text-background/50 mt-2 leading-relaxed">
            {collection.tagline}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
