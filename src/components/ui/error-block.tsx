import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBlockProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorBlock = ({
  title = "Что-то пошло не так",
  message = "Попробуйте обновить страницу или вернуться позже.",
  onRetry,
}: ErrorBlockProps) => (
  <div className="py-16 text-center">
    <AlertTriangle size={40} className="mx-auto mb-4 text-muted-foreground" />
    <h3 className="mb-2 font-display text-xl font-medium text-foreground">{title}</h3>
    <p className="mx-auto mb-6 max-w-sm font-body text-sm text-muted-foreground">{message}</p>
    {onRetry && (
      <Button onClick={onRetry} variant="sitePrimary" size="site">
        Попробовать снова
      </Button>
    )}
  </div>
);

export default ErrorBlock;
