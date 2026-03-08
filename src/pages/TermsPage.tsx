import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";

const TermsPage = () => (
  <PageLayout
    title="Пользовательское соглашение — STŌN"
    description="Пользовательское соглашение сайта STŌN."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Пользовательское соглашение
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Настоящее Соглашение определяет условия использования сайта ston.ru и размещённых на нём материалов.
          </p>
          <p className="text-xs text-muted-foreground/60 !mt-10">
            Полный текст соглашения будет размещён после юридической подготовки.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default TermsPage;
