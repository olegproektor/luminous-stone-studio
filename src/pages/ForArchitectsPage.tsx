import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import LeadForm from "@/components/forms/LeadForm";
import { Download, FileText, Ruler, Box } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const resources = [
  { icon: FileText, title: "PDF-каталог", description: "Полный каталог продукции с характеристиками и ценами." },
  { icon: Ruler, title: "Чертежи и размеры", description: "DWG и PDF чертежи для проектной документации." },
  { icon: Download, title: "Технические листы", description: "Подробные спецификации каждого изделия." },
  { icon: Box, title: "3D-модели", description: "Скоро: 3D-модели для BIM и визуализаций." },
];

const architectFormFields = [
  { name: "name", label: "Имя", type: "text" as const, required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel" as const, required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email" as const, required: true, placeholder: "email@example.com" },
  { name: "company", label: "Компания / бюро", type: "text" as const, placeholder: "Название" },
  {
    name: "interest",
    label: "Что вас интересует",
    type: "select" as const,
    options: [
      { value: "catalog", label: "PDF-каталог" },
      { value: "techsheets", label: "Технические листы" },
      { value: "drawings", label: "Чертежи" },
      { value: "samples", label: "Образцы материалов" },
      { value: "consultation", label: "Консультация по проекту" },
      { value: "custom", label: "Кастомное решение" },
    ],
  },
  { name: "message", label: "Комментарий", type: "textarea" as const, placeholder: "Расскажите о проекте или запросе...", half: false },
];

const ForArchitectsPage = () => {
  return (
    <PageLayout
      title="Загрузки и материалы — STŌN"
      description="Каталог, техлисты, чертежи и материалы для проектирования. Раздел загрузок STŌN."
    >
      <PageHero
        eyebrow="Для архитекторов"
        title="Проектные материалы"
        subtitle="Всё, что нужно для включения наших изделий в ваш проект: каталоги, чертежи, спецификации."
        ctas={[
          { label: "Скачать каталог", href: "#resources" },
          { label: "Запросить образцы", href: "#architect-form" },
        ]}
      />

      <Section id="resources" eyebrow="Ресурсы" title="Скачиваемые материалы">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((item) => (
            <div key={item.title} className="flex gap-5 p-8 bg-secondary">
              <item.icon size={24} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <button
                  onClick={() => trackEvent("download_pdf", { file: item.title })}
                  className="mt-4 text-sm font-body font-medium text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
                >
                  Скачать
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="architect-form" variant="alt" eyebrow="Запрос" title="Запросить материалы или консультацию">
        <div className="max-w-2xl">
          <p className="font-body text-sm text-muted-foreground mb-8">
            Заполните форму — отправим нужные материалы или свяжемся для обсуждения проекта.
          </p>
          <LeadForm
            formId="architect_request"
            fields={architectFormFields}
            submitLabel="Отправить запрос"
            analyticsEvent="architect_lead"
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default ForArchitectsPage;
