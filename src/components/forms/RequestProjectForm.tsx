import { useState } from "react";
import LeadForm, { type FormField } from "./LeadForm";
import { trackEvent } from "@/lib/analytics";

const steps = [
  {
    title: "О вас",
    subtitle: "Как с вами связаться",
    fields: [
      { name: "name", label: "Имя", type: "text" as const, required: true, placeholder: "Как вас зовут" },
      { name: "phone", label: "Телефон", type: "tel" as const, required: true, placeholder: "+7 (___) ___-__-__" },
      { name: "email", label: "Email", type: "email" as const, placeholder: "email@example.com" },
      {
        name: "clientType",
        label: "Тип клиента",
        type: "select" as const,
        options: [
          { value: "private", label: "Частный клиент" },
          { value: "architect", label: "Архитектор / дизайнер" },
          { value: "glamping-hotel", label: "Глэмпинг / отель / ресторан" },
          { value: "developer", label: "Девелопер / комплектатор" },
          { value: "other", label: "Другое" },
        ],
      },
    ] satisfies FormField[],
  },
  {
    title: "О проекте",
    subtitle: "Расскажите о вашем объекте",
    fields: [
      { name: "city", label: "Город / регион", type: "text" as const, placeholder: "Москва" },
      {
        name: "objectType",
        label: "Тип объекта",
        type: "select" as const,
        options: [
          { value: "private-house", label: "Загородный дом" },
          { value: "apartment-complex", label: "ЖК / комплекс" },
          { value: "glamping", label: "Глэмпинг" },
          { value: "hotel", label: "Отель" },
          { value: "restaurant", label: "Ресторан / кафе" },
          { value: "park", label: "Парк / сквер" },
          { value: "commercial", label: "Коммерческий объект" },
          { value: "other", label: "Другое" },
        ],
      },
      {
        name: "budget",
        label: "Ориентировочный бюджет",
        type: "select" as const,
        placeholder: "Выберите диапазон",
        options: [
          { value: "to-50k", label: "До 50 000 ₽" },
          { value: "50-150k", label: "50 000 — 150 000 ₽" },
          { value: "150-500k", label: "150 000 — 500 000 ₽" },
          { value: "500k+", label: "Более 500 000 ₽" },
          { value: "unknown", label: "Пока не определён" },
        ],
      },
      { name: "message", label: "Комментарий", type: "textarea" as const, placeholder: "Опишите задачу, площадь, пожелания...", half: false },
    ] satisfies FormField[],
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

        <LeadForm
          formId="request_project"
          fields={currentStep.fields}
          submitLabel="Отправить заявку"
          analyticsEvent="request_project"
          onSubmit={async (data) => {
            const fullData = { ...stepData, ...data };
            console.log("[Request Project]", fullData);
            await new Promise((r) => setTimeout(r, 800));
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

      <button
        onClick={handleNext}
        className="mt-6 inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-8 py-3.5 hover:bg-charcoal-light transition-colors duration-200"
      >
        Далее →
      </button>
    </div>
  );
};

export default RequestProjectForm;
