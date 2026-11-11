// Contrato de POST /contact del backend de pedidos
// (flormorado-cafe-backend-orders, src/schemas/contact.ts). Si el backend
// cambia su esquema, esto cambia con él.

export interface IContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  // Igual que en un pedido: el formulario recoge datos personales, así que
  // queda registrado qué versión de la política estaba publicada.
  privacyPolicyVersion: string;
}

export type SubmitContactResult =
  | { kind: "sent" }
  | { kind: "invalid" }
  // Turnstile no pudo confirmar que quien envía es una persona.
  | { kind: "verification_failed" }
  | { kind: "unavailable" };
