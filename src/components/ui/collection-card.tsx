import { Link } from "react-router-dom";
import { getIzdeliyaProductsByCollection, type IzdeliyaCollectionSeed } from "@/data/izdeliya-architecture.seed";
import { buildPath } from "@/lib/route-helpers";

interface CollectionCardProps {
  collection: IzdeliyaCollectionSeed;
  className?: string;
}

const CollectionCard = ({ collection, className = "" }: CollectionCardProps) => {
  const models = getIzdeliyaProductsByCollection(collection.slug);

  return (
    <Link to={buildPath.collection(collection.slug)} className={`group block relative overflow-hidden ${className}`}>
      <div className="relative aspect-[3/4] bg-card">
        <img
          src="/placeholder.svg"
          alt={`Коллекция ${collection.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <p className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-background/40 mb-2">
            {models.length} {models.length === 1 ? "модель" : "модели"}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-light text-background leading-tight">
            {collection.name}
          </h3>
          <p className="font-body text-xs text-background/50 mt-2 leading-relaxed">{collection.tagline}</p>
          {collection.status === "in-development" && (
            <p className="mt-4 inline-flex border border-background/30 px-3 py-1 text-[10px] font-body uppercase tracking-brand-wide text-background/80">
              В разработке
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
