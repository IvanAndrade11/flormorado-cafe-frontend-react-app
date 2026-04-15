import "./Landing.scss";

import React, { useEffect } from "react";
import { isDesktop } from "react-device-detect";

import {
  Banner,
  InfiniteCarousel,
  CategoryCarousel,
  ProductCarousel,
} from "@/components/section";
import { images } from "@/utils/constants";

export const Landing: React.FC = () => {
  useEffect(() => {
    // ✅ Limpiar datos
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <>
      <Banner img={images.LogoNombre} />

      <ProductCarousel />

      <InfiniteCarousel />

      <CategoryCarousel />

      {isDesktop && (
        <div style={{ width: "100%", height: "200px", opacity: "0.5" }}></div>
      )}
    </>
  );
};
