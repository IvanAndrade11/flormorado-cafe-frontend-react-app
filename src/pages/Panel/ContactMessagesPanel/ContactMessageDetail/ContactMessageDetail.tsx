import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import { IAdminContactMessage } from "@/types/admin";

import { PanelBadge } from "../../PanelBadge/PanelBadge";
import { formatDate, notificationInfo } from "../../panelFormat";

// Mismas etiquetas que SUBJECT_OPTIONS en Contact.tsx.
export const SUBJECT_LABELS: Record<string, string> = {
  pedido: "Estado de un pedido",
  producto: "Preguntas sobre un producto",
  mayoristas: "Ventas al por mayor / aliados",
  prensa: "Prensa y medios",
  otro: "Otro",
};

interface ContactMessageDetailProps {
  message: IAdminContactMessage;
  updating: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ContactMessageDetail: React.FC<ContactMessageDetailProps> = ({
  message,
  updating,
  onToggle,
  onClose,
}) => {
  const emailInfo = notificationInfo(message.email_status);
  const attended = message.status === "atendido";

  return (
    <Modal show onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Mensaje de {message.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {emailInfo.variant === "block" && (
          <div className="fmc-panel__callout fmc-panel__callout--warn">
            <p className="fmc-panel__callout-label">Revisar</p>
            <p className="fmc-panel__callout-body">
              El aviso por correo de este mensaje no llegó al negocio. Por eso
              importa haberlo guardado aquí: respóndele al cliente igual.
            </p>
          </div>
        )}

        <div className="fmc-panel__detail-section">
          <dl className="fmc-panel__detail-grid">
            <div>
              <dt>Contacto</dt>
              <dd>
                {message.email}
                {message.phone && (
                  <>
                    <br />
                    {message.phone}
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Asunto</dt>
              <dd>{SUBJECT_LABELS[message.subject] ?? message.subject}</dd>
            </div>
            <div>
              <dt>Recibido</dt>
              <dd>{formatDate(message.created_at)}</dd>
            </div>
            <div>
              <dt>Aviso por correo</dt>
              <dd>
                <PanelBadge variant={emailInfo.variant}>
                  {emailInfo.label}
                </PanelBadge>
              </dd>
            </div>
          </dl>
        </div>

        <div className="fmc-panel__detail-section">
          <h3 className="fmc-panel__section-title">Mensaje</h3>
          <p className="fmc-panel__message-box">{message.message}</p>
        </div>

        <div className="fmc-panel__detail-section">
          <h3 className="fmc-panel__section-title">
            Estado:{" "}
            {attended ? (
              <PanelBadge variant="done">Atendido</PanelBadge>
            ) : (
              <PanelBadge variant="wait">Nuevo</PanelBadge>
            )}
          </h3>

          <div className="fmc-panel__callout">
            <p className="fmc-panel__callout-label">Qué sigue</p>
            <p className="fmc-panel__callout-body">
              {attended
                ? "Ya lo marcaste como atendido. Si el cliente vuelve a escribir sobre lo mismo, puedes devolverlo a “Nuevo”."
                : "Respóndele al cliente y, cuando lo hayas hecho, márcalo como atendido para saber que ya está resuelto."}
            </p>
          </div>

          <div className="fmc-panel__status-actions">
            <a
              className="btn btn-sm btn-outline-primary fmc-panel__status-button"
              href={`mailto:${message.email}`}
            >
              Responder por correo
            </a>
            {message.phone && (
              <a
                className="btn btn-sm btn-outline-primary fmc-panel__status-button"
                href={`https://wa.me/57${message.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </a>
            )}
            <Button
              size="sm"
              variant="outline-secondary"
              className="fmc-panel__status-button"
              disabled={updating}
              onClick={onToggle}
            >
              {updating ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  aria-hidden="true"
                />
              ) : attended ? (
                "Marcar como nuevo"
              ) : (
                "Marcar atendido"
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
