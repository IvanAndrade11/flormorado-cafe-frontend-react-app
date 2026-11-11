import "./Panel.scss";
import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";

import { Title } from "@/components/ui";
import { hasStoredAdminKey, logoutOfPanel } from "@/services/admin";

import { ContactMessagesPanel } from "./ContactMessagesPanel/ContactMessagesPanel";
import { CustomersPanel } from "./CustomersPanel/CustomersPanel";
import { OrdersPanel } from "./OrdersPanel/OrdersPanel";
import { PanelLogin } from "./PanelLogin/PanelLogin";

export const Panel: React.FC = () => {
  const [authed, setAuthed] = useState(hasStoredAdminKey());

  // Cualquier vista puede llamar esto cuando una petición responde 401 (clave
  // vencida o rotada a mitad de sesión), no solo el formulario de entrada.
  const handleUnauthorized = () => setAuthed(false);

  const handleLogout = () => {
    logoutOfPanel();
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="container fmc-panel fmc-panel--login">
        <Title title="PANEL DE CONTROL" />
        <PanelLogin onSuccess={() => setAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="container fmc-panel mb-5">
      <div className="fmc-panel__surface">
        <div className="fmc-panel__header">
          <div className="pt-2">
            <p className="fmc-panel__eyebrow">
              Flormorado Café · uso interno
              <Button className="fmc-panel__logout" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </p>
            <Title title="PANEL DE CONTROL" />
            <p className="fmc-panel__dek">
              Aquí ves cómo va el negocio: qué pedidos hay que preparar, quién
              autorizó recibir novedades y quién te ha escrito por el formulario
              de contacto.
            </p>
          </div>
        </div>

        <Tabs
          defaultActiveKey="pedidos"
          className="mb-4 fmc-panel-tabs"
          id="fmc-panel-tabs"
        >
          <Tab eventKey="pedidos" title="Pedidos">
            <OrdersPanel onUnauthorized={handleUnauthorized} />
          </Tab>
          <Tab eventKey="clientes" title="Clientes">
            <CustomersPanel onUnauthorized={handleUnauthorized} />
          </Tab>
          <Tab eventKey="mensajes" title="Mensajes de contacto">
            <ContactMessagesPanel onUnauthorized={handleUnauthorized} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
