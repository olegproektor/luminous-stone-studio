import Section from "@/components/layout/Section";
import type { DownloadCategory } from "@/types/downloads";
import { Link } from "react-router-dom";
import { buildPath } from "@/lib/route-helpers";

interface DownloadsCategoriesModuleProps {
  categories: DownloadCategory[];
}

const DownloadsCategoriesModule = ({ categories }: DownloadsCategoriesModuleProps) => {
  return (
    <Section eyebrow="Разделы" title="Категории загрузок">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link key={category.id} to={buildPath.downloadCategory(category.slug)} className="block p-8 bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
            <h3 className="font-display text-xl font-medium mb-2">{category.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{category.description}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default DownloadsCategoriesModule;
