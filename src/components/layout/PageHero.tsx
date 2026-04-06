import { Button } from "@/components/ui/button";
import type { CTA } from "@/types";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctas?: CTA[];
  backgroundImage?: string;
  compact?: boolean;
}

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  ctas,
  backgroundImage,
  compact = true,
}: PageHeroProps) => {
  const hasImage = Boolean(backgroundImage);

  return (
    <section className={`relative flex items-end ${compact ? "py-20 md:py-28" : "min-h-[62vh] md:min-h-[72vh] xl:min-h-[80vh]"}`}>
      {hasImage && (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
      )}

      <div className={`container-brand relative z-10 px-6 md:px-12 lg:px-24 ${compact ? "" : "pb-14 md:pb-8 xl:pb-0"}`}>
        <div className="max-w-2xl">
          {eyebrow && (
            <p
              className={`mb-4 text-sm font-body font-medium uppercase tracking-[0.15em] ${
                hasImage ? "text-background/60" : "text-muted-foreground"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={`mb-4 font-display text-3xl font-light leading-tight md:text-5xl lg:text-6xl ${
              hasImage ? "text-background" : "text-foreground"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`max-w-lg font-body text-base leading-relaxed md:text-lg ${
                hasImage ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              {subtitle}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {ctas.map((cta, index) => (
                <Button
                  key={cta.href}
                  asChild
                  variant={index === 0 ? (hasImage ? "siteInverse" : "sitePrimary") : (hasImage ? "siteInverseOutline" : "siteOutline")}
                  size="site"
                >
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
