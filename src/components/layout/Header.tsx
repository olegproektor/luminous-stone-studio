import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Коллекции", href: "/collections" },
  { label: "Каталог", href: "/catalog" },
  { label: "Проекты", href: "/projects" },
  { label: "Для архитекторов", href: "/for-architects" },
  { label: "Журнал", href: "/blog" },
  { label: "О бренде", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-brand flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-24">
        <Link to="/" className="font-display text-xl md:text-2xl font-medium tracking-wide text-foreground">
          STŌN
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-body font-medium tracking-wide transition-colors duration-200 ${
                location.pathname.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/request-project"
          className="hidden lg:inline-flex text-sm font-body font-medium tracking-wide text-primary-foreground bg-primary px-6 py-2.5 hover:bg-charcoal-light transition-colors duration-200"
        >
          Запросить проект
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
          aria-label="Меню"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-base font-body font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/request-project"
              className="mt-2 text-center text-sm font-body font-medium text-primary-foreground bg-primary px-6 py-3"
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
