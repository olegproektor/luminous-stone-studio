import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { getProjectBySlug } from "@/data/projects";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageLayout title="Проект не найден — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Проект не найден</h1>
            <a href="/projects" className="font-body text-sm text-muted-foreground underline">
              Все проекты
            </a>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={project.seo.title} description={project.seo.description}>
      {/* Cover */}
      <div className="aspect-[21/9] bg-secondary">
        <img
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          className="w-full h-full object-cover"
        />
      </div>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-body text-muted-foreground mb-4">
            {project.region} · {project.year}
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-8">
            {project.title}
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Задача</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Решение</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">Результат</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {project.result}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="Хотите подобное решение?"
        subtitle="Обсудим ваш объект и подготовим предложение."
        primaryCta={{ label: "Запросить проект", href: "/request-project" }}
        secondaryCta={{ label: "Все проекты", href: "/projects" }}
      />
    </PageLayout>
  );
};

export default ProjectDetailPage;
