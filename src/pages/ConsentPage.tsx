import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";

const ConsentPage = () => (
  <PageLayout
    title="Согласие на обработку ПД — STŌN"
    description="Форма и условия согласия на обработку персональных данных."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Согласие на обработку персональных данных
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Отправляя форму на сайте ston.ru, вы даёте согласие на обработку ваших персональных данных
            в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ.
          </p>
          <p className="text-xs text-muted-foreground/60 !mt-10">
            Полный текст согласия будет размещён после юридической подготовки.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default ConsentPage;
