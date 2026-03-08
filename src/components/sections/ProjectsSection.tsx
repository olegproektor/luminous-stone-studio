import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-4">
              Проекты
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
              Реализованные объекты
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mt-4">
              Каждый кейс — решение конкретной задачи в конкретном ландшафте. Смотрите, как свет работает в реальных проектах.
            </p>
          </div>
          <Link
            to="/projects"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-body font-medium tracking-brand uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            Все проекты <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
