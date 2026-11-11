import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface PanelFilterValues {
  q: string;
  option: string;
}

export const EMPTY_FILTERS: PanelFilterValues = { q: "", option: "" };

interface PanelFiltersProps {
  searchLabel: string;
  placeholder: string;
  optionLabel: string;
  options: { value: string; label: string }[];
  onSearch: (values: PanelFilterValues) => void;
}

// Buscador de texto + un selector, compartido por Pedidos y Clientes. La
// búsqueda se dispara al enviar el formulario, no en cada tecla, para no
// golpear el backend en cada cambio.
export const PanelFilters: React.FC<PanelFiltersProps> = ({
  searchLabel,
  placeholder,
  optionLabel,
  options,
  onSearch,
}) => {
  const [q, setQ] = useState("");
  const [option, setOption] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ q: q.trim(), option });
  };

  const handleClear = () => {
    setQ("");
    setOption("");
    onSearch(EMPTY_FILTERS);
  };

  return (
    <Form className="fmc-panel__filters" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        className="fmc-panel__search"
        aria-label={searchLabel}
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <Form.Select
        aria-label={optionLabel}
        value={option}
        onChange={(e) => setOption(e.target.value)}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
      <Button
        type="submit"
        className="fmc-panel__filter-button"
        variant="outline-secondary"
      >
        Buscar
      </Button>
      {(q !== "" || option !== "") && (
        <Button
          type="button"
          variant="link"
          className="fmc-panel__filter-clear"
          onClick={handleClear}
        >
          Limpiar
        </Button>
      )}
    </Form>
  );
};
