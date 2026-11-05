import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { FormDeliveryPayload, FormDeliveryResult } from "@/types/form-delivery";

const deliveryEnv = vi.hoisted(() => ({
  mode: "mock" as "mock" | "live",
  prodMock: false,
  endpoints: {} as Record<string, string>,
}));

const trackEvent = vi.hoisted(() => vi.fn());

const deliveryLog = vi.hoisted(() => ({
  calls: [] as Array<{ payload: FormDeliveryPayload; result: FormDeliveryResult }>,
}));

vi.mock("@/config/form-endpoints", () => ({
  get formDeliveryMode() {
    return deliveryEnv.mode;
  },
  get formEndpoints() {
    return deliveryEnv.endpoints;
  },
  isProductionMockMode: () => deliveryEnv.prodMock,
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent,
  trackClick: vi.fn(),
}));

vi.mock("@/lib/form-delivery", async () => {
  const actual = await vi.importActual<typeof import("@/lib/form-delivery")>("@/lib/form-delivery");
  return {
    deliverForm: async (payload: FormDeliveryPayload) => {
      const result = await actual.deliverForm(payload);
      deliveryLog.calls.push({ payload, result });
      return result;
    },
  };
});

import RequestProjectForm from "@/components/forms/RequestProjectForm";
import CatalogRequestForm from "@/components/forms/CatalogRequestForm";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { deliverForm } from "@/lib/form-delivery";

const renderForm = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("request project submit", () => {
  beforeEach(() => {
    deliveryEnv.mode = "mock";
    deliveryEnv.prodMock = false;
    deliveryEnv.endpoints = {};
    deliveryLog.calls = [];
    trackEvent.mockClear();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("delivers a filled request with empty honeypot and tracks form_submit_success", async () => {
    renderForm(<RequestProjectForm />);

    fireEvent.change(screen.getByPlaceholderText("Как вас зовут"), { target: { value: "Анна" } });
    fireEvent.change(screen.getByPlaceholderText("+7 (___) ___-__-__"), { target: { value: "+7 (900) 000-00-00" } });
    fireEvent.click(screen.getByRole("button", { name: "Далее →" }));

    fireEvent.change(screen.getByPlaceholderText("Москва"), { target: { value: "Казань" } });

    const honeypot = document.querySelector('input[name="website_url"]') as HTMLInputElement | null;
    expect(honeypot).toBeTruthy();
    expect(honeypot?.value).toBe("");

    fireEvent.click(screen.getByRole("checkbox", { name: /согласие на обработку/i }));
    fireEvent.click(screen.getByRole("button", { name: "Отправить вводные" }));

    expect(await screen.findByRole("heading", { name: "Заявка отправлена" }, { timeout: 3000 })).toBeTruthy();

    const call = deliveryLog.calls.at(-1);
    expect(call?.payload.formId).toBe("request_project");
    expect(call?.payload.data.website_url ?? "").toBe("");
    expect(call?.payload.data.consent).toBe("true");
    expect(call?.payload.data.name).toBe("Анна");
    expect(call?.payload.data.city).toBe("Казань");
    expect(call?.payload.data._form).toBe("request_project");
    expect(call?.payload.data._source).toEqual(expect.any(String));
    expect(call?.payload.data._timestamp).toEqual(expect.any(String));
    expect(call?.result).toMatchObject({ ok: true, status: 200 });
    expect(trackEvent).toHaveBeenCalledWith("form_submit_success", { form: "request_project" });
  });

  it("blocks submit when production mock mode is active", async () => {
    deliveryEnv.mode = "mock";
    deliveryEnv.prodMock = true;

    renderForm(<RequestProjectForm />);

    fireEvent.change(screen.getByPlaceholderText("Как вас зовут"), { target: { value: "Анна" } });
    fireEvent.change(screen.getByPlaceholderText("+7 (___) ___-__-__"), { target: { value: "+7 (900) 000-00-00" } });
    fireEvent.click(screen.getByRole("button", { name: "Далее →" }));
    fireEvent.click(screen.getByRole("checkbox", { name: /согласие на обработку/i }));
    fireEvent.click(screen.getByRole("button", { name: "Отправить вводные" }));

    expect(await screen.findByText("Mock form delivery is disabled in production")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Заявка отправлена" })).toBeNull();

    const call = deliveryLog.calls.at(-1);
    expect(call?.payload.formId).toBe("request_project");
    expect(call?.payload.data.website_url ?? "").toBe("");
    expect(call?.result).toMatchObject({ ok: false, status: 503 });
    expect(trackEvent).not.toHaveBeenCalledWith("form_submit_success", expect.anything());
    expect(trackEvent).toHaveBeenCalledWith("form_submit_fail", { form: "request_project" });
  });

  it("returns 503 for live mode when the endpoint is empty", async () => {
    deliveryEnv.mode = "live";
    deliveryEnv.prodMock = false;
    deliveryEnv.endpoints = {};

    const result = await deliverForm({
      formId: "request_project",
      data: { _form: "request_project", consent: "true" },
    });

    expect(result).toMatchObject({
      ok: false,
      status: 503,
      message: "Form endpoint is not configured",
    });
  });
});

describe("catalog and consultation delivery", () => {
  beforeEach(() => {
    deliveryEnv.mode = "mock";
    deliveryEnv.prodMock = false;
    deliveryEnv.endpoints = {};
    deliveryLog.calls = [];
    trackEvent.mockClear();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("sends the catalog request through deliverForm", async () => {
    renderForm(<CatalogRequestForm />);

    fireEvent.change(screen.getByPlaceholderText("Как вас зовут"), { target: { value: "Илья" } });
    fireEvent.change(screen.getByPlaceholderText("+7 (___) ___-__-__"), { target: { value: "+7 (900) 000-00-00" } });
    fireEvent.change(screen.getByPlaceholderText("email@example.com"), { target: { value: "lead@example.com" } });

    const honeypot = document.querySelector('input[name="website_url"]') as HTMLInputElement | null;
    expect(honeypot?.value ?? "").toBe("");

    fireEvent.click(screen.getByRole("checkbox", { name: /согласие на обработку/i }));
    fireEvent.click(screen.getByRole("button", { name: "Получить каталог" }));

    expect(await screen.findByRole("heading", { name: "Заявка отправлена" }, { timeout: 3000 })).toBeTruthy();
    expect(deliveryLog.calls.at(-1)?.payload.formId).toBe("request_catalog");
    expect(deliveryLog.calls.at(-1)?.result).toMatchObject({ ok: true, status: 200 });
    expect(trackEvent).toHaveBeenCalledWith("form_submit_success", { form: "request_catalog" });
  });

  it("sends the consultation request through deliverForm", async () => {
    renderForm(<ConsultationForm />);

    fireEvent.change(screen.getByPlaceholderText("Как вас зовут"), { target: { value: "Мария" } });
    fireEvent.change(screen.getByPlaceholderText("+7 (___) ___-__-__"), { target: { value: "+7 (900) 000-00-00" } });

    const honeypot = document.querySelector('input[name="website_url"]') as HTMLInputElement | null;
    expect(honeypot?.value ?? "").toBe("");

    fireEvent.click(screen.getByRole("checkbox", { name: /согласие на обработку/i }));
    fireEvent.click(screen.getByRole("button", { name: "Получить консультацию" }));

    expect(await screen.findByRole("heading", { name: "Заявка отправлена" }, { timeout: 3000 })).toBeTruthy();
    expect(deliveryLog.calls.at(-1)?.payload.formId).toBe("request_consultation");
    expect(deliveryLog.calls.at(-1)?.result).toMatchObject({ ok: true, status: 200 });
    expect(trackEvent).toHaveBeenCalledWith("form_submit_success", { form: "request_consultation" });
  });
});
