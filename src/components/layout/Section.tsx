import React from "react";

interface SectionProps {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  variant?: "default" | "alt" | "dark";
  id?: string;
  className?: string;
}

const bgMap = {
  default: "bg-background",
  alt: "bg-secondary",
  dark: "bg-primary text-primary-foreground",
};

const Section = React.forwardRef<HTMLElement, SectionProps>(({
  children,
  eyebrow,
  title,
  subtitle,
  variant = "default",
  id,
  className = "",
}, ref) => {
  const isDark = variant === "dark";

  return (
    <section ref={ref} id={id} className={`section-padding ${bgMap[variant]} ${className}`}>
      <div className="container-brand">
        {(eyebrow || title || subtitle) && (
          <div className="mb-14 md:mb-20 max-w-2xl">
            {eyebrow && (
              <p
                className={`text-xs font-body font-medium tracking-brand-wide uppercase mb-4 ${
                  isDark ? "text-primary-foreground/40" : "text-muted-foreground"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`font-display text-3xl md:text-5xl font-light leading-tight ${
                  isDark ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`font-body text-sm leading-relaxed mt-4 max-w-lg ${
                  isDark ? "text-primary-foreground/50" : "text-muted-foreground"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

export default Section;
