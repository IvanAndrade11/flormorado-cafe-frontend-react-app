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
    <div className="container fmc-panel">
      <div className="fmc-panel__header">
        <Title title="PANEL DE CONTROL" />
        <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <Tabs defaultActiveKey="pedidos" className="mb-4" id="fmc-panel-tabs">
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
  );
};
