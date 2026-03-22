import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import DownloadsCategoriesModule from "@/components/downloads/modules/DownloadsCategoriesModule";
import CTASection from "@/components/layout/CTASection";
import { downloadsCategoriesSeed } from "@/data/downloads.seed";
import { navPaths } from "@/lib/route-helpers";

const DownloadsHubPage = () => {
  return (
    <PageLayout
      title="Загрузки — КАМЕНЬ И СВЕТ"
      description="Каталоги и BIM-материалы КАМЕНЬ И СВЕТ для проектирования и подбора решений."
    >
      <PageHero
        eyebrow="Downloads"
        title="Загрузки"
        subtitle="Каталоги и BIM-файлы для работы с продуктами КАМЕНЬ И СВЕТ."
      />
      <DownloadsCategoriesModule categories={downloadsCategoriesSeed} />
      <CTASection
        title="Нужен набор материалов под объект?"
        subtitle="Подготовим релевантные файлы и рекомендации под ваш сценарий."
        primaryCta={{ label: "Запросить материалы", href: navPaths.forObjects }}
      />
    </PageLayout>
  );
};

export default DownloadsHubPage;
