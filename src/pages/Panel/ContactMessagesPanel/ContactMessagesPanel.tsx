import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

import {
  AdminUnauthorizedError,
  fetchContactMessages,
  updateContactMessageStatus,
} from "@/services/admin";
import { IAdminContactMessage } from "@/types/admin";

import { PanelBadge } from "../PanelBadge/PanelBadge";
import { formatDate } from "../panelFormat";
import {
  ContactMessageDetail,
  SUBJECT_LABELS,
} from "./ContactMessageDetail/ContactMessageDetail";

interface ContactMessagesPanelProps {
  onUnauthorized: () => void;
}

export const ContactMessagesPanel: React.FC<ContactMessagesPanelProps> = ({
  onUnauthorized,
}) => {
  const [messages, setMessages] = useState<IAdminContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { mensajes } = await fetchContactMessages();
      setMessages(mensajes);
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  // Diferido a un microtask: `load` fija estado apenas se invoca, y
  // react-hooks/set-state-in-effect exige que fijar estado ocurra en un
  // callback, no de forma síncrona en el cuerpo del efecto.
  useEffect(() => {
    void Promise.resolve().then(() => load());
  }, [load]);

  const handleToggle = async (message: IAdminContactMessage) => {
    setUpdating(true);
    try {
      await updateContactMessageStatus(
        message.id,
        message.status === "atendido" ? "nuevo" : "atendido",
      );
      await load();
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
    } finally {
      setUpdating(false);
    }
  };

  // El modal lee el mensaje de la lista, no de una copia: así, al recargar
  // tras cambiar el estado, muestra el valor nuevo.
  const selected = messages.find((message) => message.id === selectedId);

  return (
    <div className="fmc-panel__section">
      <p className="fmc-panel__tab-lead">
        Mensajes de quienes te escriben desde la página de contacto. Haz clic en
        uno para leerlo completo, responderle y marcarlo como atendido. Se
        guardan aquí aunque el correo al negocio falle, así que revisa también
        los que dicen “No llegó”.
      </p>

      {loading && (
        <div className="fmc-panel__loading">
          <Spinner animation="border" size="sm" className="me-2" />
          Cargando mensajes…
        </div>
      )}

      {!loading && loadError && (
        <div className="fmc-panel__error" role="alert">
          No se pudieron cargar los mensajes. Intenta de nuevo.
        </div>
      )}

      {!loading && !loadError && messages.length === 0 && (
        <div className="fmc-panel__empty" role="status">
          No hay mensajes de contacto todavía.
        </div>
      )}

      {!loading && !loadError && messages.length > 0 && (
        <div className="fmc-panel__table-wrap">
          <Table responsive hover className="fmc-panel__table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className="fmc-panel__row"
                  onClick={() => setSelectedId(message.id)}
                >
                  <td>{formatDate(message.created_at)}</td>
                  <td>{message.name}</td>
                  <td>{SUBJECT_LABELS[message.subject] ?? message.subject}</td>
                  <td className="fmc-panel__message-cell">{message.message}</td>
                  <td>
                    {message.status === "atendido" ? (
                      <PanelBadge variant="done">Atendido</PanelBadge>
                    ) : (
                      <PanelBadge variant="wait">Nuevo</PanelBadge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {selected && (
        <ContactMessageDetail
          message={selected}
          updating={updating}
          onToggle={() => handleToggle(selected)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};
