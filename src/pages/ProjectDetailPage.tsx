import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ProductCard from "@/components/ui/product-card";
import { getProjectBySlug, projects } from "@/data/projects";
import { products } from "@/data/products";

const projectTypeLabels: Record<string, string> = {
  "private-house": "Частный дом",
  glamping: "Глэмпинг",
  hotel: "Отель",
  restaurant: "Ресторан",
  "public-space": "Общественное пространство",
  "residential-complex": "ЖК",
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageLayout title="Проект не найден — STŌN">
        <Section>
          <div className="text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">Проект не найден</h1>
            <Link to="/projects" className="font-body text-sm text-muted-foreground underline">
              Все проекты
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const usedProducts = products.filter((p) => project.products.includes(p.id));
  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <PageLayout title={project.seo.title} description={project.seo.description}>
      {/* Breadcrumbs */}
      <div className="container-brand px-6 md:px-12 lg:px-24 pt-6">
        <Breadcrumbs
          items={[
            { label: "Проекты", href: "/projects" },
            { label: project.title },
          ]}
        />
      </div>

      {/* Cover */}
      <div className="container-brand px-6 md:px-12 lg:px-24 mt-6">
        <div className="aspect-[21/9] bg-secondary overflow-hidden">
          <img
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-8">
              {project.title}
            </h1>

            <div className="space-y-10">
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Задача</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Решение</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Результат</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Gallery */}
            {project.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-4 mt-10">
                {project.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary p-6">
              <h3 className="font-display text-lg font-medium text-foreground mb-4">О проекте</h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Тип</span>
                  <span className="text-foreground font-medium">
                    {projectTypeLabels[project.projectType]}
                  </span>
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

            {/* Used products */}
            {usedProducts.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-medium text-foreground mb-4">
                  Использованные изделия
                </h3>
                <div className="space-y-4">
                  {usedProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/catalog/${p.slug}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 bg-secondary flex-shrink-0 overflow-hidden">
                        <img
                          src={p.images[0]?.src || "/placeholder.svg"}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                          {p.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">{p.series}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/request-project"
              className="block text-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-6 py-3.5 hover:bg-charcoal-light transition-colors"
            >
              Хочу подобное решение
            </Link>
          </div>
        </div>
      </Section>

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <Section variant="alt" eyebrow="Ещё проекты" title="Другие реализации">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((p) => (
              <Link key={p.id} to={`/projects/${p.slug}`} className="group block">
                <div className="aspect-[16/9] bg-secondary overflow-hidden mb-4">
                  <img
                    src={p.coverImage.src}
                    alt={p.coverImage.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">{p.region} · {p.year}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title="Хотите подобное решение?"
        subtitle="Обсудим ваш объект и подготовим предложение."
        primaryCta={{ label: "Запросить проект", href: "/request-project" }}
        secondaryCta={{ label: "Все проекты", href: "/projects" }}
      />
    </PageLayout>
  );
};

export default ProjectDetailPage;
