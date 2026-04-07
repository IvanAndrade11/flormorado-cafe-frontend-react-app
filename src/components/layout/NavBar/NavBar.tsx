import "./Navbar.scss";

import { CarouselMessage, PopDropdown, WhatsAppButton } from "@/components/ui";
import {
  icons,
  images,
  NAVBAR_MENU_ITEMS,
  scrollToSection,
  URLS,
} from "@/utils/constants";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { Button, Container, Nav, Offcanvas, Accordion } from "react-bootstrap";
import NavbarBs from "react-bootstrap/Navbar";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const redirect = (url: string) => {
    handleClose();
    if (url.startsWith("/")) {
      navigate(url);
    } else {
      scrollToSection(url);
    }
  };

  return (
    <div className="flormorado-navbar">
      <CarouselMessage />
      <div className="container">
        <NavbarBs expand="lg">
          <Container fluid>
            {/* Logo */}
            <NavbarBs.Brand href="/" style={{ marginRight: "0" }}>
              <img
                alt="Flormorado Café"
                src={images.Logo}
                width="62"
                className="d-inline-block align-top"
              />{" "}
            </NavbarBs.Brand>

            {isMobile && (
              <a href="/">
                <img
                  alt="Flormorado Café"
                  src={images.LogoSoloNombreFondoBeige}
                  width="116"
                  className="d-inline-block align-top"
                />
              </a>
            )}
            {/* OFF CANVAS */}
            <NavbarBs.Toggle
              aria-controls={`fmc-principal-navbar`}
              onClick={toggleShow}
            />
            <NavbarBs.Offcanvas
              id={`fmc-principal-navbar`}
              aria-labelledby={`fmc-principal-navbar-label`}
              placement="end"
              show={show}
              className="fmc-offcanvas"
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`fmc-principal-navbar-label`}>
                  <h1 className="fmc-offcanvas-title">FLORMORADO</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {NAVBAR_MENU_ITEMS.map((item) =>
                    item.dropdown ? (
                      isMobile ? (
                        <Accordion key={item.id}>
                          <Accordion.Item eventKey={item.title}>
                            <Accordion.Header className="fmc-navbar-accordion-mobile">
                              {item.title}
                            </Accordion.Header>
                            <Accordion.Body
                              style={{ padding: "0rem 1.5rem !important" }}
                            >
                              {item.subItems?.map((subItem) => (
                                <Nav.Link
                                  key={subItem.id}
                                  onClick={() => redirect(subItem.url)}
                                  className="fmc-navbar-link nav-link mx-2 text-center"
                                >
                                  {subItem.title}
                                </Nav.Link>
                              ))}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      ) : (
                        <PopDropdown item={item} redirect={redirect} />
                      )
                    ) : (
                      <Nav.Link
                        key={item.id}
                        onClick={() => redirect(item.url)}
                        className="fmc-navbar-link nav-link mx-2"
                      >
                        {item.title}
                      </Nav.Link>
                    ),
                  )}
                </Nav>

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
              </Offcanvas.Body>
            </NavbarBs.Offcanvas>
          </Container>
        </NavbarBs>
      </div>
      <WhatsAppButton />
    </div>
  );
};
