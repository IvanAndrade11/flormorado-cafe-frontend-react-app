import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

import { AdminUnauthorizedError, fetchCustomers } from "@/services/admin";
import { IAdminCustomer } from "@/types/admin";

import { PanelBadge } from "../PanelBadge/PanelBadge";
import {
  EMPTY_FILTERS,
  PanelFilters,
  type PanelFilterValues,
} from "../PanelFilters/PanelFilters";
import { cop, countLabel } from "../panelFormat";
import { CustomerDetail } from "./CustomerDetail/CustomerDetail";

const MARKETING_FILTER_OPTIONS = [
  { value: "", label: "Todas las novedades" },
  { value: "1", label: "Autorizadas" },
  { value: "0", label: "De baja" },
];

interface CustomersPanelProps {
  onUnauthorized: () => void;
}

export const CustomersPanel: React.FC<CustomersPanelProps> = ({
  onUnauthorized,
}) => {
  const [customers, setCustomers] = useState<IAdminCustomer[]>([]);
  const [total, setTotal] = useState(0);
  const [applied, setApplied] = useState<PanelFilterValues>(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const load = useCallback(
    async (filters: PanelFilterValues = EMPTY_FILTERS) => {
      setLoading(true);
      setLoadError(false);
      try {
        const { clientes, total: count } = await fetchCustomers({
          q: filters.q || undefined,
          marketing: filters.option || undefined,
        });
        setCustomers(clientes);
        setTotal(count);
      } catch (error) {
        if (error instanceof AdminUnauthorizedError) {
          onUnauthorized();
          return;
        }
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized],
  );

  // Diferido a un microtask: `load` fija estado apenas se invoca, y
  // react-hooks/set-state-in-effect exige que fijar estado ocurra en un
  // callback, no de forma síncrona en el cuerpo del efecto.
  useEffect(() => {
    void Promise.resolve().then(() => load());
  }, [load]);

  const handleSearch = (filters: PanelFilterValues) => {
    setApplied(filters);
    load(filters);
  };

  return (
    <div className="fmc-panel__section">
      <p className="fmc-panel__tab-lead">
        Cada cliente queda identificado por su celular, con los datos de su
        último pedido. Busca por nombre, celular, correo o documento, o filtra
        por quién autorizó novedades. Haz clic en un cliente para ver su
        historial y, si te pide dejar de recibir novedades, darlo de baja — la
        Ley 1581 exige que puedan revocar la autorización cuando quieran.
      </p>

      <PanelFilters
        searchLabel="Buscar clientes"
        placeholder="Nombre, celular, correo o documento"
        optionLabel="Filtrar por novedades"
        options={MARKETING_FILTER_OPTIONS}
        onSearch={handleSearch}
      />

      {loading && (
        <div className="fmc-panel__loading">
          <Spinner animation="border" size="sm" className="me-2" />
          Cargando clientes…
        </div>
      )}

      {!loading && loadError && (
        <div className="fmc-panel__error" role="alert">
          No se pudieron cargar los clientes. Intenta de nuevo.
        </div>
      )}

      {!loading && !loadError && customers.length === 0 && (
        <div className="fmc-panel__empty" role="status">
          {applied.q || applied.option
            ? "No hay clientes con ese filtro."
            : "Todavía no hay clientes registrados."}
        </div>
      )}

      {!loading && !loadError && customers.length > 0 && (
        <>
          <p className="fmc-panel__count">
            {countLabel(customers.length, total, "cliente(s)")}
          </p>
          <div className="fmc-panel__table-wrap">
            <Table responsive hover className="fmc-panel__table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Celular</th>
                  <th>Pedidos</th>
                  <th>Total comprado</th>
                  <th>Novedades por WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="fmc-panel__row"
                    onClick={() => setSelectedId(customer.id)}
                  >
                    <td>
                      {customer.name} {customer.surname}
                    </td>
                    <td>{customer.phone}</td>
                    <td>{customer.pedidos}</td>
                    <td>{cop(customer.total_comprado)}</td>
                    <td>
                      {customer.whatsapp_marketing ? (
                        <PanelBadge variant="done">Autorizadas</PanelBadge>
                      ) : (
                        <PanelBadge variant="muted">De baja</PanelBadge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      {selectedId !== null && (
        <CustomerDetail
          customerId={selectedId}
          onClose={() => setSelectedId(null)}
          onOptedOut={() => load(applied)}
          onUnauthorized={onUnauthorized}
        />
      )}
    </div>
  );
};
