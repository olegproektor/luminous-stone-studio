import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import LeadFormWrapper from "@/components/forms/LeadFormWrapper";
import CollectionsPanel, { collectionsRailOffsetClass } from "@/components/products/CollectionsPanel";
import ObjectPackagesModule from "@/components/for-objects/modules/ObjectPackagesModule";
import ObjectFlowModule from "@/components/for-objects/modules/ObjectFlowModule";
import { objectPackagesSeed } from "@/data/object-packages.seed";
import { forObjectsQualificationPreset } from "@/data/for-objects-form-presets.seed";
import { productsShowcaseSeed } from "@/data/products-showcase.seed";
import { trackEvent } from "@/lib/analytics";
import { deliverForm } from "@/lib/form-delivery";
import { siteStrategy } from "@/config/site-strategy";

const ForObjectsPage = () => {
  return (
    <PageLayout
      title="Для объектов — Форма Света"
      description="Пакетные решения и квалификация запроса для архитекторов, девелоперов и частных премиальных объектов."
    >
      <PageHero
        eyebrow="Для объектов"
        title="Подбор решения для объектов и проектных пространств"
        subtitle="Страница для девелоперов, hospitality, архитекторов и объектных команд, которым нужен не товар сам по себе, а понятный следующий шаг: квалификация запроса, подбор формата работы и комплект материалов под проект."
      />

      <CollectionsPanel title={productsShowcaseSeed.panelTitle} items={productsShowcaseSeed.panelItems} />

      <ObjectPackagesModule packages={objectPackagesSeed} className={collectionsRailOffsetClass} />
      <ObjectFlowModule className={collectionsRailOffsetClass} />

      <div className={`container-brand px-6 pb-20 md:px-12 lg:px-24 ${collectionsRailOffsetClass}`}>
        <div className="max-w-2xl">
          <h2 className="mb-3 font-display text-3xl font-medium text-foreground">Квалификация проектного запроса</h2>
          <p className="mb-8 font-body text-sm text-muted-foreground">
            Оставьте роль в проекте, тип объекта, бюджет и ключевые вводные. Это особенно полезно для девелоперских, hospitality и частных премиальных сценариев, где нужно быстро понять формат работы, подбор коллекций и следующий шаг для обсуждения проекта.
          </p>
          <LeadFormWrapper
            preset={forObjectsQualificationPreset}
            onSubmit={async (payload) => {
              trackEvent("cta_click", { context: "for_objects_qualification", target: siteStrategy.primaryConversion.href });
              const delivery = await deliverForm({ formId: forObjectsQualificationPreset.formId, data: payload });
              if (!delivery.ok) {
                throw new Error(delivery.message);
              }
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ForObjectsPage;
