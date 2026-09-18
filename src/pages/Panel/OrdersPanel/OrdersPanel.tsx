import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner, Table } from "react-bootstrap";

import { AdminUnauthorizedError, fetchOrders } from "@/services/admin";
import { IAdminOrderListItem } from "@/types/admin";
import { formatPrice, ORDER_STATUS_LABELS } from "@/utils/constants";

import { OrderDetail } from "./OrderDetail/OrderDetail";

interface OrdersPanelProps {
  onUnauthorized: () => void;
}

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "Todos los estados" },
  { value: "nuevo", label: "Nuevo" },
  { value: "pago_confirmado", label: "Pago confirmado" },
  { value: "en_preparacion", label: "En preparación" },
  { value: "por_entregar", label: "Por entregar" },
  { value: "entregado", label: "Entregado" },
  { value: "cancelado", label: "Cancelado" },
];

const cop = (value: number) => `$ ${formatPrice(value)}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

export const OrdersPanel: React.FC<OrdersPanelProps> = ({ onUnauthorized }) => {
  const [orders, setOrders] = useState<IAdminOrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(
    async (params: { q?: string; status?: string } = {}) => {
      setLoading(true);
      setLoadError(false);
      try {
        const { pedidos, total: count } = await fetchOrders(params);
        setOrders(pedidos);
        setTotal(count);
      } catch (error) {
        if (error instanceof AdminUnauthorizedError) {
          onUnauthorized();
          return;
        }
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized],
  );

  // Solo al montar: la búsqueda y el filtro se disparan al enviar el
  // formulario, no en cada tecla, para no golpear el backend en cada cambio.
  // `load` fija estado apenas se invoca, así que se difiere a un microtask en
  // vez de llamarlo directo: react-hooks/set-state-in-effect solo permite
  // fijar estado en un callback, nunca de forma síncrona en el cuerpo del
  // efecto.
  useEffect(() => {
    void Promise.resolve().then(() => load());
  }, [load]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    load({ q: q.trim() || undefined, status: status || undefined });
  };

  const handleStatusChanged = () => {
    load({ q: q.trim() || undefined, status: status || undefined });
  };

  return (
    <div className="fmc-panel__section">
      <Form className="fmc-panel__filters" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Buscar por número de pedido"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        <Button type="submit" variant="outline-secondary">
          Buscar
        </Button>
      </Form>

      {loading && (
        <div className="fmc-panel__loading">
          <Spinner animation="border" size="sm" className="me-2" />
          Cargando pedidos…
        </div>
      )}

      {!loading && loadError && (
        <Alert variant="danger" role="alert">
          No se pudieron cargar los pedidos. Intenta de nuevo.
        </Alert>
      )}

      {!loading && !loadError && orders.length === 0 && (
        <Alert variant="secondary" role="status">
          No hay pedidos con ese filtro.
        </Alert>
      )}

      {!loading && !loadError && orders.length > 0 && (
        <>
          <p className="fmc-panel__count">{total} pedido(s)</p>
          <Table responsive hover className="fmc-panel__table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Ciudad</th>
                <th>Total</th>
                <th>Pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="fmc-panel__row"
                  onClick={() => setSelectedId(order.id)}
                >
                  <td>{order.id}</td>
                  <td>{formatDate(order.created_at)}</td>
                  <td>
                    {order.customer_name} {order.customer_surname}
                  </td>
                  <td>{order.city}</td>
                  <td>{cop(order.total)}</td>
                  <td>
                    {order.payment_method === "bre_b"
                      ? "BRE-B"
                      : "Contraentrega"}
                  </td>
                  <td>{ORDER_STATUS_LABELS[order.status] ?? order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {selectedId && (
        <OrderDetail
          orderId={selectedId}
          onClose={() => setSelectedId(null)}
          onStatusChanged={handleStatusChanged}
          onUnauthorized={onUnauthorized}
        />
      )}
    </div>
  );
};
