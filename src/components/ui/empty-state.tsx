import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

/**
 * Empty state for lists/grids with no items.
 */
const EmptyState = ({ icon = "∅", title, description, action }: EmptyStateProps) => (
  <div className="text-center py-16">
    <span className="text-4xl mb-4 block">{icon}</span>
    <h3 className="font-display text-xl font-medium text-foreground mb-2">{title}</h3>
    {description && (
      <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto mb-6">
        {description}
      </p>
    )}
    {action && (
      <Link
        to={action.href}
        className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3 hover:bg-charcoal-light transition-colors"
      >
        {action.label}
      </Link>
    )}
  </div>
);

export default EmptyState;
