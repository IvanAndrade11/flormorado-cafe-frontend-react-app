import "./Loader.scss";

import React from "react";

import { ILoader } from "@/types/components";
import { images } from "@/utils/constants";

export const Loader: React.FC<ILoader> = ({ show }: ILoader) => {
  return (
    <div className={show ? "overlay-loader" : "hide-loader"}>
      <div className="loader-compound">
        <div className="loader">
          <img
            src={images.LogoLoading}
            alt="Flormorado Café animación de carga"
          />
          <div className="text-loader">
            La vida es corta, bebe un buen café...
          </div>
        </div>
      </div>
    </div>
  );
};
