import { formDeliveryMode, formEndpoints } from "@/config/form-endpoints";
import type { FormDeliveryPayload, FormDeliveryResult } from "@/types/form-delivery";

const MOCK_DELAY_MS = 700;

export async function deliverForm(payload: FormDeliveryPayload): Promise<FormDeliveryResult> {
  if (formDeliveryMode === "mock") {
    await wait(MOCK_DELAY_MS);
    return {
      ok: true,
      status: 200,
      message: "Mock submit accepted",
    };
  }

  const endpoint = formEndpoints[payload.formId];
  if (!endpoint) {
    return {
      ok: false,
      status: 503,
      message: "Form endpoint is not configured",
      externalDependency: true,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.data),
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: `Form delivery failed with status ${response.status}`,
        externalDependency: response.status >= 500,
      };
    }

    return {
      ok: true,
      status: response.status,
      message: "Form delivered",
    };
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Network error during form delivery",
      externalDependency: true,
    };
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
