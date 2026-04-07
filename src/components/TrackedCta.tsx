import { Link } from "react-router-dom";
import { Button, type buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"];

interface TrackedCtaProps {
  href: string;
  label: string;
  context: string;
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
  eventParams?: Record<string, string | number | boolean>;
}

function isInternalHref(href: string) {
  return href.startsWith("/");
}

const TrackedCta = ({
  href,
  label,
  context,
  variant,
  size,
  className,
  eventParams,
}: TrackedCtaProps) => {
  const handleClick = () => {
    trackEvent("cta_click", {
      context,
      target: href,
      label,
      ...eventParams,
    });
  };

  if (isInternalHref(href)) {
    return (
      <Button asChild variant={variant} size={size} className={cn(className)}>
        <Link to={href} onClick={handleClick}>
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <a href={href} onClick={handleClick}>
        {label}
      </a>
    </Button>
  );
};

export default TrackedCta;
