import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
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

            <h3 className="mb-6 font-display text-xl font-light text-[hsl(var(--hero-text))]">{item.label}</h3>
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

/* ─── Header ─── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollCompression, setScrollCompression] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [isWideDesktop, setIsWideDesktop] = useState(false);
  const [canShowDesktopActions, setCanShowDesktopActions] = useState(false);
  const [isCompactDesktop, setIsCompactDesktop] = useState(false);
  const [homeReturnAnimating, setHomeReturnAnimating] = useState(false);
  const suppressScrollSyncRef = useRef(false);
  const location = useLocation();
  const previousPathnameRef = useRef<string | null>(
    typeof window !== "undefined" ? window.sessionStorage.getItem("header-last-pathname") : null
  );
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? "light";
  const isHomePage = location.pathname === navPaths.home;
  const headerScrolled = isHomePage ? scrolled : true;
  const headerCompression = isHomePage ? scrollCompression : 1;
  const isTransparent = isHomePage ? !headerScrolled : false;
  const nonHomeThickened = !isHomePage && scrolled;
  const previousPathname = previousPathnameRef.current;
  const shouldAnimateHomeReturn =
    location.pathname === navPaths.home &&
    previousPathname !== null &&
    previousPathname !== navPaths.home;

  useLayoutEffect(() => {
    if (!shouldAnimateHomeReturn) {
      suppressScrollSyncRef.current = false;
      setHomeReturnAnimating(false);
      return;
    }

    suppressScrollSyncRef.current = true;
    setScrolled(false);
    setScrollCompression(0);
    setHomeReturnAnimating(true);

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        setHomeReturnAnimating(false);
        suppressScrollSyncRef.current = false;
      });

      return () => window.cancelAnimationFrame(secondFrame);
    });

    return () => window.cancelAnimationFrame(firstFrame);
  }, [location.pathname]);

  useEffect(() => {
    let rafId: number | null = null;
    const ANIMATION_TRIGGER = 1;

    const onScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        if (suppressScrollSyncRef.current) {
          rafId = null;
          return;
        }

        const y = window.scrollY;
        const isAnimated = y >= ANIMATION_TRIGGER;
        const compression = isAnimated ? 1 : 0;
        setScrollCompression(compression);
        setScrolled(isAnimated);
        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const updateWideDesktop = () => {
      const width = window.innerWidth;
      setIsWideDesktop(width >= 1536);
      setCanShowDesktopActions(width >= 1280);
      setIsCompactDesktop(width >= 1280 && width < 1440);
    };

    updateWideDesktop();
    window.addEventListener("resize", updateWideDesktop);
    return () => {
      window.removeEventListener("resize", updateWideDesktop);
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimateHomeReturn) {
      setHomeReturnAnimating(false);
    }

    previousPathnameRef.current = location.pathname;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("header-last-pathname", location.pathname);
    }
  }, [shouldAnimateHomeReturn, location.pathname]);

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

  const desktopNavGap = isCompactDesktop ? 14 : 18;
  const desktopNavFinalOffsetX = isWideDesktop ? 273 : isCompactDesktop ? 129 : 110;
  const desktopNavCenterOffsetX =
    headerScrolled || !isHomePage || shouldAnimateHomeReturn || homeReturnAnimating ? desktopNavFinalOffsetX : 0;
  const desktopNavShiftX = desktopNavCenterOffsetX;
  const desktopNavShiftY = isHomePage ? (6 + headerCompression * -6) : 0;

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
              "relative whitespace-nowrap font-body font-medium tracking-[0.08em] uppercase py-4 transition-all duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)]",
              isCompactDesktop ? "text-[10px]" : "text-[11px]",
              "before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:border-t-[2px] before:border-[hsl(var(--accent-light))] before:origin-center before:scale-x-0 before:[transition:transform_1000ms_cubic-bezier(0.77,0,0.175,1)]",
              "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b-[2px] after:border-[hsl(var(--accent-light))] after:origin-center after:scale-x-0 after:[transition:transform_1000ms_cubic-bezier(0.77,0,0.175,1)]",
              "hover:before:scale-x-100 hover:after:scale-x-100 group-hover:before:scale-x-100 group-hover:after:scale-x-100",
              isActive
                ? "text-[hsl(var(--hero-text))] before:scale-x-100 after:scale-x-100"
                : "text-[hsl(var(--hero-text-muted))] hover:text-[hsl(var(--hero-text))]"
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
                  isMegaOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </button>
          )}
        </div>
      );
    });

  const renderDesktopActions = (isClustered: boolean) => (
    <div
      className={cn(
        "hidden items-center",
        canShowDesktopActions ? "xl:flex" : "xl:hidden",
        isCompactDesktop ? "gap-2" : "gap-4",
        isClustered
          ? "self-auto mb-0"
          : "self-end mb-[20px] xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:mb-0",
        !isClustered && (isWideDesktop ? "xl:right-4" : "xl:right-6")
      )}
    >
      <button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        className={cn(
          "transition-all duration-500",
          isCompactDesktop ? "p-1.5" : "p-2",
          headerScrolled ? "opacity-100 translate-x-0" : "opacity-0 pointer-events-none translate-x-2",
          isTransparent
            ? "text-[hsl(var(--hero-text-muted))] hover:text-[hsl(var(--hero-text))]"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Переключить тему"
      >
        {currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>
      <Link
        to={navPaths.requestProject}
        onClick={() => trackEvent("cta_click", { context: "header_desktop_primary", target: navPaths.requestProject })}
        className={cn(
          buttonVariants({ variant: isTransparent ? "siteInverseOutline" : "sitePrimary", size: "site" }),
          `font-body font-medium tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-[800ms] ${headerScrolled ? 'ease-[cubic-bezier(0.7,0,1,0.5)]' : 'ease-linear'}`,
          isCompactDesktop ? "text-[10px]" : "text-[11px]",
          headerScrolled
            ? (isCompactDesktop
                ? "opacity-100 max-w-[170px] px-4 py-2"
                : "opacity-100 max-w-[200px] px-5 2xl:px-7 py-2.5")
            : "opacity-0 max-w-0 overflow-hidden px-0 py-0 pointer-events-none",
        )}
      >
        Обсудить проект
      </Link>
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
           "transition-[background-color,backdrop-filter,box-shadow,border-color] duration-[2520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-[hsl(var(--hero-overlay)/0.58)] backdrop-blur-[20px] border-b border-transparent shadow-[0_0_40px_rgba(0,0,0,0.58)]"
        )}
        style={{
          transitionDuration: "2520ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          className={cn(
            "container-brand relative flex w-full items-center justify-between px-4 sm:px-6 md:px-10 xl:px-8",
            isWideDesktop && "max-w-none px-4 2xl:px-4",
            "transition-[height] ease-[cubic-bezier(0.22,1,0.36,1)]",
            isHomePage
              ? (headerScrolled ? "h-[76px] md:h-[88px]" : "h-[84px] md:h-[104px]")
              : (nonHomeThickened ? "h-[94px] md:h-[108px]" : "h-[76px] md:h-[88px]")
          )}
          style={{
            transitionDuration: isHomePage ? "910ms" : "884ms",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Logo */}
          <Link
            to={navPaths.home}
            className={cn(
              "origin-left shrink-0",
              isWideDesktop && "xl:absolute xl:left-4 xl:top-1/2 xl:-translate-y-1/2",
              "transition-[opacity,transform] duration-[2520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              isTransparent ? "xl:opacity-0" : "xl:opacity-100"
            )}
            style={{
              transitionDuration: "2520ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span
              className={cn(
                "block font-display uppercase tracking-[0.16em] text-[hsl(var(--hero-text))] transition-[font-size,line-height] duration-[2520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                headerScrolled ? "text-[0.8rem] md:text-[0.95rem]" : "text-[0.88rem] md:text-[1.05rem]"
              )}
            >
              Форма Света
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className={cn(
              "hidden xl:flex items-center shrink-0 menu-main ease-[cubic-bezier(0.3,0,0.15,1)]",
              "xl:absolute xl:left-1/2",
              isHomePage ? "transition-transform duration-[242ms]" : "transition-none"
            )}
            style={{
              gap: `${desktopNavGap}px`,
              transform: `translate3d(calc(-50% + ${desktopNavShiftX}px), calc(-50% + ${desktopNavShiftY}px), 0)`,
              left: "50%",
              transitionDelay: "0ms",
              transitionDuration: isHomePage ? "910ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.3, 0, 0.15, 1)",
              top: "50%",
            }}
          >
            {renderDesktopNavItems()}
          </nav>

          {/* Desktop Right */}
          {renderDesktopActions(false)}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              "xl:hidden p-2 transition-colors duration-500",
              isTransparent ? "text-[hsl(var(--hero-text))]" : "text-foreground"
            )}
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
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
