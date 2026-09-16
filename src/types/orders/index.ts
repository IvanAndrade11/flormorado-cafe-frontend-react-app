// Contrato de POST /orders del backend (flormorado-cafe-backend-orders,
// src/schemas/order.ts). Si el backend cambia su esquema, esto cambia con él.

export type PaymentMethod = "cash_on_delivery" | "bre_b";

export interface IOrderItemPayload {
  productId: string;
  quantity: number;
  grinding: string;
  // El precio que el cliente vio. El backend no cobra con él: lo compara contra
  // el catálogo para detectar un carrito con precios viejos.
  unitPrice: number;
}

interface IPaymentIdentity {
  documentType: string;
  documentNumber: string;
  notifyByWhatsApp: boolean;
}

export type IOrderPaymentPayload =
  | ({ method: "cash_on_delivery" } & IPaymentIdentity)
  | ({ method: "bre_b"; breKey: string } & IPaymentIdentity);

export interface IOrderPayload {
  idempotencyKey: string;
  contact: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    whatsappOptIn: boolean;
  };
  delivery: {
    city: string;
    neighborhood: string;
    address: string;
    additionalInfo?: string;
  };
  payment: IOrderPaymentPayload;
  items: IOrderItemPayload[];
  declaredTotal: number;
}

export type OrderFailure =
  | { code: "producto_inexistente"; productId: string }
  | { code: "producto_agotado"; productId: string }
  | { code: "precio_desactualizado"; productId: string; actual: number }
  | { code: "total_no_coincide"; actual: number };

export type SubmitOrderResult =
  | { kind: "created"; orderId: string; total: number; alreadyExisted: boolean }
  | { kind: "stale_cart"; failures: OrderFailure[] }
  | { kind: "invalid" }
  | { kind: "unavailable" };

/** Lo que muestra la pantalla de confirmación, capturado antes de vaciar el carrito. */
export interface IOrderConfirmation {
  orderId: string;
  email: string;
  paymentMethod: PaymentMethod;
  breKey?: string;
  items: {
    key: string;
    name: string;
    grinding: string;
    quantity: number;
    lineTotal: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  delivery: {
    address: string;
    neighborhood: string;
    city: string;
    additionalInfo?: string;
  };
}
