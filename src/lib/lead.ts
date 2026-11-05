export type LeadPayload = Record<string, string>;

const LEADS_QUEUE_KEY = "forma_sveta_leads_queue";

/**
 * Temporary frontend transport for leads until CRM/backend is connected.
 * Stores submissions in localStorage queue so data is not lost in browser session.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  try {
    const raw = localStorage.getItem(LEADS_QUEUE_KEY);
    const queue: LeadPayload[] = raw ? JSON.parse(raw) : [];
    queue.push(payload);
    localStorage.setItem(LEADS_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Ignore storage errors in temporary mode.
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
}
