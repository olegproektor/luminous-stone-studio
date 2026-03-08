import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { Download, FileText, Ruler, Box } from "lucide-react";

const resources = [
  { icon: FileText, title: "PDF-каталог", description: "Полный каталог продукции с характеристиками и ценами." },
  { icon: Ruler, title: "Чертежи и размеры", description: "DWG и PDF чертежи для проектной документации." },
  { icon: Download, title: "Технические листы", description: "Подробные спецификации каждого изделия." },
  { icon: Box, title: "3D-модели", description: "Скоро: 3D-модели для BIM и визуализаций." },
];

const ForArchitectsPage = () => {
  return (
    <PageLayout
      title="Для архитекторов — STŌN"
      description="Материалы для проектирования: PDF-каталог, чертежи, технические листы, 3D-модели. Запрос образцов и консультации."
    >
      <PageHero
        eyebrow="Для архитекторов"
        title="Проектные материалы"
        subtitle="Всё, что нужно для включения наших изделий в ваш проект: каталоги, чертежи, спецификации."
        ctas={[
          { label: "Скачать каталог", href: "#resources" },
          { label: "Запросить образцы", href: "/request-project" },
        ]}
      />

      <Section id="resources" eyebrow="Ресурсы" title="Скачиваемые материалы">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 p-8 bg-secondary"
            >
              <item.icon size={24} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <button className="mt-4 text-sm font-body font-medium text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors">
                  Скачать
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        variant="dark"
        eyebrow="Работаете над проектом?"
        title="Обсудим спецификацию и подберём решение"
        subtitle="Консультация, образцы, кастомизация — работаем напрямую с проектными бюро."
        primaryCta={{ label: "Запросить консультацию", href: "/request-project" }}
        secondaryCta={{ label: "Написать на почту", href: "mailto:arch@ston.ru" }}
      />
    </PageLayout>
  );
};

export default ForArchitectsPage;
