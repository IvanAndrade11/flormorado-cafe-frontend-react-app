import React, { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Modal, Spinner, Table } from "react-bootstrap";

import {
  AdminUnauthorizedError,
  fetchOrderDetail,
  updateOrderStatus,
} from "@/services/admin";
import { IAdminOrderDetail } from "@/types/admin";
import {
  formatPrice,
  nextOrderStatuses,
  ORDER_STATUS_LABELS,
} from "@/utils/constants";

interface OrderDetailProps {
  orderId: string;
  onClose: () => void;
  onStatusChanged: () => void;
  onUnauthorized: () => void;
}

const cop = (value: number) => `$ ${formatPrice(value)}`;

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

export const OrderDetail: React.FC<OrderDetailProps> = ({
  orderId,
  onClose,
  onStatusChanged,
  onUnauthorized,
}) => {
  const [detail, setDetail] = useState<IAdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [changingTo, setChangingTo] = useState<string | null>(null);
  const [changeError, setChangeError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const result = await fetchOrderDetail(orderId);
      setDetail(result);
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [orderId, onUnauthorized]);

  // Diferido a un microtask: `load` fija estado apenas se invoca, y
  // react-hooks/set-state-in-effect exige que fijar estado ocurra en un
  // callback, no de forma síncrona en el cuerpo del efecto.
  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  const handleStatusChange = async (status: string) => {
    setChangingTo(status);
    setChangeError(null);
    try {
      await updateOrderStatus(orderId, status);
      onStatusChanged();
      await load();
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
      setChangeError(
        "No se pudo cambiar el estado. Puede que ya no sea válido: recarga e intenta de nuevo.",
      );
    } finally {
      setChangingTo(null);
    }
  };

  const allowedNext = detail
    ? nextOrderStatuses(detail.order.payment_method, detail.order.status)
    : [];

  return (
    <Modal show onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Pedido {orderId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="fmc-panel__loading">
            <Spinner animation="border" size="sm" className="me-2" />
            Cargando…
          </div>
        )}

        {!loading && loadError && (
          <Alert variant="danger" role="alert">
            No se pudo cargar el detalle del pedido.
          </Alert>
        )}

        {!loading && !loadError && detail && (
          <>
            <div className="fmc-panel__detail-grid">
              <div>
                <h3>Cliente</h3>
                <p>
                  {detail.order.customer_name} {detail.order.customer_surname}
                  <br />
                  {detail.order.email}
                  <br />
                  {detail.order.phone}
                </p>
              </div>
              <div>
                <h3>Entrega</h3>
                <p>
                  {detail.order.address}, {detail.order.neighborhood}
                  <br />
                  {detail.order.city}
                  {detail.order.additional_info && (
                    <>
                      <br />
                      {detail.order.additional_info}
                    </>
                  )}
                </p>
              </div>
              <div>
                <h3>Pago</h3>
                <p>
                  {detail.order.payment_method === "bre_b"
                    ? "Llave BRE-B"
                    : "Contraentrega"}
                  <br />
                  Subtotal: {cop(detail.order.subtotal)}
                  <br />
                  Envío: {cop(detail.order.shipping)}
                  <br />
                  <strong>Total: {cop(detail.order.total)}</strong>
                  {!detail.order.prices_verified && (
                    <>
                      <br />
                      <Badge bg="warning" text="dark">
                        Precios sin verificar
                      </Badge>
                    </>
                  )}
                </p>
              </div>
              <div>
                <h3>Notificaciones</h3>
                <p>
                  Correo: {detail.order.email_status}
                  <br />
                  WhatsApp: {detail.order.whatsapp_status}
                </p>
              </div>
            </div>

            <h3>Productos</h3>
            <Table responsive size="sm" className="fmc-panel__table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Molienda</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {detail.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.grinding ?? "—"}</td>
                    <td>{item.quantity}</td>
                    <td>{cop(item.unit_price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h3>
              Estado:{" "}
              {ORDER_STATUS_LABELS[detail.order.status] ?? detail.order.status}
            </h3>

            {changeError && (
              <Alert variant="danger" role="alert">
                {changeError}
              </Alert>
            )}

            {allowedNext.length > 0 ? (
              <div className="fmc-panel__status-actions">
                {allowedNext.map((next) => (
                  <Button
                    key={next}
                    size="sm"
                    variant={
                      next === "cancelado"
                        ? "outline-danger"
                        : "outline-primary"
                    }
                    disabled={changingTo !== null}
                    onClick={() => handleStatusChange(next)}
                  >
                    {changingTo === next ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        aria-hidden="true"
                      />
                    ) : (
                      `Marcar como ${ORDER_STATUS_LABELS[next] ?? next}`
                    )}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-muted">
                Este pedido no tiene más cambios de estado posibles.
              </p>
            )}

            {detail.history.length > 0 && (
              <>
                <h3>Historial</h3>
                <ul className="fmc-panel__history">
                  {detail.history.map((entry) => (
                    <li key={entry.id}>
                      {formatDateTime(entry.changed_at)}:{" "}
                      {ORDER_STATUS_LABELS[entry.from_status] ??
                        entry.from_status}{" "}
                      →{" "}
                      {ORDER_STATUS_LABELS[entry.to_status] ?? entry.to_status}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};
