import React, { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { useUTM } from "@/hooks/use-utm";
import type { LeadFormField } from "@/types/lead-form-contract";
import { deliverForm } from "@/lib/form-delivery";
import type { FormKind } from "@/types/form-delivery";
import { cn } from "@/lib/utils";
import { routes } from "@/config/routes";

export type FormField = LeadFormField;

interface LeadFormProps {
  formId: FormKind;
  fields: FormField[];
  submitLabel?: string;
  analyticsEvent: AnalyticsEventName;
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
  className?: string;
  children?: ReactNode;
}

const HONEYPOT_FIELD = "website_url";

const LeadForm = React.forwardRef<HTMLFormElement, LeadFormProps>(
  (
    {
      formId,
      fields,
      submitLabel = "Отправить заявку",
      analyticsEvent,
      onSubmit,
      className = "",
      children,
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");
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
      const nextErrors: Record<string, string> = {};

      fields.forEach((field) => {
        const value = (formData[field.name] || "").trim();

        if (field.required && !value) {
          nextErrors[field.name] = "Обязательное поле";
        }

        if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          nextErrors[field.name] = "Некорректный email";
        }

        if (field.type === "tel" && value && !/^[\d\s+()-]{7,20}$/.test(value)) {
          nextErrors[field.name] = "Некорректный телефон";
        }
      });

      if (formData.consent !== "true") {
        nextErrors.consent = "Нужно согласие на обработку данных";
      }

      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();

      if (formData[HONEYPOT_FIELD]) return;

      if (!validate()) {
        trackEvent("form_error", { form: formId, reason: "validation" });
        return;
      }

      setStatus("submitting");
      setStatusMessage("");

      const payload = {
        ...formData,
        _form: formId,
        _source: window.location.pathname,
        _timestamp: new Date().toISOString(),
        ...Object.fromEntries(
          Object.entries(utm).filter(([, value]) => value !== undefined) as [string, string][],
        ),
      };

      try {
        if (onSubmit) {
          await onSubmit(payload);
        } else {
          const delivery = await deliverForm({ formId, data: payload });
          if (!delivery.ok) {
            setStatus("error");
            setStatusMessage(delivery.message);
            trackEvent("form_error", {
              form: formId,
              status: delivery.status,
              externalDependency: Boolean(delivery.externalDependency),
            });
            trackEvent("form_submit_fail", {
              form: formId,
              status: delivery.status,
              externalDependency: Boolean(delivery.externalDependency),
            });
            return;
          }
        }

        setStatus("success");
        trackEvent("form_submit", { form: formId });
        trackEvent("form_submit_success", { form: formId });
        trackEvent(analyticsEvent, { form: formId });
      } catch (error) {
        setStatus("error");
        setStatusMessage(error instanceof Error ? error.message : "Ошибка отправки формы");
        trackEvent("form_error", { form: formId, reason: "exception" });
        trackEvent("form_submit_fail", { form: formId });
      }
    };

    if (status === "success") {
      return (
        <div className={cn("py-12 text-center", className)}>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="mb-3 font-display text-2xl font-medium text-foreground">Заявка отправлена</h3>
          <p className="mx-auto max-w-md font-body text-sm text-muted-foreground">
            Спасибо. Мы вернёмся с понятным следующим шагом в течение рабочего дня.
          </p>
        </div>
      );
    }

    return (
      <form ref={ref} onSubmit={handleSubmit} className={className} noValidate>
        <input
          type="text"
          name={HONEYPOT_FIELD}
          value={formData[HONEYPOT_FIELD] || ""}
          onChange={(event) => setFormData((prev) => ({ ...prev, [HONEYPOT_FIELD]: event.target.value }))}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {Object.entries(utm).map(([key, value]) =>
          value ? <input key={key} type="hidden" name={key} value={value} /> : null,
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className={field.half === false || field.type === "textarea" ? "md:col-span-2" : ""}>
              <label htmlFor={`${formId}-${field.name}`} className="mb-1.5 block text-sm font-body text-muted-foreground">
                {field.label}
                {field.required ? <span className="ml-1 text-destructive">*</span> : null}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(event) => handleFieldChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={cn(
                    "w-full resize-none border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                    errors[field.name] ? "border-destructive" : "border-border",
                  )}
                />
              ) : field.type === "select" ? (
                <select
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(event) => handleFieldChange(field.name, event.target.value)}
                  className={cn(
                    "h-11 w-full border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                    errors[field.name] ? "border-destructive" : "border-border",
                  )}
                >
                  <option value="">{field.placeholder || "Выберите..."}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`${formId}-${field.name}`}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(event) => handleFieldChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className={cn(
                    "h-11 w-full border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                    errors[field.name] ? "border-destructive" : "border-border",
                  )}
                />
              )}

              {errors[field.name] ? <p className="mt-1 text-xs font-body text-destructive">{errors[field.name]}</p> : null}
            </div>
          ))}
        </div>

        {children}

        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              required
              checked={formData.consent === "true"}
              onChange={(event) => handleFieldChange("consent", event.target.checked ? "true" : "")}
              className="mt-1 shrink-0"
            />
            <span className="font-body text-xs leading-relaxed text-muted-foreground">
              Я даю{" "}
              <Link to={routes.consent} className="underline transition-colors hover:text-foreground">
                согласие на обработку персональных данных
              </Link>{" "}
              в соответствии с{" "}
              <Link to={routes.privacy} className="underline transition-colors hover:text-foreground">
                политикой конфиденциальности
              </Link>
              .
            </span>
          </label>
          {errors.consent ? <p className="mt-1 text-xs font-body text-destructive">{errors.consent}</p> : null}
        </div>

        {status === "error" ? (
          <div className="mt-4 border border-destructive/20 bg-destructive/10 p-4">
            <p className="font-body text-sm text-destructive">
              {statusMessage || "Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами по телефону."}
            </p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting" || formData.consent !== "true"}
          className={cn(buttonVariants({ variant: "sitePrimary", size: "site" }), "mt-6 w-full")}
        >
          {status === "submitting" ? "Отправка..." : submitLabel}
        </button>
      </form>
    );
  },
);

LeadForm.displayName = "LeadForm";

export default LeadForm;
