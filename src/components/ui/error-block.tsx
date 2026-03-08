import { AlertTriangle } from "lucide-react";

interface ErrorBlockProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

/**
 * Reusable error UI block.
 */
const ErrorBlock = ({
  title = "Что-то пошло не так",
  message = "Попробуйте обновить страницу или вернуться позже.",
  onRetry,
}: ErrorBlockProps) => (
  <div className="text-center py-16">
    <AlertTriangle size={40} className="mx-auto text-muted-foreground mb-4" />
    <h3 className="font-display text-xl font-medium text-foreground mb-2">{title}</h3>
    <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3 hover:bg-charcoal-light transition-colors"
      >
        Попробовать снова
      </button>
    )}
  </div>
);

export default ErrorBlock;
