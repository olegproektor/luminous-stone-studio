import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/layout/CTASection";
import Section from "@/components/layout/Section";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import DownloadAssetsModule from "@/components/downloads/modules/DownloadAssetsModule";
import DownloadGateForm from "@/components/downloads/DownloadGateForm";
import SupportVideoLibraryModule from "@/components/downloads/modules/SupportVideoLibraryModule";
import SupportInfoModule from "@/components/downloads/modules/SupportInfoModule";
import SupportRequestModule from "@/components/downloads/modules/SupportRequestModule";
import { downloadsCategoriesSeed, downloadsSeed } from "@/data/downloads.seed";
import { siteStrategy } from "@/config/site-strategy";
import { supportInfoBlocks, supportPageContent, supportVideosSeed, type SupportVideoItem } from "@/data/support-videos.seed";
import { trackEvent } from "@/lib/analytics";
import { startAssetDownload, isGatedAsset } from "@/lib/download-access";
import { navPaths } from "@/lib/route-helpers";
import type { DownloadAsset } from "@/types/downloads";

const supportRoute = "/skachat/support";

const categoryPageCopy = {
  catalogue: {
    eyebrow: "Каталоги",
    title: "Каталоги для выбора и согласования решения",
    subtitle:
      "Материалы для архитекторов, дизайнеров и проектных команд, которым нужно быстро выбрать направление, сверить коллекции и подготовить следующий шаг по проекту.",
    finalTitle: "Нужен дополнительный комплект для согласования?",
    finalSubtitle:
      "Если одного каталога недостаточно, подберём релевантные материалы под тип проекта, стадию работы и состав команды.",
    primaryLabel: "Получить комплект материалов",
  },
  bim: {
    eyebrow: "BIM и 3D",
    title: "Материалы для проектирования и координации",
    subtitle:
      "BIM и 3D-файлы для архитектурных, объектных и девелоперских сценариев, где решение уже входит в проектирование, рабочую координацию и спецификацию.",
    finalTitle: "Нужны дополнительные проектные материалы?",
    finalSubtitle:
      "Если BIM-пакета недостаточно, поможем собрать релевантный набор файлов и вводных под стадию проекта и формат команды.",
    primaryLabel: "Запросить проектные материалы",
  },
} as const;

const DownloadCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [gatedAsset, setGatedAsset] = useState<DownloadAsset | null>(null);
  const [successAsset, setSuccessAsset] = useState<DownloadAsset | null>(null);

  const categoryData = useMemo(() => downloadsCategoriesSeed.find((item) => item.slug === category), [category]);
  const assets = useMemo(() => downloadsSeed.filter((item) => item.category === category), [category]);
  const isSupportCategory = categoryData?.slug === "support";

  if (!categoryData) {
    return (
      <PageLayout title="Категория не найдена — Форма Света" description="Запрошенная категория раздела скачать не найдена.">
        <Section>
          <p className="font-body text-sm text-muted-foreground">Категория не найдена.</p>
        </Section>
      </PageLayout>
    );
  }

  const handleDownloadClick = (asset: DownloadAsset) => {
    trackEvent("download_intent", {
      category: asset.category,
      asset: asset.slug,
      accessMode: asset.accessMode,
    });

    if (isGatedAsset(asset)) {
      setGatedAsset(asset);
      return;
    }

    trackEvent("download_pdf", { asset: asset.slug, category: asset.category });
    startAssetDownload(asset.fileUrl);
  };

  const handleGateSuccess = () => {
    if (!gatedAsset) return;
    setSuccessAsset(gatedAsset);
    startAssetDownload(gatedAsset.fileUrl);
    setGatedAsset(null);
  };

  const handleSupportVideoClick = (video: SupportVideoItem) => {
    trackEvent("cta_click", {
      context: "technical_support_video",
      target: video.slug,
      topic: video.topic,
    });
  };

  if (isSupportCategory) {
    return (
      <PageLayout title={supportPageContent.title} description={supportPageContent.description}>
        <div className="container-brand px-6 pt-6 md:px-12 lg:px-24">
          <Breadcrumbs
            items={[
              { label: "Скачать", href: navPaths.downloads },
              { label: "Техническая поддержка" },
            ]}
          />
        </div>

        <PageHero
          eyebrow={supportPageContent.heroEyebrow}
          title={supportPageContent.heroTitle}
          subtitle={supportPageContent.heroSubtitle}
        />

        <SupportVideoLibraryModule videos={supportVideosSeed} onVideoClick={handleSupportVideoClick} />
        <SupportInfoModule blocks={supportInfoBlocks} />
        <SupportRequestModule entryRoute={supportRoute} />

        <CTASection
          eyebrow="Проект"
          title={supportPageContent.ctaTitle}
          subtitle={supportPageContent.ctaSubtitle}
          primaryCta={{ label: "Запросить поддержку", href: "#support-request" }}
          secondaryCta={{ label: siteStrategy.primaryConversion.label, href: siteStrategy.primaryConversion.href }}
          context="downloads_support_final"
        />
      </PageLayout>
    );
  }

  const pageCopy = categoryPageCopy[categoryData.slug as keyof typeof categoryPageCopy];

  return (
    <PageLayout title={`${categoryData.title} — Форма Света`} description={categoryData.description}>
      <div className="container-brand px-6 pt-6 md:px-12 lg:px-24">
        <Breadcrumbs
          items={[
            { label: "Скачать", href: navPaths.downloads },
            { label: categoryData.title },
          ]}
        />
      </div>
      <PageHero eyebrow={pageCopy.eyebrow} title={pageCopy.title} subtitle={pageCopy.subtitle} />

      {successAsset && (
        <div className="container-brand mt-8 px-6 md:px-12 lg:px-24">
          <div className="border border-accent/20 bg-accent/10 p-4 font-body text-sm text-foreground">
            Материал открыт: файл <strong>{successAsset.title}</strong> отправлен на скачивание. Если нужен смежный комплект для проекта, можно запросить его следующим шагом.
          </div>
        </div>
      )}

      <DownloadAssetsModule assets={assets} onDownloadClick={handleDownloadClick} />

      <CTASection
        eyebrow="Материалы"
        title={pageCopy.finalTitle}
        subtitle={pageCopy.finalSubtitle}
        primaryCta={{ label: pageCopy.primaryLabel, href: navPaths.forObjects }}
        secondaryCta={{ label: siteStrategy.primaryConversion.label, href: siteStrategy.primaryConversion.href }}
        context={`downloads_${categoryData.slug}_final`}
      />

      {gatedAsset && (
        <DownloadGateForm asset={gatedAsset} onCancel={() => setGatedAsset(null)} onSuccess={handleGateSuccess} />
      )}
    </PageLayout>
  );
};

export default DownloadCategoryPage;
