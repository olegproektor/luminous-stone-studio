import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { Menu, X, Sun, Moon, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { headerNavigation } from "@/config/navigation.config";
import { navPaths } from "@/lib/route-helpers";
import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

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

const navItems: NavItem[] = headerNavigation;

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
        "absolute top-full left-0 right-0 z-40 transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none",
        isOpen
          ? "opacity-100 translate-y-0 visible pointer-events-auto"
          : "opacity-0 -translate-y-4 invisible"
      )}
      onMouseLeave={onClose}
    >
      <div className="glass-panel ghost-outline shadow-[0_0_40px_rgba(0,0,0,0.55)]">
        <div className="container-brand px-6 md:px-12 lg:px-24 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {items.map((item, i) => (
              <Link
                key={`${item.label}-${item.href}`}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "group p-5 transition-all duration-300 hover:bg-[hsl(var(--hero-surface)/0.2)]",
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
                )}
                style={{
                  transitionDelay: isOpen ? `${420 + i * 120}ms` : "0ms",
                }}
              >
                <span className="relative inline-block text-sm font-body font-medium text-[hsl(var(--hero-text))] transition-[color] duration-300 group-hover:text-[hsl(var(--accent-light))] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-px after:bg-current after:origin-center after:scale-x-0 after:[transition:transform_1000ms_cubic-bezier(0.77,0,0.175,1)] group-hover:after:scale-x-100">
                  {item.label}
                </span>
                {item.description && (
                  <span className="mt-1.5 block text-xs font-body leading-relaxed text-[hsl(var(--hero-text-muted))]">
                    {item.description}
                  </span>
                )}
                <span className="mt-3 flex items-center gap-1 text-[10px] font-body font-medium uppercase tracking-brand-wide text-transparent transition-all duration-300 group-hover:text-[hsl(var(--accent-light))]">
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
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? "light";

  // Reset drill-down when menu closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setDrillDown(null), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-[hsl(var(--hero-overlay)/0.92)] backdrop-blur-[20px] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]",
        isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <div className="relative h-full w-full overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Закрыть меню"
          className="absolute right-4 top-6 z-20 p-2 text-[hsl(var(--hero-text-muted))] transition-colors hover:text-[hsl(var(--hero-text))]"
        >
          <X size={22} />
        </button>

        <nav className="flex h-full flex-col px-6 py-20 overflow-y-auto">
          <div
            className={cn(
              "transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
              drillDown ? "-translate-x-10 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
            )}
          >
            {navItems.map((item, i) => (
              <div
                key={`${item.label}-${item.href}`}
                className="opacity-0 animate-[slideInRight_0.35s_ease-out_forwards]"
                style={{ animationDelay: isOpen ? `${100 + i * 50}ms` : "0ms" }}
              >
                {item.children ? (
                  <button
                    onClick={() => setDrillDown(item.label)}
                    className="flex w-full items-center justify-between border-b border-[hsl(var(--hero-line)/0.35)] py-4 text-left"
                  >
                    <span className="text-sm font-body font-medium uppercase tracking-[0.08em] text-[hsl(var(--hero-text))]">
                      {item.label}
                    </span>
                    <ChevronRight size={14} className="text-[hsl(var(--hero-text-muted))]" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex w-full items-center justify-between border-b border-[hsl(var(--hero-line)/0.35)] py-4"
                  >
                    <span className="text-sm font-body font-medium uppercase tracking-[0.08em] text-[hsl(var(--hero-text))]">
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-8 space-y-5">
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 text-xs font-body font-medium uppercase tracking-[0.08em] text-[hsl(var(--hero-text-muted))]"
              >
                {currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                {currentTheme === "dark" ? "Светлая тема" : "Тёмная тема"}
              </button>
              <Link
                to={navPaths.requestProject}
                onClick={onClose}
                onMouseDown={() => trackEvent("cta_click", { context: "header_mobile_primary", target: navPaths.requestProject })}
                className={cn(buttonVariants({ variant: "siteInverseOutline", size: "site" }), "px-6 py-3 text-xs tracking-[0.08em]")}
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </nav>

        {navItems.filter(n => n.children).map(item => (
          <div
            key={item.label}
            className={cn(
              "absolute inset-0 bg-[hsl(var(--hero-surface)/0.97)] px-6 py-20 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
              drillDown === item.label ? "translate-x-0" : "translate-x-full pointer-events-none"
            )}
          >
            <button
              onClick={() => setDrillDown(null)}
              className="mb-6 flex items-center gap-2 text-xs font-body font-medium uppercase tracking-[0.08em] text-[hsl(var(--hero-text-muted))]"
            >
              <ChevronRight size={12} className="rotate-180" />
              Назад
            </button>

            <button
              onClick={onClose}
              aria-label="Закрыть раздел"
              className="absolute right-4 top-6 p-2 text-[hsl(var(--hero-text-muted))] transition-colors hover:text-[hsl(var(--hero-text))]"
            >
              <X size={20} />
            </button>

            <h3 className="mb-6 font-display text-xl text-[hsl(var(--hero-text))]">{item.label}</h3>
            {item.children!.map((sub, i) => (
              <Link
                key={sub.href}
                to={sub.href}
                onClick={onClose}
                className="block border-b border-[hsl(var(--hero-line)/0.35)] py-3.5 opacity-0 animate-[slideInRight_0.3s_ease-out_forwards]"
                style={{ animationDelay: `${70 + i * 40}ms` }}
              >
                <span className="text-sm font-body font-medium text-[hsl(var(--hero-text))]">{sub.label}</span>
                {sub.description && (
                  <span className="mt-1 block text-xs text-[hsl(var(--hero-text-muted))]">{sub.description}</span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const HEADER_SETTLE_PX = 12;

/* ─── Header ─── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? "light";
  const isHomePage = location.pathname === navPaths.home;
  const headerScrolled = isHomePage ? scrolled : true;
  const isTransparent = isHomePage ? !headerScrolled : false;

  useLayoutEffect(() => {
    if (!isHomePage) return;
    setScrolled(false);
    const frame = window.requestAnimationFrame(() => {
      setScrolled(window.scrollY > HEADER_SETTLE_PX);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > HEADER_SETTLE_PX);
        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
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

  const handleMegaToggle = useCallback((label: string) => {
    setMegaOpen((current) => (current === label ? null : label));
  }, []);

  const renderDesktopNavItems = () =>
    navItems.map((item) => {
      const isActive = location.pathname.startsWith(item.href);
      const isMegaOpen = megaOpen === item.label;
      return (
        <div
          key={`${item.label}-${item.href}`}
          className="group relative flex items-center gap-1 whitespace-nowrap"
        >
          <Link
            to={item.href}
            className={cn(
              "relative whitespace-nowrap py-4 font-body text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 2xl:text-[11px]",
              "before:absolute before:left-0 before:top-0 before:w-full before:origin-center before:scale-x-0 before:border-t-[2px] before:border-[hsl(var(--accent-light))] before:transition-transform before:duration-500 before:ease-out before:content-['']",
              "after:absolute after:bottom-0 after:left-0 after:w-full after:origin-center after:scale-x-0 after:border-b-[2px] after:border-[hsl(var(--accent-light))] after:transition-transform after:duration-500 after:ease-out after:content-['']",
              "hover:before:scale-x-100 hover:after:scale-x-100 group-hover:before:scale-x-100 group-hover:after:scale-x-100",
              isActive
                ? "text-[hsl(var(--hero-text))] before:scale-x-100 after:scale-x-100"
                : "text-[hsl(var(--hero-text-muted))] hover:text-[hsl(var(--hero-text))]",
            )}
          >
            {item.label}
          </Link>

          {item.children && (
            <button
              type="button"
              aria-label={`Открыть подменю: ${item.label}`}
              aria-expanded={isMegaOpen}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleMegaToggle(item.label);
              }}
              className="mt-[1px] p-0.5 leading-none text-[hsl(var(--hero-text-muted))] transition-colors duration-200 hover:text-[hsl(var(--hero-text))]"
            >
              <ChevronDown
                size={12}
                strokeWidth={2.5}
                className={cn(
                  "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isMegaOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
          )}
        </div>
      );
    });

  return (
    <>
      <header
        data-header={isTransparent ? "transparent" : "solid"}
        className={cn(
          "motion-header fixed top-0 left-0 right-0 z-50 border-b",
          isTransparent
            ? "border-transparent bg-transparent shadow-none"
            : "border-[hsl(var(--hero-line)/0.28)] bg-[hsl(var(--hero-overlay))] shadow-[0_10px_28px_rgba(0,0,0,0.22)]",
        )}
      >
        {/* Center column stays put: logo scale does not push the nav. */}
        <div className="container-brand grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center px-6 md:h-20 md:px-10 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:px-8">
          <Link to={navPaths.home} className="justify-self-start" aria-label="Форма Света, на главную">
            <span
              className={cn(
                "motion-logo block font-wordmark text-[0.95rem] uppercase text-[hsl(var(--hero-text))] md:text-[1.08rem]",
                headerScrolled ? "scale-[0.92]" : "scale-100",
              )}
            >
              Форма Света
            </span>
          </Link>

          <nav className="menu-main hidden items-center justify-center gap-3 xl:flex 2xl:gap-[18px]">
            {renderDesktopNavItems()}
          </nav>

          <div className="flex items-center justify-end gap-2 justify-self-end xl:col-start-3">
            <div className="hidden items-center gap-3 xl:flex 2xl:gap-4">
              <button
                type="button"
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="p-2 text-[hsl(var(--hero-text-muted))] transition-colors duration-300 hover:text-[hsl(var(--hero-text))]"
                aria-label="Переключить тему"
              >
                {currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <Link
                to={navPaths.requestProject}
                onClick={() => trackEvent("cta_click", { context: "header_desktop_primary", target: navPaths.requestProject })}
                className={cn(
                  buttonVariants({ variant: isTransparent ? "siteInverseOutline" : "siteInverse", size: "site" }),
                  "whitespace-nowrap px-4 py-2 font-body text-[10px] font-medium uppercase tracking-[0.08em] 2xl:px-6 2xl:text-[11px]",
                )}
              >
                Обсудить проект
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 text-[hsl(var(--hero-text))] transition-colors duration-300 xl:hidden"
              aria-label="Открыть меню"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {navItems
          .filter((item) => item.children && item.children.length > 0)
          .map((item) => (
            <MegaMenu
              key={item.label}
              items={item.children ?? []}
              isOpen={megaOpen === item.label}
              onClose={() => setMegaOpen(null)}
            />
          ))}
      </header>

      {/* Mobile Off-Canvas */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;
