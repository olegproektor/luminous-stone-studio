import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

const ContactsPage = () => {
  return (
    <PageLayout
      title="Контакты — STŌN"
      description="Свяжитесь с нами: телефон, email, форма обратной связи. Москва, Россия."
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
              <a href="tel:+74951234567" className="font-body text-lg text-foreground hover:text-accent transition-colors">
                +7 (495) 123-45-67
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Email</h2>
              <a href="mailto:info@ston.ru" className="font-body text-lg text-foreground hover:text-accent transition-colors">
                info@ston.ru
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Для архитекторов</h2>
              <a href="mailto:arch@ston.ru" className="font-body text-lg text-foreground hover:text-accent transition-colors">
                arch@ston.ru
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Адрес</h2>
              <p className="font-body text-base text-muted-foreground">
                Москва, Россия
              </p>
            </div>
          </div>

          {/* Form placeholder */}
          <div className="bg-secondary p-8 md:p-12">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">
              Напишите нам
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Форма обратной связи будет реализована на шаге 5 с валидацией и согласием на обработку ПД.
            </p>
            <div className="space-y-4">
              {["Имя", "Телефон", "Email", "Сообщение"].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-body text-muted-foreground mb-1.5">{label}</label>
                  <div className="h-11 bg-background border border-border" />
                </div>
              ))}
              <div className="h-12 bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-sm font-body text-muted-foreground">Отправить заявку</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default ContactsPage;
