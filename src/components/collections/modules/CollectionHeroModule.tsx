import type { Collection } from "@/types";

interface CollectionHeroModuleProps {
  collection: Collection;
}

const CollectionHeroModule = ({ collection }: CollectionHeroModuleProps) => {
  return (
    <section className="section-padding !pt-8">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="aspect-[4/3] bg-secondary overflow-hidden">
            <img
              src={collection.coverImage.src}
              alt={collection.coverImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
              Коллекция
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-4">{collection.name}</h1>
            <p className="font-body text-base text-muted-foreground mb-4">{collection.tagline}</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{collection.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHeroModule;
