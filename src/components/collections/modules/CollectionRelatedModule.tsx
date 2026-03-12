import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import type { Collection } from "@/types";
import { buildPath } from "@/lib/route-helpers";

interface CollectionRelatedModuleProps {
  collections: Collection[];
}

const CollectionRelatedModule = ({ collections }: CollectionRelatedModuleProps) => {
  if (collections.length === 0) return null;

  return (
    <Section variant="alt" eyebrow="Другие коллекции" title="Смотрите также">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((item) => (
          <Link
            key={item.id}
            to={buildPath.collection(item.slug)}
            className="block group border border-border p-5 hover:bg-secondary transition-colors"
          >
            <h3 className="font-display text-xl text-foreground group-hover:text-accent transition-colors">
              {item.name}
            </h3>
            <p className="font-body text-xs text-muted-foreground mt-2">{item.tagline}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default CollectionRelatedModule;
