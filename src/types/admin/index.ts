// Contrato de /admin/* del backend de pedidos (flormorado-cafe-backend-orders,
// src/routes/admin*.ts). Cada llamada necesita `Authorization: Bearer <clave>`.

export interface IAdminOrderListItem {
  id: string;
  created_at: string;
  customer_name: string;
  customer_surname: string;
  city: string;
  total: number;
  payment_method: string;
  status: string;
  // Opcionales: el backend en producción puede ser anterior a FMC-0021 y no
  // mandarlos todavía.
  email_status?: string;
  whatsapp_status?: string;
}

export interface IAdminOrderItem {
  id: number;
  order_id: string;
  product_id: string;
  name: string;
  brand: string | null;
  grinding: string | null;
  size: string | null;
  unit_price: number;
  quantity: number;
}

export interface IAdminOrderStatusHistoryEntry {
  id: number;
  order_id: string;
  from_status: string;
  to_status: string;
  changed_at: string;
}

export interface IAdminOrder {
  id: string;
  created_at: string;
  status: string;
  customer_name: string;
  customer_surname: string;
  email: string;
  phone: string;
  whatsapp_opt_in: number;
  notify_whatsapp: number;
  city: string;
  neighborhood: string;
  address: string;
  additional_info: string | null;
  document_type: string;
  document_number: string;
  payment_method: string;
  bre_key: string | null;
  subtotal: number;
  shipping: number;
  total: number;
  email_status: string;
  whatsapp_status: string;
  prices_verified: number;
}

export interface IAdminOrderDetail {
  order: IAdminOrder;
  items: IAdminOrderItem[];
  history: IAdminOrderStatusHistoryEntry[];
}

export interface IAdminCustomer {
  id: number;
  phone: string;
  name: string;
  surname: string;
  email: string;
  document_type: string;
  document_number: string;
  city: string;
  whatsapp_marketing: number;
  marketing_updated_at: string;
  created_at: string;
  updated_at: string;
  pedidos: number;
  total_comprado: number;
}

/** Un pedido del historial del cliente, con lo que respondió en la casilla de novedades. */
export interface IAdminCustomerOrder {
  id: string;
  created_at: string;
  status: string;
  payment_method: string;
  total: number;
  whatsapp_opt_in: number;
  marketing_consent_version: string | null;
}

export interface IAdminCustomerDetail {
  cliente: IAdminCustomer;
  historial: IAdminCustomerOrder[];
}

export type ContactMessageStatus = "nuevo" | "atendido";

export interface IAdminContactMessage {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  email_status: string;
  status: ContactMessageStatus;
}
