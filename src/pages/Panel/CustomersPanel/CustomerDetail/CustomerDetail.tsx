import React, { useCallback, useEffect, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";

import { AdminUnauthorizedError, fetchCustomerDetail } from "@/services/admin";
import { IAdminCustomerDetail } from "@/types/admin";
import { orderStatusVariant, ORDER_STATUS_LABELS } from "@/utils/constants";

import { PanelBadge } from "../../PanelBadge/PanelBadge";
import { cop, formatDate } from "../../panelFormat";

interface CustomerDetailProps {
  customerId: number;
  onClose: () => void;
  onUnauthorized: () => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customerId,
  onClose,
  onUnauthorized,
}) => {
  const [detail, setDetail] = useState<IAdminCustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

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

  const customer = detail?.cliente;

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
              <h3 className="fmc-panel__section-title">Historial de pedidos</h3>
              <div className="fmc-panel__table-wrap">
                <Table responsive size="sm" className="fmc-panel__table">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
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
