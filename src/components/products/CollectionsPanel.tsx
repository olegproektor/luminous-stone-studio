import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buildPath } from "@/lib/route-helpers";
import type { IzdeliyaCollectionSlug } from "@/data/izdeliya-architecture.seed";
import type { ProductsShowcasePanelItem } from "@/data/products-showcase.seed";

interface CollectionsPanelProps {
  title: string;
  items: ProductsShowcasePanelItem[];
  defaultCollection?: IzdeliyaCollectionSlug;
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
  description: string;
  tone: CollectionGlassTone;
  compact?: boolean;
}

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
    base: "bg-[rgba(28,27,27,0.76)] text-white/86 border-white/10",
    active: "bg-[linear-gradient(180deg,rgba(88,102,112,0.9),rgba(43,47,50,0.92))] text-white border-[#9eb3bf]/40 shadow-[0_0_24px_rgba(137,170,204,0.16)]",
    line: "bg-[#d8c568]",
    plus: "#5e7584",
  },
  zemlya: {
    base: "bg-[rgba(28,27,27,0.76)] text-white/86 border-white/10",
    active: "bg-[linear-gradient(180deg,rgba(92,104,85,0.9),rgba(43,47,41,0.92))] text-white border-[#b9c3aa]/40 shadow-[0_0_24px_rgba(201,195,128,0.12)]",
    line: "bg-[#d8c568]",
    plus: "#77836c",
  },
  maya: {
    base: "bg-[rgba(28,27,27,0.76)] text-white/86 border-white/10",
    active: "bg-[linear-gradient(180deg,rgba(86,86,90,0.9),rgba(42,42,45,0.92))] text-white border-[#bbbcc0]/38 shadow-[0_0_24px_rgba(255,255,255,0.08)]",
    line: "bg-[#d8c568]",
    plus: "#6f6f75",
  },
};

const glassToneMap: Record<IzdeliyaCollectionSlug, CollectionGlassTone> = {
  vozduh: {
    panelBg: "rgba(24, 27, 29, 0.72)",
    panelBorder: "rgba(158, 179, 191, 0.28)",
    headerBg: "rgba(71, 89, 101, 0.62)",
    headerBorder: "rgba(185, 202, 212, 0.34)",
    modelBg: "rgba(43, 50, 56, 0.72)",
    modelHoverBg: "rgba(67, 78, 86, 0.82)",
    modelBorder: "rgba(158, 179, 191, 0.22)",
    marker: "#d8c568",
  },
  zemlya: {
    panelBg: "rgba(26, 28, 24, 0.74)",
    panelBorder: "rgba(185, 195, 170, 0.26)",
    headerBg: "rgba(83, 94, 73, 0.62)",
    headerBorder: "rgba(198, 207, 182, 0.34)",
    modelBg: "rgba(47, 53, 43, 0.72)",
    modelHoverBg: "rgba(71, 80, 64, 0.82)",
    modelBorder: "rgba(185, 195, 170, 0.2)",
    marker: "#d8c568",
  },
  maya: {
    panelBg: "rgba(27, 27, 29, 0.74)",
    panelBorder: "rgba(187, 188, 192, 0.24)",
    headerBg: "rgba(80, 80, 86, 0.62)",
    headerBorder: "rgba(199, 201, 204, 0.32)",
    modelBg: "rgba(47, 47, 50, 0.72)",
    modelHoverBg: "rgba(70, 70, 74, 0.82)",
    modelBorder: "rgba(187, 188, 192, 0.2)",
    marker: "#d8c568",
  },
};

const menuEase = "cubic-bezier(0.77, 0, 0.175, 1)";
const flyDurationMs = 860;
const panelWidth = 270;
const desktopPanelDurationMs = 780;

const CollectionHeader = ({ title, description, tone, compact = false }: CollectionHeaderProps) => {
  return (
    <div
      style={{
        backgroundColor: tone.headerBg,
        borderColor: tone.headerBorder,
      }}
      className={["border backdrop-blur-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]", compact ? "px-3 py-3" : "px-3 py-3.5"].join(" ")}
    >
      <p className="font-body text-[10px] tracking-[0.14em] uppercase text-white/58">{`\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f`}</p>
      <h3 className={compact ? "font-display text-2xl text-white mt-1" : "font-display text-[2rem] text-white mt-1"}>{title}</h3>
      <p className={compact ? "font-body text-sm text-white/85 mt-1 leading-snug" : "font-body text-[0.97rem] text-white/85 mt-1 leading-snug"}>{description}</p>
    </div>
  );
};

const CollectionsPanel = ({ title, items, defaultCollection = "vozduh" }: CollectionsPanelProps) => {
  const [activeDesktop, setActiveDesktop] = useState<IzdeliyaCollectionSlug>(defaultCollection);
  const [activeMobile, setActiveMobile] = useState<IzdeliyaCollectionSlug | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [desktopModelsVisible, setDesktopModelsVisible] = useState(false);
  const [desktopPanelVisible, setDesktopPanelVisible] = useState(false);
  const [hasDesktopInteraction, setHasDesktopInteraction] = useState(false);
  const desktopPanelTimerRef = useRef<number | null>(null);
  const desktopModelsTimerRef = useRef<number | null>(null);
  const desktopSwitchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const clearDesktopTimers = () => {
    if (desktopSwitchTimerRef.current !== null) {
      window.clearTimeout(desktopSwitchTimerRef.current);
      desktopSwitchTimerRef.current = null;
    }
    if (desktopPanelTimerRef.current !== null) {
      window.clearTimeout(desktopPanelTimerRef.current);
      desktopPanelTimerRef.current = null;
    }
    if (desktopModelsTimerRef.current !== null) {
      window.clearTimeout(desktopModelsTimerRef.current);
      desktopModelsTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearDesktopTimers();
    };
  }, []);

  const activeItem = useMemo(() => items.find((item) => item.collectionSlug === activeDesktop) ?? items[0], [activeDesktop, items]);
  const activeGlass = glassToneMap[activeItem.collectionSlug] ?? glassToneMap.vozduh;

  const flyInStyle: React.CSSProperties = {
    transitionDuration: `${flyDurationMs}ms`,
    transitionTimingFunction: menuEase,
  };

  const desktopPanelStyle: React.CSSProperties = {
    ...flyInStyle,
    transitionProperty: "transform, opacity, background-color, border-color",
    transitionDuration: `${desktopPanelDurationMs}ms`,
    backgroundColor: activeGlass.panelBg,
    borderColor: activeGlass.panelBorder,
    width: `${panelWidth}px`,
    minWidth: `${panelWidth}px`,
    maxWidth: "min(270px, calc(100vw - 1rem))",
    willChange: "transform, opacity",
  };

  const handleDesktopTabClick = (slug: IzdeliyaCollectionSlug) => {
    if (!isVisible) return;

    const wasOpen = desktopPanelVisible;
    const appearSpeedFactor = 0.65;
    const hidePhaseMs = wasOpen ? Math.round(desktopPanelDurationMs * 0.72 * appearSpeedFactor) : Math.round(120 * appearSpeedFactor);
    const showPanelDelayMs = hidePhaseMs + Math.round(120 * appearSpeedFactor);
    const showModelsDelayMs = showPanelDelayMs + Math.round(140 * appearSpeedFactor);

    clearDesktopTimers();
    setDesktopModelsVisible(false);
    setDesktopPanelVisible(false);

    if (!hasDesktopInteraction) {
      setHasDesktopInteraction(true);
    }

    desktopSwitchTimerRef.current = window.setTimeout(() => {
      setActiveDesktop(slug);
      desktopSwitchTimerRef.current = null;
    }, hidePhaseMs);

    desktopPanelTimerRef.current = window.setTimeout(() => {
      setDesktopPanelVisible(true);
      desktopPanelTimerRef.current = null;
    }, showPanelDelayMs);

    desktopModelsTimerRef.current = window.setTimeout(() => {
      setDesktopModelsVisible(true);
      desktopModelsTimerRef.current = null;
    }, showModelsDelayMs);
  };

  return (
    <>
      <aside
        style={flyInStyle}
        className={[
          "hidden lg:flex fixed left-0 top-[56%] -translate-y-1/2 z-40 items-start gap-2 transition-all max-w-full overflow-x-hidden",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
        ].join(" ")}
      >
        <div aria-label={title} className="flex flex-col gap-[2px]">
          {items.map((item) => {
            const isActive = item.collectionSlug === activeDesktop;
            const tones = desktopToneMap[item.collectionSlug] ?? desktopToneMap.vozduh;

            return (
              <button
                key={item.collectionSlug}
                type="button"
                onClick={() => handleDesktopTabClick(item.collectionSlug)}
                aria-expanded={isActive && desktopPanelVisible}
                aria-controls={`desktop-collection-${item.collectionSlug}`}
                style={flyInStyle}
                className={[
                  "relative overflow-hidden border transition-all duration-300 ease-out",
                  "w-[34px] xl:w-[38px] h-[134px] xl:h-[150px] backdrop-blur-[18px] hover:opacity-100 hover:brightness-110 hover:shadow-[0_0_24px_rgba(216,197,104,0.16)]",
                  isActive
                    ? `w-[34px] xl:w-[38px] shadow-xl opacity-100 ${tones.active}`
                    : `opacity-85 ${tones.base}`,
                ].join(" ")}
              >
                <span className="absolute left-1/2 top-2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 font-display text-[27px] xl:text-[30px] leading-none tracking-[0.01em]">{item.title}</span>
                <span
                  className="absolute left-1/2 bottom-2 -translate-x-1/2 inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/60 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
                >
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
                {isActive && <span className={`absolute left-0 right-0 top-0 h-[2px] ${tones.line}`} aria-hidden />}
              </button>
            );
          })}
        </div>

        <div
          id={`desktop-collection-${activeItem.collectionSlug}`}
          style={desktopPanelStyle}
          className={[
            "border text-white backdrop-blur-sm shadow-xl p-0 transition-all overflow-hidden",
            !hasDesktopInteraction ? "opacity-0 -translate-x-8 pointer-events-none" : "",
            desktopPanelVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none",
          ].join(" ")}
        >
          <div className="p-3">
            <CollectionHeader title={activeItem.title} description={activeItem.subtitle} tone={activeGlass} />

            <div className="my-3 h-px" style={{ backgroundColor: activeGlass.panelBorder }} aria-hidden />

            <div key={activeItem.collectionSlug} className="space-y-2">
              {activeItem.models.length > 0 ? (
                activeItem.models.map((model, index) => (
                  <Link
                    key={model.productSlug}
                    to={buildPath.collectionProduct(activeItem.collectionSlug, model.productSlug)}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.backgroundColor = activeGlass.modelHoverBg;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.backgroundColor = activeGlass.modelBg;
                    }}
                    style={{
                      ...flyInStyle,
                      transitionDelay: desktopModelsVisible ? `${120 + index * 90}ms` : "0ms",
                      backgroundColor: activeGlass.modelBg,
                      borderColor: activeGlass.modelBorder,
                    }}
                    className={[
                      "block border px-3 py-2 transition-all hover:translate-x-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                      desktopModelsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                    ].join(" ")}
                  >
                    <span className="inline-flex items-center gap-2 font-body text-sm text-white">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeGlass.marker }} aria-hidden />
                      {model.title}
                    </span>
                    <span className="block text-xs text-white/70 mt-1 break-words">{model.subtitle}</span>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-white/70 px-1 py-2">{`\u041c\u043e\u0434\u0435\u043b\u0438 \u0441\u043a\u043e\u0440\u043e \u043f\u043e\u044f\u0432\u044f\u0442\u0441\u044f.`}</p>
              )}
            </div>
          </div>
        </div>
      </aside>

      <section className="lg:hidden overflow-x-hidden">
        <div className="border border-white/10 bg-[rgba(22,21,20,0.92)] backdrop-blur-[20px] shadow-[0_0_32px_rgba(0,0,0,0.28)]">
          <p className="px-4 pt-4 pb-2 text-[10px] font-body font-medium tracking-brand-wide uppercase text-white/50">{title}</p>
          <div className="divide-y divide-white/10">
            {items.map((item) => {
              const isActive = item.collectionSlug === activeMobile;
              const mobileGlass = glassToneMap[item.collectionSlug] ?? glassToneMap.vozduh;

              return (
                <div key={item.collectionSlug}>
                  <button
                    type="button"
                    onClick={() => setActiveMobile((prev) => (prev === item.collectionSlug ? null : item.collectionSlug))}
                    style={flyInStyle}
                    className={["w-full px-4 py-4 text-left transition-all", isActive ? "bg-white/[0.06]" : "bg-transparent hover:bg-white/[0.035]"].join(" ")}
                    aria-expanded={isActive}
                    aria-controls={`mobile-collection-${item.collectionSlug}`}
                  >
                    <p className="font-display text-2xl text-white">{item.title}</p>
                    <p className="font-body text-xs text-white/54 mt-1">{item.subtitle}</p>
                  </button>

                  <div
                    id={`mobile-collection-${item.collectionSlug}`}
                    style={flyInStyle}
                    className={["grid transition-all", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 min-w-0">
                        <CollectionHeader title={item.title} description={item.subtitle} tone={mobileGlass} compact />

                        <div className="my-3 h-px" style={{ backgroundColor: mobileGlass.panelBorder }} aria-hidden />

                        <div className="space-y-2">
                          {item.models.length > 0 ? (
                            item.models.map((model, index) => (
                              <Link
                                key={model.productSlug}
                                to={buildPath.collectionProduct(item.collectionSlug, model.productSlug)}
                                onMouseEnter={(event) => {
                                  event.currentTarget.style.backgroundColor = mobileGlass.modelHoverBg;
                                }}
                                onMouseLeave={(event) => {
                                  event.currentTarget.style.backgroundColor = mobileGlass.modelBg;
                                }}
                                style={{
                                  ...flyInStyle,
                                  transitionDelay: isActive ? `${100 + index * 80}ms` : "0ms",
                                  backgroundColor: mobileGlass.modelBg,
                                  borderColor: mobileGlass.modelBorder,
                                }}
                                className={["block w-full min-w-0 border px-3 py-2 text-sm transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]", isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"].join(" ")}
                              >
                                <span className="inline-flex items-center gap-2 font-medium text-white">
                                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mobileGlass.marker }} aria-hidden />
                                  {model.title}
                                </span>
                                <span className="block text-xs text-white/70 mt-1 break-words">{model.subtitle}</span>
                              </Link>
                            ))
                          ) : (
                            <p className="text-xs text-white/54 px-1">{`\u041c\u043e\u0434\u0435\u043b\u0438 \u0441\u043a\u043e\u0440\u043e \u043f\u043e\u044f\u0432\u044f\u0442\u0441\u044f.`}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CollectionsPanel;

