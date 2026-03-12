import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MaterialSwatch from "@/components/ui/material-swatch";
import PriceRequestForm from "@/components/forms/PriceRequestForm";
import type { Product } from "@/types";
import type { ProductCtaConfig } from "@/config/product-cta-map";

const mountingLabels: Record<string, string> = {
  surface: "Накладной",
  embedded: "Встраиваемый",
};

const powerLabels: Record<string, string> = {
  "220v": "220V",
  "12v": "12V",
};

interface ProductHeroModuleProps {
  product: Product;
  cta: ProductCtaConfig;
}

const ProductHeroModule = ({ product, cta }: ProductHeroModuleProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [nightMode, setNightMode] = useState(false);
  const [hovering, setHovering] = useState(false);

  const allImages = [...product.images, ...product.environmentImages];
  const allNightImages =
    product.nightImages.length > 0 ? [...product.nightImages, ...product.environmentImages] : allImages;
  const showNight = nightMode || hovering;
  const priceFrom = Math.min(...product.variants.map((v) => v.price ?? Infinity));
  const uniqueColors = Array.from(new Map(product.variants.map((variant) => [variant.color, variant])).values());
  const uniqueMountings = [...new Set(product.variants.map((variant) => variant.mounting))];
  const uniquePowers = [...new Set(product.variants.map((variant) => variant.power))];
  const uniqueTextures = [...new Set(product.variants.map((variant) => variant.texture))];

  return (
    <section className="section-padding !pt-8">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="relative">
              <div
                className={`relative aspect-square overflow-hidden mb-4 transition-colors duration-500 ${showNight ? "bg-foreground" : "bg-secondary"}`}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <img
                  src={allImages[activeImage]?.src || "/placeholder.svg"}
                  alt={allImages[activeImage]?.alt || product.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showNight ? "opacity-0" : "opacity-100"}`}
                />
                <img
                  src={allNightImages[activeImage]?.src || "/placeholder.svg"}
                  alt={allNightImages[activeImage]?.alt || product.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${showNight ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setNightMode(false)}
                  className={`text-xs font-body font-medium transition-all ${!nightMode ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  День
                </button>
                <span className="w-px h-3 bg-border" />
                <button
                  type="button"
                  onClick={() => setNightMode(true)}
                  className={`text-xs font-body font-medium transition-all ${nightMode ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Ночь
                </button>
              </div>
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-secondary overflow-hidden border-2 transition-colors ${
                      index === activeImage ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-start">
            <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">{product.series}</p>
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-2">{product.name}</h1>
            <p className="font-body text-sm text-muted-foreground mb-6">{product.tagline}</p>
            {priceFrom < Infinity && <p className="font-display text-2xl text-foreground mb-6">от {priceFrom.toLocaleString("ru-RU")} ₽</p>}
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {uniqueColors.length > 1 && (
              <div className="mb-6">
                <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">Цвет</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueColors.map((variant) => (
                    <MaterialSwatch
                      key={variant.color}
                      color={variant.color}
                      colorHex={variant.colorHex}
                      active={selectedColor === variant.color}
                      onClick={() => setSelectedColor(variant.color)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-6 mb-8 text-sm font-body">
              {uniqueTextures.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Фактура: </span>
                  <span className="text-foreground font-medium">
                    {uniqueTextures.map((item) => (item === "smooth" ? "Гладкая" : "Текстурная")).join(", ")}
                  </span>
                </div>
              )}
              {uniqueMountings.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Монтаж: </span>
                  <span className="text-foreground font-medium">
                    {uniqueMountings.map((item) => mountingLabels[item]).join(", ")}
                  </span>
                </div>
              )}
              {uniquePowers.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Питание: </span>
                  <span className="text-foreground font-medium">{uniquePowers.map((item) => powerLabels[item]).join(", ")}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <button id="request-price" className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3.5 hover:bg-charcoal-light transition-colors">
                    {cta.primary.label}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">{cta.primary.label} — {product.name}</DialogTitle>
                  </DialogHeader>
                  <PriceRequestForm productName={product.name} productSlug={product.slug} context="product-detail" />
                </DialogContent>
              </Dialog>
              <Link
                to={cta.secondary.href}
                className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-border text-foreground px-8 py-3.5 hover:bg-secondary transition-colors"
              >
                {cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHeroModule;
