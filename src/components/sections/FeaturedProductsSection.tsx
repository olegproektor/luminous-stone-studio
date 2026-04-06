import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { buildPath, navPaths } from "@/lib/route-helpers";
import { izdeliyaProductsSeed } from '@/data/izdeliya-architecture.seed';
import { cn } from '@/lib/utils';

const featuredProducts = izdeliyaProductsSeed.slice(0, 4);

const FeaturedProductsSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-brand">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
              Решения
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
              Решения для сценариев света
            </h2>
          </div>
          <Link
            to={navPaths.products}
            className={cn(buttonVariants({ variant: "sitePrimary", size: "site" }), "mt-6 md:mt-0")}
          >
            Смотреть решения <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.slug} to={buildPath.collectionProduct(product.collectionSlug, product.slug)} className="group block">
              <div className="relative aspect-[3/4] bg-background overflow-hidden mb-5">
                <img
                  src="/placeholder.svg"
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 text-[10px] font-body font-medium tracking-brand uppercase bg-foreground/85 text-background px-3 py-1.5">
                  Для проекта
                </span>
              </div>
              <div>
                <p className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-1.5">
                  {product.collectionSlug === "vozduh" ? "Воздух" : "Земля"}
                </p>
                <h3 className="font-display text-lg md:text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>
                <p className="font-body text-sm font-medium text-foreground mt-3">Смотреть решение</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
