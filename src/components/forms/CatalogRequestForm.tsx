import LeadForm, { type FormField } from "./LeadForm";

const fields: FormField[] = [
  { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "email@example.com" },
  {
    name: "clientType",
    label: "Тип клиента",
    type: "select",
    options: [
      { value: "private", label: "Частный клиент" },
      { value: "architect", label: "Архитектор / дизайнер" },
      { value: "developer", label: "Девелопер" },
      { value: "other", label: "Другое" },
    ],
  },
];

const CatalogRequestForm = () => {
  return (
    <LeadForm
      formId="request_catalog"
      fields={fields}
      submitLabel="Получить каталог"
      analyticsEvent="request_catalog"
    />
  );
};

export default CatalogRequestForm;
