import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sitePrimary:
          "rounded-[var(--radius-sm)] bg-primary text-primary-foreground uppercase tracking-[0.18em] hover:bg-[hsl(var(--charcoal-light))]",
        siteOutline:
          "rounded-[var(--radius-sm)] border border-border bg-transparent text-foreground uppercase tracking-[0.18em] hover:bg-[hsl(var(--bg-surface))]",
        siteInverse:
          "rounded-[var(--radius-sm)] bg-[hsl(var(--hero-text))] text-[hsl(var(--charcoal))] uppercase tracking-[0.2em] hover:bg-[hsl(var(--cream-dark))]",
        siteInverseOutline:
          "rounded-[var(--radius-sm)] border border-[hsl(var(--hero-line)/0.6)] bg-[hsl(var(--hero-surface)/0.16)] text-[hsl(var(--hero-text-muted))] uppercase tracking-[0.2em] hover:border-[hsl(var(--hero-line))] hover:bg-[hsl(var(--hero-surface)/0.28)] hover:text-[hsl(var(--hero-text))]",
        siteFloatingDark:
          "rounded-[var(--radius-lg)] border border-[hsl(var(--hero-line)/0.42)] bg-[hsl(var(--hero-surface)/0.96)] text-[hsl(var(--hero-text))] uppercase tracking-brand-wide shadow-[0_10px_30px_rgba(0,0,0,0.28)] hover:bg-[hsl(var(--hero-surface))]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        site: "px-8 py-3.5 text-sm",
        siteLg: "px-10 py-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
