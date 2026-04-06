import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { getIzdeliyaCollectionBySlug, getIzdeliyaProductsByCollection } from "@/data/izdeliya-architecture.seed";
import { buttonVariants } from '@/components/ui/button';
import { buildPath } from '@/lib/route-helpers';
import { cn } from '@/lib/utils';

const collection = getIzdeliyaCollectionBySlug("vozduh");
const collectionProducts = getIzdeliyaProductsByCollection("vozduh");

const features = [
  "Лёгкая вертикаль света для дорожек и входных групп",
  "Камерная навигация без визуального шума",
  "Модели для приватного ландшафта и архитектурных осей",
  "Сценарный подбор внутри одной коллекции",
];

const AboutProductSection = () => {
  if (!collection) return null;

  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="relative aspect-[3/4] lg:aspect-auto bg-secondary overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="w-px h-40 bg-accent/30 mx-auto mb-8" />
              <p className="font-display text-3xl font-light text-foreground/30">{collection.name}</p>
              <p className="font-body text-xs tracking-brand uppercase text-muted-foreground mt-3">
                {collectionProducts.map((item) => item.name).join(" · ")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center order-1 lg:order-2">
          <div className="px-6 py-24 md:px-12 lg:px-20 lg:py-0 max-w-xl">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-6">
              Коллекция в фокусе
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
              {collection.name}
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
              {collection.description} Коллекция объединяет модели для мягкой навигации, входных сценариев и
              камерной архитектурной среды, где важны ритм, тишина формы и материал.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check size={14} className="text-accent flex-shrink-0" strokeWidth={2} />
                  <span className="font-body text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={buildPath.collection(collection.slug)}
              className={cn(buttonVariants({ variant: "sitePrimary", size: "site" }))}
            >
              Открыть коллекцию
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProductSection;
