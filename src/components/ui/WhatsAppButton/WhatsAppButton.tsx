import "./WhatsAppButton.scss";

import { icons, URLS } from "@/utils/constants";
import { useLocation } from "react-router-dom";

export const WhatsAppButton = () => {
  const { pathname } = useLocation();

  return (
    !pathname.includes(URLS.checkout) && (
      <a href="https://wa.me/573132316080" target="_blank">
        <img
          src={icons.WhatsApp}
          className={`sticky-button sticky`}
          alt="WhatsApp Flormorado Café"
        />
      </a>
    )
  );
};
