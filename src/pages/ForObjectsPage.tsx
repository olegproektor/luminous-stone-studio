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

const ForObjectsPage = () => {
  return (
    <PageLayout
      title="Для объектов — Форма Света"
      description="Пакетные решения Форма Света для коммерческих и частных объектов."
    >
      <PageHero
        eyebrow="Для объектов"
        title="Для объектов"
        subtitle="Квалификация запроса и пакетные решения для внедрения архитектурного света."
      />

      <CollectionsPanel title={productsShowcaseSeed.panelTitle} items={productsShowcaseSeed.panelItems} />

      <ObjectPackagesModule packages={objectPackagesSeed} className={collectionsRailOffsetClass} />
      <ObjectFlowModule className={collectionsRailOffsetClass} />

      <div className={`container-brand px-6 pb-20 md:px-12 lg:px-24 ${collectionsRailOffsetClass}`}>
        <div className="max-w-2xl">
          <h2 className="mb-3 font-display text-3xl font-medium text-foreground">Квалификация проекта</h2>
          <p className="mb-8 font-body text-sm text-muted-foreground">
            Заполните форму, чтобы получить релевантное предложение по вашему объекту.
          </p>
          <LeadFormWrapper
            preset={forObjectsQualificationPreset}
            onSubmit={async (payload) => {
              trackEvent("cta_click", { context: "for_objects_qualification", entry: "form_submit" });
              void payload;
              return Promise.resolve();
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ForObjectsPage;
