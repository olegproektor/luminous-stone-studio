import React, { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { useUTM } from "@/hooks/use-utm";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  half?: boolean; // half-width on desktop
}

interface LeadFormProps {
  formId: string;
  fields: FormField[];
  submitLabel?: string;
  analyticsEvent: AnalyticsEventName;
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
  className?: string;
  children?: ReactNode;
}

// Simple honeypot anti-spam
const HONEYPOT_FIELD = "website_url";

const LeadForm = ({
  formId,
  fields,
  submitLabel = "Отправить заявку",
  analyticsEvent,
  onSubmit,
  className = "",
  children,
}: LeadFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formStarted, setFormStarted] = useState(false);
  const utm = useUTM();

  const handleFieldChange = (name: string, value: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent("form_start", { form: formId });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const val = (formData[field.name] || "").trim();
      if (field.required && !val) {
        newErrors[field.name] = "Обязательное поле";
      }
      if (field.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        newErrors[field.name] = "Некорректный email";
      }
      if (field.type === "tel" && val && !/^[\d\s\+\-\(\)]{7,20}$/.test(val)) {
        newErrors[field.name] = "Некорректный телефон";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData[HONEYPOT_FIELD]) return;

    if (!validate()) {
      trackEvent("form_error", { form: formId });
      return;
    }

    setStatus("submitting");

    const payload = {
      ...formData,
      _form: formId,
      _source: window.location.pathname,
      _timestamp: new Date().toISOString(),
      ...Object.fromEntries(
        Object.entries(utm).filter(([, v]) => v !== undefined) as [string, string][]
      ),
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // Default: log to console (replace with API call in production)
        console.log("[Lead Form]", payload);
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus("success");
      trackEvent("form_submit", { form: formId });
      trackEvent(analyticsEvent, { form: formId });
    } catch {
      setStatus("error");
      trackEvent("form_error", { form: formId });
    }
  };

  if (status === "success") {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="font-display text-2xl font-medium text-foreground mb-3">
          Заявка отправлена
        </h3>
        <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
          Спасибо! Мы свяжемся с вами в течение рабочего дня.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {/* Honeypot — invisible to users */}
      <input
        type="text"
        name={HONEYPOT_FIELD}
        value={formData[HONEYPOT_FIELD] || ""}
        onChange={(e) => setFormData((prev) => ({ ...prev, [HONEYPOT_FIELD]: e.target.value }))}
        className="absolute -left-[9999px] opacity-0 h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* UTM hidden fields */}
      {Object.entries(utm).map(([key, val]) =>
        val ? <input key={key} type="hidden" name={key} value={val} /> : null
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.half === false || field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label
              htmlFor={`${formId}-${field.name}`}
              className="block text-sm font-body text-muted-foreground mb-1.5"
            >
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`${formId}-${field.name}`}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className={`w-full font-body text-sm bg-background border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring resize-none ${
                  errors[field.name] ? "border-destructive" : "border-border"
                }`}
              />
            ) : field.type === "select" ? (
              <select
                id={`${formId}-${field.name}`}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className={`w-full font-body text-sm bg-background border px-4 py-3 h-11 focus:outline-none focus:ring-1 focus:ring-ring ${
                  errors[field.name] ? "border-destructive" : "border-border"
                }`}
              >
                <option value="">{field.placeholder || "Выберите..."}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${formId}-${field.name}`}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full font-body text-sm bg-background border px-4 py-3 h-11 focus:outline-none focus:ring-1 focus:ring-ring ${
                  errors[field.name] ? "border-destructive" : "border-border"
                }`}
              />
            )}

            {errors[field.name] && (
              <p className="text-xs text-destructive mt-1 font-body">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      {children}

      {/* Consent checkbox */}
      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            checked={formData.consent === "true"}
            onChange={(e) => handleFieldChange("consent", e.target.checked ? "true" : "")}
            className="mt-1 flex-shrink-0"
          />
          <span className="font-body text-xs text-muted-foreground leading-relaxed">
            Я даю{" "}
            <Link to="/consent" className="underline hover:text-foreground transition-colors">
              согласие на обработку персональных данных
            </Link>{" "}
            в соответствии с{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              политикой конфиденциальности
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-destructive mt-1 font-body">{errors.consent}</p>
        )}
      </div>

      {status === "error" && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20">
          <p className="font-body text-sm text-destructive">
            Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами по телефону.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || formData.consent !== "true"}
        className="mt-6 w-full inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3.5 hover:bg-charcoal-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Отправка..." : submitLabel}
      </button>
    </form>
  );
};

export default LeadForm;
