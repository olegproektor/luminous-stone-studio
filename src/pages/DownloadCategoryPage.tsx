import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/layout/CTASection";
import Section from "@/components/layout/Section";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import DownloadAssetsModule from "@/components/downloads/modules/DownloadAssetsModule";
import DownloadGateForm from "@/components/downloads/DownloadGateForm";
import { downloadsCategoriesSeed, downloadsSeed } from "@/data/downloads.seed";
import { trackEvent } from "@/lib/analytics";
import { startAssetDownload, isGatedAsset } from "@/lib/download-access";
import { navPaths } from "@/lib/route-helpers";
import type { DownloadAsset } from "@/types/downloads";

const DownloadCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [gatedAsset, setGatedAsset] = useState<DownloadAsset | null>(null);
  const [successAsset, setSuccessAsset] = useState<DownloadAsset | null>(null);

  const categoryData = useMemo(() => downloadsCategoriesSeed.find((item) => item.slug === category), [category]);
  const assets = useMemo(() => downloadsSeed.filter((item) => item.category === category), [category]);

  if (!categoryData) {
    return (
      <PageLayout title="Категория не найдена — КАМЕНЬ И СВЕТ" description="Запрошенная категория загрузок не найдена.">
        <Section>
          <p className="font-body text-sm text-muted-foreground">Категория загрузок не найдена.</p>
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

  return (
    <PageLayout title={`${categoryData.title} — КАМЕНЬ И СВЕТ`} description={categoryData.description}>
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Скачать", href: navPaths.downloads },
            { label: categoryData.title },
          ]}
        />
      </div>
      <PageHero eyebrow="Downloads" title={categoryData.title} subtitle={categoryData.description} />

      {successAsset && (
        <div className="container-brand px-6 md:px-12 lg:px-24 mt-8">
          <div className="p-4 bg-accent/10 border border-accent/20 font-body text-sm text-foreground">
            Доступ открыт: файл <strong>{successAsset.title}</strong> отправлен на скачивание.
          </div>
        </div>
      )}

      <DownloadAssetsModule assets={assets} onDownloadClick={handleDownloadClick} />

      <CTASection
        title="Нужны дополнительные материалы?"
        subtitle="Оставьте запрос, и мы подберем релевантный набор документов."
        primaryCta={{ label: "Связаться", href: navPaths.contacts }}
      />

      {gatedAsset && (
        <DownloadGateForm
          asset={gatedAsset}
          onCancel={() => setGatedAsset(null)}
          onSuccess={handleGateSuccess}
        />
      )}
    </PageLayout>
  );
};

export default DownloadCategoryPage;
