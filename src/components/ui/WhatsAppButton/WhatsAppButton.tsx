import "./WhatsAppButton.scss";

import { icons, URLS } from "@/utils/constants";
import { useFooterOnScreen } from "@/hooks/useFooterOnScreen";
import { useLocation } from "react-router-dom";

export const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const footerOnScreen = useFooterOnScreen();

  return (
    !pathname.includes(URLS.checkout) && (
      <a
        href="https://wa.me/573132316080"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={icons.WhatsApp}
          className={`sticky-button sticky${
            footerOnScreen ? " fmc-fab-hidden" : ""
          }`}
          alt="WhatsApp Flormorado Café"
        />
      </a>
    )
  );
};
