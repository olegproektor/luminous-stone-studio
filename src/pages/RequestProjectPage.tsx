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
        title="Расскажите о проекте, и мы соберём следующий шаг"
        subtitle="Нам важны тип пространства, стадия проекта, ориентиры по срокам и характер света. На основе этих вводных подскажем направление, материалы и формат дальнейшей работы."
      />

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="font-body text-sm uppercase tracking-brand-wide text-muted-foreground">
                Что полезно указать
              </p>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                Чем точнее вводные, тем быстрее мы предложим осмысленный следующий шаг. Достаточно
                коротко описать тип объекта, стадию проекта, город, ограничения и желаемый сценарий света.
              </p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Для частных участков обычно достаточно понять маршрут, входные зоны, террасы и степень
                акцентности света.
              </p>
              <p>
                Для объектных сценариев важны масштаб, тип команды, стадия согласования и нужны ли уже
                сейчас материалы для проектирования или координации.
              </p>
              <p>
                Если часть параметров ещё не определена, это нормально. Мы всё равно поможем сузить
                направление и предложим удобный формат дальнейшего обсуждения.
              </p>
            </div>
          </div>

          <div className="bg-secondary p-8 md:p-12">
            <RequestProjectForm />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default RequestProjectPage;
