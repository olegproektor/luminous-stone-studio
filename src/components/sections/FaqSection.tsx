import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { navPaths } from "@/lib/route-helpers";

const FaqSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-body font-medium uppercase tracking-brand-wide text-muted-foreground">
              FAQ
            </p>
            <h2 className="mb-6 font-display text-3xl font-light leading-tight text-foreground md:text-4xl">
              Частые вопросы
            </h2>
            <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
              Не нашли ответ? Напишите нам — вернёмся с понятным следующим шагом в течение рабочего дня.
            </p>
            <Link
              to={navPaths.contacts}
              className="border-b border-foreground/30 pb-1 text-xs font-body font-medium uppercase tracking-brand text-foreground transition-colors hover:border-foreground"
            >
              Связаться
            </Link>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-0 divide-y divide-border">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-0">
                  <AccordionTrigger className="py-6 font-display text-base font-medium text-foreground hover:no-underline md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 font-body text-sm leading-relaxed text-muted-foreground">
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
