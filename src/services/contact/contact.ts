import { IContactPayload, SubmitContactResult } from "@/types/contact";
import { ORDERS_API_URL } from "@/services/orders";

const RETRY_DELAYS_MS = [800, 2000];

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface SubmitContactOptions {
  fetchImpl?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  timeoutMs?: number;
  baseUrl?: string;
  /** Token de Turnstile; se reenvía igual en cada reintento (ver `submitOrder`). */
  turnstileToken?: string;
}

type Attempt = SubmitContactResult | "retry";

const attemptOnce = async (
  payload: IContactPayload,
  fetchImpl: typeof fetch,
  baseUrl: string,
  timeoutMs: number,
  turnstileToken?: string,
): Promise<Attempt> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(`${baseUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(turnstileToken ? { "X-Turnstile-Token": turnstileToken } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 200 || response.status === 201) {
      return { kind: "sent" };
    }

    if (response.status === 400) return { kind: "invalid" };

    if (response.status === 403) return { kind: "verification_failed" };

    // Solo se reintentan fallas que pueden ser pasajeras. Un 4xx no va a
    // cambiar por insistir.
    if (response.status === 429 || response.status >= 500) return "retry";

    return { kind: "unavailable" };
  } catch {
    // Red caída, timeout o respuesta ilegible: puede ser pasajero.
    return "retry";
  } finally {
    clearTimeout(timer);
  }
};

export const submitContact = async (
  payload: IContactPayload,
  {
    fetchImpl = globalThis.fetch,
    sleep = wait,
    timeoutMs = 15000,
    baseUrl = ORDERS_API_URL,
    turnstileToken,
  }: SubmitContactOptions = {},
): Promise<SubmitContactResult> => {
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    const outcome = await attemptOnce(
      payload,
      fetchImpl,
      baseUrl,
      timeoutMs,
      turnstileToken,
    );
    if (outcome !== "retry") return outcome;

    if (attempt < RETRY_DELAYS_MS.length) await sleep(RETRY_DELAYS_MS[attempt]);
  }

  return { kind: "unavailable" };
};
