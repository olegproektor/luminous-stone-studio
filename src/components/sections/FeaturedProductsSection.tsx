import Section from "@/components/layout/Section";
import ProductCard from "@/components/ui/product-card";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedProductsSection = () => {
  const featured = products.slice(0, 4);

  return (
    <Section
      variant="alt"
      eyebrow="Каталог"
      title="Избранные модели"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm font-body font-medium tracking-wide text-primary-foreground bg-primary px-8 py-3.5 hover:bg-charcoal-light transition-colors duration-200"
        >
          Весь каталог <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedProductsSection;
