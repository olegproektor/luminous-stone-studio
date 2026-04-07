import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import DownloadsCategoriesModule from "@/components/downloads/modules/DownloadsCategoriesModule";
import CTASection from "@/components/layout/CTASection";
import { siteStrategy } from "@/config/site-strategy";
import { downloadsCategoriesSeed } from "@/data/downloads.seed";
import { navPaths } from "@/lib/route-helpers";

const DownloadsHubPage = () => {
  return (
    <PageLayout
      title="Скачать — Форма Света"
      description="Каталоги, BIM и техническая поддержка для работы со световыми решениями Форма Света."
    >
      <PageHero
        eyebrow="Скачать"
        title="Проектные материалы для выбора, координации и внедрения"
        subtitle="Раздел в первую очередь для архитекторов, дизайнеров и проектных команд: здесь можно взять каталоги для согласования, BIM для координации и материалы поддержки для внедрения выбранного решения."
      />
      <DownloadsCategoriesModule categories={downloadsCategoriesSeed} />
      <CTASection
        eyebrow="Комплект материалов"
        title="Подберём релевантные материалы под вашу стадию проекта"
        subtitle="Если нужен не один файл, а понятный комплект для согласования, проектирования или следующего шага по объекту, поможем собрать его под состав команды и сценарий задачи."
        primaryCta={{ label: "Получить комплект материалов", href: navPaths.forObjects }}
        secondaryCta={{ label: siteStrategy.primaryConversion.label, href: siteStrategy.primaryConversion.href }}
        context="downloads_hub_final"
      />
    </PageLayout>
  );
};

export default DownloadsHubPage;
