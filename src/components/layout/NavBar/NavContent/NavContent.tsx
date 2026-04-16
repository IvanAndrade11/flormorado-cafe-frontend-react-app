import "./NavContent.scss";

import React from "react";
import { Nav } from "react-bootstrap";
import { icons, NAVBAR_MENU_ITEMS, scrollToSection } from "@/utils/constants";
import { MenuMobile } from "../MenuMobile/MenuMobile";
import { PopDropdown } from "../PopDropdown/PopDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { URLS } from "@/utils/constants";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";

export const NavContent: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        {NAVBAR_MENU_ITEMS.map((item) =>
          item.dropdown ? (
            isMobile ? (
              <MenuMobile item={item} redirect={redirect} />
            ) : (
              <PopDropdown item={item} redirect={redirect} />
            )
          ) : (
            <Nav.Link
              key={item.id}
              onClick={() => redirect(item.url)}
              className="fmc-navbar-link nav-link mx-2"
            >
              {isMobile && (
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
