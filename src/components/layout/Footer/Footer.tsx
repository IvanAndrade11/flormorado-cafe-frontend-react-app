import React from "react";
import "./Footer.scss";

import { Image } from "@/components/ui";
import { images, icons } from "@/utils/constants";

export const Footer: React.FC = () => {
  return (
    <>
      <footer id="footer" className="footer footer-expand-sm footer-fm">
        {/* <Image src={images.LogoFondoBeige} className="p-2 ms-auto" alt="Logo beige Flormorado Café" /> */}

        <div className="footer-block-info">
          <p style={{ fontWeight: "bold" }}>Contáctanos</p>
          <ul>
            <li>
              <a href="mailto:info@flormoradocafe.com">
                <img src={icons.Mail} alt="Email Flormorado Café" />
                info@flormoradocafe.com
              </a>
            </li>
            <li>
              <a href="tel:3132316080">
                <img src={icons.Phone} alt="Teléfono Flormorado Café" />
                +57 313 231 60 80
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-block-info-center">
          <ul>
            <li>
              <a href="https://www.facebook.com/flormoradocafe" target="_blank">
                <img src={icons.Facebook} alt="Facebook Flormorado Café" />
              </a>
              <a
                href="https://www.instagram.com/flormoradocafe/"
                target="_blank"
              >
                <img src={icons.Instagram} alt="Instagram Flormorado Café" />
              </a>
              <a href="https://wa.me/573132316080" target="_blank">
                <img src={icons.WhatsApp} alt="WhatsApp Flormorado Café" />
              </a>
              <a href="https://www.youtube.com/@flormoradocafe" target="_blank">
                <img src={icons.YouTube} alt="YouTube Flormorado Café" />
              </a>
            </li>
          </ul>
          <p>
            © 2026 Flormorado Café
            <br />
            Desarrollado por Iván Andrade
          </p>
        </div>

        <Image
          src={images.LogoNombreFondoBeige}
          className="p-2 logo-letra ms-auto"
          alt="Flormorado Café"
        />
        <br />
      </footer>
    </>
  );
};
