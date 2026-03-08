import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";
import CTASection from "@/components/layout/CTASection";
import { projects } from "@/data/projects";

const projectTypeLabels: Record<string, string> = {
  "private-house": "Частный дом",
  glamping: "Глэмпинг",
  hotel: "Отель",
  restaurant: "Ресторан",
  "public-space": "Общественное пространство",
  "residential-complex": "ЖК",
};

const ProjectsPage = () => {
  return (
    <PageLayout
      title="Проекты — STŌN"
      description="Реализованные проекты ландшафтного освещения: частные дома, глэмпинги, отели, общественные пространства."
    >
      <PageHero
        eyebrow="Проекты"
        title="Реализованные проекты"
        subtitle="Каждый проект — это решение конкретной задачи в конкретном ландшафте."
      />

      <Section>
        <Grid columns={3}>
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-secondary mb-4 overflow-hidden">
                <img
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-body text-muted-foreground mb-1">
                {projectTypeLabels[project.projectType] || project.projectType} · {project.region}
              </p>
              <h3 className="font-display text-lg font-medium text-foreground">{project.title}</h3>
            </a>
          ))}
        </Grid>
      </Section>

      <CTASection
        eyebrow="Ваш проект"
        title="Расскажите о вашем объекте"
        subtitle="Подготовим световое решение под ваши задачи и бюджет."
        primaryCta={{ label: "Запросить проект", href: "/request-project" }}
      />
    </PageLayout>
  );
};

export default ProjectsPage;
