import React, { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Spinner, Table } from "react-bootstrap";

import {
  AdminUnauthorizedError,
  fetchCustomers,
  optOutCustomer,
} from "@/services/admin";
import { IAdminCustomer } from "@/types/admin";
import { formatPrice } from "@/utils/constants";

interface CustomersPanelProps {
  onUnauthorized: () => void;
}

const cop = (value: number) => `$ ${formatPrice(value)}`;

export const CustomersPanel: React.FC<CustomersPanelProps> = ({
  onUnauthorized,
}) => {
  const [customers, setCustomers] = useState<IAdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { clientes } = await fetchCustomers();
      setCustomers(clientes);
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
    void Promise.resolve().then(load);
  }, [load]);

  const handleOptOut = async (customer: IAdminCustomer) => {
    setUpdatingId(customer.id);
    try {
      await optOutCustomer(customer.id);
      await load();
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) {
        onUnauthorized();
        return;
      }
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="fmc-panel__loading">
        <Spinner animation="border" size="sm" className="me-2" />
        Cargando clientes…
      </div>
    );
  }

  if (loadError) {
    return (
      <Alert variant="danger" role="alert">
        No se pudieron cargar los clientes. Intenta de nuevo.
      </Alert>
    );
  }

  if (customers.length === 0) {
    return (
      <Alert variant="secondary" role="status">
        Todavía no hay clientes registrados.
      </Alert>
    );
  }

  return (
    <Table responsive hover className="fmc-panel__table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Celular</th>
          <th>Ciudad</th>
          <th>Pedidos</th>
          <th>Total comprado</th>
          <th>Novedades por WhatsApp</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>
              {customer.name} {customer.surname}
            </td>
            <td>{customer.phone}</td>
            <td>{customer.city}</td>
            <td>{customer.pedidos}</td>
            <td>{cop(customer.total_comprado)}</td>
            <td>
              {customer.whatsapp_marketing ? (
                <Badge bg="success">Autorizadas</Badge>
              ) : (
                <Badge bg="secondary">De baja</Badge>
              )}
            </td>
            <td>
              {customer.whatsapp_marketing ? (
                <Button
                  size="sm"
                  variant="outline-danger"
                  disabled={updatingId === customer.id}
                  onClick={() => handleOptOut(customer)}
                >
                  {updatingId === customer.id ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      aria-hidden="true"
                    />
                  ) : (
                    "Dar de baja"
                  )}
                </Button>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
