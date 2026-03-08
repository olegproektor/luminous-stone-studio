import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";

const CookiesPage = () => (
  <PageLayout
    title="Политика cookie — STŌN"
    description="Информация об использовании файлов cookie на сайте STŌN."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Политика использования cookie
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Сайт ston.ru использует файлы cookie для обеспечения корректной работы, анализа трафика
            и улучшения пользовательского опыта.
          </p>
          <h2 className="font-display text-xl font-medium text-foreground !mt-10">Типы cookie</h2>
          <p>Необходимые, аналитические, маркетинговые. Вы можете управлять настройками cookie.</p>
          <p className="text-xs text-muted-foreground/60 !mt-10">
            Полный текст политики будет размещён после юридической подготовки.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default CookiesPage;
