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
