import { Link, useLocation, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CollectionsPanel, { collectionsRailOffsetClass } from "@/components/products/CollectionsPanel";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
import { siteStrategy } from "@/config/site-strategy";
import { getCollectionLaunchStatus } from "@/data/public-catalog-state";
import { buildPath, navPaths } from "@/lib/route-helpers";
import { useAnalyticsView } from "@/hooks/useAnalyticsView";
import { resolveCanonicalCollectionSlug } from "@/config/routes";
import { getIzdeliyaCollectionBySlug, getIzdeliyaProductsByCollection } from "@/data/izdeliya-architecture.seed";
import { productsShowcaseSeed } from "@/data/products-showcase.seed";

const t = {
  catalog: "Каталог",
  collection: "Коллекция",
  notFoundTitle: "Коллекция не найдена",
  backToCatalog: "Вернуться в каталог",
  identityEyebrow: "Роль коллекции",
  identityTitle: "Коллекция как направление решения",
  identitySupport:
    "Коллекция нужна не для абстрактного выбора формы, а для понимания того, как свет будет работать в проекте: направлять движение, подчеркивать материал или собирать ритм пространства.",
  identityUseCases: "Где коллекция работает лучше всего",
  identityRhythm: "Какой характер света она задаёт",
  identityNextStep: "Когда идти в модель, а когда сразу обсуждать проект",
  innerSolutions: "Состав коллекции",
  inDev: "Направление готовим к запуску",
  inDevText:
    "Коллекция уже показывает характер будущего решения. Можно заранее обсудить применение в проекте, а модели и спецификации публикуются после проектной валидации и подготовки материалов.",
  collectionProducts: "Модели коллекции",
  openModel: "Смотреть модель",
  ctaTitle: "Поможем выбрать модель и формат применения",
  ctaSubtitle:
    "Если коллекция подходит по характеру света, поможем перейти к модели, материалам и следующему шагу в обсуждении частного или объектного проекта.",
  getMaterials: "Получить материалы",
} as const;

const collectionPageCopy = {
  vozduh: {
    heroSubtitle:
      "Коллекция для маршрутов, входных групп и спокойной вечерней навигации, когда свет должен мягко направлять движение и не перегружать пространство.",
    useCases:
      "Подходит для частных участков, камерных общественных территорий, входных групп и дорожек, где важны ориентация, тишина света и аккуратный вечерний ритм.",
    rhythm:
      "Даёт мягкий вертикальный свет и деликатную навигацию. Коллекция помогает обозначить путь, вход и границы зон без жёсткого контраста и визуального шума.",
    nextStep:
      "Если уже понятен сценарий маршрута, переходите к модели. Если нужно выбрать высоту, ритм расстановки и формат монтажа под конкретный проект, лучше сразу обсудить задачу.",
  },
  zemlya: {
    heroSubtitle:
      "Коллекция для рельефа, фактур и архитектурных акцентов, когда свет должен раскрывать материал и поддерживать пластику пространства вечером.",
    useCases:
      "Подходит для фактурных стен, подпорных поверхностей, посадок, пластики рельефа и архитектурных деталей, где важно не только освещение, но и выразительность материала.",
    rhythm:
      "Даёт более акцентный и собранный свет. Коллекция работает там, где нужно направить внимание на поверхность, рельеф или отдельный архитектурный элемент.",
    nextStep:
      "Если вы уже понимаете, что нужен акцентный сценарий, переходите к модели. Если нужно увязать акцентный свет с маршрутом, материалом и общим ритмом участка, лучше обсудить проект целиком.",
  },
  maya: {
    heroSubtitle:
      "Раннее направление для декоративных и акцентных сценариев, которое уже можно рассматривать для пилотных проектов и предварительного обсуждения применения.",
    useCases:
      "Подходит для раннего обсуждения будущих акцентных сценариев в частных и объектных пространствах, где нужна более декоративная или эмоциональная роль света.",
    rhythm:
      "Коллекция формируется как более выразительный акцентный слой. Сейчас она помогает понять характер будущего решения, а не выбрать финальную модель из готового ряда.",
    nextStep:
      "На этом этапе логичнее не искать модель, а обсудить интересующий сценарий применения заранее. После проектной валидации и подготовки спецификаций появятся рабочие модели.",
  },
} as const;

const CollectionDetailPage = () => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const pathnameSlug = location.pathname.startsWith("/izdeliya/") ? location.pathname.split("/")[2] : undefined;
  const resolvedSlug = pathnameSlug ?? slug;
  const canonicalCollectionSlug = resolvedSlug ? resolveCanonicalCollectionSlug(resolvedSlug) : undefined;

  const collection = canonicalCollectionSlug ? getIzdeliyaCollectionBySlug(canonicalCollectionSlug) : undefined;
  const products = canonicalCollectionSlug ? getIzdeliyaProductsByCollection(canonicalCollectionSlug) : [];

  useAnalyticsView({ type: "detail", entity: "collection", slug: canonicalCollectionSlug ?? resolvedSlug ?? "unknown" });

  if (!collection) {
    return (
      <PageLayout title={`${t.notFoundTitle} — Форма Света`} noIndex suppressCanonical>
        <Section>
          <div className="py-20 text-center">
            <h1 className="mb-4 font-display text-3xl text-foreground">{t.notFoundTitle}</h1>
            <Link to={navPaths.products} className="font-body text-sm text-muted-foreground underline">
              {t.backToCatalog}
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const pageCopy = collectionPageCopy[collection.slug];
  const isComingSoon = getCollectionLaunchStatus(collection.slug) === "coming-soon";

  return (
    <PageLayout title={collection.seo.title} description={collection.seo.description}>
      <div className={`container-brand px-6 pt-6 md:px-12 lg:px-24 ${collectionsRailOffsetClass}`}>
        <Breadcrumbs items={[{ label: t.catalog, href: navPaths.products }, { label: collection.name }]} />
      </div>

      <PageHero eyebrow={t.collection} title={collection.name} subtitle={pageCopy.heroSubtitle} />
      <CollectionsPanel
        title={productsShowcaseSeed.panelTitle}
        items={productsShowcaseSeed.panelItems}
        activeCollection={collection.slug}
      />
      <TrustProofStrip className={collectionsRailOffsetClass} />

      <Section eyebrow={t.identityEyebrow} title={t.identityTitle} className={`!pt-8 md:!pt-10 ${collectionsRailOffsetClass}`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden border border-border bg-gradient-to-br from-secondary/60 via-secondary/30 to-background">
            <div className="flex h-full w-full flex-col justify-between p-8">
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{t.identityEyebrow}</p>
              <div>
                <p className="font-display text-4xl text-foreground md:text-5xl">{collection.name}</p>
                <p className="mt-3 font-body text-xs uppercase tracking-brand-wide text-muted-foreground">
                  {collection.tagline}
                </p>
              </div>
              <p className="max-w-xs font-body text-sm leading-relaxed text-muted-foreground">{pageCopy.rhythm}</p>
            </div>
          </div>

          <div className="max-w-xl space-y-8">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">{t.identitySupport}</p>
            <div>
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{t.identityUseCases}</p>
              <p className="mt-3 font-body text-base leading-relaxed text-foreground">{pageCopy.useCases}</p>
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{t.identityRhythm}</p>
              <p className="mt-3 font-body text-base leading-relaxed text-foreground">{pageCopy.rhythm}</p>
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{t.identityNextStep}</p>
              <p className="mt-3 font-body text-base leading-relaxed text-foreground">{pageCopy.nextStep}</p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">{t.innerSolutions}</p>
              <p className="mt-3 font-display text-2xl leading-snug text-foreground">
                {products.length > 0 ? products.map((item) => item.name).join(" · ") : collection.name}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {isComingSoon ? (
        <Section title={t.collectionProducts} className={collectionsRailOffsetClass}>
          <div className="border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-2xl text-foreground">{t.inDev}</h2>
            <p className="mt-2 font-body text-muted-foreground">{t.inDevText}</p>
          </div>
        </Section>
      ) : (
        <Section title={t.collectionProducts} className={collectionsRailOffsetClass}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                to={buildPath.collectionProduct(product.collectionSlug, product.slug)}
                className="border border-border bg-background px-5 py-5 transition-colors hover:bg-secondary/30"
              >
                <p className="font-display text-2xl text-foreground">{product.name}</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">{product.tagline}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-foreground">{product.summary}</p>
                <p className="mt-4 inline-flex border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.11em]">
                  {t.openModel}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <div className={collectionsRailOffsetClass}>
        <CTASection
          title={t.ctaTitle}
          subtitle={t.ctaSubtitle}
          primaryCta={{ label: siteStrategy.primaryConversion.label, href: siteStrategy.primaryConversion.href }}
          secondaryCta={{ label: t.getMaterials, href: navPaths.downloads }}
          context={`collection_${collection.slug}_final`}
        />
      </div>
    </PageLayout>
  );
};

export default CollectionDetailPage;
