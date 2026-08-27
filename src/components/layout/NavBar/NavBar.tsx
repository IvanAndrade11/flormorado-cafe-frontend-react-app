import "./Navbar.scss";

import React, { useEffect, useState } from "react";
import NavbarBs from "react-bootstrap/Navbar";
import { isMobile } from "react-device-detect";
import { Container, Offcanvas } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CarouselMessage } from "@/components/ui";
import {
  getBlogSubItems,
  images,
  NAVBAR_MENU_ITEMS,
  URLS,
} from "@/utils/constants";
import store from "@/app/providers/redux/store";
import { IBlog, IBlogFlormorado } from "@/types/configCat";
import { setLoader } from "@/utils/constants/redux/sets";
import { NavContent } from "./NavContent/NavContent";
import { Logo } from "./Logo/Logo";

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

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
      NAVBAR_MENU_ITEMS[5].subItems = getBlogSubItems(blogFlormorado);
      setLoader(false);
    }
  }, [blog]);

  return (
    <div className="flormorado-navbar">
      <CarouselMessage />
      {pathname !== URLS.checkout && (
        <div className="container">
          <NavbarBs expand="lg">
            <Container fluid>
              <NavbarBs.Brand href="/" style={{ marginRight: "0" }}>
                <Logo src={images.Logo} width={62} />
              </NavbarBs.Brand>
              {isMobile && (
                <a href="/">
                  <Logo src={images.LogoSoloNombreFondoBeige} width={116} />
                </a>
              )}
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
