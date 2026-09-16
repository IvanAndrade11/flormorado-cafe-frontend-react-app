import { ICoffeeProduct } from "@/types/configCat";
import {
  IOrderConfirmation,
  IOrderPayload,
  OrderFailure,
  SubmitOrderResult,
} from "@/types/orders";
import { BOGOTA_NEARBY_CITIES } from "@/utils/constants/common/forms";
import {
  computeCartTotals,
  getCatalogProductId,
  getGrindingLabel,
  parseCopPrice,
} from "@/utils/constants/store/cart";

const PRODUCTION_ORDERS_API_URL =
  "https://flormorado-cafe-backend-orders.flormoradocafecol.workers.dev";

// En desarrollo `.env.development` lo apunta al `wrangler dev` local. Si falta
// la variable se usa producción: la URL no es secreta y un build sin ella no
// debería dejar el checkout sin a dónde enviar.
export const ORDERS_API_URL =
  process.env.ORDERS_API_URL || PRODUCTION_ORDERS_API_URL;

type FormValues = Record<string, string | boolean>;

const text = (form: FormValues, key: string) => {
  const value = form[key];
  return typeof value === "string" ? value.trim() : "";
};

const checked = (form: FormValues, key: string) => form[key] === true;

/** UUID v4. `randomUUID` no existe en navegadores anteriores a Safari 15.4. */
export const createIdempotencyKey = (): string => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10).join(""),
  ].join("-");
};

/**
 * Traduce el estado plano del checkout y el carrito al contrato del backend.
 * Cada línea del carrito ya es un par único producto + molienda, porque el
 * configurador acumula cantidades en vez de repetir líneas.
 */
export const buildOrderPayload = (
  form: FormValues,
  cart: ICoffeeProduct[],
  idempotencyKey: string,
): IOrderPayload => {
  const identity = {
    documentType: text(form, "documentType"),
    documentNumber: text(form, "documentNumber"),
    notifyByWhatsApp: checked(form, "notifyByWhatsApp"),
  };

  const additionalInfo = text(form, "additionalInfo");

  return {
    idempotencyKey,
    contact: {
      name: text(form, "name"),
      surname: text(form, "surname"),
      email: text(form, "email"),
      phone: text(form, "phone"),
      whatsappOptIn: checked(form, "whtsppOptIn"),
    },
    delivery: {
      city: text(form, "city"),
      neighborhood: text(form, "neighborhood"),
      address: text(form, "address"),
      ...(additionalInfo ? { additionalInfo } : {}),
    },
    // La llave BRE-B solo viaja si ese es el método: el estado del checkout
    // puede conservarla de un intento anterior en el que el cliente la escribió
    // y luego cambió a contraentrega.
    payment:
      text(form, "paymentMethod") === "bre_b"
        ? { method: "bre_b", breKey: text(form, "breKey"), ...identity }
        : { method: "cash_on_delivery", ...identity },
    items: cart.map((item) => ({
      productId: getCatalogProductId(item),
      quantity: item.quantity || 1,
      grinding: getGrindingLabel(item.grinding),
      unitPrice: parseCopPrice(item.price),
    })),
    declaredTotal: computeCartTotals(cart).total,
  };
};

const cityLabel = (city: string) =>
  BOGOTA_NEARBY_CITIES.find((option) => option.value === city)?.label ?? city;

export const buildConfirmation = (
  payload: IOrderPayload,
  cart: ICoffeeProduct[],
  orderId: string,
  total: number,
): IOrderConfirmation => {
  const { subtotal, shipping } = computeCartTotals(cart);
  const { payment, delivery } = payload;

  return {
    orderId,
    email: payload.contact.email,
    paymentMethod: payment.method,
    ...(payment.method === "bre_b" ? { breKey: payment.breKey } : {}),
    items: cart.map((item) => ({
      key: item.id,
      name: item.name,
      grinding: getGrindingLabel(item.grinding),
      quantity: item.quantity || 1,
      lineTotal: parseCopPrice(item.price) * (item.quantity || 1),
    })),
    subtotal,
    shipping,
    total,
    delivery: {
      address: delivery.address,
      neighborhood: delivery.neighborhood,
      city: cityLabel(delivery.city),
      ...(delivery.additionalInfo
        ? { additionalInfo: delivery.additionalInfo }
        : {}),
    },
  };
};

const RETRY_DELAYS_MS = [800, 2000];

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface SubmitOrderOptions {
  fetchImpl?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  timeoutMs?: number;
  baseUrl?: string;
}

type Attempt = SubmitOrderResult | "retry";

const attemptOnce = async (
  payload: IOrderPayload,
  fetchImpl: typeof fetch,
  baseUrl: string,
  timeoutMs: number,
): Promise<Attempt> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(`${baseUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 200 || response.status === 201) {
      const body = (await response.json()) as {
        orderId: string;
        total: number;
        yaExistia?: boolean;
      };
      return {
        kind: "created",
        orderId: body.orderId,
        total: body.total,
        alreadyExisted: body.yaExistia === true,
      };
    }

    if (response.status === 409) {
      const body = (await response.json()) as { fallas?: OrderFailure[] };
      return { kind: "stale_cart", failures: body.fallas ?? [] };
    }

    if (response.status === 400) return { kind: "invalid" };

    // Solo se reintentan fallas que pueden ser pasajeras. Un 4xx no va a
    // cambiar por insistir.
    if (response.status === 429 || response.status >= 500) return "retry";

    return { kind: "unavailable" };
  } catch {
    // Red caída, timeout o respuesta ilegible. Reintentar es seguro: la llave
    // de idempotencia hace que el backend devuelva el pedido si ya lo creó.
    return "retry";
  } finally {
    clearTimeout(timer);
  }
};

export const submitOrder = async (
  payload: IOrderPayload,
  {
    fetchImpl = globalThis.fetch,
    sleep = wait,
    timeoutMs = 15000,
    baseUrl = ORDERS_API_URL,
  }: SubmitOrderOptions = {},
): Promise<SubmitOrderResult> => {
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    const outcome = await attemptOnce(payload, fetchImpl, baseUrl, timeoutMs);
    if (outcome !== "retry") return outcome;

    if (attempt < RETRY_DELAYS_MS.length) await sleep(RETRY_DELAYS_MS[attempt]);
  }

  return { kind: "unavailable" };
};
