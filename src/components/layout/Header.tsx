import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Коллекции", href: "/collections" },
  { label: "Каталог", href: "/catalog" },
  { label: "Проекты", href: "/projects" },
  { label: "Для архитекторов", href: "/for-architects" },
  { label: "Журнал", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home page: transparent header over hero, white text. On scroll: solid bg, dark text.
  // On other pages: always solid.
  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-sm"
      }`}
    >
      <div className="container-brand flex items-center justify-between h-14 md:h-16 px-6 md:px-12 lg:px-24">
        <Link
          to="/"
          className={`font-display text-lg md:text-xl font-medium tracking-[0.08em] transition-colors duration-500 ${
            isTransparent ? "text-white" : "text-foreground"
          }`}
        >
          STŌN
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-xs font-body font-medium tracking-wide transition-colors duration-500 ${
                  isTransparent
                    ? isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 transition-colors duration-500 ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Переключить тему"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/request-project"
            className={`text-xs font-body font-medium tracking-brand uppercase px-6 py-2.5 transition-all duration-500 ${
              isTransparent
                ? "text-white border border-white/40 hover:bg-white/10"
                : "text-primary-foreground bg-primary hover:bg-charcoal-light"
            }`}
          >
            Запросить проект
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden transition-colors duration-500 ${
            isTransparent ? "text-white" : "text-foreground"
          }`}
          aria-label="Меню"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="flex flex-col px-6 py-8 gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-body font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 text-sm font-body font-medium text-muted-foreground"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
            </button>
            <Link
              to="/request-project"
              className="mt-2 text-center text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-6 py-3.5"
              onClick={() => setMobileOpen(false)}
            >
              Запросить проект
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
