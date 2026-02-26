import React, { useEffect } from "react";
import "./Landing.scss";

import { Banner, Carousel, Tab } from "@/components/section";
import { images, scrollToSection } from "@/utils/constants";

export const Landing: React.FC = () => {
  useEffect(() => {
    // ✅ Limpiar datos
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <div className="initial-space">
      <Banner img={images.LogoNombre} />

      <Tab />

      <Carousel />

      <div style={{ width: "100%", height: "200px", opacity: "0.5" }}></div>
    </div>
  );
};
