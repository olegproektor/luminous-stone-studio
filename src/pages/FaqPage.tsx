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
      title="Частые вопросы — STŌN"
      description="Ответы на частые вопросы о боллардах и светильниках STŌN: материалы, монтаж, эксплуатация, цены, кастомизация."
    >
      <PageHero
        eyebrow="FAQ"
        title="Частые вопросы"
        subtitle="Ответы на основные вопросы о наших изделиях, материалах и работе."
      />

      <Section>
        <div className="container-brand px-0">
          <Breadcrumbs items={[{ label: "FAQ" }]} className="mb-8" />
        </div>

        <div className="max-w-3xl space-y-12">
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
        eyebrow="Не нашли ответ?"
        title="Задайте нам вопрос"
        subtitle="Свяжитесь с нами — ответим в течение рабочего дня."
        primaryCta={{ label: "Связаться", href: navPaths.contacts }}
      />
    </PageLayout>
  );
};

export default FaqPage;
