import LeadForm, { type FormField } from "./LeadForm";
import { deliverForm } from "@/lib/form-delivery";

interface PriceRequestFormProps {
  productName?: string;
  productSlug?: string;
  context?: "product-detail" | "project-detail" | "catalog";
}

const fields: FormField[] = [
  { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email", placeholder: "email@example.com" },
  {
    name: "quantity",
    label: "Количество",
    type: "select",
    options: [
      { value: "1-5", label: "1–5 шт" },
      { value: "6-20", label: "6–20 шт" },
      { value: "20-50", label: "20–50 шт" },
      { value: "50+", label: "Более 50 шт" },
    ],
  },
  { name: "message", label: "Комментарий", type: "textarea", placeholder: "Уточнения по цвету, монтажу, доставке...", half: false },
];

const PriceRequestForm = ({ productName, productSlug, context = "product-detail" }: PriceRequestFormProps) => {
  return (
    <LeadForm
      formId="request_price"
      fields={fields}
      submitLabel="Запросить цену"
      analyticsEvent="request_price"
      onSubmit={async (data) => {
        const payload = { ...data, product: productName, productSlug, context };
        const delivery = await deliverForm({ formId: "request_price", data: payload });
        if (!delivery.ok) {
          throw new Error(delivery.message);
        }
      }}
    />
  );
};

export default PriceRequestForm;
