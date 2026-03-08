import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "ston_cookie_consent";

type ConsentState = "pending" | "accepted" | "rejected";

function getStoredConsent(): ConsentState {
  try {
    const val = localStorage.getItem(CONSENT_KEY);
    if (val === "accepted" || val === "rejected") return val;
  } catch {}
  return "pending";
}

const CookieConsentBanner = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [state, setState] = useState<ConsentState>(getStoredConsent);

  useEffect(() => {
    setState(getStoredConsent());
  }, []);

  if (state !== "pending") return null;

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setState("accepted");
    trackEvent("cookie_consent_accept");
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setState("rejected");
    trackEvent("cookie_consent_reject");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background p-4 md:p-6 animate-fade-in">
      <div className="container-brand flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 pr-8">
          <p className="font-body text-sm leading-relaxed">
            Мы используем файлы cookie для улучшения работы сайта и анализа трафика.
            Продолжая использование, вы соглашаетесь с{" "}
            <Link to="/cookies" className="underline hover:text-accent transition-colors">
              политикой cookie
            </Link>{" "}
            и{" "}
            <Link to="/privacy" className="underline hover:text-accent transition-colors">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={accept}
            className="text-sm font-body font-medium bg-background text-foreground px-6 py-2.5 hover:bg-background/90 transition-colors"
          >
            Принять
          </button>
          <button
            onClick={reject}
            className="text-sm font-body font-medium border border-background/30 text-background px-6 py-2.5 hover:bg-background/10 transition-colors"
          >
            Отклонить
          </button>
          <button
            onClick={reject}
            className="text-background/50 hover:text-background transition-colors md:hidden"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
