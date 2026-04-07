import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { faqSeed } from "@/data/faq.seed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { navPaths } from "@/lib/route-helpers";

const FaqPage = () => {
  // Group by category
  const categories = [...new Set(faqSeed.map((item) => item.category).filter(Boolean))] as string[];

  return (
    <PageLayout
      title="Вопросы и ответы по подбору решений — Форма Света"
      description="Ответы на частые вопросы о подборе коллекций, материалах, сроках, проектной работе и следующем шаге по частным и объектным пространствам."
    >
      <PageHero
        eyebrow="Вопросы"
        title="Ответы, которые помогают быстрее перейти к следующему шагу"
        subtitle="Здесь собраны вопросы, которые обычно возникают до обращения или на раннем этапе обсуждения: подбор решения, материалы, сроки, проектный формат и логика следующего шага."
      />

      <Section>
        <div className="container-brand px-0">
          <Breadcrumbs items={[{ label: "Вопросы" }]} className="mb-8" />
        </div>

        <div className="max-w-3xl space-y-12">
          <div className="space-y-4">
            <p className="font-body text-base leading-relaxed text-foreground/80">
              FAQ помогает быстро снять базовые вопросы о выборе коллекции, фактуре, сроках и формате
              проектной работы.
            </p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Если ответа достаточно, можно спокойно идти дальше в каталог, материалы или объектный
              сценарий. Если вопрос остаётся открытым, логичный следующий шаг — обсудить проект или
              написать нам напрямую.
            </p>
          </div>

          {categories.map((cat) => {
            const items = faqSeed.filter((f) => f.category === cat);
            return (
              <div key={cat}>
                <h2 className="font-display text-xl font-medium text-foreground mb-4">
                  {cat}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border border-border px-6"
                    >
                      <AccordionTrigger className="font-body text-sm md:text-base font-medium text-foreground py-5 hover:no-underline text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </Section>

      <CTASection
        eyebrow="Следующий шаг"
        title="Если вопрос остаётся открытым, подскажем лучший следующий шаг"
        subtitle="Поможем понять, какая коллекция, материалы или формат проектной работы подходят именно вашему сценарию."
        primaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Контакты", href: navPaths.contacts }}
        context="faq_final"
      />
    </PageLayout>
  );
};

export default FaqPage;
