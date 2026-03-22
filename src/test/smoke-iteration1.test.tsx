import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import App from "@/App";

const setPath = (path: string) => {
  window.history.pushState({}, "", path);
};

const renderApp = async (path: string) => {
  cleanup();
  setPath(path);
  render(<App />);
  await screen.findAllByRole("main");
};

describe("iteration1 smoke routes", () => {
  beforeEach(() => {
    window.scrollTo = () => undefined;
    document.head.querySelector('link[rel="canonical"]')?.remove();
  });

  it("renders core routes", async () => {
    for (const path of ["/", "/izdeliya", "/kontakty", "/request-project", "/company", "/skachat", "/proekty", "/novosti", "/voprosy", "/komplekty"]) {
      await renderApp(path);
      expect(document.querySelector("main")).toBeTruthy();
    }
  });

  it("renders legacy aliases", async () => {
    for (const path of ["/about", "/catalog", "/for-architects"]) {
      await renderApp(path);
      expect(document.querySelector("main")).toBeTruthy();
    }
  });

  it("sets canonical tags for alias paths", async () => {
    await renderApp("/catalog");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").toContain("/izdeliya");

    await renderApp("/about");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").toContain("/company");

    await renderApp("/for-architects");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").toContain("/skachat");
  });

  it("has header/footer primary links and CTA", async () => {
    await renderApp("/");
    expect(screen.getAllByRole("link", { name: "Изделия" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "О компании" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Запросить проект|Обсудить проект/i }).length).toBeGreaterThan(0);
  });

  it("has forms on contacts and request-project", async () => {
    await renderApp("/kontakty");
    expect(screen.getByRole("button", { name: /Отправить/i })).toBeTruthy();
    expect(screen.getByRole("checkbox")).toBeTruthy();

    await renderApp("/request-project");
    expect(screen.getByRole("button", { name: /Далее/i })).toBeTruthy();
  });

  it("quick desktop/mobile indicators on home and collections", async () => {
    await renderApp("/");
    expect(document.querySelector(".xl\\:hidden") || document.querySelector(".lg\\:hidden")).toBeTruthy();

    await renderApp("/izdeliya");
    expect(screen.getAllByRole("button", { name: /Воздух/i }).length).toBeGreaterThan(0);
    expect(document.querySelector('[aria-controls="desktop-collection-vozduh"], [aria-controls="mobile-collection-vozduh"]')).toBeTruthy();
  });
});
