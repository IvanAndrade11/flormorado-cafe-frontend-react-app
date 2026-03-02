import React from "react";
import "./Button.scss";

import { IButton } from "@/types/ui";
import { icons } from "@/utils/constants";

export const Button = ({
  label,
  dataTestid,
  id,
  className,
  onClick,
  disabled,
  style,
  type,
  icon,
}: IButton) => {
  return (
    <button
      type={type}
      id={id}
      data-testid={dataTestid}
      className={`container__button ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon ? (
        <>
          {label}
          <span>
            {/* <img
              src={icons.Basket1}
              alt="Icono de botón - Flormorado Café"
            /> */}
            <img src={icons.Basket2} alt="Icono de botón - Flormorado Café" />
            {/* <img
              src={icons.Store1}
              alt="Icono de botón - Flormorado Café"
            />
            <img
              src={icons.Store2}
              alt="Icono de botón - Flormorado Café"
              style={{ width: "30px" }}
            /> */}
          </span>
        </>
      ) : (
        label
      )}
    </button>
  );
};
