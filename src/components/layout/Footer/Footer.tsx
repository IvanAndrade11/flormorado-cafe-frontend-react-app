import "./Footer.scss";
import React from "react";

import { CONSUMER_AUTHORITY, images, icons, URLS } from "@/utils/constants";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const SOCIAL = [
  {
    id: "facebook",
    url: "https://www.facebook.com/flormoradocafe",
    icon: icons.Facebook,
    label: "Facebook Flormorado Café",
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/flormoradocafe/",
    icon: icons.Instagram,
    label: "Instagram Flormorado Café",
  },
  {
    id: "whatsapp",
    url: "https://wa.me/573132316080",
    icon: icons.WhatsApp,
    label: "WhatsApp Flormorado Café",
  },
  {
    id: "youtube",
    url: "https://www.youtube.com/@flormoradocafe",
    icon: icons.YouTube,
    label: "YouTube Flormorado Café",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="footer-fm">
      <div className="footer-fm__inner">
        <div className="footer-fm__brand">
          <Image
            src={images.LogoNombreFondoBeige}
            className="footer-fm__logo"
            alt="Flormorado Café"
          />
          <ul className="footer-fm__social">
            {SOCIAL.map((network) => (
              <li key={network.id}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.label}
                >
                  <img src={network.icon} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          className="footer-fm__col footer-fm__col--contact"
          aria-label="Contacto"
        >
          <p className="footer-fm__title">Contáctanos</p>
          <ul>
            <li>
              <a href="mailto:info@flormoradocafe.com">
                <img src={icons.Mail} alt="" />
                info@flormoradocafe.com
              </a>
            </li>
            <li>
              <a href="tel:3132316080">
                <img src={icons.Phone} alt="" />
                +57 313 231 60 80
              </a>
            </li>
          </ul>
        </nav>

        <nav
          className="footer-fm__col footer-fm__col--legal"
          aria-label="Legal"
        >
          <p className="footer-fm__title">Legal</p>
          <ul>
            <li>
              <Link to={URLS.privacy}>Política de tratamiento de datos</Link>
            </li>
            <li>
              <Link to={URLS.terms}>Términos y condiciones</Link>
            </li>
            <li>
              {/* Lo exige el parágrafo del artículo 50 de la Ley 1480: un
                  enlace visible a la autoridad de protección al consumidor. */}
              <a
                href={CONSUMER_AUTHORITY.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Protección al consumidor (SIC)
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer-fm__bottom">
        <p>
          © 2026 Flormorado Café <span aria-hidden="true">·</span> Desarrollado
          por Iván Andrade
        </p>
      </div>
    </footer>
  );
};
