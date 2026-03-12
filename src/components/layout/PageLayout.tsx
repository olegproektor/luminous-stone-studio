import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { resolveCanonicalUrl } from "@/lib/canonical";
import { resolveSchema } from "@/lib/schema";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

/**
 * Base layout wrapper for all pages.
 * Handles document title, meta, canonical, JSON-LD, Header, Footer, scroll reset.
 */
const PageLayout = ({ children, title, description, canonical, jsonLd }: PageLayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    // OG tags
    if (title) {
      let og = document.querySelector('meta[property="og:title"]');
      if (!og) {
        og = document.createElement("meta");
        og.setAttribute("property", "og:title");
        document.head.appendChild(og);
      }
      og.setAttribute("content", title);
    }
    if (description) {
      let og = document.querySelector('meta[property="og:description"]');
      if (!og) {
        og = document.createElement("meta");
        og.setAttribute("property", "og:description");
        document.head.appendChild(og);
      }
      og.setAttribute("content", description);
    }

    // Canonical (single source, alias-aware)
    const resolvedCanonical = resolveCanonicalUrl(location.pathname, canonical);
    if (resolvedCanonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.href = resolvedCanonical;
    }

    // JSON-LD schema (extends metadata/canonical foundation)
    const schemaPayload = jsonLd ?? resolveSchema({
      pathname: location.pathname,
      title,
      description,
      canonical: resolvedCanonical,
    });
    const existingScript = document.querySelector('script[data-page-jsonld]');
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-jsonld", "true");
    script.textContent = JSON.stringify(schemaPayload);
    document.head.appendChild(script);

    window.scrollTo(0, 0);
    return () => { script.remove(); };
  }, [title, description, canonical, jsonLd, location.pathname]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
