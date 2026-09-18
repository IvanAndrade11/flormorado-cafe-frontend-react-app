import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import { loginToPanel } from "@/services/admin";

interface PanelLoginProps {
  onSuccess: () => void;
}

export const PanelLogin: React.FC<PanelLoginProps> = ({ onSuccess }) => {
  const [key, setKey] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!key.trim()) return;

    setVerifying(true);
    setErrorMessage(null);

    try {
      const ok = await loginToPanel(key.trim());
      if (ok) {
        onSuccess();
      } else {
        setErrorMessage("Clave incorrecta. Intenta de nuevo.");
      }
    } catch {
      setErrorMessage("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Form className="fmc-panel__login-form" onSubmit={handleSubmit}>
      <Form.Group controlId="panel-key" className="mb-3">
        <Form.Label>Clave del panel</Form.Label>
        <Form.Control
          type="password"
          autoFocus
          value={key}
          onChange={(e) => setKey(e.target.value)}
          disabled={verifying}
        />
      </Form.Group>

      {errorMessage && (
        <Alert variant="danger" role="alert">
          {errorMessage}
        </Alert>
      )}

      <Button
        type="submit"
        className="fmc-button"
        disabled={verifying || !key.trim()}
      >
        {verifying ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
              className="me-2"
            />
            Verificando…
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </Form>
  );
};
