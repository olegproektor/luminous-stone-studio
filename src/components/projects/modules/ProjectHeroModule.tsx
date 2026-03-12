import type { Project } from "@/types";

interface ProjectHeroModuleProps {
  project: Project;
}

const ProjectHeroModule = ({ project }: ProjectHeroModuleProps) => {
  return (
    <div className="container-brand px-6 md:px-12 lg:px-24 mt-6">
      <div className="aspect-[21/9] bg-secondary overflow-hidden">
        <img src={project.coverImage.src} alt={project.coverImage.alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProjectHeroModule;
