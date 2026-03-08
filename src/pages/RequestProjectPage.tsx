import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import RequestProjectForm from "@/components/forms/RequestProjectForm";

const RequestProjectPage = () => {
  return (
    <PageLayout
      title="Запросить проект — STŌN"
      description="Оставьте заявку на проект ландшафтного освещения. Подготовим подборку и расчёт."
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
