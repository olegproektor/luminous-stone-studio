import TrackedCta from "@/components/TrackedCta";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "default" | "dark";
  context?: string;
}

const CTASection = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "default",
  context = "section_cta",
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
          <TrackedCta
            href={primaryCta.href}
            label={primaryCta.label}
            context={`${context}_primary`}
            variant={isDark ? "siteInverse" : "sitePrimary"}
            size="siteLg"
          />
          {secondaryCta && (
            <TrackedCta
              href={secondaryCta.href}
              label={secondaryCta.label}
              context={`${context}_secondary`}
              variant={isDark ? "siteInverseOutline" : "siteOutline"}
              size="siteLg"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
