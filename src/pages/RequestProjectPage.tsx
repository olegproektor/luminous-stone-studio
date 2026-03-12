import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import RequestProjectForm from "@/components/forms/RequestProjectForm";
import { pageContentSeed } from "@/data/page-content.seed";

const RequestProjectPage = () => {
  return (
    <PageLayout
      title={pageContentSeed.requestProject.title}
      description={pageContentSeed.requestProject.description}
    >
      <PageHero
        eyebrow="Заявка"
        title="Запросить проект"
        subtitle="Расскажите о вашем объекте — подготовим предложение в течение рабочего дня."
      />

      <Section>
        <div className="max-w-2xl mx-auto bg-secondary p-8 md:p-12">
          <RequestProjectForm />
        </div>
      </Section>
    </PageLayout>
  );
};

export default RequestProjectPage;
