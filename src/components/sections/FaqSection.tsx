import Section from "@/components/layout/Section";
import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <Section eyebrow="FAQ" title="Частые вопросы">
      <div className="max-w-2xl">
        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border border-border px-6">
              <AccordionTrigger className="font-display text-base md:text-lg font-medium text-foreground py-5 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
};

export default FaqSection;
