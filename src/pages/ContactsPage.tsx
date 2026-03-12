import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import LeadFormWrapper from "@/components/forms/LeadFormWrapper";
import { trackClick } from "@/lib/analytics";
import { contactFormPreset } from "@/data/lead-form-presets";
import { pageContentSeed } from "@/data/page-content.seed";

const ContactsPage = () => {
  return (
    <PageLayout
      title={pageContentSeed.contacts.title}
      description={pageContentSeed.contacts.description}
    >
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        subtitle="Ответим на вопросы, поможем с выбором и подготовим предложение."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Телефон</h2>
              <a
                href="tel:+74951234567"
                onClick={() => trackClick("call", "+74951234567")}
                className="font-body text-lg text-foreground hover:text-accent transition-colors"
              >
                +7 (495) 123-45-67
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Email</h2>
              <a
                href="mailto:info@ston.ru"
                onClick={() => trackClick("email", "info@ston.ru")}
                className="font-body text-lg text-foreground hover:text-accent transition-colors"
              >
                info@ston.ru
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Для архитекторов</h2>
              <a
                href="mailto:arch@ston.ru"
                onClick={() => trackClick("email", "arch@ston.ru")}
                className="font-body text-lg text-foreground hover:text-accent transition-colors"
              >
                arch@ston.ru
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Мессенджеры</h2>
              <div className="flex gap-4">
                <a
                  href="https://t.me/ston_light"
                  onClick={() => trackClick("messenger", "telegram")}
                  className="font-body text-sm font-medium text-foreground border border-border px-5 py-2.5 hover:bg-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
                <a
                  href="https://wa.me/74951234567"
                  onClick={() => trackClick("messenger", "whatsapp")}
                  className="font-body text-sm font-medium text-foreground border border-border px-5 py-2.5 hover:bg-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Адрес</h2>
              <p className="font-body text-base text-muted-foreground">
                Москва, Россия
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-secondary p-8 md:p-12">
            <h2 className="font-display text-2xl font-medium text-foreground mb-2">
              Напишите нам
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Ответим в течение рабочего дня.
            </p>
            <LeadFormWrapper preset={contactFormPreset} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default ContactsPage;
