import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

const EmptyState = ({ icon = "∅", title, description, action }: EmptyStateProps) => (
  <div className="py-16 text-center">
    <span className="mb-4 block text-4xl">{icon}</span>
    <h3 className="mb-2 font-display text-xl font-medium text-foreground">{title}</h3>
    {description && <p className="mx-auto mb-6 max-w-sm font-body text-sm text-muted-foreground">{description}</p>}
    {action && (
      <Button asChild variant="sitePrimary" size="site">
        <Link to={action.href}>{action.label}</Link>
      </Button>
    )}
  </div>
);

export default EmptyState;
