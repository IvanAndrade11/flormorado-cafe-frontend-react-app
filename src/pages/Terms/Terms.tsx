import { Title } from "@/components/ui";
import "./Terms.scss";

import React from "react";
import { Alert } from "react-bootstrap";

export const Terms: React.FC = () => {
  return (
    <div className="container py-4">
      <Title title="TÉRMINOS Y CONDICIONES" />

      <Alert variant="warning" className="my-4">
        Contenido de ejemplo — pendiente de actualizar con el texto legal
        definitivo.
      </Alert>

      <p>
        Bienvenido a Flormorado Café. Al realizar una compra o usar este sitio,
        aceptas los términos y condiciones descritos a continuación.
      </p>

      <h2 className="h5 mt-4">1. Aceptación de los términos</h2>
      <p>
        Este es un texto de ejemplo. Aquí irá la descripción de las condiciones
        bajo las cuales el cliente acepta usar el sitio y realizar pedidos.
      </p>

      <h2 className="h5 mt-4">2. Pedidos y pagos</h2>
      <p>
        Este es un texto de ejemplo. Aquí se detallarán los métodos de pago
        aceptados, la confirmación de pedidos y las políticas de facturación.
      </p>

      <h2 className="h5 mt-4">3. Envíos y entregas</h2>
      <p>
        Este es un texto de ejemplo. Aquí se describirán las zonas de cobertura,
        los tiempos estimados de entrega y las condiciones del servicio de
        envío.
      </p>

      <h2 className="h5 mt-4">4. Cambios y devoluciones</h2>
      <p>
        Este es un texto de ejemplo. Aquí se explicará la política de cambios y
        devoluciones de productos.
      </p>

      <h2 className="h5 mt-4">5. Contacto</h2>
      <p>
        Ante cualquier duda sobre estos términos, puedes escribirnos a
        info@flormoradocafe.com.
      </p>
    </div>
  );
};
