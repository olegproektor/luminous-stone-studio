import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import LeadForm from "@/components/forms/LeadForm";

const customFormFields = [
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
      { value: "glamping-hotel", label: "Глэмпинг / отель" },
      { value: "developer", label: "Девелопер" },
    ],
  },
  { name: "message", label: "Опишите задачу", type: "textarea" as const, required: true, placeholder: "Размеры, форма, фактура, цвет, количество, особенности монтажа...", half: false },
];

const CustomPage = () => {
  return (
    <PageLayout
      title="Индивидуальные решения — STŌN"
      description="Кастомные архитектурные светильники: нестандартные размеры, формы, фактуры, цвета и типы монтажа."
    >
      <PageHero
        eyebrow="Кастомизация"
        title="Индивидуальные решения"
        subtitle="Нестандартные размеры, формы, фактуры, цвета и конфигурации под ваш проект."
      />

      <Section eyebrow="Возможности" title="Что мы можем кастомизировать">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Размеры", desc: "Высота, сечение, пропорции — под конкретные задачи объекта." },
            { title: "Форма", desc: "Геометрия корпуса и световой щели по вашим эскизам." },
            { title: "Фактура", desc: "Гладкая, текстурная, кастомная — под материалы окружения." },
            { title: "Цвет", desc: "Подбор оттенка под камень, фасад или ландшафт проекта." },
            { title: "Свет", desc: "Температура, яркость, угол рассеивания, RGBW." },
            { title: "Монтаж", desc: "Накладной, встраиваемый, на болтах, скрытый — под конструктив." },
          ].map((item) => (
            <div key={item.title} className="p-8 bg-secondary">
              <h3 className="font-display text-lg font-medium text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="alt" eyebrow="Запрос" title="Расскажите о вашей задаче">
        <div className="max-w-2xl">
          <p className="font-body text-sm text-muted-foreground mb-8">
            Подготовим предложение по кастомному решению в течение 3 рабочих дней.
          </p>
          <LeadForm
            formId="custom_request"
            fields={customFormFields}
            submitLabel="Запросить кастомизацию"
            analyticsEvent="request_custom"
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default CustomPage;
