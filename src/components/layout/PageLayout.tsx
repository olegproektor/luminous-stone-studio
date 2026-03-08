import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Base layout wrapper for all pages.
 * Handles document title, Header, Footer, scroll reset.
 */
const PageLayout = ({ children, title, description }: PageLayoutProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
    window.scrollTo(0, 0);
  }, [title, description]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
