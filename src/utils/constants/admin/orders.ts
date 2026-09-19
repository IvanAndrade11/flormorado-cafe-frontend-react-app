// Duplica ORDER_FLOW y nextStatuses del backend
// (flormorado-cafe-backend-orders, src/utils/constants/orders.ts): el backend
// es quien de verdad valida la transición y la rechaza con 409 si no aplica,
// esto solo decide qué botones ofrecer en el panel.

export const ORDER_STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  pago_confirmado: "Pago confirmado",
  en_preparacion: "En preparación",
  por_entregar: "Por entregar",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

const CANCELLED = "cancelado";

const ORDER_FLOW: Record<string, string[]> = {
  cash_on_delivery: ["nuevo", "en_preparacion", "por_entregar", "entregado"],
  bre_b: [
    "nuevo",
    "pago_confirmado",
    "en_preparacion",
    "por_entregar",
    "entregado",
  ],
};

export const nextOrderStatuses = (
  paymentMethod: string,
  current: string,
): string[] => {
  if (current === CANCELLED) return [];

  const flow = ORDER_FLOW[paymentMethod] ?? [];
  const index = flow.indexOf(current);
  if (index === -1) return [CANCELLED];

  const forward = index < flow.length - 1 ? [flow[index + 1]] : [];
  return [...forward, CANCELLED];
};

export type OrderStatusVariant = "plum" | "wait" | "done" | "block";

/** Con qué color pintar el estado: nuevo/plum, en curso/wait, entregado/done, cancelado/block. */
export const orderStatusVariant = (status: string): OrderStatusVariant => {
  if (status === "entregado") return "done";
  if (status === "cancelado") return "block";
  if (status === "nuevo") return "plum";
  return "wait";
};

/**
 * El mismo tono informativo de "Qué sigue" en el correo de confirmación
 * (src/templates/orderConfirmation.ts del backend): decirle al administrador
 * qué falta, no solo cuál es el estado actual.
 */
export const nextStepHint = (
  paymentMethod: string,
  status: string,
): string | null => {
  if (status === "nuevo" && paymentMethod === "bre_b") {
    return 'Verifica que la transferencia a la llave BRE-B haya llegado antes de marcar "Pago confirmado".';
  }
  if (status === "nuevo" || status === "pago_confirmado") {
    return 'Cuando lo tengas listo para salir, márcalo "En preparación".';
  }
  if (status === "en_preparacion") {
    return 'Cuando esté empacado, márcalo "Por entregar".';
  }
  if (status === "por_entregar") {
    return 'Márcalo "Entregado" en cuanto el cliente lo reciba.';
  }
  return null;
};
