import Section from "@/components/layout/Section";
import type { Project } from "@/types";
import type { ReactNode } from "react";

const projectTypeLabels: Record<string, string> = {
  "private-house": "Частный дом",
  glamping: "Глэмпинг",
  hotel: "Отель",
  restaurant: "Ресторан",
  "public-space": "Общественное пространство",
  "residential-complex": "ЖК",
};

interface ProjectContentModuleProps {
  project: Project;
  sidebar?: ReactNode;
}

const ProjectContentModule = ({ project, sidebar }: ProjectContentModuleProps) => {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
        <div className="lg:col-span-2">
          <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-8">{project.title}</h1>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Какая была задача</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Как её решили</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-foreground mb-3">Что это дало пространству</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{project.result}</p>
            </div>
          </div>

          {project.gallery.length > 1 && (
            <div className="grid grid-cols-2 gap-4 mt-10">
              {project.gallery.map((image, index) => (
                <div key={index} className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-secondary p-6">
            <h3 className="font-display text-lg font-medium text-foreground mb-4">О проекте</h3>
            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тип</span>
                <span className="text-foreground font-medium">{projectTypeLabels[project.projectType]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Регион</span>
                <span className="text-foreground font-medium">{project.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Год</span>
                <span className="text-foreground font-medium">{project.year}</span>
              </div>
            </div>
          </div>
          {sidebar}
        </div>
      </div>
    </Section>
  );
};

export default ProjectContentModule;
