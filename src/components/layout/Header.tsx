import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Sun, Moon, ChevronRight, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* ─── Navigation Data ─── */
interface SubItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Коллекции",
    href: "/collections",
    children: [
      { label: "STŌN Classic", href: "/collections/ston-classic", description: "Гладкая форма, чистый свет" },
      { label: "STŌN Texture", href: "/collections/ston-texture", description: "Природная фактура камня" },
      { label: "LIRA & FORMA", href: "/collections/lira-garden", description: "Свет для сада и акцентов" },
      { label: "Все коллекции", href: "/collections" },
    ],
  },
  {
    label: "Каталог",
    href: "/catalog",
    children: [
      { label: "Болларды", href: "/catalog?category=bollard", description: "Архитектурные световые столбики" },
      { label: "Ландшафтные светильники", href: "/catalog?category=garden", description: "Садовое и парковое освещение" },
      { label: "Акцентные объекты", href: "/catalog?category=accent", description: "Световые формы и скульптуры" },
      { label: "Весь каталог", href: "/catalog" },
    ],
  },
  { label: "Проекты", href: "/projects" },
  { label: "Для архитекторов", href: "/for-architects" },
  { label: "Журнал", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

/* ─── Mega Menu Panel ─── */
const MegaMenu = ({
  items,
  isOpen,
  onClose,
}: {
  items: SubItem[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 z-40 transition-all duration-500 ease-out pointer-events-none",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2"
      )}
      onMouseLeave={onClose}
    >
      <div className="bg-background/98 backdrop-blur-xl border-b border-border/40 shadow-lg">
        <div className="container-brand px-6 md:px-12 lg:px-24 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {items.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "group p-5 transition-all duration-300 hover:bg-secondary/60",
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
                style={{
                  transitionDelay: isOpen ? `${80 + i * 60}ms` : "0ms",
                }}
              >
                <span className="block text-sm font-body font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.label}
                </span>
                {item.description && (
                  <span className="block text-xs font-body text-muted-foreground mt-1.5 leading-relaxed">
                    {item.description}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[10px] font-body font-medium tracking-brand-wide uppercase text-muted-foreground/0 group-hover:text-accent mt-3 transition-all duration-300">
                  <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  Перейти
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Mobile Off-Canvas ─── */
const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [drillDown, setDrillDown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  // Reset drill-down when menu closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setDrillDown(null), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-6 border-b border-border/40">
          <span className="font-display text-lg font-medium tracking-[0.08em]">STŌN</span>
          <button onClick={onClose} aria-label="Закрыть меню" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-6 py-8 overflow-y-auto h-[calc(100%-3.5rem)]">
          {/* Main level */}
          <div
            className={cn(
              "transition-all duration-400 ease-out",
              drillDown ? "opacity-0 -translate-x-8 absolute pointer-events-none" : "opacity-100 translate-x-0"
            )}
          >
            {navItems.map((item, i) => (
              <div
                key={item.href}
                className="opacity-0 animate-[slideInRight_0.4s_ease-out_forwards]"
                style={{ animationDelay: isOpen ? `${100 + i * 50}ms` : "0ms" }}
              >
                {item.children ? (
                  <button
                    onClick={() => setDrillDown(item.label)}
                    className="flex items-center justify-between w-full py-4 border-b border-border/30 text-left"
                  >
                    <span className="text-sm font-body font-medium text-foreground">{item.label}</span>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between w-full py-4 border-b border-border/30"
                  >
                    <span className="text-sm font-body font-medium text-foreground">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-8 space-y-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 text-sm font-body text-muted-foreground"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              </button>
              <Link
                to="/request-project"
                onClick={onClose}
                className="block text-center text-xs font-body font-medium tracking-brand uppercase text-primary-foreground bg-primary px-6 py-4 transition-colors hover:bg-charcoal-light"
              >
                Обсудить проект
              </Link>
            </div>
          </div>

          {/* Drill-down level */}
          {navItems.filter(n => n.children).map(item => (
            <div
              key={item.label}
              className={cn(
                "transition-all duration-400 ease-out",
                drillDown === item.label
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8 absolute pointer-events-none"
              )}
            >
              <button
                onClick={() => setDrillDown(null)}
                className="flex items-center gap-2 text-xs font-body font-medium tracking-brand-wide uppercase text-muted-foreground mb-6"
              >
                <ChevronRight size={12} className="rotate-180" />
                Назад
              </button>
              <h3 className="font-display text-xl font-light mb-6">{item.label}</h3>
              {item.children!.map((sub, i) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  onClick={onClose}
                  className="block py-3.5 border-b border-border/20 opacity-0 animate-[slideInRight_0.35s_ease-out_forwards]"
                  style={{ animationDelay: `${60 + i * 40}ms` }}
                >
                  <span className="text-sm font-body font-medium text-foreground">{sub.label}</span>
                  {sub.description && (
                    <span className="block text-xs text-muted-foreground mt-0.5">{sub.description}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

/* ─── Header ─── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMegaEnter = useCallback((label: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(label);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(null), 150);
  }, []);

  const megaItem = navItems.find(n => n.label === megaOpen && n.children);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-[background-color,backdrop-filter,box-shadow,border-color] duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-[0_1px_24px_-8px_hsl(var(--foreground)/0.08)]"
        )}
      >
        <div
          className={cn(
            "container-brand flex items-center justify-between px-6 md:px-12 lg:px-24",
            "transition-[height,padding] duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            scrolled ? "h-12 md:h-[56px]" : "h-[68px] md:h-[88px]"
          )}
        >
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "font-display font-medium tracking-[0.10em] origin-left",
              "transition-[font-size,color,transform] duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              scrolled ? "text-[16px] md:text-[18px] scale-100" : "text-[19px] md:text-[22px] scale-100",
              isTransparent ? "text-white" : "text-foreground"
            )}
          >
            STŌN
          </Link>

          {/* Desktop Nav */}
          <nav
            className={cn(
              "hidden lg:flex items-center",
              "transition-[gap] duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              scrolled ? "gap-4 xl:gap-6" : "gap-5 xl:gap-8"
            )}
          >
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <div
                  key={item.href}
                  onMouseEnter={() => item.children ? handleMegaEnter(item.label) : undefined}
                  onMouseLeave={item.children ? handleMegaLeave : undefined}
                  className="relative"
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "relative text-[11px] font-body font-medium tracking-[0.08em] uppercase py-1 transition-colors duration-500",
                      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "hover:after:origin-left hover:after:scale-x-100",
                      isTransparent
                        ? cn(
                            "after:bg-white/60",
                            isActive ? "text-white after:scale-x-100 after:origin-left" : "text-white/60 hover:text-white"
                          )
                        : cn(
                            "after:bg-foreground/40",
                            isActive ? "text-foreground after:scale-x-100 after:origin-left" : "text-muted-foreground hover:text-foreground"
                          )
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "p-2 transition-colors duration-500",
                isTransparent
                  ? "text-white/50 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Переключить тему"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link
              to="/request-project"
              className={cn(
                "text-[11px] font-body font-medium tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-[420ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                scrolled ? "px-4 xl:px-5 py-2" : "px-5 xl:px-7 py-2.5",
                isTransparent
                  ? "text-white border border-white/25 hover:bg-white/8 hover:border-white/40"
                  : "text-primary-foreground bg-primary hover:bg-charcoal-light"
              )}
            >
              Обсудить проект
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              "lg:hidden p-2 transition-colors duration-500",
              isTransparent ? "text-white" : "text-foreground"
            )}
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Mega Menu */}
        {megaItem && (
          <MegaMenu
            items={megaItem.children!}
            isOpen={megaOpen === megaItem.label}
            onClose={() => setMegaOpen(null)}
          />
        )}
      </header>

      {/* Mobile Off-Canvas */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;
