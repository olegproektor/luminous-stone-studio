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
        title="Обсудим запрос и подскажем лучший следующий шаг"
        subtitle="Если нужно быстро выйти на диалог по проекту, выберите удобный канал: архитекторы, объектные команды и частные клиенты получают понятный маршрут уже на первом контакте."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="max-w-xl space-y-3">
              <p className="font-body text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Как выбрать канал
              </p>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                Если нужен быстрый старт по проекту, пишите в удобный канал и коротко укажите тип объекта,
                стадию и задачу. Мы подскажем, какие материалы или следующий шаг будут полезны именно
                в вашем сценарии.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Телефон для срочного обсуждения</h2>
              <p className="font-body text-sm text-muted-foreground mb-3">
                Подходит, если нужно быстро сверить вводные по проекту, срокам или следующему рабочему шагу.
              </p>
              <a
                href="tel:+74951234567"
                onClick={() => trackClick("call", "+74951234567")}
                className="font-body text-lg text-foreground hover:text-accent transition-colors"
              >
                +7 (495) 123-45-67
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Общий контакт</h2>
              <p className="font-body text-sm text-muted-foreground mb-3">
                Для первого касания по частному или объектному запросу, когда удобно отправить вводные письмом.
              </p>
              <a
                href="mailto:info@ston.ru"
                onClick={() => trackClick("email", "info@ston.ru")}
                className="font-body text-lg text-foreground hover:text-accent transition-colors"
              >
                info@ston.ru
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Для архитекторов и дизайнеров</h2>
              <p className="font-body text-sm text-muted-foreground mb-3">
                Для проектных вводных, запроса материалов, координации BIM и обсуждения применения решений.
              </p>
              <a
                href="mailto:arch@ston.ru"
                onClick={() => trackClick("email", "arch@ston.ru")}
                className="font-body text-lg text-foreground hover:text-accent transition-colors"
              >
                arch@ston.ru
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Мессенджеры для быстрого старта</h2>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Удобны для оперативного первого сообщения, если вы хотите быстро обозначить задачу и получить
                ориентир по следующему шагу.
              </p>
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
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Город и присутствие</h2>
              <p className="font-body text-sm text-muted-foreground mb-3">
                Москва как базовая точка координации частных и объектных проектов по России.
              </p>
              <p className="font-body text-base text-muted-foreground">
                Москва, Россия
              </p>
            </div>
          </div>

          <div className="bg-secondary p-8 md:p-12">
            <h2 className="font-display text-2xl font-medium text-foreground mb-2">
              Отправьте вводные по запросу
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-3">
              Форма подходит, если удобнее сразу собрать всё в одном сообщении: тип объекта, город, стадия,
              задача и желаемый формат связи.
            </p>
            <p className="font-body text-sm text-muted-foreground mb-8">
              После отправки мы вернёмся с понятным следующим шагом: подскажем нужный канал, материалы или
              формат обсуждения проекта.
            </p>
            <LeadFormWrapper preset={contactFormPreset} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default ContactsPage;
