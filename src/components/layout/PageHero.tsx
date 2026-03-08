import type { CTA } from "@/types";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctas?: CTA[];
  backgroundImage?: string;
  compact?: boolean;
}

/**
 * Reusable hero section for all pages.
 * Supports full-height (landing) and compact (inner pages) modes.
 */
const PageHero = ({
  eyebrow,
  title,
  subtitle,
  ctas,
  backgroundImage,
  compact = true,
}: PageHeroProps) => {
  const hasImage = !!backgroundImage;

  return (
    <section
      className={`relative flex items-end ${compact ? "py-20 md:py-28" : "min-h-[70vh] md:min-h-[80vh]"}`}
    >
      {hasImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
      )}

      <div
        className={`relative z-10 container-brand px-6 md:px-12 lg:px-24 ${compact ? "" : "pb-20 md:pb-0"}`}
      >
        <div className="max-w-2xl">
          {eyebrow && (
            <p
              className={`text-sm font-body font-medium tracking-[0.15em] uppercase mb-4 ${
                hasImage ? "text-background/60" : "text-muted-foreground"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 ${
              hasImage ? "text-background" : "text-foreground"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`font-body text-base md:text-lg leading-relaxed max-w-lg ${
                hasImage ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              {subtitle}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {ctas.map((cta, i) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  className={`inline-flex items-center justify-center text-sm font-body font-medium tracking-wide px-8 py-3.5 transition-colors duration-200 ${
                    i === 0
                      ? hasImage
                        ? "bg-background text-foreground hover:bg-background/90"
                        : "bg-primary text-primary-foreground hover:bg-charcoal-light"
                      : hasImage
                        ? "border border-background/40 text-background hover:bg-background/10"
                        : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
