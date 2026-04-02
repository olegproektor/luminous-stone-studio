import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import DownloadsCategoriesModule from "@/components/downloads/modules/DownloadsCategoriesModule";
import CTASection from "@/components/layout/CTASection";
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
        title="Материалы для проекта и сопровождения"
        subtitle="Каталоги, BIM и раздел технической поддержки для подбора, проектирования, монтажа и сопровождения решений."
      />
      <DownloadsCategoriesModule categories={downloadsCategoriesSeed} />
      <CTASection
        eyebrow="Подбор материалов"
        title="Нужен набор материалов под объект?"
        subtitle="Подготовим релевантные файлы и рекомендации под ваш сценарий, тип проекта и состав команды."
        primaryCta={{ label: "Запросить материалы", href: navPaths.forObjects }}
        secondaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
      />
    </PageLayout>
  );
};

export default DownloadsHubPage;

