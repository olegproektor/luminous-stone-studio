import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { faqItems } from "@/data/faq";

const FaqPage = () => {
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
        <div className="max-w-3xl space-y-0 divide-y divide-border">
          {faqItems.map((item) => (
            <details key={item.id} className="group py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-display text-lg font-medium text-foreground pr-8">
                  {item.question}
                </h3>
                <span className="text-muted-foreground text-xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mt-4 pr-12">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
};

export default FaqPage;
