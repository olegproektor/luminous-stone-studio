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
    return (
      <div>
        <div className="mb-8 flex items-center gap-3">
          {steps.map((stepItem, index) => (
            <div key={stepItem.title} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => index < step && setStep(index)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-body font-medium transition-colors ${
                  index <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {index + 1}
              </button>
              <span className="hidden text-sm font-body text-muted-foreground sm:inline">{stepItem.title}</span>
              {index < steps.length - 1 ? <div className="h-px w-8 bg-border" /> : null}
            </div>
          ))}
        </div>

        <h3 className="mb-1 font-display text-xl font-medium text-foreground">{currentStep.title}</h3>
        <p className="mb-6 font-body text-sm text-muted-foreground">{currentStep.subtitle}</p>

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

  const handleNext = () => {
    const missing = currentStep.fields
      .filter((field) => "required" in field && field.required && !(stepData[field.name] || "").trim())
      .map((field) => field.name);

    if (missing.length > 0) return;

    trackEvent("form_start", { form: "request_project", step: step + 1 });
    setStep(step + 1);
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        {steps.map((stepItem, index) => (
          <div key={stepItem.title} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-body font-medium ${
                index <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className="hidden text-sm font-body text-muted-foreground sm:inline">{stepItem.title}</span>
            {index < steps.length - 1 ? <div className="h-px w-8 bg-border" /> : null}
          </div>
        ))}
      </div>

      <h3 className="mb-1 font-display text-xl font-medium text-foreground">{currentStep.title}</h3>
      <p className="mb-6 font-body text-sm text-muted-foreground">{currentStep.subtitle}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {currentStep.fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm font-body text-muted-foreground">
              {field.label}
              {field.required ? <span className="ml-1 text-destructive">*</span> : null}
            </label>
            {field.type === "select" ? (
              <select
                value={stepData[field.name] || ""}
                onChange={(event) => setStepData((prev) => ({ ...prev, [field.name]: event.target.value }))}
                className="h-11 w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">{field.placeholder || "Выберите..."}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                value={stepData[field.name] || ""}
                onChange={(event) => setStepData((prev) => ({ ...prev, [field.name]: event.target.value }))}
                placeholder={field.placeholder}
                rows={4}
                className="w-full resize-none border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            ) : (
              <input
                type={field.type}
                value={stepData[field.name] || ""}
                onChange={(event) => setStepData((prev) => ({ ...prev, [field.name]: event.target.value }))}
                placeholder={field.placeholder}
                className="h-11 w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            )}
          </div>
        ))}
      </div>

      <Button onClick={handleNext} variant="sitePrimary" size="site" className="mt-6" type="button">
        Далее →
      </Button>
    </div>
  );
};

export default RequestProjectForm;
