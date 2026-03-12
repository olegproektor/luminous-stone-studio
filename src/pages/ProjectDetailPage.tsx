import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import ProjectHeroModule from "@/components/projects/modules/ProjectHeroModule";
import ProjectContentModule from "@/components/projects/modules/ProjectContentModule";
import ProjectProductsModule from "@/components/projects/modules/ProjectProductsModule";
import { getProjectBySlug, projects } from "@/data/projects";
import { products } from "@/data/products";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { getDetailMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageLayout title="Проект не найден — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Проект не найден</h1>
            <Link to={navPaths.projects} className="font-body text-sm text-muted-foreground underline">
              Все проекты
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const usedProducts = products.filter((product) => {
    if (project.productSlugs?.length) return project.productSlugs.includes(product.slug);
    return project.products.includes(product.id);
  });

  const otherProjects = projects.filter((item) => item.id !== project.id).slice(0, 2);
  const meta = getDetailMetadata({ type: "project", value: project });
  useAnalyticsView({ type: "detail", entity: "project", slug: project.slug });

  return (
    <PageLayout title={meta.title} description={meta.description}>
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Проекты", href: navPaths.projects },
            { label: project.title },
          ]}
        />
      </div>

      <ProjectHeroModule project={project} />
      <TrustProofStrip />

      <ProjectContentModule
        project={project}
        sidebar={
          <>
            <ProjectProductsModule products={usedProducts} />
            <Link
              to={navPaths.requestProject}
              className="block text-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-6 py-3.5 hover:bg-charcoal-light transition-colors"
            >
              Хочу подобное решение
            </Link>
          </>
        }
      />

      {otherProjects.length > 0 && (
        <Section variant="alt" eyebrow="Ещё проекты" title="Другие реализации">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((item) => (
              <Link key={item.id} to={buildPath.project(item.slug)} className="group block">
                <div className="aspect-[16/9] bg-secondary overflow-hidden mb-4">
                  <img
                    src={item.coverImage.src}
                    alt={item.coverImage.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {item.region} · {item.year}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title="Хотите подобное решение?"
        subtitle="Обсудим ваш объект и подготовим предложение."
        primaryCta={{ label: "Запросить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Все проекты", href: navPaths.projects }}
      />
    </PageLayout>
  );
};

export default ProjectDetailPage;
