import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";

import {
  AdminUnauthorizedError,
  fetchOrderDetail,
  updateOrderStatus,
} from "@/services/admin";
import { IAdminOrderDetail } from "@/types/admin";
import {
  nextOrderStatuses,
  nextStepHint,
  ORDER_STATUS_LABELS,
  orderStatusVariant,
} from "@/utils/constants";

import { PanelBadge } from "../../PanelBadge/PanelBadge";
import { cop, formatDate, notificationInfo } from "../../panelFormat";

interface OrderDetailProps {
  orderId: string;
  onClose: () => void;
  onStatusChanged: () => void;
  onUnauthorized: () => void;
}

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
    void Promise.resolve().then(() => load());
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

  const hint = detail
    ? nextStepHint(detail.order.payment_method, detail.order.status)
    : null;

  const emailInfo = detail ? notificationInfo(detail.order.email_status) : null;
  const whatsappInfo = detail
    ? notificationInfo(detail.order.whatsapp_status)
    : null;

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
          <div className="fmc-panel__error" role="alert">
            No se pudo cargar el detalle del pedido.
          </div>
        )}

        {!loading && !loadError && detail && (
          <>
            {!detail.order.prices_verified && (
              <div className="fmc-panel__callout fmc-panel__callout--warn">
                <p className="fmc-panel__callout-label">
                  Revisar antes de preparar
                </p>
                <p className="fmc-panel__callout-body">
                  No se pudo consultar el catálogo cuando entró este pedido, así
                  que el total viene del navegador del cliente. Confirma los
                  precios antes de empacarlo.
                </p>
              </div>
            )}

            <div className="fmc-panel__detail-section">
              <dl className="fmc-panel__detail-grid">
                <div>
                  <dt>Cliente</dt>
                  <dd>
                    {detail.order.customer_name} {detail.order.customer_surname}
                    <br />
                    {detail.order.email}
                    <br />
                    {detail.order.phone}
                  </dd>
                </div>
                <div>
                  <dt>Entrega</dt>
                  <dd>
                    {detail.order.address}, {detail.order.neighborhood}
                    <br />
                    {detail.order.city}
                    {detail.order.additional_info && (
                      <>
                        <br />
                        {detail.order.additional_info}
                      </>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Pago</dt>
                  <dd>
                    {detail.order.payment_method === "bre_b"
                      ? "Llave BRE-B"
                      : "Contraentrega"}
                    <br />
                    Subtotal: {cop(detail.order.subtotal)}
                    <br />
                    Envío: {cop(detail.order.shipping)}
                    <br />
                    <strong>Total: {cop(detail.order.total)}</strong>
                  </dd>
                </div>
                <div>
                  <dt>Notificaciones</dt>
                  <dd>
                    <div className="fmc-panel__status-row">
                      Correo:{" "}
                      {emailInfo && (
                        <PanelBadge variant={emailInfo.variant}>
                          {emailInfo.label}
                        </PanelBadge>
                      )}
                    </div>
                    <div className="fmc-panel__status-row mt-2">
                      WhatsApp:{" "}
                      {whatsappInfo && (
                        <PanelBadge variant={whatsappInfo.variant}>
                          {whatsappInfo.label}
                        </PanelBadge>
                      )}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="fmc-panel__detail-section">
              <h3 className="fmc-panel__section-title">Productos</h3>
              <div className="fmc-panel__table-wrap">
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
              </div>
            </div>

            <div className="fmc-panel__detail-section">
              <h3 className="fmc-panel__section-title">
                Estado:{" "}
                <PanelBadge variant={orderStatusVariant(detail.order.status)}>
                  {ORDER_STATUS_LABELS[detail.order.status] ??
                    detail.order.status}
                </PanelBadge>
              </h3>

              {hint && (
                <div className="fmc-panel__callout">
                  <p className="fmc-panel__callout-label">Qué sigue</p>
                  <p className="fmc-panel__callout-body">{hint}</p>
                </div>
              )}

              {changeError && (
                <div className="fmc-panel__error" role="alert">
                  {changeError}
                </div>
              )}

              {allowedNext.length > 0 ? (
                <div className="fmc-panel__status-actions">
                  {allowedNext.map((next) => (
                    <Button
                      key={next}
                      size="sm"
                      className="fmc-panel__status-button"
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
                <p className="fmc-panel__count">
                  {detail.order.status === "cancelado"
                    ? "Este pedido está cancelado."
                    : "Este pedido ya llegó al cliente — no tiene más cambios de estado."}
                </p>
              )}
            </div>

            {detail.history.length > 0 && (
              <div className="fmc-panel__detail-section">
                <h3 className="fmc-panel__section-title">Historial</h3>
                <ul className="fmc-panel__history">
                  {detail.history.map((entry) => (
                    <li key={entry.id}>
                      {formatDate(entry.changed_at)}:{" "}
                      {ORDER_STATUS_LABELS[entry.from_status] ??
                        entry.from_status}{" "}
                      →{" "}
                      {ORDER_STATUS_LABELS[entry.to_status] ?? entry.to_status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};
