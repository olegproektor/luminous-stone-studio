import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import ProjectCard from "@/components/ui/project-card";
import ChipTag from "@/components/ui/chip-tag";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import { projects } from "@/data/projects";
import { navPaths } from "@/lib/route-helpers";
import { getListMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";

const typeLabels: Record<string, string> = {
  all: "Все",
  "private-house": "Частные дома",
  glamping: "Глэмпинги",
  hotel: "Отели",
  restaurant: "Рестораны",
  "public-space": "Общественные",
};

const ProjectsPage = () => {
  const meta = getListMetadata("projects");
  const [type, setType] = useState("all");
  useAnalyticsView({ type: "list", entity: "project" });

  const filtered =
    type === "all" ? projects : projects.filter((p) => p.projectType === type);

  return (
    <PageLayout
      title={meta.title}
      description={meta.description}
    >
      <PageHero
        eyebrow="Проекты"
        title="Реализованные проекты"
        subtitle="Каждый проект — это решение конкретной задачи в конкретном ландшафте."
      />

      <Section>
        <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-border">
          {Object.entries(typeLabels).map(([key, label]) => (
            <ChipTag
              key={key}
              label={label}
              active={type === key}
              onClick={() => setType(key)}
            />
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-foreground/40">
              Проектов этого типа пока нет
            </p>
          </div>
        )}
      </Section>

      <TrustProofStrip />

      <CTASection
        eyebrow="Ваш проект"
        title="Расскажите о вашем объекте"
        subtitle="Подготовим световое решение под ваши задачи и бюджет."
        primaryCta={{ label: "Запросить проект", href: navPaths.requestProject }}
      />
    </PageLayout>
  );
};

export default ProjectsPage;
