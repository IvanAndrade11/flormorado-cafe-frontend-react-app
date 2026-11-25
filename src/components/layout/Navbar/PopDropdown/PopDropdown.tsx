import "./PopDropdown.scss";
import React, { useEffect, useRef, useState } from "react";

import { Dropdown, Nav, NavItem } from "react-bootstrap";
import { NavbarMenuItem } from "@/types/components";

// Abrir casi al instante y cerrar con calma: así el menú no parpadea al cruzar
// la barra de camino a otro sitio, y da tiempo a bajar hasta el panel.
const OPEN_DELAY = 120;
const CLOSE_DELAY = 250;

/**
 * Desplegable de escritorio.
 *
 * Es el `Dropdown` de react-bootstrap y no un popover a mano porque trae de
 * fábrica lo que hacía falta: `aria-expanded`, apertura con Enter o Espacio,
 * recorrido con las flechas, cierre con Escape y al hacer clic fuera.
 *
 * Se usa `Dropdown` suelto y no `NavDropdown` porque este último no deja poner
 * clases en el disparador, y el disparador tiene que ser un enlace de la barra
 * como cualquier otro: con `NavDropdown` quedaban desalineados con «Inicio».
 *
 * Encima se le añade lo que no trae: se abre al pasar el cursor, y el clic en
 * el título lleva a la página, como siempre.
 */
export const PopDropdown: React.FC<{
  item: NavbarMenuItem;
  redirect: (url: string) => void;
}> = ({ item, redirect }) => {
  const [show, setShow] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const schedule = (next: boolean, delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(next), delay);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const { id, title, url, subItems } = item;

  const goToPage = () => {
    window.clearTimeout(timer.current);
    setShow(false);
    redirect(url);
  };

  return (
    <Dropdown
      as={NavItem}
      className="fmc-dropdown"
      show={show}
      onToggle={(next) => {
        window.clearTimeout(timer.current);
        setShow(next);
      }}
      onMouseEnter={() => schedule(true, OPEN_DELAY)}
      onMouseLeave={() => schedule(false, CLOSE_DELAY)}
    >
      <Dropdown.Toggle
        as={Nav.Link}
        id={`fmc-dropdown-${id}`}
        className="fmc-navbar-link nav-link mx-2"
        onClick={goToPage}
      >
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu renderOnMount>
        {subItems?.map((subItem) => (
          <Dropdown.Item
            key={subItem.id}
            className="fmc-dropdown-item"
            onClick={() => redirect(subItem.url)}
          >
            {subItem.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
