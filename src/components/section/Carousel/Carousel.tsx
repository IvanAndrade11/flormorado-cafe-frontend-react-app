import "./Carousel.scss";
import React from "react";

import { CAROUSEL_ITEMS, scrollToSection } from "@/utils/constants";

export const Carousel: React.FC = () => {
  // Duplicamos los datos para crear un bucle de animación fluido
  const extendedItems = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  return (
    <>
      <div className="banner-carousel-title">
        <a onClick={() => scrollToSection("tab")}>
          Conoce nuestros recolectores aliados
        </a>
      </div>

      <div className={"carousel-container"}>
        <div className={"carousel-track"}>
          {extendedItems.map((item, index) => (
            <div className={"carousel-card"} key={index}>
              <img
                src={item.icon}
                alt={item.content}
                className={"carousel-card-icon"}
              />
              <div className={"carousel-card-text"}>{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
