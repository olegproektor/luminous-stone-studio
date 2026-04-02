import Section from "@/components/layout/Section";
import LeadForm, { type FormField } from "@/components/forms/LeadForm";
import { deliverForm } from "@/lib/form-delivery";

const supportFields: FormField[] = [
  { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email", placeholder: "name@example.com" },
  {
    name: "supportTopic",
    label: "Тема обращения",
    type: "select",
    required: true,
    placeholder: "Выберите тему",
    options: [
      { value: "connection", label: "Подключение" },
      { value: "installation", label: "Монтаж" },
      { value: "service", label: "Сервисное обслуживание" },
    ],
  },
  {
    name: "objectType",
    label: "Тип объекта",
    type: "select",
    placeholder: "Выберите тип объекта",
    options: [
      { value: "private", label: "Частный объект" },
      { value: "hospitality", label: "Отель / HoReCa" },
      { value: "developer", label: "Девелоперский объект" },
      { value: "public", label: "Общественное пространство" },
    ],
  },
  {
    name: "message",
    label: "Описание вопроса",
    type: "textarea",
    required: true,
    placeholder: "Опишите задачу, проблему или вопрос по подключению, монтажу или обслуживанию.",
    half: false,
  },
];

interface SupportRequestModuleProps {
  entryRoute: string;
}

const SupportRequestModule = ({ entryRoute }: SupportRequestModuleProps) => {
  return (
    <Section id="support-request" eyebrow="Поддержка" title="Запросить поддержку">
      <div className="max-w-3xl">
        <LeadForm
          formId="request_consultation"
          fields={supportFields}
          submitLabel="Запросить поддержку"
          analyticsEvent="request_consultation"
          onSubmit={async (payload) => {
            const delivery = await deliverForm({
              formId: "request_consultation",
              data: {
                ...payload,
                entryRoute,
                leadContext: "technical_support",
              },
            });

            if (!delivery.ok) {
              throw new Error(delivery.message);
            }
          }}
        />
      </div>
    </Section>
  );
};

export default SupportRequestModule;
