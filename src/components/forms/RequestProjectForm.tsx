import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import LeadFormWrapper from "./LeadFormWrapper";
import { requestProjectFinalPreset, requestProjectStep1Fields } from "@/data/lead-form-presets";
import { deliverForm } from "@/lib/form-delivery";

const steps = [
  {
    title: "О вас",
    subtitle: "Как с вами связаться",
    fields: requestProjectStep1Fields,
  },
  {
    title: "О проекте",
    subtitle: "Расскажите о вашем объекте",
    fields: requestProjectFinalPreset.fields,
  },
];

const RequestProjectForm = () => {
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState<Record<string, string>>({});

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  if (isLastStep) {
    // Last step uses LeadForm with consent + submit
    return (
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </button>
              <span className="hidden sm:inline text-sm font-body text-muted-foreground">
                {s.title}
              </span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <h3 className="font-display text-xl font-medium text-foreground mb-1">
          {currentStep.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6">
          {currentStep.subtitle}
        </p>

        <LeadFormWrapper
          preset={requestProjectFinalPreset}
          onSubmit={async (data) => {
            const fullData = { ...stepData, ...data };
            const delivery = await deliverForm({ formId: "request_project", data: fullData });
            if (!delivery.ok) {
              throw new Error(delivery.message);
            }
          }}
        />
      </div>
    );
  }

  // Intermediate steps — just collect data
  const handleNext = () => {
    // Basic validation for required fields
    const missing = currentStep.fields
      .filter((f) => "required" in f && f.required && !(stepData[f.name] || "").trim())
      .map((f) => f.name);

    if (missing.length > 0) return;

    trackEvent("form_start", { form: "request_project", step: step + 1 });
    setStep(step + 1);
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className="hidden sm:inline text-sm font-body text-muted-foreground">
              {s.title}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <h3 className="font-display text-xl font-medium text-foreground mb-1">
        {currentStep.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        {currentStep.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentStep.fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block text-sm font-body text-muted-foreground mb-1.5">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            {field.type === "select" ? (
              <select
                value={stepData[field.name] || ""}
                onChange={(e) => setStepData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full font-body text-sm bg-background border border-border px-4 py-3 h-11 focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">{field.placeholder || "Выберите..."}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                value={stepData[field.name] || ""}
                onChange={(e) => setStepData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                placeholder={field.placeholder}
                rows={4}
                className="w-full font-body text-sm bg-background border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            ) : (
              <input
                type={field.type}
                value={stepData[field.name] || ""}
                onChange={(e) => setStepData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full font-body text-sm bg-background border border-border px-4 py-3 h-11 focus:outline-none focus:ring-1 focus:ring-ring"
              />
            )}
          </div>
        ))}
      </div>

      <Button onClick={handleNext} variant="sitePrimary" size="site" className="mt-6">
        Далее →
      </Button>
    </div>
  );
};

export default RequestProjectForm;
