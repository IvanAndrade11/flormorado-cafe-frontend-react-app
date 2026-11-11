import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";

import {
  AdminUnauthorizedError,
  fetchCustomerDetail,
  optOutCustomer,
  suppressCustomer,
} from "@/services/admin";
import { IAdminCustomerDetail } from "@/types/admin";
import { orderStatusVariant, ORDER_STATUS_LABELS } from "@/utils/constants";

import { PanelBadge } from "../../PanelBadge/PanelBadge";
import { cop, formatDate } from "../../panelFormat";

interface CustomerDetailProps {
  customerId: number;
  onClose: () => void;
  onChanged: () => void;
  onUnauthorized: () => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customerId,
  onClose,
  onChanged,
  onUnauthorized,
}) => {
  const [detail, setDetail] = useState<IAdminCustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [confirming, setConfirming] = useState<"baja" | "supresion" | null>(
    null,
  );
  const [updating, setUpdating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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

  // Las dos acciones son el mismo flujo: confirmar, llamar, recargar. Lo único
  // que cambia es qué se llama y qué decir si falla.
  const run = async (accion: () => Promise<unknown>, error: string) => {
    setUpdating(true);
    setActionError(null);
    try {
      await accion();
      setConfirming(null);
      onChanged();
      await load();
    } catch (e) {
      if (e instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
      setActionError(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleOptOut = () =>
    run(
      () => optOutCustomer(customerId),
      "No se pudo dar de baja al cliente. Intenta de nuevo.",
    );

  const handleSuppress = () =>
    run(
      () => suppressCustomer(customerId),
      "No se pudieron suprimir los datos del cliente. Intenta de nuevo.",
    );

  const customer = detail?.cliente;
  const suppressed = Boolean(customer?.suppressed_at);
  const authorized = customer?.whatsapp_marketing === 1;

  return (
    <Modal show onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {!customer
            ? "Cliente"
            : suppressed
              ? "Datos suprimidos"
              : `${customer.name} ${customer.surname}`}
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
                  {actionError}
                </div>
              )}

              {authorized &&
                !suppressed &&
                (confirming === "baja" ? (
                  <div className="fmc-panel__status-actions">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="fmc-panel__status-button"
                      disabled={updating}
                      onClick={() => void handleOptOut()}
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
                      onClick={() => setConfirming(null)}
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
                      onClick={() => setConfirming("baja")}
                    >
                      Dar de baja de las novedades
                    </Button>
                  </div>
                ))}
            </div>

            <div className="fmc-panel__detail-section">
              <h3 className="fmc-panel__section-title">
                Supresión de datos:{" "}
                {suppressed ? (
                  <PanelBadge variant="muted">Atendida</PanelBadge>
                ) : (
                  <PanelBadge variant="done">Ficha vigente</PanelBadge>
                )}
              </h3>

              <div className="fmc-panel__callout">
                <p className="fmc-panel__callout-label">
                  {suppressed ? "Qué pasó" : "Qué borra y qué no"}
                </p>
                <p className="fmc-panel__callout-body">
                  {suppressed
                    ? `Se atendió el ${formatDate(customer.suppressed_at as string)}. Esta ficha ya no conserva nombre, correo, documento ni celular, y sus mensajes del formulario de contacto se borraron. Sus pedidos siguen abajo: la ley permite conservarlos porque son soporte contable.`
                    : "Si el cliente pide que borres sus datos tienes quince días hábiles para resolver. Al suprimir desaparecen de esta ficha su nombre, correo, documento y celular, y se borran todos sus mensajes del formulario de contacto. Sus pedidos se conservan tal como están, con los datos que llevan, porque son el soporte contable que las normas obligan a guardar: la ley permite negar la supresión en ese caso. Si te pregunta, esa es la respuesta exacta."}
                </p>
              </div>

              {!suppressed &&
                (confirming === "supresion" ? (
                  <div className="fmc-panel__status-actions">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="fmc-panel__status-button"
                      disabled={updating}
                      onClick={() => void handleSuppress()}
                    >
                      {updating ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          aria-hidden="true"
                        />
                      ) : (
                        "Sí, suprimir — no se puede deshacer"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="fmc-panel__status-button"
                      disabled={updating}
                      onClick={() => setConfirming(null)}
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
                      onClick={() => setConfirming("supresion")}
                    >
                      Suprimir los datos del cliente
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
                      <th>Política aceptada</th>
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
                        <td>
                          {order.privacy_policy_version
                            ? `Versión ${order.privacy_policy_version}`
                            : "Sin registro"}
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
