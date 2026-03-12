import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { buildPath } from "@/lib/route-helpers";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const projectTypeLabels: Record<string, string> = {
  "private-house": "Частный дом",
  glamping: "Глэмпинг",
  hotel: "Отель",
  restaurant: "Ресторан",
  developer: "Девелопмент",
  public: "Общественное пространство",
};

const ProjectCard = ({ project, className = "" }: ProjectCardProps) => {
  return (
    <Link
      to={buildPath.project(project.slug)}
      className={`group block ${className}`}
    >
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden mb-4">
        <img
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-xs font-body font-medium tracking-wide text-background/70">
            {project.region} · {project.year}
          </span>
        </div>
      </div>
      <div>
        <span className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground">
          {projectTypeLabels[project.projectType] || project.projectType}
        </span>
        <h3 className="font-display text-lg md:text-xl font-medium text-foreground mt-1 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-2">
          {project.challenge}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
