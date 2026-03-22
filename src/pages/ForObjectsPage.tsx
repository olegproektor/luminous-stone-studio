import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import LeadFormWrapper from "@/components/forms/LeadFormWrapper";
import ObjectPackagesModule from "@/components/for-objects/modules/ObjectPackagesModule";
import ObjectFlowModule from "@/components/for-objects/modules/ObjectFlowModule";
import { objectPackagesSeed } from "@/data/object-packages.seed";
import { forObjectsQualificationPreset } from "@/data/for-objects-form-presets.seed";
import { trackEvent } from "@/lib/analytics";

const ForObjectsPage = () => {
  return (
    <PageLayout title="Для объектов — КАМЕНЬ И СВЕТ" description="Пакетные решения КАМЕНЬ И СВЕТ для коммерческих и частных объектов.">
      <PageHero
        eyebrow="For Objects"
        title="Для объектов"
        subtitle="Квалификация запроса и пакетные решения для внедрения архитектурного света."
      />

      <ObjectPackagesModule packages={objectPackagesSeed} />
      <ObjectFlowModule />

      <div className="container-brand px-6 md:px-12 lg:px-24 pb-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium text-foreground mb-3">Квалификация проекта</h2>
          <p className="font-body text-sm text-muted-foreground mb-8">Заполните форму, чтобы получить релевантное предложение по вашему объекту.</p>
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
