import ProductCard from "@/components/ui/product-card";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { navPaths } from "@/lib/route-helpers";

const FeaturedProductsSection = () => {
  const featured = products.filter((item) => item.launchTier === "primary" && !item.isHidden).slice(0, 4);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-brand">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
              Каталог
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
              Избранные модели
            </h2>
          </div>
          <Link
            to={navPaths.products}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-8 py-3.5 hover:bg-charcoal-light transition-colors duration-300"
          >
            Весь каталог <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
