import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import type { IzdeliyaCollectionSlug, IzdeliyaProductSlug } from "@/data/izdeliya-architecture.seed";
import type { ProductsShowcasePanelItem } from "@/data/products-showcase.seed";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buildPath } from "@/lib/route-helpers";
import { shouldShowStickyCta } from "@/lib/sticky-cta-policy";

interface CollectionsPanelProps {
  title: string;
  items: ProductsShowcasePanelItem[];
  defaultCollection?: IzdeliyaCollectionSlug;
  activeCollection?: IzdeliyaCollectionSlug;
  activeProduct?: IzdeliyaProductSlug;
}

interface CollectionGlassTone {
  panelBg: string;
  panelBorder: string;
  headerBg: string;
  headerBorder: string;
  modelBg: string;
  modelHoverBg: string;
  modelBorder: string;
  marker: string;
}

interface CollectionHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  tone: CollectionGlassTone;
  compact?: boolean;
}

const CONSENT_KEY = "ston_cookie_consent";
export const collectionsRailOffsetClass = "lg:pl-[17rem] xl:pl-[18rem] 2xl:pl-[19rem]";

const desktopToneMap: Record<
  IzdeliyaCollectionSlug,
  {
    base: string;
    active: string;
    line: string;
    plus: string;
  }
> = {
  vozduh: {
    base: "bg-[linear-gradient(180deg,rgba(79,96,108,0.94),rgba(42,50,56,0.96))] text-white border-[#9eb3bf]/28",
    active: "bg-[linear-gradient(180deg,rgba(112,130,142,1),rgba(55,64,70,1))] text-white border-[#c2d1d9]/55 shadow-[0_0_24px_rgba(137,170,204,0.16)]",
    line: "bg-[#d8c568]",
    plus: "#5e7584",
  },
  zemlya: {
    base: "bg-[linear-gradient(180deg,rgba(90,104,79,0.94),rgba(46,53,42,0.96))] text-white border-[#b9c3aa]/28",
    active: "bg-[linear-gradient(180deg,rgba(120,135,108,1),rgba(56,63,51,1))] text-white border-[#d0d8c5]/55 shadow-[0_0_24px_rgba(201,195,128,0.12)]",
    line: "bg-[#d8c568]",
    plus: "#77836c",
  },
  maya: {
    base: "bg-[linear-gradient(180deg,rgba(89,89,96,0.94),rgba(46,46,51,0.96))] text-white border-[#bbbcc0]/28",
    active: "bg-[linear-gradient(180deg,rgba(116,116,123,1),rgba(56,56,61,1))] text-white border-[#d2d3d7]/55 shadow-[0_0_24px_rgba(255,255,255,0.08)]",
    line: "bg-[#d8c568]",
    plus: "#6f6f75",
  },
};

const glassToneMap: Record<IzdeliyaCollectionSlug, CollectionGlassTone> = {
  vozduh: {
    panelBg: "rgba(27, 31, 34, 0.96)",
    panelBorder: "rgba(172, 190, 201, 0.34)",
    headerBg: "rgba(88, 106, 118, 0.94)",
    headerBorder: "rgba(195, 209, 218, 0.4)",
    modelBg: "rgba(56, 64, 71, 0.94)",
    modelHoverBg: "rgba(79, 91, 101, 0.98)",
    modelBorder: "rgba(158, 179, 191, 0.22)",
    marker: "#d8c568",
  },
  zemlya: {
    panelBg: "rgba(29, 31, 27, 0.96)",
    panelBorder: "rgba(190, 201, 176, 0.32)",
    headerBg: "rgba(96, 108, 85, 0.94)",
    headerBorder: "rgba(208, 216, 195, 0.38)",
    modelBg: "rgba(58, 64, 52, 0.94)",
    modelHoverBg: "rgba(82, 92, 72, 0.98)",
    modelBorder: "rgba(185, 195, 170, 0.2)",
    marker: "#d8c568",
  },
  maya: {
    panelBg: "rgba(30, 30, 33, 0.96)",
    panelBorder: "rgba(194, 195, 199, 0.3)",
    headerBg: "rgba(95, 95, 101, 0.94)",
    headerBorder: "rgba(210, 211, 214, 0.36)",
    modelBg: "rgba(58, 58, 62, 0.94)",
    modelHoverBg: "rgba(82, 82, 88, 0.98)",
    modelBorder: "rgba(187, 188, 192, 0.2)",
    marker: "#d8c568",
  },
};

const CollectionHeader = ({ title, subtitle, description, tone, compact = false }: CollectionHeaderProps) => {
  return (
    <div
      style={{
        backgroundColor: tone.headerBg,
        borderColor: tone.headerBorder,
      }}
      className={[
        "border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        compact ? "px-3 py-3" : "px-3 py-3.5",
      ].join(" ")}
    >
      <h3 className={compact ? "font-display text-2xl text-white" : "font-display text-[2rem] text-white"}>{title}</h3>
      <p
        className={
          compact
            ? "mt-1.5 font-body text-sm leading-snug text-white/90"
            : "mt-1.5 font-body text-[0.97rem] leading-snug text-white/90"
        }
      >
        {subtitle}
      </p>
      {description ? (
        <p
          className={
            compact
              ? "mt-2 font-body text-xs leading-relaxed text-white/72"
              : "mt-2 font-body text-sm leading-relaxed text-white/72"
          }
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};

const CollectionsPanel = ({
  title,
  items,
  defaultCollection = "vozduh",
  activeCollection,
  activeProduct,
}: CollectionsPanelProps) => {
  const location = useLocation();
  const [selectedDesktop, setSelectedDesktop] = useState<IzdeliyaCollectionSlug>(activeCollection ?? defaultCollection);
  const [openDesktopCollection, setOpenDesktopCollection] = useState<IzdeliyaCollectionSlug | null>(null);
  const [activeMobile, setActiveMobile] = useState<IzdeliyaCollectionSlug | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeCollection) {
      setSelectedDesktop(activeCollection);
    }
  }, [activeCollection]);

  const desktopCollection = openDesktopCollection ?? selectedDesktop;
  const activeItem = useMemo(
    () => items.find((item) => item.collectionSlug === desktopCollection) ?? items[0],
    [desktopCollection, items],
  );
  const activeGlass = glassToneMap[activeItem.collectionSlug] ?? glassToneMap.vozduh;

  const consentPending = typeof window !== "undefined" && !window.localStorage.getItem(CONSENT_KEY);
  const stickyVisible = shouldShowStickyCta(location.pathname, Boolean(consentPending));

  const desktopPanelStyle: CSSProperties = {
    backgroundColor: activeGlass.panelBg,
    borderColor: activeGlass.panelBorder,
    width: "270px",
    minWidth: "270px",
    maxWidth: "min(270px, calc(100vw - 1rem))",
  };

  const renderModels = (item: ProductsShowcasePanelItem, tone: CollectionGlassTone, mobile = false) => {
    if (item.models.length === 0) {
      return (
        <p className={mobile ? "px-1 text-xs text-white/54" : "px-1 py-2 text-xs text-white/70"}>
          Модели скоро появятся.
        </p>
      );
    }

    return item.models.map((model) => {
      const isActiveModel = activeCollection === item.collectionSlug && activeProduct === model.productSlug;
      const content = (
        <Link
          key={model.productSlug}
          to={buildPath.collectionProduct(item.collectionSlug, model.productSlug)}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = tone.modelHoverBg;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = isActiveModel ? tone.modelHoverBg : tone.modelBg;
          }}
          style={{
            backgroundColor: isActiveModel ? tone.modelHoverBg : tone.modelBg,
            borderColor: tone.modelBorder,
          }}
          className={[
            "block border px-3 py-2 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            mobile ? "w-full min-w-0 text-sm" : "hover:translate-x-1",
            isActiveModel ? "ring-1 ring-[#d8c568]" : "",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-2 font-medium text-white">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tone.marker }} aria-hidden />
            {model.title}
          </span>
          <span className="mt-1 block break-words text-xs text-white/70">{model.subtitle}</span>
        </Link>
      );

      return mobile ? (
        <SheetClose asChild key={model.productSlug}>
          {content}
        </SheetClose>
      ) : (
        content
      );
    });
  };

  return (
    <>
      <aside
        className={[
          "fixed left-0 top-[56%] z-40 hidden max-w-full -translate-y-1/2 items-start gap-2 overflow-x-hidden transition-all duration-500 lg:flex",
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0",
        ].join(" ")}
      >
        <div aria-label={title} className="flex flex-col gap-[2px]">
          {items.map((item) => {
            const isOpen = openDesktopCollection === item.collectionSlug;
            const tones = desktopToneMap[item.collectionSlug] ?? desktopToneMap.vozduh;

            return (
              <button
                key={item.collectionSlug}
                type="button"
                onClick={() => {
                  setSelectedDesktop(item.collectionSlug);
                  setOpenDesktopCollection((prev) => (prev === item.collectionSlug ? null : item.collectionSlug));
                }}
                aria-expanded={isOpen}
                aria-controls={`desktop-collection-${item.collectionSlug}`}
                className={[
                  "relative h-[134px] w-[34px] overflow-hidden border transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_0_24px_rgba(216,197,104,0.16)] xl:h-[150px] xl:w-[38px]",
                  isOpen ? `shadow-xl opacity-100 scale-[1.02] ${tones.active}` : `opacity-100 ${tones.base}`,
                ].join(" ")}
              >
                <span className="absolute left-1/2 top-2 -translate-x-1/2 rotate-180 font-display text-[27px] leading-none tracking-[0.01em] text-white [writing-mode:vertical-rl] xl:text-[30px]">
                  {item.title}
                </span>
                <span className="absolute bottom-2 left-1/2 inline-flex h-[26px] w-[26px] -translate-x-1/2 items-center justify-center rounded-full border border-white/60 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 h-[2px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: tones.plus }}
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 h-[11px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: tones.plus }}
                  />
                </span>
                {isOpen && <span className={`absolute left-0 right-0 top-0 h-[2px] ${tones.line}`} aria-hidden />}
              </button>
            );
          })}
        </div>

        <div
          id={`desktop-collection-${activeItem.collectionSlug}`}
          style={desktopPanelStyle}
          className={[
            "overflow-hidden border p-0 text-white shadow-xl transition-all duration-500",
            openDesktopCollection ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-8 opacity-0",
          ].join(" ")}
        >
          <div className="p-3">
            <CollectionHeader
              title={activeItem.title}
              subtitle={activeItem.subtitle}
              description={activeItem.description}
              tone={activeGlass}
            />
            <div className="my-3 h-px" style={{ backgroundColor: activeGlass.panelBorder }} aria-hidden />
            <div className="space-y-2">{renderModels(activeItem, activeGlass)}</div>
          </div>
        </div>
      </aside>

      <div
        className={[
          "fixed right-4 z-[41] lg:hidden transition-all duration-500",
          stickyVisible ? "bottom-[5.5rem]" : "bottom-4",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        ].join(" ")}
      >
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border bg-[rgba(22,21,20,0.96)] px-5 py-3 text-xs font-body font-medium uppercase tracking-brand-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
            >
              Коллекции
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="border-border bg-[rgba(22,21,20,0.98)] px-0 pb-6 pt-10 text-white sm:max-w-none">
            <SheetHeader className="px-4 text-left">
              <SheetTitle className="font-display text-3xl text-white">{title}</SheetTitle>
              <SheetDescription className="font-body text-sm text-white/60">
                Коллекции и модели доступны на всех страницах раздела и ведут в те же canonical-маршруты.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 divide-y divide-white/10">
              {items.map((item) => {
                const isActive = item.collectionSlug === activeMobile;
                const mobileGlass = glassToneMap[item.collectionSlug] ?? glassToneMap.vozduh;

                return (
                  <div key={item.collectionSlug}>
                    <button
                      type="button"
                      onClick={() => setActiveMobile((prev) => (prev === item.collectionSlug ? null : item.collectionSlug))}
                      className={[
                        "w-full px-4 py-4 text-left transition-all",
                        isActive ? "bg-white/[0.10]" : "bg-white/[0.035] hover:bg-white/[0.06]",
                      ].join(" ")}
                      aria-expanded={isActive}
                      aria-controls={`mobile-collection-${item.collectionSlug}`}
                    >
                      <p className="font-display text-2xl text-white">{item.title}</p>
                      <p className="mt-1 font-body text-xs text-white/54">{item.subtitle}</p>
                    </button>

                    <div
                      id={`mobile-collection-${item.collectionSlug}`}
                      className={[
                        "grid transition-all duration-300",
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <div className="min-w-0 px-4 pb-4">
                          <CollectionHeader
                            title={item.title}
                            subtitle={item.subtitle}
                            description={item.description}
                            tone={mobileGlass}
                            compact
                          />
                          <div className="my-3 h-px" style={{ backgroundColor: mobileGlass.panelBorder }} aria-hidden />
                          <div className="space-y-2">{renderModels(item, mobileGlass, true)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default CollectionsPanel;
