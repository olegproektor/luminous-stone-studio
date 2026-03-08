import Section from "@/components/layout/Section";
import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProjectsSection = () => {
  return (
    <Section eyebrow="Проекты" title="Реализованные объекты">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-body font-medium tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
        >
          Все проекты <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
};

export default ProjectsSection;
