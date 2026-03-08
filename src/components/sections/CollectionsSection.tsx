import Section from "@/components/layout/Section";
import CollectionCard from "@/components/ui/collection-card";
import { collections } from "@/data/collections";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CollectionsSection = () => {
  return (
    <Section
      variant="alt"
      eyebrow="Коллекции"
      title="Линейки продуктов"
      subtitle="Каждая коллекция — это законченная система с единым визуальным языком."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-sm font-body font-medium tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
        >
          Все коллекции <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
};

export default CollectionsSection;
