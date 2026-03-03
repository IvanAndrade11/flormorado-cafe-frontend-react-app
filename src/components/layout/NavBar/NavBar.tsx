import "./NavBar.scss";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { images, scrollToSection, NAVBAR_MENU_ITEMS } from "@/utils/constants";
import { Button, WhatsAppButton, CarouselMessage } from "@/components/ui";

export const Navbar: React.FC = () => {
  const Navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  const goToStore = () => {
    Navigate("/tienda");
    handleNavClick();
  };

  return (
    <>
      <nav className={`navbar fixed-top ${expanded ? "expanded" : ""}`}>
        <CarouselMessage />

        <div id="navbar" className="container">
          <a
            className="navbar-brand"
            onClick={() => {
              Navigate("/");
            }}
          >
            <img src={images.Logo} alt="Logo Flormorado Café" />
            {/* <img src={images.LogoSoloNombreFondoBeige} alt="Logo Flormorado Café" /> */}
          </a>

          <button
            className="navbar-toggler"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`navbar-collapse ${expanded ? "show" : ""}`}
            id="navbar"
          >
            <div className="navbar-nav-container">
              {NAVBAR_MENU_ITEMS.map((item) => (
                <Button
                  key={item.url}
                  type="button"
                  label={item.title}
                  data-testid="button"
                  className="nav-link clean"
                  onClick={() => {
                    if (item.url.startsWith("/")) {
                      Navigate(item.url);
                    } else {
                      scrollToSection(item.url);
                    }
                    handleNavClick();
                  }}
                />
              ))}
              <Button
                type="button"
                label="Ir a la tienda"
                data-testid="button"
                className="mt-auto border-0 btn-navbar"
                onClick={goToStore}
                icon={true}
              />
            </div>
          </div>
        </div>
      </nav>

      <WhatsAppButton />
    </>
  );
};
