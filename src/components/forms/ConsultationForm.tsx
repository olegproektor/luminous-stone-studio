import LeadForm, { type FormField } from "./LeadForm";
import { deliverForm } from "@/lib/form-delivery";

const fields: FormField[] = [
  { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email", placeholder: "email@example.com" },
  { name: "message", label: "Вопрос", type: "textarea", placeholder: "Опишите ваш вопрос или задачу...", half: false },
];

const ConsultationForm = () => {
  return (
    <LeadForm
      formId="request_consultation"
      fields={fields}
      submitLabel="Получить консультацию"
      analyticsEvent="request_consultation"
      onSubmit={async (data) => {
        const delivery = await deliverForm({ formId: "request_consultation", data });
        if (!delivery.ok) {
          throw new Error(delivery.message);
        }
      }}
    />
  );
};

export default ConsultationForm;
