import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";

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
        ctas={[{ label: "Обсудить проект", href: "/request-project" }]}
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

      <CTASection
        title="Расскажите о вашей задаче"
        subtitle="Подготовим предложение по кастомному решению в течение 3 рабочих дней."
        primaryCta={{ label: "Запросить кастомизацию", href: "/request-project" }}
      />
    </PageLayout>
  );
};

export default CustomPage;
