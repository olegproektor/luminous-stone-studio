import { useState } from "react";
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
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-lg border-b border-border/40">
      <div className="container-brand flex items-center justify-between h-14 md:h-16 px-6 md:px-12 lg:px-24">
        <Link to="/" className="font-display text-lg md:text-xl font-medium tracking-[0.08em] text-foreground">
          STŌN
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-xs font-body font-medium tracking-wide transition-colors duration-200 ${
                location.pathname.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Переключить тему"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/request-project"
            className="text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-6 py-2.5 hover:bg-charcoal-light transition-colors duration-300"
          >
            Запросить проект
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
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
