// Contrato de POST /contact del backend de pedidos. El endpoint todavía no
// existe ahí (flormorado-cafe-backend-orders) — queda por implementar.

export interface IContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type SubmitContactResult =
  | { kind: "sent" }
  | { kind: "invalid" }
  | { kind: "unavailable" };
