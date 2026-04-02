import CollectionCard from "@/components/ui/collection-card";
import { izdeliyaCollectionsSeed } from "@/data/izdeliya-architecture.seed";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { navPaths } from "@/lib/route-helpers";

const CollectionsSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-brand">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
              Коллекции
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
              Линейки изделий
            </h2>
          </div>
          <Link
            to={navPaths.collections}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-body font-medium tracking-brand uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Все коллекции <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {izdeliyaCollectionsSeed.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
