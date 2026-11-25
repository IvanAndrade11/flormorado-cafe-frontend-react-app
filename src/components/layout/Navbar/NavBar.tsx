import "./NavBar.scss";

import React, { useEffect, useState } from "react";
import NavbarBs from "react-bootstrap/Navbar";
import { Container, Offcanvas } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CarouselMessage, Isotype, Wordmark } from "@/components/ui";
import {
  getBlogSubItems,
  NAVBAR_MENU_ITEMS,
  OVERLAY_NAVBAR_URLS,
  URLS,
} from "@/utils/constants";
import store from "@/app/providers/redux/store";
import { IBlog, IBlogFlormorado } from "@/types/configCat";
import { setLoader } from "@/utils/constants/redux/sets";
import { NavContent } from "./NavContent/NavContent";

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  const overlay = OVERLAY_NAVBAR_URLS.includes(pathname);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const { blog } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (blog) {
      const { blogFlormorado }: IBlogFlormorado = JSON.parse(blog) as {
        blogFlormorado: IBlog;
      };
      NAVBAR_MENU_ITEMS[4].subItems = getBlogSubItems(blogFlormorado);
      setLoader(false);
    }
  }, [blog]);

  return (
    <div
      className={`flormorado-navbar${overlay ? " flormorado-navbar--overlay" : ""}`}
    >
      <CarouselMessage />
      {pathname !== URLS.checkout && (
        <div className="container">
          <NavbarBs expand="lg">
            <Container fluid>
              <NavbarBs.Brand href="/" style={{ marginRight: "0" }}>
                {/* Sobre el video el símbolo se lee mejor que la palabra, que
                    además repetiría el logotipo del propio hero. */}
                {overlay ? (
                  <Isotype className="flormorado-navbar__brand flormorado-navbar__isotype" />
                ) : (
                  <Wordmark className="flormorado-navbar__brand" />
                )}
              </NavbarBs.Brand>
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
                    <Wordmark className="fmc-offcanvas-title" />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <NavContent handleClose={handleClose} />
                </Offcanvas.Body>
              </NavbarBs.Offcanvas>
            </Container>
          </NavbarBs>
        </div>
      )}
    </div>
  );
};
