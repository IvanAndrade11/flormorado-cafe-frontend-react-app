import "./NavContent.scss";

import React from "react";
import { Nav } from "react-bootstrap";
import { icons, scrollToSection } from "@/utils/constants";
import { MenuMobile } from "../MenuMobile/MenuMobile";
import { PopDropdown } from "../PopDropdown/PopDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { URLS } from "@/utils/constants";
import { Button } from "react-bootstrap";
import { NavbarMenuItem } from "@/types/components";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const NavContent: React.FC<{
  items: NavbarMenuItem[];
  handleClose: () => void;
}> = ({ items, handleClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Quien decide si hay hamburguesa es el `expand="lg"` de Bootstrap, no el
  // user agent: con `isMobile` una ventana de escritorio estrecha abría el
  // offcanvas y le metía dentro los desplegables de escritorio, y una tableta
  // ancha recibía el acordeón con la barra desplegada.
  const isDesktop = useMediaQuery("(min-width: 992px)");

  const redirect = (url: string) => {
    handleClose();
    if (url.startsWith("/")) {
      navigate(url);
    } else {
      scrollToSection(url);
    }
  };

  return (
    <>
      <Nav className="justify-content-end flex-grow-1 pe-3">
        {items.map((item) =>
          item.dropdown ? (
            isDesktop ? (
              <PopDropdown key={item.id} item={item} redirect={redirect} />
            ) : (
              <MenuMobile key={item.id} item={item} redirect={redirect} />
            )
          ) : (
            <Nav.Link
              key={item.id}
              onClick={() => redirect(item.url)}
              className="fmc-navbar-link nav-link mx-2"
            >
              {!isDesktop && (
                <img
                  src={icons.GrainCoffee}
                  alt="Grano de Café Flormorado"
                  width="17"
                  className="d-inline-block mx-2"
                />
              )}
              {item.title}
            </Nav.Link>
          ),
        )}
      </Nav>

      {!pathname.includes(URLS.store) && (
        <Button
          onClick={() => redirect(URLS.categories)}
          className="fmc-navbar-button"
        >
          <>
            Ir a la tienda
            <span>
              <img
                src={icons.Basket2}
                alt="Tienda - Flormorado Café"
                width="20"
                className="d-inline-block align-top ms-1"
              />
            </span>
          </>
        </Button>
      )}
    </>
  );
};
