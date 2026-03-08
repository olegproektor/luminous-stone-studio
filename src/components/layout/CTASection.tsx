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
    <section
      className={`section-padding ${isDark ? "bg-primary grain-overlay" : "bg-background"}`}
    >
      <div className="container-brand text-center relative z-10">
        {eyebrow && (
          <p
            className={`text-xs font-body font-medium tracking-brand-wide uppercase mb-4 ${
              isDark ? "text-primary-foreground/40" : "text-muted-foreground"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-display text-3xl md:text-5xl font-light max-w-2xl mx-auto mb-6 leading-tight ${
            isDark ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`font-body text-sm max-w-md mx-auto mb-10 ${
              isDark ? "text-primary-foreground/50" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryCta.href}
            className={`inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase px-10 py-4 transition-colors duration-300 ${
              isDark
                ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                : "bg-primary text-primary-foreground hover:bg-charcoal-light"
            }`}
          >
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className={`inline-flex items-center justify-center text-xs font-body font-medium tracking-brand uppercase px-10 py-4 border transition-colors duration-300 ${
                isDark
                  ? "border-primary-foreground/20 text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground/40"
                  : "border-border text-foreground hover:bg-secondary"
              }`}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
