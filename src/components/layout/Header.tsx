import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Каталог", href: "/catalog" },
  { label: "О бренде", href: "/about" },
  { label: "Проекты", href: "/projects" },
  { label: "Контакты", href: "/contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-brand flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-24">
        {/* Logo */}
        <a href="/" className="font-display text-xl md:text-2xl font-medium tracking-wide text-foreground">
          STŌN
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-body font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <a
          href="/contacts"
          className="hidden md:inline-flex text-sm font-body font-medium tracking-wide text-primary-foreground bg-primary px-6 py-2.5 hover:bg-charcoal-light transition-colors duration-200"
        >
          Запросить проект
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Меню"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-body font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contacts"
              className="mt-2 text-center text-sm font-body font-medium text-primary-foreground bg-primary px-6 py-3"
            >
              Запросить проект
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
