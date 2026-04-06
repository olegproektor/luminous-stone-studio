import { Button } from "@/components/ui/button";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "default" | "dark";
}

const CTASection = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "default",
}: CTASectionProps) => {
  const isDark = variant === "dark";

  return (
    <section className={`section-padding ${isDark ? "bg-primary grain-overlay" : "bg-background"}`}>
      <div className="container-brand relative z-10 text-center">
        {eyebrow && (
          <p
            className={`mb-4 text-xs font-body font-medium uppercase tracking-brand-wide ${
              isDark ? "text-primary-foreground/40" : "text-muted-foreground"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`mx-auto mb-6 max-w-2xl font-display text-3xl font-light leading-tight md:text-5xl ${
            isDark ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mx-auto mb-10 max-w-md font-body text-sm ${
              isDark ? "text-primary-foreground/50" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant={isDark ? "siteInverse" : "sitePrimary"} size="siteLg">
            <a href={primaryCta.href}>{primaryCta.label}</a>
          </Button>
          {secondaryCta && (
            <Button asChild variant={isDark ? "siteInverseOutline" : "siteOutline"} size="siteLg">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
