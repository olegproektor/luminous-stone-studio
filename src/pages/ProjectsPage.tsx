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
        title="Кейсы, которые показывают, как решение работает в пространстве"
        subtitle="Это не просто красивые объекты, а реализованные сценарии применения света: навигация, акцент на материале и работа с проектной логикой в частных и объектных пространствах."
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
        eyebrow="Похожий сценарий"
        title="Подберём решение под ваш объект по аналогичной задаче"
        subtitle="Если вам близок один из кейсов, переведём его логику в ваш проект и предложим следующий рабочий шаг."
        primaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
      />
    </PageLayout>
  );
};

export default ProjectsPage;
