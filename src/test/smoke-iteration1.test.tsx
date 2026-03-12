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
    for (const path of ["/", "/collections", "/contacts", "/request-project", "/company", "/products", "/downloads"]) {
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
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").toContain("/products");

    await renderApp("/about");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").toContain("/company");

    await renderApp("/for-architects");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").toContain("/downloads");
  });

  it("has header/footer primary links and CTA", async () => {
    await renderApp("/");
    expect(screen.getAllByRole("link", { name: "Продукты" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "О компании" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Запросить проект/i }).length).toBeGreaterThan(0);
  });

  it("has forms on contacts and request-project", async () => {
    await renderApp("/contacts");
    expect(screen.getByRole("button", { name: /Отправить/i })).toBeTruthy();
    expect(screen.getByRole("checkbox")).toBeTruthy();

    await renderApp("/request-project");
    expect(screen.getByRole("button", { name: /Далее/i })).toBeTruthy();
  });

  it("quick desktop/mobile indicators on home and collections", async () => {
    await renderApp("/");
    expect(document.querySelector(".lg\\:hidden")).toBeTruthy();

    await renderApp("/collections");
    expect(document.querySelector(".md\\:grid-cols-3")).toBeTruthy();
  });
});
