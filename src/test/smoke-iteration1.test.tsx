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
    document.head.querySelector('meta[name="robots"]')?.remove();
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

  it("does not show legacy bollards on the home page", async () => {
    await renderApp("/");

    expect(screen.queryByText("Bollard 400")).toBeNull();
    expect(screen.queryByText("Bollard 600 Cast Stone")).toBeNull();
    expect(screen.queryByText("Bollard 600 Natural Stone")).toBeNull();
    expect(screen.queryByText("Bollard 800")).toBeNull();
  });

  it("replaces the old flagship block with the vozduh collection spotlight", async () => {
    await renderApp("/");

    expect(screen.getAllByText("Воздух").length).toBeGreaterThan(0);
    expect(screen.queryByText(/Боллард STŌN/i)).toBeNull();
    expect(screen.getAllByRole("link", { name: /Открыть коллекцию/i }).length).toBeGreaterThan(0);
  });

  it("keeps legacy product routes as non-indexable alias fallbacks", async () => {
    await renderApp("/products/bollard-600-natural-stone");

    expect(screen.getByText(/Изделие доступно в основном каталоге/i)).toBeTruthy();
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, nofollow");
  });
});
