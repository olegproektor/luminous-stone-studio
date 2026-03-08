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
      <div className="relative aspect-[4/5] bg-secondary">
        <img
          src={collection.coverImage.src}
          alt={collection.coverImage.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-background/50 mb-2">
            {collection.productIds.length} {collection.productIds.length === 1 ? "модель" : "модели"}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-light text-background leading-tight">
            {collection.name}
          </h3>
          <p className="font-body text-sm text-background/60 mt-2">
            {collection.tagline}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
