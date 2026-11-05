import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import CookieConsentBanner from "@/components/ui/cookie-consent";
import StickyMobileCTA from "@/components/ui/sticky-mobile-cta";
import AppIntroGate from "@/components/layout/AppIntroGate";
import { routes } from "@/config/routes";
import { trackEvent } from "@/lib/analytics";

import Index from "./pages/Index";

const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const CollectionDetailPage = lazy(() => import("./pages/CollectionDetailPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CollectionProductPage = lazy(() => import("./pages/CollectionProductPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ForObjectsPage = lazy(() => import("./pages/ForObjectsPage"));
const MaterialsPage = lazy(() => import("./pages/MaterialsPage"));
const TextureDetailPage = lazy(() => import("./pages/TextureDetailPage"));
const DownloadsHubPage = lazy(() => import("./pages/DownloadsHubPage"));
const DownloadCategoryPage = lazy(() => import("./pages/DownloadCategoryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const RequestProjectPage = lazy(() => import("./pages/RequestProjectPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const ConsentPage = lazy(() => import("./pages/ConsentPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ForArchitectsPage = lazy(() => import("./pages/ForArchitectsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-sm font-body text-muted-foreground">Загрузка...</span>
    </div>
  </div>
);

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
};

const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", {
      path: location.pathname,
      search: location.search || "",
    });
  }, [location.pathname, location.search]);

  return null;
};

const AppShell = () => (
  <BrowserRouter>
    <ScrollToTop />
    <RouteAnalytics />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={routes.home} element={<Index />} />

        <Route path={routes.products} element={<CatalogPage />} />
        <Route path={routes.materials} element={<MaterialsPage />} />
        <Route path={routes.forObjects} element={<ForObjectsPage />} />
        <Route path={routes.projects} element={<ProjectsPage />} />
        <Route path={routes.faq} element={<FaqPage />} />
        <Route path={routes.downloads} element={<DownloadsHubPage />} />
        <Route path={routes.news} element={<BlogPage />} />
        <Route path={routes.contacts} element={<ContactsPage />} />
        <Route path={routes.company} element={<AboutPage />} />

        <Route path={routes.collectionVozduh} element={<CollectionDetailPage />} />
        <Route path={routes.collectionZemlya} element={<CollectionDetailPage />} />
        <Route path={routes.collectionMaya} element={<CollectionDetailPage />} />
        <Route path={routes.collectionProductPattern} element={<CollectionProductPage />} />
        <Route path={routes.textureDetailPattern} element={<TextureDetailPage />} />
        <Route path={routes.projectDetailPattern} element={<ProjectDetailPage />} />
        <Route path={routes.downloadsCategoryPattern} element={<DownloadCategoryPage />} />
        <Route path={routes.newsDetailPattern} element={<BlogPostPage />} />

        <Route path={routes.productsDetailPattern} element={<ProductPage />} />
        <Route path={routes.productsDetailLegacyPattern} element={<ProductPage />} />

        <Route path={routes.productsLegacy} element={<CatalogPage />} />
        <Route path={routes.productsCatalogLegacy} element={<CatalogPage />} />
        <Route path={routes.collections} element={<CollectionsPage />} />
        <Route path={routes.collectionsDetailPattern} element={<CollectionDetailPage />} />
        <Route path={routes.materialsLegacy} element={<MaterialsPage />} />
        <Route path={routes.textureDetailLegacyPattern} element={<TextureDetailPage />} />
        <Route path={routes.materialsDetailLegacyPattern} element={<TextureDetailPage />} />
        <Route path={routes.aboutLegacy} element={<AboutPage />} />
        <Route path={routes.projectsLegacy} element={<ProjectsPage />} />
        <Route path={routes.projectDetailLegacyPattern} element={<ProjectDetailPage />} />
        <Route path={routes.faqLegacy} element={<FaqPage />} />
        <Route path={routes.downloadsLegacy} element={<DownloadsHubPage />} />
        <Route path={routes.downloadsCategoryLegacyPattern} element={<DownloadCategoryPage />} />
        <Route path={routes.downloadsArchitectLegacy} element={<ForArchitectsPage />} />
        <Route path={routes.newsLegacy} element={<BlogPage />} />
        <Route path={routes.newsDetailLegacyPattern} element={<BlogPostPage />} />
        <Route path={routes.contactsLegacy} element={<ContactsPage />} />
        <Route path={routes.forObjectsLegacy} element={<ForObjectsPage />} />
        <Route path={routes.forObjectsCustomLegacy} element={<ForObjectsPage />} />

        <Route path={routes.requestProject} element={<RequestProjectPage />} />
        <Route path={routes.privacy} element={<PrivacyPage />} />
        <Route path={routes.cookies} element={<CookiesPage />} />
        <Route path={routes.consent} element={<ConsentPage />} />
        <Route path={routes.terms} element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <CookieConsentBanner />
    <StickyMobileCTA />
  </BrowserRouter>
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppIntroGate>
          <AppShell />
        </AppIntroGate>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
