import { ORDERS_API_URL } from "@/services/orders";
import {
  ContactMessageStatus,
  IAdminContactMessage,
  IAdminCustomer,
  IAdminOrderDetail,
  IAdminOrderListItem,
} from "@/types/admin";

// Un solo usuario (el negocio), así que el panel no maneja sesiones ni
// tokens con expiración: la clave misma es lo que se manda como
// `Authorization: Bearer <clave>` en cada llamada. Vive en `sessionStorage`
// para que se borre sola al cerrar la pestaña, nunca en `localStorage`.
const STORAGE_KEY = "fmc-panel-key";

const readStoredKey = (): string | null => {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStoredKey = (key: string): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, key);
  } catch {
    // Almacenamiento bloqueado (privado/incógnito): el panel funciona igual,
    // solo vuelve a pedir la clave en la próxima recarga.
  }
};

export const clearStoredAdminKey = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
};

export const hasStoredAdminKey = (): boolean => readStoredKey() !== null;

export class AdminUnauthorizedError extends Error {}

interface RequestOptions {
  method?: "GET" | "PATCH";
  body?: unknown;
  /** Clave a probar en vez de la guardada — solo la usa `loginToPanel`. */
  key?: string;
}

const request = async <T>(
  path: string,
  { method = "GET", body, key }: RequestOptions = {},
): Promise<T> => {
  const token = key ?? readStoredKey();
  if (!token) throw new AdminUnauthorizedError("sin clave guardada");

  const response = await fetch(`${ORDERS_API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (response.status === 401) {
    clearStoredAdminKey();
    throw new AdminUnauthorizedError("clave inválida");
  }

  if (!response.ok) {
    throw new Error(`admin ${response.status}`);
  }

  return (await response.json()) as T;
};

/** Prueba la clave contra el backend y, si es válida, la guarda para el resto de la pestaña. */
export const loginToPanel = async (key: string): Promise<boolean> => {
  try {
    await request("/admin/orders?limit=1", { key });
    writeStoredKey(key);
    return true;
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) return false;
    throw error;
  }
};

export const logoutOfPanel = (): void => clearStoredAdminKey();

export interface FetchOrdersParams {
  q?: string;
  status?: string;
}

export const fetchOrders = (params: FetchOrdersParams = {}) => {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.status) search.set("status", params.status);
  const qs = search.toString();

  return request<{ pedidos: IAdminOrderListItem[]; total: number }>(
    `/admin/orders${qs ? `?${qs}` : ""}`,
  );
};

export const fetchOrderDetail = (id: string) =>
  request<IAdminOrderDetail>(`/admin/orders/${encodeURIComponent(id)}`);

export const updateOrderStatus = (id: string, status: string) =>
  request<{ ok: true }>(`/admin/orders/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: { status },
  });

export const fetchCustomers = () =>
  request<{ clientes: IAdminCustomer[] }>("/admin/customers");

export const optOutCustomer = (id: number) =>
  request<{ ok: true }>(`/admin/customers/${id}/opt-out`, { method: "PATCH" });

export const fetchContactMessages = () =>
  request<{ mensajes: IAdminContactMessage[] }>("/admin/contact-messages");

export const updateContactMessageStatus = (
  id: number,
  status: ContactMessageStatus,
) =>
  request<{ ok: true }>(`/admin/contact-messages/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
