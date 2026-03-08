import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FaqSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: title */}
          <div className="lg:col-span-4">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
              FAQ
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight mb-6">
              Частые вопросы
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Не нашли ответ? Напишите нам — ответим в течение рабочего дня.
            </p>
            <Link
              to="/contacts"
              className="text-xs font-body font-medium tracking-brand uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Связаться
            </Link>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-0 divide-y divide-border">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-0">
                  <AccordionTrigger className="font-display text-base md:text-lg font-medium text-foreground py-6 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
