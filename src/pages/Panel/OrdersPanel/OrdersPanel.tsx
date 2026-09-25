import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

import { AdminUnauthorizedError, fetchOrders } from "@/services/admin";
import { IAdminOrderListItem } from "@/types/admin";
import { orderStatusVariant, ORDER_STATUS_LABELS } from "@/utils/constants";

import { PanelBadge } from "../PanelBadge/PanelBadge";
import {
  EMPTY_FILTERS,
  PanelFilters,
  type PanelFilterValues,
} from "../PanelFilters/PanelFilters";
import {
  cop,
  countLabel,
  formatDate,
  hasNotificationFailure,
} from "../panelFormat";
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

export const OrdersPanel: React.FC<OrdersPanelProps> = ({ onUnauthorized }) => {
  const [orders, setOrders] = useState<IAdminOrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [applied, setApplied] = useState<PanelFilterValues>(EMPTY_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(
    async (filters: PanelFilterValues = EMPTY_FILTERS) => {
      setLoading(true);
      setLoadError(false);
      try {
        const { pedidos, total: count } = await fetchOrders({
          q: filters.q || undefined,
          status: filters.option || undefined,
        });
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

  const handleSearch = (filters: PanelFilterValues) => {
    setApplied(filters);
    load(filters);
  };

  const handleStatusChanged = () => {
    load(applied);
  };

  return (
    <div className="fmc-panel__section">
      <p className="fmc-panel__tab-lead">
        Los pedidos más recientes primero. Busca por número de pedido,
        documento, celular, correo o nombre del cliente. Haz clic en uno para
        ver el detalle completo y avanzarlo de estado a medida que lo preparas.
      </p>

      <PanelFilters
        searchLabel="Buscar pedidos"
        placeholder="Número de pedido, documento, celular, correo o nombre"
        optionLabel="Filtrar por estado"
        options={STATUS_FILTER_OPTIONS}
        onSearch={handleSearch}
      />

      {loading && (
        <div className="fmc-panel__loading">
          <Spinner animation="border" size="sm" className="me-2" />
          Cargando pedidos…
        </div>
      )}

      {!loading && loadError && (
        <div className="fmc-panel__error" role="alert">
          No se pudieron cargar los pedidos. Intenta de nuevo.
        </div>
      )}

      {!loading && !loadError && orders.length === 0 && (
        <div className="fmc-panel__empty" role="status">
          No hay pedidos con ese filtro.
        </div>
      )}

      {!loading && !loadError && orders.length > 0 && (
        <>
          <p className="fmc-panel__count">
            {countLabel(orders.length, total, "pedido(s)")}
          </p>
          <div className="fmc-panel__table-wrap">
            <Table responsive hover className="fmc-panel__table">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
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
                    <td>{cop(order.total)}</td>
                    <td>
                      <PanelBadge variant={orderStatusVariant(order.status)}>
                        {ORDER_STATUS_LABELS[order.status] ?? order.status}
                      </PanelBadge>
                      {hasNotificationFailure(
                        order.email_status,
                        order.whatsapp_status,
                      ) && (
                        <>
                          {" "}
                          <PanelBadge variant="block">
                            Notificación fallida
                          </PanelBadge>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
