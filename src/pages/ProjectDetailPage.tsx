import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import { siteStrategy } from "@/config/site-strategy";
import ProjectHeroModule from "@/components/projects/modules/ProjectHeroModule";
import ProjectContentModule from "@/components/projects/modules/ProjectContentModule";
import ProjectProductsModule from "@/components/projects/modules/ProjectProductsModule";
import { getProjectBySlug, projects } from "@/data/projects";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { getDetailMetadata } from "@/lib/metadata-pipeline";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { getIzdeliyaCollectionBySlug, getIzdeliyaProductsByCollection } from "@/data/izdeliya-architecture.seed";
import { resolveCanonicalCollectionSlug } from "@/config/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageLayout title="Проект не найден — Форма Света">
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

  const usedProducts: Product[] = (project.collectionSlugs ?? [])
    .map((slugValue) => resolveCanonicalCollectionSlug(slugValue))
    .filter((slugValue): slugValue is "vozduh" | "zemlya" | "maya" => Boolean(slugValue))
    .map((slugValue) => getIzdeliyaCollectionBySlug(slugValue))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => {
      const primaryProduct = getIzdeliyaProductsByCollection(item.slug)[0];

      return {
      id: `project-${item.slug}`,
      slug: primaryProduct?.slug ?? item.slug,
      status: "active",
      name: item.name,
      series: "Коллекция",
      category: "custom",
      tagline: item.tagline,
      description: item.description,
      features: [],
      specs: [],
      variants: [],
      images: [{ src: "/placeholder.svg", alt: item.name }],
      nightImages: [],
      environmentImages: [],
      materials: [],
      ipRating: "",
      lightTemp: "",
      relatedProductIds: [],
      useCases: [],
      seo: item.seo,
      createdAt: "2026-01-01",
      };
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

      <div className="container-brand px-6 md:px-12 lg:px-24 pt-10">
        <p className="max-w-3xl font-body text-base leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </div>

      <ProjectContentModule
        project={project}
        sidebar={
          <>
            <ProjectProductsModule products={usedProducts} />
            <Link
              to={navPaths.requestProject}
              className={cn(buttonVariants({ variant: "sitePrimary", size: "site" }), "block text-center")}
            >
              Хочу подобное решение
            </Link>
          </>
        }
      />

      {otherProjects.length > 0 && (
        <Section variant="alt" eyebrow="Ещё кейсы" title="Другие сценарии применения">
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
        title="Если вам близок этот кейс, подберём похожий сценарий"
        subtitle="Переведём логику этого проекта в ваш объект, сопоставим коллекции и предложим следующий рабочий шаг."
        primaryCta={{ label: siteStrategy.primaryConversion.label, href: siteStrategy.primaryConversion.href }}
        secondaryCta={{ label: "Все проекты", href: navPaths.projects }}
        context={`project_${project.slug}_final`}
      />
    </PageLayout>
  );
};

export default ProjectDetailPage;
