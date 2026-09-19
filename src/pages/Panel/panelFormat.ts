import { formatPrice } from "@/utils/constants";

import type { PanelBadgeVariant } from "./PanelBadge/PanelBadge";

export const cop = (value: number) => `$ ${formatPrice(value)}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", {
    year: "numeric",
    day: "numeric",
    month: "numeric",
  });

export interface NotificationInfo {
  label: string;
  variant: PanelBadgeVariant;
}

/**
 * `email_status`/`whatsapp_status` del backend traen texto interno para
 * depurar ("fallo: internal error; reference = ..."), no para mostrárselo al
 * negocio. Esto lo traduce a algo legible.
 */
export const notificationInfo = (status: string): NotificationInfo => {
  if (status.startsWith("fallo"))
    return { label: "No llegó", variant: "block" };
  if (status === "enviado") return { label: "Enviado", variant: "done" };
  if (status === "pendiente") return { label: "Pendiente", variant: "wait" };
  if (status === "no_aplica") return { label: "No aplica", variant: "muted" };
  return { label: status, variant: "muted" };
};
