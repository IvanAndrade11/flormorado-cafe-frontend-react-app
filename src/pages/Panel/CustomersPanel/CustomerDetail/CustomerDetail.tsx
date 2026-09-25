import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";

import {
  AdminUnauthorizedError,
  fetchCustomerDetail,
  optOutCustomer,
} from "@/services/admin";
import { IAdminCustomerDetail } from "@/types/admin";
import { orderStatusVariant, ORDER_STATUS_LABELS } from "@/utils/constants";

import { PanelBadge } from "../../PanelBadge/PanelBadge";
import { cop, formatDate } from "../../panelFormat";

interface CustomerDetailProps {
  customerId: number;
  onClose: () => void;
  onOptedOut: () => void;
  onUnauthorized: () => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customerId,
  onClose,
  onOptedOut,
  onUnauthorized,
}) => {
  const [detail, setDetail] = useState<IAdminCustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [actionError, setActionError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      setDetail(await fetchCustomerDetail(customerId));
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [customerId, onUnauthorized]);

  // Diferido a un microtask: `load` fija estado apenas se invoca, y
  // react-hooks/set-state-in-effect exige que fijar estado ocurra en un
  // callback, no de forma síncrona en el cuerpo del efecto.
  useEffect(() => {
    void Promise.resolve().then(() => load());
  }, [load]);

  const handleOptOut = async () => {
    setUpdating(true);
    setActionError(false);
    try {
      await optOutCustomer(customerId);
      setConfirming(false);
      onOptedOut();
      await load();
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
      setActionError(true);
    } finally {
      setUpdating(false);
    }
  };

  const customer = detail?.cliente;
  const authorized = customer?.whatsapp_marketing === 1;

  return (
    <Modal show onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {customer ? `${customer.name} ${customer.surname}` : "Cliente"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && !detail && (
          <div className="fmc-panel__loading">
            <Spinner animation="border" size="sm" className="me-2" />
            Cargando…
          </div>
        )}

        {!loading && loadError && (
          <div className="fmc-panel__error" role="alert">
            No se pudo cargar el detalle del cliente.
          </div>
        )}

        {customer && detail && (
          <>
            <div className="fmc-panel__detail-section">
              <dl className="fmc-panel__detail-grid">
                <div>
                  <dt>Contacto</dt>
                  <dd>
                    {customer.phone}
                    <br />
                    {customer.email}
                    <br />
                    {customer.city}
                  </dd>
                </div>
                <div>
                  <dt>Documento</dt>
                  <dd>
                    {customer.document_type} {customer.document_number}
                  </dd>
                </div>
                <div>
                  <dt>Compras</dt>
                  <dd>
                    {customer.pedidos} pedido(s)
                    <br />
                    <strong>{cop(customer.total_comprado)}</strong> en total
                  </dd>
                </div>
                <div>
                  <dt>Cliente desde</dt>
                  <dd>{formatDate(customer.created_at)}</dd>
                </div>
              </dl>
            </div>

            <div className="fmc-panel__detail-section">
              <h3 className="fmc-panel__section-title">
                Novedades por WhatsApp:{" "}
                {authorized ? (
                  <PanelBadge variant="done">Autorizadas</PanelBadge>
                ) : (
                  <PanelBadge variant="muted">De baja</PanelBadge>
                )}
              </h3>

              <div className="fmc-panel__callout">
                <p className="fmc-panel__callout-label">Qué sigue</p>
                <p className="fmc-panel__callout-body">
                  {authorized
                    ? `Autorizó recibir novedades (último cambio: ${formatDate(customer.marketing_updated_at)}). Si te pide por otro canal que dejes de escribirle, dalo de baja aquí.`
                    : `No recibe novedades desde ${formatDate(customer.marketing_updated_at)}. Solo vuelve a recibirlas si él mismo marca la casilla en un próximo pedido; no lo reactives desde aquí.`}
                </p>
              </div>

              {actionError && (
                <div className="fmc-panel__error mb-3" role="alert">
                  No se pudo dar de baja al cliente. Intenta de nuevo.
                </div>
              )}

              {authorized &&
                (confirming ? (
                  <div className="fmc-panel__status-actions">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="fmc-panel__status-button"
                      disabled={updating}
                      onClick={handleOptOut}
                    >
                      {updating ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          aria-hidden="true"
                        />
                      ) : (
                        "Sí, dar de baja"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="fmc-panel__status-button"
                      disabled={updating}
                      onClick={() => setConfirming(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <div className="fmc-panel__status-actions">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="fmc-panel__status-button"
                      onClick={() => setConfirming(true)}
                    >
                      Dar de baja de las novedades
                    </Button>
                  </div>
                ))}
            </div>

            <div className="fmc-panel__detail-section">
              <h3 className="fmc-panel__section-title">Historial de pedidos</h3>
              <div className="fmc-panel__table-wrap">
                <Table responsive size="sm" className="fmc-panel__table">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Casilla de novedades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.historial.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{cop(order.total)}</td>
                        <td>
                          <PanelBadge
                            variant={orderStatusVariant(order.status)}
                          >
                            {ORDER_STATUS_LABELS[order.status] ?? order.status}
                          </PanelBadge>
                        </td>
                        <td>
                          {order.whatsapp_opt_in
                            ? `Marcada${order.marketing_consent_version ? ` · texto ${order.marketing_consent_version}` : ""}`
                            : "Sin marcar"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};
