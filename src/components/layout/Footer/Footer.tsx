import "./Footer.scss";
import React from "react";

import { CONSUMER_AUTHORITY, URLS } from "@/utils/constants";
import { Link } from "react-router-dom";
import { Wordmark } from "@/components/ui";

const SOCIAL = [
  {
    id: "facebook",
    url: "https://www.facebook.com/flormoradocafe",
    label: "Facebook Flormorado Café",
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/flormoradocafe/",
    label: "Instagram Flormorado Café",
  },
  {
    id: "whatsapp",
    url: "https://wa.me/573132316080",
    label: "WhatsApp Flormorado Café",
  },
  {
    id: "youtube",
    url: "https://www.youtube.com/@flormoradocafe",
    label: "YouTube Flormorado Café",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="footer-fm">
      <div className="footer-fm__inner">
        <div className="footer-fm__brand">
          {/* El logo completo, armado con sus dos piezas: el PNG de siempre
              trae el fondo beige quemado y sobre el morado del pie saldría
              como un recuadro claro. */}
          <span className="footer-fm__logo">
            <Wordmark />
          </span>
          <ul className="footer-fm__social">
            {SOCIAL.map((network) => (
              <li key={network.id}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.label}
                >
                  <span
                    className={`footer-fm__icon footer-fm__icon--${network.id}`}
                  />
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
                <span className="footer-fm__icon footer-fm__icon--mail" />
                info@flormoradocafe.com
              </a>
            </li>
            <li>
              <a href="tel:3132316080">
                <span className="footer-fm__icon footer-fm__icon--phone" />
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
