import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import CookieConsentBanner from "@/components/ui/cookie-consent";
import StickyMobileCTA from "@/components/ui/sticky-mobile-cta";
import { routes } from "@/config/routes";

// Eagerly loaded (above fold)
import Index from "./pages/Index";

// Lazy loaded pages
const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const CollectionDetailPage = lazy(() => import("./pages/CollectionDetailPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ForArchitectsPage = lazy(() => import("./pages/ForArchitectsPage"));
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
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-body text-muted-foreground">Загрузка…</span>
    </div>
  </div>
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path={routes.collections} element={<CollectionsPage />} />
            <Route path={routes.collectionsDetailPattern} element={<CollectionDetailPage />} />
            <Route path={routes.products} element={<CatalogPage />} />
            <Route path={routes.productsDetailPattern} element={<ProductPage />} />
            <Route path={routes.productsLegacy} element={<CatalogPage />} />
            <Route path={routes.productsDetailLegacyPattern} element={<ProductPage />} />
            <Route path={routes.projects} element={<ProjectsPage />} />
            <Route path={routes.projectDetailPattern} element={<ProjectDetailPage />} />
            <Route path={routes.downloads} element={<DownloadsHubPage />} />
            <Route path={routes.downloadsCategoryPattern} element={<DownloadCategoryPage />} />
            <Route path={routes.downloadsLegacy} element={<ForArchitectsPage />} />
            <Route path={routes.forObjects} element={<ForObjectsPage />} />
            <Route path={routes.forObjectsLegacy} element={<ForObjectsPage />} />
            <Route path={routes.materials} element={<MaterialsPage />} />
            <Route path={routes.textureDetailPattern} element={<TextureDetailPage />} />
            <Route path={routes.materialsDetailLegacyPattern} element={<TextureDetailPage />} />
            <Route path={routes.company} element={<AboutPage />} />
            <Route path={routes.aboutLegacy} element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path={routes.faq} element={<FaqPage />} />
            <Route path={routes.contacts} element={<ContactsPage />} />
            <Route path={routes.requestProject} element={<RequestProjectPage />} />
            <Route path={routes.privacy} element={<PrivacyPage />} />
            <Route path={routes.cookies} element={<CookiesPage />} />
            <Route path={routes.consent} element={<ConsentPage />} />
            <Route path={routes.terms} element={<TermsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsentBanner />
        <StickyMobileCTA />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
